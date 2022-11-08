import React, { useState, useEffect } from 'react'

import SignInBadge from '../components/SignInBadge'

const Bookmarked = (props) => {
  const [user, setUser] = useState(props.user)

  useEffect(() => {
    setUser(props.user)
  }, [props.user])
  
  return user ? (
    <div>
      bookemarkessdfg
    </div>
  ) : <SignInBadge />
}

export default Bookmarked
