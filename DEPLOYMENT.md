# DEPLOYMENT CHECKLIST

## Pre-Launch Checklist

### 1. Environment Setup
- [ ] All environment variables configured in production
- [ ] Stripe live API keys configured (not test keys!)
- [ ] Production webhook endpoint created and verified
- [ ] NEXT_PUBLIC_APP_URL set to production domain
- [ ] All secrets are unique and secure

### 2. Stripe Configuration
- [ ] Switch from test mode to live mode in Stripe Dashboard
- [ ] Update all API keys to live keys
- [ ] Create production webhook endpoint
- [ ] Test webhook with Stripe CLI or Dashboard
- [ ] Verify payment flow with test transactions
- [ ] Enable payment methods (cards, Apple Pay, Google Pay)
- [ ] Set up email notifications in Stripe

### 3. Content Review
- [ ] All product information is accurate
- [ ] Product images are optimized and loaded
- [ ] Product videos work properly
- [ ] Privacy Policy reviewed and updated
- [ ] Terms of Service reviewed and updated
- [ ] Contact information is correct
- [ ] About page content finalized

### 4. Security
- [ ] HTTPS enabled (automatic with Vercel/Netlify)
- [ ] Security headers configured in next.config.ts
- [ ] No API keys or secrets in frontend code
- [ ] .env.local is in .gitignore
- [ ] Webhook signature verification working
- [ ] Rate limiting configured (consider Vercel Edge Config)
- [ ] CORS properly configured

### 5. Testing
- [ ] Test full checkout flow
- [ ] Test payment with real card (small amount)
- [ ] Test failed payment scenarios
- [ ] Test webhook delivery
- [ ] Test on mobile devices
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test cart persistence
- [ ] Test product detail pages
- [ ] Test contact form
- [ ] Verify order confirmation flow

### 6. Performance
- [ ] Run Lighthouse audit (target 90+ score)
- [ ] Images optimized (Next.js Image component)
- [ ] Videos optimized for web
- [ ] Enable caching headers
- [ ] Test load times on slow connections
- [ ] Verify Core Web Vitals

### 7. SEO
- [ ] All pages have proper meta titles
- [ ] All pages have meta descriptions
- [ ] Open Graph tags configured
- [ ] Sitemap generated (consider next-sitemap)
- [ ] robots.txt configured
- [ ] Google Analytics or tracking setup (optional)
- [ ] Submit sitemap to Google Search Console

### 8. Database & Storage
- [ ] Orders directory exists with proper permissions
- [ ] Backup strategy in place
- [ ] Consider migrating to database (PostgreSQL recommended)
- [ ] Set up automated backups

### 9. Email Notifications
- [ ] Order confirmation emails configured
- [ ] Admin notification emails configured
- [ ] Email templates created and tested
- [ ] SMTP credentials configured

### 10. Monitoring
- [ ] Error tracking setup (Sentry recommended)
- [ ] Uptime monitoring (UptimeRobot, Pingdom)
- [ ] Stripe webhook monitoring
- [ ] Server logs accessible
- [ ] Analytics dashboard setup

### 11. Legal & Compliance
- [ ] Privacy Policy compliant with GDPR (if serving EU)
- [ ] Cookie consent implemented (if needed)
- [ ] Terms of Service legally reviewed
- [ ] Return policy clearly stated
- [ ] Business registration details added

### 12. Deployment
- [ ] Domain configured and DNS updated
- [ ] SSL certificate active
- [ ] Deploy to production platform
- [ ] Verify production build works
- [ ] Test production environment thoroughly
- [ ] Set up staging environment (optional)

### 13. Post-Launch
- [ ] Monitor error logs first 24 hours
- [ ] Watch for failed payments
- [ ] Check webhook deliveries
- [ ] Verify orders are saving correctly
- [ ] Test customer support contact methods
- [ ] Backup initial production data

## Production Environment Variables

```env
# Production - NEVER commit these!
NEXT_PUBLIC_APP_URL=https://your-production-domain.com
STRIPE_SECRET_KEY=sk_live_actual_live_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_actual_live_key
STRIPE_WEBHOOK_SECRET=whsec_actual_production_webhook_secret
```

## Stripe Live Mode Checklist

1. Go to https://dashboard.stripe.com
2. Toggle to "Live mode" (top right)
3. Get live API keys from https://dashboard.stripe.com/apikeys
4. Create webhook at https://dashboard.stripe.com/webhooks
5. Endpoint URL: `https://your-domain.com/api/webhooks/stripe`
6. Select events: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`
7. Copy webhook signing secret

## Recommended Services

- **Hosting**: Vercel (easiest), Netlify, Railway
- **Database**: Supabase, PlanetScale, Neon (PostgreSQL)
- **Email**: SendGrid, Resend, AWS SES
- **Error Tracking**: Sentry
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Analytics**: Google Analytics, Plausible, Vercel Analytics

## Emergency Contacts

- Stripe Support: https://support.stripe.com
- Vercel Support: https://vercel.com/support
- Developer: [Your contact info]

## Rollback Plan

If something goes wrong:
1. Check error logs immediately
2. Revert to previous deployment if critical
3. Check Stripe webhook deliveries
4. Verify environment variables
5. Contact payment processor support if needed

---

**Remember**: Test everything in staging/test mode before going live!
