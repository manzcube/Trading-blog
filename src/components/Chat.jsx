import React from 'react'

const Chat = ({ author, message, date }) => {
  return (
    <div className='rounded-xl bg-green-100 shadow-sm w-full max-w-md p-2 px-3 my-4 text-sm flex flex-col'>
        <span className='w-full flex chatInnerDiv justify-between'>
            <p className='font-bold text-xs text-purple-400'>{author}</p>
            <p className='text-xs'>{date}</p>
        </span>
        <span className='text-gray-800 my-2'>{message}</span>
    </div>
  )
}

export default Chat