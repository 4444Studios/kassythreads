import { Router, type Request, type Response } from "express";
import { getOrm } from "../db";
import { Product } from "../entities/Product";

export const productsRouter = Router();

/** GET /api/products — all products, ordered by name. */
productsRouter.get("/", async (_req: Request, res: Response) => {
  const em = getOrm().em;
  const products = await em.find(Product, {}, { orderBy: { name: "asc" } });
  res.json(products);
});

/** GET /api/products/featured — featured retail products. */
productsRouter.get("/featured", async (_req: Request, res: Response) => {
  const em = getOrm().em;
  const products = await em.find(
    Product,
    { featured: true },
    { orderBy: { name: "asc" } },
  );
  res.json(products);
});
