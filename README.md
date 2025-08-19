# Next.js SaaS Starter

This is a starter template for building a SaaS application using **Next.js** with support for authentication, Stripe integration for payments, and a dashboard for logged-in users.

**Demo: [https://next-saas-start.vercel.app/](https://next-saas-start.vercel.app/)**

## 🚀 Production Ready

This template is optimized for production deployment with:
- ✅ Security headers and CORS configuration
- ✅ Rate limiting for API endpoints
- ✅ Input sanitization and XSS protection
- ✅ Error boundaries and comprehensive error handling
- ✅ SEO optimization with meta tags and sitemap
- ✅ Performance optimizations and code splitting
- ✅ Accessibility improvements
- ✅ Health check endpoint for monitoring

## Features

- Marketing landing page (`/`) with animated Terminal element
- Pricing page (`/pricing`) which connects to Stripe Checkout
- Dashboard pages with CRUD operations on users/teams
- Basic RBAC with Owner and Member roles
- Subscription management with Stripe Customer Portal
- Email/password authentication with JWTs stored to cookies
- Global middleware to protect logged-in routes
- Local middleware to protect Server Actions or validate Zod schemas
- Activity logging system for any user events

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- **Payments**: [Stripe](https://stripe.com/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
POSTGRES_URL=postgresql://username:password@localhost:5432/database_name

# Authentication
AUTH_SECRET=your-secret-key-here

# Stripe
STRIPE_SECRET_KEY=sk_test_***
STRIPE_WEBHOOK_SECRET=whsec_***

# Application
BASE_URL=http://localhost:3000
NODE_ENV=development
```

### Required Environment Variables for Production:
- `POSTGRES_URL`: Database connection string
- `AUTH_SECRET`: JWT signing secret (generate with `openssl rand -base64 32`)
- `STRIPE_SECRET_KEY`: Stripe secret key
- `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
- `BASE_URL`: Your application's base URL

## Getting Started

### Prerequisites
- Node.js 18+ and npm 8+
- PostgreSQL database
- Stripe account

```bash
git clone https://github.com/nextjs/saas-starter
cd saas-starter
npm install
```

## Running Locally

[Install](https://docs.stripe.com/stripe-cli) and log in to your Stripe account:

```bash
stripe login
```

Use the included setup script to create your `.env` file:

```bash
npm run db:setup
```

Run the database migrations and seed the database with a default user and team:

```bash
npm run db:migrate
npm run db:seed
```

This will create the following user and team:

- User: `test@test.com`
- Password: `admin123`

You can also create new users through the `/sign-up` route.

Finally, run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

You can listen for Stripe webhooks locally through their CLI to handle subscription change events:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Development Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run analyze` - Analyze bundle size
- `npm run db:setup` - Set up database and environment
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with test data
- `npm run db:studio` - Open Drizzle Studio

## Testing Payments

To test Stripe payments, use the following test card details:

- Card Number: `4242 4242 4242 4242`
- Expiration: Any future date
- CVC: Any 3-digit number

## Deployment

### DigitalOcean App Platform

1. **Build Configuration:**
   - Build Command: `npm run build`
   - Run Command: `npm start`
   - Node.js Version: 18+

2. **Environment Variables:**
   Set all required environment variables in the App Platform dashboard.

3. **Health Check:**
   Configure health check endpoint: `/api/health`

### Other Platforms

This application is compatible with:
- Vercel
- Netlify
- Railway
- Render
- AWS Amplify

## Security Features

- **Rate Limiting**: API endpoints are rate-limited to prevent abuse
- **Input Sanitization**: All user inputs are validated and sanitized
- **Security Headers**: Comprehensive security headers are set
- **CORS Protection**: Proper CORS configuration
- **XSS Protection**: HTML escaping and content security policies
- **SQL Injection Prevention**: Parameterized queries with Drizzle ORM

## Performance Optimizations

- **Code Splitting**: Automatic code splitting with Next.js
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Caching**: Proper cache headers for static assets
- **Bundle Analysis**: Built-in bundle analyzer
- **Font Optimization**: Optimized Google Fonts loading

## Monitoring and Observability

- Health check endpoint at `/api/health`
- Error boundaries for graceful error handling
- Comprehensive logging (extend for production monitoring)
- Performance monitoring ready (add your preferred service)

## Going to Production

When you're ready to deploy your SaaS application to production, follow these steps:

### Set up a production Stripe webhook

1. Go to the Stripe Dashboard and create a new webhook for your production environment.
2. Set the endpoint URL to your production API route (e.g., `https://yourdomain.com/api/stripe/webhook`).
3. Select the events you want to listen for (e.g., `checkout.session.completed`, `customer.subscription.updated`).

### Production Checklist

- [ ] Set all environment variables
- [ ] Configure production database
- [ ] Set up Stripe webhooks
- [ ] Configure domain and SSL
- [ ] Set up monitoring and logging
- [ ] Test all critical user flows
- [ ] Configure backup strategy
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure analytics (e.g., Google Analytics)
- [ ] Update robots.txt and sitemap

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Other Templates

While this template is intentionally minimal and to be used as a learning resource, there are other paid versions in the community which are more full-featured:

- https://achromatic.dev
- https://shipfa.st
- https://makerkit.dev
- https://zerotoshipped.com
- https://turbostarter.dev