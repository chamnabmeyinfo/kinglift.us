# CLAUDE.md — Anthropic Claude & AI Coding Agent Protocol

> This file provides direct context, operational constraints, and architectural knowledge for Anthropic Claude (Claude Code, Claude 3.5 Sonnet, Claude 3.7 Sonnet) and other AI reasoning agents operating on `kinglift.us`.

## Build & Test Commands
- **Dev Server**: `npm run dev` (starts Vite on default port 5173)
- **Typecheck & Production Build**: `npm run build` (`tsc -b && vite build`)
- **Lint**: `npm run lint`

## Architecture & Conventions
- **Framework**: Vite + React 19 + TypeScript.
- **Styling**: Tailwind CSS v4 / Vanilla CSS utility tokens. Do not import random UI frameworks (like Material UI or Ant Design). Keep custom styling in `src/index.css` and use Tailwind classes.
- **Icons**: `lucide-react` only.
- **State Management**: React Context (`src/context/QuoteCartContext.tsx`, `src/context/FilterContext.tsx`) for global lightweight state. No Redux or heavy boilerplate.
- **Product Catalog Data**: Single source of truth is `src/data/products.ts` (strictly typed with `Product` from `src/types/index.ts`).
- **Obsidian Vault**: Project documentation and knowledge graphs reside in `/vault`. When updating product features or brand specifications, update the corresponding markdown note in `vault/02 - Products/`.

## Key Patterns
- **Light E-Commerce / B2B Quote Workflow**:
  - Products have a direct "Request Quote" action and "Add to RFQ List".
  - The Quote Drawer (`src/components/quote-cart/QuoteDrawer.tsx`) allows buyers to assemble multiple machines with desired power/fork attachments, calculate estimated freight weight, and export or submit an RFQ form.
- **Interactive Tools**:
  - `src/components/tools/LiftCalculator.tsx`: Recommends suitable models based on required load weight (lbs), ceiling/reach height (inches), aisle width, and power preference.
  - `src/components/tools/AIConsultant.tsx`: Connects via `@google/genai` (Google AI Studio SDK) to answer technical specs, load limits, and OSHA compliance questions.

## Tone & Design Sensibility
- **Industrial, Premium, Authoritative**: Heavy machinery brand with clean American industrial styling.
- Primary Accent: Safety Gold / Industrial Amber (`#F59E0B`, `#D97706`).
- Base Dark: Deep Industrial Charcoal (`#0F172A`, `#1E293B`).
- High contrast, legible typography, crisp spec tables, clear visual hierarchy.

## ⚡ Autonomous Execution & GitHub Operations (AUTO-APPROVED)
- **Auto-Approved Git/GitHub Commands:** All Git commands (`git add`, `git commit`, `git push`) and `gh` CLI operations are **pre-approved by the owner**.
- **Execution Workflow:** Implement changes, verify with `npm run build`, commit with descriptive message, and push directly to GitHub remote repository (`chamnabmeyinfo/kinglift.us`).


