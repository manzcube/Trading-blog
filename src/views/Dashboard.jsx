import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Context.js';

// Firebase 
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../config/firebase-config'

// Components
import SignInBadge from '../components/SignInBadge';
import Post from '../components/Post';
import Chat from '../components/Chat';
import CreatePostButton from '../components/CreatePostButton';
import { toast } from 'react-toastify';



const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const [chats, setChats] = useState([])
  const [chat, setChat] = useState(false)
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const userContext = useContext(UserContext)

  const getSortedData = (slice) => {
    return slice.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  }

  const getSortedChats = (slice) => {
    return slice.sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })
  }

  const genDate = () => {
    const date = new Date()
    return date.toUTCString()
} 

  const pushChat = async (e) => {
    e.preventDefault() // We prevent de submit
    try {
      await addDoc(collection(db, "chats"), { // Create the chat
          date: genDate(),
          author: userContext,
          message,
      }).then(() => {
          setChats([ ...chats, { message, author: userContext, date: genDate(), key: chats.length + 1 }])
          setMessage('')
          toast.success('message created!')  // Notify the user
      }).catch((err) => toast.error(err.message))          
    } catch (err) {
        toast.error(err.message)
    }    
  }

  useEffect(() => {
    const getData = async () => {
      try {
        if (!posts.length && userContext) {
          const dataOfPosts = await getDocs(collection(db, "posts")) // Get all posts
          const dataOfChats = await getDocs(collection(db, "chats")) // Get all chats
          const postsDataArray = dataOfPosts.docs.map(doc => ({ id: doc.id, ...doc.data() })) // Assign id's for posst        
          const chatsDataArray = dataOfChats.docs.map(doc => ({ id: doc.id, ...doc.data() })) // Assign id's for posst        
          const sortedPostsArray = getSortedData(postsDataArray)
          const sortedChatsArray = getSortedChats(chatsDataArray)
          setPosts(sortedPostsArray)
          setChats(sortedChatsArray)
        }        
      } catch (error) {
        toast.error(error.message)
      }
    }
    getData()
  }, [userContext])

  const checkIfSaved = (currentPost) => {
    return currentPost?.savedBy?.includes(userContext)
  }
  
  return userContext ? (
    <div>      
        <div className='w-full flex justify-between px-10 pt-10'>
          <CreatePostButton onClick={() => navigate('/create')} />
          <button onClick={() => setChat(!chat)} className={`${chat ? 'bg-red-400' : 'bg-green-400'} text-white chatStuff text-md my-auto p-3 hover:scale-105 active:scale-95 rounded-full`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </button>
        </div>
        <div className={`${chat ? 'grid grid-cols-2' : ''}`}>
          <div className='flex flex-wrap justify-center mx-10'>
            {posts?.map(post => (
              <Post
                key={post.id}
                postId={post.id}
                title={post.title}
                description={post.description}
                date={post.date}
                author={post.author}
                image={post?.imageURL}
                currentUser={userContext}
                comments={post.comments}
                savedByCurrentUser={checkIfSaved(post)}
              />
            ))} 
          </div>
          <div className={`CHAT chatStuff w-50 shadow-md mx-20 p-10 flex flex-col items-start justify-end rounded-2xl animate__animated animate__bounceInRight bg-green-50 ${chat ? 'flex' : 'hidden'}`}>
            <div className='overflow-y-scroll w-full chatColumn'>
              {chats?.map(chat => (
                <Chat 
                  key={chat.id} 
                  author={chat.author} 
                  message={chat.message} 
                  date={chat.date} 
                />
              ))}
            </div>
            <div className='flex items-center mb-10 w-full'>
              <input 
                  value={message}
                  className='shadow appearance-none bg-white rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  type="text" 
                  placeholder='comment something'
                  onChange={(e) => setMessage(e.target.value)}
              />
              <button className='p-2 bg-green-400 text-white rounded-lg ml-5 hover:scale-105 active:scale-95' onClick={pushChat}>Add</button>
            </div> 
          </div>
        </div>               
    </div>
    
  ) : <SignInBadge />
}

export default Dashboard
