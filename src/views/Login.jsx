import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase-config'

// Components
import FormInput from '../components/FormInput'
import Button from '../components/Button'

// Middleware
import checkLogInForm from '../middleware/checkLogInForm'

const Login = (props) => {

  // Peeces of state
  let navigate = useNavigate()
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

  // Check is user is already logged in
  useEffect(() => {
    if (props.user) {
      return navigate(-1)
    }
  }, [props.user])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (props.user) {
      navigate('/')
      toast.success(`You're already logged in`)      
    }    
    else if (checkLogInForm(formData)) {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user
            navigate('/dashboard')
            toast.success(`Successfully logged in ${user?.email}`)
          }).catch((err) => {
            console.log('Something went wrong')
            toast.error(err.code)
          })
    } else {
      toast.error('Email or Password incorrect!')
    } 
  }

  return (
    <div className='w-full max-w-md mx-auto mt-20'>
      <form onSubmit={onSubmit} className='bg-white shadow-md rounded px-8 py-10 mb-4 flex flex-col'>
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
