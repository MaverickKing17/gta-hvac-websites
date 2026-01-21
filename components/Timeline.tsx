
import React from 'react';
import { ClipboardCheck, Settings, Banknote } from 'lucide-react';

const Timeline: React.FC = () => {
  const steps = [
    {
      icon: <ClipboardCheck className="w-10 h-10" />,
      title: "Consult & Audit",
      description: "We perform a thermal efficiency audit of your home to identify the best equipment and rebate pathways."
    },
    {
      icon: <Settings className="w-10 h-10" />,
      title: "Precision Install",
      description: "Our licensed technicians install your new system with meticulous care, typically in just one day."
    },
    {
      icon: <Banknote className="w-10 h-10" />,
      title: "Save & Collect",
      description: "Start saving on monthly bills immediately. We handle the rebate paperwork for you to get your check fast."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-blue-400 font-bold uppercase tracking-widest mb-4">The Process</h2>
          <h3 className="text-3xl md:text-5xl font-extrabold mb-6">3 Simple Steps to Comfort</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 hidden md:block -translate-y-1/2 z-0 opacity-20"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-blue-400 mb-8 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-500 shadow-2xl">
                {step.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4">{step.title}</h4>
              <p className="text-slate-400 leading-relaxed px-4">
                {step.description}
              </p>
              
              <div className="mt-8 px-4 py-1.5 bg-slate-800 rounded-full text-xs font-bold text-slate-500">
                Step 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
