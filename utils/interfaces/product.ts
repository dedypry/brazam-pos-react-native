import { productsSchema, salesSchema } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

export interface IProduct extends InferSelectModel<typeof productsSchema> {
}

export interface ISales extends InferSelectModel<typeof salesSchema> {
  product: InferSelectModel<typeof productsSchema>;
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
