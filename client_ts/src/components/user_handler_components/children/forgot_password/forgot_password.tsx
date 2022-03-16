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
  const [statusClass, setStatusClass] = useState('changeNeutral')
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
          setPasswordChangeFail()
          console.log('Error caught in forgotten password: ', error)
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
          setPasswordChangeSuccess()
          dispatch(setLogin())
        })
        .catch((error) => {
          console.log('Error', error)
          setPasswordChangeFail()
        })
  }

  const setPasswordChangeFail = () => {
    setStatusClass('changeFail')
    setTimeout(setPasswordChangeNeutral, 1000)
  }

  const setPasswordChangeSuccess = () => {
    setStatusClass('changeSuccess')
    setTimeout(setPasswordChangeNeutral, 1000)
  }

  const setPasswordChangeNeutral = () => {
    setStatusClass('changeNeutral')
  }

  const resetPasswordField = () => {
    if (!resetField) {
      return (
        <button className={statusClass}
          onClick={() => handleForgottenPassword()}>
        Forgot
        </button>
      )
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
        <button className={statusClass} onClick={() => handleResetPassword()}>
          Reset
        </button>
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

