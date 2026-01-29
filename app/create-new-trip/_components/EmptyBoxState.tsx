import React from 'react'
import { suggestions } from '@/app/_components/Hero'

function EmptyBoxState({onSelectOption}:any) {
  return (
    <div className='mt-2'>
        <h2 className='font-bold text-3xl text-center ' >Start planning new <strong className='text-primary'>trip</strong> using AI</h2>
        <p className='text-center text-gray-500 mt-2 ' >Discover personalized travel itineraries, Find the best destination, and plan your dream vacation effortlessly with the power of AI. </p>

        {/* suggestions */}
         <div className='flex flex-col  gap-5 '>
                    {suggestions.map((suggestions,index)=>

                    <div key={index} 
                    onClick={()=>onSelectOption(suggestions.title)}
                    className='flex items-center gap-2 border rounded-lg p-1 cursor-pointer hover:bg-amber-500 hover:text-white '>
                        {suggestions.icon}
                        <h2 className='text-lg'>{suggestions.title}</h2>
                    </div>
                    )}
                </div>

    </div>
  )
}

export default EmptyBoxState