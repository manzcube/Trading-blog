import React from 'react'

const Comment = (props) => {

  return (
    <span className='w-full p-2 flex items-center justify-between space-x-2'>
        <div>
          <p className='font-bold text-xs'>{props.author}</p>
          <p className='text-slate-500'>{props.message}</p>
        </div>
        <button onClick={props.deleteThisComment}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>        
    </span>
  )
}

export default Comment