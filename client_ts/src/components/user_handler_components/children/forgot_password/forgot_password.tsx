import React, {useState} from 'react'
// import {RootState} from '../../store'
// import {useAppDispatch} from '../../../../hooks'
// import {setUser} from '../../../../reducers/user_reducer/userSlice'
import TokenStorage from '../../../../services/token.service'
import {forgotPassword} from '../../../../services/user.service'
import './forgot_password.scss'


function ForgotPasswordComponent() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')

  // const dispatch = useAppDispatch()

  const handleForgottenPassword = () => {
    const userObj = {
      username: username,
      email: email,
    }

    forgotPassword(userObj)
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
      <input placeholder="Username..."
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)} type="text"
      />
      <input placeholder="Email..."
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)} type="email"
      />
      <button onClick={() => handleForgottenPassword()}>Forgot</button>

    </div>
  )
}

export default ForgotPasswordComponent

