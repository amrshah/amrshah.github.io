import db from '../server/db.js';

const drafts = [
    {
        title: 'The "Accounting-First" Logic in Web Systems',
        slug: 'accounting-first-logic',
        category: 'Finance',
        excerpt: 'Why every business system should fundamentally be a ledger. Exploring the rigors of financial systems and why double-entry bookkeeping is a must for auditable logs.',
        status: 'published',
        content: {
            time: Date.now(),
            blocks: [
                {
                    type: 'paragraph',
                    data: { text: 'In 17 years of architecting enterprise systems, I\'ve seen one recurring failure: systems that treat "money" as just another column in a database. When you\'re building for scale and auditability, money isn\'t a state—it\'s a history.' }
                },
                {
                    type: 'header',
                    data: { text: '1. The "Tally" Approach', level: 2 }
                },
                {
                    type: 'paragraph',
                    data: { text: 'Most developers start by adding a <code>balance</code> field to a <code>users</code> table. This is the first step toward a reconciliation nightmare. A proper financial system focuses on the <b>transaction log</b>. The balance is merely the sum of all transactions.' }
                },
                {
                    type: 'header',
                    data: { text: '2. Double-Entry Bookkeeping for Developers', level: 2 }
                },
                {
                    type: 'paragraph',
                    data: { text: 'Double-entry isn\'t just for accountants; it\'s a powerful pattern for data integrity. Every transaction must have at least one debit and one credit that balance out to zero.' }
                },
                {
                    type: 'code',
                    data: { code: '// A simple ledger entry in Laravel\n$transaction = Ledger::create([\n    \'description\' => \'Service Payment\',\n    \'amount\' => \'150.00\',\n]);\n\n$transaction->entries()->createMany([\n    [\'account_id\' => $customer_account, \'type\' => \'debit\', \'amount\' => \'150.00\'],\n    [\'account_id\' => $revenue_account, \'type\' => \'credit\', \'amount\' => \'150.00\'],\n]);' }
                },
                {
                    type: 'header',
                    data: { text: '3. The BCMath Non-Negotiable', level: 2 }
                },
                {
                    type: 'paragraph',
                    data: { text: 'Floating-point math is the enemy of financial accuracy. In PHP, using <code>bcadd()</code>, <code>bcsub()</code>, and related functions is essential to maintain precision.' }
                },
                {
                    type: 'code',
                    data: { code: '// Precision math for financial systems\n$price = \'19.99\';\n$tax_rate = \'0.05\';\n$tax = bcmul($price, $tax_rate, 2); // \'0.99\'\n$total = bcadd($price, $tax, 2);    // \'20.98\'' }
                }
            ],
            version: '2.31.0'
        }
    },
    {
        title: 'The Vision: The 90% Autonomous Agency',
        slug: 'autonomous-agency-vision',
        category: 'AI Agents',
        excerpt: 'Can we really automate nearly all operations of a marketing agency? A deep dive into the architecture of multi-agent systems and the role of Laravel in the backend.',
        status: 'published',
        content: {
            time: Date.now(),
            blocks: [
                {
                    type: 'paragraph',
                    data: { text: 'The goal is ambitious: build a system where the human provides the "Creative Direction" and "Strategy," while a swarm of AI agents handles the execution, reporting, and optimization. This is <b>Multi-Agent Orchestration (MAO)</b>.' }
                },
                {
                    type: 'header',
                    data: { text: 'The Supervisor Pattern', level: 2 }
                },
                {
                    type: 'paragraph',
                    data: { text: 'In a complex agency environment, we implement a "Supervisor" agent that acts as a project manager. It decomposes a strategy into tasks, assigns them to specialized "Worker" agents, and verifies the output.' }
                },
                {
                    type: 'code',
                    data: { code: '// Pseudocode for Supervisor Delegation\nconst strategy = "Increase organic traffic by 20% in Q1";\nconst tasks = supervisor.decompose(strategy);\n\ntasks.forEach(task => {\n    const worker = Orchestrator.getBestWorkerFor(task.type);\n    worker.execute(task).then(result => {\n        supervisor.validate(result);\n    });\n});' }
                },
                {
                    type: 'header',
                    data: { text: 'Why Laravel?', level: 2 }
                },
                {
                    type: 'paragraph',
                    data: { text: 'While Python is king of AI libraries, Laravel is the king of enterprise stability. Using Laravel\'s robust <b>Queue system</b> and <b>State Machines</b>, we can manage long-running agentic workflows.' }
                }
            ],
            version: '2.31.0'
        }
    }
];

function migrate() {
    console.log('🚚 Starting Migration of Drafts...');

    const insertPost = db.prepare(`
        INSERT OR REPLACE INTO posts (title, slug, category, excerpt, content, status)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    const insertSEO = db.prepare(`
        INSERT OR REPLACE INTO seo_meta (post_id, meta_title, meta_description, keywords)
        VALUES (?, ?, ?, ?)
    `);

    for (const post of drafts) {
        const info = insertPost.run(
            post.title,
            post.slug,
            post.category,
            post.excerpt,
            JSON.stringify(post.content),
            post.status
        );

        insertSEO.run(
            info.lastInsertRowid,
            post.title,
            post.excerpt,
            'architecture, finance, ai agents, laravel'
        );

        console.log(`✅ Migrated: ${post.title}`);
    }

    console.log('✨ All drafts migrated to SQLite!');
    process.exit(0);
}

migrate();
