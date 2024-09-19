import { configureStore } from '@reduxjs/toolkit'

import appReducer from './appSlice'

const store = configureStore({
  reducer: {
    app: appReducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
})
export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
