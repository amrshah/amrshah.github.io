# Implementation Plan - Blog Section Addition

This plan outlines the steps to add a professional blog section to the existing portfolio site, following the research and development suggestions in `docs/rnd.md`.

## 1. Directory Structure
Create a dedicated folder for blog content to keep the root directory clean.
- `/blog/` - Main listing page (`index.html`).
- `/blog/posts/` - Individual blog post files.
- `/assets/images/blog/` - Placeholders and featured images for posts.

## 2. Navigation Updates
Update `index.html` to include the "Blog" section in the navigation and add a call-to-action (CTA) or a "Latest Posts" preview.
- Add "Blog" to the sidebar/nav links.
- Create a new "Insights & Research" section in `index.html` that links to the blog.

## 3. Blog Organization (Categories)
Based on `docs/rnd.md`, the blog will be organized into the following categories:
- **Financial Architecture**: "Accounting-First" systems, Ledger logic, and business rigor.
- **Enterprise Laravel**: Scaling, maintainability, and clean architecture.
- **Agentic AI (MAO)**: Multi-Agent Orchestration, Human-in-the-loop patterns.
- **Distributed Foundations**: Parallel computing, High-performance systems.
- **TIL (Today I Learned)**: Quick, bite-sized technical tips.

## 4. Blog Post Template
Create a reusable HTML template for blog posts that matches the "Singularity" theme:
- Header with navigation back to Home/Blog Index.
- Article body with support for code highlighting (using Prism.js or similar).
- Author bio and "Related Posts" section.

## 5. Metadata & SEO
- Implement JSON-LD for articles.
- Add meta tags for Open Graph (social sharing).
- Use semantic HTML5 `<article>` tags.

## 6. Development Workflow
1. **Initialize Folder**: Create `/blog/` and `/blog/posts/`.
2. **Draft Index**: Create `blog/index.html` with category filters.
3. **First Post**: Implement the first post (e.g., "The Accounting-First Logic") to test the template.
4. **Integration**: Link everything from the main `index.html`.
