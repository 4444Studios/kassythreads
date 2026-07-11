import { Router, type Request, type Response } from "express";
import { getOrm } from "../db";
import { Service } from "../entities/Service";

export const servicesRouter = Router();

/** GET /api/services — all services, optionally filtered by ?category= */
servicesRouter.get("/", async (req: Request, res: Response) => {
  const em = getOrm().em;
  const category =
    typeof req.query.category === "string" ? req.query.category : undefined;
  const where = category ? { category } : {};
  const services = await em.find(Service, where, {
    orderBy: { category: "asc", name: "asc" },
  });
  res.json(services);
});

/** GET /api/services/featured — up to 3 featured services for the homepage. */
servicesRouter.get("/featured", async (_req: Request, res: Response) => {
  const em = getOrm().em;
  const services = await em.find(
    Service,
    { featured: true },
    { orderBy: { name: "asc" }, limit: 3 },
  );
  res.json(services);
});
