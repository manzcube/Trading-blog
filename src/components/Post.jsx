import React, { useState } from 'react'
import { toast } from 'react-toastify'

// Firebase
import { db } from '../config/firebase-config'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'

// CSS
import './Components.css'

// Components
import Button from './Button'
import Comment from './Comment'

const Post = (props) => {  
    const [openComments, setOpenComments] = useState(false)
    const [message, setMessage] = useState('')
    const [comments, setComments] = useState(props.comments)

    const pushComment = async (e) => {
        e.preventDefault()
        if (!message.length) {
            toast.warn('Please, write something before comment')
        } else {
            setComments([ ...comments, { message, author: props.author } ])
            setMessage('')
            const postRef = doc(db, 'posts', props.postId)
            await updateDoc(postRef, {
                comments: arrayUnion({ message, author: props.author })
            })
            
        }        
    }     

    return (
        <>
            <div className='container max-w-3xl md:h-56 flex flex-row space-y-3 mx-auto mt-20 no-underline rounded-lg md:overflow-hidden shadow-lg bg-white ring-1 ring-slate-900/5 hover:scale-105'>
                <div className="md:flex w-full">
                    <a href={`posts/${props.postId}`} className="">
                        <img src={props.image} alt="" className='h-48 w-full object-cover md:h-full md:w-52 rounded-t-lg md:rounded-l-lg' />
                    </a>
                    <div className="p-5 max-w-xl w-full flex flex-col h-full md:justify-between">
                        <div className="flex justify-end items-center">
                            <p className='ml-3 text-sm'>{props.date}</p>
                        </div>
                        <div>
                            <a href={`posts/${props.postId}`} className="block mt-1 text-lg leading-tight uppercase tracking-wide font-bold text-black no-underline">{props.title}</a>
                            <p className="my-2 text-slate-500 h-28 overflow-hidden">{props.description}</p>
                        </div>
                        <div className="flex justify-end bottom-0">
                            <div className="uppercase tracking-wide text-xs  text-indigo-500 font-semibold">BY {props.author}</div>
                        </div>                                      
                    </div>
                </div>                       
            </div>
            <button className='bg-sky-500 text-white text-sm flex flex-row items-center py-1 px-4 mx-auto rounded-b-full btn active:shadow-none' onClick={() => setOpenComments(!openComments)}>
                {openComments ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )}
                comments
            </button>
            {openComments ? (
                <div className="container max-w-2xl my-5 mx-auto p-5 flex flex-col rounded bg-slate-200">
                    {comments?.map(comment => (
                        <Comment
                            key={props.comments.indexOf(comment)}
                            author={comment.author}
                            message={comment.message}
                        />
                    ))}
                    <div className='flex items-center'>
                        <input 
                            value={message}
                            className='shadow appearance-none bg-gray-100 rounded-l mt-5 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            type="text" 
                            placeholder='comment something'
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button onClick={pushComment}>Add</Button>
                    </div>                    
                </div>
            ) : ''}
            
        </>
    )
}

export default Post
