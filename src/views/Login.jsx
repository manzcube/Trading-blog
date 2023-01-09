import React, { useContext, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase-config'

// Components
import FormInput from '../components/FormInput'
import Button from '../components/Button'
import { UserContext } from '../context/Context'


const Login = () => {

  // Peeces of state
  const navigate = useNavigate()
  const userContext = useContext(UserContext)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData


  // OnChange for input fields
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const styleError = (err) => {
    return err.code.replace('auth/', '').replace('-', ' ')
  }
  // Check is user is already logged in
  // useEffect(() => {
  //   if (props.user) navigate('/')    
  // }, [props.user])

  // Submit the login
  const onSubmit = async (e) => {
    // Prevent de default behaviour
    e.preventDefault()
    //Check if the user information is correct
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user
        navigate('/dashboard')
        toast.success(`Successfully logged in ${user?.email}`)
       
      }).catch((err) => {
        toast.error(styleError(err))
      }) 
  }

  return userContext ? (
    <Navigate to='/' />
  ) : (
    <div className='w-full max-w-md mx-auto mt-20'>
      <form onSubmit={onSubmit} className='bg-white shadow-md rounded px-8 py-10 mb-4 flex flex-col'>
        <span className='flex w-full justify-center font-bold text-slate-500 mb-5 px-10 text-lg'>Log In</span>
        <FormInput 
          value={email}
          label='Email'
          inputProps={{ type: 'email', name: 'email', placeholder: 'Your email', id: 'email' }}
          onChange={onChange}
        />
        <FormInput 
          value={password}
          label='Password'
          inputProps={{ type: 'password', name: 'password', placeholder: 'Your password', id: 'password' }}
          onChange={onChange}
        />
        <Button inputProps={{ type: 'submit'}}>Submit</Button>
      </form>
    </div>
  )
}

export default Login
