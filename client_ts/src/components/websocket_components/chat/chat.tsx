/* eslint-disable react/jsx-key */
import React, {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {useAppSelector} from '../../../hooks'
import {updateChat} from '../../../services/chat.service'
import ChatTextInputComponent from '../chat_components/text_input/text_input'
import MessageParentComponent from '../chat_components/message.parent'
import {ChatMessages, ChatMessage} from '../../../interfaces/chat.interfaces'
import './chat.scss'


function WebsocketChatComponent() {
  const [chatMessages, updateChatMessages]=useState<ChatMessages>([])
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

  function storeChatMessages(chatItems:ChatMessages) {
    // Merges pre-existing messages with the new incoming messages
    // There's a chance of duplicates, so those are filtered off
    const concatArray = filterDuplicates([...chatMessages, ...chatItems])
    const dateSortedArray = sortChatMessagesByDate(concatArray)
    updateChatMessages(dateSortedArray)
    const idList:number[] = []
    chatItems.forEach(function(message:ChatMessage) {
      idList.push(message.id)
    })
    updateChatIDs(idList)
  }

  function filterDuplicates(chatItems:ChatMessages) {
    return [...new Map(chatItems.map((item: ChatMessage) =>
      [item.id, item])).values()]
  }

  function sortChatMessagesByDate(chatItems: ChatMessages) {
    return chatItems.sort(function(
        messageA: ChatMessage, messageB: ChatMessage,
    ) {
      const aDate:Date = new Date(messageA.timestamp)
      const bDate:Date = new Date(messageB.timestamp)
      return (aDate.getTime() - bDate.getTime())
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
