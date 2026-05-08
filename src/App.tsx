/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, ScrollRestoration } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import FAQPage from './pages/FAQPage';
import FloatingCTA from './components/FloatingCTA';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans text-stone-900 selection:bg-orange-100 selection:text-orange-900">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/o-firmie" element={<About />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/oferta" element={<Services />} />
            <Route path="/oferta/:id" element={<ServiceDetail />} />
            <Route path="/realizacje" element={<Portfolio />} />
            <Route path="/faq" element={<FAQPage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </Router>
  );
}

