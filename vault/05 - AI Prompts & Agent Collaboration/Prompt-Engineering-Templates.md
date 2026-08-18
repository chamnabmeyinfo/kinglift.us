---
title: Prompt Engineering Templates for Multi-Agent AI Workflows
tags:
  - ai-prompts
  - agents
  - collaboration
---

# 🤖 Multi-Agent Collaboration & Prompt Templates

When bringing new AI coding models (Cursor Composer, Claude Code, Windsurf, Antigravity, OpenAI Codex) into this project, use these ready-made system prompts.

## 1. System Prompt for Any AI Coding Model

```text
You are an expert engineer working on the KingLift.us official brand website (React 19 + TypeScript + Vite + Tailwind CSS).
Your goal is to maintain the clean, industrial, heavy-equipment brand presentation while ensuring fast load times and clean code.

Rules:
1. Refer to AGENT.md, CLAUDE.md, and the Obsidian Vault in /vault.
2. Maintain single source of truth for products in src/data/products.ts.
3. Keep styling aligned with the KingLift design tokens (Slate-950/Charcoal, Amber-500 Safety Gold).
4. Run 'npm run build' before ending your task to guarantee zero type errors.
```

## 2. Product Addition Prompt Template

```text
Please add a new KingLift machine to the catalog:
- Model Name: [e.g. KingLift Heavy-Duty Rough Terrain Scissor Lift]
- Model Number: [e.g. KL-SC32RT]
- Category: [scissor-lifts]
- Capacity: [e.g. 1000 lbs]
- Lift Height: [e.g. 32 ft / 384 in]
- Power: [48V Lithium-Ion or Diesel]
- MSRP: [e.g. $18,900]

Instructions:
1. Add entry to src/data/products.ts conforming to Product interface in src/types/index.ts.
2. Create vault/02 - Products/KL-SC32RT.md note with complete specs table.
3. Test locally and verify `npm run build` succeeds.
```
