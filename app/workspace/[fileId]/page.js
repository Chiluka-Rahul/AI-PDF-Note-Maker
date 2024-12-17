"use client"

import { useParams } from 'next/navigation'
import React,{useEffect} from 'react'
import WorkspaceHeader from '../_components/WorkspaceHeader';
import PdfViewwe from '../_components/PdfViewwe';
import {useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import TextEditor from '../_components/TextEditor';

const Workspace = () => {
    const {fileId} = useParams();
    const fileInfo = useQuery(api.fileStorage.GetFileRecord,
        {fileId:fileId}
    )

    // useEffect(() => {
    //     console.log("fileInfo",fileInfo);
        
    // }, [fileInfo])
    
   
  return (
    <div>
        <WorkspaceHeader fileName  = {fileInfo?.fileName}/>
        <div className='grid grid-cols-2 gap-5'>
            <div>
                <TextEditor fileId={fileId}/>
            </div>
            <div>
                <PdfViewwe fileUrl = {fileInfo?.fileUrl}/>
            </div>
        </div>
    </div>
  )
}

export default Workspace