import BinanceWebSocket  from '@/lib/binance/api';

export const binanceApi = {
  ws: new BinanceWebSocket(),

  subscribeToTicker(symbol: string, callback: (data: any) => void) {
    return this.ws.onTicker(symbol, (data: any) => {
      const tickerData = {
        symbol,
        price: parseFloat(data.c),
        vol: parseFloat(data.q).toFixed(2),
        percent: parseFloat(data.P).toFixed(2),
        chg: data.p,
        high: data.h,
        low: data.l,
        open: data.o,
        time: data.E
      }
      callback(tickerData)
    })
  },

  unsubscribeTicker(symbol: string) {
    this.ws.closeSubscription('ticker', false, symbol)
  }
}