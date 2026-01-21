
import React, { useState } from 'react';
import { Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { COMPANY_CONFIG } from '../constants';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-blue-600 font-bold uppercase tracking-wider mb-4">Contact Us</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Ready to Upgrade Your Comfort?
            </h3>
            <p className="text-lg text-slate-600 mb-12">
              Fill out the form below or give us a call. Our team typically responds within 15 minutes during business hours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Call Us 24/7</p>
                  <a href={`tel:${COMPANY_CONFIG.phone}`} className="text-lg font-bold text-slate-900 hover:text-blue-600">
                    {COMPANY_CONFIG.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Email Us</p>
                  <a href={`mailto:${COMPANY_CONFIG.email}`} className="text-lg font-bold text-slate-900 hover:text-blue-600">
                    {COMPANY_CONFIG.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Visit Us</p>
                  <p className="font-bold text-slate-900">{COMPANY_CONFIG.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-bold uppercase mb-1">Service Hours</p>
                  <p className="font-bold text-slate-900">Emergency: 24/7</p>
                  <p className="text-sm text-slate-600">Admin: 8 AM - 6 PM</p>
                </div>
              </div>
            </div>

            <div className="rounded-[40px] overflow-hidden shadow-2xl h-80 relative border-4 border-white">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2883.493146199561!2d-79.61595558427541!3d43.72108135605618!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3bb703beb515%3A0x9d26c587bf8d418f!2s680%20Rexdale%20Blvd%2C%20Etobicoke%2C%20ON%20M9W%200B5%2C%20Canada!5e0!3m2!1sen!2sin!4v1627107730730!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

          <div className="glass p-10 rounded-[40px] shadow-2xl border border-white">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-black text-slate-900">Quote Request Sent!</h3>
                <p className="text-slate-600">Thank you for reaching out. One of our experts will contact you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="416-555-0123"
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="jane@example.com"
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Service Needed</label>
                  <select className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none">
                    <option>Heat Pump Installation</option>
                    <option>Furnace Repair</option>
                    <option>AC Installation</option>
                    <option>Water Heater Service</option>
                    <option>Emergency Repair</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">How can we help?</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe your needs..."
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-3 disabled:opacity-70 group"
                >
                  {status === 'submitting' ? 'Processing...' : (
                    <>
                      Request Free Quote
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </button>
                
                <p className="text-center text-xs text-slate-500">
                  By submitting, you agree to our privacy policy and consent to be contacted.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
