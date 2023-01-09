import React, { useEffect, useState, useContext } from 'react'
import SignInBadge from '../components/SignInBadge';
// Firebase 
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '../config/firebase-config'
import { toast } from 'react-toastify';

import Chat from '../components/Chat';
import { UserContext } from '../context/Context';

const Chats = () => {
    const [chats, setChats] = useState([])
    const [message, setMessage] = useState('')
    const userContext = useContext(UserContext)

    const getSortedChats = (slice) => {
        return slice.sort((a, b) => {
          return new Date(a.date) - new Date(b.date)
        })
    }

    const genDate = () => {
        const date = new Date()
        return date.toUTCString()
    } 

    const pushChat = async (e) => {
        e.preventDefault() // We prevent de submit
        try {
          await addDoc(collection(db, "chats"), { // Create the chat
              date: genDate(),
              author: userContext,
              message,
          }).then(() => {
              setChats([ ...chats, { message, author: userContext, date: genDate()}])
              setMessage('')
              toast.success('message created!')  // Notify the user
          }).catch((err) => toast.error(err.message))          
        } catch (err) {
            toast.error(err.message)
        }    
    }

    useEffect(() => {
        const getData = async () => {
          try {
            if (!chats.length && userContext) {
              const dataOfChats = await getDocs(collection(db, "chats")) // Get all chats
              const chatsDataArray = dataOfChats.docs.map(doc => ({ id: doc.id, ...doc.data() })) // Assign id's for posst        
              const sortedChatsArray = getSortedChats(chatsDataArray)
              setChats(sortedChatsArray)
            }        
          } catch (error) {
            toast.error(error.message)
          }
        }
        getData()
      }, [userContext, chats.length])


  return userContext ? (
    <div className="w-full flex justify-center">
      <div className='px-10 pb-20 chatPage flex flex-col justify-end'>
          <div className='w-full overflow-y-scroll'>
              {chats?.map(chat => (
                  <Chat 
                      key={chat.id} 
                      author={chat.author} 
                      message={chat.message} 
                      date={chat.date} 
                  />
              ))}
          </div>
          <div className='flex items-center mt-10 w-full'>
              <input 
                  value={message}
                  className='shadow appearance-none bg-white rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-200'
                  type="text" 
                  placeholder='comment something'
                  onChange={(e) => setMessage(e.target.value)}
              />
              <button className='p-2 bg-green-400 text-white rounded-lg ml-5 hover:scale-105 active:scale-95' onClick={pushChat}>Add</button>
          </div> 
      </div>
    </div>    
  ) : <SignInBadge />
}

export default Chats