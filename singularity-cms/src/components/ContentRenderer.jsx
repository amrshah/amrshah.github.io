import React from 'react';

const ContentRenderer = ({ blocks }) => {
    if (!blocks) return null;

    return (
        <div className="content-renderer" style={{ maxWidth: '800px', margin: '0 auto' }}>
            {blocks.map((block, index) => {
                switch (block.type) {
                    case 'header':
                        const Tag = `h${block.data.level}`;
                        const fontSize = block.data.level === 1 ? '2.5rem' : block.data.level === 2 ? '2rem' : '1.5rem';
                        return <Tag key={index} style={{ color: '#fff', marginTop: '48px', marginBottom: '16px', fontSize }}>{block.data.text}</Tag>;

                    case 'paragraph':
                        return <p key={index} dangerouslySetInnerHTML={{ __html: block.data.text }} style={{ color: 'var(--text-primary)', lineHeight: '1.9', fontSize: '1.15rem', marginBottom: '24px', textAlign: 'justify' }}></p>;

                    case 'list':
                        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
                        return (
                            <ListTag key={index} style={{ color: 'var(--text-primary)', paddingLeft: '24px', marginBottom: '24px', fontSize: '1.1rem', lineHeight: '1.8' }}>
                                {block.data.items.map((item, i) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} style={{ marginBottom: '12px' }}></li>
                                ))}
                            </ListTag>
                        );

                    case 'code':
                        return (
                            <div key={index} style={{ margin: '32px 0' }}>
                                <pre style={{ backgroundColor: '#161b22', padding: '24px', borderRadius: '12px', border: '1px solid #30363d', overflowX: 'auto', fontSize: '0.95rem' }}>
                                    <code style={{ color: '#e6edf3', fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace' }}>{block.data.code}</code>
                                </pre>
                            </div>
                        );

                    case 'image':
                        return (
                            <div key={index} style={{ textAlign: 'center', margin: '48px 0' }}>
                                <img src={block.data.file.url} alt={block.data.caption} style={{ maxWidth: '100%', borderRadius: '12px', border: '1px solid #30363d' }} />
                                {block.data.caption && <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '16px', fontStyle: 'italic' }}>{block.data.caption}</p>}
                            </div>
                        );

                    case 'table':
                        return (
                            <div key={index} style={{ overflowX: 'auto', margin: '40px 0' }}>
                                <table className="w3-table w3-bordered" style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
                                    <tbody>
                                        {block.data.content.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid #30363d' }}>
                                                {row.map((cell, j) => (
                                                    <td key={j} dangerouslySetInnerHTML={{ __html: cell }} style={{ padding: '16px' }}></td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        );

                    case 'embed':
                        return (
                            <div key={index} style={{ margin: '48px 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid #30363d' }}>
                                <iframe
                                    width="100%"
                                    height="450"
                                    src={block.data.embed}
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    title="embed"
                                ></iframe>
                            </div>
                        );

                    default:
                        console.warn('Unknown block type:', block.type);
                        return null;
                }
            })}
        </div>
    );
};

export default ContentRenderer;
