'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
  } from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Loader2Icon } from 'lucide-react'
import uuid4 from 'uuid4'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import { toast } from 'sonner'
  


const UploadPdfDialog = ({children, isMaxFile}) => {
    const generateUploadUrl = useMutation(api.fileStorage.generateUploadUrl)
    const addFileEntry = useMutation(api.fileStorage.AddFileEntryToDb);
    const getFileUrl = useMutation(api.fileStorage.getFileUrl);
    const embeddDocument = useAction(api.myAction.ingest)
    const {user} = useUser() 
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false)
    const [fileName, setFileName] = useState()
    const [open, setOpen] = useState(false);
    const OnFileSelect = (event) => {
        setFile(event.target.files[0])
    }
    const OnUpload = async() => {
        setLoading(true);
        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": file?.type },
            body: file,
          });
        const { storageId } = await result.json();
        console.log("st",storageId);

        const fileId =  uuid4();
        const fileUrl = await getFileUrl({storageId:storageId})
        const resp  = await addFileEntry({
            fileId:fileId ,
            storageId:storageId ,
            fileName: fileName??"Untitled File",
            fileUrl:fileUrl,
            createdBy: user?.primaryEmailAddress?.emailAddress,
        })
        console.log("resp",resp);

        const ApiResp = await axios.get('/api/pdf-loader?pdfUrl=' + fileUrl);
        console.log(ApiResp.data.result);
        await embeddDocument({
            splitText:ApiResp.data.result,
            fileId:fileId
        });
        
        setLoading(false);
        setOpen(false);

        toast('File is ready...')

    }   
  return (
    <Dialog open = {open}>
        <DialogTrigger asChild>
            <Button onClick = {() => setOpen(true)} disabled={isMaxFile} className="w-full">+ Upload PDF File</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Upload Pdf File</DialogTitle>
            <DialogDescription asChild>
                <div className=''>
                    <h2 className='mt-10'>Select a file to Upload</h2>
                    <div className=' gap-2 p-3 rounded-md border'>
                        <input type='file' accept='application/pdf'
                        
                            onChange={(event) => OnFileSelect(event)}
                        />
                    </div>
                    <div className='mt-2'>
                        <label>File Name *</label>
                        <Input placeholder = 'File Name' onChange={(e) => setFileName(e.target.value)}/>
                    </div>
                </div>
            </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
                <Button onClick={OnUpload} disabled = {loading}>
                    {loading?
                        <Loader2Icon className='animate-spin'/> : "Upload"
                    }</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>

  )
}

export default UploadPdfDialog