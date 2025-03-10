"use client"

import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CategoryItem {
  [key: string]: string
}

interface CategoryProps {
  title: string
  items: CategoryItem[]
  gridSpan?: string
}

const CategoryCard: React.FC<CategoryProps> = ({ title, items, gridSpan }) => {
  return (
    <Card className={`bg-card-gradient h-full ${gridSpan}`}>
      <CardHeader className="text-white">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] pr-4">
          {items.length === 0 ? (
            <p className="text-muted-foreground">No items available.</p>
          ) : (
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li key={index} className="bg-card-gradient-2 p-2 rounded-md text-black">
                  {Object.entries(item).map(([key, value]) => {
                    const formattedKey = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                    let formattedValue = value;
                    if (key === 'dueDate') {
                      if (!value) {
                        formattedValue = "No Date Mentioned in the Meeting";
                      } else if (typeof value === 'string' && value.includes('T')) {
                        formattedValue = value.split('T')[0];
                      }
                    }                    
                    return (
                      <div key={key}>
                        <strong className="text-primary">{formattedKey}:</strong> {formattedValue}
                      </div>
                    );
                  })}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

export default CategoryCard
