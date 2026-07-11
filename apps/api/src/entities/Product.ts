import { Entity, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

/**
 * Retail product for the shop section. Scaffold until client provides SKUs.
 * Backs GET /api/products and GET /api/products/featured.
 */
@Entity({ tableName: "products" })
export class Product extends BaseEntity {
  @Property({ type: "string" })
  name!: string;

  @Property({ type: "string" })
  @Unique()
  slug!: string;

  @Property({ type: "text", nullable: true })
  description?: string;

  @Property({ type: "integer" })
  priceCents!: number;

  @Property({ type: "string", nullable: true })
  imageUrl?: string;

  @Property({ type: "boolean", default: false })
  available: boolean = false;

  @Property({ type: "boolean", default: false })
  featured: boolean = false;
}
