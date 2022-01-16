import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import LoginComponent from './login';
import RegisterComponent from './register';
import {setLogin, setRegister} from '../actions';

function LoginFormComponent() {
  const newUserState = useSelector((state) => state.newUserReducer);

  const dispatch = useDispatch();

  const changeToLogin = () => {
    dispatch(setLogin());
  };

  const changeToRegister = () => {
    dispatch(setRegister());
  };

  return (
    <div>
      <button onClick={() => changeToLogin()}>Login</button>
      <button onClick={() => changeToRegister()}>Register</button>
      {newUserState === 'LOGIN' ?
                (<LoginComponent />) :
                (<RegisterComponent />)
      }
    </div>
  );
}

export default LoginFormComponent;
