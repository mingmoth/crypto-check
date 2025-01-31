import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAllPairs } from "@/store/currencySlice";
import { selectTickerBySymbol } from '@/store/tickerSlice'
import CurrencyCard from "@/components/CurrencyCard";
import CurrencyDrawer from "./CurrencyDrawer";
import { Drawer, DrawerContent, DrawerHeader, DrawerTrigger, DrawerTitle } from "./ui/drawer";
import type { Currency } from "@/types";

const tickerData = {
  symbol: '',
  price: 0,
  vol: 0,
  percent: 0.00,
  chg: 0,
  high: 0,
  low: 0,
  open: 0,
  time: 0
}

export default function DashBoard () {
  const dispatch = useDispatch();
  const currencies: Currency[] = useSelector(selectAllPairs)
  const getTicker = useSelector(state => (symbol: string) => selectTickerBySymbol(symbol)(state)) || {...tickerData}
  // const getTicker = useSelector(selectTickerBySymbol(symbol: string))

  useEffect(() => {
    currencies.forEach((currency: Currency) => {
      dispatch({
        type: 'SUBSCRIBE_TICKER',
        payload: {
          symbol: currency.symbol
        }
      })
    })

    return () => {
      currencies.forEach((currency: Currency) => {
        dispatch({
          type: 'UNSUBSCRIBE_TICKER',
          payload: {
            symbol: currency.symbol
          }
        })
      })
    }
  }, [currencies, dispatch]);

  return (
    <div className="p-4 pt-0 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {currencies.map((currency: Currency) => {
        const ticker = getTicker(currency.symbol)
        return (
          <Drawer key={`${currency.cid}-${currency.symbol}`}>
            <DrawerTrigger>
              <CurrencyCard
                key={`${currency.cid}-${currency.symbol}`}
                currency={currency}
              >
                <div>
                  {ticker?.price || 0} {currency.quote}
                </div>
                <div>{ticker?.percent || 0}%</div>
                <div>
                  {parseFloat(ticker?.chg || 0).toFixed(
                    currency.quote === "USDT" ? 3 : 8
                  )}
                </div>
                <div>{ticker?.vol || 0}</div>
              </CurrencyCard>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="text-xl font-bold">{currency.name}</DrawerTitle>
              </DrawerHeader>
              <CurrencyDrawer currency={currency} price={ticker?.price} />
            </DrawerContent>
          </Drawer>
        );
      })}
    </div>
  )
}