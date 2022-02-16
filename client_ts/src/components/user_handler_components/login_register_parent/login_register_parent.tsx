import React from 'react'
import {useAppSelector, useAppDispatch} from '../../../hooks'
import {setLogin, setRegister} from
  '../../../reducers/new_user_reducer/newUserSlice'
import LoginComponent from '../children/login/login'
import RegisterComponent from '../children/register/register'
import {CSSTransition} from 'react-transition-group'
import './login_register_parent.scss'


function LoginRegisterParentComponent() {
  const {newUserState} = useAppSelector((state) => state.newUser)

  const dispatch = useAppDispatch()

  const changeToLogin = () => {
    dispatch(setLogin())
  }

  const changeToRegister = () => {
    dispatch(setRegister())
  }

  return (
    <div>
      <button onClick={() => changeToLogin()}>Login</button>
      <button onClick={() => changeToRegister()}>Register</button>
      <div className="login_register_container">
        <CSSTransition
          in={newUserState === 'LOGIN'}
          timeout={500}
          classNames='fade slide-left'
          unmountOnExit
        >
          <LoginComponent />
        </CSSTransition>

        <CSSTransition
          in={newUserState === 'REGISTER'}
          timeout={500}
          classNames='fade slide-right'
          unmountOnExit
        >
          <RegisterComponent />
        </CSSTransition>
      </div>
    </div>
  )
}

export default LoginRegisterParentComponent

