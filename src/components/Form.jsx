import React from 'react'

// Components
import FormInput from './FormInput'
import Button from './Button'

const Form = ({ onSubmit, formTitle, onChange, title, description, imageOnChange }) => {
  return (
    <div className='flex justify-center items-center py-16 h-full'>
        <form onSubmit={onSubmit} className='bg-white shadow-md rounded px-8 mx-10 w-full md:w-2/4 py-10 space-y-8 flex flex-col justify-between'>
            <title className='flex justify-center text-slate-500 font-bold text-lg'>{formTitle}</title>

            <FormInput 
                value={title}
                label='Title*'
                inputProps={{ type: 'text', name: 'title', placeholder: 'Your title', id: 'title' }}
                onChange={onChange}
            />

            <div>
                <label htmlFor='file-upload' className="block text-grey-700 text-sm font-bold mb-2">
                    Image
                </label>
                <input 
                    type="file" 
                    id='file-upload'
                    onChange={imageOnChange}
                    className='shadow appearance-none  rounded w-full py-2 px-3 mt-2 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline'
                />                
            </div>

            <div>
                <label htmlFor="description" className='block text-grey-700 text-sm font-bold mb-2'>Description*</label>
                <textarea 
                    required
                    className='shadow appearance-none bg-gray-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                    value={description} 
                    onChange={onChange}
                    name="description" 
                    placeholder='Your description' 
                    id='description' 
                    cols="30" 
                    rows="10"
                >
                </textarea>
            </div>


            <Button inputProps={{type: 'submit'}}>Submit</Button>
        </form>
    </div>
  )
}

export default Form