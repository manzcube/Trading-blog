import React, { useEffect, useState } from 'react'

// Firebase
import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../config/firebase-config'

// Components
import Post from '../components/Post'
import SignInBadge from '../components/SignInBadge'
import { toast } from 'react-toastify'

const MyPosts = (props) => {
  const [posts, setPosts] = useState([])

  const getSortedPosts = (slice) => {
    return slice.sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
    })
  }

  useEffect(() => {
    const getData = async () => {
      try {
        // Check if there is already data posts to avoid inifnite re-rendering
        if (!posts.length && props.user) { 
          const q = query(collection(db, 'posts'), where("author", "==", props.user))
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
  }, [props.user, posts.length])

  const checkIfSaved = (currentPost) => {
    return currentPost?.savedBy?.includes(props.user)
  }

  return props.user ? (
    <div className='pb-10 m-10'>
      <span className='flex w-full justify-center font-bold text-slate-500 my-20 px-10 text-xl'>My Posts</span>
        {posts.map(post => (
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

export default MyPosts
