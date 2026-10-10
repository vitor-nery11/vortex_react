# Vortex - Smart Healthcare Connection Platform

Vortex is a modern, responsive, mobile-first Progressive Web App (PWA) designed to connect patients with private physicians and clinics quickly, transparently, and without bureaucracy or subscription fees.

## Tech Stack

- **React 18**
- **Vite 5**
- **Tailwind CSS 3**
- **Vite PWA Plugin** (`vite-plugin-pwa` with Workbox caching strategies)
- **Lucide React** (Unified SVG iconography)
- **Canvas Confetti** (Subtle celebration micro-interactions)

## Key Features

- **Dynamic Role Selector:** Initial landing screen seamlessly divides the journey between Patients and Healthcare Providers (Doctors/Clinics).
- **Patient Journey (5-Step Card Wizard):**
  1. Personal Information & Location (with autocomplete)
  2. Medical Specialty Search & Quick tags
  3. Desired Timeframe & Consultation Modality (In-person, Telehealth, or Any)
  4. Budget & Price Range selection
  5. WhatsApp Contact & Secure Privacy agreement
  - Post-submission status tracker & WhatsApp confirmation simulation.
- **Doctor / Clinic Portal & Onboarding:**
  - Value proposition hero ("Receive new private patients without monthly fees or exclusivity")
  - Account login simulation & dashboard preview
  - 10-question pilot program enrollment form
  - Doctor management portal simulation (availability toggle, incoming request matching, consultation fee configuration).
- **Progressive Web App (PWA):**
  - Standalone mobile experience on Android (Chrome native prompt) and iOS (Safari guidance)
  - Responsive safe-area insets (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`)
  - Offline-ready caching with Service Worker
- **Header Popup Menu:**
  - Direct PWA app installation trigger
  - Interactive FAQ modal answering key questions

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Visual Identity & Design System

For complete guidelines regarding colors (`#182D50` Vortex Navy, `#ED3E1A` Vortex Orange), typography, iconography rules, and component specifications, refer to [ui-ux.md](./ui-ux.md).
