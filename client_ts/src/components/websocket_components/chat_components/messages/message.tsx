import React from 'react'
import {ChatMessage} from '../../../../interfaces/chat.interfaces'
import './message.scss'

export default function MessageComponent(props:{
  messagePosition:'left'|'right',
  message: ChatMessage,
  userMessage:string
}) {
  return (
    <li className={`chat-li message-container ${props.messagePosition}`}>
      <div className={`message-container-username ${props.messagePosition}`}>
        <div className=''>{props.userMessage}</div>
      </div>
      <div className={`message-container-payload ${props.messagePosition}`}>
        <div className=''>{props.message.message}</div>
      </div>
    </li>
  )
}
