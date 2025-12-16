CREATE TABLE `products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_id` text,
	`name` text NOT NULL,
	`price` text NOT NULL,
	`stock` text,
	`is_stock` integer DEFAULT false,
	`photos` text DEFAULT '[]',
	`description` text,
	`is_product_show` integer DEFAULT true,
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
	`product_id` integer,
	`quantity` integer DEFAULT 1,
	`status` text DEFAULT 'pending',
	`created_at` integer DEFAULT (strftime('%s','now')),
	`updated_at` integer DEFAULT (strftime('%s','now')),
	FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON UPDATE no action ON DELETE no action
);
