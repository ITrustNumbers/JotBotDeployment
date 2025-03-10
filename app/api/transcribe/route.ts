import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import axios from 'axios'
import fs from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'

export const POST = async (request: NextRequest) => {
  try {
    console.log('Received POST request to /api/transcribe')
    const formData = await request.formData()
    const file = formData.get('audio') as File
    const fullPath = formData.get('fullPath') as string

    console.log('Received file:', file?.name)
    console.log('Full path:', fullPath)

    if (!file) {
      console.error('No audio file provided')
      return NextResponse.json({ error: 'No audio file provided.' }, { status: 400 })
    }

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Define directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')

    // Ensure directory exists
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true })
    }

    // Save the file
    const fileName = `${Date.now()}-${file.name}`
    const filePath = path.join(uploadsDir, fileName)
    fs.writeFileSync(filePath, buffer)

    console.log('File saved at:', filePath)

    // Get the API URL from the environment variable
    const apiUrl = process.env.LANGFLOW_FLOW_URL

    if (!apiUrl) {
      throw new Error('LANGFLOW_FLOW_URL is not defined in the environment variables')
    }

    // Prepare JSON payload
    const payload = {
      output_type: 'text',
      input_type: 'text',
      tweaks: {
        'GroqWhisperComponent-E6JJp': {
          audio_file: filePath // Use the full path of the saved file
        },         
      }
    }

    console.log('Sending request to API:', apiUrl)

    // Send POST request to the transcription API
    const apiResponse = await axios.post(apiUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    console.log('Received response from API')
    
    // Ensure the response has the expected structure
    if (!apiResponse.data || !apiResponse.data.outputs) {
      throw new Error('Invalid API response structure.')
    }

    const { outputs } = apiResponse.data
    const analyzedTranscript = outputs[0]?.outputs[0]?.results?.breakdown?.text
    const rawTranscript = outputs[0]?.outputs[1]?.results?.transcription?.text

    console.log('Analyzed Transcript:', analyzedTranscript);
    console.log('Raw Transcript:', rawTranscript);

    if (!analyzedTranscript || !rawTranscript) {
      throw new Error('Invalid API response structure.')
    }
    console.log('Analyzed transcript:', analyzedTranscript.substring(0, 100) + '...')
    console.log('Raw transcript:', rawTranscript.substring(0, 100) + '...')

    // Parse JSON strings
    let analyzedData
    try {
      analyzedData = JSON.parse(analyzedTranscript)
    } catch (parseError) {
      console.error('JSON Parsing Error:', parseError);
      throw new Error('Failed to parse analyzed transcript JSON.')
    }

    const rawData = rawTranscript
    console.log('Analyzed Data:', JSON.stringify(analyzedData, null, 2))
    console.log('Saving to database...')

    // Helper function to format dates as ISO strings
    const formatDate = (date: string) => {
      const parsedDate = new Date(date)
      return !isNaN(parsedDate.getTime()) ? parsedDate.toISOString() : null
    }

    // Save to database with safe access
    const meeting = await prisma.meeting.create({
      data: {
        name: analyzedData.Breakdown.meeting_name || 'Untitled Meeting',
        description: analyzedData.Breakdown.description || 'No description provided.',
        rawTranscript: rawData,
        summary: analyzedData.Breakdown.summary || '',
    
        tasks: {
          create: (analyzedData.Breakdown.tasks || [])
            .filter((task: any) => task && typeof task === 'object')
            .map((task: any) => ({
              task: task.description || 'No task description',
              owner: task.assigned_to || 'Unassigned',
              dueDate: task.dueDate ? formatDate(task.dueDate) : null,
            })),
        },
    
        decisions: {
          create: (analyzedData.Breakdown.decisions || [])
            .filter((decision: any) => decision && typeof decision === 'object')
            .map((decision: any) => ({
              decision: decision.description || 'No decision description',
            })),
        },
    
        questions: {
          create: (analyzedData.Breakdown.questions || [])
            .filter((question: any) => question && typeof question === 'object')
            .map((question: any) => ({
              question: question.question || 'No question',
              status: question.status || 'Unanswered',
              answer: question.answer || '',
            })),
        },
    
        insights: {
          create: (analyzedData.Breakdown.insights || [])
            .filter((insight: any) => insight && typeof insight === 'object')
            .map((insight: any) => ({
              insight: insight.description || 'No insight',
            })),
        },
    
        deadlines: {
          create: (analyzedData.Breakdown.deadlines || [])
            .filter((deadline: any) => deadline && typeof deadline === 'object')
            .map((deadline: any) => ({
              description: deadline.description || 'No deadline description',
              dueDate: deadline.dueDate ? formatDate(deadline.dueDate) : null,
            })),
        },
    
        attendees: {
          create: (analyzedData.Breakdown.attendees || [])
            .filter((attendee: any) => attendee && typeof attendee === 'object')
            .map((attendee: any) => ({
              name: attendee.name || 'Unnamed Attendee',
            })),
        },
    
        followUps: {
          create: (analyzedData.Breakdown.follow_ups || [])
            .filter((followUp: any) => followUp && typeof followUp === 'object')
            .map((followUp: any) => ({
              description: followUp.description || 'No follow-up description',
              owner: followUp.owner || 'Unassigned',
            })),
        },
    
        risks: {
          create: (analyzedData.Breakdown.risks || [])
            .filter((risk: any) => risk && typeof risk === 'object')
            .map((risk: any) => ({
              risk: risk.description || 'No risk description',
            })),
        },
    
        agenda: {
          create: (analyzedData.Breakdown.agenda || [])
            .filter((item: any) => typeof item === 'string')
            .map((item: string) => ({
              item: item,
            })),
        },
      },
      include: {
        tasks: true,
        decisions: true,
        questions: true,
        insights: true,
        deadlines: true,
        attendees: true,
        followUps: true,
        risks: true,
        agenda: true,
      },
    });    
    console.log('Saving to database:', analyzedData);

    console.log('Meeting saved successfully:', meeting.id)

    return NextResponse.json(meeting, { status: 200 })
  } catch (error: any) {
    console.error('Error in /api/transcribe:', error)
    return NextResponse.json({ error: 'An error occurred during processing.' }, { status: 500 })
  }
}