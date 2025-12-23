# bouquets.by.tanya - E-commerce Website

A production-ready e-commerce website for artificial flower bouquets, built with Next.js 14, TypeScript, and Stripe payment integration.

## 🌟 Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Secure Payments**: Stripe Checkout with support for cards, Apple Pay, Google Pay
- **Cart Management**: Persistent cart with localStorage synchronization
- **Responsive Design**: Mobile-first, fully responsive UI
- **SEO Optimized**: Proper meta tags, semantic HTML, optimized images
- **Type Safety**: Full TypeScript implementation
- **Production Ready**: Security headers, error handling, input validation

## 📦 Project Structure

```
bouquets.by.tanya/
├── app/
│   ├── api/
│   │   ├── checkout/          # Stripe checkout session creation
│   │   └── webhooks/
│   │       └── stripe/        # Stripe webhook handler
│   ├── about/                 # About page
│   ├── cart/                  # Shopping cart page
│   ├── checkout/              # Checkout page
│   ├── contact/               # Contact page
│   ├── privacy/               # Privacy policy
│   ├── products/              # Product listing & detail pages
│   ├── success/               # Order success page
│   ├── terms/                 # Terms of service
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout with providers
│   └── page.tsx               # Home page
├── components/
│   ├── ui/
│   │   ├── Button.tsx         # Reusable button component
│   │   └── Input.tsx          # Reusable input component
│   ├── Footer.tsx             # Site footer
│   ├── Header.tsx             # Navigation header
│   └── ProductCard.tsx        # Product card component
├── contexts/
│   └── CartContext.tsx        # Shopping cart state management
├── lib/
│   ├── products.ts            # Product database and queries
│   ├── stripe.ts              # Stripe configuration
│   ├── types.ts               # TypeScript type definitions
│   ├── utils.ts               # Utility functions
│   └── validations.ts         # Zod validation schemas
├── public/
│   └── tanq/                  # Product images and videos
├── .env.example               # Environment variables template
├── .env.local                 # Local environment variables (git-ignored)
└── next.config.ts             # Next.js configuration

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Stripe account (for payment processing)
- Git (for version control)

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd C:\Users\Gamer\Desktop\bouquets.by.tanya
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local`:
   ```bash
   copy .env.example .env.local
   ```

   Edit `.env.local` and add your Stripe keys:
   ```env
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   STRIPE_SECRET_KEY=sk_test_your_test_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

4. **Get Stripe API Keys**
   
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
   - Copy your **Test mode** keys:
     - Secret key → `STRIPE_SECRET_KEY`
     - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

5. **Set up Stripe Webhooks (for local development)**

   Install Stripe CLI:
   ```bash
   # Download from https://stripe.com/docs/stripe-cli
   ```

   Start webhook forwarding:
   ```bash
   stripe login
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

   Copy the webhook signing secret to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Testing Payments

Use Stripe test cards:
- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- Any future expiry date, any CVC, any postal code

## 🏗️ Building for Production

```bash
npm run build
npm start
```

## 📤 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard:
     - `NEXT_PUBLIC_APP_URL` → Your production URL
     - `STRIPE_SECRET_KEY` → Your **live** Stripe secret key
     - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → Your **live** Stripe publishable key
     - `STRIPE_WEBHOOK_SECRET` → Your production webhook secret

3. **Set up Production Webhook**
   - Go to [Stripe Webhooks](https://dashboard.stripe.com/webhooks)
   - Click "Add endpoint"
   - Enter your production URL: `https://your-domain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `payment_intent.succeeded`
   - Copy the webhook signing secret to Vercel environment variables

### Other Platforms

- **Netlify**: Similar to Vercel, supports Next.js
- **Railway**: Good for Next.js with database
- **VPS/Cloud**: Use `npm run build` and `npm start`

## 🔒 Security Checklist

Before going live:

- [ ] Replace all test Stripe keys with **live** keys
- [ ] Set up production webhook endpoint
- [ ] Enable HTTPS (automatic with Vercel/Netlify)
- [ ] Review and update Privacy Policy and Terms
- [ ] Test all payment flows
- [ ] Set up error monitoring (e.g., Sentry)
- [ ] Configure email notifications for orders
- [ ] Review security headers in `next.config.ts`
- [ ] Add rate limiting to API routes
- [ ] Set up database backup strategy
- [ ] Configure domain and DNS
- [ ] Test on multiple devices and browsers

## 🔐 Environment Variables

### Required for Development
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Required for Production
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 📊 Order Management

Currently, orders are saved as JSON files in `data/orders/` directory. For production, consider:

1. **Database Migration** (Recommended)
   - PostgreSQL with Prisma
   - MongoDB with Mongoose
   - Firebase Firestore

2. **Admin Dashboard**
   - Build a separate admin panel
   - Or use Stripe Dashboard for order management

## 🎨 Customization

### Adding Products
Edit `lib/products.ts` and add to the `PRODUCTS` array:
```typescript
{
  id: 'prod_xxx',
  name: 'Product Name',
  slug: 'product-slug',
  description: 'Description...',
  price: 9900, // in cents (99.00 BGN)
  currency: 'bgn',
  images: ['/tanq/image.jpg'],
  videos: ['/tanq/video.mp4'],
  category: 'roses',
  inStock: true,
  featured: true
}
```

### Styling
- Tailwind CSS classes are used throughout
- Theme colors can be adjusted in `tailwind.config.ts`
- Primary color: Rose/Pink (`rose-600`)

### Tax Rate
Default VAT is 20%. Change in `lib/utils.ts`:
```typescript
export function calculateTax(subtotal: number, taxRate: number = 0.20)
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Payments**: Stripe
- **Validation**: Zod
- **Icons**: Lucide React
- **State Management**: React Context API

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
```

## 🐛 Troubleshooting

### Stripe webhook not working
- Ensure Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- Check webhook secret matches in `.env.local`
- Check logs in terminal

### Images not loading
- Ensure images are in `public/tanq/` folder
- Check image paths in `lib/products.ts`
- Verify Next.js image optimization is working

### Build errors
- Run `npm install` to ensure all dependencies are installed
- Check TypeScript errors: `npx tsc --noEmit`
- Clear `.next` folder: `rm -rf .next` and rebuild

## 📞 Support

For issues or questions:
- Email: info@bouquetsbytanya.bg
- Phone: +359 886 611 719

## 📄 License

Private - All rights reserved © 2025 bouquets.by.tanya

---

**Production Deployment Date**: _Not yet deployed_
**Last Updated**: December 21, 2025

