import { configureStore } from '@reduxjs/toolkit'
import { currencySlice } from './currencySlice'
import { tickerSlice } from './tickerSlice'
import { websocketMiddleware } from './websocketMiddleware'

export const store = configureStore({
  reducer: {
    currency: currencySlice.reducer,
    ticker: tickerSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(websocketMiddleware) // 添加中间件到链中
})