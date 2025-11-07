# Script untuk setup database lokal D1
Write-Host "Setting up local D1 database..." -ForegroundColor Green

# Jalankan migrations
Write-Host "Running migrations..." -ForegroundColor Yellow
npx wrangler d1 migrations apply DB --local

Write-Host "`nDatabase setup complete!" -ForegroundColor Green
Write-Host "Demo account:" -ForegroundColor Cyan
Write-Host "  Email: robinsyaifuddin@gmail.com" -ForegroundColor White
Write-Host "  Password: robin123" -ForegroundColor White
