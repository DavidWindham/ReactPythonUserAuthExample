import React from 'react'
import {useAppDispatch} from '../../../hooks'
import {logout} from '../../../services/user.service'
import {setUser} from '../../../reducers/user_reducer/userSlice'
import TokenStorage from '../../../services/token.service'


function Logout() {
  const dispatch = useAppDispatch()

  const logoutUser = () => {
    logout()
        .then((res) => {
          TokenStorage.clear()
          changeToRegister()
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const changeToRegister = () => {
    dispatch(setUser(null))
  }

  return (
    <div>
      <button onClick={() => logoutUser()}>Logout</button>
    </div>
  )
}

export default Logout
