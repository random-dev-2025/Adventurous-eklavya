# Adventurous Eklavya

A magical, interactive personal website for Eklavya - a 7-year-old curious explorer! Built with modern web technologies and filled with delightful animations.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Framer Motion** - Smooth animations and micro-interactions

## Features

- Animated SVG avatar with 8 unique poses (waving, traveling, cricket, singing, dancing, skating, acting, explorer)
- Floating decorative elements (clouds, stars, paper planes, compass, cricket balls)
- Interactive hobby cards with custom SVG icons and hover animations
- Passport stamp-styled travel section with animated plane route
- Superpower badge system with star ratings
- Adventure gallery scrapbook with animated scenes
- Playful loading screen with compass animation
- Responsive navigation with mobile menu
- Scroll-triggered reveal animations throughout
- Blue-and-white visual identity with premium kid-friendly design

## Sections

1. **Hero** - Large animated avatar, floating elements, sparkle trail
2. **Who Am I** - Introduction with trait bubbles
3. **What I Love** - Interactive activity cards
4. **Superpowers** - Skill badges with star ratings
5. **Countries I Have Visited** - Passport stamp design
6. **Adventure Gallery** - Illustrated activity scrapbook
7. **Fun Facts** - Fun fact cards
8. **Footer** - Warm closing with avatar

## Getting Started

### Prerequisites

- Node.js 20+ installed

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
  app/
    layout.tsx       - Root layout with Nunito font
    page.tsx         - Main page composing all sections
    globals.css      - Global styles and Tailwind config
  components/
    Avatar.tsx       - SVG avatar with 8 pose variants
    FloatingElements.tsx - Reusable animated decorative elements
    SectionWrapper.tsx   - Shared section layout and title
    Navigation.tsx   - Responsive nav with scroll detection
    Hero.tsx         - Hero section with floating elements
    WhoAmI.tsx       - About section with trait cards
    WhatILove.tsx    - Activities section with interactive cards
    Superpowers.tsx  - Skills badge section
    Countries.tsx    - Travel passport stamp section
    Gallery.tsx      - Adventure scrapbook gallery
    FunFacts.tsx     - Fun fact cards
    Footer.tsx       - Site footer
    LoadingScreen.tsx - Themed loading animation
```

## Deployment

Deploy to Vercel, Netlify, or any platform that supports Next.js.
