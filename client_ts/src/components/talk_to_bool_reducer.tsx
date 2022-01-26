import React from 'react'
import {RootState} from '../store'
import {useAppSelector, useAppDispatch} from '../hooks'
import {toggleBool, setTrue, setFalse} from '../reducers/bool_reducer/boolSlice'

function ReduxBoolTestComponent() {
  const {flipFlopBool} = useAppSelector((state:RootState) => state.boolState)

  const dispatch = useAppDispatch()

  const flipflop = () => {
    dispatch(toggleBool())
  }

  const setBoolTrue = () => {
    dispatch(setTrue())
  }

  const setBoolFalse = () => {
    dispatch(setFalse())
  }

  return (
    <div>
      <button onClick={() => flipflop()}>Flip</button>
      <button onClick={() => setBoolTrue()}>SetTrue</button>
      <button onClick={() => setBoolFalse()}>SetFalse</button>

      {flipFlopBool ?
        <h1>Boolstate true</h1>:
        <h1>Boolstate false</h1>
      }

    </div>
  )
}

export default ReduxBoolTestComponent
