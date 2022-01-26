import React from 'react'
import {useAppSelector} from '../../hooks'
import LoginRegisterParentComponent from './login_register_parent'
import Logout from './children/logout'

function UserParent() {
  const {user} = useAppSelector((state) => state.user)

  return (
    <div className="login_register_logout_parent">
      {user.isLoggedIn ?
        (<Logout />) :
        (<LoginRegisterParentComponent />)
      }
    </div>
  )
}

export default UserParent


