---
title: Vite + React 19 Frontend Architecture
tags:
  - architecture
  - vite
  - react
---

# 💻 Vite + React 19 Frontend Architecture for KingLift.us

This document outlines the codebase conventions adopted from Google AI Studio web application patterns.

## 1. Directory Blueprint

```
src/
├── components/
│   ├── layout/         # Header, Navbar, Footer, Banner
│   ├── catalog/        # ProductGrid, ProductCard, FilterSidebar, SearchBar
│   ├── product-detail/ # ProductModal, SpecSheet, ImageGallery
│   ├── quote-cart/     # QuoteDrawer, RFQForm, ItemSummary
│   ├── tools/          # LiftCalculator, AIConsultant (Gemini)
│   └── ui/             # Reusable atomic UI (Badges, Buttons, Tabs)
├── context/            # Global React Contexts
│   ├── QuoteCartContext.tsx
│   └── FilterContext.tsx
├── data/
│   └── products.ts     # Static typed database of all KingLift models
├── services/
│   └── geminiService.ts# Google GenAI SDK client for technical advisory
├── types/
│   └── index.ts        # TypeScript data contracts
├── App.tsx             # Root Orchestration
├── main.tsx            # DOM Mount
└── index.css           # Tailwind CSS directives & theme variables
```

## 2. Component Design Principles
- **No Prop Drilling**: Use `QuoteCartContext` for cart operations and `FilterContext` for search/filter state.
- **Micro-Animations**: Clean CSS transitions for hover, modal entrance, drawer slide-in, and badge status changes.
- **Accessibility (a11y)**: Focus rings, ARIA tags on interactive drawers/modals, semantic HTML tags (`<header>`, `<main>`, `<article>`, `<aside>`, `<footer>`).
