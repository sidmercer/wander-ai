import { SignUp } from '@clerk/nextjs'
import { div } from 'motion/react-client'

export default function Page() {
  return (
    <div className='flex justify-center h-screen w-full items-center '>
        <SignUp />
    </div>
  )
}