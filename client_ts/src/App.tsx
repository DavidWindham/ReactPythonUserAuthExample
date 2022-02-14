import React from 'react'

import './App.css'

import {UserWrapper} from './wrappers/user_auth.wrapper'
import UserParent from './components/user_handler_components/user_parent'
import UserState from './components/user_handler_components/children/user_state'
import ProtectedButton from './components/protected_route'
import WebsocketChatComponent from './components/websocket_components/chat'


function App() {
  return (
    <div className="App">
      <UserParent/>
      <UserWrapper><UserState/></UserWrapper>
      <ProtectedButton/>
      <UserWrapper><WebsocketChatComponent /></UserWrapper>
    </div>
  )
}

export default App
