import React, {useState} from 'react'
import socketIOClient from 'socket.io-client'
import {submitChat} from '../../../../services/chat.service'
import './text_input.scss'


function ChatTextInputComponent() {
  const [message, setMessage] = useState('')

  function submitChatItem() {
    submitChat({'message': message})
        .then((res) => {
          const socket = socketIOClient('')
          socket.emit('new_chat_message_added')
          setMessage('')
        })
  }

  const onKeyChange = (event:any) => {
    if (event.key === 'Enter') {
      submitChatItem()
    }
  }

  return (
    <div className='chat-input-parent'>
      <input className='input-box' type='text' placeholder='Enter Text...'
        value={message}
        onKeyDown={onKeyChange}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className='submit-button' onClick={() => submitChatItem()}>
        Submit
      </button>
    </div>
  )
}

export default ChatTextInputComponent
