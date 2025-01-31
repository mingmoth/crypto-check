import { binanceApi } from "@/services/binance";
import { updateTicker } from './tickerSlice'
import type { CurrencyState } from "./currencySlice";
import type { TickerState } from "./tickerSlice";

export const websocketMiddleware = (
  store: { dispatch: (arg0: { type: string; payload: any }) => void;
  getState: () => { ticker: TickerState; currency: CurrencyState; }; }
) => {
  const subscriptions = new Map()

  return (next: any) => (action: { type: string; payload: any }) => {
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