import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FilePlus,
    Files,
    Settings,
    Globe,
    LogOut,
    Zap
} from 'lucide-react';

const CMSLayout = ({ children }) => {
    const location = useLocation();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: FilePlus, label: 'Add New Post', path: '/admin/new' },
        { icon: Files, label: 'All Posts', path: '/admin/posts' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0d1117', color: '#c9d1d9' }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                backgroundColor: '#161b22',
                borderRight: '1px solid #30363d',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh'
            }}>
                <div style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #30363d' }}>
                    <div style={{ background: '#58a6ff', padding: '8px', borderRadius: '8px' }}>
                        <Zap size={20} color="#0d1117" />
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#fff', letterSpacing: '1px' }}>SINGULARITY</span>
                </div>

                <nav style={{ padding: '20px 12px', flexGrow: 1 }}>
                    {menuItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 16px',
                                    marginBottom: '4px',
                                    textDecoration: 'none',
                                    color: isActive ? '#fff' : '#8b949e',
                                    backgroundColor: isActive ? '#21262d' : 'transparent',
                                    borderRadius: '6px',
                                    transition: 'all 0.2s',
                                    borderLeft: isActive ? '3px solid #58a6ff' : '3px solid transparent'
                                }}
                            >
                                <Icon size={18} />
                                <span style={{ fontSize: '0.95rem', fontWeight: isActive ? '600' : '400' }}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ padding: '20px 12px', borderTop: '1px solid #30363d' }}>
                    <Link
                        to="/"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            textDecoration: 'none',
                            color: '#8b949e',
                            borderRadius: '6px'
                        }}
                    >
                        <Globe size={18} />
                        <span style={{ fontSize: '0.95rem' }}>View Site</span>
                    </Link>
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            padding: '12px 16px',
                            width: '100%',
                            background: 'none',
                            border: 'none',
                            color: '#f85149',
                            cursor: 'pointer',
                            textAlign: 'left'
                        }}
                    >
                        <LogOut size={18} />
                        <span style={{ fontSize: '0.95rem' }}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ flexGrow: 1, marginLeft: '260px', padding: '40px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    {children}
                </div>
            </main>
        </div>
    );
};

export default CMSLayout;
