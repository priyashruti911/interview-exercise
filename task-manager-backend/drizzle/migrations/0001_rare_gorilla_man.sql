ALTER TABLE "projects" DROP CONSTRAINT "projects_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "title" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "status" SET DEFAULT 'todo';--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "priority" SET DATA TYPE varchar(10);--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "priority" SET DEFAULT 'medium';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "projects" ADD COLUMN "owner_id" integer;--> statement-breakpoint
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "projects" DROP COLUMN "user_id";