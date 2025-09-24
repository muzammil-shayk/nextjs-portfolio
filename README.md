# Portfolio Project

[![CI/CD Pipeline](https://github.com/muzammil-shayk/nextjs-portfolio/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/muzammil-shayk/nextjs-portfolio/actions/workflows/ci-cd.yml)
[![Dependency Updates](https://github.com/muzammil-shayk/nextjs-portfolio/actions/workflows/dependency-updates.yml/badge.svg)](https://github.com/muzammil-shayk/nextjs-portfolio/actions/workflows/dependency-updates.yml)

A modern, responsive portfolio website built with Next.js, featuring automated CI/CD pipelines and deployment to Vercel.

## Features

- 🚀 **Next.js 15** with Turbopack for blazing-fast development
- 🎨 **Tailwind CSS** for modern, responsive styling
- 📱 **Fully Responsive** design for all devices
- ⚡ **Performance Optimized** with Lighthouse CI monitoring
- 🔄 **Automated CI/CD** with GitHub Actions
- 🛡️ **Security Scanning** with npm audit and Snyk
- 📦 **Auto-deployments** to Vercel
- 🎯 **Code Quality** with ESLint and Prettier

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline with:

### 🔄 Continuous Integration

- **Automated Testing**: ESLint, Prettier, and build verification
- **Security Scanning**: npm audit and Snyk vulnerability checks
- **Performance Monitoring**: Lighthouse CI for performance metrics
- **Code Quality**: Automated formatting and linting

### 🚀 Continuous Deployment

- **Production Deployment**: Automatic deployment to Vercel on main branch
- **Preview Deployments**: Automatic preview builds for Pull Requests
- **Branch Protection**: Required status checks before merging
- **Automated Updates**: Weekly dependency updates via GitHub Actions

### 📋 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues automatically
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting

# CI/CD
npm run audit           # Run security audit
./scripts/setup-cicd.sh # Setup CI/CD pipeline
```

### 🛠️ Setup CI/CD

1. **Run setup script**:

   ```bash
   ./scripts/setup-cicd.sh
   ```

2. **Configure Vercel Integration**:

   ```bash
   npx vercel login
   npx vercel link
   ```

3. **Add GitHub Secrets**:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

For detailed setup instructions, see [CI/CD Documentation](./docs/CI-CD.md).

## Deployment

The project automatically deploys to Vercel:

- **Production**: Deploys from `main` branch
- **Preview**: Deploys from Pull Requests
- **Performance**: Monitored with Lighthouse CI

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

The CI/CD pipeline will automatically run tests and deploy preview versions for review.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
