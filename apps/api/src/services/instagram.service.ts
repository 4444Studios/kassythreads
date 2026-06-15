import cron from "node-cron";
import type { EntityManager, MikroORM } from "@mikro-orm/postgresql";
import {
  InstagramPost,
  type InstagramMediaType,
} from "../entities/InstagramPost";

// ── Instagram Basic Display / Graph API integration ─────────────────────────
//
// Responsibilities (per project spec):
//   - Exchange a short-lived token → long-lived token (60 day lifetime)
//   - Refresh the long-lived token before it expires
//   - Poll GET /me/media for recent posts
//   - Upsert into the instagram_posts table, preserving admin flags
//   - Run the poll every 6 hours via cron
//
// The frontend never talks to Instagram directly — it reads our cached table.

const GRAPH_BASE = "https://graph.instagram.com";

const MEDIA_FIELDS = [
  "id",
  "media_type",
  "media_url",
  "thumbnail_url",
  "permalink",
  "timestamp",
].join(",");

type IgMediaItem = {
  id: string;
  media_type: InstagramMediaType;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

type IgMediaResponse = {
  data?: IgMediaItem[];
  paging?: { next?: string };
};

// Current long-lived token, seeded from env and refreshed on a schedule.
let currentToken: string | undefined = process.env.INSTAGRAM_ACCESS_TOKEN;

/**
 * Exchange a short-lived token for a long-lived one (~60 days).
 * Requires the app secret. Call this once when bootstrapping a new token.
 */
export async function exchangeForLongLivedToken(
  shortLivedToken: string,
  appSecret = process.env.INSTAGRAM_APP_SECRET,
): Promise<string> {
  if (!appSecret) {
    throw new Error("INSTAGRAM_APP_SECRET is required to exchange a token.");
  }
  const url = new URL(`${GRAPH_BASE}/access_token`);
  url.searchParams.set("grant_type", "ig_exchange_token");
  url.searchParams.set("client_secret", appSecret);
  url.searchParams.set("access_token", shortLivedToken);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Token exchange failed: ${res.status} ${await res.text()}`);
  }
  const json = (await res.json()) as { access_token: string };
  currentToken = json.access_token;
  return currentToken;
}

/**
 * Refresh a long-lived token (extends another ~60 days). Tokens must be at
 * least 24h old and not expired. Safe to call on the 6h cron.
 */
export async function refreshLongLivedToken(): Promise<string | undefined> {
  if (!currentToken) return undefined;
  const url = new URL(`${GRAPH_BASE}/refresh_access_token`);
  url.searchParams.set("grant_type", "ig_refresh_token");
  url.searchParams.set("access_token", currentToken);

  const res = await fetch(url);
  if (!res.ok) {
    // Non-fatal — keep using the existing token and try again next cycle.
    console.warn(`Instagram token refresh failed: ${res.status}`);
    return currentToken;
  }
  const json = (await res.json()) as { access_token: string };
  currentToken = json.access_token;
  return currentToken;
}

/** Poll the most recent media for the connected account. */
async function fetchMedia(limit = 25): Promise<IgMediaItem[]> {
  if (!currentToken) return [];
  const url = new URL(`${GRAPH_BASE}/me/media`);
  url.searchParams.set("fields", MEDIA_FIELDS);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", currentToken);

  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`Instagram media fetch failed: ${res.status}`);
    return [];
  }
  const json = (await res.json()) as IgMediaResponse;
  return json.data ?? [];
}

/**
 * Upsert fetched media into the DB. Media fields are refreshed (signed URLs
 * expire), but admin-controlled `approved` / `featured` flags are preserved.
 */
export async function syncInstagramFeed(em: EntityManager): Promise<number> {
  const items = await fetchMedia();
  if (items.length === 0) return 0;

  for (const item of items) {
    let post = await em.findOne(InstagramPost, { instagramId: item.id });
    if (!post) {
      post = em.create(
        InstagramPost,
        {
          instagramId: item.id,
          mediaType: item.media_type,
          mediaUrl: item.media_url,
          thumbnailUrl: item.thumbnail_url,
          permalink: item.permalink,
          timestamp: new Date(item.timestamp),
          approved: false,
          featured: false,
        },
        { partial: true },
      );
      em.persist(post);
    } else {
      post.mediaType = item.media_type;
      post.mediaUrl = item.media_url;
      post.thumbnailUrl = item.thumbnail_url;
      post.permalink = item.permalink;
      post.timestamp = new Date(item.timestamp);
    }
  }

  await em.flush();
  return items.length;
}

/**
 * Start the 6-hour polling cron. Refreshes the token, then syncs media.
 * Runs an initial sync on startup. No-op if no token is configured.
 */
export function startInstagramCron(orm: MikroORM): void {
  if (!currentToken) {
    console.warn("INSTAGRAM_ACCESS_TOKEN not set — Instagram sync disabled.");
    return;
  }

  const run = async () => {
    try {
      await refreshLongLivedToken();
      const em = orm.em.fork();
      const count = await syncInstagramFeed(em);
      console.log(`Instagram sync complete: ${count} posts processed.`);
    } catch (err) {
      console.error("Instagram sync failed:", err);
    }
  };

  // Every 6 hours, on the hour.
  cron.schedule("0 */6 * * *", run);
  // Initial sync shortly after boot.
  void run();
}
