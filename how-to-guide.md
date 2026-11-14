# Portfolio Repository Guide

This repository contains the source for the public personal portfolio:

- **Live site:** https://amrshah.github.io
- **Default branch:** `master`
- **Hosting:** GitHub Pages
- **Deployment:** GitHub Actions
- **Current frontend:** lightweight static HTML, CSS and JavaScript

## Source of truth

The deployed website is currently maintained directly in the repository root:

- `index.html` — complete portfolio page, including styles and navigation behavior.
- `assets/images/amrshah.jpg` — profile image used by the page.
- `.github/workflows/deploy-pages.yml` — validates pull requests and deploys changes pushed to `master`.

There is currently **no active React/Vite application, Singularity CMS, Express backend, SQLite database, or admin dashboard** in the production portfolio workflow. Older CMS documentation and implementation were retired when the portfolio was simplified to a static site.

## Local development

No build step or package installation is required for the current site.

1. Clone the repository.
2. Open `index.html` directly in a browser, or run a local static server from the repository root.
3. Edit the HTML/CSS/JavaScript in `index.html`.
4. Keep images and other static assets under `assets/`.
5. Test desktop and mobile layouts before opening a pull request.

The portfolio is intentionally lightweight. Do not introduce a frontend framework, build system, database or CMS unless there is a concrete content-management requirement.

## Deployment workflow

The workflow in `.github/workflows/deploy-pages.yml`:

1. Runs for pull requests targeting `master` when the portfolio page, image assets or workflow change.
2. Assembles a clean `_site` artifact containing `index.html` and the required profile image.
3. Uploads the artifact for GitHub Pages.
4. Deploys only for pushes to `master`; pull requests validate the artifact but do not publish it.
5. Supports manual execution through `workflow_dispatch`.

GitHub repository configuration should use **Settings → Pages → Build and deployment → Source → GitHub Actions**.

The workflow intentionally publishes only the curated website files. Repository documentation, planning notes and source history are not copied into the public Pages artifact.

## Content management direction

The current portfolio is a static professional profile and does not need a CMS.

If a research blog or frequently updated editorial section is reintroduced, evaluate a separate Cloudflare-native CMS such as [Flare CMS](https://github.com/jjaimealeman/flarecms). Treat it as a future content-management integration, not as a dependency of the portfolio frontend.

Before adopting it, verify:
- editorial workflow, drafts and publishing controls;
- content export/API and static-site integration;
- image/media handling and storage;
- authentication and access control;
- maintenance activity and operational cost.

Keep the public portfolio available as a static site if the CMS is unavailable. Never expose CMS credentials or private administrative endpoints in the frontend.

## Change checklist

- [ ] Verify all project and social links.
- [ ] Check responsive layout at mobile and desktop widths.
- [ ] Check keyboard navigation and visible focus states.
- [ ] Confirm page title, description and social metadata.
- [ ] Confirm all referenced assets exist.
- [ ] Confirm the GitHub Actions workflow passes.
- [ ] Confirm the published Pages site after merging.
