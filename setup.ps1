# Quick Setup Script for bouquets.by.tanya

Write-Host "🌹 bouquets.by.tanya - Setup Script" -ForegroundColor Magenta
Write-Host "=================================" -ForegroundColor Magenta
Write-Host ""

# Check if .env.local exists
if (-Not (Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local not found. Creating from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env.local"
    Write-Host "✅ .env.local created" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Please edit .env.local and add your Stripe API keys:" -ForegroundColor Cyan
    Write-Host "   1. Get keys from: https://dashboard.stripe.com/test/apikeys" -ForegroundColor Gray
    Write-Host "   2. Update STRIPE_SECRET_KEY" -ForegroundColor Gray
    Write-Host "   3. Update NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY" -ForegroundColor Gray
    Write-Host "   4. Set up webhook with Stripe CLI" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "✅ .env.local already exists" -ForegroundColor Green
}

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Edit .env.local with your Stripe keys" -ForegroundColor Gray
Write-Host "2. Run: npm run dev" -ForegroundColor Gray
Write-Host "3. Open: http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "For Stripe webhooks (in a new terminal):" -ForegroundColor Cyan
Write-Host "stripe listen --forward-to localhost:3000/api/webhooks/stripe" -ForegroundColor Gray
Write-Host ""
