---
title: AI Agent Handoff Checklist
tags:
  - workflow
  - handoff
  - agents
---

# 📋 AI Agent Handoff & Quality Checklist

Before switching models or finishing a feature branch:

- [ ] **1. AGENT.md Compliance:** Has the code adhered to the single source of truth in `src/data/products.ts`?
- [ ] **2. TypeScript Validation:** Ran `npm run build` with 0 warnings or type errors.
- [ ] **3. Responsive Verification:** Tested at 375px (mobile), 768px (tablet), and 1440px (desktop).
- [ ] **4. Obsidian Documentation Sync:** Updated or created corresponding markdown documentation in `/vault`.
- [ ] **5. Accessibility:** Interactive buttons, inputs, and drawers have appropriate labels and `id` attributes.
- [ ] **6. No Unwanted Dependencies:** Kept codebase lightweight without extraneous heavyweight dependencies.
