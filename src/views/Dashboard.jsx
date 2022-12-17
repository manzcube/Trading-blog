import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { PostContext } from '../index'
// Firebase 
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase-config'

// Components
import SignInBadge from '../components/SignInBadge';
import Post from '../components/Post';
import CreatePostButton from '../components/CreatePostButton';



const Dashboard = (props) => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  const getSortedPosts = (slice) => {
    return slice.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        if (!posts.length && props.user) {
          const data = await getDocs(collection(db, "posts")) // Get all posts
          const dataArray = data.docs.map(doc => ({ id: doc.id, ...doc.data() })) // Assign id's for posst        
          const sortedArray = getSortedPosts(dataArray)
          setPosts(sortedArray)
        }        
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [props.user, posts.length])

  const checkIfSaved = (currentPost) => {
    return currentPost?.savedBy?.includes(props.user)
  }
  
  return props?.user ? (
    <div className='m-10 pb-10'>
      <CreatePostButton onClick={() => navigate('/create')} />
      {posts?.map(post => (
        <Post
          key={post.id}
          postId={post.id}
          title={post.title}
          description={post.description}
          date={post.date}
          author={post.author}
          image={post?.imageURL}
          currentUser={props?.user}
          comments={post.comments}
          savedByCurrentUser={checkIfSaved(post)}
        />
      ))}      
    </div>
  ) : <SignInBadge />
}

export default Dashboard
