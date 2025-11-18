# Cloudflare Pages Deployment Setup

This project is configured for hands-free automated deployment to Cloudflare Pages using GitHub Actions.

## Prerequisites

1. A Cloudflare account
2. GitHub repository with the code
3. Cloudflare API Token and Account ID

## Setup Instructions

### 1. Get Your Cloudflare Credentials

#### Cloudflare Account ID
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Select your account
3. Copy your Account ID from the right sidebar or URL

#### Cloudflare API Token
1. Go to [Cloudflare API Tokens](https://dash.cloudflare.com/profile/api-tokens)
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template or create a custom token with these permissions:
   - Account - Cloudflare Pages - Edit
   - Account - Workers Scripts - Edit
4. Copy the generated token (you'll only see it once!)

### 2. Configure GitHub Secrets

Add the following secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:
   - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
   - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID

### 3. Deployment Method

Choose **ONE** of the following deployment methods:

#### Option A: GitHub Actions (Recommended)

This is the hands-free approach that deploys automatically on every push to `main`:

1. The GitHub Actions workflow will automatically create the Pages project on first deploy
2. No additional Cloudflare Pages setup required
3. Just push to `main` and let GitHub Actions handle everything

#### Option B: Cloudflare Pages Dashboard (Alternative)

If you prefer to use Cloudflare Pages direct Git integration:

1. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages**
3. Click **Create application** → **Pages** → **Connect to Git**
4. Select your GitHub repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/`
6. **IMPORTANT**: In the Pages settings, go to **Settings** → **Builds & deployments** → **Build configurations** → Add environment variable:
   - Set `NODE_VERSION` to `20` or higher

**Note**: If using Option B, you don't need the GitHub secrets, but you'll deploy through Cloudflare's dashboard instead of GitHub Actions.

## Automated Deployment

Once configured, the deployment happens automatically:

- **On every push to `main` branch**: Automatically builds and deploys
- **Manual deployment**: Go to **Actions** tab in GitHub and run the workflow manually

## Deployment Process

The GitHub Action workflow does the following:

1. Checks out the code
2. Sets up Node.js environment
3. Installs dependencies
4. Builds the Astro site
5. Deploys to Cloudflare Pages using Wrangler

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Deploy Manually (Optional)

If you need to deploy manually:

```bash
# Install Wrangler globally
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Build and deploy
npm run build
wrangler pages deploy dist --project-name=certified-secure-researcher
```

## Troubleshooting

### Build Fails
- Check the GitHub Actions logs in the **Actions** tab
- Ensure all dependencies are properly listed in `package.json`

### Deployment Fails
- Verify your `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets are correct
- Ensure the API token has the correct permissions
- Check that the project name in `wrangler.toml` matches your Cloudflare Pages project

### 404 Errors on Deployed Site
- Check the `pages_build_output_dir` in `wrangler.toml` points to the correct build directory
- Verify the build completed successfully

### "It looks like you've run a Workers-specific command" Error
If you see this error in Cloudflare Pages dashboard builds:
- This happens when using Cloudflare Pages direct Git integration
- The issue is with the build command configuration in Cloudflare Pages dashboard
- **Solution**: In your Cloudflare Pages project settings:
  1. Go to **Settings** → **Builds & deployments**
  2. Set **Build command** to: `npm run build`
  3. Do NOT set a custom deploy command
  4. Cloudflare Pages will automatically detect and deploy the `dist` folder
- Alternatively, use the GitHub Actions deployment method which handles this correctly

## Configuration Files

- **astro.config.mjs**: Configures Astro to use the Cloudflare adapter
- **wrangler.toml**: Cloudflare Workers/Pages configuration
- **.github/workflows/deploy.yml**: GitHub Actions workflow for automated deployment

## Support

For issues related to:
- **Astro**: [Astro Documentation](https://docs.astro.build)
- **Cloudflare Pages**: [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- **Wrangler**: [Wrangler Documentation](https://developers.cloudflare.com/workers/wrangler/)
