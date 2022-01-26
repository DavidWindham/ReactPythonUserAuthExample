import React, {useState} from 'react'

function TestComponent() {
  // const {user} = useSelector((state:RootState) => state.userReducer);
  const [boolState, setBoolState] = useState(true)

  const flipflop = () => {
    setBoolState(!boolState)
  }

  return (
    <div>
      <button onClick={() => flipflop()}>Click</button>

      {boolState ?
        <h1>Boolstate true</h1>:
        <h1>Boolstate false</h1>
      }

    </div>
  )
}

export default TestComponent
