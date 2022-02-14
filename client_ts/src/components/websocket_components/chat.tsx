import React, {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {useAppSelector} from '../../hooks'
// import {submitChat, getChat, updateChat} from '../../services/chat.service'
import {updateChat} from '../../services/chat.service'
import ChatTextInputComponent from './chat_components/text_input'

interface chatMessageInterface {
  [key: string]: string
}

function WebsocketChatComponent() {
  // const [message, setMessage] = useState('')
  const [chatMessages, updateChatMessages]=useState<chatMessageInterface[]>([])
  const [chatIDs, updateChatIDs] = useState<number[]>([])
  const {user} = useAppSelector((state) => state.user)

  // Load the messages on mount
  useEffect(() => {
    updateChat(chatIDs)
        .then((res) => {
          console.log('returned messages', res.data)
          storeChatMessages(res.data)
        })
  }, [])

  useEffect(() => {
    const socket = socketIOClient('')
    socket.on('test message', (data) => {
      console.log(data)
      updateChatItems()
    })
  }, [])

  function storeChatMessages(chatItems:chatMessageInterface[]) {
    console.log('chatItems', chatItems)
    console.log('chatMessages', chatMessages)
    const concatArray = filterDuplicates([...chatMessages, ...chatItems])
    updateChatMessages(concatArray)
    const idList:number[] = []
    chatItems.forEach(function(message: any) {
      if (message.id != 14) {
        idList.push(message.id)
      }
    })
    console.log(idList)
    updateChatIDs(idList)

    console.log(chatMessages)
  }

  function filterDuplicates(chatItems:chatMessageInterface[]) {
    const filteredArray = chatItems.filter((value, index) => {
      const _value = JSON.stringify(value)
      return index === chatItems.findIndex((obj) => {
        return JSON.stringify(obj) === _value
      })
    })
    return filteredArray
  }

  // function submitChatItem() {
  //   console.log('Submitting message: ', message)
  //   submitChat({'message': message})
  //       .then((res) => {
  //         console.log(res)
  //         const socket = socketIOClient('')
  //         socket.emit('message_emit')
  //       })
  // }

  // function getChatItems() {
  //   getChat()
  //       .then((res) => {
  //         console.log(res.data)
  //         storeChatMessages(res.data)
  //       })
  // }

  function updateChatItems() {
    console.log('Chat IDs: ', chatIDs)
    updateChat(chatIDs)
        .then((res) => {
          console.log('returned messages', res.data)
          storeChatMessages(res.data)
        })
  }

  return (
    <div className='chat-parent'>
      <h3>Websocket Chat</h3>
      <ul className='chat-container '>
        {chatMessages.map((e) => (
          user.username === e.username ?
            <li className='chat-message-container'>
              <div className='chat-left'>{e.username} - {e.message}</div>
            </li> :
          <li className='chat-message-container'>
            <div className='chat-right'>{e.username} - {e.message}</div>
          </li>
        ))}
      </ul>
      <ChatTextInputComponent />
      {/* <input type='text' placeholder='Enter Text...'
        defaultValue={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => submitChatItem()}>Submit</button>
      <button onClick={() => getChatItems()}>Get Chat</button>
      <button onClick={() => updateChatItems()}>Update Chat</button> */}
    </div>
  )
}

export default WebsocketChatComponent
