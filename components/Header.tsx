
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { COMPANY_CONFIG } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Rebates', href: '#rebates' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            OHC
          </div>
          <span className="font-bold text-lg md:text-xl hidden sm:block">Ontario Heating & Cooling</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href={`tel:${COMPANY_CONFIG.phone}`}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
          >
            <Phone className="w-4 h-4" />
            {COMPANY_CONFIG.phone}
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white absolute top-full left-0 right-0 shadow-xl border-t border-gray-100 flex flex-col p-4 gap-4 animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="py-3 text-lg font-medium text-slate-800 border-b border-gray-50 last:border-0"
            >
              {link.name}
            </a>
          ))}
          <div className="flex flex-col gap-3 mt-4">
            <a href={`tel:${COMPANY_CONFIG.phone}`} className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-xl font-bold">
              <Phone className="w-5 h-5" />
              Call Now
            </a>
            <button className="flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-800 rounded-xl font-bold">
              <Calendar className="w-5 h-5" />
              Book Online
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
