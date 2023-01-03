import React from 'react'

import './sass/App.scss'

import {UserWrapper} from './wrappers/user_auth.wrapper'
import UserParent from
  './components/user_handler_components/user_parent/user_parent'
import UserState from
  './components/user_handler_components/children/user_state/user_state'
import ProtectedButton from './components/protected_route'
import WebsocketChatComponent from './components/websocket_components/chat/chat'

function App() {
  const getEnvVar = () => {
    console.log(process.env.REACT_APP_AUTH_PROXY_URL)
    console.log(process.env.REACT_APP_CHAT_PROXY_URL)
    console.log(process.env.REACT_APP_SOCKET_PROXY_URL)
    return <>
    Env<br/>
      {process.env.REACT_APP_AUTH_PROXY_URL}<br/>
      {process.env.REACT_APP_CHAT_PROXY_URL}<br/>
      {process.env.REACT_APP_SOCKET_PROXY_URL}
    </>
  }
  return (
    <div className="App">
      <h3>{getEnvVar()}</h3>
      <UserParent/>
      <UserWrapper><UserState/></UserWrapper>
      <ProtectedButton/>
      <UserWrapper><WebsocketChatComponent /></UserWrapper>
    </div>
  )
}

export default App
