import React, { useState } from 'react'

const Navbar = ({ email, logoutFunc, user }) => {
    const [dropDown, setDropDown] = useState(false)


    return (
        <React.Fragment>
            <nav className='h-12 drop-shadow-md bg-sky-500 sm:h-12 flex justify-between m-5 rounded'>
                <div className='ml-3 flex items-center'>
                    <a href="/" className='decoration-0 text-white'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </a>
                    <span className='mx-3 text-white'>{email}</span>
                </div>
                <div className='mr-3 flex items-center'>
                    <div className='hidden sm:flex text-white'>
                        <a href="/dashboard" className='mx-3'>Dashboard</a>
                        <a href="/myposts" className='mx-3'>My Posts</a>
                        <a href="/bookmarked" className='mx-3'>Saved Posts</a>
                        {user ? (
                        <button onClick={logoutFunc} className='mx-3'>Logout</button>
                        ) : (
                        <a href="/login" className='mx-3'>Login</a>
                        )}  
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white sm:hidden" onClick={() => setDropDown(!dropDown)} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0l-3.75-3.75M17.25 21L21 17.25" />
                    </svg>
                </div>                  
            </nav>
            <div className={`${dropDown ? 'flex ' : 'hidden'} flex-col items-end p-5 mr-10 mx-auto space-y-3 bg-white text-sky-600 sm:hidden`}>
                <a href="/dashboard" className='mx-3 border-b-2'>Dashboard</a>
                <a href="/myposts" className='mx-3 border-b-2'>My Posts</a>
                <a href="/bookmarked" className='mx-3 border-b-2'>Saved Posts</a>
                {user ? (
                <button onClick={logoutFunc} className='mx-3 border-b-2'>Logout</button>
                ) : (
                <a href="/login" className='mx-3 border-b-2'>Login</a>
                )}  
            </div>  
        </React.Fragment>
    )
}

export default Navbar