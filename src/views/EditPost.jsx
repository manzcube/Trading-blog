import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { v4 } from 'uuid'
import { toast } from 'react-toastify';

// Firebase 
import { onSnapshot, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage'
import { db, storage } from '../config/firebase-config'

// Components
import Form from '../components/Form';
import SignInBadge from '../components/SignInBadge';


const EditPost = (props) => {
    const navigate = useNavigate()
    const params = useParams()
    const [user, setUser] = useState(props.user)
    const [picture, setPicture] = useState(null)    
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })  
    const { title, description, imageURL } = formData


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

    // Submit edited post
    const onSubmit = async (e) => {
        // First prevent the default submmiting
        e.preventDefault()
        try {  
            // If the user added a new picture
            if (picture) {
                // We update the doc with the old imageURL                    
                await updateDoc(doc(db, "posts", params.id), {
                    title, 
                    description
                }).then(() => {
                    //If successfull, we delete the old picture from firebase storage
                    const delImgRef = ref(storage, imageURL) 
                    deleteObject(delImgRef)
                    //Create instance of the new picture and upload it to storage
                    const imageRef = ref(storage, `images/${picture.name + v4()}`)  
                    uploadBytes(imageRef, picture).then(async () => {
                        // Now we get the url of the new picture
                        await getDownloadURL(imageRef).then(async url => {
                            // And we update again the doc, by this way, if there is some problem on the doc update, no image will be changed.
                            await updateDoc(doc(db, "posts", params.id), {
                                imageURL: url,
                            })
                    }).catch((err) => toast.error(err.message))
                    navigate(`/posts/${params.id}`)
                    toast.success('Successfully updated!')
                }).catch((err) => {
                    toast.error(err.message)
                })
            })
                // If there is no new picture
            } else {
                await updateDoc(doc(db, "posts", params.id), {
                    title, 
                    description
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
    <Form 
        onSubmit={onSubmit}
        formTitle='Edit a Post'
        onChange={onChange}
        title={title}
        description={description}
        imageOnChange={e => { setPicture(e.target.files[0]) }}
    />
  ) : <SignInBadge  />
}

export default EditPost
