
import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { COMPANY_CONFIG } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                OHC
              </div>
              <span className="font-bold text-white text-lg">Ontario Heating & Cooling</span>
            </div>
            <p className="text-sm leading-relaxed">
              Providing reliable heating and air conditioning services across the GTA for over 15 years. Fully insured and certified.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:text-blue-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:text-blue-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:text-blue-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-900 rounded-lg hover:text-blue-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#rebates" className="hover:text-white transition-colors">Rebate Calculator</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Customer Reviews</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Get a Quote</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Service Areas</h4>
            <ul className="space-y-4 text-sm">
              {COMPANY_CONFIG.serviceAreas.map(area => (
                <li key={area}>{area}, ON</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Accreditations</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-[10px] font-black uppercase text-center">
                TSSA Certified
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-[10px] font-black uppercase text-center">
                HRAI Member
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-[10px] font-black uppercase text-center">
                BBB A+ Rating
              </div>
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center text-[10px] font-black uppercase text-center">
                Eco Certified
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-900 flex flex-col md:row items-center justify-between gap-6 text-xs font-medium">
          <p>© {new Date().getFullYear()} Ontario Heating and Cooling Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
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
