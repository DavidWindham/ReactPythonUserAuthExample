// import {configureStore} from '@reduxjs/toolkit'
// import newUserReducer from './reducers/new_user.reducer'
// import buttonStatusReducer from './reducers/status_button.reducer'
// import userReducer from './reducers/user.reducer'

// export const store = configureStore({
//   reducer: {
//     user: userReducer,
//     buttonStatus: buttonStatusReducer,
//     login_register: newUserReducer,
//   },
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

import {configureStore} from '@reduxjs/toolkit'
import userReducer from './reducers/user_reducer/userSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
