import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// Firebase
import { deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage'
import { storage, db } from '../config/firebase-config';

// Components
import VerifyAuth from '../components/VerifyAuth';
import SignInBadge from '../components/SignInBadge';
import SinglePost from '../components/SinglePost';

const ViewPost = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(props.user)
  const [del, setDel] = useState(false)
  const [postData, setPostData] = useState({})
  const { imageURL, title, description, author, date } = postData

  useEffect(() => {
    setUser(props.user)
    try {
      onSnapshot(doc(db, "posts", params.id), doc => { // Retrieve info from single doc
        if (doc.data()) {
          setPostData(doc.data())
        } 
      })
    } catch(err) {
      toast.error(err.message)
    }    
  }, [params.id, props.user])

  // Handle post remove
  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", params.id)) // Delete doc
    const delImgRef = ref(storage, imageURL) // Delete image
    deleteObject(delImgRef).then(() => {
      setDel(false)
      navigate('/dashboard')  // Return to dashboard
      toast.success('Post Deleted!')
    }).catch(err => {
      toast.error(err.message)
    }) 
  }


  return user ? (
    <div className='flex flex-col justify-center items-center py-16 h-full mx-10 overflow-x-scroll'>      
      <SinglePost
        imageURL={imageURL}
        author={author}
        description={description}
        title={title}
        date={date} 
      />
      <div className="w-full flex justify-end ViewPostButtons">
        <button download className='flex items-center mx-4'>
          Download image
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" />
          </svg>
        </button>
        <VerifyAuth author={author} user={user}>
          <button className='bg-sky-500 text-white py-2 px-6 my-5 mx-4 rounded hover:bg-sky-500 hover:scale-95' onClick={() => navigate(`/edit/${params.id}`)}>Edit</button>
          {del ? (
            <button  className='bg-red-500 text-white py-2 px-6 my-5 mx-4 rounded hover:bg-red-500 hover:scale-95' onClick={deletePost}>Sure?</button>
          ) : (
            <button className='bg-red-500 text-white py-2 px-6 my-5 mx-4 rounded hover:bg-red-500 hover:scale-95' onClick={() => setDel(true)}>Delete</button>
          )}
        </VerifyAuth>
      </div>
    </div>
  ) : <SignInBadge />
}

export default ViewPost
