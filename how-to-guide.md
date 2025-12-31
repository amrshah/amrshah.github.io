# 🌌 Singularity System: How-To Guide

Welcome to the **Singularity System**—a unified, high-performance ecosystem for your personal portfolio and research blog. This system combines a modern React frontend with a local SQLite-powered CMS for seamless content management.

---

## 🏗️ System Architecture

The project is split into two main environments:

1.  **Development Environment (Local)**:
    *   **Frontend**: React (Vite) running on `http://localhost:5173`.
    *   **Backend**: Node/Express server on `http://localhost:5555`.
    *   **Database**: SQLite (`database.sqlite`) stores your blog posts and SEO meta.
    *   **CMS**: "Mission Control" interface at `/admin` for creating and editing content.

2.  **Production Environment (GitHub Pages)**:
    *   **Static Site**: The built React app.
    *   **Static Data**: Blog posts are served as `.json` files from the `/public/api/` folder.
    *   **Security**: The private CMS backend is never exposed to the public internet.

---

## 🚀 Getting Started

### 1. Launch the Engine
To run your system locally, you need to start both the frontend and the CMS backend.

1.  **Start the Backend**:
    ```bash
    cd singularity-cms
    node server/index.js
    ```
2.  **Start the Frontend**:
    ```bash
    cd singularity-cms
    npm run dev
    ```

### 2. Access "Mission Control" (CMS)
Navigate to `http://localhost:5173/admin` to manage your insights.
*   **Create Post**: Use the "Write New Insight" button or navigate to "Write Post".
*   **Editor**: Features a rich-text Editor.js interface (Headers, Code, Lists, Tables, etc.).
*   **Status**: Save as **Draft** for work-in-progress or **Published** to make it live.

---

## 🔄 Content Synchronization

Because GitHub Pages does not support databases, we use a **Static Sync** process.

1.  **Monitor Sync Status**: Go to the **Settings** page in Mission Control. It will tell you if your static assets are "Out of Sync" after you've made changes.
2.  **Sync Now**: Click the **"Sync to Static Assets"** button. This script:
    *   Exports all published posts from SQLite to `public/api/*.json`.
    *   Refreshes the `posts.json` index.
3.  **Manual Sync**: Alternatively, you can run `npm run sync` from the command line while the server is running.

---

## 📨 Contact Form (Formspree)

Your contact form is now functional!
*   **EndPoint**: It sends data to `https://formspree.io/f/xvgzbgww`.
*   **Inbox**: Submissions go directly to `am.rshah@gmail.com`.
*   **Setup**: The first time someone submits a message, Formspree will send you an email to verify the connection. Click the link in that email to activate it.

---

## 🌍 Portfolio Customization

The main portfolio page is located at `src/pages/Home.jsx`. It's designed to be dynamic:
*   **Hero Animation**: Managed by `src/components/Header/SingularityHeader.jsx`.
*   **Recent Insights**: The "Research & Insights" section automatically pulls the latest 3 published posts.

---

## 📦 Deployment to GitHub Pages

To deploy your site:

1.  **Sync your content**: Ensure you have clicked "Sync" in Mission Control.
2.  **Build the project**:
    ```bash
    npm run build
    ```
3.  **Move to Root**: Copy the contents of `singularity-cms/dist` to the root `amrshah.github.io` directory.
4.  **Push to GitHub**:
    ```bash
    git add .
    git commit -m "Deploy latest insights"
    git push origin main
    ```

---

## 🛠️ Tech Stack Reference
*   **Frontend**: React, React Router, Lucide-Icons, W3.CSS.
*   **Animation**: Anime.js v4.
*   **CMS Engine**: Node.js, Better-SQLite3, Express.
*   **Content Editor**: Editor.js.

---
*Architected with precision & passion by Ali Raza.*
