# DevConverTools MVP

Micro-SaaS de conversion technique pour developpeurs, optimise pour la vitesse, le SEO et la simplicite.

## Stack recommandee

- Next.js (App Router) + TypeScript
- React Server Components + Client components ciblÃ©s
- CSS natif (sans framework) pour un rendu minimaliste et rapide
- Conversions cote client pour une latence quasi instantanee
- Deploiement Vercel (build statique hybride)

## Fonctionnalites MVP

- JSON -> YAML
- YAML -> JSON
- JSON -> CSV
- CSV -> JSON
- JSON -> TypeScript types
- JSON -> Python classes
- XML -> JSON
- Base64 encode / decode
- JWT decoder
- Timestamp converter

## i18n et SEO

Langues supportees:

- `en` (defaut)
- `fr`
- `es`
- `de`
- `pt`
- `zh`
- `ru`
- `ar`
- `hi`

Exemples d'URLs:

- `/en/json-to-yaml`
- `/fr/json-vers-yaml`
- `/es/json-a-yaml`

Le sitemap est genere automatiquement (`/sitemap.xml`).

## Structure

```text
app/
  [lang]/
    [tool]/page.tsx      # page outil localisee
    layout.tsx           # validation locale
    page.tsx             # home locale
  layout.tsx             # layout racine
  page.tsx               # redirection vers /en
  robots.ts
  sitemap.ts
  globals.css

src/
  components/
    AppHeader.tsx
    ConverterWorkbench.tsx
    FileDropZone.tsx
    ToolGrid.tsx
  config/
    tools.ts             # configuration centrale des outils
  i18n/
    config.ts
    messages.ts
  lib/
    converters/
      index.ts
      generatePython.ts
      generateTypescript.ts
    utils.ts
```

## Ajouter un nouvel outil

1. Ajouter la definition dans `src/config/tools.ts`:
   - `id`
   - `slugs` par langue
   - `name` / `description`
   - extensions input/output
   - options eventuelles
2. Ajouter la logique dans `src/lib/converters/index.ts` (switch sur `toolId`).
3. Aucun ajout de route n'est necessaire: les pages sont generees automatiquement via la config centrale.

## Lancer localement

```bash
npm install
npm run dev
```

Build production:

```bash
npm run build
npm run start
```

## Notes produit

- L'UX est orientee rapidite: conversion instantanee, drag & drop, copier, telecharger.
- Gestion d'erreur simple et lisible.
- Architecture preparee pour 50+ outils via une config unique.

## Configuration Supabase (Account)

Le module account a besoin des variables suivantes:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Etapes rapides:

1. Creer un projet sur Supabase.
2. Ouvrir `Project Settings > API`.
3. Copier `Project URL` dans `NEXT_PUBLIC_SUPABASE_URL`.
4. Copier `anon public key` dans `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
5. Copier `.env.example` vers `.env.local` et coller les vraies valeurs.
6. Redemarrer le serveur Next.js (`npm run dev`).

Exemple `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Pour Vercel, ajouter les memes variables dans `Project Settings > Environment Variables`.
