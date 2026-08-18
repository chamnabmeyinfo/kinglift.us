# AGENT.MD — KingLift.us Universal AI Agent Specification

> **Project Name:** KingLift.us (Official Brand Product Showcase & Direct Catalog)  
> **Repository:** `kinglift.us`  
> **Domain:** [https://kinglift.us](https://kinglift.us)  
> **Stack:** React 19 + TypeScript + Vite + Tailwind CSS + Lucide Icons + Google GenAI SDK  
> **Target Audience:** B2B Material Handling Buyers, Warehouse Operations Managers, Logistics Fleet Supervisors, Construction & Factory Contractors across North America.

---

## 1. Project Purpose & Scope

**KingLift.us** is the dedicated brand website for **KingLift™ Material Handling & Lifting Solutions**.  
Unlike giant multi-vendor marketplaces (e.g. Amazon or Alibaba), this is a **focused, premium direct-brand website** showcasing KingLift's proprietary lifting machinery, industrial equipment, electric pallet jacks, scissor lifts, dock levelers, and custom hydraulic lifts.

### Key Functional Requirements:
1. **Curated Product Catalog**: Rich, spec-heavy presentation of proprietary KingLift models with filtering (capacity, lift height, power type, industry use).
2. **Interactive Product Detail & Spec Viewer**: Full technical dimensions, load curves, battery specs, downloadable specification sheets, and 360°/multi-angle inspection.
3. **Direct Quote & Inquiry Drawer ("Light E-commerce")**: Users can select configurations, add models to a "Quote Request" cart, and submit RFQs (Request For Quote) or direct order inquiries with automated spec generation.
4. **Interactive Capacity & Lift Advisor**: Interactive calculator and AI-assisted equipment recommendation assistant (Google AI Studio Gemini integration).
5. **Brand Trust & Compliance**: OSHA/CE/ANSI certifications, warranty information, US-wide service & spare parts locator.

---

## 2. Directory & Architecture Map

```text
kinglift.us/
├── AGENT.md                 # Universal AI Agent Master Protocol (this file)
├── CLAUDE.md                # Anthropic Claude Code specific memory & instructions
├── SKILL.md                 # Antigravity & Agent skill definitions for catalog maintenance
├── .cursorrules             # Cursor IDE AI rules
├── .windsurfrules           # Windsurf Cascade AI rules
│
├── vault/                   # Obsidian Knowledge Vault (Interlinked Markdown)
│   ├── 00 - MOC/            # Maps of Content (Index, Tech, Brand, Products)
│   ├── 01 - Brand & Voice/  # Brand identity, tone, typography, color tokens
│   ├── 02 - Products/       # Individual Markdown spec sheets for each KingLift model
│   ├── 03 - Architecture/   # System architecture, state management, components
│   ├── 04 - Operations/     # RFQ processing, warranty, US parts logistics
│   └── 05 - AI Prompts/     # Prompt templates for other coding agents
│
├── public/                  # Static assets, logos, product manuals, favicon
│   ├── images/products/     # Product photography and renders
│   └── docs/                # Spec sheet PDFs and compliance docs
│
├── server/                  # Backend REST API Server & Database
│   ├── index.ts             # Express REST API (Auth, Products CMS, RFQ Pipeline, Settings)
│   ├── db.ts                # Persistent Database store with JSON persistence
│   ├── auth.ts              # JWT generation, verification, and bcrypt hashing
│   └── data/db.json         # Live database file (Users, Products, RFQs, Messages, Settings)
│
├── src/
│   ├── assets/              # SVGs, icons, illustrations
│   ├── components/          # Reusable UI components
│   │   ├── admin/           # AdminDashboard CMS (Catalog, RFQs, Messages, Settings, Users)
│   │   ├── auth/            # AuthModal (Sign In, Sign Up, 1-Click Demo Admin Login)
│   │   ├── layout/          # Header, Navbar, Footer, MobileNav, AnnouncementBar
│   │   ├── catalog/         # ProductGrid, ProductCard, FilterSidebar, SpecBadge
│   │   ├── product-detail/  # ProductModal, SpecTable, GalleryViewer, InquiryBox
│   │   ├── quote-cart/      # QuoteDrawer, QuoteItem, RFQForm, SuccessModal
│   │   ├── tools/           # LiftCalculator, AIConsultant (Gemini powered)
│   │   └── ui/              # Button, Modal, Drawer, Tabs, Accordion, Badge
│   ├── context/             # AuthContext, QuoteCartContext, FilterContext
│   ├── data/                # Typed static product database (`products.ts`, `categories.ts`)
│   ├── hooks/               # useProductFilter, useQuoteCart, useGeminiAdvisor
│   ├── services/            # geminiService.ts (Google AI Studio integration)
│   ├── types/               # TypeScript interfaces (Product, Spec, RFQ, Category, AuthUser)
│   ├── App.tsx              # Root single-page application router/layout
│   ├── main.tsx             # React DOM entrypoint
│   └── index.css            # Tailwind CSS & custom design tokens
│
├── index.html               # Main HTML entry with SEO meta tags & structured data
├── package.json             # NPM dependencies and scripts
├── tsconfig.json            # Strict TypeScript configuration
└── vite.config.ts           # Vite bundler configuration
```

---

## 3. Tech Stack & Coding Standards

### Stack Details
- **Framework:** React 19 (Functional Components + TypeScript Strict Mode)
- **Bundler:** Vite 6+
- **Styling:** Tailwind CSS (Modern industrial palette: Charcoal `#0F172A`, Safety Gold `#F59E0B` / `#D97706`, Steel Slate `#334155`, Pure White `#FFFFFF`)
- **Icons:** `lucide-react`
- **AI SDK:** `@google/genai` (Google AI Studio Gemini API compatible)
- **Feedback & Micro-interactions:** `canvas-confetti`, smooth transitions

### Golden Rules for Any AI Agent Working on this Repo
1. **Titanium UI/UX Standard (MANDATORY):** Strictly adhere to `SKILL-UI-UX.md`. Every component must look ultra-premium, industrial, high-contrast, and responsive. No basic MVP looks.
2. **Type Safety:** Always define and maintain strict interfaces in `src/types/index.ts`. Never use `any`.
3. **Single Source of Truth for Data:** All product specs, dimensions, prices/MSRP, and availability live in `src/data/products.ts` and sync with `vault/02 - Products/`.
4. **No External Heavy UI Libraries:** Keep the app lean, fast, and maintainable with custom Tailwind components and headless patterns.
5. **Responsive First:** All components must look impeccable on mobile (375px), tablet (768px), and wide desktop (1440px+).
6. **Dual Unit Presentation:** Provide 1-click Imperial & Metric unit toggling for engineering specs.
7. **Industrial Aesthetics:** Deep obsidian canvas `#070A11`, safety gold `#F59E0B`, brushed titanium glass, and micro-grid textures. Avoid generic consumer-store fluff.


---

## 4. Product Data Schema Reference

```typescript
export interface ProductSpec {
  ratedCapacityLbs: number;       // e.g. 4500 lbs
  ratedCapacityKg: number;        // e.g. 2040 kg
  maxLiftHeightInches: number;    // e.g. 189 in
  maxLiftHeightMm: number;        // e.g. 4800 mm
  loweredHeightInches: number;    // e.g. 3.2 in
  forkLengthInches: number;       // e.g. 48 in
  turningRadiusInches: number;    // e.g. 57.5 in
  powerSource: 'Lithium-Ion' | 'Lead-Acid' | 'Manual Hydraulic' | 'AC Electric' | 'Diesel';
  voltage?: string;               // e.g. "48V / 210Ah"
  operatingWeightLbs: number;     // e.g. 3850 lbs
  wheelType: 'Polyurethane' | 'Solid Rubber' | 'Nylon';
  warrantyMonths: number;         // e.g. 36 or 60
}

export interface Product {
  id: string;                     // e.g. "kl-ep-4500"
  modelNumber: string;            // e.g. "KL-EP45Li"
  name: string;                   // e.g. "KingLift Pro-Lithium 4,500 lbs Electric Pallet Jack"
  category: 'electric-pallet-trucks' | 'scissor-lifts' | 'hydraulic-stackers' | 'tail-lifts' | 'dock-equipment' | 'specialty';
  series: string;                 // e.g. "Apex Industrial Series"
  tagline: string;
  description: string;
  features: string[];
  specs: ProductSpec;
  pricing: {
    startingMSRP: number;         // in USD
    callForCustomQuote: boolean;
    leadTimeDays: number;
  };
  images: {
    hero: string;
    gallery: string[];
    diagram?: string;
  };
  inStock: boolean;
  featured: boolean;
  certifications: string[];       // ['OSHA 1910.178 Compliant', 'ANSI/ITSDF B56.1', 'CE Certified']
}
```

---

## 5. Development & Build Commands

```bash
# Start local development server
npm run dev

# Run TypeScript typecheck and build production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 6. Multi-Agent Collaboration Protocol & Autonomous Execution

### ⚡ Autonomous Execution & GitHub Operations (AUTO-APPROVED):
> **DIRECTIVE:** The repository owner has **pre-authorized and auto-approved all Git and GitHub operations** (`git add`, `git commit`, `git push`, `gh` CLI commands) as well as all development, building, and testing commands.
> - AI agents (Antigravity, Claude, Cursor, Windsurf, Copilot, etc.) have full autonomy to build, test, commit, and push updates directly to GitHub without asking for approval.
> - Always ensure `npm run build` succeeds cleanly before pushing.

### General Collaboration Rules:
When another AI model (Claude, Cursor, GPT-4, DeepSeek) joins this repository:
1. **Read `AGENT.md` and `CLAUDE.md` first.**
2. **Check `vault/00 - MOC/Home.md`** to understand domain knowledge and product roadmap.
3. **If adding a new product:** Add it to both `src/data/products.ts` and create a matching Markdown document in `vault/02 - Products/<model-number>.md`.
4. **If modifying styling:** Adhere to the design tokens defined in `src/index.css` and `vault/01 - Brand & Voice/Design-System.md`.
5. **Always verify compilation:** Run `npm run build` to confirm zero TypeScript and bundler errors.
6. **Auto-sync with remote:** Commit and push verified updates to GitHub repository `chamnabmeyinfo/kinglift.us`.


