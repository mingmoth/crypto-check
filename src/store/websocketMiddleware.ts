import { binanceApi } from '../services/binance'
import { updateTicker } from './tickerSlice'

export const websocketMiddleware = (store) => {
  const subscriptions = new Map()

  return (next) => (action) => {
    if (action.type === 'SUBSCRIBE_TICKER') {
      const { symbol } = action.payload
      
      if (!subscriptions.has(symbol)) {
        const unsubscribe = binanceApi.subscribeToTicker(symbol, (ticker) => {
          store.dispatch(updateTicker(ticker))
        })
        
        subscriptions.set(symbol, unsubscribe)
      }
    }

    if (action.type === 'UNSUBSCRIBE_TICKER') {
      const { symbol } = action.payload
      const unsubscribe = subscriptions.get(symbol)
      if (unsubscribe) {
        unsubscribe()
        subscriptions.delete(symbol)
      }
    }

    return next(action)
  }
}