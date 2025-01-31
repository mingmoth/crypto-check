import { createSlice } from '@reduxjs/toolkit'

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState: {},
  reducers: {
    updateTicker: (state, { payload }) => {
      const { symbol } = payload
      const previous = state[symbol]
      state[symbol] = {
        ...payload,
        pchg: previous ? (payload.price > previous.price ? 1 : -1) : 1
      }
    }
  }
})

export const { updateTicker } = tickerSlice.actions
export const selectTickers = (state) => state.ticker
export const selectTickerBySymbol = (symbol) => (state) => state.ticker[symbol]