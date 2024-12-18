ALTER TABLE "boards" DROP CONSTRAINT "boards_id_unique";--> statement-breakpoint
ALTER TABLE "boards" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "boards" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "boards" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "boards" ADD CONSTRAINT "boards_name_unique" UNIQUE("name");