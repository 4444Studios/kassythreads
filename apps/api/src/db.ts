import { MikroORM } from "@mikro-orm/postgresql";
import config from "./mikro-orm.config";

let orm: MikroORM | null = null;

/** Initialise the ORM once and reuse it across the process. */
export async function initOrm(): Promise<MikroORM> {
  if (orm) return orm;
  orm = await MikroORM.init(config);
  return orm;
}

export function getOrm(): MikroORM {
  if (!orm) {
    throw new Error("ORM not initialised. Call initOrm() during bootstrap.");
  }
  return orm;
}
