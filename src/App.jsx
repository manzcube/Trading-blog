// React
import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Firebase
import { auth } from './config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';

// Views
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Bookmarked from './views/Bookmarked';
import Home from './views/Home';
import CreatePost from './views/CreatePost';
import EditPost from './views/EditPost';
import ViewPost from './views/ViewPost';
import MyPosts from './views/MyPosts'

function App() {
  const [user, setUser] = useState(auth?.currentUser)
  const navigate = useNavigate()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user?.email)
    })
  }, [auth])

  const Logout = async () => {
    await signOut(auth)
      .then(() => {
        setUser(auth?.currentUser)
        navigate('/login')
      })  // Need to add a session/local storage cleaner
      .catch((err) => console.log(err))
    console.log(auth)
  }

  return (
    <div className="App">
      <nav className='h-12 drop-shadow-md bg-sky-500 flex justify-between m-5 rounded'>
        <div className='ml-3 flex items-center'>
          <a href="/" className='decoration-0 text-white'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </a>
          <span className='mx-3 text-white'>{auth.currentUser?.email}</span>
        </div>
        <div className='mr-3 flex items-center text-white'>
          <ul>
            <li>
              <a href="/dashboard" className='mx-3'>Dashboard</a>
              <a href="/myposts" className='mx-3'>My Posts</a>
              <a href="/bookmarked" className='mx-3'>Saved Posts</a>
              {user ? (
                <button onClick={Logout} className='mx-3'>Logout</button>
              ) : (
                <a href="/login" className='mx-3'>Login</a>
              )}             
              
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login user={user} />} />
        <Route path='/dashboard' element={<Dashboard user={user} />} />
        <Route path='/myposts' element={<MyPosts user={user} />} />
        <Route path='/bookmarked' element={<Bookmarked user={user} />} />
        <Route path='/create' element={<CreatePost user={user} />} />
        <Route path='/edit/:id' element={<EditPost user={user} />} />
        <Route path='/posts/:id' element={<ViewPost user={user} />} />

      </Routes>
    </div>
  );
}

export default App;
