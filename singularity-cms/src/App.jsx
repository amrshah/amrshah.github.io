import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Main Site components
import SingularityHeader from './components/Header/SingularityHeader';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

// CMS components
import CMSLayout from './cms/CMSLayout';
import AdminHome from './cms/pages/AdminHome';
import AllPosts from './cms/pages/AllPosts';
import EditPost from './cms/pages/EditPost';
import Settings from './cms/pages/Settings';

import Home from './pages/Home';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Main Website Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />

            {/* Admin CMS Routes */}
            <Route path="/admin" element={<CMSLayout><AdminHome /></CMSLayout>} />
            <Route path="/admin/posts" element={<CMSLayout><AllPosts /></CMSLayout>} />
            <Route path="/admin/new" element={<CMSLayout><EditPost /></CMSLayout>} />
            <Route path="/admin/edit/:slug" element={<CMSLayout><EditPost /></CMSLayout>} />
            <Route path="/admin/settings" element={<CMSLayout><Settings /></CMSLayout>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
