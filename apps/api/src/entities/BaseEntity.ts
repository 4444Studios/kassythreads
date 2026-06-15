import { PrimaryKey, Property } from "@mikro-orm/core";
import { randomUUID } from "node:crypto";

/**
 * Shared base for every persisted entity: UUID primary key plus
 * created/updated timestamps maintained by the ORM.
 */
export abstract class BaseEntity {
  @PrimaryKey({ type: "uuid" })
  id: string = randomUUID();

  @Property({ type: "datetime", onCreate: () => new Date() })
  createdAt!: Date;

  @Property({ type: "datetime", onCreate: () => new Date(), onUpdate: () => new Date() })
  updatedAt!: Date;
}
