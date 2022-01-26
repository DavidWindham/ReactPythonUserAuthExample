import React from 'react'
import './App.css'
import UserParent from './components/user_handler_components/user_parent'
import ProtectedButton from './components/protected_route'

function App() {
  return (
    <div className="App">
      <UserParent/>
      <ProtectedButton/>
    </div>
  )
}

export default App
