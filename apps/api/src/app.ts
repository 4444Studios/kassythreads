import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import { RequestContext } from "@mikro-orm/core";
import { getOrm } from "./db";
import { servicesRouter } from "./routes/services.routes";
import { instagramRouter } from "./routes/instagram.routes";

/**
 * Builds the Express app. Route handlers (services, instagram, availability,
 * bookings, stripe) are added later — this is the base scaffold only.
 */
export function createApp(): Express {
  const app = express();

  app.use(cors({ origin: process.env.WEB_ORIGIN ?? true }));
  app.use(express.json());

  // Fork a fresh EntityManager per request (Mikro-ORM identity map isolation).
  app.use((_req, _res, next) => {
    RequestContext.create(getOrm().em, next);
  });

  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", service: "kassythreads-api", time: new Date().toISOString() });
  });

  app.use("/api/services", servicesRouter);
  app.use("/api/instagram", instagramRouter);

  return app;
}
