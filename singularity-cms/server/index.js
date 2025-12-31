import express from 'express';
import cors from 'cors';
import db from './db.js';
import { exec } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5555;

app.use(cors());
app.use(express.json());

// Root route for connection check
app.get('/', (req, res) => {
    res.json({ message: 'Singularity CMS API is running!', version: '1.0.0' });
});

// Sync Status Check
app.get('/api/sync-status', (req, res) => {
    try {
        const settings = db.prepare('SELECT last_sync_at, content_updated_at FROM settings WHERE id = 1').get();

        const lastSync = settings.last_sync_at ? new Date(settings.last_sync_at + 'Z') : new Date(0);
        const lastUpdate = settings.content_updated_at ? new Date(settings.content_updated_at + 'Z') : new Date(0);

        // If database was modified after the last sync, we need a fresh export
        const needsSync = lastUpdate > lastSync;

        res.json({
            needsSync,
            lastSyncAt: settings.last_sync_at,
            lastUpdateAt: settings.content_updated_at
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API Endpoints

// Get all posts
app.get('/api/posts', (req, res) => {
    try {
        const posts = db.prepare('SELECT * FROM posts ORDER BY created_at DESC').all();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get single post
app.get('/api/posts/:slug', (req, res) => {
    try {
        const post = db.prepare('SELECT * FROM posts WHERE slug = ?').get(req.params.slug);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const seo = db.prepare('SELECT * FROM seo_meta WHERE post_id = ?').get(post.id);
        res.json({ ...post, seo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create/Update post
app.post('/api/posts', (req, res) => {
    try {
        const { id, title, slug, category, excerpt, content, status, seo } = req.body;

        let postId = id;

        if (id) {
            // Update
            db.prepare(`
                UPDATE posts SET title = ?, slug = ?, category = ?, excerpt = ?, content = ?, status = ?, updated_at = CURRENT_TIMESTAMP
                WHERE id = ?
            `).run(title, slug, category, excerpt, JSON.stringify(content), status, id);
        } else {
            // Create
            const info = db.prepare(`
                INSERT INTO posts (title, slug, category, excerpt, content, status)
                VALUES (?, ?, ?, ?, ?, ?)
            `).run(title, slug, category, excerpt, JSON.stringify(content), status || 'draft');
            postId = info.lastInsertRowid;
        }

        // Handle SEO
        if (seo) {
            db.prepare('INSERT OR REPLACE INTO seo_meta (post_id, meta_title, meta_description, keywords) VALUES (?, ?, ?, ?)').run(postId, seo.meta_title, seo.meta_description, seo.keywords);
        }

        // Track that content changed
        db.prepare('UPDATE settings SET content_updated_at = CURRENT_TIMESTAMP WHERE id = 1').run();

        res.json({ success: true, id: postId });
    } catch (error) {
        if (error.message.includes('UNIQUE constraint failed: posts.slug')) {
            return res.status(409).json({ error: 'Slug already exists. Please choose a different URL slug.' });
        }
        res.status(500).json({ error: error.message });
    }
});

// Delete post
app.delete('/api/posts/:id', (req, res) => {
    try {
        const { id } = req.params;
        db.prepare('DELETE FROM seo_meta WHERE post_id = ?').run(id);
        db.prepare('DELETE FROM posts WHERE id = ?').run(id);

        // Track that content changed (crucial for deletions!)
        db.prepare('UPDATE settings SET content_updated_at = CURRENT_TIMESTAMP WHERE id = 1').run();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Build-time static generator
app.post('/api/generate-static', (req, res) => {
    console.log('🚀 Static generation triggered from Dashboard...');
    const scriptPath = path.resolve(__dirname, '../scripts/generate-static.js');

    exec(`node "${scriptPath}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).json({ success: false, error: error.message });
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }
        console.log(`Stdout: ${stdout}`);
        res.json({ success: true, message: 'Static files generated successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`CMS Server running on http://localhost:${PORT}`);
});
