
import React from 'react';
import { Star, Quote } from 'lucide-react';
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
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <p className="font-bold text-slate-900">4.9/5 Average Rating</p>
              <p className="text-sm text-slate-500">Based on 500+ Google Reviews</p>
            </div>
            <div className="w-px h-12 bg-slate-200"></div>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_Guaranteed_Badge.png" 
              alt="Google Guaranteed" 
              className="h-16 object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div key={review.id} className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 flex flex-col relative">
              <Quote className="absolute top-6 right-8 w-10 h-10 text-blue-100" />
              <div className="flex items-center gap-1 text-orange-400 mb-6">
                {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
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
          {/* Mock Brand Logos */}
          <span className="text-2xl font-black text-slate-400">Carrier</span>
          <span className="text-2xl font-black text-slate-400">Trane</span>
          <span className="text-2xl font-black text-slate-400">Lennox</span>
          <span className="text-2xl font-black text-slate-400">Daikin</span>
          <span className="text-2xl font-black text-slate-400">Mitsubishi</span>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;
