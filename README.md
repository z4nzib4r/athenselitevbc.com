# athenselitevbc.com

Website for Athens Elite Volleyball Club, Athens, Ohio. A static site built with
[Eleventy](https://www.11ty.dev/), migrated from the previous WordPress site.

## Quick start

```sh
npm install
npm start        # preview at http://localhost:8080
npm run build    # output in _site/
```

See [CLAUDE.md](CLAUDE.md) for where each piece of content lives and how to edit it.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

One-time setup:

1. Repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Under **Custom domain**, enter `athenselitevbc.com` (the `src/CNAME` file also sets this), then tick **Enforce HTTPS** once the certificate is issued.
3. At the domain's DNS provider, point the apex domain at GitHub Pages with `A` records
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`,
   and add a `CNAME` record for `www` → `<github-username>.github.io`.
