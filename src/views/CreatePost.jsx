import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../context/Context.js';

import { v4 } from 'uuid';

// Firebase
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../config/firebase-config';

// Components
import SignInBadge from '../components/SignInBadge';
import Form from '../components/Form';


const CreatePost = () => {
    const navigate = useNavigate()
    const [picture, setPicture] = useState(null)
    const userContext = useContext(UserContext)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    })  
    const { title, description } = formData

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
        if (!picture) {
            toast.error('Upload some picture.')
        } else {
            try {
                const imageRef = ref(storage, `images/${picture.name + v4()}`) // Create img ref and hash fot future URL
                    await uploadBytes(imageRef, picture).then(() => { // Upload the image the firebase storage 
                        getDownloadURL(imageRef).then(url => { // We get the URL of the img we just uploaded
                            addDoc(collection(db, "posts"), { // Create the post
                                title,
                                description,
                                date: genDate(),
                                author: userContext,
                                imageURL: url,
                                comments: [],
                            }).then(async () => {
                                toast.success('Post created!')  // Notify the user
                                navigate('/dashboard') // Move to the dashboard                                
                            }).catch((err) => toast.error(err.message))    
                        }).catch((err) => toast.error(err.message))  
                    }).catch((err) => toast.error(err.message))         
            } catch (err) {
                toast.error(err.message)
            }
        }
        
    }

  return userContext ? (
    <Form 
        onSubmit={onSubmit}
        formTitle='Create a new Post'
        onChange={onChange}
        title={title}
        description={description}
        imageOnChange={e => { setPicture(e.target.files[0]) }}
    />
  ) : <SignInBadge  />
}

export default CreatePost
