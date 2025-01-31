import { useEffect, useState, useRef } from "react";
import { getChart } from "@/lib/chart";
import NewsCard, { NewsSkeleton } from "./NewsCard";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import type { Currency, News } from "@/types";

const klineLimit = 145;
const priceScale = 2;
const priceUnit = 'USDT';
const intervals = ['1m', '5m', '15m', '1h', '4h', '6h', '1d', '1w'];

export default function CurrencyDrawer({ currency, price }: { currency: Currency, price: number }) {
  const [interval, setInterval] = useState('1h');
  const [news, setNews] = useState([]);
  const isKlineFetched = useRef(false);
  const isNewsFetched = useRef(false);
  const fetchFn: any = useRef(null);

  function draw(ticks: [number, number][]) {
    return getChart(ticks, {
      priceScale: priceScale,
      priceUnit: priceUnit,
      width: document.getElementById('price-chart')?.offsetWidth,
      height: document.getElementById('price-chart')?.offsetHeight
    });
  }

  async function getCurrencyKlines() {
    try {
      const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${currency.symbol}&interval=${interval}&limit=${klineLimit}`);
      const res = await response.json();
      if(!res || res.length === 0) {
        throw new Error('No kline data found')
      }

      const ticks = res.map((tick: [number, string, string, string, string, string]) => {
        const [time, _open, _high, _low, close, _volume] = tick;
        return [time, close];
      })

      fetchFn.current = draw(ticks);
    } catch (error) {
      console.error(error)
    }
  }

  async function getCurrencyNew() {
    try {
      const response = await fetch(`https://min-api.cryptocompare.com/data/v2/news/?categories=${currency.name}`);
      const res = await response.json();
      if(!res || res.Data.length === 0) {
        throw new Error('No news data found')
      }
      setNews(res.Data.slice(0, 10));
    } catch (error) {
      
    }
  }

  function changeInterval(newInterval: string) {
    isKlineFetched.current = false
    setInterval(newInterval);
  }

  useEffect(() => {
    if(!isKlineFetched.current) {
      fetchFn.current = null
      getCurrencyKlines();
      isKlineFetched.current = true
    }
    
  }, [interval]);

  useEffect(() => {
    if(isKlineFetched.current) {
      if(!fetchFn.current) return
      fetchFn.current.update(price);
    }
  }, [price])

  useEffect(() => {
    if(!isNewsFetched.current) {
      getCurrencyNew();
      isNewsFetched.current = true
    }
  }, []);

  return (
    <div className="p-4 ">
      <div className="grid grid-cols-1 w-full h-[calc(100vh-150px)] gap-x-8 gap-y-4 sm:grid-cols-[2fr_1fr] overflow-y-scroll">
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold">Price Trends</div>
          <ToggleGroup type="single" size="sm" variant="outline" defaultValue={interval} onValueChange={changeInterval}>
            {intervals.map((interval) => (
              <ToggleGroupItem key={interval} value={interval}>
                {interval}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="w-full h-[calc(100vh-300px)] sm:h-[calc(100vh-200px)] bg-gray-200 rounded-xl">
            <div id="price-chart" key={interval} className="w-full h-full bg-white rounded-xl" ></div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="text-xl font-bold">Latest News</div>
          <div className="flex flex-col gap-4">
            { news.length > 0 ?
              (news.map((item: News) => <NewsCard key={item.id} news={item} />))
              : ([1,2].map((_, index) => <NewsSkeleton key={index} />))}
          </div>
        </div>
      </div>
    </div>);
}