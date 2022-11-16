import React, { useEffect, useState } from 'react'
import { getDocs, collection, where, query } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import Post from '../components/Post'
import SignInBadge from '../components/SignInBadge'

const MyPosts = (props) => {
    const [user, setUser] = useState(props.user)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setUser(props.user)
    
        const getData = async () => {
          try {
            const q = query(collection(db, 'posts'), where("author", "==", user))
            const data = await getDocs(q)
            const dataArray = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            console.log(dataArray)

            if (!posts.length) {
              setPosts(dataArray)
            }

          } catch (error) {
            console.log(error)
          }
        }
        getData()

      }, [props.user, posts])


  return user ? (
    <div>
      <span className='flex w-full font-bold px-10 text-xl my-20'>My Posts</span>
        {posts.map(post => (
        <Post
          key={post.id}
          postId={post.id}
          title={post.title}
          description={post.description}
          date={post.date}
          author={post.author}
          image={post?.imageURL}
        />
      ))}
    </div>
  ) : <SignInBadge />
}

export default MyPosts
