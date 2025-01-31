import { createSlice } from '@reduxjs/toolkit'

export interface Ticker {
  symbol?: string
  price: number
  pchg?: number,
  percent?: number,
  chg: string,
  vol?: number
}

export interface TickerState {
  [key: string]: Ticker
} 

export const tickerSlice = createSlice({
  name: 'ticker',
  initialState: {},
  reducers: {
    updateTicker: (state: TickerState, { payload }) => {
      const { symbol } = payload
      const previous: Ticker = state[symbol]
      state[symbol] = {
        ...payload,
        pchg: previous ? (payload.price > previous.price ? 1 : -1) : 1
      }
    }
  }
})

export const { updateTicker } = tickerSlice.actions
export const selectTickers = (state: { ticker: TickerState }) => state.ticker
export const selectTickerBySymbol = (symbol: string) => (state: { ticker: TickerState }) => state.ticker[symbol]