// React
import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { UserContext }from './context/Context.js';

// Toast
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Firebase
import { auth } from './config/firebase-config';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// Components
import Navbar from './components/Navbar'

// Views
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import SavedPosts from './views/SavedPosts';
import Home from './views/Home';
import CreatePost from './views/CreatePost';
import EditPost from './views/EditPost';
import ViewPost from './views/ViewPost';
import MyPosts from './views/MyPosts';
import News from './views/News';
import Chats from './views/Chats';



function App() {
  const [userContext, setUserContext] = useState(auth.currentUser?.email)
  const navigate = useNavigate()  

  setTimeout(() => {
    signOut(auth)
    .then(() => toast.success('logeout'))
    .catch(err => toast.error(err.message))
  }, 600000)
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {      
      setUserContext(user?.email)
    })
  }, [])

  // Signing out logic
  const Logout = async () => {
    await signOut(auth)
      .then(() => {
        setUserContext(auth?.currentUser)
        navigate('/login')
        toast.success('Successfully logged out!')
        localStorage.clear()
      }).catch((err) => console.log(err))
  }

  return (
    <div className="App pb-72">      
      <Navbar
        user={userContext}
        logoutFunc={Logout}
      />
      <div>
        <ToastContainer
          limit={1}
          position="top-center"
          autoClose={2500}
          hideProgressBar={true}
          closeButton={false}
          closeOnClick
          transition={Zoom}
          pauseOnFocusLoss={false}
        />
      </div>
      <UserContext.Provider value={userContext}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/myposts' element={<MyPosts />} />
          <Route path='/bookmarked' element={<SavedPosts />} />
          <Route path='/create' element={<CreatePost /> } />
          <Route path='/news' element={<News /> } />
          <Route path='/chat' element={<Chats /> } />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='/posts/:id' element={<ViewPost />} />
          <Route path='/*' element={<Home />} />
        </Routes>
      </UserContext.Provider>      
    </div>
  );
}

export default App;
