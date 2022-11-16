import React, { useState } from 'react'


const Post = (props) => {  
    const [bookmarked, setBookmarked] = useState(false)

    return (
        <div className='container max-w-3xl md:h-56 flex flex-row space-y-3 mx-auto mb-14 no-underline rounded-lg md:overflow-hidden shadow-lg bg-white ring-1 ring-slate-900/5 hover:scale-95'>
            <div className="md:flex w-full">
                <a href={`posts/${props.postId}`} className="">
                    <img src={props.image} alt="image" className='h-48 w-full object-cover md:h-full md:w-48 rounded-t-lg md:rounded-l-lg' />
                </a>
                <div className="p-5 max-w-xl w-full flex flex-col h-full md:justify-between">
                    <div className="flex justify-end items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 h-5 ${bookmarked ? 'text-blue-400' : 'text-gray-400'}`} onClick={() => setBookmarked(!bookmarked)}> 
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                        </svg>


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
    )
}

export default Post
