import React, {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {useAppSelector} from '../../hooks'
import {updateChat} from '../../services/chat.service'
import ChatTextInputComponent from './chat_components/text_input'
import {chatMessageInterface} from '../../interfaces/chat.interfaces'
import ClientMessageComponent from './chat_components/client_message'
import NonClientMessageComponent from './chat_components/non_client_message'


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

  // On another user messaging, call API
  useEffect(() => {
    const socket = socketIOClient('')
    socket.on('test message', (data) => {
      updateChatItems()
    })
  }, [])

  function storeChatMessages(chatItems:chatMessageInterface[]) {
    // Merges pre-existing messages with the new incoming messages
    // There's a chance of duplicates, so those are filtered off
    const concatArray = filterDuplicates([...chatMessages, ...chatItems])
    updateChatMessages(concatArray)
    const idList:number[] = []
    chatItems.forEach(function(message: any) {
      idList.push(message.id)
    })
    updateChatIDs(idList)
  }

  function filterDuplicates(chatItems:chatMessageInterface[]) {
    const filteredArray = chatItems.filter((message, idx) => {
      const jsonValue = JSON.stringify(message)
      return idx === chatItems.findIndex((locMessage) => {
        return JSON.stringify(locMessage) === jsonValue
      })
    })
    return filteredArray
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
            <ClientMessageComponent message={e}/>
          </div>:
          <div>
            <NonClientMessageComponent message={e} />
          </div>
        ))}
      </ul>
      <ChatTextInputComponent />
    </div>
  )
}

export default WebsocketChatComponent
