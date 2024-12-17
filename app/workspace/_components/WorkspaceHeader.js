import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { LogOutIcon } from 'lucide-react'
import Link from 'next/link'

import React from 'react'

const WorkspaceHeader = ({fileName}) => {
  return (
    <div className='p-4 flex justify-between items-center shadow-md'>
        <h1 className="text-xl font-medium text-gray-900">AI PDF Note Maker</h1>
        <h2 className='font-medium'>{fileName}</h2>
        <div className='flex gap-2 items-center'>
          <div className='flex gap-5 items-center bg-slate-200 px-3 py-2 rounded-lg'>
            <Link href={'/dashboard'} >
              <Button >
                <LogOutIcon />
              </Button>
            </Link>
            <div className="bg-white border-dashed flex items-center justify-center p-1 rounded-full">
              <UserButton />
            </div>
          </div>
        </div>
    </div>
  )
}

export default WorkspaceHeader