import React from 'react'

const Bookmarked = () => {
  return (
    <div className='flex flex-col md:flex-row p-20'>
      <img className='flex object-cover' src={require('../resources/w.png')} />
      <h1 className='text-3xl md:text-8xl'>Coming soon! We are working on this</h1>
    </div>
  )
}

export default Bookmarked
