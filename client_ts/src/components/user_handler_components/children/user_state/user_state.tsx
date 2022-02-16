import React from 'react'
import {useAppSelector} from '../../../../hooks'
import '.user_state.scss'


function UserState() {
  const {user} = useAppSelector((state) => state.user)

  return (
    <h2>User is logged in, {user.username}</h2>
  )
}

export default UserState

