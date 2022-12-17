import React, { useEffect, useState } from 'react'

// Firebase
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../config/firebase-config'

// Components
import Post from '../components/Post'
import SignInBadge from '../components/SignInBadge'
import { toast } from 'react-toastify'

const SavedPosts = (props) => {
  const [posts, setPosts] = useState([])

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
        if (!posts.length && props.user) { 
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
  }, [props.user, posts.length])

  const checkIfSaved = (currentPost) => {
    return currentPost?.savedBy?.includes(props.user)
  }

  return props.user ? (
    <div className='pb-10 m-10'>
      <span className='flex w-full font-bold px-10 text-xl my-20'>Saved Posts</span>
        {posts.map(post => post?.savedBy?.includes(props.user) ? (
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
      ) : null )}
    </div>
  ) : <SignInBadge />
}

export default SavedPosts;
