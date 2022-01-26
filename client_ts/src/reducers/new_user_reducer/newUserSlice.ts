import {createSlice} from '@reduxjs/toolkit'

export const newUserSlice = createSlice({
  name: 'newUser',
  initialState: {newUserState: 'LOGIN'},
  reducers: {
    setLogin: (state) => {
      state.newUserState = 'LOGIN'
    },
    setRegister: (state) => {
      state.newUserState = 'REGISTER'
    },
  },
})

export const {setLogin, setRegister} = newUserSlice.actions
export const getNewUserState = (state:any) => state.newUserState

export default newUserSlice.reducer
