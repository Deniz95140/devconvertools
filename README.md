# DevConverTools

DevConverTools is a fast, minimal toolbox for developers to convert technical data formats instantly.

## What It Does

- Instant format conversion in the browser
- File drag & drop support
- Copy and download output
- Multilingual interface
- Optional account system (Supabase)

## Included Tools

- JSON ↔ YAML
- JSON ↔ CSV
- XML → JSON
- JSON → TypeScript types
- JSON → Python classes
- Base64 encode/decode
- JWT decoder
- Timestamp converter
- JSON formatter / validator / minifier
- URL & HTML encode/decode
- SHA256 / MD5 generator
- Regex tester
- UUID generator
- Password generator

## Tech Stack

- Next.js + TypeScript
- Supabase Auth (optional account)
- Optimized for Vercel deployment

## Local Setup

```bash
npm install
npm run dev
```

Open: `http://localhost:3000`

## Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=YOUR_CLOUDFLARE_TOKEN
```

## Production

Deploy on Vercel and add the same environment variables in project settings.

---

Contact: `devconvertools@gmail.com`
