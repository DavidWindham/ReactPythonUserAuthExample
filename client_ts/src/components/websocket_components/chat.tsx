import React, {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {useAppSelector} from '../../hooks'
import {updateChat} from '../../services/chat.service'
import ChatTextInputComponent from './chat_components/text_input'
import {chatMessageInterface} from '../../interfaces/chat.interfaces'
import MessageParentComponent from './chat_components/message.parent'


function WebsocketChatComponent() {
  const [chatMessages, updateChatMessages]=useState<chatMessageInterface[]>([])
  const [chatIDs, updateChatIDs] = useState<number[]>([])
  const {user} = useAppSelector((state) => state.user)

  // Load the messages on mount
  useEffect(() => {
    updateChat(chatIDs)
        .then((res) => {
          storeChatMessages(res.data)
        })
  }, [])

  // On another users successful message, call API
  useEffect(() => {
    const socket = socketIOClient('')
    socket.on('new chat message ready', () => {
      updateChatItems()
    })
  }, [])

  function storeChatMessages(chatItems:chatMessageInterface[]) {
    // Merges pre-existing messages with the new incoming messages
    // There's a chance of duplicates, so those are filtered off
    const concatArray = filterDuplicates([...chatMessages, ...chatItems])
    const dateSortedArray = sortChatMessagesByDate(concatArray)
    updateChatMessages(dateSortedArray)
    const idList:number[] = []
    chatItems.forEach(function(message: any) {
      idList.push(message.id)
    })
    updateChatIDs(idList)
  }

  function filterDuplicates(chatItems:chatMessageInterface[]) {
    // return [...new Map(chatItems.map((item: any) =>
    //   [item.id, item])).values()]

    const filteredArray = chatItems.filter((message, idx) => {
      const jsonValue = JSON.stringify(message)
      return idx === chatItems.findIndex((locMessage) => {
        return JSON.stringify(locMessage) === jsonValue
      })
    })
    return filteredArray
  }

  function sortChatMessagesByDate(chatItems:chatMessageInterface[]) {
    return chatItems.sort(function(a:any, b:any) {
      const aDate:any = new Date(a.timestamp)
      const bDate:any = new Date(b.timestamp)
      return aDate - bDate
    })
  }

  function updateChatItems() {
    updateChat(chatIDs)
        .then((res) => {
          storeChatMessages(res.data)
        })
  }

  return (
    <div className='chat-parent'>
      <h3>Websocket Chat</h3>
      <ul className='chat-container '>
        {chatMessages.map((e) => (
          user.username === e.username ?
          <div>
            <MessageParentComponent message={e} owner={true} />
          </div>:
          <div>
            <MessageParentComponent message={e} owner={false} />
          </div>
        ))}
      </ul>
      <ChatTextInputComponent />
    </div>
  )
}

export default WebsocketChatComponent
