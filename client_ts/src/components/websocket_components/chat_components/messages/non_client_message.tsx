import React from 'react'
import './messages.scss'


export default function NonClientMessageComponent(props:any) {
  return (
    <li className='chat-li message-container left'>
      <div className='username-container left'>
        <div className=''>{props.message.username} - {props.timestamp}</div>
      </div>
      <div className='payload-container left'>
        <div className=''>{props.message.message}</div>
      </div>
    </li>
  )
}
