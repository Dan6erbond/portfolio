import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_contact_links_type" ADD VALUE 'bluesky';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "public"."contact_links" ALTER COLUMN "type" SET DATA TYPE text;
  DROP TYPE "public"."enum_contact_links_type";
  CREATE TYPE "public"."enum_contact_links_type" AS ENUM('linkedin', 'reddit', 'gitea', 'github', 'email');
  ALTER TABLE "public"."contact_links" ALTER COLUMN "type" SET DATA TYPE "public"."enum_contact_links_type" USING "type"::"public"."enum_contact_links_type";`)
}
