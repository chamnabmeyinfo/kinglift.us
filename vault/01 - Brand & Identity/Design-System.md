---
title: Design System Tokens & Guidelines
tags:
  - design
  - tokens
  - css
---

# 🎨 KingLift Design System Tokens

## Colors
```css
:root {
  --bg-primary: #0b0f19;       /* Deep obsidian charcoal */
  --bg-surface: #111827;       /* Card background */
  --bg-surface-elevated: #1f2937;
  --border-subtle: #374151;    /* Steel borders */
  
  --accent-gold: #f59e0b;      /* Safety Gold Amber-500 */
  --accent-gold-hover: #d97706;/* Amber-600 */
  --accent-gold-light: #fef3c7;
  
  --text-main: #f8fafc;        /* Slate-50 */
  --text-muted: #94a3b8;       /* Slate-400 */
  --text-inverse: #0f172a;
}
```

## Button Standards
1. **Primary Action (CTA / Request Quote)**:
   - `bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-lg shadow-lg shadow-amber-500/20 transition-all active:scale-[0.98]`
2. **Secondary Action (Spec Sheet / Calculator)**:
   - `bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 font-medium px-5 py-2.5 rounded-lg transition-all`
3. **Ghost / Tertiary Action**:
   - `text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 font-semibold px-4 py-2 rounded-lg inline-flex items-center gap-1.5`
