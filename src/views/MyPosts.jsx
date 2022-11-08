import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import postcss from 'postcss'
import Post from '../components/Post'
import SignInBadge from '../components/SignInBadge'

const MyPosts = (props) => {
    const [user, setUser] = useState(props.user)
    const [posts, setPosts] = useState([])

    useEffect(() => {
        setUser(props.user)
    
        const getData = async () => {
          try {
            const data = await getDocs(collection(db, 'posts'))
            const dataArray = data.docs.map(doc => ({ id: doc.id, ...doc.data() }))
            dataArray.map(post => post.author == user)
            console.log(dataArray)
            setPosts(dataArray)
          } catch (error) {
            console.log(error)
          }
        }
        getData()
      }, [props.user])


  return user ? (
    <div>
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
