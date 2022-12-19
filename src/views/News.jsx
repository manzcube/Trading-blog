import React, { useState } from 'react';
import SignInBadge from '../components/SignInBadge';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../components/Button';

const News = (props) => {
    const [data, setData] = useState([])

    const searchNews = () => {
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey='+process.env.REACT_APP_NEWS_API_KEY)
        .then((response) => {
            setData(response.data.articles)
        }).catch((err) => toast.error(err.message))  
    }

    return props?.user ? (
        <div className='pb-10 m-10'>
            <div className='sm:mx-40 mt-20'>
                <span className='w-full font-bold text-slate-500 px-10 text-lg'>News Sources</span>
                <div className="flex flex-col justify-center py-3 sm:flex-row sm:items-center">
                    <a href="https://www.marketwatch.com/latest-news?mod=top_nav" className='border max-h-10 shadow-md py-3 px-10 mx-5 my-2 rounded-md text-sky-500 text-sm flex items-center hover:scale-95' target="_blank" rel="noreferrer">
                        <img src="https://imgs.search.brave.com/a6TJwPF1l1y6lXWZHFf3EfNZLy-y78qQUXwTlREijns/rs:fit:180:180:1/g:ce/aHR0cHM6Ly9wbGF5/LWxoLmdvb2dsZXVz/ZXJjb250ZW50LmNv/bS9YQW9ZTDZYcFBE/REhzZ2VQREtvUVgt/dGMwRGRDSlpGWVBj/NUw3OWlOWVNFdzNn/cmJSOGctb0JVRTVu/MG1SRERYbnBFPXMx/ODA" alt="" className='w-5 h-5 rounded mr-2' />
                        MarketWatch
                    </a>
                    <a href="https://www.investopedia.com/news-4427706" className='border max-h-10 shadow-md py-3 px-10 mx-5 my-2 rounded-md text-sky-500 text-sm flex items-center hover:scale-95' target="_blank" rel="noreferrer">
                        <img src="https://imgs.search.brave.com/oy37OYe0zhfAk9cV7GoT54bSbsNhj7hUEqF1ogzGEUc/rs:fit:48:48:1/g:ce/aHR0cHM6Ly9wYnMu/dHdpbWcuY29tL3By/b2ZpbGVfaW1hZ2Vz/LzEwOTAyNDA4MDQy/Mzk2MDk4NTgvN2RV/WjVfNHJfbm9ybWFs/LmpwZw" alt="" className='w-4 h-4 w-5 h-5 rounded mr-2' />
                        Investopedia
                    </a>
                    <a href="https://cointelegraph.com/" className='border max-h-10 shadow-md py-3 px-10 mx-5 my-2 rounded-md text-sky-500 text-sm flex items-center hover:scale-95' target="_blank" rel="noreferrer">
                        <img src="https://imgs.search.brave.com/MSmAUwQIlE5P9h8LcR6QICgcOyN3YT2Qk6ZFAdlkYuE/rs:fit:900:900:1/g:ce/aHR0cHM6Ly95dDMu/Z2dwaHQuY29tL2Ev/QUdGLWw3OGh5SDAt/YVE4bDZFRjB2WnRG/NUNvN3dxdVc3OWRY/ZzhhT1pRPXM5MDAt/bW8tYy1jMHhmZmZm/ZmZmZi1yai1rLW5v" alt="" className='w-5 h-5 rounded mr-2' />
                        Coin Telegraph
                    </a>
                </div>   
            </div> 
            <div className='flex items-center'>
                <Button onClick={searchNews}>Top US Headlines</Button>
            </div>    
                <div className="w-full flex flex-wrap justify-center">
                    {data?.map(post => (
                        <div key={data.indexOf(post)} className="max-w-sm rounded overflow-hidden shadow-lg m-8">
                            <img className="w-full" src={post.urlToImage} alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{post.title}</div>
                                <p className="text-gray-700 text-base">{post.description}</p>
                                <a href={post.url} target='_blank' rel="noreferrer" className='text-sky-400 underline'>Go see the new</a>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-5 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">written by: {post.author}</span>
                                <span className="inline-block bg-gray-200 rounded-full px-5 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">source: {post.source.name}</span>
                                <span className="inline-block bg-gray-200 rounded-full px-5 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">date: {post.publishedAt}</span>
                            </div>
                        </div> 
                    ))}
                </div>            
        </div>
  ) : <SignInBadge />
}

export default News