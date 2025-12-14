export interface IProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  image: string;
}

export interface IProductItem {
  id: number;
  quantity: number;
  name: string;
  image: string;
  price: string;
}

export interface ITransaction {
  id: string;
  type: string;
  date: string;
  total: string;
  items: number;
  customer: string;
  paymentMethod: string;
}

export interface ITrxFilter {
  id: string;
  name: string;
  color: string;
}

export interface ITrxTodayStat {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}
