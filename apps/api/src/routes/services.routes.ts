import { Router, type Request, type Response } from "express";
import { getOrm } from "../db";
import { Service } from "../entities/Service";

export const servicesRouter = Router();

/** GET /api/services — all services, ordered by name. */
servicesRouter.get("/", async (_req: Request, res: Response) => {
  const em = getOrm().em;
  const services = await em.find(Service, {}, { orderBy: { name: "asc" } });
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
