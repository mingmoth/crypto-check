import { useMemo } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import type { Currency } from "@/types";

export default function CurrencyCard({
  currency,
  children,
}: {
  currency: Currency;
  children?: React.ReactNode;
}) {
  const iconBase = useMemo(() => {
    return `https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.cid}.png`;
  }, [currency.cid]);
  return (
    <Card key={currency.cid}>
      <CardHeader className="grid grid-cols-[minmax(32px,48px)_1fr] gap-x-4 ">
        <img src={iconBase} alt={currency.name} />
        <div className="flex flex-col flex-wrap gap-y-2 align-top">
          <CardTitle>{currency.name}</CardTitle>
          <CardDescription>
            <p>
              {currency.base} / {currency.quote}
            </p>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
