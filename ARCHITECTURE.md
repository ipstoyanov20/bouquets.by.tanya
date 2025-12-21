# System Architecture - bouquets.by.tanya

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│                                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │   Home   │  │ Products │  │   Cart   │  │ Checkout │       │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘       │
│                                                                  │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              CartContext (React Context)               │    │
│  │         State: items[], subtotal, tax, total          │    │
│  │       Persisted: localStorage (key: bouquets_cart)    │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    NEXT.JS SERVER (App Router)                   │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                      API Routes                            │ │
│  │                                                            │ │
│  │  POST /api/checkout                                       │ │
│  │  ├─ Validate cart items (Zod)                            │ │
│  │  ├─ Verify products exist & in stock                     │ │
│  │  ├─ Create Stripe checkout session                       │ │
│  │  └─ Return session URL                                    │ │
│  │                                                            │ │
│  │  POST /api/webhooks/stripe                               │ │
│  │  ├─ Verify webhook signature                             │ │
│  │  ├─ Handle checkout.session.completed                    │ │
│  │  ├─ Extract order data                                   │ │
│  │  ├─ Save order to /data/orders/                          │ │
│  │  └─ Return success response                              │ │
│  └───────────────────────────────────────────────────────────┘ │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                    Business Logic                          │ │
│  │                                                            │ │
│  │  lib/products.ts                                          │ │
│  │  ├─ PRODUCTS[] array (11 products)                       │ │
│  │  ├─ getAllProducts()                                      │ │
│  │  ├─ getFeaturedProducts()                                │ │
│  │  ├─ getProductBySlug()                                   │ │
│  │  └─ getProductById()                                     │ │
│  │                                                            │ │
│  │  lib/stripe.ts                                            │ │
│  │  ├─ Stripe client initialization                         │ │
│  │  └─ Configuration constants                              │ │
│  │                                                            │ │
│  │  lib/utils.ts                                             │ │
│  │  ├─ formatPrice()                                         │ │
│  │  ├─ calculateTax()                                        │ │
│  │  ├─ generateOrderId()                                    │ │
│  │  └─ Validation helpers                                   │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Stripe API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      STRIPE (Payment Gateway)                    │
│                                                                  │
│  ┌───────────────────────────────────────────────────────────┐ │
│  │                 Checkout Session Flow                       │ │
│  │                                                            │ │
│  │  1. Create checkout session                               │ │
│  │     ├─ Line items from cart                               │ │
│  │     ├─ Customer email                                     │ │
│  │     ├─ Success/cancel URLs                                │ │
│  │     └─ Payment methods enabled                            │ │
│  │                                                            │ │
│  │  2. Customer redirected to Stripe                         │ │
│  │     ├─ Enter card details                                 │ │
│  │     ├─ Or use Apple Pay / Google Pay                      │ │
│  │     └─ Enter billing/shipping info                        │ │
│  │                                                            │ │
│  │  3. Payment processed                                     │ │
│  │     ├─ Card charged                                       │ │
│  │     ├─ Fraud detection                                    │ │
│  │     └─ 3D Secure if required                              │ │
│  │                                                            │ │
│  │  4. Webhook sent to server                                │ │
│  │     ├─ Event: checkout.session.completed                 │ │
│  │     ├─ Signature for verification                         │ │
│  │     └─ Full order details                                 │ │
│  │                                                            │ │
│  │  5. Redirect to success page                              │ │
│  │     └─ URL: /success?session_id=xxx                       │ │
│  └───────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Webhook POST
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA STORAGE                                │
│                                                                  │
│  File System: /data/orders/                                     │
│  ├─ ORD-xxxxx-xxxxx.json                                       │
│  ├─ ORD-xxxxx-xxxxx.json                                       │
│  └─ ORD-xxxxx-xxxxx.json                                       │
│                                                                  │
│  Each file contains:                                            │
│  {                                                              │
│    "id": "ORD-xxxxx",                                          │
│    "customer": {...},                                           │
│    "items": [...],                                             │
│    "total": 15900,                                             │
│    "status": "paid",                                           │
│    "stripeSessionId": "cs_xxx",                                │
│    "createdAt": "2025-12-21T..."                              │
│  }                                                              │
│                                                                  │
│  ⚠️  Future: Migrate to PostgreSQL/MongoDB                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow: Complete Purchase Journey

