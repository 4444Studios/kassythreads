# KassyThreads

Luxury eyebrow threading and lash-lift studio booking platform. A fully owned
booking site (not a Booksy embed): cinematic marketing surfaces backed by a
self-hosted API, media storage, and on-the-fly image optimization.

**Repository:** [github.com/4444Studios/kassythreads](https://github.com/4444Studios/kassythreads)

```bash
git clone git@github.com:4444Studios/kassythreads.git
```

## Stack

| Layer        | Tech                                                        |
| ------------ | ---------------------------------------------------------- |
| Web          | Next.js 15 (App Router, RSC-first), Tailwind v4, Framer Motion |
| API          | Express + Mikro-ORM + PostgreSQL                            |
| Media        | MinIO (object storage) + imgproxy (WebP/resize sidecar)    |
| Notifications| ntfy                                                       |
| Ingress      | Caddy (internal routing) behind Cloudflare Tunnel          |
| Payments     | Stripe · Email: Resend                                      |

Monorepo managed with pnpm workspaces:

```
apps/
├── web/   # Next.js front end
└── api/   # Express + Mikro-ORM back end
```

## Local development

Prerequisites: Node 22+, pnpm 10+, Docker.

```bash
cp .env.example .env          # fill in values
pnpm install
docker compose --profile local up   # postgres, minio, imgproxy, ntfy, api, web
```

Or run the apps directly with hot reload (infra still via compose):

```bash
pnpm dev        # web + api in parallel
pnpm dev:web
pnpm dev:api
```

## Demo (GitHub Pages)

The marketing homepage can be published as a fully static site for previews
(e.g. to share with the client) — no API, MinIO, or imgproxy required. It
renders from bundled assets in `apps/web/public/demo` with
`NEXT_PUBLIC_DEMO_MODE=1`.

Build it locally:

```bash
# Served from the repo subpath, exactly like GitHub Pages
NEXT_PUBLIC_BASE_PATH=/kassythreads pnpm build:demo
npx serve apps/web/out   # preview
```

Output lands in `apps/web/out/`.

**Publishing:** the `Demo (GitHub Pages)` workflow
(`.github/workflows/demo-pages.yml`) builds and deploys this automatically on
every push to `main`. One-time setup:

1. Repo lives under the **4444Studios** org as **`kassythreads`**.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The site goes live at `https://4444studios.github.io/kassythreads/`.

The `basePath` is derived from the repo name automatically, so the demo only
matches the URL when the repo is named `kassythreads`.

> The demo is the homepage only. CTA links like *Book* point at routes that
> don't exist yet, so they 404 — that's expected for a visual preview.

## Production (Hostinger VPS)

Production is a self-hosted Docker stack on a Hostinger VPS, deployed from GitHub
over SSH. **There is no container registry — images are built on the VPS.**
Cloudflare Tunnel (`cloudflared`) exposes the app to the internet, so **no
inbound ports are opened**; Caddy runs internally only for path routing
(`/api/*` → api, `/img/*` → imgproxy, everything else → web).

### One-time VPS setup

1. Install Docker + the Compose plugin on the VPS.
2. Clone this repo and create `.env` (see `.env.example`, use the production
   overrides at the bottom):

   ```bash
   git clone git@github.com:4444Studios/kassythreads.git
   ```
3. Create a tunnel in the **Cloudflare Zero Trust** dashboard, add a public
   hostname (`kassythreads.com`) pointing at `http://caddy:80`, copy the tunnel
   token into `TUNNEL_TOKEN` in `.env`.

### Deploy

Add these repository secrets so the `Deploy (VPS)` workflow can SSH in:

| Secret        | Purpose                              |
| ------------- | ------------------------------------ |
| `VPS_HOST`    | Server IP / hostname                 |
| `VPS_USER`    | SSH user                             |
| `VPS_SSH_KEY` | Private key with VPS access          |
| `VPS_PORT`    | SSH port (optional, default `22`)    |
| `VPS_APP_DIR` | Absolute path to the repo on the VPS |

Then run the **Deploy (VPS)** workflow from the Actions tab. It pulls the latest
code, builds images on the VPS, runs migrations, and restarts the stack:

```bash
git reset --hard origin/main
docker compose --profile prod build
docker compose --profile prod run --rm api pnpm mikro-orm migration:up
docker compose --profile prod up -d
docker image prune -f
```

The workflow is manual (`workflow_dispatch`) for now. Once the VPS and secrets
are ready, uncomment the `push` trigger in `.github/workflows/deploy.yml` to
deploy automatically on every push to `main`.
