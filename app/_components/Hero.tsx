import { Button } from '@/components/ui/button'
import { HeroVideoDialog } from '@/components/ui/hero-video-dialog'
import { Textarea } from '@/components/ui/textarea'
import { ArrowDown, Globe2, Landmark, Plane, Send } from 'lucide-react'
import React from 'react'


const suggestions=[
    {
        title:'Create New Trip',
        icon:<Globe2 className='text-blue-400 h-5 w-5' />
    },
    {
        title:'Inspire me where to go',
        icon:<Plane className='text-green-500 h-5 w-5' />
    },
    {
        title:'Discover hidden gems',
        icon:<Landmark className='text-orange-500 h-5 w-5' />
    },
    {
        title:'Adventure Destination',
        icon:<Globe2 className='text-yellow-600 h-5 w-5' />
    }
]


function Hero() {
  return (
    <div className='mt-24 w-full flex justify-center'>
        
        {/* content */}
        <div className='max-w-3xl w-full text-center space-y-6'>
            <h1 className='text-xl md:text-5xl font-bold'> Hey, I'm your personal <span className='text-primary'>Trip Planner Wander AI</span> </h1>
            <p className='text-lg'>Share your travel needs. We’ll arrange flights, hotels, and your full itinerary in seconds. </p>
       

        {/* input box */}
        <div>
            <div className='border rounded-2xl p-4 relative ' >
                <Textarea placeholder='Create a trip from [origin] to [destination] '
                 className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none '
                />
                <Button size={'icon'} className='absolute bottom-6 right-6 ' >
                    <Send className='h-4 w-4' />
                </Button>
            </div>
        </div>

        {/* suggest list */}
        <div className='flex gap-5 '>
            {suggestions.map((suggestions,index)=>
            <div key={index} className='flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-amber-500 hover:text-white '>
                {suggestions.icon}
                <h2 className='text-sm'>{suggestions.title}</h2>
            </div>
            )}
        </div>
        <div className='flex items-center justify-center flex-col'>
             <h2 className='my-7 mt-14 flex gap-2 '>Not sure where to start? <strong>See how it works </strong> <ArrowDown/>  </h2>

        {/* video section */}
        <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://www.example.com/dummy-video"
            thumbnailSrc="https://mma.prnewswire.com/media/2401528/1_MindtrixProduct.jpg?p=facebook"
            thumbnailAlt="Dummy Video Thumbnail"
        />


        </div>
      </div>
    </div>
  )
}

export default Hero