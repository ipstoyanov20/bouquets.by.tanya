# Quick Command Reference

## Development Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Type check (no compilation)
npx tsc --noEmit
```

---

## Stripe CLI Commands

```bash
# Login to Stripe
stripe login

# Forward webhooks to local development
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test webhook
stripe trigger checkout.session.completed

# View Stripe logs
stripe logs tail

# List webhook endpoints
stripe webhook_endpoints list
```

---

## Git Commands

```bash
# Initialize repository
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add remote
git remote add origin <your-repo-url>

# Push to GitHub
git push -u origin main

# Check status
git status

# View changes
git diff
```

---

## PowerShell Setup Script

```powershell
# Run automated setup
.\setup.ps1
```

---

## File Management

```bash
# Create orders directory
mkdir data\orders

# View orders
dir data\orders

# View specific order
type data\orders\ORD-xxxxx.json

# Clean Next.js cache
rmdir /s /q .next
```

---

## Environment Setup

```bash
# Copy environment template
copy .env.example .env.local

# Edit environment file (use any text editor)
notepad .env.local

# Verify environment variables are set
echo %NEXT_PUBLIC_APP_URL%
echo %STRIPE_SECRET_KEY%
```

---

## Deployment Commands (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List deployments
vercel ls

# Set environment variable
vercel env add STRIPE_SECRET_KEY production
```

---

## Useful URLs

### Development
- **Local Site**: http://localhost:3000
- **Local API**: http://localhost:3000/api/checkout
- **Local Webhook**: http://localhost:3000/api/webhooks/stripe

### Stripe Dashboard
- **Test Mode**: https://dashboard.stripe.com/test
- **Live Mode**: https://dashboard.stripe.com/
- **API Keys**: https://dashboard.stripe.com/apikeys
- **Webhooks**: https://dashboard.stripe.com/webhooks
- **Payments**: https://dashboard.stripe.com/payments
- **Test Cards**: https://stripe.com/docs/testing

### Vercel Dashboard
- **Dashboard**: https://vercel.com/dashboard
- **Projects**: https://vercel.com/dashboard/projects
- **Deployments**: https://vercel.com/dashboard/deployments
- **Settings**: https://vercel.com/dashboard/settings

---

## Testing Commands

### Test Stripe Cards
```bash
# Success
Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any valid postal code

# Decline
Card: 4000 0000 0000 0002
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any valid postal code

# Requires Authentication (3D Secure)
Card: 4000 0025 0000 3155
```

---

## Project Structure Commands

```bash
# View project structure
tree /F /A

# Count lines of code
(Get-ChildItem -Recurse -Include *.ts,*.tsx | Get-Content | Measure-Object -Line).Lines

# Find all TypeScript files
Get-ChildItem -Recurse -Include *.ts,*.tsx

# Search for text in files
findstr /s /i "stripe" *.ts *.tsx
```

---

## Troubleshooting Commands

```bash
# Clear npm cache
npm cache clean --force

# Reinstall node_modules
rmdir /s /q node_modules
npm install

# Clear Next.js cache
rmdir /s /q .next
npm run build

# Check Node version
node --version

# Check npm version
npm --version

# Check installed packages
npm list --depth=0

# Check for outdated packages
npm outdated

# Update packages
npm update
```

---

## Database Commands (Future - PostgreSQL)

```bash
# Connect to database
psql -U postgres -d bouquets

# View tables
\dt

# View table structure
\d orders

# Query orders
SELECT * FROM orders ORDER BY created_at DESC LIMIT 10;

# Count orders
SELECT COUNT(*) FROM orders;

# View orders by status
SELECT status, COUNT(*) FROM orders GROUP BY status;
```

---

## Performance Testing

```bash
# Run Lighthouse audit
npx lighthouse http://localhost:3000 --view

# Check bundle size
npm run build
# Look for .next/static/chunks/ sizes

# Analyze bundle
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

---

## Backup Commands

```bash
# Backup orders directory
xcopy data\orders data\orders_backup\ /E /I /Y

# Backup environment file
copy .env.local .env.local.backup

# Backup entire project
xcopy C:\Users\Gamer\Desktop\bouquets.by.tanya C:\Backups\bouquets.by.tanya\ /E /I /Y
```

---

## Quick Fixes

### Port already in use
```bash
# Find process using port 3000
netstat -ano | findstr :3000

# Kill process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Module not found
```bash
# Reinstall dependencies
rmdir /s /q node_modules
npm install
```

### Build errors
```bash
# Clear cache and rebuild
rmdir /s /q .next
npm run build
```

---

## Production Monitoring

```bash
# View Vercel logs
vercel logs --follow

# Check deployment status
vercel inspect <deployment-url>

# View environment variables
vercel env ls
```

---

## Stripe Webhooks

```bash
# List webhook endpoints
stripe webhook_endpoints list

# Create webhook endpoint
stripe webhook_endpoints create \
  --url https://your-domain.com/api/webhooks/stripe \
  --enabled-events checkout.session.completed,payment_intent.succeeded

# Update webhook endpoint
stripe webhook_endpoints update <endpoint-id> \
  --url https://your-domain.com/api/webhooks/stripe
```

---

## Security Checks

```bash
# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated

# Update specific package
npm update <package-name>
```

---

## Documentation Generation

```bash
# Generate TypeScript documentation (if using TypeDoc)
npx typedoc --out docs src

# Generate dependency tree
npm list --all > dependencies.txt

# Generate bundle analysis
npm run build
# Check .next/analyze/ folder
```

---

## Quick Deploy Checklist

```bash
# 1. Build locally
npm run build

# 2. Test production build
npm start

# 3. Commit changes
git add .
git commit -m "Ready for deployment"
git push

# 4. Deploy to Vercel
vercel --prod

# 5. Verify deployment
curl https://your-domain.com
```

---

## Emergency Rollback

```bash
# List previous deployments
vercel ls

# Promote previous deployment to production
vercel promote <deployment-url>

# Or rollback in Vercel dashboard
# Go to Deployments → Select previous version → Promote to Production
```

---

## Useful Aliases (Add to your profile)

```powershell
# Edit PowerShell profile
notepad $PROFILE

# Add these aliases:
function dev { npm run dev }
function build { npm run build }
function start { npm start }
function stripe-listen { stripe listen --forward-to localhost:3000/api/webhooks/stripe }
```

---

**Save this file for quick reference!**
