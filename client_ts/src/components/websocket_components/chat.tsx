import React, {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {useAppSelector} from '../../hooks'
import {submitChat, getChat, updateChat} from '../../services/chat.service'

function WebsocketChatComponent() {
  const [message, setMessage] = useState('')
  const [chatMessages, updateChatMessages] = useState<any[]>([])
  const [chatIDs, updateChatIDs] = useState<number[]>([])
  const {user} = useAppSelector((state) => state.user)

  useEffect(() => {
    const socket = socketIOClient('')
    socket.on('test message', (data) => {
      console.log(data)
    })
  }, [])

  function submitChatItem() {
    console.log('Submitting message: ', message)
    submitChat({'message': message})
        .then((res) => {
          console.log(res)
        })
  }

  function getChatItems() {
    getChat()
        .then((res) => {
          console.log(res.data)
          updateChatMessages(res.data)
          const idList:number[] = []
          res.data.forEach(function(message: any) {
            idList.push(message.id)
          })
          updateChatIDs(idList)
        })
  }

  function updateChatItems() {
    updateChat(chatIDs)
        .then((res) => {
          console.log(res)
        })
  }

  return (
    <div className='chat-parent'>
      <h3>Websocket Chat</h3>
      <ul className='chat-message-box'>
        <li>Test</li>
        {chatMessages.map((e) => (
          user.username === e.username ?
            <li className='chat-right'>{e.username} - {e.message}</li> :
          <li className='chat-left'>{e.username} - {e.message}</li>
        ))}
      </ul>
      <input type='text' placeholder='Enter Text...'
        defaultValue={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => submitChatItem()}>Submit</button>
      <button onClick={() => getChatItems()}>Get Chat</button>
      <button onClick={() => updateChatItems()}>Update Chat</button>
    </div>
  )
}

export default WebsocketChatComponent
