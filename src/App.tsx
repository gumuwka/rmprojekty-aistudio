import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import ProjectDetail from './pages/ProjectDetail';
import FAQPage from './pages/FAQPage';
import CMSPanel from './pages/CMSPanel';
import NewsletterPage from './pages/NewsletterPage';
import ContactFormSection from './components/ContactFormSection';
import FloatingCTA from './components/FloatingCTA';
import { useEffect } from 'react';

function ScrollToHash() {
  const { hash, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash, key]);
  return null;
}

function LayoutWrapper() {
  const location = useLocation();
  const isCMS = location.pathname === '/panel-cms';
  const showNewsletter = !isCMS && location.pathname !== '/newsletter';
  const showContactForm = !isCMS && location.pathname !== '/' && location.pathname !== '/kontakt' && location.pathname !== '/newsletter';

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-orange-100 selection:text-orange-900">
      {!isCMS && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kontakt" element={<Contact />} />
          <Route path="/oferta/:id" element={<ServiceDetail />} />
          <Route path="/realizacje" element={<Portfolio />} />
          <Route path="/realizacje/:id" element={<ProjectDetail />} />
          <Route path="/aktualnosci" element={<News />} />
          <Route path="/aktualnosci/:id" element={<NewsDetail />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />

          <Route path="/panel-cms" element={<CMSPanel />} />
        </Routes>
      </main>
      {showContactForm && <ContactFormSection />}
      {showNewsletter && <Newsletter />}
      {!isCMS && <Footer />}
      {!isCMS && <FloatingCTA />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToHash />
      <LayoutWrapper />
    </Router>
  );
}
