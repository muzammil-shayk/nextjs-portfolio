#!/bin/bash

echo "🚀 Setting up CI/CD Pipeline for Portfolio Project"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "\n${BLUE}1. Checking project dependencies...${NC}"
npm audit --audit-level=moderate

echo -e "\n${BLUE}2. Running code formatting...${NC}"
npm run format

echo -e "\n${BLUE}3. Running linting checks...${NC}"
npm run lint

echo -e "\n${BLUE}4. Testing build process...${NC}"
npm run build

echo -e "\n${GREEN}✅ CI/CD Pipeline setup complete!${NC}"
echo -e "\n${YELLOW}Next steps:${NC}"
echo "1. Get your Vercel credentials:"
echo "   • Run: npx vercel login"
echo "   • Run: npx vercel link"
echo "   • Copy token and IDs from: cat .vercel/project.json"
echo ""
echo "2. Add GitHub Secrets (Settings → Secrets and Variables → Actions):"
echo "   • VERCEL_TOKEN"
echo "   • VERCEL_ORG_ID"
echo "   • VERCEL_PROJECT_ID"
echo "   • SNYK_TOKEN (optional)"
echo ""
echo "3. Configure branch protection rules for 'main' branch"
echo "4. Push your changes to trigger the first CI/CD run!"
echo ""
echo -e "${GREEN}🎉 Your portfolio now has enterprise-grade CI/CD!${NC}"