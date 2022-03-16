import React, {useState} from 'react'
import {useAppDispatch} from '../../../../hooks'
import {setLogin} from '../../../../reducers/new_user_reducer/newUserSlice'
import {forgotPassword, resetPassword} from '../../../../services/user.service'
import './forgot_password.scss'


function ForgotPasswordComponent() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [resetField, setResetField] = useState(false)
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const dispatch = useAppDispatch()

  const handleForgottenPassword = () => {
    const userObj = {
      username: username,
      email: email,
    }

    forgotPassword(userObj)
        .then((res)=>{
          setResetField(true)
          // TODO: Remove for actual project
          setResetToken(res.data.token)
        })
        .catch((error) => {
          console.log('Error caught in login: ', error)
        })
  }

  const handleResetPassword = () => {
    const resetObj = {
      username: username,
      email: email,
      resetToken: resetToken,
      newPassword: newPassword,
    }

    resetPassword(resetObj)
        .then((res)=>{
          console.log(res)
          dispatch(setLogin())
        })
        .catch((error) => {
          console.log('Error', error)
        })
  }

  const resetPasswordField = () => {
    if (!resetField) {
      return (<button onClick={() => handleForgottenPassword()}>Forgot</button>)
    }
    return (
      <>
        <input placeholder="Token..."
          defaultValue={resetToken}
          onChange={(e) => setResetToken(e.target.value)} type="text"
        />
        <input placeholder="Password..."
          defaultValue={newPassword}
          onChange={(e) => setNewPassword(e.target.value)} type="text"
        />
        <button onClick={() => handleResetPassword()}>Reset</button>
      </>
    )
  }

  return (
    <div className="forgotten_password_container">
      <input placeholder="Username..."
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)} type="text"
      />
      <input placeholder="Email..."
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)} type="email"
      />
      {resetPasswordField()}
    </div>
  )
}

export default ForgotPasswordComponent

