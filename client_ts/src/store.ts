import {configureStore} from '@reduxjs/toolkit'
import {createStateSyncMiddleware, initMessageListener} from 'redux-state-sync'

import userReducer from './reducers/user_reducer/userSlice'
import newUserReducer from './reducers/new_user_reducer/newUserSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    newUser: newUserReducer,
  },
  middleware: [
    createStateSyncMiddleware(),
  ],
})

initMessageListener(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
