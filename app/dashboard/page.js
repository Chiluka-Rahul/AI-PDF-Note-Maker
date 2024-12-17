'use client'
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs'
import { useQuery } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Dashboard = () => {
  const {user} = useUser();
  const fileList = useQuery(api.fileStorage.GetUserFiles, {
    userEmail: user?.primaryEmailAddress?.emailAddress
  })

  // console.log(fileList);
  
  return (
    <div className='flex flex-col justify-start items-start'>
      <h2 className='font-medium text-2xl'>Workspace</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10 w-full'>
        {fileList?.length>0?fileList?.map((file, index) => (
          <Link href={"/workspace/"+file.fileId} key={index}>
            <div key={index} className='flex flex-col items-center justify-center p-5 gap-3 border border-e-2 m-2 cursor-pointer hover:scale-105 transition-all'>
              <Image src={'/pdf.png'} alt='file' width={70} height={70} />
              <h3 className='mt-3 font-medium'>{file.fileName}</h3>
            </div>  
          </Link>
        ))
        :[1,2,3,4,5,6,7].map((item,index) => (
          <div key={index} className='bg-slate-200 rounded-md h-[150px] animate-pulse'>
    
          </div>  
        ))
      }
      </div>  
    </div>
  )
}

export default Dashboard