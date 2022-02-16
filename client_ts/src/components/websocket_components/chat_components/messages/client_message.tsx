import React from 'react'
import './messages.scss'


export default function ClientMessageComponent(props:any) {
  return (
    <li className='chat-li message-container right'>
      <div className='username-container right'>
        <div className=''>{props.timestamp} - You</div>
      </div>
      <div className='payload-container right'>
        <div className=''>{props.message.message}</div>
      </div>
    </li>
  )
}
