import React from 'react';
// import ReactDOM from 'react-dom';

import './App.css';

// import RegisterForm from './components/register';
// import LoginForm from './components/login';
// import ProtectedButton from './components/query_protected';
// import Logout from './components/logout';
// import LoginComponent from './components/login';
// import LoginFormComponent from './components/login_register';
import UserStateComponent from './components/user_state';
import ProtectedButton from './components/query_protected';
import LoginLogoutParent from './components/login_parent';
import { Wrapper } from './components/user_state';

function App() {
  return (
    <div className="App">
      <LoginLogoutParent />
      <Wrapper><UserStateComponent /></Wrapper>
      <ProtectedButton />
    </div>
  );
}

export default App;
