import React, {useState} from 'react'
// import {RootState} from '../../store'
// import {useAppDispatch} from '../../../../hooks'
// import {setUser} from '../../../../reducers/user_reducer/userSlice'
import TokenStorage from '../../../../services/token.service'
import {changePassword} from '../../../../services/user.service'
import './change_password.scss'


function ChangePasswordComponent() {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // const dispatch = useAppDispatch()

  const handleForgottenPassword = () => {
    const userObj = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    }

    changePassword(userObj)
        .then((res)=>{
          TokenStorage.storeTokens(res.data)
          setForgotSubmitSuccess()
        })
        .catch((error) => {
          console.log('Error caught in login: ', error)
        })
  }

  const setForgotSubmitSuccess = () => {
    // dispatch(setUser({username: username}))
  }

  return (
    <div className="forgotten_password_container">
      <input placeholder="Old password..."
        defaultValue={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)} type="password"
      />
      <input placeholder="New password..."
        defaultValue={newPassword}
        onChange={(e) => setNewPassword(e.target.value)} type="password"
      />
      <button onClick={() => handleForgottenPassword()}>Change Password</button>

    </div>
  )
}

export default ChangePasswordComponent

