import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SingularityHeader from '../components/Header/SingularityHeader';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Try local development API first
                let response = await fetch('http://localhost:5555/api/posts').catch(() => null);

                // Fallback to static JSON if local API is not available (e.g., in production)
                if (!response || !response.ok) {
                    response = await fetch('/api/posts.json');
                }

                const data = await response.json();
                // If it's the static JSON, it's already filtered by the sync script
                // If it's the dev API, we filter it here
                const publishedPosts = Array.isArray(data) ? data.filter(p => !p.status || p.status === 'published') : [];

                setPosts(publishedPosts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', color: '#e6edf3' }}>
            <SingularityHeader title="Singularity Insights" subtitle="Research, Architecture & AI" />

            <div className="w3-content w3-padding-64" style={{ maxWidth: '900px' }}>
                <div className="w3-row w3-center w3-margin-bottom" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '48px' }}>
                    <Link to="/" className="w3-button w3-dark-grey w3-round-large" style={{ border: '1px solid #30363d' }}>← Back to Portfolio</Link>
                    <Link to="/admin" className="w3-button w3-indigo w3-round-large" style={{ background: '#1f6feb' }}>Mission Control</Link>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '100px 0' }}>
                        <div className="spin" style={{ display: 'inline-block', border: '4px solid #30363d', borderTopColor: '#58a6ff', borderRadius: '50%', width: '40px', height: '40px' }}></div>
                        <p style={{ marginTop: '16px', color: '#8b949e' }}>Analyzing Archives...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="w3-center w3-padding-64" style={{ background: '#161b22', borderRadius: '16px', border: '1px solid #30363d' }}>
                        <h3 style={{ color: '#fff' }}>No insights found.</h3>
                        <p style={{ color: '#8b949e' }}>The archives are currently empty. Check back soon for research updates.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {posts.map(post => (
                            <Link key={post.id} to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                                <div style={{
                                    background: '#161b22',
                                    padding: '40px',
                                    borderRadius: '16px',
                                    border: '1px solid #30363d',
                                    transition: 'transform 0.2s, border-color 0.2s',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.borderColor = '#58a6ff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.borderColor = '#30363d';
                                    }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                        <span style={{
                                            background: 'rgba(31, 111, 235, 0.15)',
                                            color: '#58a6ff',
                                            padding: '6px 14px',
                                            borderRadius: '20px',
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}>{post.category}</span>
                                        <span style={{ color: '#6e7681', fontSize: '0.85rem' }}>{new Date(post.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <h2 style={{ fontSize: '1.75rem', color: '#fff', margin: '0 0 16px 0', lineHeight: '1.3' }}>{post.title}</h2>
                                    <p style={{ color: '#8b949e', fontSize: '1.1rem', margin: '0', display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {post.excerpt}
                                    </p>
                                    <div style={{ marginTop: '24px', color: '#58a6ff', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        Read Insight <span style={{ transition: 'transform 0.2s' }}>→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList;
