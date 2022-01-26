import React from 'react'
import {useAppSelector, useAppDispatch} from '../../hooks'
import {setLogin, setRegister} from
  '../../reducers/new_user_reducer/newUserSlice'
import LoginComponent from './children/login'
import RegisterComponent from './children/register'
import {CSSTransition} from 'react-transition-group'


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
  )
}

export default LoginRegisterParentComponent

