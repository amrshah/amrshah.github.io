import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SingularityHeader from '../components/Header/SingularityHeader';
import { BookOpen, Code, Cpu, Mail, MapPin, Phone, Briefcase, GraduationCap, ChevronRight, Star } from 'lucide-react';

const Home = () => {
    const [recentPosts, setRecentPosts] = useState([]);
    const [allProjectsVisible, setAllProjectsVisible] = useState(false);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const response = await fetch('http://localhost:5555/api/posts?c=' + Date.now());
                if (response.ok) {
                    const data = await response.json();
                    setRecentPosts(data.filter(p => p.status === 'published').slice(0, 3));
                } else {
                    const staticResponse = await fetch('/api/posts.json');
                    const staticData = await staticResponse.json();
                    setRecentPosts(staticData.slice(0, 3));
                }
            } catch (error) {
                // GitHub Pages has no local CMS API; fall back to the published static index.
                try {
                    const staticResponse = await fetch('/api/posts.json');
                    if (staticResponse.ok) {
                        const staticData = await staticResponse.json();
                        setRecentPosts(staticData.slice(0, 3));
                    }
                } catch (staticError) {
                    console.error('Could not load recent posts:', staticError);
                }
            }
        };
        fetchRecentPosts();
    }, []);

    const allProjects = [
        { year: '2026', name: 'Agentic Software Development Pipeline', tech: 'Agent Skills, JSON Schema, Validation, Observability', status: 'R&D', featured: true, category: 'AI Engineering', url: 'https://github.com/amrshah/production-grade-agent-skills' },
        { year: '2026', name: 'OrmEasy OS', tech: 'Laravel, WhatsApp APIs, PWA, Realtime Kitchen Display', status: 'In Development', featured: true, category: 'Business SaaS', url: 'https://github.com/amrshah/Whatsapp-Order-bot' },
        { year: '2026', name: 'Laravel Tenant Engine', tech: 'Laravel, Multi-tenancy, Sanctum, RBAC/ABAC', status: 'Open Source', featured: true, category: 'SaaS Infrastructure', url: 'https://github.com/amrshah/Larave-Tenant-Engine' },
        { year: '2026', name: 'Clinic Flow', tech: 'Next.js, TypeScript, Tailwind, Veterinary Workflows', status: 'Prototype', featured: true, category: 'Vertical SaaS', url: 'https://github.com/amrshah/clinic-ant' },
        { year: '2026', name: 'Alamia AI Bridge', tech: 'Provider Routing, OpenRouter, Groq, SambaNova, Ollama', status: 'R&D', featured: false, category: 'AI Infrastructure', url: 'https://github.com/amrshah/Alamia-AI-Bridge' },
        { year: '2026', name: 'NFV Readiness Standard', tech: 'Architecture Principles, Evidence-Based Readiness', status: 'Draft', featured: false, category: 'Engineering Strategy', url: 'https://github.com/amrshah/NFV-V1.0' },
        { year: '2026', name: 'Detectra API', tech: 'Python, FastAPI, YOLOv8, Docker', status: 'Experimental', featured: false, category: 'Computer Vision', url: 'https://github.com/amrshah/detectra-api' },
        { year: '2025', name: 'Silver AI', tech: 'PHP, SQLite, Google OAuth, Cloudflare AI Gateway', status: 'Prototype', featured: false, category: 'AI Applications', url: 'https://github.com/amrshah/silver-ai' },
        { year: '2024', name: 'AlamiaConnect CRM', tech: 'Laravel, CRM Workflows, SaaS Architecture', status: 'Product R&D', featured: false, category: 'Business SaaS', url: 'https://alamiaconnect.com' },
        { year: '2023', name: 'Laravel AI Ops', tech: 'Laravel, Modular AI Pipelines, Retrieval, Cost Controls', status: 'R&D', featured: false, category: 'AI Engineering', url: 'https://github.com/amrshah/laravel-ai-ops' },
        { year: '2022', name: 'Laravel ARBAC Package', tech: 'PHP, Laravel, Authorization', status: 'Historical', featured: false, category: 'Open Source', url: 'https://github.com/amrshah' },
        { year: '2021', name: 'WordPress Utility Plugins', tech: 'PHP, WordPress, JavaScript', status: 'Historical', featured: false, category: 'Web Development', url: 'https://github.com/amrshah' }
    ];

    return (
        <div style={{ backgroundColor: '#0d1117', color: '#e6edf3', fontFamily: 'Inter, system-ui, sans-serif' }}>
            <SingularityHeader />

            {/* Hero / Brand Intro */}
            <div className="w3-row">
                <div className="w3-half w3-black w3-container w3-center" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px', background: '#0d1117' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px', margin: '0 auto', width: '100%' }}>
                        <a href="#about" className="btn-premium" style={{ textDecoration: 'none', justifyContent: 'center', fontSize: '1.1rem' }}>Initiate Connection</a>
                        <a href="#experience" className="w3-button w3-dark-grey w3-round-large w3-padding-16" style={{ border: '1px solid #30363d', color: '#fff' }}>Professional Journey</a>
                        <a href="#portfolio" className="w3-button w3-dark-grey w3-round-large w3-padding-16" style={{ border: '1px solid #30363d', color: '#fff' }}>Selected Work & Product R&D</a>
                        <Link to="/blog" className="w3-button w3-indigo w3-round-large w3-padding-16" style={{ background: '#1f6feb', fontWeight: 'bold' }}>Research & Insights</Link>
                    </div>

                    <div style={{ marginTop: '64px', fontStyle: 'italic', opacity: 0.9, borderLeft: '4px solid #1f6feb', paddingLeft: '24px', textAlign: 'left', margin: '64px auto 0', maxWidth: '440px' }}>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#e6edf3', margin: '0' }}>
                            "Software engineering, AI product R&D, SaaS architecture, and technical delivery—grounded in what can be built, tested, and operated."
                        </p>
                        <div style={{ color: '#58a6ff', fontWeight: 'bold', marginTop: '12px', fontSize: '1rem' }}>— Ali Raza</div>
                    </div>
                </div>

                <div id="about" className="w3-half w3-container" style={{ minHeight: '690px', background: '#0d1117', borderLeft: '1px solid #30363d' }}>
                    <div className="w3-padding-64" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '32px' }}>About Me</h2>
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
                            <img src="/assets/images/amrshah.jpg" alt="Ali Raza" style={{ width: '200px', height: '200px', borderRadius: '50%', border: '4px solid #30363d', objectFit: 'cover' }} />
                        </div>
                        <div style={{ fontSize: '1.15rem', lineHeight: '1.8' }}>
                            <p>I am a software developer and technical leader working across business applications, SaaS platforms, backend systems, APIs, and AI-enabled products.</p>
                            <p>My experience spans PHP/Laravel development, enterprise and back-office workflows, mobile API backends, server administration, and earlier C/C++ work involving CUDA, high-performance computing, and distributed systems.</p>
                            <p>Today, as Senior Software Development Manager at Silver Ant Marketing / VexterSoft / IZOC, I combine hands-on product development with architecture, R&D, prioritization, and delivery coordination.</p>
                            <p>My engineering approach is pragmatic: keep systems understandable, use AI where it adds value, validate outputs, and distinguish prototypes from tested and production-proven software.</p>
                            <p style={{ color: '#58a6ff', fontWeight: '600', marginTop: '32px' }}>Open to relevant software engineering, AI application, SaaS architecture, and technical leadership opportunities.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Experience Section */}
            <div id="experience" className="w3-row" style={{ borderTop: '1px solid #30363d', borderBottom: '1px solid #30363d' }}>
                <div className="w3-half w3-center" style={{ minHeight: '800px', background: '#0d1117', padding: '64px' }}>
                    <div className="w3-padding-32">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff' }}>Professional Journey</h2>
                        <p style={{ color: '#8b949e' }}>Two decades of innovation, from C++ fundamentals to modern full-stack architecture</p>
                    </div>
                    <div className="w3-row-padding">
                        {['sts.png', 'hhcs.png', 'visa-consultant.png', 'rhyw.png'].map(img => (
                            <div key={img} className="w3-half w3-margin-bottom">
                                <img src={`/assets/images/${img}`} alt={img} style={{ width: '100%', borderRadius: '12px', border: '1px solid #30363d' }} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w3-half w3-container" style={{ minHeight: '800px', background: '#0d1117', padding: '64px', borderLeft: '1px solid #30363d' }}>
                    <div className="w3-center">
                        <h2 style={{ fontSize: '2rem', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>Career Highlights</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px' }}>
                            {[
                                { date: 'Apr 2025–Present', role: 'Senior Software Development Manager', detail: 'Silver Ant Marketing / VexterSoft / IZOC Solutions. Software product R&D, architecture, development planning, and technical delivery.' },
                                { date: '2021/22–Mid 2024', role: 'Backend Development & Server Administration', detail: 'KSA-based company and other clients. PHP/Laravel back-office systems, mobile API backends, and server operations.' },
                                { date: '2018/19–2020', role: 'Lab Engineer', detail: 'MYU. CUDA, C/C++, HPC labs, and distributed computing.' },
                                { date: '2016–2017', role: 'IT Manager', detail: 'Atif Distributors, medicine distribution, Azad Kashmir.' },
                                { date: '2014–2016', role: 'Tally ERP Development & Support', detail: 'Work with Ali Muzaffar at microSOFT Ocean Software House.' },
                                { date: 'Feb 2008–Oct 2010', role: 'Software Engineer', detail: 'Sofnix; full-stack development and enterprise application work.' },
                                { date: 'Ongoing Product R&D', role: 'Independent Software Products', detail: 'Parallel product experiments in SaaS, AI integrations, developer tooling, and business automation.' }
                            ].map((item, idx) => (
                                <div key={idx} style={{ background: '#161b22', padding: '24px', borderRadius: '12px', border: '1px solid #30363d', textAlign: 'left', display: 'flex', gap: '20px' }}>
                                    <div style={{ background: 'rgba(31, 111, 235, 0.2)', color: '#58a6ff', padding: '10px', borderRadius: '8px', height: 'fit-content', fontWeight: 'bold' }}>{item.date}</div>
                                    <div>
                                        <div style={{ color: '#fff', fontWeight: '700', fontSize: '1.1rem' }}>{item.role}</div>
                                        <div style={{ color: '#8b949e' }}>{item.detail}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Portfolio Section */}
            <div id="portfolio" style={{ padding: '100px 64px', background: '#0d1117' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#fff' }}>Impact Portfolio</h2>
                    <p style={{ color: '#8b949e', fontSize: '1.2rem' }}>A selection of public repositories and product R&D. Status labels distinguish prototypes and experiments from completed work.</p>
                </div>

                {/* Featured Products Cards */}
                <div className="w3-row-padding">
                    {allProjects.filter(p => p.featured).map((proj, idx) => (
                        <div key={idx} className="w3-quarter w3-margin-bottom">
                            <div style={{
                                background: '#161b22',
                                padding: '32px',
                                borderRadius: '16px',
                                border: '1px solid #58a6ff',
                                height: '280px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                position: 'relative'
                            }}>
                                <div style={{ position: 'absolute', top: '16px', right: '16px' }}><Star size={20} color="#f2c94c" fill="#f2c94c" /></div>
                                <div>
                                    <span style={{ color: '#58a6ff', fontSize: '0.75rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>{proj.category}</span>
                                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '8px', marginBottom: '12px' }}>
                                        {proj.url ? <a href={proj.url} target="_blank" rel="noreferrer" style={{ color: '#fff', textDecoration: 'none' }}>{proj.name}</a> : proj.name}
                                    </h3>
                                    <p style={{ color: '#8b949e', fontSize: '0.9rem' }}>{proj.tech}</p>
                                </div>
                                <span style={{ color: proj.status === 'Completed' ? '#3fb950' : '#f2c94c', fontWeight: 'bold', fontSize: '0.85rem' }}>● {proj.status}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Collapsible Full Archive */}
                <div style={{ marginTop: '48px', textAlign: 'center' }}>
                    <button
                        onClick={() => setAllProjectsVisible(!allProjectsVisible)}
                        className="btn-premium"
                        style={{ padding: '16px 40px', cursor: 'pointer' }}
                    >
                        {allProjectsVisible ? 'Collapse Archive' : 'Explore Full Project Archive'}
                    </button>

                    {allProjectsVisible && (
                        <div className="w3-animate-opacity" style={{ marginTop: '64px', overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #30363d', color: '#58a6ff' }}>
                                        <th style={{ padding: '16px' }}>YEAR</th>
                                        <th style={{ padding: '16px' }}>IDENTITY</th>
                                        <th style={{ padding: '16px' }}>STACK</th>
                                        <th style={{ padding: '16px' }}>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allProjects.map((proj, idx) => (
                                        <tr key={idx} style={{ borderBottom: '1px solid #161b22' }}>
                                            <td style={{ padding: '16px', color: '#8b949e' }}>{proj.year}</td>
                                            <td style={{ padding: '16px', fontWeight: 'bold' }}>
                                                {proj.name} {proj.featured && <Star size={12} style={{ marginLeft: '8px', verticalAlign: 'middle' }} color="#f2c94c" fill="#f2c94c" />}
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <code style={{ background: '#30363d', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', color: '#58a6ff' }}>{proj.tech}</code>
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{ color: proj.status === 'Completed' ? '#3fb950' : '#f2c94c', fontSize: '0.85rem' }}>{proj.status}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Research Section */}
            <div id="blog" style={{ padding: '100px 64px', background: '#0d1117', borderTop: '1px solid #30363d' }}>
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff' }}>Research & Insights</h2>
                    <p style={{ color: '#8b949e' }}>Exploring the frontier of Architecture, Finance, and AI Agents</p>
                </div>
                <div className="w3-row-padding">
                    {recentPosts.map((post) => (
                        <div key={post.id} className="w3-third w3-margin-bottom">
                            <div style={{ background: '#161b22', padding: '32px', borderRadius: '16px', border: '1px solid #30363d', height: '100%', display: 'flex', flexDirection: 'column' }}>
                                <span style={{ color: '#58a6ff', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '12px' }}>{post.category}</span>
                                <h3 style={{ color: '#fff', fontSize: '1.4rem' }}>{post.title}</h3>
                                <p style={{ color: '#8b949e', flexGrow: 1, marginBottom: '24px' }}>{post.excerpt}</p>
                                <Link to={`/blog/${post.slug}`} className="btn-premium" style={{ textDecoration: 'none', textAlign: 'center' }}>Read Insight <ChevronRight size={16} /></Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div id="contact" style={{ padding: '100px 64px', background: '#161b22', borderTop: '1px solid #30363d' }}>
                <div className="w3-row">
                    <div className="w3-half w3-container">
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', color: '#fff' }}>Let's Connect</h2>
                        <p style={{ fontSize: '1.2rem', color: '#8b949e', margin: '24px 0 48px' }}>Ready to discuss your next project or architectural challenge?</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><MapPin size={24} color="#58a6ff" /> Bahria Town, Islamabad, Pakistan</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><Phone size={24} color="#58a6ff" /> +92 334 5112969</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><Mail size={24} color="#58a6ff" /> amr.shah@gmail.com</div>
                        </div>
                    </div>
                    <div className="w3-half w3-container">
                        <form
                            action="https://formspree.io/f/xlgeqqqv"
                            method="POST"
                            style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
                        >
                            <input type="text" name="name" required placeholder="Full Name" style={{ padding: '14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#fff' }} />
                            <input type="email" name="_replyto" required placeholder="Email Address" style={{ padding: '14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#fff' }} />
                            <textarea name="message" required placeholder="Your Message" style={{ padding: '14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#fff', minHeight: '150px' }}></textarea>
                            <button type="submit" className="btn-premium" style={{ padding: '16px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Send Intelligence</button>
                        </form>
                    </div>
                </div>
            </div>

            <footer style={{ padding: '40px 64px', background: '#0d1117', borderTop: '1px solid #30363d', textAlign: 'center', color: '#8b949e' }}>
                <p>© 2026 Ali Raza (amrshah). Software engineering, AI product R&D, and SaaS architecture.</p>
            </footer>
        </div>
    );
};

export default Home;