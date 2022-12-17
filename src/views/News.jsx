import React, { useEffect, useState } from 'react';
import SignInBadge from '../components/SignInBadge';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../components/Button';

const News = (props) => {
    const [data, setData] = useState([])

    console.log(data)

    const searchNews = () => {
        axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey='+process.env.REACT_APP_NEWS_API_KEY)
        .then((response) => {
            setData(response.data.articles)
        }).catch((err) => toast.error(err.message))
    }
    

    return props?.user ? (
        <div className='pb-10 m-10'>
            <span className='flex w-full font-bold px-10 text-xl my-20'>News</span>
            <div className="flex justify-center w-full">
                <table className='shadow-md bg-slate-300 max-w-lg container border-spacing-2 border-separate border rounded-md'>
                    <thead>
                        <tr>
                            <th className='bg-slate-200 rounded border-slate-600 text-slate-600'>
                                Name
                            </th>
                            <th className='bg-slate-200 rounded border-slate-600 text-slate-600'>
                                Link
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="bg-slate-200 rounded border-slate-600 text-slate-600 px-3">MarketWatch</td>
                            <td className="bg-slate-200 rounded border-slate-600 text-slate-600 px-3">
                                <a href="https://www.marketwatch.com/latest-news?mod=top_nav" className='text-sky-500 underline flex items-center' target="_blank" rel="noreferrer">
                                    MarketWatch
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-slate-200 rounded border-slate-600 text-slate-600 px-3">Investopedia</td>
                            <td className="bg-slate-200 rounded border-slate-600 text-slate-600 px-3">
                                <a href="https://www.investopedia.com/news-4427706" className='text-sky-500 underline flex items-center' target="_blank" rel="noreferrer">
                                    Investopedia
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td className="bg-slate-200 rounded border-slate-600 text-slate-600 px-3">Coin Telegraph</td>
                            <td className="bg-slate-200 rounded border-slate-600 text-slate-600 px-3">
                                <a href="https://cointelegraph.com/" className='text-sky-500 underline flex items-center' target="_blank" rel="noreferrer">
                                    Coin Telegraph
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                    </svg>
                                </a>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>    
            <div className='flex items-center mt-20'>
                <Button onClick={searchNews}>Top US Headlines</Button>
            </div>    
                <div className="w-full flex flex-wrap justify-center">
                    {data?.map(post => (
                        <div key={data.indexOf(post)} className="max-w-sm rounded overflow-hidden shadow-lg m-8">
                            <img className="w-full" src={post.urlToImage} alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{post.title}</div>
                                <p className="text-gray-700 text-base">{post.description}</p>
                                <a href={postMessage.url}>Go see the new</a>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">written by: {post.author}</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">source: {post.source.name}</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">date: {post.publishedAt}</span>
                            </div>
                        </div> 
                    ))}
                </div>            
        </div>
  ) : <SignInBadge />
}

export default News