import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { PostContext } from '../index'
// Firebase 
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase-config'

// Components
import SignInBadge from '../components/SignInBadge'
import Post from '../components/Post'



const Dashboard = (props) => {
  const [user, setUser] = useState(props.user) // Implement useOCntext for order state, and user, also to access docs and sftuff from all components
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()
  // const orderOfPost = useContext(PostContext)


  const getSortedPosts = (slice) => {
    const newArray = []
    const len = slice.length
    
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len; j++) {
        if (slice[j].order === i) {
          newArray.push(slice[j])
        }
      }
    }
    return newArray
  }

  useEffect(() => {
    setUser(props.user) // Update user
    const getData = async () => {
      try {
        const data = await getDocs(collection(db, 'posts')) // Get all posts
        const dataArray = data.docs.map(doc => ({ id: doc.id, ...doc.data() })) // Assign id's for posst        
        setPosts(getSortedPosts(dataArray))
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [props.user])


  
  
  
  return user ? (
    <div className='m-10 pb-10'>
      <button onClick={() => navigate('/create')} className="group block max-w-xs mb-20 rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500 hover:scale-95">
        <div className="flex items-center space-x-3">          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 stroke-sky-500 group-hover:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">New trade post</h3>
        </div>
        <p className="text-slate-500 group-hover:text-white text-sm">Create a new report from your recent trades.</p>
      </button>
      {posts?.map(post => (
        <Post
          key={post.id}
          postId={post.id}
          title={post.title}
          description={post.description}
          date={post.date}
          author={post.author}
          image={post?.imageURL}
          currentUser={user}
          comments={post.comments}
        />
      ))}
      
    </div>
    
  ) : <SignInBadge />
}

export default Dashboard
