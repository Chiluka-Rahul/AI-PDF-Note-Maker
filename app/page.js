'use client'

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {

  const {user} = useUser();
  const createUser = useMutation(api.user.createUser);

  useEffect(()=>{
    user&&CheckUser()
  },[user])

  const CheckUser = async() => {
    const result = await createUser({
      email:user?.primaryEmailAddress?.emailAddress,
      imageUrl:user?.imageUrl,
      userName:user?.fullName
    })
    console.log(result);
    
  }
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-medium text-gray-900">AI PDF Note Maker</h1>
          <UserButton />
        </div>
      </header>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="flex items-center justify-center w-full h-[90vh] gap-10">
          <div className="w-full flex flex-col items-center gap-2">
            <h1 className="text-4xl md:text-6xl font-medium">Effortless Note-Making with AI</h1>
            <p className="mt-4 text-lg md:text-lg">
              Upload your PDFs and let AI transform them into concise, time-saving notes instantly.
            </p>
            <div className="flex justify-center items-center mt-5 gap-5">
              <Link href={'/dashboard'}>
                <Button className=" bg-gray-900 text-white px-6 py-3 text-lg rounded-lg">
                  Get Started
                </Button>
              </Link>
              <Button className="bg-slate-200 text-black text-lg">Learn More</Button>
            </div>
          </div>
        </section>

      {/* How It Works Section */}
      <section className="py-16 w-full px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-black text-white p-6 rounded-lg">
                <Image
                  src="/upload.png"
                  alt="Upload PDF"
                  width={250}
                  height={300}
                  className="mx-auto mb-0"
                />
                <h3 className="text-xl font-medium">Upload Your PDF</h3>
                <p className="mt-2 text-gray-300">
                  Drag and drop your PDF or click 'Upload'.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-black text-white  p-6 rounded-lg">
                <Image
                  src="/Ai-image.png"
                  alt="AI Processing"
                  width={150}
                  height={250}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-medium">AI Processes Your File</h3>
                <p className="mt-2 text-gray-300">
                  Our AI reads your file and generates concise notes.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-black text-white   p-6 rounded-lg">
                <img
                  src="/Download-edit.png"
                  alt="Download Notes"
                  width={250}
                  height={350}
                  className="mx-auto mb-6"
                />
                <h3 className="text-xl font-medium">Download or Edit Notes</h3>
                <p className="mt-2 text-gray-300">
                  Get your notes instantly and make edits as needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-2">
            <div className="px-10 py-14 bg-slate-100">
              <h3 className="text-xl font-semibold">Fast and Accurate</h3>
              <p className="mt-2 text-gray-600">
                Turn pages into notes in seconds with cutting-edge AI.
              </p>
            </div>
            <div className="px-10 py-14 bg-slate-100">
              <h3 className="text-xl font-semibold">Customizable Notes</h3>
              <p className="mt-2 text-gray-600">
                Highlight, edit, or refine notes to suit your needs.
              </p>
            </div>
            <div className="px-10 py-14 bg-slate-100">
              <h3 className="text-xl font-semibold">Accessible Anywhere</h3>
              <p className="mt-2 text-gray-600">
                Works on web and mobile for your convenience.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 w-full">
        <p>&copy; {new Date().getFullYear()} AI PDF Note Maker. All rights reserved.</p>
      </footer>
      </main>
    </div>
  );
}
