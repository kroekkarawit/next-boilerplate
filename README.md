# Next.js Boilerplate

A modern, feature-rich boilerplate for Next.js applications with TypeScript, authentication, internationalization, and more.

## Features

- 🚀 **Next.js 14** with App Router
- 💨 **TypeScript** for type safety
- 🔐 **NextAuth.js** for authentication (Google, Line)
- 🌐 **i18n** support with react-i18next
- 💅 **Tailwind CSS** with custom configuration
- 🎨 **Shadcn/ui** components
- 💳 **Stripe** integration for payments
- 📦 **MongoDB** with Prisma ORM
- ☁️ **Cloudflare R2** for file storage
- 🐳 **Docker** support
- 🔄 **GitHub Actions** for CI/CD
- ⚡ **Redis** for caching
- 📱 **Responsive** design

## Prerequisites

- Node.js 22.x
- MongoDB database
- Cloudflare R2 bucket
- Redis (optional)
- Stripe account (optional)

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/kroekkarawit/next-boilerplate.git
cd next-boilerplate
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update the following variables in `.env.local`:
```env
# Authentication
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
LINE_CLIENT_ID=
LINE_CLIENT_SECRET=

# Database
MONGODB_URI=

# Storage
R2_BUCKET_NAME=
R2_ENDPOINT=
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

5. Generate Prisma client:
```bash
npm run prisma-generate
```

6. Run the development server:
```bash
npm run dev
```

## Project Structure

```
├── app/                  # App router pages
├── components/          # React components
├── config/             # Configuration files
├── lib/                # Utility functions
├── prisma/            # Database schema and migrations
├── providers/         # React context providers
├── public/            # Static assets
└── i18n/              # Internationalization files
```

## Available Scripts

```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint          # Run ESLint
npm run prisma-push    # Push database schema changes
npm run prisma-pull    # Pull database schema
```

## Docker Deployment

1. Build the Docker image:
```bash
docker-compose build
```

2. Run the container:
```bash
docker-compose up -d
```

## Environment Variables

See `.env.example` for all required environment variables.

## Authentication

This boilerplate includes NextAuth.js with the following providers:
- Google
- Line

To add more providers, modify `lib/auth.ts`.

## Database

Uses Prisma ORM with MongoDB. The schema is defined in `prisma/schema.prisma`.

## File Storage

Uses Cloudflare R2 for file storage. Configure bucket settings in your R2 dashboard.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, raise an issue in the repository.