# Certified Secure Researcher

Official website for Certified Secure Researcher - empowering academic researchers with comprehensive cybersecurity protection.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Deployment

This project is configured for automated deployment to Cloudflare Pages. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup instructions.

### Quick Deployment Setup

1. Add GitHub secrets: `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`
2. Push to `main` branch
3. Deployment happens automatically via GitHub Actions

## 👀 Want to learn more?

- [Astro Documentation](https://docs.astro.build)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
