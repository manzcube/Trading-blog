import React from 'react'

const BackToDashboard = () => {
  return (
    <a className='w-full flex justify-start items-center mt-10 ml-20' href='/dashboard'>
      <div className="flex items-center p-2 hover">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <p className='font-bold ml-2'>Back to Dashboard</p>
      </div>        
    </a>  
  )
}

export default BackToDashboard