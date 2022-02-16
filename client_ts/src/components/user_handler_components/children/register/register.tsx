import React, {useState} from 'react'
import {register} from '../../../../services/user.service'
import {useAppDispatch} from '../../../../hooks'
import TokenStorage from '../../../../services/token.service'
import {setUser} from '../../../../reducers/user_reducer/userSlice'
import './register.scss'


function RegisterComponent() {
  const [username, setUsername] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useAppDispatch()

  const submitUserInfo = () => {
    const userObj = {
      username: username,
      nickname: nickname,
      password: password,
      email: email,
    }

    register(userObj)
        .then((res)=>{
          TokenStorage.storeTokens(res.data)
          setLoginSuccess()
        })
        .catch((error) => {
          console.log('Error caught in register: ', error)
        })
  }

  const setLoginSuccess = () => {
    dispatch(setUser({username: username}))
  }

  return (
    <div className='register_container'>
      <input placeholder="Username..." type="text"
        defaultValue={username}
        onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Nickname..." type="text"
        defaultValue={nickname}
        onChange={(e) => setNickname(e.target.value)} />
      <input placeholder="Password..." type="password"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)} />
      <input placeholder="Email..." type="email"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)} />
      <button onClick={() => submitUserInfo()}>Register</button>
    </div>
  )
}

export default RegisterComponent
