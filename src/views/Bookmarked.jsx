import React from 'react'

// FIltering 
 // const filteredCoins = coins.filter(coin => 
  //   coin.name.toLowerCase().includes(search.toLowerCase())  
  // )
const Bookmarked = () => {

  return (
    <div className='flex flex-col md:flex-row p-20'>
      <img className='flex object-cover max-w-md' src={'https://imgs.search.brave.com/ECyG1BN_UQBX1maLX_LdUJRg-8PVbku6zTlVCHdb668/rs:fit:640:586:1/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxMi8w/NC8wMS8xOC81NS93/b3JrLWluLXByb2dy/ZXNzLTI0MDI3XzY0/MC5wbmc'} />
      <h1 className='text-xl md:text-4xl'>Coming soon! We are working on this</h1>
    </div>
  )
}

export default Bookmarked
