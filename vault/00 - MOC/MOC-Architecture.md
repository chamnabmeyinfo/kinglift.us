---
title: MOC - Web Architecture & Technical Stack
tags:
  - moc
  - architecture
  - frontend
---

# 💻 MOC: Web Architecture & Technical Stack

The web application for **KingLift.us** is designed following Google AI Studio web application principles: fast, single-page reactive interface, clean component modularity, instant responsive layout, and integrated AI assistant.

## Architecture Highlights
- **Framework**: Vite 6+ with React 19 and TypeScript Strict Mode.
- **Styling**: Tailwind CSS with custom industrial tokens (`slate-900`, `amber-500`, `zinc-100`).
- **Icons**: Lucide React.
- **AI Integration**: Direct `@google/genai` (Gemini 2.5 Flash / Gemini Pro) for technical questions, forklift vs stacker comparisons, and OSHA weight calculations.
- **State System**:
  - `QuoteCartContext`: Light shopping cart / RFQ manager.
  - `FilterContext`: Multi-faceted product search & filtering (Capacity range, Lift height, Category, Power type).
- **Deployment**: Static SPA deployable to Vercel, Firebase App Hosting, Cloudflare Pages, Netlify, or AWS S3+CloudFront.

## Core Documents
- [[Vite-React-Architecture]] — Full tree breakdown and component responsibilities.
- [[State-Management]] — Quote Cart and Filter Context schemas.
- [[Google-AI-Studio-Integration]] — Prompt design and fallback logic for Google Gemini.
- [[Deployment-Guide]] — CI/CD and deployment procedures.
