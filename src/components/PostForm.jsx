import React from 'react'
import FormInput from './FormInput'
import Button from './Button'

const PostForm = ({ header, onSubmit, onChange, title, image, description}) => {
  return (
    <form onSubmit={onSubmit} className='bg-white shadow-md rounded px-8 w-2/4 py-10 space-y-8 flex flex-col justify-between'>
        <title className='flex justify-center text-slate-500 font-bold text-lg'>{header}</title>

        <FormInput 
            value={title}
            label='Title*'
            inputProps={{ type: 'text', name: 'title', placeholder: 'Your title', id: 'title' }}
            onChange={onChange}
        />


        <label htmlFor='file-upload' className="block text-grey-700 text-sm font-bold mb-2">
            Image
            <input 
            type="file" 
            id='file-upload'
            value={image}
            onChange={onChange}
            className={`shadow appearance-none  rounded w-full py-2 px-3 mt-2 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline`}
            />
        </label>
        {/* <FormInput
            inputProps={{ type: 'file', name: 'image' }}
            value={image}
            onChange={onChange}
        /> */}

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
      
  )
}

export default PostForm
