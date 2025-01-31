export type Currency = {
  cid: number;
  symbol: string;
  base: string;
  quote: string;
  name: string;
};

export type News = {
  body: string;
  id: string;
  title: string;
  imageurl: string;
  url: string;
}