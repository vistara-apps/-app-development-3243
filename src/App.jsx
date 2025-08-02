import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CreatorDashboard from './pages/CreatorDashboard';
import ContentDetail from './pages/ContentDetail';
import BrowseContent from './pages/BrowseContent';
import { ContentProvider } from './context/ContentContext';

function App() {
  return (
    <ContentProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/browse" element={<BrowseContent />} />
              <Route path="/creator" element={<CreatorDashboard />} />
              <Route path="/content/:id" element={<ContentDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App;