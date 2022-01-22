import React from 'react';
import {useSelector} from 'react-redux';
import LoginFormComponent from './login_register';
import Logout from './logout';

function LoginLogoutParent() {
  const {user} = useSelector((state) => state.userReducer);

  return (
    <div className="login_register_logout_parent">
      {user ?
        (<Logout />) :
        (<LoginFormComponent />)
      }
    </div>
  );
}

export default LoginLogoutParent;


