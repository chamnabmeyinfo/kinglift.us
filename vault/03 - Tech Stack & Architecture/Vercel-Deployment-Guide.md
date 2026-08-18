---
title: Vercel Deployment & Domain Configuration Guide
tags:
  - vercel
  - deployment
  - dns
  - domain
---

# 🚀 KingLift.us Vercel Deployment Guide

Deploying KingLift.us to Vercel is 100% automated with zero extra server maintenance required.

---

## 1. Automated Repository Import on Vercel
1. Log in to [Vercel Dashboard](https://vercel.com).
2. Click **"Add New..."** ➔ **"Project"**.
3. Select and import your GitHub repository: `chamnabmeyinfo/kinglift.us`.
4. Vercel automatically detects the **Vite Framework Preset**.

---

## 2. Build & Output Settings (Auto-Configured in `vercel.json`)
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

---

## 3. Required Environment Variables
In **Project Settings ➔ Environment Variables**, add the following:

| Variable Name | Description | Example Value |
|---|---|---|
| `JWT_SECRET` | Secure key for signing JWT login tokens | `kinglift_industrial_secret_2026` |
| `GEMINI_API_KEY` | Google AI Studio Gemini API Key for Backend Agent | `AIzaSy...` |
| `VITE_GEMINI_API_KEY` | Client-side fallback for AI Consultant | `AIzaSy...` |

---

## 4. Connecting Custom Domain (`kinglift.us`)
1. In Vercel Project Dashboard, navigate to **Settings ➔ Domains**.
2. Enter `kinglift.us` and `www.kinglift.us`.
3. In your Domain Registrar DNS manager (Namecheap, GoDaddy, Cloudflare, Google Domains):
   - **A Record**: `@` points to `76.76.21.21`
   - **CNAME Record**: `www` points to `cname.vercel-dns.com`
4. Vercel will automatically provision a **free automatic SSL certificate**.
