import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new Database(dbPath);

// Initialize tables
db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT,
        excerpt TEXT,
        content JSON, -- Editor.js output is JSON
        status TEXT DEFAULT 'draft', -- draft, published
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS seo_meta (
        post_id INTEGER PRIMARY KEY,
        meta_title TEXT,
        meta_description TEXT,
        og_image TEXT,
        keywords TEXT,
        FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY CHECK (id = 1),
        last_sync_at DATETIME,
        content_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

// Initialize settings if empty
const count = db.prepare('SELECT COUNT(*) as count FROM settings').get().count;
if (count === 0) {
    db.prepare('INSERT INTO settings (id, last_sync_at, content_updated_at) VALUES (1, NULL, CURRENT_TIMESTAMP)').run();
}

console.log('Database initialized at:', dbPath);

export default db;
