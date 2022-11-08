import { deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../components/Button';
import { db } from '../config/firebase-config';

import VerifyAuth from '../components/VerifyAuth';
import SignInBadge from '../components/SignInBadge';

const ViewPost = (props) => {
  const params = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(props.user)

  const [del, setDel] = useState(false)
  const [postData, setPostData] = useState({})
  const { imageURL, title, description, author, date } = postData

  console.log('author and user', author, user)

  useEffect(() => {
    setUser(props.user)
    onSnapshot(doc(db, "posts", params.id), doc => {
      if (doc.data()) {
        setPostData(doc.data())
      } else {
        console.log('Theres no post with such id dumbass')
      }
    })
  }, [params.id, props.user])

  const deletePost = async () => {
    await deleteDoc(doc(db, "posts", params.id))
    setDel(false)
    navigate('/dashboard')
    console.log('Successfully deleetd')
  }

  const changeDel = () => {
    setDel(true) 
  }


  return user ? (
    <div className='flex flex-col justify-center items-center py-16 h-full'>
      <div className='container max-w-3xl flex flex-row space-y-3 mx-10 mb-14 rounded-lg overflow-hidden shadow-lg bg-white ring-1 ring-slate-900/5'>
        <div className="w-full">
          <img src={imageURL} alt="image" className='h-96 w-full object-cover rounded-t-lg' />
          <div className="p-5 w-full">
              <div className="flex justify-end">
                  <p>{date}</p>
              </div>
              <p className="block mt-1 text-lg leading-tight font-bold text-black hover:underline">{title}</p>
              <p className="m-3 h-full max-w-2xl text-slate-500">{description}</p>
              <div className="flex justify-end h-full bottom-0">
                  <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">BY {author}</div>
              </div>                                      
          </div>
        </div>             
      </div>
      <div className="w-full px-44 flex justify-end">
        <VerifyAuth author={author} user={user}>
          <Button onClick={() => navigate(`/edit/${params.id}`)}>Edit</Button>
          {del ? (
            <button  className='bg-red-500 text-white py-2 px-6 my-10 mx-4 rounded hover:bg-red-500 hover:scale-95' onClick={deletePost}>Sure?</button>
          ) : (
            <button className='bg-red-500 text-white py-2 px-6 my-10 mx-4 rounded hover:bg-red-500 hover:scale-95' onClick={changeDel}>Delete</button>
          )}
        </VerifyAuth>
      </div>
    </div>
  ) : <SignInBadge />
}

export default ViewPost
