# Cloudflare Pages Deployment Guide

This guide explains how to deploy the Certified Secure Researcher™ website to Cloudflare Pages using both automatic (GitHub Actions) and manual (Wrangler CLI) methods.

---

## 📋 Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com) (free tier works)
2. **Node.js**: Version 18 or higher installed
3. **GitHub Repository**: This repository pushed to GitHub
4. **Wrangler CLI** (for manual deployment): Install via `npm install -g wrangler`

---

## 🚀 Method 1: Automatic Deployment via GitHub Actions (Recommended)

This method automatically deploys your site whenever you push to the main branch.

### Step 1: Get Cloudflare Credentials

1. **Get your Account ID**:
   - Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Click on "Pages" in the left sidebar
   - Your Account ID is visible in the URL or on the right sidebar

2. **Create an API Token**:
   - Go to [API Tokens](https://dash.cloudflare.com/profile/api-tokens)
   - Click "Create Token"
   - Use the "Edit Cloudflare Workers" template or create a custom token with these permissions:
     - **Account** → **Cloudflare Pages** → **Edit**
   - Copy the token (you won't see it again!)

### Step 2: Add GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:
   - Name: `CLOUDFLARE_API_TOKEN`
     Value: Your API token from Step 1
   - Name: `CLOUDFLARE_ACCOUNT_ID`
     Value: Your Account ID from Step 1

### Step 3: Create Cloudflare Pages Project

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**
2. Click **Create a project** → **Direct Upload**
3. Project name: `certified-secure-researcher`
4. You can do an initial manual upload of the `dist` folder, or skip and let GitHub Actions handle the first deployment

### Step 4: Deploy

Push to your main branch:
```bash
git push origin main
```

The GitHub Action will automatically:
- Build your Astro site
- Deploy to Cloudflare Pages
- Provide a deployment URL

You can also manually trigger deployment from the **Actions** tab in GitHub.

### Step 5: Access Your Site

Your site will be available at:
- Production: `https://certified-secure-researcher.pages.dev`
- Custom domain: Configure in Cloudflare Pages settings

---

## 🛠️ Method 2: Manual Deployment via Wrangler CLI

Use this method for one-off deployments or local testing.

### Step 1: Install Wrangler

```bash
npm install -g wrangler
```

### Step 2: Authenticate with Cloudflare

```bash
wrangler login
```

This opens your browser to authorize Wrangler.

### Step 3: Build Your Site

```bash
npm install
npm run build
```

This creates the `dist` folder with your static site.

### Step 4: Deploy to Cloudflare Pages

```bash
wrangler pages deploy dist --project-name=certified-secure-researcher
```

First time deployment:
- Wrangler will create the project for you
- You'll be prompted for your account

Subsequent deployments:
- Wrangler will update the existing project
- Production URL remains the same

### Step 5: View Your Deployment

```bash
wrangler pages deployments list --project-name=certified-secure-researcher
```

---

## 🔧 Method 3: Cloudflare Dashboard (Direct Upload)

For quick manual uploads without CLI:

1. Build your site:
   ```bash
   npm install
   npm run build
   ```

2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → **Pages**

3. Select your project or create a new one

4. Click **Create new deployment** or **Upload assets**

5. Upload the entire `dist` folder

---

## 🌐 Custom Domain Setup

1. Go to your Cloudflare Pages project
2. Click **Custom domains** tab
3. Click **Set up a custom domain**
4. Enter your domain (e.g., `certifiedsecureresearcher.com`)
5. Cloudflare will automatically configure DNS if the domain is on Cloudflare

---

## 🔐 Environment Variables & Secrets

If you need to add environment variables (for future features):

### Via GitHub Actions:
Add to `.github/workflows/deploy-cloudflare-pages.yml` under the deploy step:
```yaml
- name: Deploy to Cloudflare Pages
  uses: cloudflare/pages-action@v1
  with:
    # ... existing config ...
  env:
    MY_VARIABLE: ${{ secrets.MY_VARIABLE }}
```

### Via Cloudflare Dashboard:
1. Go to your Pages project
2. Click **Settings** → **Environment variables**
3. Add variables for Production/Preview environments

### Via Wrangler:
```bash
wrangler pages secret put MY_SECRET --project-name=certified-secure-researcher
```

---

## 📊 Build Configuration

The project is configured with:
- **Framework**: Astro (detected automatically)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 20 (specified in GitHub Actions)

These settings are defined in:
- `package.json` (scripts)
- `astro.config.mjs` (Astro config)
- `wrangler.toml` (Cloudflare config)
- `.github/workflows/deploy-cloudflare-pages.yml` (CI/CD)

---

## 🔄 Preview Deployments

Cloudflare Pages automatically creates preview deployments for:
- Pull requests (if using GitHub integration)
- Non-production branches

Each preview gets a unique URL: `https://<branch>.<project>.pages.dev`

---

## 🐛 Troubleshooting

### Build Fails

**Error**: `npm install` fails
- **Solution**: Delete `node_modules` and `package-lock.json`, then run `npm install` again

**Error**: `astro build` fails
- **Solution**: Check that all dependencies are installed: `npm install`

### Deployment Fails

**Error**: `Invalid API token`
- **Solution**: Regenerate your API token with correct permissions

**Error**: `Project not found`
- **Solution**: Create the project first via Cloudflare Dashboard or let Wrangler create it

### GitHub Actions Fails

**Error**: Missing secrets
- **Solution**: Verify `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set in GitHub secrets

### Site Not Loading

**Error**: 404 or blank page
- **Solution**: Verify `dist` folder contains `index.html` and all assets
- **Solution**: Check Cloudflare Pages build logs for errors

---

## 📝 Useful Commands

```bash
# Development
npm run dev              # Start dev server (localhost:4321)
npm run build            # Build for production
npm run preview          # Preview production build locally

# Wrangler
wrangler login           # Authenticate with Cloudflare
wrangler pages deploy    # Deploy to Pages
wrangler pages list      # List your Pages projects
wrangler pages deployments list --project-name=certified-secure-researcher

# View logs
wrangler pages deployments tail --project-name=certified-secure-researcher
```

---

## 🎯 Next Steps

1. ✅ **Set up GitHub Actions** (recommended for automatic deployments)
2. ✅ **Add custom domain** for professional branding
3. ✅ **Enable Web Analytics** in Cloudflare for visitor insights
4. ✅ **Configure caching** rules if needed
5. ✅ **Set up preview deployments** for staging/testing

---

## 📚 Additional Resources

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler)
- [Astro Documentation](https://docs.astro.build)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## 🆘 Support

If you encounter issues:
1. Check [Cloudflare Status](https://www.cloudflarestatus.com)
2. Review Cloudflare Pages [build logs](https://dash.cloudflare.com)
3. Check GitHub Actions logs in the Actions tab
4. Consult [Cloudflare Community](https://community.cloudflare.com)

---

**Happy Deploying! 🚀**
