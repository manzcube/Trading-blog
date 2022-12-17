// React
import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

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



function App() {
  const [user, setUser] = useState(auth?.currentUser?.email)
  const navigate = useNavigate()  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user?.email)
    })
  }, [])

  // Signing out logic
  const Logout = async () => {
    await signOut(auth)
      .then(() => {
        setUser(auth?.currentUser)
        navigate('/login')
        toast.success('Successfully logged out!')
        localStorage.clear()
      }).catch((err) => console.log(err))
  }

  return (
    <div className="App pb-72">      
      <Navbar
        email={auth.currentUser?.email}
        logoutFunc={Logout}
        user={user}
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
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login user={user} />} />
        <Route path='/dashboard' element={<Dashboard user={user} />} />
        <Route path='/myposts' element={<MyPosts user={user} />} />
        <Route path='/bookmarked' element={<SavedPosts user={user} />} />
        <Route path='/create' element={<CreatePost user={user} /> } />
        <Route path='/news' element={<News user={user} /> } />
        <Route path='/edit/:id' element={<EditPost user={user} />} />
        <Route path='/posts/:id' element={<ViewPost user={user} />} />
        <Route path='/*' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
