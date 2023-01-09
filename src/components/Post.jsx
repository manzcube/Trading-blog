import React, { useState } from 'react'
import { toast } from 'react-toastify'

// Firebase
import { db } from '../config/firebase-config'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

// CSS
import './Components.css'

// Components
import Button from './Button'
import Comment from './Comment'

const Post = (props) => {  
    const [openComments, setOpenComments] = useState(false)
    const [message, setMessage] = useState('')
    const [comments, setComments] = useState(props.comments)
    const [savedByCurrentUser, setSavedByCurrentUser] = useState(props.savedByCurrentUser)

    // Funciton to delete a comment
    const deleteThisComment = async (someComment) => {
        const postRef = doc(db, 'posts', props.postId)
        await updateDoc(postRef, {
            comments: arrayRemove(someComment)
        }).then(() => {            
            setComments(comments.filter(function(item) {
                return item !== someComment
            }))
            toast.success('comment deleted!')
        }).catch((err) => toast.error(err.message))
    } 

    // Function to save Post
    const postToBeSaved = async () => {
        const postRef = doc(db, 'posts', props.postId)
        await updateDoc(postRef, {
            savedBy: arrayUnion(props.currentUser)
        }).then(() => setSavedByCurrentUser(true))
    }

    // Function to unsave the Post
    const postToBeUnsaved = async () => {
        const postRef = doc(db, 'posts', props.postId)
        await updateDoc(postRef, {
            savedBy: arrayRemove(props.currentUser)
        }).then(() => setSavedByCurrentUser(false))
    }
    

    // Function for uploading the comments
    const pushComment = async (e) => {
        e.preventDefault()
        if (!message.length) {
            toast.warn('Please, write something before comment')
        } else {
            setComments([ ...comments, { message, author: props.currentUser } ])
            setMessage('')
            const postRef = doc(db, 'posts', props.postId)
            await updateDoc(postRef, {
                comments: arrayUnion({ message, author: props.currentUser })
            }).then(() => toast.success('comment created!'))  
            .catch((err) => toast.error(err.message))          
        }        
    }     

    return (
        <div className='flex flex-col items-center'>
            <div className='container max-w-lg md:h-56 flex flex-row space-y-3 mt-20 mx-10 no-underline rounded-lg md:overflow-hidden shadow-lg bg-white ring-1 ring-slate-900/5'>
                <div className="md:flex w-full">
                    <a href={`posts/${props.postId}`} className="">
                        <img src={props.image} alt="" className='h-52 w-full object-cover md:h-full md:w-80 rounded-md md:rounded-l-lg md:hover:scale-95' />
                    </a>
                    <div className="p-5 max-w-xl w-full flex flex-col h-full md:justify-between">
                        <div className="flex justify-end items-center">
                            <p className='ml-3 text-sm mr-2 xs:mr-0'>{props.date}</p>
                            <div className='flex-col'>
                                <svg id="onSave" xmlns="http://www.w3.org/2000/svg" onClick={savedByCurrentUser ? postToBeUnsaved : postToBeSaved} cursor='pointer' fill="none" viewBox="0 0 24 24" strokeWidth={3.5} stroke="currentColor" className={`w-4 h-4 relative active:scale-95 ${savedByCurrentUser ? "text-red-400" : "text-gray-500"}`}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                </svg>                             
                                <span id='onSaveHover' className='font-normal mt-3 p-1 pb-1.5 rounded-lg bg-slate-100 text-gray-500 text-xs absolute'>{savedByCurrentUser ? 'undo save' : 'save post'}</span>
                            </div>
                        </div>
                        <div>
                            <p className="flex justify-between mt-1 tracking-wide no-underline">
                                <a href={`posts/${props.postId}`} className='text-lg leading-tight uppercase font-bold text-black'>
                                {props.title}        
                                </a>    
                            </p>
                            <p className="my-2 text-slate-500 h-28 overflow-hidden">{props.description}</p>
                        </div>
                        <div className="flex justify-end bottom-0">
                            <div className="uppercase tracking-wide text-xs text-indigo-500 font-semibold">BY {props.author}</div>
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
                <div className="container max-w-2xl my-5 mx-auto p-5 flex flex-col rounded border-b shadow-lg bg-white">
                    <p className="w-full text-sm font-bold text-gray-700">Comments</p>
                    {comments?.map(comment => (
                        <Comment
                            key={comments.indexOf(comment)}
                            author={comment.author}
                            message={comment.message}
                            deleteThisComment={() => deleteThisComment(comment)}
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
        </div>
    )
}

export default Post
