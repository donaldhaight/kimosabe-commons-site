CREATE TABLE `intake_submissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`refCode` varchar(24) NOT NULL,
	`applicantType` enum('contractor','crew','sales_rep','sponsor','civic_partner','builder','other') NOT NULL,
	`fullName` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(40),
	`organization` varchar(200),
	`orgRole` varchar(120),
	`stateCode` varchar(2) NOT NULL,
	`countySlug` varchar(80) NOT NULL,
	`countyName` varchar(120) NOT NULL,
	`licenses` varchar(300),
	`interests` text,
	`note` text,
	`consent` boolean NOT NULL DEFAULT false,
	`source` varchar(120) NOT NULL,
	`referrer` varchar(500),
	`status` enum('new','reviewing','contacted','qualified','hold','declined') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `intake_submissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `intake_submissions_refCode_unique` UNIQUE(`refCode`)
);
--> statement-breakpoint
CREATE TABLE `sponsor_inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`refCode` varchar(24) NOT NULL,
	`organization` varchar(200) NOT NULL,
	`contactName` varchar(160) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(40),
	`orgType` enum('insurer','supplier_manufacturer','financial_institution','municipality_or_county','nonprofit_or_association','foundation','media','other') NOT NULL,
	`program` enum('recruiting_and_roster','promotion_and_campaigns','territory_stewardship','attestation_and_verification','research_and_case_study','undecided') NOT NULL,
	`budgetRange` enum('under_10k','10k_25k','25k_50k','50k_100k','100k_250k','over_250k','not_disclosed') NOT NULL DEFAULT 'not_disclosed',
	`territory` varchar(200),
	`outcome` text,
	`message` text,
	`consent` boolean NOT NULL DEFAULT false,
	`source` varchar(120) NOT NULL,
	`referrer` varchar(500),
	`status` enum('new','reviewing','in_discussion','proposal_sent','declined') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sponsor_inquiries_id` PRIMARY KEY(`id`),
	CONSTRAINT `sponsor_inquiries_refCode_unique` UNIQUE(`refCode`)
);
--> statement-breakpoint
CREATE TABLE `submission_notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`kind` enum('intake','sponsor') NOT NULL,
	`submissionId` int NOT NULL,
	`note` text NOT NULL,
	`authorOpenId` varchar(64),
	`authorName` varchar(160),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `submission_notes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `intake_status_idx` ON `intake_submissions` (`status`);--> statement-breakpoint
CREATE INDEX `intake_state_idx` ON `intake_submissions` (`stateCode`);--> statement-breakpoint
CREATE INDEX `intake_created_idx` ON `intake_submissions` (`createdAt`);--> statement-breakpoint
CREATE INDEX `sponsor_status_idx` ON `sponsor_inquiries` (`status`);--> statement-breakpoint
CREATE INDEX `sponsor_created_idx` ON `sponsor_inquiries` (`createdAt`);--> statement-breakpoint
CREATE INDEX `note_target_idx` ON `submission_notes` (`kind`,`submissionId`);