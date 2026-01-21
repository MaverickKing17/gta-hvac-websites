
import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar, ChevronRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../constants';

interface HeaderProps {
  onOpenBooking: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Rebates', href: '#rebates' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-white/70 backdrop-blur-xl shadow-sm border-b border-slate-200/60 py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className={`transition-all duration-500 rounded-xl flex items-center justify-center text-white font-bold transform group-hover:rotate-6 ${
            isScrolled ? 'w-9 h-9 bg-blue-600 text-lg' : 'w-11 h-11 bg-blue-600 text-xl'
          }`}>
            OHC
          </div>
          <div className="flex flex-col">
            <span className={`font-extrabold transition-all duration-500 leading-none ${
              isScrolled ? 'text-base md:text-lg text-slate-900' : 'text-lg md:text-xl text-slate-900'
            }`}>
              Ontario <span className="text-blue-600">HVAC</span>
            </span>
            {!isScrolled && (
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 hidden sm:block">
                Reliable Since 2005
              </span>
            )}
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  className={`text-sm font-bold transition-all duration-300 relative group py-2 ${
                    isScrolled ? 'text-slate-600 hover:text-blue-600' : 'text-slate-700 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200/50">
            <a 
              href={`tel:${COMPANY_CONFIG.phone}`}
              className={`flex items-center gap-2 px-5 transition-all duration-300 font-bold ${
                isScrolled ? 'text-blue-600 text-sm' : 'text-slate-800 text-base'
              }`}
            >
              <Phone className={isScrolled ? 'w-4 h-4' : 'w-5 h-5'} />
              {COMPANY_CONFIG.phone}
            </a>
            <button 
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 group"
            >
              Book Online
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
           <a 
              href={`tel:${COMPANY_CONFIG.phone}`}
              className="p-2 bg-blue-50 text-blue-600 rounded-lg active:scale-90 transition-transform"
            >
              <Phone className="w-5 h-5" />
            </a>
          <button 
            className="p-2 text-slate-800 bg-white shadow-sm rounded-lg border border-slate-100 active:scale-90 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="relative w-6 h-6">
              <span className={`absolute inset-0 transition-all duration-500 transform ${isMenuOpen ? 'rotate-90 opacity-0 scale-50' : 'rotate-0 opacity-100 scale-100'}`}>
                <Menu className="w-6 h-6" />
              </span>
              <span className={`absolute inset-0 transition-all duration-500 transform ${isMenuOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-90 opacity-0 scale-50'}`}>
                <X className="w-6 h-6" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 top-[inherit] z-[90] transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1) ${
          isMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
        }`}
        style={{ top: isScrolled ? '61px' : '92px', height: 'calc(100vh - 61px)' }}
      >
        {/* Backdrop blur layer */}
        <div 
          className={`absolute inset-0 bg-white/60 backdrop-blur-2xl transition-opacity duration-700 ${
            isMenuOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Content panel layer */}
        <div 
          className={`absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col p-8 h-full">
            <div className="space-y-2">
              {navLinks.map((link, idx) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center justify-between py-4 text-2xl font-black text-slate-800 border-b border-slate-50 group transition-all duration-500 ${
                    isMenuOpen 
                      ? 'translate-y-0 opacity-100 blur-0' 
                      : 'translate-y-8 opacity-0 blur-sm'
                  }`}
                  style={{ transitionDelay: `${150 + idx * 75}ms` }}
                >
                  <span className="group-hover:text-blue-600 group-hover:translate-x-2 transition-all duration-300">
                    {link.name}
                  </span>
                  <ChevronRight className="w-6 h-6 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                </a>
              ))}
            </div>
            
            <div className={`mt-auto pb-8 space-y-6 transition-all duration-700 ${
              isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`} style={{ transitionDelay: '500ms' }}>
              <div className="p-6 bg-blue-50/50 rounded-[32px] border border-blue-100/50 backdrop-blur-sm">
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3">24/7 Priority Line</p>
                <a href={`tel:${COMPANY_CONFIG.phone}`} className="flex items-center gap-4 text-2xl font-black text-slate-900 active:scale-95 transition-transform">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <Phone className="w-6 h-6" />
                  </div>
                  {COMPANY_CONFIG.phone}
                </a>
              </div>
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-3 py-5 bg-slate-900 text-white rounded-[24px] font-bold text-lg shadow-xl shadow-slate-200 active:scale-95 transition-all hover:bg-slate-800"
              >
                <Calendar className="w-6 h-6 text-blue-400" />
                Schedule Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
