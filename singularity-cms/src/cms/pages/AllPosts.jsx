import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Eye, Trash2, Plus } from 'lucide-react';

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5555/api/posts?c=${Date.now()}`);
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this insight? This cannot be undone.')) return;

        try {
            const response = await fetch(`http://localhost:5555/api/posts/${id}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.success) {
                alert('Insight deleted from SQLite.');
                fetchPosts();
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1 style={{ margin: 0, fontSize: '1.8rem' }}>All Posts</h1>
                <Link to="/admin/new" className="btn-premium" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={18} /> Add New
                </Link>
            </div>

            <div style={{ background: '#161b22', borderRadius: '12px', border: '1px solid #30363d', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #30363d', color: '#8b949e' }}>
                            <th style={{ padding: '16px 24px' }}>Title</th>
                            <th style={{ padding: '16px 24px' }}>Category</th>
                            <th style={{ padding: '16px 24px' }}>Status</th>
                            <th style={{ padding: '16px 24px' }}>Date</th>
                            <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center' }}>Loading posts...</td></tr>
                        ) : posts.length === 0 ? (
                            <tr><td colSpan="5" style={{ padding: '40px', textAlign: 'center' }}>No posts found.</td></tr>
                        ) : posts.map((post) => (
                            <tr key={post.id} style={{ borderBottom: '1px solid #21262d', transition: 'background 0.2s' }} className="hover-row">
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ fontWeight: '600', color: '#fff' }}>{post.title}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>/{post.slug}</div>
                                </td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{ padding: '4px 8px', borderRadius: '4px', background: '#30363d', fontSize: '0.85rem' }}>{post.category}</span>
                                </td>
                                <td style={{ padding: '16px 24px' }}>
                                    <span style={{
                                        padding: '4px 12px',
                                        borderRadius: '20px',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                        background: post.status === 'published' ? 'rgba(35, 134, 54, 0.2)' : 'rgba(139, 148, 158, 0.2)',
                                        color: post.status === 'published' ? '#3fb950' : '#8b949e',
                                        border: post.status === 'published' ? '1px solid rgba(63, 185, 80, 0.4)' : '1px solid rgba(139, 148, 158, 0.4)'
                                    }}>
                                        {post.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 24px', color: '#8b949e' }}>
                                    {new Date(post.created_at).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                        <Link to={`/admin/edit/${post.slug}`} style={{ background: '#30363d', color: '#fff', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                                            <Edit2 size={16} />
                                        </Link>
                                        <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer" style={{ background: '#30363d', color: '#fff', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                                            <Eye size={16} />
                                        </a>
                                        <button onClick={() => handleDelete(post.id)} style={{ background: 'rgba(248, 81, 73, 0.1)', color: '#f85149', border: 'none', padding: '6px', borderRadius: '4px', cursor: 'pointer' }}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <style>{`
                .hover-row:hover {
                    background-color: #1c2128;
                }
            `}</style>
        </div>
    );
};

export default AllPosts;
