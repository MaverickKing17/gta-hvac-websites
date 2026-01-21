
import React from 'react';
import { SERVICES, SERVICE_ICONS } from '../constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <h2 className="text-blue-600 font-bold uppercase tracking-wider mb-4">Our Services</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Comprehensive Solutions for Your Home Comfort
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            From emergency repairs to energy-efficient system replacements, we offer end-to-end HVAC services in the Greater Toronto Area.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              className="group p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-100 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                {SERVICE_ICONS[service.icon]}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h4>
              <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                {service.description}
              </p>
              
              {service.rebate && (
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold mb-4">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Rebate: {service.rebate}
                </div>
              )}
              
              <a 
                href="#contact" 
                className="flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
              >
                Learn More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
