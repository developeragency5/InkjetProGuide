# InkjetProGuide - E-Commerce Platform

## Overview

InkjetProGuide is a full-stack e-commerce web application specializing in HP inkjet printers. The platform provides a complete online shopping experience with product browsing, cart management, wishlist functionality, user authentication, and order processing. Built with modern web technologies, it features a responsive design inspired by leading electronics retailers like Best Buy and B&H Photo.

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
- Custom query client with credential-based authentication
- Optimistic updates and cache invalidation patterns
- Form state managed via React Hook Form with Zod validation

**Styling Approach**
- Custom CSS variables for theming (light/dark mode support)
- Design tokens for colors, spacing, and typography
- Hover and active state elevation effects using custom CSS classes
- Responsive design with mobile-first breakpoints

### Backend Architecture

**Server Framework**
- Express.js for HTTP server and API routing
- TypeScript with ES modules
- Custom middleware for request logging and JSON parsing
- Session-based authentication using express-session

**Authentication System**
- Passport.js with LocalStrategy for email/password authentication
- BCrypt for password hashing
- In-memory session store (MemoryStore) for development
- Session cookies with configurable security settings
- User model includes id, email, password, name, and timestamps

**API Design**
- RESTful endpoints organized by resource type
- Consistent error handling and response formatting
- Authentication middleware protecting private routes
- Request body validation using Zod schemas

### Data Layer

**Database**
- PostgreSQL via Neon serverless driver
- WebSocket-based connection pooling
- Drizzle ORM for type-safe database operations
- Schema-first approach with automatic TypeScript type generation

**Database Schema**
The application uses the following core tables:
- **users**: User accounts with authentication credentials
- **products**: Product catalog with pricing, images, specifications, and inventory
- **cartItems**: Shopping cart entries linked to users and products
- **wishlistItems**: User wishlist entries
- **orders**: Order records with shipping and payment information
- **orderItems**: Individual items within orders

**Data Access Pattern**
- Storage abstraction layer (`IStorage` interface) for database operations
- Repository pattern separating business logic from data access
- Drizzle relations for efficient joins and eager loading
- UUID primary keys using PostgreSQL's `gen_random_uuid()`

### External Dependencies

**Third-Party Services**
- Stripe integration for payment processing (React Stripe.js and Stripe.js libraries included)
- Google Fonts CDN for typography (DM Sans, Architects Daughter, Fira Code, Geist Mono)
- Neon PostgreSQL for serverless database hosting

**Development Tools**
- Replit-specific plugins for runtime error overlay, cartographer, and dev banner
- Drizzle Kit for database migrations and schema management
- ESBuild for server-side bundling in production

**Key Libraries**
- `bcryptjs`: Password hashing
- `connect-pg-simple`: PostgreSQL session store (imported but not actively used)
- `date-fns`: Date formatting utilities
- `nanoid`: Unique ID generation
- `zod`: Runtime schema validation
- Multiple Radix UI primitives for accessible components

### Build & Deployment

**Development Workflow**
- `npm run dev`: Runs development server with hot module replacement
- `npm run check`: TypeScript type checking
- `npm run db:push`: Push database schema changes via Drizzle

**Production Build**
- Client-side: Vite builds to `dist/public`
- Server-side: ESBuild bundles Express server to `dist/index.js`
- Both builds configured for ES modules
- Static asset serving from build output directory

**Environment Configuration**
- `DATABASE_URL`: PostgreSQL connection string (required)
- `SESSION_SECRET`: Session encryption key (defaults provided for development)
- `NODE_ENV`: Environment flag for production/development modes