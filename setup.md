# Blue Horizon Tours Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   cd blue-horizon-tours
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:8080
   - Make sure your backend is running on http://localhost:9000

## Backend Requirements

Make sure your tourism backend is running with the following endpoints:
- `GET /turs` - Get all tours
- `GET /turs/:id` - Get single tour with photos and additional_info
- `POST /bookings` - Create booking
- `POST /admins/login` - Admin login
- `GET /admins/account` - Get admin account info
- `GET /bookings` - Get all bookings (admin only)
- `DELETE /turs/:id` - Delete tour (admin only)

## Features

✅ **Fixed API Integration**
- All API calls now properly handle backend response format
- Tours, bookings, and admin functions working
- Proper error handling

✅ **Removed Lovable AI Branding**
- Clean project without external dependencies
- Updated package.json and configuration
- Professional tourism website ready for deployment

✅ **Multi-language Support**
- Uzbek, Russian, English, Karakalpak
- Dynamic content based on language selection

✅ **Admin Panel**
- Tour management
- Booking management
- Secure authentication

## Project Structure

```
src/
├── components/     # UI components
├── pages/         # Page components
├── contexts/      # React contexts (Auth, Language, Theme)
├── services/      # API service layer
├── types/         # TypeScript definitions
├── hooks/         # Custom hooks
└── lib/           # Utilities
```

## Environment Setup

The frontend is configured to connect to:
- Backend API: `http://localhost:9000`
- Frontend Dev Server: `http://localhost:8080`

If you need to change these URLs, update:
- `src/services/api.ts` for API base URL
- `src/contexts/AuthContext.tsx` for admin API calls
- `vite.config.ts` for dev server port

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.