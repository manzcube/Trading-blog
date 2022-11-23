import React from 'react'

const Comment = (props) => {
  return (
    <span className='w-full p-2 rounded'>
        <p className='font-bold text-xs'>{props.author}</p>
        <p className='text-slate-500'>{props.message}</p>
    </span>
  )
}

export default Comment