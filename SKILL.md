---
name: kinglift-website-manager
description: Standard operational skill for maintaining, extending, and testing the KingLift.us website and product catalog.
version: 1.0.0
---

# KingLift.us Agent Skill Reference

This skill document guides AI agents on standard workflows for `kinglift.us`.

## 1. Product Addition Skill

When instructed to "Add a new product" (e.g. *Add KingLift KL-SC26 Electric Scissor Lift*):

### Step A: Update Data Schema
Edit `src/data/products.ts` to add a new `Product` object conforming to `Product` interface in `src/types/index.ts`:
- Ensure unique `id` (e.g. `kl-sc-2600`) and `modelNumber` (e.g. `KL-SC26Li`).
- Fill in complete mechanical specs: `ratedCapacityLbs`, `maxLiftHeightInches`, `turningRadiusInches`, `operatingWeightLbs`, `powerSource`, `warrantyMonths`.
- Add minimum 4 key high-impact feature bullets.

### Step B: Create Obsidian Spec Note
Create `vault/02 - Products/<model-number>.md` with Obsidian frontmatter:
```markdown
---
model: KL-SC26Li
category: Scissor Lifts
capacity_lbs: 2600
lift_height_in: 312
power: 24V Lithium-Ion
status: active
last_updated: 2026-08-18
tags:
  - product
  - scissor-lift
  - aerial-work
---

# KL-SC26Li — KingLift 26ft Lithium Scissor Lift

## Key Highlights
- ...

## Engineering Specs
| Metric | Specification |
|---|---|
| Rated Capacity | 2,600 lbs |
| Platform Height | 26 ft (312 in) |
...
```

### Step C: Verify & Build
Run `npm run build` to guarantee TypeScript types match and no syntax errors are introduced.

---

## 2. Technical Calculator & Matching Logic

When modifying the Lift Calculator (`src/components/tools/LiftCalculator.tsx`):
- Compute load safety factors (recommended 1.25x load factor for safety buffer).
- Account for door clearance (lowered height) vs ceiling max reach.
- Display relevant matched KingLift models with immediate "Add to RFQ" and "View Full Specs" triggers.

---

## 3. SEO & Structured Data Management

When updating pages or products:
- Maintain Schema.org `Product` JSON-LD in `index.html` or dynamic React Helmet/head injectors.
- Include `brand: { "@type": "Brand", "name": "KingLift" }`.
- Provide clear `offers: { "@type": "Offer", "priceCurrency": "USD" }`.
