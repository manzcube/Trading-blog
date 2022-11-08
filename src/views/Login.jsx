import React, { useEffect, useState } from 'react'
import { auth } from '../config/firebase-config'

import FormInput from '../components/FormInput'
import Button from '../components/Button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import checkLogInForm from '../middleware/checkLogInForm'

const Login = (props) => {
  let navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  useEffect(() => {
    if (props.user) {
      return navigate(-1)
    }
  }, [props.user])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (props.user) {
      return navigate('/')
    }    
    else if (checkLogInForm(formData)) {
        await signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user
            console.log(user)
          }).catch((err) => {
            console.log(err)
          })
    } else {
      console.log('some parameter in the form is incorrect')
    } 
  }

  return (
    <div className='w-full max-w-md m-auto'>
      <form onSubmit={onSubmit} className='bg-white shadow-md rounded px-8 pt-6 mb-4'>
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
