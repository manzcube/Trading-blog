import React from 'react'

const SinglePost = ({ imageURL, title, description, author, date }) => {
  return (
    <>
        <div className='container max-w-3xl flex flex-row space-y-3 mx-10 mb-14 bg-white'>
            <div className="w-full">
                <img src={imageURL} alt="image" className='h-96 w-full object-cover' />          
            <div className="p-5 w-full">
                <div className="flex justify-end mb-3">
                    <p>{date}</p>
                </div>
                <p className="block mt-1 text-lg leading-tight font-bold text-black">{title}</p>
                <p className="m-3 h-full max-w-2xl text-slate-500">{description}</p>
                <div className="flex justify-end h-full bottom-0 mt-5">
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">BY {author}</div>
                </div>                                      
            </div>
            </div>             
        </div>
    </>
  )
}

export default SinglePost