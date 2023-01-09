import React, { useContext, useEffect, useState } from 'react'

// Firebase
import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../config/firebase-config'

// Components
import Post from '../components/Post'
import SignInBadge from '../components/SignInBadge'
import { toast } from 'react-toastify'
import { UserContext } from '../context/Context'

const MyPosts = () => {
  const [posts, setPosts] = useState([])
  const userContext = useContext(UserContext)

  const getSortedPosts = (slice) => {
    return slice.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        // Check if there is already data posts to avoid inifnite re-rendering
        if (!posts.length && userContext) { 
          const q = query(collection(db, 'posts'), where("author", "==", userContext))
          const data = await getDocs(q)
          const dataArray = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
          const sortedArray = getSortedPosts(dataArray)
          setPosts(sortedArray)
        }
      } catch (err) {
        toast.error(err.message)
      }
    }
    getData()
  }, [userContext])

  const checkIfSaved = (currentPost) => {
    return currentPost?.savedBy?.includes(userContext)
  }

  return userContext ? (
    <div className='pb-10 flex flex-wrap justify-center'>
      <span className='flex justify-center uppercase w-full font-bold text-xl mt-10'>My Posts</span>
        {posts.map(post => (
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
  ) : <SignInBadge />
}

export default MyPosts
