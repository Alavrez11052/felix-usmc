# Felix's United States Marine Corps — Website

A standalone Next.js website for Felix's USMC (Roblox MILSIM community).
Black-and-white theme, database-backed content, and an email-based admin
dashboard. No Roblox login or rank integration — administration is by
email + password only, and the owner adds administrators by email.

## Stack

- Next.js 14 (App Router) + React + TypeScript
- Tailwind CSS (monochrome design)
- PostgreSQL via Prisma
- Auth: bcrypt password hashing + signed JWT session cookie (jose)

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment** — copy `.env.example` to `.env` and set:

   - `DATABASE_URL` — your PostgreSQL connection string.
   - `AUTH_SECRET` — a long random string used to sign sessions.

3. **Start a local database (optional, for development)**

   ```bash
   docker compose up -d
   ```

   This matches the `DATABASE_URL` in `.env.example`
   (postgres on localhost:5433). For production, use any hosted
   PostgreSQL (e.g. Neon, Supabase) and put its URL in `.env`.

4. **Create tables and load the site's content**

   ```bash
   npx prisma db push
   npm run db:seed
   ```

   The seed loads all six commands, units, chains of command, HQ
   leadership, the rank structure, and the main Discord / Roblox / X
   links. It only resets content tables — admin accounts are untouched.

5. **Run**

   ```bash
   npm run dev     # development, http://localhost:3000
   npm run build && npm start   # production
   ```

6. **Create the owner account** — visit `/setup` once. The first
   account created becomes the OWNER. After that, `/setup` locks.

7. **Add administrators** — the owner signs in at `/login`, opens
   **Admin → Administrators**, enters an email address, and sends that
   person the one-time invite link shown on the page. They open it, set
   their name and password, and they're an admin. Owners can also remove
   administrators and revoke pending invites there.

## Deploying (Netlify)

- Connect the repo, set `DATABASE_URL` and `AUTH_SECRET` environment
  variables, and deploy — `netlify.toml` runs
  `prisma generate && prisma db push && next build`.
- Run `npm run db:seed` once against the production database to load
  the content (or use the admin dashboard to build it by hand).

## Images

The site's artwork lives in `public/images/`:

- `hero-honor.png` — homepage hero ("death before dishonor")
- `marsoc-raiders.png` — MARSOC banner
- `marforcom-2mardiv.png` — MARFORCOM banner (2MARDIV "Follow Me")
- `tecom-recon.png` — TECOM banner
- `ega.png` — Eagle, Globe, and Anchor used in the header and footer

All photography is displayed in black and white to match the theme.
Command banner images can be changed per command in
**Admin → Commands → Edit** (image path field).

## Admin dashboard

`/admin` (sign in at `/login`):

- **Overview** — counts, recent announcements, recent activity
- **Commands** — create/edit/delete commands; edit units and staff
- **Chain of Command** — HQ leadership, with reordering
- **Ranks** — rank codes and names
- **Announcements** — publish, feature on the homepage, edit, delete
- **Affiliates** — affiliated groups shown on the public page
- **Administrators** — owner-only invites/removals by email
- **Configuration** — main Discord / Roblox / X links, announcement banner
- **Audit Log** — every administrative action, with who and when
