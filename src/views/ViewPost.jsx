import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Firebase
import { deleteDoc, doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage'
import { storage, db } from '../config/firebase-config';

// Components
import VerifyAuth from '../components/VerifyAuth';
import SignInBadge from '../components/SignInBadge';
import SinglePost from '../components/SinglePost';
import Comment from '../components/Comment';
import Button from '../components/Button';
import BackToDashboard from '../components/BackToDashboard';

const ViewPost = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const [deletion, setDeletion] = useState(false)

  // Post information
  const [postData, setPostData] = useState({})
  const { title, description, author, date } = postData
  const imageURL = postData?.imageURL

  // Comments stuff
  const [message, setMessage] = useState('')  
  const [comments, setComments] = useState([])


  useEffect(() => {
    try {
      onSnapshot(doc(db, "posts", params.id), doc => { // Retrieve info from single doc
        if (doc.data()) {
          setPostData(doc.data())
          setComments(doc.data()?.comments)
        } 
      })
    } catch(err) {
      toast.error(err.message)
    }    
  }, [params.id])


  // Function for uploading the comments
    const pushComment = async (e) => {
        e.preventDefault()
        if (!message.length) {
            toast.warn('Please, write something before comment')
        } else {
            setComments([ ...comments, { message, author: props.currentUser } ])
            setMessage('')
            const postRef = doc(db, 'posts', params.id)
            await updateDoc(postRef, {
                comments: arrayUnion({ message, author: props.user })
            })
            
        }        
    }  

  // Handle post remove
  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", params.id)) // Delete doc
    const delImgRef = ref(storage, imageURL) // Delete image
    deleteObject(delImgRef).then(() => {
      setDeletion(false)
      navigate('/dashboard')  // Return to dashboard
      toast.success('Post Deleted!')
    }).catch(err => {
      toast.error(err.message)
    }) 
  }


  return props?.user ? (
    <div className='flex flex-col justify-center items-center py-16 h-full mx-10'>   
      <BackToDashboard /> 
      <SinglePost
        imageURL={imageURL}
        author={author}
        description={description}
        title={title}
        date={date} 
      />
        <div className="container max-w-2xl my-5 mx-auto p-5 flex flex-col rounded bg-slate-200">
          {comments?.map(comment => (
              <Comment
                  key={comments.indexOf(comment)}
                  author={comment.author}
                  message={comment.message}
              />
          ))}
          <div className='flex items-center'>
            <input 
              value={message}
              className='shadow appearance-none bg-gray-100 rounded-l mt-5 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              type="text" 
              placeholder='comment something'
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={pushComment}>Add</Button>
          </div>                    
        </div>
      <div className="w-full flex justify-end ViewPostButtons">
        <VerifyAuth author={author} user={props.user}>
          <button className='bg-sky-500 text-white py-2 px-6 my-5 mx-4 rounded hover:bg-sky-500 hover:scale-95' onClick={() => navigate(`/edit/${params.id}`)}>Edit</button>
          {deletion ? (
            <button  className='bg-red-500 text-white py-2 px-6 my-5 mx-4 rounded hover:bg-red-500 hover:scale-95' onClick={deletePost}>Sure?</button>
          ) : (
            <button className='bg-red-500 text-white py-2 px-6 my-5 mx-4 rounded hover:bg-red-500 hover:scale-95' onClick={() => setDeletion(true)}>Delete</button>
          )}
        </VerifyAuth>
      </div>
    </div>
  ) : <SignInBadge />
}

export default ViewPost
