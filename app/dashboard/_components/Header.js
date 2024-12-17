import { UserButton } from '@clerk/nextjs'
import {HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-end p-5 shadow-sm '>
        <div className='flex gap-8 items-center bg-black px-5 py-3 rounded-full'>
          <Link href={'/'} >
            <HomeIcon className=' text-white rounded-full cursor-pointer'/>
          </Link>
          <div className="bg-white border-dashed flex items-center justify-center p-0.5 rounded-full">
            <UserButton />
          </div>
        </div>  
    </div>
  )
}

export default Header