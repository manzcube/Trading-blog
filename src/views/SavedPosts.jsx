import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../context/Context'

// Firebase
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../config/firebase-config'

// Components
import Post from '../components/Post'
import SignInBadge from '../components/SignInBadge'
import { toast } from 'react-toastify'

const SavedPosts = () => {
  const [posts, setPosts] = useState([])
  const userContext = useContext(UserContext)

  const getSortedPosts = (slice) => {
    return slice.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  }

  useEffect(() => {
    console.log('running useeffect')
    const getData = async () => {
      try {
        // Check if there is already data posts to avoid inifnite re-rendering
        if (!posts.length && userContext) { 
          const data = await getDocs(collection(db, "posts")) // Get all posts
          const dataArray = data.docs.map(doc => ({ id: doc.id, ...doc.data() })) // Assign id's for posst        
          const sortedArray = getSortedPosts(dataArray)
          setPosts(sortedArray)
        }
      } catch (err) {
        toast.error(err.message)
      }
    }
    getData()
  }, [userContext, posts.length])

  const checkIfSaved = (currentPost) => {
    return currentPost?.savedBy?.includes(userContext)
  }

  return userContext ? (
    <div className='pb-10 flex flex-wrap justify-center'>
      <span className='flex justify-center uppercase w-full font-bold text-xl mt-10'>Saved Posts</span>
        {posts.map(post => post?.savedBy?.includes(userContext) ? (
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
      ) : null )}
    </div>
  ) : <SignInBadge />
}

export default SavedPosts;
