import { Entity, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

/**
 * A bookable studio service (threading, brow design, lash lift, ...).
 * Backs GET /api/services and GET /api/services/featured.
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

  /** Booksy-aligned category: threading | waxing | brow-treatments | lashes | permanent-jewelry | add-ons */
  @Property({ type: "string", default: "threading" })
  category: string = "threading";

  /** When true, price displays as "Varies" (e.g. permanent jewelry). */
  @Property({ type: "boolean", default: false })
  priceVaries: boolean = false;

  @Property({ type: "boolean", default: false })
  isAddOn: boolean = false;
}
