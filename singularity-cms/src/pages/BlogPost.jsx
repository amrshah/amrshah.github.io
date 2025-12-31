import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SingularityHeader from '../components/Header/SingularityHeader';
import ContentRenderer from '../components/ContentRenderer';

const BlogPost = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                // Try local development API first
                let response = await fetch(`http://localhost:5555/api/posts/${slug}`).catch(() => null);

                // Fallback to static JSON
                if (!response || !response.ok) {
                    response = await fetch(`/api/${slug}.json`);
                }

                if (!response || !response.ok) throw new Error('Post not found');

                const data = await response.json();

                // Parse content if it's a string (saved as JSON in SQLite)
                if (typeof data.content === 'string') {
                    data.content = JSON.parse(data.content);
                }

                setPost(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching post:', error);
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) return (
        <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', color: '#c9d1d9' }}>
            <p className="w3-center w3-padding-64">Loading insight...</p>
        </div>
    );

    if (!post) return (
        <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', color: '#c9d1d9' }}>
            <div className="w3-center w3-padding-64">
                <h2>Insight not found.</h2>
                <Link to="/blog" style={{ color: '#58a6ff' }}>Return to Blog Index</Link>
            </div>
        </div>
    );

    return (
        <div style={{ backgroundColor: '#0d1117', minHeight: '100vh', color: '#e6edf3', paddingBottom: '120px' }}>
            <SingularityHeader title={post.title} subtitle={post.category} />

            <div className="w3-content w3-padding-64" style={{ maxWidth: '850px' }}>
                <Link to="/blog" style={{ color: '#58a6ff', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', fontWeight: '600' }}>
                    <span style={{ fontSize: '1.2rem' }}>←</span> Back to Insights Archive
                </Link>

                <header style={{ marginBottom: '48px', borderBottom: '1px solid #30363d', paddingBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', color: '#8b949e', fontSize: '0.9rem', fontWeight: '500' }}>
                        <span style={{ background: 'rgba(31, 111, 235, 0.15)', color: '#58a6ff', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold' }}>{post.category}</span>
                        <span>•</span>
                        <span>PUBLISHED ON {new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                </header>

                <ContentRenderer blocks={post.content.blocks} />

                <div style={{ marginTop: '80px', padding: '48px', background: 'linear-gradient(135deg, #161b22 0%, #0d1117 100%)', border: '1px solid #30363d', borderRadius: '16px', textAlign: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Intrigued by {post.category}?</h3>
                    <p style={{ color: '#8b949e', marginBottom: '32px' }}>Ali Raza specializes in architecting robust enterprise systems and AI-driven automation workflows.</p>
                    <Link to="/" className="btn-premium">Initiate Collaboration</Link>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
