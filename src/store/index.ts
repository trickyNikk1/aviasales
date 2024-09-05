import { configureStore } from '@reduxjs/toolkit'

import appReducer from './appSlice'

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  devTools: true,
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
