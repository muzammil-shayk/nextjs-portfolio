# CI/CD Pipeline Documentation

## Overview

This project uses a comprehensive CI/CD pipeline with GitHub Actions and Vercel for automated testing, quality checks, and deployment.

## Pipeline Features

### 🔄 Continuous Integration (CI)

- **Code Quality Checks**: ESLint and Prettier formatting
- **Build Verification**: Automated build testing
- **Security Auditing**: npm audit and Snyk security scanning
- **Performance Testing**: Lighthouse CI for performance metrics

### 🚀 Continuous Deployment (CD)

- **Production Deployment**: Automatic deployment to Vercel on main branch
- **Preview Deployments**: Automatic preview builds for Pull Requests
- **Environment Management**: Separate staging and production environments

## Workflows

### 1. Main CI/CD Pipeline (`ci-cd.yml`)

Triggers on:

- Push to `main` and `develop` branches
- Pull requests to `main` branch
- Manual workflow dispatch

**Jobs:**

1. **Quality Checks**: ESLint, Prettier, code formatting
2. **Build & Test**: Application build verification
3. **Security Audit**: Dependency vulnerability scanning
4. **Deploy**: Production deployment (main branch only)
5. **Deploy Preview**: PR preview deployments
6. **Lighthouse**: Performance testing post-deployment

### 2. Dependency Updates (`dependency-updates.yml`)

- **Schedule**: Every Monday at 9 AM UTC
- **Purpose**: Automated dependency updates and security patches
- **Output**: Creates PR with updated dependencies

## Setup Requirements

### GitHub Secrets

Add these secrets to your GitHub repository (`Settings → Secrets and Variables → Actions`):

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
SNYK_TOKEN=your_snyk_token (optional)
```

### Getting Vercel Credentials

1. **Vercel Token**:

   ```bash
   npx vercel login
   npx vercel --token
   ```

2. **Organization ID & Project ID**:
   ```bash
   npx vercel link
   cat .vercel/project.json
   ```

### Branch Protection Rules

Recommended settings for `main` branch:

- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging
- ✅ Include administrators in restrictions

**Required Status Checks:**

- `Code Quality & Linting`
- `Build & Test`
- `Security Audit`

## Local Development

### Install Dependencies

```bash
npm install
```

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run lint:fix        # Fix ESLint issues
npm run format          # Format code with Prettier
npm run format:check    # Check code formatting

# Other
npm run type-check      # TypeScript type checking
npm run audit           # Security audit
```

### Pre-commit Setup

```bash
npm install
npm run prepare         # Setup Husky pre-commit hooks
```

## Deployment Process

### Production Deployment

1. Push to `main` branch
2. CI pipeline runs automatically
3. On success, deploys to production Vercel environment
4. Lighthouse performance test runs post-deployment

### Preview Deployment

1. Create Pull Request
2. Preview deployment created automatically
3. Comment added to PR with preview URL
4. Deployment updated on every push to PR branch

## Performance Monitoring

### Lighthouse CI

- **Runs**: After every production deployment
- **Metrics**: Performance, Accessibility, Best Practices, SEO
- **Thresholds**:
  - Performance: ≥ 80%
  - Accessibility: ≥ 90%
  - Best Practices: ≥ 80%
  - SEO: ≥ 80%

## Security

### Automated Security Checks

- **npm audit**: Checks for known vulnerabilities
- **Snyk**: Advanced security scanning (optional)
- **Dependency updates**: Weekly automated updates

### Best Practices

- All secrets stored in GitHub Secrets
- No sensitive data in repository
- Automated dependency updates
- Security-first deployment pipeline

## Troubleshooting

### Build Failures

1. Check ESLint errors: `npm run lint`
2. Check build locally: `npm run build`
3. Review GitHub Actions logs

### Deployment Issues

1. Verify Vercel secrets are set correctly
2. Check Vercel dashboard for deployment logs
3. Ensure branch protection rules aren't blocking deployment

### Performance Issues

1. Review Lighthouse CI reports
2. Check bundle size with `npm run build`
3. Optimize images and assets

## Monitoring & Alerts

- **GitHub Actions**: Email notifications on workflow failures
- **Vercel**: Deployment status in dashboard
- **Performance**: Lighthouse CI reports in GitHub Actions

## Contributing

1. Create feature branch from `develop`
2. Make changes and commit
3. Push branch and create Pull Request
4. CI pipeline runs automatically
5. Review preview deployment
6. Merge after approval and CI success
