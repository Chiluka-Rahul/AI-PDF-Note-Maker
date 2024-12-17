import { useParams } from 'next/navigation'
import { Bold, Code, Highlighter, Italic, List, ListOrdered, ListOrderedIcon, Sparkles, Underline } from 'lucide-react'
import React from 'react'
import { useAction, useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { chatSession } from '@/configs/AIModel'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'

const EditorExtension = ({editor}) => {
    const {fileId} = useParams();
    const SearchAI = useAction(api.myAction.search)
    const {user} = useUser();

    const saveNotes = useMutation(api.notes.AddNotes)
    const onAiClick = async() => {
        toast("AI is generating..")
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            ' '
        );
        console.log("selectedText",selectedText);
        const result = await SearchAI(
            {
                query : selectedText,
                fileId: fileId
            }
        )

        const UnformattedAns = JSON.parse(result)
        let answer = ""
        UnformattedAns&&UnformattedAns.forEach(item=>{
            answer = answer + item.pageContent
        })

        const PROMPT = "For question :" + selectedText + " and with given content as answer," + "please give appropriate answer in HTML format. The answer content is : " + answer;

        const AiModelRes = await chatSession.sendMessage(PROMPT);

        console.log(AiModelRes.response.text())
        const FinalAns = AiModelRes.response.text().replace('```','').replace('html','').replace('```','')
        const AllText = editor.getHTML();
        editor.commands.setContent(AllText+'<p> <strong>Answer: </strong>'+FinalAns+' </p>');


        saveNotes({
            notes:editor.getHTML(),
            fileId:fileId,
            createdBy:user?.primaryEmailAddress?.emailAddress
        })
    }
  return editor && (
    <div className='py-5'>
        <div className="control-group">
            <div className="button-group flex justify-between items-center px-5">
                <div className='flex items-center gap-3' >

                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'text-blue-500 text-xl' : 'text-xl'}
                    >
                        h1
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'text-blue-500 text-xl' : 'text-xl'}
                    >
                        h2
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'text-blue-500 text-xl' : 'text-xl'}
                    >
                        h3
                    </button> 
                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'text-blue-500' : ''}
                    >
                        <Bold />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'text-blue-500' : ''}
                    >
                        <Italic />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleCode().run()}
                        className={editor.isActive('code') ? 'text-blue-500' : ''}
                    >
                        <Code />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHighlight().run()}
                        className={editor.isActive('highlight') ? 'text-blue-500' : ''}
                    >
                        <Highlighter />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                        className={editor.isActive('underline') ? 'text-black' : ''}
                    >
                    <Underline />   
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active' : ''}
                    >
                        <List />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                        className={editor.isActive('orderedList') ? 'is-active' : ''}
                    >
                        <ListOrderedIcon />
                    </button>
                </div>
                <div className='bg-black p-3 flex items-center justify-center text-white rounded-full'>
                    <button
                        onClick={() => onAiClick()}
                        className={'hover:text-yellow-400'}
                    >
                    <Sparkles /> 
                    </button>

                </div>

                 
            </div>
        </div>
    </div>
  )
}

export default EditorExtension