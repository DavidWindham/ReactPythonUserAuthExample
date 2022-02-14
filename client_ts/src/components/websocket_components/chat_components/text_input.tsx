import React, {useState} from 'react'
import socketIOClient from 'socket.io-client'
import {submitChat} from '../../../services/chat.service'

function ChatTextInputComponent() {
  const [message, setMessage] = useState('')

  function submitChatItem() {
    console.log('Submitting message: ', message)
    submitChat({'message': message})
        .then((res) => {
          console.log(res)
          const socket = socketIOClient('')
          socket.emit('message_emit')
        })
  }
  return (
    <div>
      <input type='text' placeholder='Enter Text...'
        defaultValue={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={() => submitChatItem()}>Submit</button>
    </div>
  )
}

export default ChatTextInputComponent
