import React from 'react'

const Button = ({ children, inputProps, onClick }) => {
  return (
    <button 
        { ...inputProps }
        className='bg-sky-500 text-white py-2 px-6 my-10 rounded hover:bg-sky-500 hover:scale-95'
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default Button
