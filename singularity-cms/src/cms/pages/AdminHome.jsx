import React, { useEffect, useState } from 'react';
import {
    FileText,
    Database,
    Eye,
    Zap,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    const [stats, setStats] = useState({
        total: 0,
        published: 0,
        drafts: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('http://localhost:5555/api/posts');
                const data = await response.json();
                setStats({
                    total: data.length,
                    published: data.filter(p => p.status === 'published').length,
                    drafts: data.filter(p => p.status !== 'published').length
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    const cards = [
        { label: 'Total Insights', value: stats.total, icon: FileText, color: '#58a6ff' },
        { label: 'Live on Site', value: stats.published, icon: Zap, color: '#3fb950' },
        { label: 'Drafts', value: stats.drafts, icon: Database, color: '#d29922' },
    ];

    return (
        <div>
            <div style={{ marginBottom: '48px' }}>
                <h1 style={{ margin: '0 0 12px 0', fontSize: '2.4rem', color: '#fff' }}>Welcome back, Ali.</h1>
                <p style={{ margin: 0, color: '#8b949e', fontSize: '1.1rem' }}>The Singularity CMS is operational. All systems are nominal.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '48px' }}>
                {cards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <div key={i} style={{
                            background: '#161b22',
                            padding: '32px',
                            borderRadius: '16px',
                            border: '1px solid #30363d'
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ fontSize: '0.9rem', color: '#8b949e', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>{card.label}</div>
                                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>{card.value}</div>
                                </div>
                                <div style={{ background: `${card.color}20`, padding: '12px', borderRadius: '12px' }}>
                                    <Icon size={24} color={card.color} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div style={{ background: '#161b22', borderRadius: '16px', border: '1px solid #30363d', padding: '32px' }}>
                <h3 style={{ margin: '0 0 24px 0', fontSize: '1.2rem', color: '#fff' }}>Quick Actions</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                    <Link to="/admin/new" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px 24px',
                        background: '#238636',
                        color: '#fff',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        fontWeight: '600'
                    }}>
                        <span>Write New Insight</span>
                        <ArrowRight size={20} />
                    </Link>
                    <Link to="/admin/posts" style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '20px 24px',
                        background: '#21262d',
                        color: '#fff',
                        borderRadius: '12px',
                        textDecoration: 'none',
                        border: '1px solid #30363d',
                        fontWeight: '600'
                    }}>
                        <span>Manage All Posts</span>
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
