import React, { useState, useEffect } from 'react'

import SignInBadge from '../components/SignInBadge'

const Bookmarked = (props) => {
  const [user, setUser] = useState(props.user)

  useEffect(() => {
    setUser(props.user)
  }, [props.user])
  
  return user ? (
    <div>
      <span className='flex w-full font-bold px-10 text-xl my-20'>Saved Posts</span>
        {/* {posts.map(post => (
        <Post
          key={post.id}
          postId={post.id}
          title={post.title}
          description={post.description}
          date={post.date}
          author={post.author}
          image={post?.imageURL}
        />
      ))} */}
    </div>
  ) : <SignInBadge />
}

export default Bookmarked
