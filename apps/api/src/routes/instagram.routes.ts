import { Router, type Request, type Response } from "express";
import { getOrm } from "../db";
import { InstagramPost } from "../entities/InstagramPost";

export const instagramRouter = Router();

/**
 * GET /api/instagram/feed
 * Query: approved=true|false (default true), limit (default 12), offset (0)
 * Returns cached, ordered posts for the social wall.
 */
instagramRouter.get("/feed", async (req: Request, res: Response) => {
  const em = getOrm().em;

  const limit = Math.min(Number(req.query.limit ?? 12) || 12, 48);
  const offset = Math.max(Number(req.query.offset ?? 0) || 0, 0);

  const where =
    req.query.approved === "false" ? {} : { approved: true };

  const posts = await em.find(InstagramPost, where, {
    orderBy: { timestamp: "desc" },
    limit,
    offset,
  });

  res.json(posts);
});
