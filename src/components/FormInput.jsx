import React from 'react'

const FormInput = ({ label, inputProps, value, onChange }) => {
  return (
    <div className='mb-4'>
        <label htmlFor={inputProps.id} className='block text-grey-700 text-sm font-bold mb-2'>{label}</label>
        <input
            {...inputProps}
            className='shadow appearance-none bg-gray-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            value={value}
            required
            onChange={onChange}
        />
    </div>
  )
}

export default FormInput
