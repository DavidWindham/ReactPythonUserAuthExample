import React from 'react'
import {useAppSelector} from '../../../hooks'

function UserState() {
  const {user} = useAppSelector((state) => state.user)

  return (
    <h2>User is logged in, {user.username}</h2>
  )
}

export default UserState

