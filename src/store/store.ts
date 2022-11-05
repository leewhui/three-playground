import { configureStore } from '@reduxjs/toolkit'
import { projectSlice } from './project/project'

export const store = configureStore({
  reducer: {
    project: projectSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
