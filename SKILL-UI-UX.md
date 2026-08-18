---
name: kinglift-titanium-ux-ui-design-standard
description: Comprehensive World-Class Industrial UI/UX Design System, Typography, Layout, and Component Guidelines for KingLift.us.
version: 2.0.0
---

# 👑 KingLift Titanium Industrial UI/UX Design Standard (THIDS-2026)

This specification defines the elite design standard for `kinglift.us`. Every page, modal, button, and data presentation must embody **rugged American heavy industrial power** merged with **cutting-edge modern electric machinery aesthetics** (similar to Tesla Semi, CAT Next-Gen, Jungheinrich Lithium, and Apple Pro hardware).

---

## 1. Visual Hierarchy & Design Philosophy

### The 5 Pillars of KingLift Design:
1. **Engineering Authority & High Information Density:** B2B commercial buyers need exact numbers (rated capacity, mast height, battery voltage, aisle radius). Present specs with crisp typography and zero fluff.
2. **Tactile Industrial Textures & Metallic Depth:** Deep obsidian charcoal (`#070A11`), brushed titanium glass, and glowing Safety Amber accents (`#F59E0B`, `#FB8500`).
3. **No Basic MVP Aesthetics:** Every card has micro-elevation, subtle border lighting (`1px solid rgba(245, 158, 11, 0.2)`), smooth hover physics, and accessible focus rings.
4. **Dual Imperial / Metric Native Units:** Always provide instant 1-click unit conversion (`lbs` ⇄ `kg`, `inches` ⇄ `mm`).
5. **Fluid Responsive Motion:** 200ms–300ms cubic-bezier transitions for modals, drawers, tabs, and filters.

---

## 2. Color Palette & Lighting Tokens

### Dark Theme (Default Heavy Industry)
- **Base Canvas:** Deepest Obsidian `#070A11`
- **Surface Elevation 1 (Cards, Sidebars):** Dark Steel `#0E1422`
- **Surface Elevation 2 (Elevated Panels, Modals):** Titanium Slate `#141C30`
- **Primary Accent / Brand Safety Gold:** High-Visibility Amber `#F59E0B` (Hover: `#FBBF24`, Glow: `rgba(245, 158, 11, 0.25)`)
- **Secondary Industrial Orange:** `#FB8500`
- **Electric Cyan (Tech / Lithium Highlights):** `#06B6D4`
- **Text Primary:** Pure Crisp White `#F8FAFC`
- **Text Secondary:** Slate Gray `#94A3B8`
- **Border Subtle:** `#1E293B`
- **Border Highlight:** `rgba(245, 158, 11, 0.3)`

### Light Theme (Daylight Warehouse Clarity)
- **Base Canvas:** Pure Crisp Clean `#F8FAFC`
- **Surface Elevation 1 (Cards):** `#FFFFFF` with `box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04)`
- **Surface Elevation 2 (Modals):** `#FFFFFF` with `border: 1px solid #E2E8F0`
- **Text Primary:** Deep Industrial Navy `#0F172A`
- **Text Secondary:** Slate `#475569`
- **Border Subtle:** `#E2E8F0`

---

## 3. Typography & Micro-Hierarchy

- **Headlines & Display:** `Outfit`, `Space Grotesk` (Bold/Black, -0.03em tracking, uppercase punch).
- **Body & Marketing Copy:** `Inter`, system-ui (High legibility, line-height 1.6).
- **Engineering Specs & Numbers:** `JetBrains Mono`, monospace (Tabular figures, uppercase labels).

---

## 4. Component Craftsmanship Rules

### Product Cards:
- Heavy-duty corner radius (`rounded-2xl`).
- High-resolution hero image with dynamic background contrast.
- Visual load capacity indicator bar (e.g. 4,500 lbs / 5,000 lbs gauge).
- 4-grid key spec badges (Capacity, Lift Height, Power, Weight).
- Immediate dual action: **"Add to RFQ Cart"** + **"Quick Spec Sheet"**.

### Modal & Spec Viewer:
- Floating backdrop with heavy glass blur (`backdrop-blur-xl`).
- Dual tab view: **Commercial Overview** vs **Full Engineering Blueprint Table**.
- Interactive accessories checklist (e.g., Lithium Fast Charger, Fork Extensions, Safety Beacon).
- Instant PDF spec sheet trigger.

### Tools (Lift Calculator & Gemini AI Consultant):
- Live interactive sliders with real-time feedback.
- Safety Factor visualization (+20% OSHA margin).
- AI Advisor with glowing prompt chips, streaming text animations, and direct RFQ cart integration.

---

## 5. Checklist for Every UI Update:
- [ ] Are headings uppercase with strong font weights and tight tracking?
- [ ] Is contrast verified (minimum 4.5:1 for body text, 7:1 for headings)?
- [ ] Do cards have hover elevation, subtle border highlights, and smooth transition physics?
- [ ] Does it render flawlessly on both mobile (375px) and ultra-wide screens (1440px+)?
- [ ] Does it support both Dark and Light modes without missing text contrast?
