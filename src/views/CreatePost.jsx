import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

// Firebase
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../config/firebase-config';

// Components
import Button from '../components/Button';
import FormInput from '../components/FormInput';
import SignInBadge from '../components/SignInBadge';

const CreatePost = (props) => {
    const navigate = useNavigate()
    const [user, setUser] = useState(props.user)
    const [picture, setPicture] = useState(null)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    })  
    const { title, description } = formData

    // UseEffect 
    useEffect(() => {
        setUser(props.user)
    }, [props.user])

    // OnChange for form fields
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value, 
        }))
    }

    // Func that generates current date
    const genDate = () => {
        const date = new Date()
        return date.toUTCString()
    }    

    const onSubmit = async (e) => {
        e.preventDefault() // We prevent de submit
        const imageRef = ref(storage, `images/${picture.name + v4()}`) // Create img ref and hash fot future URL
            await uploadBytes(imageRef, picture).then(() => { // Upload the image the firebase storage 
                getDownloadURL(imageRef).then(url => { // We get the URL of the img we just uploaded
                    addDoc(collection(db, "posts"), { // Create the post
                        title,
                        description,
                        date: genDate(),
                        author: user,
                        imageURL: url,
                        comments: []
                    }).then(() => {
                        toast.success('Post created!')  // Notify the user
                        navigate('/dashboard') // Move to the dashboard
                    })  
                })
            }).catch((err) => toast.error(err.message))  
    }

  return user ? (
    <div className='flex justify-center items-center py-16 h-full'>
        <form onSubmit={onSubmit} className='flex flex-col justify-between py-10 px-8 mx-10 bg-white shadow-md rounded w-full md:w-2/4 space-between '>
            <title className='flex justify-center text-slate-500 font-bold text-lg'>Create a new Post</title>

            <FormInput 
                value={title}
                label='Title'
                inputProps={{ type: 'text', name: 'title', placeholder: 'Your title', id: 'title' }}
                onChange={onChange}
            />

            <div className='mb-4'>
                <label htmlFor='file-upload' className="block text-gray-500 text-sm font-bold mb-2">
                    Image
                </label>
                <input 
                    type="file" 
                    required
                    id='file-upload'
                    onChange={e => { setPicture(e.target.files[0]) }}
                    className='shadow appearance-none rounded w-full py-2 px-3 mt-2 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline'
                />                
            </div>

            <div className='mb-4'>
                <label htmlFor="description" className='block text-gray-500 text-sm font-bold mb-2'>Description</label>
                <textarea 
                    required
                    className='w-full py-2 px-3 shadow appearance-none bg-gray-100 rounded text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
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
