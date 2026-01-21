
import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { COMPANY_CONFIG } from '../constants';

interface HeroProps {
  onOpenChat: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenChat }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden mesh-bg">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" />
              <span>Up to $10,500 in Heat Pump Rebates Available</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
              Expert <span className="text-blue-600">Heating & Cooling</span> in Toronto
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              Reliable HVAC solutions since 2005. Whether it's a 2 AM emergency repair or a high-efficiency upgrade, our certified team is ready.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a 
                href="#contact" 
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-200 group"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <button 
                onClick={onOpenChat}
                className="w-full sm:w-auto px-8 py-4 bg-white text-slate-800 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all border border-slate-200 flex items-center justify-center gap-2"
              >
                Start AI Chat
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                Google Guaranteed
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                Certified Technicians
              </div>
              <div className="flex items-center gap-2 text-slate-500 font-medium">
                <ShieldCheck className="w-5 h-5 text-green-500" />
                GTA-Wide Service
              </div>
            </div>
          </div>

          <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div>
            
            <div className="relative glass rounded-[40px] overflow-hidden shadow-2xl animate-float p-4">
              <img 
                src="https://i.ibb.co/8LPS8TS7/qwen-image-2512-b-Replace-the-current.jpg" 
                alt="OHC HVAC technician servicing equipment"
                className="rounded-[30px] w-full h-auto object-cover"
              />
              <div className="absolute bottom-10 left-10 right-10 p-6 glass rounded-2xl shadow-xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                    15+
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 leading-none mb-1">Years Experience</h4>
                    <p className="text-xs text-slate-500">Trusted GTA professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
