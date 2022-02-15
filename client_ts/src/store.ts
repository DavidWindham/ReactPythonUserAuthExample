import {configureStore} from '@reduxjs/toolkit'
import {createStateSyncMiddleware, initMessageListener} from 'redux-state-sync'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './reducers/user_reducer/userSlice'
import newUserReducer from './reducers/new_user_reducer/newUserSlice'


const userPersistConfig = {
  key: 'root',
  storage,
}

const userReducerPersisted = persistReducer(userPersistConfig, userReducer)

export const store = configureStore({
  reducer: {
    user: userReducerPersisted,
    newUser: newUserReducer,
  },
  middleware: [
    createStateSyncMiddleware({
      blacklist: ['persist/PERSIST', 'persist/REHYDRATE'],
    }),
  ],
})

initMessageListener(store)

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
