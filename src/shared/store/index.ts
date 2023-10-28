import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { requestsApi } from './requests'

export const store = configureStore({
  reducer: {
    [requestsApi.reducerPath]: requestsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(requestsApi.middleware),
})

setupListeners(store.dispatch)
