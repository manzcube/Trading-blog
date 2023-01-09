import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/Context.js';


const Navbar = ({ user, logoutFunc }) => {
    const [dropDown, setDropDown] = useState(false)
    const { pathname } = window.location

    return (
        <React.Fragment>
            <nav className='h-12 drop-shadow-md bg-sky-500 flex justify-between m-5 rounded'>
                <div className='ml-3 flex items-center'>
                    <a href="/" className='decoration-0 text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </a>
                    <span className='mx-3 text-white'>{user}</span>
                </div>
                <div className='mr-3 flex items-center'>
                    <div className='hidden md:flex text-white'>
                        <a href="/dashboard" className={`mx-3 p-1 ${pathname === '/dashboard' ? 'underline' : ''}`}>Dashboard</a>
                        <a href="/myposts" className={`mx-3 p-1 ${pathname === '/myposts' ? 'underline' : ''}`}>My Posts</a>
                        <a href="/bookmarked" className={`mx-3 p-1 ${pathname === '/bookmarked' ? 'underline' : ''}`}>Saved Posts</a>
                        <a href="/news" className={`mx-3 p-1 ${pathname === '/news' ? 'underline' : ''}`}>News</a>
                        <a href="/chat" className={`mx-3 p-1 ${pathname === '/chat' ? 'underline' : ''}`}>Chat</a>
                        
                        {user ? (
                            <button onClick={logoutFunc} className='p-1'>Logout</button>
                        ) : (
                            <a href="/login" className='p-1 mr-2'>Log in</a>
                        )}  
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white md:hidden" onClick={() => setDropDown(!dropDown)} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                    </svg>
                </div>                  
            </nav>
            <div className={`${dropDown ? 'flex ' : 'hidden'} flex-col items-end p-5 mx-10 space-y-3 bg-sky-500 rounded-md text-white md:hidden`}>
                <a href="/dashboard" className='py-2 px-5 w-full text-end rounded text-white hover:bg-sky-300'>Dashboard</a>
                <a href="/myposts" className='py-2 px-5 w-full text-end rounded text-white hover:bg-sky-300'>My Posts</a>
                <a href="/bookmarked" className='py-2 px-5 w-full text-end rounded text-white hover:bg-sky-300'>Saved Posts</a>
                <a href="/news" className='py-2 px-5 w-full text-end rounded text-white hover:bg-sky-300'>News</a>
                <a href="/chat" className='py-2 px-5 w-full text-end rounded text-white hover:bg-sky-300'>Chat</a>
                {user ? (
                    <button onClick={logoutFunc} className='py-2 px-5 w-full text-end rounded text-white hover:bg-sky-300'>Logout</button>
                ) : (
                    <a href="/login" className='py-2 px-5 w-full text-end rounded text-white hover:bg-sky-300'>Login</a>
                )}  
            </div>  
        </React.Fragment>
    )
}

export default Navbar