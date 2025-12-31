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
                console.error('Error fetching recent posts:', error);
            }
        };
        fetchRecentPosts();
    }, []);

    const allProjects = [
        // 2024
        { year: '2024', name: 'AgentVerse', tech: 'React, Node.js, Gemini AI', status: 'In-Progress', featured: true, category: 'AI' },
        { year: '2024', name: 'AlamiaConnect CRM', tech: 'Laravel, React, MySQL', status: 'In-Progress', featured: true, category: 'Laravel' },
        { year: '2024', name: 'Gym Management System (v2)', tech: 'Laravel, Refactoring', status: 'In-Progress', featured: true, category: 'Laravel' },
        { year: '2024', name: 'Laamiya AI Assistant', tech: 'Python, Gemini, Streamlit', status: 'In-Progress', featured: false, category: 'AI' },
        { year: '2024', name: 'Alamia EasyDash', tech: 'Laravel Core, UI/UX', status: 'In-Progress', featured: false, category: 'Laravel' },
        { year: '2024', name: 'Fleet Manager KSA', tech: 'Laravel, GPS API', status: 'In-Progress', featured: false, category: 'Laravel' },

        // 2023
        { year: '2023', name: 'Lead Qualification Expert', tech: 'WP, PHP, OpenAI', status: 'Completed', featured: true, category: 'AI' },
        { year: '2023', name: 'AgencyOS (Business OS)', tech: 'Laravel, Vue.js', status: 'In-Progress', featured: false, category: 'Laravel' },
        { year: '2023', name: 'Silver Nova Suite', tech: 'WordPress, React', status: 'In-Progress', featured: false, category: 'Wordpress' },
        { year: '2023', name: 'WP Dynamic Content Pro', tech: 'PHP, Elementor API', status: 'In-Progress', featured: false, category: 'Wordpress' },
        { year: '2023', name: 'Gitex Toolkit', tech: 'Laravel, Event Management', status: 'In-Progress', featured: false, category: 'Laravel' },

        // 2022
        { year: '2022', name: 'Laravel ARBAC Package', tech: 'PHP, Laravel Core', status: 'Completed', featured: false, category: 'Laravel' },
        { year: '2022', name: 'Alamia Accounts ERP', tech: 'Laravel, Multi-tenancy', status: 'In-Progress', featured: false, category: 'Laravel' },
        { year: '2022', name: 'Asset Management System', tech: 'Laravel, Tracking', status: 'In-Progress', featured: false, category: 'Laravel' },

        // 2021
        { year: '2021', name: 'WP Menu Manager', tech: 'WordPress, JS', status: 'Completed', featured: false, category: 'Wordpress' },
        { year: '2021', name: 'WP NoIndex MU-Plugin', tech: 'PHP, WP Core', status: 'Completed', featured: false, category: 'Wordpress' },

        // Legacy/Historical
        { year: '2018', name: 'Visa Consultant Platform', tech: 'PHP, CodeIgniter', status: 'Completed', featured: false, category: 'Laravel' },
        { year: '2018', name: 'Support Ticket System', tech: 'Laravel, Vue', status: 'Completed', featured: false, category: 'Laravel' },
        { year: '2017', name: 'Helping Hands NGO', tech: 'WordPress Theme', status: 'Completed', featured: false, category: 'Wordpress' },
        { year: '2013', name: 'Active Fitness Generator', tech: 'PHP Engine', status: 'Completed', featured: false, category: 'Laravel' },
        { year: '2010', name: 'Application Generator', tech: 'C#, .NET Core', status: 'Completed', featured: false, category: 'Misc' },
        { year: '2009', name: 'AWS Price Intel Tool', tech: 'C#, AWS ECS', status: 'Completed', featured: false, category: 'AI' }
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
                        <a href="#portfolio" className="w3-button w3-dark-grey w3-round-large w3-padding-16" style={{ border: '1px solid #30363d', color: '#fff' }}>Impact Portfolio</a>
                        <Link to="/blog" className="w3-button w3-indigo w3-round-large w3-padding-16" style={{ background: '#1f6feb', fontWeight: 'bold' }}>Research & Insights</Link>
                    </div>

                    <div style={{ marginTop: '64px', fontStyle: 'italic', opacity: 0.9, borderLeft: '4px solid #1f6feb', paddingLeft: '24px', textAlign: 'left', margin: '64px auto 0', maxWidth: '440px' }}>
                        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#e6edf3', margin: '0' }}>
                            "Where innovation meets imagination—a journey from structured code to boundless creativity.
                            Welcome to my Singularity."
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
                            <p>Hello! I'm a software architect and full-stack developer with over 15 years of experience transforming complex challenges into elegant solutions.</p>
                            <p>My passion lies in building robust, scalable applications and creating intelligent development tools. From enterprise systems to innovative web platforms, I specialize in architecting solutions that drive real business value.</p>
                            <p>Currently, I focus on leveraging cutting-edge frameworks and emerging technologies to craft tools that streamline development workflows.</p>
                            <p style={{ color: '#58a6ff', fontWeight: '600', marginTop: '32px' }}>Let's connect and explore how we can build something extraordinary together.</p>
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
                                { date: '2012–Present', role: 'Principal Consultant', detail: 'Enterprise solutions and strategic consulting.' },
                                { date: '2010–2012', role: 'Freelance Developer', detail: 'vWorker & Freelancer.com global platform specialization.' },
                                { date: '2008–2010', role: 'Software Engineer', detail: 'Full-stack development for AU enterprise clients.' },
                                { date: '2005–2008', role: 'Master of CS', detail: 'Advanced software architecture study.' },
                                { date: '2002–2005', role: 'Core Programming', detail: 'Intensive immersion in C/C++.' }
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
                    <p style={{ color: '#8b949e', fontSize: '1.2rem' }}>Architecting the future through AI and robust software engineering.</p>
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
                                    <h3 style={{ color: '#fff', fontSize: '1.5rem', marginTop: '8px', marginBottom: '12px' }}>{proj.name}</h3>
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
                        <form action="https://formspree.io/f/xvgzbgww" method="POST" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <input type="text" name="name" required placeholder="Full Name" style={{ padding: '14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#fff' }} />
                            <input type="email" name="_replyto" required placeholder="Email Address" style={{ padding: '14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#fff' }} />
                            <textarea name="message" required placeholder="Your Message" style={{ padding: '14px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#fff', minHeight: '150px' }}></textarea>
                            <button type="submit" className="btn-premium" style={{ padding: '16px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Send Intelligence</button>
                        </form>
                    </div>
                </div>
            </div>

            <footer style={{ padding: '40px 64px', background: '#0d1117', borderTop: '1px solid #30363d', textAlign: 'center', color: '#8b949e' }}>
                <p>© 2025 Ali Raza (amrshah). Architecting with precision & passion.</p>
            </footer>
        </div>
    );
};

export default Home;
