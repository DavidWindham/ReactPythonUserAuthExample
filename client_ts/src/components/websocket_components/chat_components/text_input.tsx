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
          setMessage('')
        })
  }
  return (
    <div className='chat-input-parent'>
      <input className='chat-input-box' type='text' placeholder='Enter Text...'
        defaultValue={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className='chat-submit-button' onClick={() => submitChatItem()}>
        Submit
      </button>
    </div>
  )
}

export default ChatTextInputComponent
