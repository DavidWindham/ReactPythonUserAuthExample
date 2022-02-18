import React from 'react'
import {useAppSelector} from '../hooks'


export const UserWrapper = (props:
    {children: React.ReactElement | React.ReactElement[]
  }) => {
  const {user} = useAppSelector((state) => state.user)
  const {children} = props
  if (!user.isLoggedIn) {
    return <></>
  }
  return (
    <>{children}</>
  )
}
