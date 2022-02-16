import {createSlice} from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      isLoggedIn: false,
      username: '',
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user.isLoggedIn = true
      state.user.username = action.payload.username
    },
    logoutUser: (state) => {
      state.user = {
        isLoggedIn: false,
        username: '',
      }
    },
  },
})

export const {setUser, logoutUser} = userSlice.actions

export default userSlice.reducer
