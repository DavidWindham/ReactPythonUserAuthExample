import {configureStore} from '@reduxjs/toolkit'
import userReducer from './reducers/user_reducer/userSlice'
import boolReducer from './reducers/bool_reducer/boolSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    boolState: boolReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
