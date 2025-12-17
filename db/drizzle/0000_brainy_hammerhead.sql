CREATE TABLE `additional_fee` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`price` real NOT NULL,
	`transaction_id` integer,
	`created_at` integer DEFAULT (strftime('%s','now')),
	`updated_at` integer DEFAULT (strftime('%s','now')),
	FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
--> statement-breakpoint
CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_id` integer,
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
CREATE TABLE `sales` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`transaction_id` integer,
	`product_id` integer,
	`quantity` integer DEFAULT 1,
	`status` text DEFAULT 'pending',
	`price` real DEFAULT 0,
	`total_price` real NOT NULL,
	`note` text,
	`created_at` integer DEFAULT (strftime('%s','now')),
	`updated_at` integer DEFAULT (strftime('%s','now')),
	FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_id` integer,
	`trx_no` text NOT NULL,
	`discount` real NOT NULL,
	`total_price` real NOT NULL,
	`customer_id` integer,
	`note` text,
	`payment_method` text,
	`created_at` integer DEFAULT (strftime('%s','now')),
	`updated_at` integer DEFAULT (strftime('%s','now'))
);
--> statement-breakpoint
CREATE TABLE `uoms` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text
);
