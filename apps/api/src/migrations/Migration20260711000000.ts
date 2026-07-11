import { Migration } from "@mikro-orm/migrations";

/**
 * Initial schema: services (with Booksy categories) + products + instagram_posts.
 */
export class Migration20260711000000 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`
      create table if not exists "services" (
        "id" uuid not null,
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        "name" varchar(255) not null,
        "slug" varchar(255) not null,
        "description" text null,
        "price_cents" int not null,
        "duration_minutes" int not null default 30,
        "featured" boolean not null default false,
        "category" varchar(255) not null default 'threading',
        "price_varies" boolean not null default false,
        "is_add_on" boolean not null default false,
        constraint "services_pkey" primary key ("id")
      );
    `);
    this.addSql(
      `create unique index if not exists "services_slug_unique" on "services" ("slug");`,
    );

    this.addSql(`
      create table if not exists "products" (
        "id" uuid not null,
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        "name" varchar(255) not null,
        "slug" varchar(255) not null,
        "description" text null,
        "price_cents" int not null,
        "image_url" varchar(255) null,
        "available" boolean not null default false,
        "featured" boolean not null default false,
        constraint "products_pkey" primary key ("id")
      );
    `);
    this.addSql(
      `create unique index if not exists "products_slug_unique" on "products" ("slug");`,
    );

    this.addSql(`
      create table if not exists "instagram_posts" (
        "id" uuid not null,
        "created_at" timestamptz not null,
        "updated_at" timestamptz not null,
        "instagram_id" varchar(255) not null,
        "media_type" varchar(255) not null,
        "media_url" text not null,
        "thumbnail_url" text null,
        "permalink" text not null,
        "timestamp" timestamptz not null,
        "approved" boolean not null default false,
        "featured" boolean not null default false,
        constraint "instagram_posts_pkey" primary key ("id")
      );
    `);
    this.addSql(
      `create unique index if not exists "instagram_posts_instagram_id_unique" on "instagram_posts" ("instagram_id");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "instagram_posts" cascade;`);
    this.addSql(`drop table if exists "products" cascade;`);
    this.addSql(`drop table if exists "services" cascade;`);
  }
}
