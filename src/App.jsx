// React
import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Firebase
import { auth } from './config/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { signOut } from 'firebase/auth';

import Navbar from './components/Navbar'

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
      <Navbar
        email={auth.currentUser?.email}
        logoutFunc={Logout}
        user={user}
      />
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
