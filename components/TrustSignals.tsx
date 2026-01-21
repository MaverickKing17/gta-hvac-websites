
import React from 'react';
import { Star, Quote, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../constants';

const TrustSignals: React.FC = () => {
  return (
    <section id="reviews" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-blue-600 font-bold uppercase tracking-wider mb-4">Testimonials</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900">
              Hear From Your GTA Neighbors
            </h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end text-orange-400 mb-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" aria-hidden="true" />)}
              </div>
              <p className="font-bold text-slate-900">4.9/5 Average Rating</p>
              <p className="text-sm text-slate-500">Based on 500+ Google Reviews</p>
            </div>
            <div className="w-px h-12 bg-slate-200 hidden sm:block"></div>
            
            {/* Robust Google Guaranteed Badge Component */}
            <div 
              className="flex items-center gap-3 px-4 py-2.5 bg-[#f8f9fa] border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-default select-none shrink-0"
              aria-label="Google Guaranteed Service Provider"
            >
              <div className="relative">
                <div className="w-10 h-10 bg-[#34A853] rounded-full flex items-center justify-center text-white shadow-lg shadow-green-100 group-hover:scale-105 transition-transform duration-300">
                  <ShieldCheck className="w-6 h-6 fill-white/10" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white rounded-full flex items-center justify-center border border-slate-100">
                  <div className="w-2.5 h-2.5 bg-[#34A853] rounded-full"></div>
                </div>
              </div>
              <div className="flex flex-col -space-y-0.5">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-slate-500">Google</span>
                </div>
                <span className="text-[13px] font-black text-slate-900 uppercase tracking-tight leading-tight">Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col relative">
              <Quote className="absolute top-6 right-8 w-10 h-10 text-blue-100" aria-hidden="true" />
              <div className="flex items-center gap-1 text-orange-400 mb-6">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" aria-hidden="true" />)}
              </div>
              <p className="text-slate-700 italic mb-8 leading-relaxed relative z-10">
                "{review.text}"
              </p>
              <div className="mt-auto flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900">{review.author}</h5>
                  <p className="text-xs text-slate-500">{review.date}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  {review.author[0]}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 py-10 border-t border-slate-100 flex flex-wrap justify-center gap-12 grayscale opacity-60">
          <span className="text-2xl font-black text-slate-400 hover:opacity-100 transition-opacity">Carrier</span>
          <span className="text-2xl font-black text-slate-400 hover:opacity-100 transition-opacity">Trane</span>
          <span className="text-2xl font-black text-slate-400 hover:opacity-100 transition-opacity">Lennox</span>
          <span className="text-2xl font-black text-slate-400 hover:opacity-100 transition-opacity">Daikin</span>
          <span className="text-2xl font-black text-slate-400 hover:opacity-100 transition-opacity">Mitsubishi</span>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
