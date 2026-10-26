# BAM Vehicle Validation

Trilingual (Persian/English/Chinese) driveability and durability application. Built with React/Vinext, Cloudflare Workers and persistent D1.

## Source material
- RELY DRIVE ABILITY TEST(1)(1).pptx: 26-day reference itinerary, route programme and slide-26 test list. Numbering 10–11 is split into urban / congested driving, preserving all 22 numbers.
- Vehicle_Evaluation_Persian_Routes(1).xlsx: 792 actual test rows extracted from Criteria. The older workbook summary says 764. Original Persian fields are preserved and labeled as source language; programme UI and 22 core tests are translated.
- `data/programme.json`: proposed execution profiles and measurement methods, reference routes and engineering endurance proposal.

## Engineering boundaries
The original slide-6 table totals 5,250 km and its rows/26-day itinerary do not reconcile. The implementable reference schedule estimates 5,890 km including selected connecting transfers; daily estimates are not verified road lengths. The interface uses original SVG maps, authored for BAM; no KMC slide imagery is displayed. Regional mode generates exactly 2,000–5,000 planned km. The endurance cycle is 160 × 250 km = 40,000 km. Neither is presented as an ISO mandated cycle or a conformity claim. Confirm precise local routes, endpoints, load/severity and OEM acceptance limits before testing. Daily routes/distances can be edited in records.

ISO 16750-3/-4 refer to E/E component mechanical/climatic environments, ISO 8608 to road-profile reporting, ISO 2631-1 to whole-body vibration evaluation. None independently defines whole-vehicle 40,000 km acceptance. Baseline/every 5,000/final inspections are engineering proposals. No synthetic results are seeded in production.

## Features
Two entry panels; calendar; original interactive route atlas and daily map overlays and external road directions; per-day vehicle/evaluator/odometer/weather/route details; 1–10 scores; measurements; completed repeats/environments; status/reasons; searchable 792-row source catalogue; persistent settings and results; CSV, JSON and print-to-PDF exports. New Sites are owner-private and rely on the platform access boundary; do not make the site public without adding appropriate write authorization.

## Development
Install with the Sites dependency helper. `pnpm dev`, `pnpm build`; `pnpm exec tsc --noEmit`. Schema: `db/schema.ts`; generate append-only migrations with `pnpm db:generate`. Apply local SQL through Wrangler against the generated `dist/server/wrangler.json`, using `.wrangler/state`. Production migration is applied by Sites publishing.

`GET /api/records`, `POST /api/records`, `POST /api/settings`. Save rejects invalid odometers and scores outside 1–10. API uses same-origin write checks; hosted private access protects the site. Records remain on the server, not in browser localStorage.

Source is maintained in the Sites deployment repository and mirrored to https://github.com/nazanin-ghaemizadeh/BAMCO-VEHICLE-VALIDATION (private). Live application: https://bam-vehicle-validation.nazaninghaemi.chatgpt.site . The GitHub repository is a source mirror; Sites owns deployment and its D1 binding.

## GitHub Pages

The public GitHub Pages build uses `pages/main.tsx`, `vite.pages.config.ts`, and `pnpm run build:pages`. GitHub Actions publishes `dist-pages` with the repository base path. The shared React UI is rendered directly on Pages; it is not an iframe or redirect.

GitHub Pages has no server runtime. Its records are stored in the existing BAMCO VEHICLE ASSESSMENT Supabase project, in `public.bam_validation_records`. The schema and owner-specific SELECT/INSERT/UPDATE policies are in `supabase/schema.sql`. Only a publishable client key is embedded. Anonymous users can browse the programmes but cannot read or write results; email/password authentication is required for results. Registration uses normal email confirmation. D1 remains the private Sites deployment's separate backend; prior D1 data is not copied or made public.

## Original map design

`components/RouteMap.tsx` draws the maps directly as SVG, using Natural Earth country boundaries (public domain) and BAM-authored programme overlays. Inter-city corridors and local circuits are planning diagrams, explicitly labeled as not verified road routes. Zoom, fit, start/end markers and trilingual labels are built into the component. All four former KMC-branded slide images have been removed. Vazirmatn is bundled under the SIL Open Font License in `public/fonts/OFL.txt`.

Road context is an offline OpenStreetMap extract (ODbL, attribution on each map), with illustrative corridors built from a subset of main roads. The map does not call public routing services at runtime. Country outlines are Natural Earth, public domain. Local days show the proposed test area on the road context; they do not invent a navigation route or a distance.
