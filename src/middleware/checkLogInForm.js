

const checkLogInForm = ({ email, password }) => {
    if (email === process.env.REACT_APP_USER1_EMAIL || email === process.env.REACT_APP_USER2_EMAIL) {
        return true
    } 
    return false
}

export default checkLogInForm
