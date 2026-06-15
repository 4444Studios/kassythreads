import { isDemoMode, demoInstagramPosts } from "./demo";

// Shape of a cached Instagram post served by GET /api/instagram/feed.
// Mirrors the instagram_posts table populated by the Express poller.
export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export type InstagramPost = {
  id: string;
  instagramId: string;
  mediaType: InstagramMediaType;
  mediaUrl: string;
  thumbnailUrl?: string;
  permalink: string;
  timestamp: string;
  approved: boolean;
  featured: boolean;
};

// Public studio handle for the "Follow us" CTA.
export const INSTAGRAM_HANDLE = "@kassythreads";
export const INSTAGRAM_PROFILE_URL = "https://instagram.com/kassythreads";

/**
 * Fetches approved, cached Instagram posts from our own API (never live IG).
 * Revalidates every 6 hours to match the backend cron. Fails soft to [].
 */
export async function getInstagramFeed(limit = 12): Promise<InstagramPost[]> {
  const apiUrl = process.env.API_URL;
  if (apiUrl) {
    try {
      const res = await fetch(
        `${apiUrl}/api/instagram/feed?approved=true&limit=${limit}`,
        { next: { revalidate: 21600 } },
      );
      if (res.ok) {
        const posts = (await res.json()) as InstagramPost[];
        if (posts.length > 0) return posts;
      }
    } catch {
      // fall through to demo / empty
    }
  }
  // Demo fallback for client previews (NEXT_PUBLIC_DEMO_MODE=1).
  if (isDemoMode()) return demoInstagramPosts.slice(0, limit);
  return [];
}
