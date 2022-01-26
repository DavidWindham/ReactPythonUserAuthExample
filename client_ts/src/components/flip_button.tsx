import React from 'react'

function FlipButton() {
  // const {user} = useSelector((state:RootState) => state.userReducer);
  const boolState:Boolean = false

  return (
    <div>
      {/* <button onClick={}>Flip</button> */}
      {boolState ?
        <h1>Boolstate true</h1> :
    <h1>Boolstate false</h1>}
      <h1>This is an example of a component</h1>
    </div>
  )
}

export default FlipButton
