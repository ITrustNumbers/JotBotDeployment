'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Mic, FileAudio, Brain, Clock, CheckCircle } from 'lucide-react'

// const dark_purple = "#312C51"
// const purple = "#48426D"
// const skin = "#F0C38E"
// const pink = "#F1AA9B"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#312C51] to-[#312C51] text-[#F0C38E]">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Mic className="w-8 h-8 text-white-400" />
          <span className="text-2xl font-bold text-[#F0C38E]">JotBot</span>
        </div>
        <nav>
          <Link href="/dashboard" className="bg-gradient-to-r from-[#48426D] to-[#48426D] hover:from-[#FFF6B3] hover:to-[#F6C794] text-[#F0C38E] hover:text-[#312C51] shadow-sm font-bold py-4 px-6 rounded-full transition duration-300">
            Try It Now
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-20 text-center">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#F1AA9B] to-[#F1AA9B]"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            Transform Your Meetings with AI
          </motion.h1>
          <motion.p
            className="pt-2 text-xl md:text-2xl mb-12 text-[#F0C38E]"
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Capture, analyze, and act on your meeting insights effortlessly
          </motion.p>
          <motion.div
            className='pt-20'
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link href="/dashboard" className="text-2xl bg-gradient-to-r from-[#48426D] to-[#48426D] hover:from-[#FFF6B3] hover:to-[#F6C794] text-[#F0C38E] hover:text-[#312C51] shadow-sm font-bold py-6 px-12 rounded-full transition duration-300">
              Get Started
            </Link>
          </motion.div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F0C38E]">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 text-[#F0C38E] hover:text-[#312C51]">
            {[
              { icon: FileAudio, title: "Upload Audio", description: "Simply upload your meeting recording" },
              { icon: Brain, title: "AI Analysis", description: "Our AI processes and extracts key information" },
              { icon: CheckCircle, title: "Get Insights", description: "Review tasks, decisions, and action items" }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-[#48426D] to-[#48426D] hover:from-[#F0C38E] hover:to-[#F0C38E] p-6 rounded-lg text-center border border-[#F1AA9B] shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <step.icon className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-[#F0C38E]">Benefits</h2>
          <div className="grid md:grid-cols-2 gap-8 text-center text-[#F0C38E] hover:text-[#312C51]">
            {[
              { title: "Save Time", description: "Automatically extract key information from your meetings" },
              { title: "Increase Productivity", description: "Focus on action items and decisions, not note-taking" },
              { title: "Never Miss a Detail", description: "Capture every important point with AI-powered analysis" },
              { title: "Easy Collaboration", description: "Share meeting insights with your team effortlessly" }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br p-6 rounded-lg from-[#48426D] to-[#48426D] hover:from-[#F0C38E] hover:to-[#F0C38E] border border-[#F1AA9B] shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.2 * index }}
              >
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-[#48426D] py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-xl text-[#F1AA9B]">
          <p>&copy; 2025 JotBot. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

    // <div className="relative min-h-screen flex flex-col text-[#F0C38E]">
    //   {/* Background Gradient */}
    //   <div className="absolute inset-0 bg-gradient-to-b from-[#312C51] via-[#6A1B9A] to-[#0D47A1]"></div>
    //   <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#6A1B9A_20%,transparent_60%)] opacity-80"></div>
    //   <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,#0D47A1_20%,transparent_60%)] opacity-80"></div>

    //   {/* Content Wrapper */}
    //   <div className="relative z-10 flex flex-col min-h-screen">
    //     <header className="container mx-auto px-4 py-6 flex justify-between items-center">
    //       <div className="flex items-center space-x-2">
    //         <Mic className="w-8 h-8 text-white-400" />
    //         <span className="text-2xl font-bold text-[#F0C38E]">JotBot</span>
    //       </div>
    //       <nav>
    //         <Link href="/dashboard" className="bg-gradient-to-r from-[#48426D] to-[#48426D] hover:from-[#FFF6B3] hover:to-[#F6C794] text-[#F0C38E] hover:text-[#312C51] shadow-sm font-bold py-4 px-6 rounded-full transition duration-300">
    //           Try It Now
    //         </Link>
    //       </nav>
    //     </header>

    //     <main className="container mx-auto px-4 flex-grow">
    //       {/* Hero Section */}
    //       <section className="py-20 text-center">
    //         <motion.h1
    //           className="text-5xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#F1AA9B] to-[#F1AA9B]"
    //           initial="hidden"
    //           animate={isVisible ? "visible" : "hidden"}
    //           variants={fadeIn}
    //           transition={{ duration: 0.5 }}
    //         >
    //           Transform Your Meetings with AI
    //         </motion.h1>
    //         <motion.p
    //           className="pt-2 text-xl md:text-2xl mb-12 text-[#F0C38E]"
    //           initial="hidden"
    //           animate={isVisible ? "visible" : "hidden"}
    //           variants={fadeIn}
    //           transition={{ duration: 0.5, delay: 0.2 }}
    //         >
    //           Capture, analyze, and act on your meeting insights effortlessly
    //         </motion.p>
    //         <motion.div
    //           className="pt-20"
    //           initial="hidden"
    //           animate={isVisible ? "visible" : "hidden"}
    //           variants={fadeIn}
    //           transition={{ duration: 0.5, delay: 0.4 }}
    //         >
    //           <Link href="/dashboard" className="text-2xl bg-gradient-to-r from-[#48426D] to-[#48426D] hover:from-[#FFF6B3] hover:to-[#F6C794] text-[#F0C38E] hover:text-[#312C51] shadow-sm font-bold py-6 px-12 rounded-full transition duration-300">
    //             Get Started
    //           </Link>
    //         </motion.div>
    //       </section>

    //       {/* How It Works Section */}
    //       <section className="py-12">
    //         <h2 className="text-3xl font-bold mb-12 text-center text-[#F0C38E]">How It Works</h2>
    //         <div className="grid md:grid-cols-3 gap-8 text-[#F0C38E] hover:text-[#312C51]">
    //           {[
    //             { icon: FileAudio, title: "Upload Audio", description: "Simply upload your meeting recording" },
    //             { icon: Brain, title: "AI Analysis", description: "Our AI processes and extracts key information" },
    //             { icon: CheckCircle, title: "Get Insights", description: "Review tasks, decisions, and action items" }
    //           ].map((step, index) => (
    //             <motion.div
    //               key={index}
    //               className="bg-gradient-to-br from-[#48426D] to-[#48426D] hover:from-[#F0C38E] hover:to-[#F0C38E] p-6 rounded-lg text-center border border-[#F1AA9B] shadow-lg hover:shadow-xl transition-shadow duration-300"
    //               initial="hidden"
    //               animate={isVisible ? "visible" : "hidden"}
    //               variants={fadeIn}
    //               transition={{ duration: 0.5, delay: 0.2 * index }}
    //             >
    //               <step.icon className="w-12 h-12 mx-auto mb-4" />
    //               <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
    //               <p>{step.description}</p>
    //             </motion.div>
    //           ))}
    //         </div>
    //       </section>

    //       {/* Benefits Section */}
    //       <section className="py-20">
    //         <h2 className="text-3xl font-bold mb-12 text-center text-[#F0C38E]">Benefits</h2>
    //         <div className="grid md:grid-cols-2 gap-8 text-center text-[#F0C38E] hover:text-[#312C51]">
    //           {[
    //             { title: "Save Time", description: "Automatically extract key information from your meetings" },
    //             { title: "Increase Productivity", description: "Focus on action items and decisions, not note-taking" },
    //             { title: "Never Miss a Detail", description: "Capture every important point with AI-powered analysis" },
    //             { title: "Easy Collaboration", description: "Share meeting insights with your team effortlessly" }
    //           ].map((benefit, index) => (
    //             <motion.div
    //               key={index}
    //               className="bg-gradient-to-br p-6 rounded-lg from-[#48426D] to-[#48426D] hover:from-[#F0C38E] hover:to-[#F0C38E] border border-[#F1AA9B] shadow-lg hover:shadow-xl transition-shadow duration-300"
    //               initial="hidden"
    //               animate={isVisible ? "visible" : "hidden"}
    //               variants={fadeIn}
    //               transition={{ duration: 0.5, delay: 0.2 * index }}
    //             >
    //               <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
    //               <p>{benefit.description}</p>
    //             </motion.div>
    //           ))}
    //         </div>
    //       </section>
    //     </main>

    //     {/* Footer inside the gradient */}
    //     <footer className="bg-transparent py-8 mt-20">
    //       <div className="container mx-auto px-4 text-center text-xl text-[#F1AA9B]">
    //         <p>&copy; 2025 JotBot. All rights reserved.</p>
    //       </div>
    //     </footer>
    //   </div>
    // </div>
