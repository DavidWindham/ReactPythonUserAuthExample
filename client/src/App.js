import React from 'react';

import './App.css';

import UserStateComponent from './components/user_state';
import ProtectedButton from './components/query_protected';
import LoginLogoutParent from './components/login_parent';
import {UserWrapper} from './wrappers/user_auth.wrapper';

function App() {
  return (
    <div className="App">
      <LoginLogoutParent />
      <UserWrapper><UserStateComponent /></UserWrapper>
      <ProtectedButton />
    </div>
  );
}

export default App;
