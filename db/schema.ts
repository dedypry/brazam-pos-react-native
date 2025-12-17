import { relations } from "drizzle-orm";
import additionalFeeMigration from "./migrations/additionalFee.migration";
import categoryMigration from "./migrations/category.migration";
import productMigration from "./migrations/product.migration";
import salesMigration from "./migrations/sales.migration";
import transactionMigration from "./migrations/transaction.migration";
import uomMigration from "./migrations/uom.migration";

export const productsSchema = productMigration
export const salesSchema = salesMigration
export const categorySchema = categoryMigration
export const uomSchema = uomMigration
export const additionFeeSchema = additionalFeeMigration
export const transactionSchema = transactionMigration

export const productsRelations = relations(productsSchema, ({ many }) => ({
  sales: many(salesSchema),
}));

export const salesRelations = relations(salesSchema, ({ one }) => ({
  product: one(productsSchema, {
    fields: [salesSchema.productId],
    references: [productsSchema.id],
  }),
}));

export const additionalRelations = relations(transactionSchema, ({ many }) => ({
  additionalFee: many(additionFeeSchema),
}));

export const trxItemRelations = relations(transactionSchema, ({ many }) => ({
  transactionItems: many(salesSchema),
}));

