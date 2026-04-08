# Narendar Reddy — Portfolio

A top 1% developer portfolio built with React, Vite, Tailwind CSS, and Framer Motion.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## 🛠 Tech Stack

- **React 18** + **TypeScript**
- **Vite** — ultra-fast dev server & bundler
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — smooth animations & transitions

## ✨ Features

- Animated hero with typewriter effect & particle canvas
- Smooth scroll navigation with active section tracking
- Project cards with hover state, filter tabs, live/GitHub links
- Animated skill bars with category switching
- Timeline experience section
- Polished contact form with validation
- Lazy-loaded sections for performance
- Fully responsive (mobile-first)
- Dark theme by default (premium look)

## 📁 Structure

```
src/
├── components/
│   ├── layout/        # Navigation, Footer
│   ├── sections/      # Hero, About, Experience, Projects, Skills, Contact
│   └── ui/            # SectionHeader (shared)
├── data/              # portfolio.ts — all your content here
├── hooks/             # useTypewriter, useScrollProgress
└── utils/             # cn() helper
```

## ✏️ Customization

All content lives in **`src/data/portfolio.ts`** — update your name, bio, projects, skills, and links there.

## 📦 Build

```bash
npm run build
npm run preview
```

## 🌐 Deploy

Works out of the box on **Vercel** or **Netlify**. Just connect your repo.
