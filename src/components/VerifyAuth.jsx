

const VerifyAuth = ({ children, author, user }) => {
  if (author === user) {
    return children
  } 
}

export default VerifyAuth
