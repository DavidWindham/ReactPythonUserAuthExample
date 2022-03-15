import React from 'react'
import {useAppSelector} from '../../../hooks'
import LoginRegisterParentComponent from
  '../login_register_parent/login_register_parent'
import Logout from '../children/logout/logout'
import './user_parent.scss'
import ChangePasswordComponent from
  '../children/change_password/change_password'


function UserParent() {
  const {user} = useAppSelector((state) => state.user)

  return (
    <div className="login_register_logout_parent">
      {user.isLoggedIn ?
        (<><Logout /><ChangePasswordComponent /></>) :
        (<LoginRegisterParentComponent />)
      }
    </div>
  )
}

export default UserParent


