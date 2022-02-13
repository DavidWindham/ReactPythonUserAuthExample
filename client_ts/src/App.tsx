import React from 'react'

import './App.css'

import {UserWrapper} from './wrappers/user_auth.wrapper'
import UserParent from './components/user_handler_components/user_parent'
import UserState from './components/user_handler_components/children/user_state'
import ProtectedButton from './components/protected_route'
import TestWebsocketComponent from './components/websocket_components/test'

function App() {
  return (
    <div className="App">
      <UserParent/>
      <UserWrapper><UserState/></UserWrapper>
      <ProtectedButton/>
      <TestWebsocketComponent />
    </div>
  )
}

export default App
