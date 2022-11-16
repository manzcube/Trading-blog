import React from 'react'
import './Button.css'

const Button = ({ children, inputProps, onClick }) => {
  return (
    <button 
        { ...inputProps }
        className='bg-sky-500 text-white py-2 px-6 mx-auto mt-3 rounded btn active:shadow-none active:mt-5'
        onClick={onClick}
    >
        {children}
    </button>
  )
}

export default Button
