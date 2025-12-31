import React, { useState, useEffect } from 'react';
import {
    RefreshCw,
    HardDrive,
    Save,
    Shield
} from 'lucide-react';

const Settings = () => {
    const [syncing, setSyncing] = useState(false);
    const [syncStatus, setSyncStatus] = useState({ needsSync: false, lastSyncAt: null });

    const fetchSyncStatus = async () => {
        try {
            const response = await fetch('http://localhost:5555/api/sync-status');
            const data = await response.json();
            setSyncStatus(data);
        } catch (error) {
            console.error('Failed to fetch sync status:', error);
        }
    };

    useEffect(() => {
        fetchSyncStatus();
    }, []);

    const handleSync = async () => {
        setSyncing(true);
        try {
            const response = await fetch('http://localhost:5555/api/generate-static', {
                method: 'POST'
            });
            const data = await response.json();
            if (data.success) {
                alert('Success: Static files synchronized to public/api/ folder.');
                fetchSyncStatus();
            }
        } catch (error) {
            console.error('Sync failed:', error);
            alert('Error: CMS API unavailable.');
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div>
            <div style={{ marginBottom: '48px' }}>
                <h1 style={{ margin: '0 0 12px 0', fontSize: '1.8rem', color: '#fff' }}>CMS Settings</h1>
                <p style={{ margin: 0, color: '#8b949e' }}>System configuration and maintenance utilities.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Sync Section */}
                <section style={{
                    background: '#161b22',
                    padding: '32px',
                    borderRadius: '16px',
                    border: '1px solid',
                    borderColor: syncStatus.needsSync ? '#238636' : '#30363d'
                }}>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <div style={{
                            background: syncStatus.needsSync ? 'rgba(35, 134, 54, 0.1)' : 'rgba(139, 148, 158, 0.1)',
                            padding: '16px',
                            borderRadius: '12px',
                            height: 'fit-content'
                        }}>
                            <RefreshCw size={24} color={syncStatus.needsSync ? '#3fb950' : '#8b949e'} className={syncing ? 'spin' : ''} />
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <h3 style={{ margin: '0 0 8px 0', color: '#fff' }}>Deploy Static Files</h3>
                                    <p style={{ color: '#8b949e', marginBottom: '24px', lineHeight: '1.6', maxWidth: '600px' }}>
                                        {syncStatus.needsSync
                                            ? "Changes detected! Your local database has updates that haven't been exported to the static API yet."
                                            : "System synchronized. Your static assets match the current published content in SQLite."}
                                    </p>
                                </div>
                                {syncStatus.lastSyncAt && (
                                    <div style={{ fontSize: '0.8rem', color: '#6e7681', textAlign: 'right' }}>
                                        LAST SYNC: {new Date(syncStatus.lastSyncAt.replace(' ', 'T') + 'Z').toLocaleString()}
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleSync}
                                disabled={syncing || !syncStatus.needsSync}
                                className={syncStatus.needsSync ? "btn-premium" : ""}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    background: !syncStatus.needsSync ? '#21262d' : undefined,
                                    color: !syncStatus.needsSync ? '#484f58' : undefined,
                                    border: !syncStatus.needsSync ? '1px solid #30363d' : undefined,
                                    cursor: !syncStatus.needsSync ? 'default' : 'pointer',
                                    padding: '12px 24px',
                                    borderRadius: '8px',
                                    fontWeight: '600'
                                }}
                            >
                                {syncing ? 'Syncing...' : syncStatus.needsSync ? 'Sync to Static Assets' : 'Already Synced'}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Database Info */}
                <section style={{ background: '#161b22', padding: '32px', borderRadius: '16px', border: '1px solid #30363d' }}>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <div style={{ background: 'rgba(210, 153, 34, 0.1)', padding: '16px', borderRadius: '12px', height: 'fit-content' }}>
                            <HardDrive size={24} color="#d29922" />
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            <h3 style={{ margin: '0 0 8px 0', color: '#fff' }}>Database Integrity</h3>
                            <p style={{ color: '#8b949e', marginBottom: '16px', lineHeight: '1.6' }}>
                                SQLite provides ACID compliance for your content. Database backups are automatically handled
                                by Git since the <code>database.sqlite</code> file is tracked in your local repository.
                            </p>
                            <div style={{ background: '#0d1117', padding: '12px 16px', borderRadius: '8px', border: '1px solid #30363d', fontFamily: 'monospace', color: '#7d8590' }}>
                                Location: /server/database.sqlite
                            </div>
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section style={{ background: '#161b22', padding: '32px', borderRadius: '16px', border: '1px solid #30363d' }}>
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <div style={{ background: 'rgba(240, 136, 62, 0.1)', padding: '16px', borderRadius: '12px', height: 'fit-content' }}>
                            <Shield size={24} color="#f0883e" />
                        </div>
                        <div style={{ flexGrow: 1 }}>
                            <h3 style={{ margin: '0 0 8px 0', color: '#fff' }}>CMS Access</h3>
                            <p style={{ color: '#8b949e', lineHeight: '1.6' }}>
                                Currently, this CMS is restricted to your **local environment** only. It cannot be accessed
                                via your <code>.github.io</code> URL, which ensures your drafts and local database are secure
                                from public access.
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .spin { animation: spin 2s linear infinite; }
            `}</style>
        </div>
    );
};

export default Settings;
