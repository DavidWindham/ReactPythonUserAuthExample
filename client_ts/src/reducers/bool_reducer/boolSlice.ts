import {createSlice} from '@reduxjs/toolkit'

export const boolSlice = createSlice({
  name: 'bool',
  initialState: {
    flipFlopBool: false,
  },
  reducers: {
    setTrue: (state) => {
      state.flipFlopBool = true
    },
    setFalse: (state) => {
      state.flipFlopBool = false
    },
    toggleBool: (state) => {
      state.flipFlopBool = ! state.flipFlopBool
    },
  },
})

export const {setTrue, setFalse, toggleBool} = boolSlice.actions
export const getBool = (state:any) => state.flipFlopBool

export default boolSlice.reducer
