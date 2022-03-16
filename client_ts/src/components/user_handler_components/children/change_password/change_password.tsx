import React, {useState} from 'react'
import {changePassword} from '../../../../services/user.service'
import './change_password.scss'


function ChangePasswordComponent() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [statusClass, setStatusClass] = useState('')

  const handleForgottenPassword = () => {
    const userObj = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    }

    changePassword(userObj)
        .then((res)=>{
          setOldPassword('')
          setNewPassword('')
          setPasswordChangeSuccess()
        })
        .catch((error) => {
          setPasswordChangeFail()
          console.log('Error caught in change password: ', error)
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

  return (
    <div className="change_password_container">
      <input placeholder="Old password..."
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)} type="password"
      />
      <input placeholder="New password..."
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)} type="password"
      />
      <button className={statusClass}
        onClick={() => handleForgottenPassword()}>
          Change Password
      </button>

    </div>
  )
}

export default ChangePasswordComponent

