
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import RebateCalculator from './components/RebateCalculator';
import Timeline from './components/Timeline';
import TrustSignals from './components/TrustSignals';
import ContactForm from './components/ContactForm';
import AIChatWidget from './components/AIChatWidget';
import StickyCTA from './components/StickyCTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        <Services />
        <RebateCalculator />
        <Timeline />
        <TrustSignals />
        <ContactForm />
      </main>

      <Footer />
      
      <StickyCTA />
      <AIChatWidget />

      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 p-3 bg-white shadow-lg rounded-full text-blue-600 border border-blue-100 hover:bg-blue-50 transition-all z-40 hidden md:block"
          aria-label="Scroll to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default App;
