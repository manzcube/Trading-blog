import React from 'react'

const Post = (props) => {  

    return (
        <a href={`posts/${props.postId}`} className='container max-w-3xl md:h-56 flex flex-row space-y-3 mx-auto mb-14 rounded-lg overflow-hidden shadow-lg bg-white ring-1 ring-slate-900/5 hover:scale-105'>
            <div className="md:flex w-full">
                <div className="md:shrink-0">
                    <img src={props.image} alt="image" className='h-48 w-full object-cover md:h-full md:w-48 rounded-lg' />
                </div>
                <div className="p-5 max-w-xl w-full flex flex-col h-full justify-between">
                    <div className="flex justify-end">
                        <p>{props.date}</p>
                    </div>
                    <div>
                        <p className="block mt-1 text-lg leading-tight uppercase tracking-wide font-bold text-black hover:underline">{props.title}</p>
                        <p className="my-2 text-slate-500 h-28 overflow-hidden">{props.description}</p>
                    </div>
                    <div className="flex justify-end bottom-0">
                        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">BY {props.author}</div>
                    </div>                                      
                </div>
            </div>             
        </a>
    )
}

export default Post
