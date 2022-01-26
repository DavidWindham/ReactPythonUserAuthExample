import React from 'react'
import {useAppSelector} from '../hooks'


export const UserWrapper = ({children}:any) => {
  const {user} = useAppSelector((state) => state.user)
  if (!user.isLoggedIn) {
    return <></>
  }
  return (
    <>{children}</>
  )
}
