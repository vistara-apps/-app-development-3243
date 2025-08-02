import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CreatorDashboard from './pages/CreatorDashboard';
import ContentDetail from './pages/ContentDetail';
import BrowseContent from './pages/BrowseContent';
import { ContentProvider } from './context/ContentContext';
import { Layout } from './components/ui';

function App() {
  return (
    <ContentProvider>
      <Router>
        <Layout>
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowseContent />} />
              <Route path="/creator" element={<CreatorDashboard />} />
              <Route path="/content/:id" element={<ContentDetail />} />
            </Routes>
          </main>
        </Layout>
      </Router>
    </ContentProvider>
  );
}

export default App;
