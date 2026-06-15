import { Entity, Enum, Index, Property, Unique } from "@mikro-orm/core";
import { BaseEntity } from "./BaseEntity";

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

/**
 * Cached Instagram post. Populated by the 6-hour poller (instagram.service.ts)
 * and served to the frontend social wall via GET /api/instagram/feed.
 *
 * `approved` / `featured` are admin-controlled and must be preserved across
 * re-syncs — the poller only updates the media fields.
 */
@Entity({ tableName: "instagram_posts" })
export class InstagramPost extends BaseEntity {
  @Property({ type: "string" })
  @Unique()
  instagramId!: string;

  @Enum({ items: () => ["IMAGE", "VIDEO", "CAROUSEL_ALBUM"] })
  mediaType!: InstagramMediaType;

  @Property({ type: "text" })
  mediaUrl!: string;

  @Property({ type: "text", nullable: true })
  thumbnailUrl?: string;

  @Property({ type: "text" })
  permalink!: string;

  @Property({ type: "datetime" })
  @Index()
  timestamp!: Date;

  @Property({ type: "boolean", default: false })
  @Index()
  approved: boolean = false;

  @Property({ type: "boolean", default: false })
  featured: boolean = false;
}
