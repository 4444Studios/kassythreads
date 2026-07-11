import "reflect-metadata";
import { defineConfig } from "@mikro-orm/postgresql";
import { Migrator } from "@mikro-orm/migrations";
import { BaseEntity } from "./entities/BaseEntity";
import { Service } from "./entities/Service";
import { InstagramPost } from "./entities/InstagramPost";
import { Product } from "./entities/Product";

export default defineConfig({
  entities: [BaseEntity, Service, InstagramPost, Product],
  // Prefer a single connection string; fall back to discrete vars for local dev.
  clientUrl: process.env.DATABASE_URL,
  host: process.env.POSTGRES_HOST ?? "localhost",
  port: Number(process.env.POSTGRES_PORT ?? 5432),
  user: process.env.POSTGRES_USER ?? "kassythreads",
  password: process.env.POSTGRES_PASSWORD ?? "kassythreads",
  dbName: process.env.POSTGRES_DB ?? "kassythreads",
  extensions: [Migrator],
  migrations: {
    path: "./dist/migrations",
    pathTs: "./src/migrations",
    glob: "!(*.d).{js,ts}",
  },
  debug: process.env.NODE_ENV !== "production",
});
