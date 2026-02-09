"use client"

import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import axios from 'axios'
import { Group, Send } from 'lucide-react'
import React, { useState } from 'react'
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUi from './GroupSizeUi'
import { v } from 'convex/values'
import BudgetUi from './BudgetUi'
import SelectDays from './SelectDays'
import FinalUi from './FinalUi'

type Message = {
  role: "user" | "assistant";
  content: string;
  ui?: string;
};

export default function ChatBox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);

  const onSend = async () => {
    if (!userInput.trim()) return;

    const newMsg: Message = {
      role: "user",
      content: userInput,
    };

    // Update UI immediately
    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setUserInput("");
    setLoading(true);

    try {
      const res = await axios.post("/api/aimodel", {
        messages: updatedMessages,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: res.data.resp, // Mapping the JSON response
          ui: res.data.ui,       // New UI field
        },
      ]);
    } catch (error) {
      console.error("Error fetching AI response", error);
    } finally {
      setLoading(false);
    }

  };

  const RenderGenrativeUi=(ui:string)=>{
    if(ui=='budget'){
      // budget component
      return <BudgetUi onSelectedOptions={(v:string)=>{setUserInput(v); onSend()}} />
    }
    else if(ui =='groupSize'){
      // group size component
      return <GroupSizeUi onSelectedOptions={(v:string)=>{setUserInput(v); onSend()}} />
    }
    else if(ui=='tripDuration'){
      // trip duration component
      return <SelectDays onSelectedOption={(v:string)=>{setUserInput(v); onSend()}} />
    }
    else if(ui=='final'){
      // final component with view trip button
      return <FinalUi viewTrip={()=>console.log()}/>;
    }
    return null;
  };

  return (
    <div className='h-[80vh] flex flex-col'>
        {messages.length == 0 &&
         <EmptyBoxState onSelectOption={(v:string)=>{setUserInput(v); onSend()}} />
        }
        {/* Display Messages Area */}
        <section className='flex-1 overflow-y-auto p-4 space-y-4'>
            {/* Initial Greeting (Static) */}
            <div className='flex justify-start'>
                <div className='max-w-lg text-black bg-gray-100 px-4 py-2 rounded-lg'>
                    Hello! I'm Wander AI, your personal trip planner. How can I assist you today?
                </div>
            </div>

            {/* Dynamic Messages Loop */}
            {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div className={`max-w-lg px-4 py-2 rounded-lg ${
                        msg.role === 'user' 
                        ? 'bg-primary text-white' // User Style
                        : 'bg-gray-100 text-black' // AI Style
                    }`}>
                        {msg.content}
                        {RenderGenrativeUi(msg.ui ?? '')}
                    </div>
                </div>
            ))}
            
            {/* Loading Indicator */}
            {loading && (
                <div className='flex justify-start'>
                    <div className='text-sm text-gray-500 animate-pulse'>
                        Wander AI is typing...
                    </div>
                </div>
            )}
        </section>

        {/* User input box */}
        <section>
             <div className='border rounded-2xl p-4 relative'>
                <Textarea 
                 placeholder='Start your trip planning...say hello!'
                 className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                 onChange={(event) => setUserInput(event.target.value)}
                 value={userInput}
                 onKeyDown={(e) => {
                    if(e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        onSend();
                    }
                 }}
                />
                <Button 
                  size={'icon'} 
                  className='absolute bottom-6 right-6' 
                  onClick={onSend}
                  disabled={loading}
                >
                    <Send className='h-4 w-4' />
                </Button>
            </div>
        </section>
    </div>
  )
}