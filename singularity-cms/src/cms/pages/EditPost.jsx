import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import { Save, ArrowLeft, Trash2 } from 'lucide-react';

const EditPost = () => {
    const { slug: urlSlug } = useParams();
    const navigate = useNavigate();
    const editorInstance = useRef(null);

    const [postId, setPostId] = useState(null);
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [category, setCategory] = useState('Tech');
    const [status, setStatus] = useState('draft');
    const [excerpt, setExcerpt] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Handle initialization
        const setup = async () => {
            if (urlSlug) {
                await fetchPost(urlSlug);
            } else {
                initEditor({});
            }
        };

        setup();

        return () => {
            if (editorInstance.current && editorInstance.current.destroy) {
                editorInstance.current.destroy();
                editorInstance.current = null;
            }
        };
    }, [urlSlug]);

    const fetchPost = async (s) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5555/api/posts/${s}`);
            const data = await response.json();

            setPostId(data.id);
            setTitle(data.title);
            setSlug(data.slug);
            setCategory(data.category);
            setStatus(data.status);
            setExcerpt(data.excerpt);

            const content = typeof data.content === 'string' ? JSON.parse(data.content) : data.content;
            initEditor(content);
        } catch (error) {
            console.error('Error fetching post:', error);
        } finally {
            setLoading(false);
        }
    };

    const initEditor = (initialData = {}) => {
        // Clean up previous instance before creating new one
        if (editorInstance.current) {
            if (editorInstance.current.destroy) editorInstance.current.destroy();
            editorInstance.current = null;
        }

        // Wait a tick for DOM to clean up and ensure container is empty
        setTimeout(() => {
            const holder = document.getElementById('editorjs-container');
            if (holder) holder.innerHTML = '';

            editorInstance.current = new EditorJS({
                holder: 'editorjs-container',
                tools: {
                    header: Header,
                    list: List,
                    code: Code,
                    linkTool: LinkTool,
                    embed: Embed,
                    table: Table,
                },
                placeholder: 'Start writing your architectural insight...',
                data: initialData
            });
        }, 0);
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this insight? This cannot be undone.')) return;

        try {
            const response = await fetch(`http://localhost:5555/api/posts/${postId}`, {
                method: 'DELETE'
            });
            const result = await response.json();
            if (result.success) {
                alert('Post deleted from SQLite.');
                navigate('/admin/posts');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    const handleSave = async () => {
        if (!title || !slug) {
            alert('Please provide a title and slug.');
            return;
        }

        setSaving(true);
        const savedData = await editorInstance.current.save();
        const postData = {
            id: postId,
            title,
            slug,
            category,
            status,
            excerpt,
            content: savedData,
            seo: {
                meta_title: title,
                meta_description: excerpt,
                keywords: 'tech, code, singularity, ' + category
            }
        };

        try {
            const response = await fetch('http://localhost:5555/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            });
            const result = await response.json();

            if (response.ok) {
                if (!postId) {
                    setPostId(result.id);
                    navigate(`/admin/edit/${slug}`, { replace: true });
                }
                setLastSaved(new Date().toLocaleTimeString());
                setTimeout(() => setLastSaved(null), 3000);
            } else {
                alert(`Error: ${result.error || 'Failed to save post'}`);
            }
        } catch (error) {
            console.error('Error saving post:', error);
            alert('CRITICAL: Server connection lost. Dashboard may be offline.');
        } finally {
            setSaving(false);
        }
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        // Only auto-generate slug if we're creating a new post
        if (!urlSlug) {
            const newSlug = newTitle
                .toLowerCase()
                .replace(/[^\w\s-]/g, '') // Remove non-word chars
                .replace(/\s+/g, '-')     // Replace spaces with -
                .replace(/-+/g, '-')      // Replace multiple - with single -
                .trim();
            setSlug(newSlug);
        }
    };

    if (loading) return <div>Loading post data...</div>;

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button onClick={() => navigate('/admin/posts')} style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', padding: '8px' }}>
                        <ArrowLeft size={20} />
                    </button>
                    <h1 style={{ margin: 0, fontSize: '1.8rem' }}>{urlSlug ? 'Edit Post' : 'Write New Insight'}</h1>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {lastSaved && (
                        <span style={{ fontSize: '0.85rem', color: '#3fb950', fontWeight: '500' }}>
                            Last saved at {lastSaved}
                        </span>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="btn-premium"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: saving ? 0.7 : 1 }}
                    >
                        <Save size={18} className={saving ? 'spin' : ''} />
                        {saving ? 'Saving...' : urlSlug ? 'Update Post' : 'Save Draft'}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '32px' }}>
                {/* Editor Content Area */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={{ background: '#161b22', padding: '32px', borderRadius: '12px', border: '1px solid #30363d' }}>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Post Title"
                            style={{
                                width: '100%',
                                padding: '12px 0',
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid #30363d',
                                color: '#fff',
                                fontSize: '2.5rem',
                                fontWeight: '700',
                                marginBottom: '24px',
                                outline: 'none'
                            }}
                        />

                        <div id="editorjs-container" className="editor-dark" style={{ minHeight: '500px' }}></div>
                    </div>
                </div>

                {/* Sidebar options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {/* Publishing Box */}
                    <div style={{ background: '#161b22', padding: '24px', borderRadius: '12px', border: '1px solid #30363d' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '1rem', color: '#fff' }}>Publish Status</h3>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: '#8b949e' }}>Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0d1117', color: 'white', border: '1px solid #30363d' }}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: '#8b949e' }}>Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#0d1117', color: 'white', border: '1px solid #30363d' }}
                            >
                                <option value="Architecture">Architecture</option>
                                <option value="Finance">Finance</option>
                                <option value="AI Agents">AI Agents</option>
                                <option value="Laravel">Laravel</option>
                                <option value="Performance">Performance</option>
                                <option value="TIL">TIL</option>
                            </select>
                        </div>
                    </div>

                    {/* Metadata Box */}
                    <div style={{ background: '#161b22', padding: '24px', borderRadius: '12px', border: '1px solid #30363d' }}>
                        <h3 style={{ margin: '0 0 20px 0', fontSize: '1rem', color: '#fff' }}>Post URL & SEO</h3>

                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: '#8b949e' }}>Slug</label>
                            <input
                                type="text"
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                placeholder="post-url-slug"
                                style={{ width: '100%', padding: '10px', background: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '6px', fontSize: '0.85rem' }}
                            />
                        </div>

                        <div style={{ marginBottom: '0' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: '#8b949e' }}>Excerpt</label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                placeholder="Short summary for SEO..."
                                style={{ width: '100%', padding: '10px', background: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '6px', minHeight: '100px', fontSize: '0.85rem', resize: 'vertical' }}
                            />
                        </div>
                    </div>

                    {urlSlug && (
                        <button
                            onClick={handleDelete}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(248, 81, 73, 0.1)',
                                color: '#f85149',
                                border: '1px solid rgba(248, 81, 73, 0.4)',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '0.9rem',
                                fontWeight: '600'
                            }}
                        >
                            <Trash2 size={16} /> Delete Post
                        </button>
                    )}
                </div>
            </div>

            <style>{`
                .ce-block__content, .ce-toolbar__content { max-width: 100%; }
                .editor-dark .ce-paragraph { color: #c9d1d9; font-size: 1.1rem; line-height: 1.8; }
                .editor-dark .ce-header { color: #fff; margin-top: 2rem; }
                .editor-dark .codex-editor__redactor { padding-bottom: 200px !important; }
                .editor-dark .ce-toolbar__plus, .editor-dark .ce-toolbar__settings-btn { background-color: #30363d; color: #fff; }
                /* Custom styles for Editor.js blocks in dark mode can be added here */
            `}</style>
        </div>
    );
};

export default EditPost;
