import React from 'react'

const CreatePostButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="group block max-w-xs mb-10 rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-500 hover:ring-sky-500 hover:scale-95">
        <div className="flex items-center space-x-3">          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 stroke-sky-500 group-hover:stroke-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <h3 className="text-slate-900 group-hover:text-white text-sm font-semibold">New trade post</h3>
        </div>
        <p className="text-slate-500 group-hover:text-white text-sm">Create a new report from your recent trades.</p>
    </button>
  )
}

export default CreatePostButton