```
1. USER BROWSES PRODUCTS
   ├─ Visit /products
   ├─ View product cards
   └─ Click product → /products/[slug]

2. ADD TO CART
   ├─ Click "Add to Cart" button
   ├─ CartContext.addItem() called
   ├─ State updated: items[] += new item
   ├─ localStorage updated
   └─ Cart badge shows count

3. VIEW CART
   ├─ Click cart icon → /cart
   ├─ See all items, quantities, prices
   ├─ Can update quantities or remove items
   └─ See subtotal, tax (20%), total

4. PROCEED TO CHECKOUT
   ├─ Click "Checkout" → /checkout
   ├─ Review order summary
   └─ Click "Continue to Payment"

5. CREATE STRIPE SESSION
   ├─ POST /api/checkout
   ├─ Server validates cart items
   ├─ Server creates Stripe session
   ├─ Server returns session URL
   └─ Client redirects to Stripe

6. PAYMENT ON STRIPE
   ├─ Customer sees Stripe Checkout UI
   ├─ Enters card details
   ├─ Enters billing/shipping address
   ├─ Submits payment
   └─ Stripe processes transaction

7. PAYMENT SUCCESS
   ├─ Stripe sends webhook to /api/webhooks/stripe
   ├─ Server verifies signature
   ├─ Server extracts order data
   ├─ Server saves order to /data/orders/
   └─ Server returns 200 OK

8. USER REDIRECTED
   ├─ Stripe redirects to /success?session_id=xxx
   ├─ CartContext.clearCart() called
   ├─ localStorage cleared
   └─ Success message displayed

9. POST-PURCHASE (Manual)
   ├─ Admin checks /data/orders/ folder
   ├─ Admin processes order
   ├─ Admin ships product
   └─ (Future: automated email notifications)
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        SECURITY LAYERS                           │
└─────────────────────────────────────────────────────────────────┘

1. NETWORK SECURITY
   ├─ HTTPS enforced (via Vercel/hosting)
   ├─ Security headers (HSTS, CSP, X-Frame-Options)
   └─ Rate limiting (future: implement with Vercel Edge Config)

2. API SECURITY
   ├─ Webhook signature verification (Stripe)
   ├─ Input validation (Zod schemas)
   ├─ No CORS issues (same-origin)
   └─ Environment variables never exposed to client

3. DATA SECURITY
   ├─ No sensitive data in frontend
   ├─ Stripe handles all payment data (PCI compliant)
   ├─ No full card numbers ever stored
   └─ Customer data encrypted in transit

4. SESSION SECURITY
   ├─ Stripe sessions expire after 30 minutes
   ├─ Cart data in localStorage (client-side only)
   └─ No server-side sessions (stateless)

5. CODE SECURITY
   ├─ TypeScript for type safety
   ├─ Zod for runtime validation
   ├─ No eval() or dangerous functions
   └─ Dependencies regularly updated
```

---

## Component Hierarchy

```
App Root (layout.tsx)
├─ CartProvider (contexts/CartContext.tsx)
│  └─ Wraps entire app with cart state
│
├─ Header (components/Header.tsx)
│  ├─ Navigation links
│  ├─ Cart badge (shows item count)
│  └─ Mobile menu toggle
│
├─ Main Content (children)
│  │
│  ├─ Home Page (/)
│  │  ├─ Hero section
│  │  ├─ Features grid
│  │  ├─ Featured products (ProductCard × 6)
│  │  └─ CTA section
│  │
│  ├─ Products Page (/products)
│  │  └─ Product grid (ProductCard × 11)
│  │
│  ├─ Product Detail (/products/[slug])
│  │  ├─ Image/video gallery
│  │  ├─ Product info
│  │  ├─ Add to cart button
│  │  └─ Characteristics table
│  │
│  ├─ Cart Page (/cart)
│  │  ├─ Cart items list
│  │  ├─ Quantity controls
│  │  ├─ Order summary
│  │  └─ Checkout button
│  │
│  ├─ Checkout Page (/checkout)
│  │  ├─ Order summary
│  │  ├─ Payment info
│  │  └─ Stripe redirect button
│  │
│  ├─ Success Page (/success)
│  │  ├─ Success message
│  │  ├─ Order reference
│  │  └─ Continue shopping links
│  │
│  └─ Static Pages
│     ├─ About (/about)
│     ├─ Contact (/contact)
│     ├─ Privacy (/privacy)
│     └─ Terms (/terms)
│
└─ Footer (components/Footer.tsx)
   ├─ Brand info
   ├─ Quick links
   ├─ Contact info
   └─ Social links
```

---

## State Management

```
┌─────────────────────────────────────────────────────────────────┐
│                      CART STATE (Global)                         │
│                                                                  │
│  Context: CartContext                                           │
│  Provider: CartProvider (wraps entire app)                      │
│  Hook: useCart()                                                │
│                                                                  │
│  State:                                                         │
│  ├─ items: CartItem[]                                           │
│  ├─ subtotal: number (calculated)                              │
│  ├─ tax: number (calculated, 20%)                              │
│  ├─ total: number (calculated)                                 │
│  └─ itemCount: number (calculated)                             │
│                                                                  │
│  Actions:                                                       │
│  ├─ addItem(product: Product)                                   │
│  ├─ removeItem(productId: string)                              │
│  ├─ updateQuantity(productId: string, quantity: number)        │
│  └─ clearCart()                                                 │
│                                                                  │
│  Persistence:                                                   │
│  ├─ localStorage.setItem('bouquets_cart', JSON.stringify(...)) │
│  └─ localStorage.getItem('bouquets_cart')                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    PRODUCT DATA (Static)                         │
│                                                                  │
│  Source: lib/products.ts                                        │
│  Storage: In-memory array (PRODUCTS)                            │
│  Access: Import directly in components                          │
│                                                                  │
│  No state management needed (static data)                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    FORM STATE (Local)                            │
│                                                                  │
│  Used in: Contact page, Checkout page                           │
│  Management: React useState hooks                               │
│  Validation: Zod schemas                                        │
│  Submission: Fetch API to backend                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Schema (Future)

```sql
-- When migrating to PostgreSQL/MongoDB:

