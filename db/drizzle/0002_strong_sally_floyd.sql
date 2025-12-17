PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company_id` integer,
	`trx_no` text NOT NULL,
	`discount` real DEFAULT 0 NOT NULL,
	`total_price` real DEFAULT 0 NOT NULL,
	`payment_price` real DEFAULT 0 NOT NULL,
	`change_price` real DEFAULT 0 NOT NULL,
	`customer_id` integer,
	`note` text,
	`payment_method` text,
	`created_at` integer DEFAULT (strftime('%s','now')),
	`updated_at` integer DEFAULT (strftime('%s','now'))
);
--> statement-breakpoint
INSERT INTO `__new_transactions`("id", "company_id", "trx_no", "discount", "total_price", "payment_price", "change_price", "customer_id", "note", "payment_method", "created_at", "updated_at") SELECT "id", "company_id", "trx_no", "discount", "total_price", "payment_price", "change_price", "customer_id", "note", "payment_method", "created_at", "updated_at" FROM `transactions`;--> statement-breakpoint
DROP TABLE `transactions`;--> statement-breakpoint
ALTER TABLE `__new_transactions` RENAME TO `transactions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;