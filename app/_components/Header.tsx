"use client";
import { useUser } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const menuOptions=[
    {
        name:'Home',
        path:'/'
    },
     {
        name:'Pricing',
        path:'/pricing'
    },
     {
        name:'Contact us',
        path:'/contact-us'
    }

]



function Header() {

    const {user}=useUser();


  return (
    <div className='flex justify-between items-center p-4 pl-8  '>
        {/* {logo} */}
        <Image src={'/logo.svg'} width={187} height={198} alt='WanderAI-logo' />

        {/* { Menu Options } */}
        <div className='flex gap-8 items-center'>
            {menuOptions.map((menu,index)=>
            (
                <Link href={menu.path} >
                    <h2 className='text-lg hover:scale-105 transition-all hover:text-primary '>{menu.name}</h2>
                </Link>
            )
            
            )}
        </div>

        {/* { get started button} */}
      {!user?  <SignInButton mode='modal'>
            <Button>Get Started</Button>
        </SignInButton> :
        <Link href='/create-trip'>
        <Button>Create New Trip</Button>
        </Link> 
        }

    </div>
  )
}

export default Header