-- Products Table
CREATE TABLE products (
  id VARCHAR(50) PRIMARY KEY,
  name TEXT NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- in cents
  currency VARCHAR(3) DEFAULT 'bgn',
  images TEXT[], -- array of image URLs
  videos TEXT[], -- array of video URLs
  category VARCHAR(50),
  in_stock BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
  id VARCHAR(50) PRIMARY KEY,
  order_id VARCHAR(50) UNIQUE NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  shipping_address JSONB NOT NULL,
  subtotal INTEGER NOT NULL,
  tax INTEGER NOT NULL,
  total INTEGER NOT NULL,
  currency VARCHAR(3) DEFAULT 'bgn',
  status VARCHAR(50) DEFAULT 'pending',
  payment_intent_id VARCHAR(255),
  stripe_session_id VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id VARCHAR(50) REFERENCES orders(id),
  product_id VARCHAR(50),
  product_name TEXT NOT NULL,
  product_price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_order_items_order ON order_items(order_id);
```

---

## Deployment Architecture (Production)

```
┌─────────────────────────────────────────────────────────────────┐
│                           VERCEL CDN                             │
│                                                                  │
│  ├─ Static Assets (/_next/static/)                             │
│  ├─ Images (/public/)                                           │
│  └─ Edge Network (global)                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      VERCEL SERVERLESS                           │
│                                                                  │
│  ├─ Next.js Server (Node.js runtime)                           │
│  ├─ API Routes (serverless functions)                          │
│  ├─ SSR Pages (on-demand)                                      │
│  └─ Static Pages (pre-built)                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
┌──────────────────────────┐  ┌────────────────────────┐
│      STRIPE API          │  │   FILE SYSTEM          │
│                          │  │   (Temporary)          │
│  - Checkout Sessions     │  │                        │
│  - Payment Processing    │  │  /tmp/orders/*.json    │
│  - Webhooks              │  │                        │
└──────────────────────────┘  └────────────────────────┘
                                        │
                                        ▼
                              ┌────────────────────────┐
                              │   DATABASE (Future)    │
                              │                        │
                              │  PostgreSQL/MongoDB    │
                              │  - Orders              │
                              │  - Products            │
                              │  - Customers           │
                              └────────────────────────┘
```

---

## Environment Variables Flow

```
Development (.env.local)
├─ NEXT_PUBLIC_APP_URL=http://localhost:3000
├─ STRIPE_SECRET_KEY=sk_test_...
├─ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
└─ STRIPE_WEBHOOK_SECRET=whsec_...

Production (Vercel Dashboard)
├─ NEXT_PUBLIC_APP_URL=https://your-domain.com
├─ STRIPE_SECRET_KEY=sk_live_...  ⚠️ LIVE KEY!
├─ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...  ⚠️ LIVE KEY!
└─ STRIPE_WEBHOOK_SECRET=whsec_...  ⚠️ PRODUCTION WEBHOOK!

Build Time
├─ Next.js reads all env variables
├─ NEXT_PUBLIC_* variables are embedded in client bundle
└─ Other variables stay server-side only

Runtime
├─ Client code can only access NEXT_PUBLIC_* variables
├─ Server code (API routes) can access all variables
└─ Stripe secret keys never exposed to client
```

---

## Performance Optimization

```
1. IMAGE OPTIMIZATION
   ├─ Next.js Image component
   ├─ Automatic WebP/AVIF conversion
   ├─ Lazy loading
   └─ Responsive sizes

2. CODE SPLITTING
   ├─ Automatic per-route splitting
   ├─ Dynamic imports for heavy components
   └─ Client components separated from server

3. CACHING
   ├─ Static pages cached at CDN edge
   ├─ Static assets cached with max-age
   └─ API routes cached when possible

4. BUNDLE SIZE
   ├─ Tree shaking removes unused code
   ├─ Minification in production
   └─ Gzip/Brotli compression

5. RENDERING STRATEGY
   ├─ Static pages: Pre-rendered at build time
   ├─ Dynamic pages: Rendered on-demand
   └─ API routes: Serverless functions
```

---

## Error Handling Strategy

```
1. CLIENT-SIDE ERRORS
   ├─ User-friendly error messages
   ├─ No technical details exposed
   └─ Fallback UI for failed states

2. SERVER-SIDE ERRORS
   ├─ Try-catch blocks in all API routes
   ├─ Structured error responses
   ├─ Logging to console (future: Sentry)
   └─ Proper HTTP status codes

3. PAYMENT ERRORS
   ├─ Stripe handles payment failures gracefully
   ├─ User sees clear error message
   ├─ Can retry payment
   └─ No partial charges

4. VALIDATION ERRORS
   ├─ Zod schemas catch invalid data
   ├─ Detailed error messages
   └─ Client-side validation for UX
```

---

**Architecture Status**: ✅ Production-Ready

**Last Updated**: December 21, 2025
