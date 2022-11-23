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
    <div className='flex flex-col justify-center items-center py-16 h-full mx-10'>      
      <SinglePost
        imageURL={imageURL}
        author={author}
        description={description}
        title={title}
        date={date} 
      />
      <div className="w-full flex justify-end ViewPostButtons">
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
