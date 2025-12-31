import db from '../server/db.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_DIR = path.resolve(__dirname, '../public/api');

async function generate() {
    console.log('🚀 Starting Static Generation...');

    // 1. Ensure public/api directory exists and is clean
    if (fs.existsSync(PUBLIC_DIR)) {
        console.log('🧹 Cleaning old static files...');
        const files = fs.readdirSync(PUBLIC_DIR);
        for (const file of files) {
            fs.unlinkSync(path.join(PUBLIC_DIR, file));
        }
    } else {
        fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    }

    try {
        // 2. Fetch all published posts
        const posts = db.prepare("SELECT * FROM posts WHERE status = 'published' ORDER BY created_at DESC").all();

        // 3. Save posts.json for the listing page
        // We strip the large 'content' field to keep the index light
        const listData = posts.map(p => ({
            id: p.id,
            title: p.title,
            slug: p.slug,
            category: p.category,
            excerpt: p.excerpt,
            created_at: p.created_at
        }));

        fs.writeFileSync(
            path.join(PUBLIC_DIR, 'posts.json'),
            JSON.stringify(listData, null, 2)
        );
        console.log('✅ Generated public/api/posts.json');

        // 4. Save individual post files
        for (const post of posts) {
            const seo = db.prepare('SELECT * FROM seo_meta WHERE post_id = ?').get(post.id);
            const fullPost = { ...post, seo };

            // Parse content if needed
            if (typeof fullPost.content === 'string') {
                fullPost.content = JSON.parse(fullPost.content);
            }

            fs.writeFileSync(
                path.join(PUBLIC_DIR, `${post.slug}.json`),
                JSON.stringify(fullPost, null, 2)
            );
            console.log(`✅ Generated public/api/${post.slug}.json`);
        }

        // 5. Update last_sync_at in database
        db.prepare('UPDATE settings SET last_sync_at = CURRENT_TIMESTAMP WHERE id = 1').run();

        console.log('✨ Static Sync Complete!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Generation Failed:', error);
        process.exit(1);
    }
}

generate();
