import React from 'react'

export default function ClientMessageComponent(props:any) {
  return (
    <li className='chat-li-container chat-message-container-right'>
      <div className='chat-username-container chat-username-right'>
        <div className=''>{props.timestamp} - You</div>
      </div>
      <div className='chat-payload-container chat-payload-right'>
        <div className=''>{props.message.message}</div>
      </div>
    </li>
  )
}
