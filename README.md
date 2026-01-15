# Blue Horizon Tours - Karakalpakstan Travel

A modern tourism website for exploring the unique destinations of Karakalpakstan, including Nukus, the Aral Sea region, and ancient cultural sites.

## Project Overview

This is a React-based tourism website that showcases tours and destinations in Karakalpakstan, allowing users to browse and book travel packages to discover this fascinating autonomous republic.

## Key Destinations

- **Nukus** - Capital city with the world-famous Savitsky Museum
- **Aral Sea** - The vanishing sea and its ecological story
- **Mizdakhan** - Ancient necropolis with 2000 years of history
- **Muynak** - Former fishing port with the ship graveyard

## Technologies Used

- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui components
- React Router for navigation
- React Query for data fetching

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd blue-horizon-tours
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── contexts/      # React contexts
├── services/      # API services
├── types/         # TypeScript type definitions
├── hooks/         # Custom React hooks
└── lib/           # Utility functions
```

## Features

- Browse available tours in Karakalpakstan
- View detailed tour information
- Book tours with contact information
- Multi-language support (Uzbek, Russian, English, Karakalpak)
- Responsive design
- Admin panel for tour management

## Backend Integration

This frontend connects to a Node.js/Express backend with the following endpoints:
- `GET /turs` - Get all tours
- `GET /turs/:id` - Get single tour
- `POST /bookings` - Create booking

## Deployment

Build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## About Karakalpakstan

Karakalpakstan is an autonomous republic within Uzbekistan, known for:
- The Aral Sea ecological disaster and recovery efforts
- Rich Karakalpak culture and traditions
- The Savitsky Museum with world-class art collections
- Ancient archaeological sites like Mizdakhan
- Unique desert and steppe landscapes
