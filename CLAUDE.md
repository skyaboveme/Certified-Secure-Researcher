# CLAUDE.md - AI Assistant Guide

This document provides guidance for AI assistants working with the Certified Secure Researcher (CSR) website codebase.

## Project Overview

**Certified Secure Researcher** is a research security certification platform that helps researchers demonstrate compliance with federal funding requirements (NSPM-33) by linking credentials to ORCiD identifiers.

**Live site**: https://certifiedsecureresearcher.com

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | 5.x | Static site generator with SSR support |
| TypeScript | Strict mode | Type safety |
| Cloudflare Pages | Latest | Hosting and deployment |
| Node.js | 20+ | Runtime |

## Project Structure

```
/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── Header.astro     # Navigation header with mobile menu
│   │   ├── Footer.astro     # Site footer with links and partners
│   │   └── Chatbot.astro    # Interactive FAQ chatbot
│   ├── layouts/
│   │   └── BaseLayout.astro # Main layout with SEO, meta tags, global styles
│   └── pages/               # File-based routing
│       ├── index.astro      # Homepage
│       ├── about.astro      # About CSR certification
│       ├── blog.astro       # Blog listing page
│       ├── blog/*.astro     # Individual blog posts
│       ├── resources.astro  # Resources and documentation
│       ├── community.astro  # Community member area
│       ├── login.astro      # User login
│       ├── signup.astro     # Application form
│       ├── contact.astro    # Contact page
│       ├── rss.xml.ts       # RSS feed generator
│       └── *.astro          # Legal pages (privacy, terms)
├── public/                  # Static assets
│   ├── Images/              # Site images and media
│   ├── logomain.png         # Site logo
│   ├── favicon.svg          # Favicon
│   ├── robots.txt           # SEO robots file
│   ├── sitemap.xml          # SEO sitemap
│   └── llms.txt             # LLM-readable site info
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD pipeline for Cloudflare Pages
├── astro.config.mjs         # Astro configuration
├── wrangler.toml            # Cloudflare Workers/Pages config
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies and scripts
```

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI commands
npm run astro -- <command>
```

## Deployment

The site deploys automatically via GitHub Actions:
- **Trigger**: Push to `main` branch
- **Target**: Cloudflare Pages
- **Required secrets**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

Manual deployment:
```bash
npm run build
wrangler pages deploy dist --project-name=certified-secure-researcher
```

## Code Conventions

### Astro Components

- Components use `.astro` extension
- Frontmatter (between `---`) contains imports, props, and logic
- Props interface defined with TypeScript:
```astro
---
interface Props {
  title: string;
  description?: string;
}
const { title, description = 'Default' } = Astro.props;
---
```

### Styling

- **Scoped styles**: Use `<style>` in components (auto-scoped)
- **Global styles**: Use `<style is:global>` in BaseLayout
- **CSS Variables**: Defined in BaseLayout for consistent theming

Key CSS variables:
```css
--primary: #2d7a3e;        /* Primary green */
--primary-dark: #1f5d2e;
--primary-light: #3d9a51;
--secondary: #50b661;
--accent: #7ec74a;         /* Accent green/lime */
--dark: #1a3a22;
--gray: #4a5568;
--light-gray: #e2e8f0;
--bg: #f7fafc;
--white: #ffffff;
```

### Fonts

- **Body**: Inter (Google Fonts)
- **Headings**: Space Grotesk (Google Fonts)

### Page Structure Pattern

Every page follows this structure:
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<BaseLayout title="Page Title | Certified Secure Researcher™">
  <Header currentPage="page-name" />

  <!-- Page content sections -->

  <Footer />
</BaseLayout>
```

### SEO

BaseLayout handles comprehensive SEO:
- Title and meta description
- Open Graph tags
- Twitter Card tags
- Structured data (JSON-LD)
- Canonical URLs

Pass SEO props to BaseLayout:
```astro
<BaseLayout
  title="Page Title | Certified Secure Researcher™"
  description="Page description for search engines"
  keywords="comma, separated, keywords"
  type="website"
>
```

## Key Components

### Header (`src/components/Header.astro`)
- Sticky navigation with logo
- Responsive mobile menu (hamburger)
- Active page highlighting via `currentPage` prop
- Main nav links: Home, About, Resources, Community, Login, Apply Now

### Footer (`src/components/Footer.astro`)
- Quick links, legal links, contact info
- Partner logos (ORCiD, IPTalons)
- Social links

### Chatbot (`src/components/Chatbot.astro`)
- Floating chat widget (bottom-right)
- Knowledge base for FAQs
- Quick question buttons
- Typing indicator animation

## Blog Posts

Blog posts are individual `.astro` files in `src/pages/blog/`:
- File name becomes URL slug
- Each post imports BaseLayout, Header, Footer
- RSS feed in `src/pages/rss.xml.ts` should be updated when adding posts

### Adding a New Blog Post

1. Create `src/pages/blog/your-post-slug.astro`
2. Use existing blog post as template
3. Update `src/pages/blog.astro` to add card
4. Update `src/pages/rss.xml.ts` to include in RSS feed

## Configuration Files

### `astro.config.mjs`
```javascript
export default defineConfig({
  output: 'server',  // SSR mode
  adapter: cloudflare({
    platformProxy: { enabled: true }
  })
});
```

### `wrangler.toml`
```toml
name = "certified-secure-researcher"
compatibility_date = "2024-11-18"
pages_build_output_dir = "./dist"
```

### `tsconfig.json`
- Extends `astro/tsconfigs/strict`
- Excludes `dist` directory

## Common Tasks

### Adding a New Page

1. Create `.astro` file in `src/pages/`
2. Import and use BaseLayout, Header, Footer
3. Add navigation link in Header if needed
4. Add to sitemap.xml if public-facing

### Modifying Navigation

Edit `src/components/Header.astro`:
- Add/remove links in the `<nav class="main-nav">` section
- Update `currentPage` prop handling for active states

### Updating Global Styles

Edit `src/layouts/BaseLayout.astro`:
- CSS variables in `:root`
- Global utility classes
- Base element styles

### Updating Chatbot Knowledge

Edit `src/components/Chatbot.astro`:
- Modify `knowledgeBase` object in `<script>` section
- Keys are search terms (lowercase)
- Values contain `answer` and optional `links`

## Testing

No automated testing framework is currently configured. Manual testing:
1. Run `npm run dev` for local development
2. Run `npm run build && npm run preview` for production preview
3. Check responsive design at different breakpoints
4. Verify all navigation links work
5. Test chatbot interactions

## Important Notes

- **SSR Mode**: Site uses server-side rendering via Cloudflare adapter
- **No Client JS Framework**: Pure Astro with vanilla JS for interactivity
- **Mobile First**: Styles include responsive breakpoints (768px, 1024px)
- **Accessibility**: Components include ARIA labels and semantic HTML
- **Performance**: Images use lazy loading, fonts preconnected

## Contact

- **Support Email**: support@certifiedsecureresearcher.com
- **General Inquiries**: info@certifiedsecureresearcher.com
- **Parent Organization**: IPTalons (https://iptalons.com)
