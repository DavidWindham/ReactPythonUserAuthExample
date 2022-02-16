import React from 'react'
import {useAppDispatch} from '../../../../hooks'
import {logout} from '../../../../services/user.service'
import {logoutUser} from '../../../../reducers/user_reducer/userSlice'
import TokenStorage from '../../../../services/token.service'
import './logout.scss'


function Logout() {
  const dispatch = useAppDispatch()

  const initiateLogoutUser = () => {
    logout()
        .then((res) => {
          TokenStorage.clear()
          dispatchLogoutUser()
        })
        .catch((error) => {
          console.log(error)
        })
  }

  const dispatchLogoutUser = () => {
    dispatch(logoutUser())
  }

  return (
    <div className='logout_container'>
      <button onClick={() => initiateLogoutUser()}>Logout</button>
    </div>
  )
}

export default Logout
