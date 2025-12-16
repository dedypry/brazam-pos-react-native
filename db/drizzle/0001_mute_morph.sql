CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `uoms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_id` text,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`stock` real,
	`is_stock` integer DEFAULT false NOT NULL,
	`photos` text DEFAULT '[]',
	`description` text,
	`is_product_show` integer DEFAULT true NOT NULL,
	`modal` integer DEFAULT 0,
	`category` text,
	`uom` text,
	`sku` text,
	`barcode` text,
	`deleted_at` integer,
	`created_at` integer DEFAULT (strftime('%s','now')),
	`updated_at` integer DEFAULT (strftime('%s','now'))
);
--> statement-breakpoint
INSERT INTO `__new_products`("id", "company_id", "name", "price", "stock", "is_stock", "photos", "description", "is_product_show", "modal", "category", "uom", "sku", "barcode", "deleted_at", "created_at", "updated_at") SELECT "id", "company_id", "name", "price", "stock", "is_stock", "photos", "description", "is_product_show", "modal", "category", "uom", "sku", "barcode", "deleted_at", "created_at", "updated_at" FROM `products`;--> statement-breakpoint
DROP TABLE `products`;--> statement-breakpoint
ALTER TABLE `__new_products` RENAME TO `products`;--> statement-breakpoint
PRAGMA foreign_keys=ON;