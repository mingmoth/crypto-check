import { Card, CardTitle, CardDescription } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import type { News } from "@/types";

export default function NewsCard({ news }: { news: News }) {
  function truncateText(value: string) {
    if (value.length > 135) {
      const substr = value.substring(0, 135);
      return substr.substring(0, substr.lastIndexOf(" ")) + " ...";
    } else {
      return value;
    }
  }

  return (
    <a
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card className="flex flex-col gap-y-2 p-4">
        <img src={news.imageurl} alt={news.title || 'news-title'} className="w-full aspect-[1/1] object-cover rounded-xl bg-animate-pulse" />
        <CardTitle className="text-lg font-bold">{news.title}</CardTitle>
        <CardDescription>{truncateText(news.body)}</CardDescription>
      </Card>
    </a>
  );
}

export function NewsSkeleton() {
  return (
    <Card className="flex flex-col gap-y-2 p-4">
      <Skeleton className="w-full aspect-[1/1] rounded-xl" />
      <Skeleton className="w-full h-[18px]" />
      {new Array(3).fill(0).map((_, index) => (
        <Skeleton key={index} className="w-[80%] h-[14px]" />
      ))}
    </Card>
  );
}
