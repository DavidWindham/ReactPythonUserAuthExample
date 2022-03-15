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
    setForgot: (state) => {
      state.newUserState = 'FORGOT'
    },
  },
})

export const {setLogin, setRegister, setForgot} = newUserSlice.actions

export default newUserSlice.reducer
