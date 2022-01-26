import React, {useState} from 'react'
import {protectedRoute} from '../services/user.service'
import {logoutUser} from '../reducers/user_reducer/userSlice'
import {useAppDispatch} from '../hooks'

function ProtectedButton() {
  const [buttonColor, setButtonColor] = useState('grey')
  // const {buttonColor} = useAppSelector((state) => state.buttonStatusReducer)
  const dispatch = useAppDispatch()

  const callProtectedRoute = () => {
    protectedRoute()
        .then((res) => {
        // If 401, this fails triggering the error catch
          if (typeof res !== 'undefined') {
            setButtonSuccess()
          } else {
            setButtonFail()
            dispatch(logoutUser())
          }
        })
        .catch((error) => {
          console.log('Error on protected route: ', error)
        })
  }

  const setButtonNeutral = () => {
    setButtonColor('grey')
  }

  const setButtonSuccess = () => {
    setButtonColor('green')
    setTimeout(setButtonNeutral, 1000)
  }

  const setButtonFail = () => {
    setButtonColor('red')
    setTimeout(setButtonNeutral, 1000)
  }

  return (
    <div>
      <h3>Click the protected button below to test login status</h3>
      <button onClick={() => callProtectedRoute()}
        style={{'backgroundColor': buttonColor}}>
        Call Protected Route
      </button>
    </div>
  )
}

export default ProtectedButton
