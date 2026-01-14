# InkjetProGuide - E-Commerce Platform

## Overview

InkjetProGuide is an e-commerce web application specializing in inkjet printers. The platform uses Ecwid (Store ID: 128774264) for all e-commerce functionality including product catalog, cart, checkout, and user accounts. The site serves as a self-service educational resource library with product browsing capabilities - it does NOT provide tech support, troubleshooting, setup help, or personalized recommendations. Only order-related inquiries are handled through Ecwid.

**Important**: This site is brand-neutral and uses NO flagged keywords like "support", "expert", "specialist", "HP", or "customer service team".

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- Single-page application (SPA) architecture with client-side routing

**UI Component System**
- Shadcn UI component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Component aliases configured for clean imports (`@/components`, `@/lib`, `@/hooks`)
- Design system based on "New York" style variant from Shadcn

**State Management & Data Fetching**
- TanStack React Query (v5) for server state management
- Form state managed via React Hook Form with Zod validation

**Styling Approach**
- Custom CSS variables for theming (light/dark mode support)
- Design tokens for colors, spacing, and typography
- Hover and active state elevation effects using custom CSS classes
- Responsive design with mobile-first breakpoints

### Backend Architecture

**Server Framework**
- Express.js for minimal HTTP server
- TypeScript with ES modules
- Serves static content and minimal API endpoints

**No Database Required**
- All e-commerce functionality handled by Ecwid
- No user authentication, cart, wishlist, or order storage
- Designed for Vercel deployment without database

### Ecwid Integration

**Store Configuration**
- Ecwid Store ID: 128774264
- Categories: Inkjet Printers, Home Printers, Office Printers
- Product URL format: `/products#!/~/product/id=[PRODUCT_ID]`

**Category URLs**
- Inkjet Printers: `/products#!/Inkjet-Printers/c/193859557`
- Home Printers: `/products#!/Home-Printers/c/193853315`
- Office Printers: `/products#!/Office-Printers/c/193855066`

**Product ID Mappings**
- Smart Tank 6001: 716949315
- Smart Tank 7301: 716949316
- ENVY Inspire 7900e: 716949317
- OfficeJet Pro 9130e: 716949318
- OfficeJet Pro 9730e: 716949319
- Color LaserJet Pro 3301fdw: 716949320
- ENVY 6055e: 716949321
- DeskJet 2855e: 716949322

### SEO Configuration

**Target Keywords**
- inkjet printer
- wireless printer
- laser printer
- photo printer

### Build & Deployment

**Development Workflow**
- `npm run dev`: Runs development server with hot module replacement
- `npm run check`: TypeScript type checking

**Production Build**
- Client-side: Vite builds to `dist/public`
- Server-side: ESBuild bundles Express server to `dist/index.js`
- Both builds configured for ES modules
- Static asset serving from build output directory

**Vercel Deployment**
- No database required
- All e-commerce via Ecwid embed
- Static site with minimal Express backend

**Environment Configuration**
- `SESSION_SECRET`: Optional session key
- `NODE_ENV`: Environment flag for production/development modes
