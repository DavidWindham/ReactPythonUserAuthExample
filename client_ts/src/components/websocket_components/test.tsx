import React, {useState, useEffect} from 'react'
import socketIOClient from 'socket.io-client'
import {submitChat, getChat} from '../../services/user.service'


function TestWebsocketComponent() {
  const [message, setMessage] = useState('')

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
          console.log(res)
        })
  }

  return (
    <div>
      <input type='text' placeholder='Enter Text...'
        defaultValue={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => submitChatItem()}>Submit</button>
      <button onClick={() => getChatItems()}>Get Chat</button>
      {/* <button onClick={() => messageLog()}>Log</button>
      <button onClick={() => messageEmit()}>Emit</button>
      <button onClick={() => testFunc()}>TEST</button> */}
    </div>
  )
}

export default TestWebsocketComponent

