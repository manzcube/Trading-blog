

const SinglePost = ({ imageURL, title, description, author, date }) => {
  return (
    <div className='w-full flex flex-row space-y-3 my-14 bg-sky-50'>
        <div className="w-full flex flex-col py-10">
            <img src={imageURL} alt="" className='w-full max-w-6xl object-cover border rounded mx-auto' />  
        
            <div className="lg:px-44 py-20 w-full">
              <span className="w-full flex items-center">
                <p className="block ml-10 mr-2 my-5 text-lg sm:text-2xl leading-tight font-bold text-black">{title}</p>
                <a href={imageURL} target='_blank' rel='noreferrer'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6 mr-8 text-sky-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </span>
                <p className="mx-10 text-lg text-slate-500">{description}</p>
                <div className="flex items-center justify-between px-10 pt-10 singlePostFooter space-x-2">
                    <p className="font-bold text-gray-700">{date}</p>
                    <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">BY {author}</div>
                </div>                                      
            </div>
        </div>             
    </div>
  )
}

export default SinglePost