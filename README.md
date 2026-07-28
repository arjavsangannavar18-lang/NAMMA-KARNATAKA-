# NAMMA KARNATAKA 🇮🇳

**A real public utility platform for the people of Karnataka.**

NAMMA KARNATAKA provides trusted, accurate, and useful daily services in one place — prioritizing official government information and real-time data. No fake or placeholder data. Every feature is built for real public use.

---

## 🎯 Mission

To be the single most trusted digital companion for every Kannadiga — from farmers checking APMC prices to students looking for government jobs, from daily commuters tracking BMTC buses to tourists exploring Karnataka's heritage.

## 👥 Target Audience

- Residents of Karnataka
- Students & Job Seekers
- Farmers & Agricultural Workers
- Daily Commuters
- Tourists & Visitors
- Senior Citizens
- Anyone needing reliable Karnataka public services

## 🚀 Core Features

- 🌤 **Real-time Weather** — Powered by reliable weather APIs
- 🚌 **Public Transport** — BMTC, KSRTC & Namma Metro information
- 📰 **Karnataka News** — Aggregated from trusted news sources
- 🌾 **APMC Market Prices** — Agriculture commodity prices from official sources
- 💼 **Government Jobs** — Employment notifications and updates
- 🚨 **Emergency Contacts** — Important helplines and public services
- 🏥 **Health & Education** — Resources and information
- 🗺 **District Information** — Services and data for all Karnataka districts
- 🔔 **Push Notifications** — Real-time alerts for important updates
- 🔍 **Search** — Full-text search across the platform
- 📱 **PWA & Android APK** — Installable on mobile devices
- 📴 **Offline Support** — Core features work without internet

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Styling | Tailwind CSS |
| State Management | React Context + React Query |
| Database | PostgreSQL |
| Caching | Redis |
| PWA | Workbox + Service Workers |
| Mobile | Capacitor (Android APK) |
| CI/CD | GitHub Actions |

## 📁 Project Structure

```
namma-karnataka/
├── client/                 # React frontend (Vite + PWA)
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page-level components
│   │   ├── services/       # API service layer
│   │   ├── hooks/          # Custom React hooks
│   │   ├── context/        # React Context providers
│   │   ├── utils/          # Utility functions
│   │   └── assets/         # Static assets
│   └── vite.config.js
├── server/                 # Node.js backend (Express)
│   └── src/
│       ├── routes/         # API route definitions
│       ├── controllers/    # Request handlers
│       ├── services/       # Business logic & external APIs
│       ├── middleware/     # Express middleware
│       ├── models/         # Database models
│       └── config/         # Configuration
└── package.json            # Root workspace scripts
```

## ⚡ Quick Start

### Prerequisites
- Node.js 18+
- npm 9+
- PostgreSQL 15+

### Installation

```bash
git clone https://github.com/arjavsangannavar18-lang/NAMMA-KARNATAKA-.git
cd NAMMA-KARNATAKA-
npm install
cd client && npm install
cd ../server && npm install
cp client/.env.example client/.env
cp server/.env.example server/.env
npm run dev
```

---

**Built with ❤️ for Karnataka**
