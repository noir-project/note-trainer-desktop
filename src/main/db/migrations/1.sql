CREATE TABLE `game_records` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`level` integer NOT NULL,
	`score` integer NOT NULL,
	`streak` integer NOT NULL,
	`accuracy` real NOT NULL,
	`exp` integer NOT NULL,
	`created_at` datetime DEFAULT (datetime('now', 'localtime'))
);
