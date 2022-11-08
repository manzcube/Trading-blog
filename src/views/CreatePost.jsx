import React, { useState, useEffect } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import FormInput from '../components/FormInput';
import SignInBadge from '../components/SignInBadge';

import { v4 } from 'uuid'

import { db } from '../config/firebase-config'
import { storage } from '../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const CreatePost = (props) => {
    const [user, setUser] = useState(props.user)
    const [picture, setPicture] = useState(null)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    })  
    const { title, description } = formData


    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value, 
        }))
    }

    const genDate = () => {
        const date = new Date()
        return date.toUTCString()
    }    

    const onSubmit = async (e) => {
        e.preventDefault()
        try {   
            const imageRef = ref(storage, `images/${picture.name + v4()}`)
            uploadBytes(imageRef, picture).then(() => {
                console.log('image uploaded') 
                getDownloadURL(imageRef).then(url => {
                    const docRef = addDoc(collection(db, "posts"), {
                        title,
                        description,
                        date: genDate(),
                        author: user,
                        imageURL: url,
                    }).then(() => {
                        console.log('post created!')
                        navigate('/dashboard')
                    })  
                })
            })   
        } catch (err) {
            console.log(err)
        }
        
    }

  return user ? (
    <div className='flex justify-center items-center py-16 h-full'>
        <form onSubmit={onSubmit} className='bg-white shadow-md rounded px-8 w-2/4 py-10 space-y-8 flex flex-col justify-between'>
            <title className='flex justify-center text-slate-500 font-bold text-lg'>Create a new Post</title>

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
                    required
                    id='file-upload'
                    onChange={e => { setPicture(e.target.files[0]) }}
                    className={`shadow appearance-none  rounded w-full py-2 px-3 mt-2 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline`}
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
  ) : <SignInBadge  />
}

export default CreatePost
