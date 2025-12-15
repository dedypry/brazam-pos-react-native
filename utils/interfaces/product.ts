export interface IProduct {
  id?: number;

  name: string;
  price: number; // sesuai schema (string)
  stock?: number | null;

  is_stock: 0 | 1; // SQLite boolean
  is_product_show: 0 | 1; // SQLite boolean

  photos: string[]; // di app (di DB → JSON string)

  description?: string | null;
  modal: number;

  category?: string | null;
  uom?: string | null;
  sku?: string | null;
  barcode?: string | null;

  created_at?: string;
  updated_at?: string;
}

export interface ISales {
  id: number;
  quantity: number;
  product: IProduct;
}
export interface IProductItem {
  quantity: number;
  id: number;
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
