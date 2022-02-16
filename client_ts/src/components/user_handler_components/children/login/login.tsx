import React, {useState} from 'react'
// import {RootState} from '../../store'
import {useAppDispatch} from '../../../../hooks'
import {setUser} from '../../../../reducers/user_reducer/userSlice'
import TokenStorage from '../../../../services/token.service'
import {login} from '../../../../services/user.service'
import './login.scss'


function LoginComponent() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useAppDispatch()

  const handleLogin = () => {
    const userObj = {
      username: username,
      password: password,
    }

    login(userObj)
        .then((res)=>{
          TokenStorage.storeTokens(res.data)
          setLoginSuccess()
        })
        .catch((error) => {
          console.log('Error caught in login: ', error)
        })
  }

  const setLoginSuccess = () => {
    dispatch(setUser({username: username}))
  }

  return (
    <div className="login_container">
      <input placeholder="Username..."
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)} type="text"
      />
      <input placeholder="Password..."
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)} type="password"
      />
      <button onClick={() => handleLogin()}>Login</button>

    </div>
  )
}

export default LoginComponent
