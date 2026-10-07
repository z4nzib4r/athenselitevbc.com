# Athens Elite VBC website

Static site for Athens Elite Volleyball Club (athenselitevbc.com), built with
[Eleventy](https://www.11ty.dev/). It was migrated from WordPress; page URLs
match the old site so existing links keep working.

## Commands

- `npm install` — install dependencies (first time only)
- `npm start` — local preview at http://localhost:8080 with live reload
- `npm run build` — build the site into `_site/` (always run after edits to catch errors)

Pushing to `main` builds and deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Where content lives

| What | File |
|---|---|
| Homepage (hero, philosophy, Instagram band) | `src/index.njk` |
| Homepage program cards | `src/_data/programs.json` |
| Homepage hero graphic (court-line illustration; tilt/position in `.hero-court` in `style.css`) | `src/images/hero-court.svg` |
| Every other page | `src/pages/<slug>.html` |
| Old blog posts | `src/posts/<slug>.html` |
| Top navigation menu | `src/_data/navigation.json` |
| Club name, email, Instagram, shop link, header button (`cta`), footer links (`footerLinks`) | `src/_data/site.json` |
| Header, footer, `<head>` | `src/_includes/layouts/base.njk` |
| All styling (colors, fonts, layout) | `src/css/style.css` |
| Images | `src/images/` (referenced as `/images/<file>`) |
| PDFs / video | `src/files/` (referenced as `/files/<file>`) |

Page slugs are inherited from WordPress and don't always match the title —
look up the page by its `title:` or by the nav entry in `navigation.json`:

- `posts-page.html` → Sponsors
- `behavior-guidelines.html` → Code of Conduct
- `tryouts-2.html` → Tryouts (current); `tryouts.html` is an older Fall Tryouts page
- `17u-regional.html` → 18U Regional Level
- `14u-regional.html` → 15U American Level
- `13u-regional.html` → 14U Regional Level
- `leagues.html` → In-House League

Pages that exist but aren't in the nav (reachable only by direct link): `12u-regional-level`,
`13u-level`, `16u-regional`, `15u-regional`, `15u-regional-new`, `15u-american`, `club-2`,
`about`, `clinics`, `club-tryouts`, `summer-camp`, `pawpaw-festival`, `tryouts`, plus the 3 posts.
`/shop/` redirects to the Shopify store.

## Page file format

Each page is HTML with YAML front matter:

```html
---
title: "Coaches"
permalink: "/coaches/"
heading: "..."       # optional: page-header text if it should differ from title
eyebrow: "..."       # optional: small green label above the heading (defaults to the nav dropdown, e.g. "About Us")
intro: "..."         # optional: short lead paragraph under the heading
description: "..."   # optional: meta description for search engines
---
<p>Page content…</p>
```

- `permalink` must keep its leading and trailing slash. Don't change an existing permalink unless asked (it breaks old links).
- A new page: create `src/pages/<slug>.html` with front matter like above; it automatically uses the page layout. Add it to `navigation.json` if it should be in the menu.

## Content building blocks

Content uses plain HTML plus a few CSS classes (kept from WordPress, styled in `style.css`). Copy an existing example when adding similar content:

Every page gets a dark page-header band with its title automatically, so don't start page content with an `<h1>` or a repeat of the title.

- **Coach / player card** (`coaches.html`, team pages): `.wp-block-columns > .wp-block-column.roster-item` containing a photo column and a name column (`<h4>` name, then `<p>` role shown in green, then optional `<p>` details). Photos are cropped to a circle automatically.
- **Table** (rosters, tournament schedules, tryout times): `<figure class="wp-block-table"><table>…</table></figure>`. Edit rows directly.
- **Image**: `<figure class="wp-block-image"><img src="/images/x.jpg" alt="Describe it" loading="lazy"></figure>`. Add `aligncenter` to center.
- **Two columns**: `<div class="wp-block-columns"><div class="wp-block-column">…</div><div class="wp-block-column">…</div></div>` (stacks on mobile).
- **Image beside text**: `.wp-block-media-text` (see `leagues.html`).
- **Accordion / FAQ item**: `<details class="wp-block-details"><summary>Question</summary><p>Answer</p></details>`.
- **Button**: `<div class="wp-block-buttons"><div class="wp-block-button"><a class="wp-block-button__link" href="…">Label</a></div></div>`.
- **Small green label above a heading**: `<h5>`.

`h2` renders in the uppercase Anton display style; `h3`/`h4` are bold Inter. Fonts (Anton + Inter) load from Google Fonts in `base.njk`.

## Editing guidelines

- Registration and sign-ups are external (Google Forms, OVR/USA Volleyball, Shopify). Update links in place; there are no on-site forms.
- New images: put them in `src/images/` with a lowercase, hyphenated filename. Resize photos to ≤1600px wide (coach headshots ≤900px) and prefer JPG/WebP to keep the site fast. Always write a meaningful `alt`.
- Link to other pages with root-relative paths (`/coaches/`), not `https://athenselitevbc.com/...`.
- External links should have `target="_blank" rel="noopener"`.
- Run `npm run build` after editing and make sure it succeeds.
