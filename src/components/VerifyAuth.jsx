import React from 'react'

const VerifyAuth = ({ children, author, user }) => {
  if (author == user) {
    return children
  } else {
    console.log('you are not authorized')
  }
}

export default VerifyAuth
