---
title: Backend API & Authentication Architecture
tags:
  - backend
  - auth
  - express
  - jwt
---

# 🛡️ Backend Control Center & Authentication System

KingLift.us is powered by a high-performance Express REST API backend and file-backed database layer.

## 1. Authentication Endpoints (`/api/auth`)
- `POST /api/auth/signup`: User registration restricted to authorized enterprise whitelist.
- `POST /api/auth/login`: Issue secure JWT tokens (7-day validity) for authorized accounts.
- `POST /api/auth/google`: 1-Click Google OAuth sign in for whitelisted enterprise accounts.
- `GET /api/auth/me`: Authenticated profile verification.
- `GET /api/auth/users`: List all registered commercial and admin users (Admin only).

## 2. Authorized Enterprise Domains & Whitelist Rules
Only the following accounts/domains are permitted to Sign Up, Log In, or authenticate with Google:
1. **`@kinglift.us`** (All company emails)
2. **`@s3vtgroup.com.kh`** (All partner enterprise emails)
3. **`chamnabmey.info@gmail.com`** (Master Owner)

Unauthorized domains (e.g. `@gmail.com`, `@yahoo.com`, `@hotmail.com`) are automatically rejected with HTTP 403 Forbidden.

## 3. Product Catalog Management (`/api/products`)
- `GET /api/products`: Public machinery list.
- `POST /api/products`: Add new machinery model (Admin only).
- `PUT /api/products/:id`: Update price, specs, load capacity, in-stock status (Admin only).
- `DELETE /api/products/:id`: Remove machine from live catalog (Admin only).

## 4. RFQ Pipeline & Order Quotes (`/api/rfqs`)
- `GET /api/rfqs`: View incoming quote requests with freight and zip code details.
- `POST /api/rfqs`: Public/User quote submissions.
- `PATCH /api/rfqs/:id`: Update status (`new`, `in-review`, `quote-sent`, `approved`, `closed`) and internal sales notes.

## 5. Contact Inquiries (`/api/messages`)
- `GET /api/messages`: View customer questions from contact form.
- `POST /api/messages`: Submit inquiry.
- `PATCH /api/messages/:id`: Mark read/replied.

## 6. Site Settings & Analytics (`/api/settings`, `/api/stats`)
- `GET /api/stats`: Real-time KPI stats (active products, pipeline revenue, unread leads).
- `PUT /api/settings`: Update toll-free numbers, banner text, and US distribution hubs.
