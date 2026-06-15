import "reflect-metadata";
import dotenv from "dotenv";
import { initOrm } from "./db";
import { createApp } from "./app";
import { startInstagramCron } from "./services/instagram.service";

dotenv.config();

const PORT = Number(process.env.PORT ?? 4000);

async function bootstrap() {
  const orm = await initOrm();
  const app = createApp();

  // Begin polling Instagram every 6 hours (no-op without a token).
  startInstagramCron(orm);

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`KassyThreads API listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start API:", err);
  process.exit(1);
});
