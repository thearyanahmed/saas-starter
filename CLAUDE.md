# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (runs with Turbopack)
- **Build application**: `npm run build`
- **Start production server**: `npm run start`

### Database Operations

- **Setup database**: `npm run db:setup` (creates .env file with database configuration)
- **Run migrations**: `npm run db:migrate`
- **Seed database**: `npm run db:seed` (creates test user: test@test.com / admin123)
- **Generate migrations**: `npm run db:generate`
- **Open database studio**: `npm run db:studio`

**Note**: The application can start without a database connection or Stripe configuration. Features will be gracefully disabled until environment variables are configured.

### Stripe Development

- **Listen for webhooks**: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
- **Test card number**: 4242 4242 4242 4242

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT tokens in httpOnly cookies
- **Payments**: Stripe with subscriptions and webhooks
- **UI**: shadcn/ui with Radix components
- **Styling**: Tailwind CSS

### Key Directories

- **app/**: Next.js app router structure
  - **(login)/**: Authentication pages (sign-in, sign-up)
  - **(dashboard)/**: Protected dashboard pages with nested layout
  - **api/**: API routes for Stripe webhooks and data endpoints
- **lib/**: Core business logic
  - **auth/**: JWT session management and password hashing
  - **db/**: Database schema, queries, and connection
  - **payments/**: Stripe integration and subscription handling
- **components/ui/**: Reusable UI components from shadcn/ui

### Database Schema

Core entities:
- **users**: User accounts with email/password authentication
- **teams**: Multi-tenant team structure with Stripe integration
- **teamMembers**: Many-to-many relationship between users and teams
- **invitations**: Email-based team member invitations
- **activityLogs**: Audit trail for user actions

### Authentication Flow

1. JWT tokens stored in httpOnly cookies for security
2. Global middleware (`middleware.ts`) protects `/dashboard` routes
3. Session management in `lib/auth/session.ts` handles token creation/verification
4. Auto-renewal of tokens on valid requests

### Subscription Management

- Teams have Stripe customer/subscription associations
- Webhooks handle subscription changes at `/api/stripe/webhook`
- Customer portal allows users to manage subscriptions
- 14-day trial period configured by default

### Route Structure

- **Public**: `/`, `/pricing`, `/sign-in`, `/sign-up`
- **Protected**: `/dashboard/*` (requires authentication)
- **API**: `/api/stripe/*` (webhooks), `/api/user`, `/api/team`

### Environment Variables

**Required for full functionality**:
- `AUTH_SECRET`: JWT signing secret
- `BASE_URL`: Application base URL for redirects

**Optional (features disabled if missing)**:
- `POSTGRES_URL`: Database connection string - database features disabled without this
- `STRIPE_SECRET_KEY`: Stripe API key - payment features disabled without this
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret - required for subscription webhooks

### Data Fetching Patterns

- Uses SWR for client-side data fetching with server-side fallbacks
- API routes provide JSON endpoints for user and team data
- Server components use direct database queries via Drizzle

### Graceful Degradation Architecture

**Database Connection**:
- **Lazy loading**: Database connection is initialized only when first accessed
- **Error handling**: Database queries wrapped in try/catch blocks, return null on failure
- **Connection pattern**: Import `{ db }` from `@/lib/db/drizzle` and call as `db()` function

**Stripe Integration**:
- **Lazy initialization**: Stripe client created only when needed via `getStripe()` function
- **Error handling**: Payment functions redirect to pricing page with error parameter
- **Graceful fallback**: `getStripePrices()` and `getStripeProducts()` return empty arrays on failure

### Key Files for Common Tasks

- **Adding new database table**: Modify `lib/db/schema.ts`, then run `npm run db:generate` and `npm run db:migrate`
- **Authentication logic**: `lib/auth/session.ts` and `middleware.ts`
- **Stripe integration**: `lib/payments/stripe.ts` and `lib/payments/actions.ts`
- **Database queries**: `lib/db/queries.ts`
- **Activity logging**: Use `ActivityType` enum from schema for consistent logging