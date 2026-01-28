"use client"

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import React from 'react'

export default function ChatBox() {

    const onSend=()=>{
        // handle send message
    }

  return (
    <div className='h-[80vh] flex flex-col ' >
        {/* display messages here */}
        <section className='flex-1 overflow-y-auto p-4'>
            <div className='flex justify-end mt-2'>
                <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg '>
                    Hello! I'm Wander AI, your personal trip planner. How can I assist you today?
                </div>
            </div>
            <div className='flex justify-start mt-2'>
                <div className='max-w-lg text-black bg-gray-100 px-4 py-2 rounded-lg '>
                    Ai agent msg
                </div>
            </div>
        </section>
        {/* User input box */}
        <section>
             <div className='border rounded-2xl p-4 relative ' >
                <Textarea placeholder='Create a trip from [origin] to [destination] '
                 className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none '
                />
                <Button size={'icon'} className='absolute bottom-6 right-6 ' onClick={()=>onSend()} >
                    <Send className='h-4 w-4' />
                </Button>
            </div>
        </section>
    </div>
  )
}
