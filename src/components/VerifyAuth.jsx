import React from 'react'

const VerifyAuth = ({ children, author, user }) => {
  if (author == user) {
    return children
  } else {
    console.log('you mutherfucker this is mine')
  }
}

export default VerifyAuth
