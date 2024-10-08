CREATE TABLE IF NOT EXISTS "rooms" (
	"id" text PRIMARY KEY NOT NULL,
	"created_by" text,
	"participants" text[],
	"current_participants" text[],
	"password" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "rooms" ADD CONSTRAINT "rooms_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
