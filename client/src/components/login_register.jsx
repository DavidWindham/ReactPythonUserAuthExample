import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import LoginComponent from './login';
import RegisterComponent from './register';
import {setLogin, setRegister} from '../actions';
import {CSSTransition} from 'react-transition-group';


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
      <div className="grid_container">
        <CSSTransition
          in={newUserState === 'LOGIN'}
          timeout={300}
          classNames='fade slide-left'
          unmountOnExit
        >
          <LoginComponent />
        </CSSTransition>

        <CSSTransition
          in={newUserState === 'REGISTER'}
          timeout={300}
          classNames='fade slide-right'
          unmountOnExit
        >
          <RegisterComponent />
        </CSSTransition>
      </div>
    </div>
  );
}

export default LoginFormComponent;

