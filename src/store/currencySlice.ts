import { createSlice } from '@reduxjs/toolkit'
import currencies from "../../currencies.json";
import { Currency } from "../types";

export interface CurrencyState {
  pairs: Currency[],
  quoteOptions: string[],
  currentQuote: string,
  baseCurrency: string | null
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    pairs: currencies,
    quoteOptions: ['BNB', 'BTC', 'ETH', 'USDT'],
    currentQuote: 'BNB',
    baseCurrency: null
  },
  reducers: {
    addPair: (state, { payload }) => {
      if (!state.pairs.some(p => p.symbol === payload.symbol)) {
        state.pairs.push(payload)
        localStorage.setItem('crypto-currencies', JSON.stringify(state.pairs))
      }
    },
    removePair: (state, { payload }) => {
      state.pairs = state.pairs.filter(p => p.symbol !== payload)
      localStorage.setItem('crypto-currencies', JSON.stringify(state.pairs))
    },
    setQuote: (state, { payload }) => {
      state.currentQuote = payload
    },
    setBaseCurrency: (state, { payload }) => {
      state.baseCurrency = payload
    },
    resetPairs: (state) => {
      state.pairs = []
      localStorage.removeItem('crypto-currencies')
    }
  }
})

export const { addPair, removePair, setQuote, setBaseCurrency, resetPairs } = currencySlice.actions
export const selectAllPairs = (state: { currency: CurrencyState }) => state.currency.pairs
export const selectQuoteOptions = (state: { currency: CurrencyState }) => state.currency.quoteOptions
export const selectCurrentQuote = (state: { currency: CurrencyState }) => state.currency.currentQuote
export const selectBaseCurrency = (state: { currency: CurrencyState }) => state.currency.baseCurrency