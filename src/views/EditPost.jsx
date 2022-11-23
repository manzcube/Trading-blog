import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { v4 } from 'uuid'
import { toast } from 'react-toastify';

// Firebase 
import { setDoc, onSnapshot, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from '../config/firebase-config'

// Components
import FormInput from '../components/FormInput';
import SignInBadge from '../components/SignInBadge';
import Button from '../components/Button';


const EditPost = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const [user, setUser] = useState(props.user)
    const [picture, setPicture] = useState(null)    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    })  
    const { title, description, date, author, imageURL } = formData


    useEffect(() => {
        setUser(props.user) // Update user
        onSnapshot(doc(db, "posts", params.id), doc => { // Get the doc we wanna update
            if (doc.data()) {
                setFormData(doc.data())  // If the post exists retrieve it
            }
        })
    }, [props.user, params.id])

    // OnChange listener for inputs
    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value, 
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        try {  
            if (picture) {
                const imageRef = ref(storage, `images/${picture.name + v4()}`)  // Logic for image uploading
                uploadBytes(imageRef, picture).then(() => {
                    console.log('image uploaded') 
                    getDownloadURL(imageRef).then(async url => {
                        await setDoc(doc(db, "posts", params.id), {
                            title,
                            date,
                            author,
                            description,
                            imageURL: url,
                        }).then(() => {
                            navigate(`/posts/${params.id}`)
                            toast.success('Successfully updated!')
                        })  
                    })
                })   
            } else {
                await setDoc(doc(db, "posts", params.id), {
                    title,
                    description,
                    author,
                    date, 
                    imageURL
                }).then(() => {
                    navigate(`/posts/${params.id}`)
                    toast.success('Successfully updated!')
                })
            }
            
        } catch (err) {
            toast.error(err.message)
        }
        
    }

  return (user && formData) ? (
    <div className='flex justify-center items-center py-16 h-full'>
        <form onSubmit={onSubmit} className='bg-white shadow-md rounded px-8 mx-10 w-full md:w-2/4 py-10 space-y-8 flex flex-col justify-between'>
            <title className='flex justify-center text-slate-500 font-bold text-lg'>Edit a Post</title>

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

export default EditPost
