
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, MapPin } from 'lucide-react';
import { COMPANY_CONFIG } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-slate-950 text-slate-200 pt-24 pb-12 overflow-hidden border-t border-slate-900">
      {/* Visual background accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-900/15 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-900/40">
                OHC
              </div>
              <span className="font-black text-white text-xl tracking-tight">Ontario <span className="text-blue-500">Heating & Cooling</span></span>
            </div>
            <p className="text-[15px] leading-relaxed text-slate-200 font-semibold max-w-xs">
              Providing reliable heating and air conditioning services across the GTA for over 15 years. Fully insured and certified professionals dedicated to your home comfort.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500 hover:text-white hover:bg-slate-900/50 transition-all group" aria-label="Facebook">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500 hover:text-white hover:bg-slate-900/50 transition-all group" aria-label="Instagram">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500 hover:text-white hover:bg-slate-900/50 transition-all group" aria-label="Twitter">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500 hover:text-white hover:bg-slate-900/50 transition-all group" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-4 text-base font-bold">
              <li>
                <a href="#services" className="text-slate-200 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all">
                   Our Services
                </a>
              </li>
              <li>
                <a href="#rebates" className="text-slate-200 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all">
                   Rebate Calculator
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-slate-200 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all">
                   How It Works
                </a>
              </li>
              <li>
                <a href="#reviews" className="text-slate-200 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all">
                   Customer Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-200 hover:text-white hover:translate-x-1 inline-flex items-center gap-2 transition-all">
                   Get a Quote
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas Column */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Service Areas
            </h4>
            <ul className="grid grid-cols-1 gap-4 text-base font-bold">
              {COMPANY_CONFIG.serviceAreas.map(area => (
                <li key={area} className="flex items-center gap-2 text-slate-100">
                  <MapPin className="w-4 h-4 text-blue-500" />
                  {area}, ON
                </li>
              ))}
            </ul>
          </div>

          {/* Accreditations Column */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
              Accreditations
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="group p-4 bg-slate-900/60 border border-slate-700 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase text-center text-white hover:border-blue-600 hover:bg-slate-900 transition-all cursor-default shadow-sm">
                TSSA Certified
              </div>
              <div className="group p-4 bg-slate-900/60 border border-slate-700 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase text-center text-white hover:border-blue-600 hover:bg-slate-900 transition-all cursor-default shadow-sm">
                HRAI Member
              </div>
              <div className="group p-4 bg-slate-900/60 border border-slate-700 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase text-center text-white hover:border-blue-600 hover:bg-slate-900 transition-all cursor-default shadow-sm">
                BBB A+ Rating
              </div>
              <div className="group p-4 bg-slate-900/60 border border-slate-700 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase text-center text-white hover:border-blue-600 hover:bg-slate-900 transition-all cursor-default shadow-sm">
                Eco Certified
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-8 text-[12px] font-black uppercase tracking-[0.15em] text-slate-400">
          <p>© {new Date().getFullYear()} Ontario Heating and Cooling Inc. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
