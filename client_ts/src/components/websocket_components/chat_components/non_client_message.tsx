import React from 'react'

export default function NonClientMessageComponent(props:any) {
  return (
    <li className='chat-li-container chat-message-container-left'>
      <div className='chat-username-container chat-username-left'>
        <div className=''>{props.message.username} - {props.timestamp}</div>
      </div>
      <div className='chat-payload-container chat-payload-left'>
        <div className=''>{props.message.message}</div>
      </div>
    </li>
  )
}
