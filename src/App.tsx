import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import ContactFormSection from './components/ContactFormSection';
import FloatingCTA from './components/FloatingCTA';
import { useEffect, lazy, Suspense } from 'react';
import { Loader2 } from 'lucide-react';

const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const News = lazy(() => import('./pages/News'));
const NewsDetail = lazy(() => import('./pages/NewsDetail'));

const FAQPage = lazy(() => import('./pages/FAQPage'));
const CMSPanel = lazy(() => import('./pages/CMSPanel'));
const NewsletterPage = lazy(() => import('./pages/NewsletterPage'));


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
  
  useEffect(() => {
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    // Remove trailing slash from base and ensure clean path
    const path = location.pathname === '/' ? '' : location.pathname;
    canonical.setAttribute("href", `https://rmprojekty.vercel.app${path}`);
  }, [location.pathname]);

  const isCMS = location.pathname === '/panel-cms';
  const showNewsletter = !isCMS && location.pathname !== '/newsletter';
  const showContactForm = !isCMS && location.pathname !== '/' && location.pathname !== '/kontakt' && location.pathname !== '/newsletter';

  return (
    <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-orange-100 selection:text-orange-900">
      {!isCMS && <Navbar />}
      <main>
        <Suspense fallback={
          <div className="min-h-[60vh] flex items-center justify-center bg-white">
            <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/oferta/:id" element={<ServiceDetail />} />
            <Route path="/realizacje" element={<Portfolio />} />

            <Route path="/aktualnosci" element={<News />} />
            <Route path="/aktualnosci/:id" element={<NewsDetail />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/newsletter" element={<NewsletterPage />} />

            <Route path="/panel-cms" element={<CMSPanel />} />
          </Routes>
        </Suspense>
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
