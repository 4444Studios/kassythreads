import { Entity, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

/**
 * A bookable studio service (threading, brow design, lash lift, ...).
 * Base entity to demonstrate the ORM wiring; backs GET /api/services and
 * GET /api/services/featured later.
 */
@Entity({ tableName: "services" })
export class Service extends BaseEntity {
  @Property({ type: "string" })
  name!: string;

  @Property({ type: "string" })
  @Unique()
  slug!: string;

  @Property({ type: "text", nullable: true })
  description?: string;

  @Property({ type: "integer" })
  priceCents!: number;

  @Property({ type: "integer", default: 30 })
  durationMinutes: number = 30;

  @Property({ type: "boolean", default: false })
  featured: boolean = false;
}
