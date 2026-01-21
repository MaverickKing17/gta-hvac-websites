
import React, { useState, useEffect } from 'react';
import { Phone, AlertTriangle } from 'lucide-react';
import { COMPANY_CONFIG } from '../constants';

const StickyCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 p-4 md:hidden animate-in slide-in-from-bottom">
      <div className="flex items-center gap-3">
        <a 
          href={`tel:${COMPANY_CONFIG.phone}`}
          className="flex-grow flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
        >
          <Phone className="w-5 h-5" />
          Book 24/7 Emergency Repair
        </a>
      </div>
    </div>
  );
};

export default StickyCTA;
