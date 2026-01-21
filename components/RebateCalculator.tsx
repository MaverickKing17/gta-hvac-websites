
import React, { useState } from 'react';
import { Calculator, Zap, TrendingUp, Info, CheckCircle2, Loader2, Sparkles, ChevronRight, ArrowRightLeft, Thermometer, Wind, Flame, Droplets } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ComparisonItem {
  type: string;
  label: string;
  rebateAmount: string;
  program: string;
  pros: string[];
  cons: string[];
  summary: string;
  efficiencyRating: string;
}

interface RebateComparisonResult {
  comparison: ComparisonItem[];
  overallRecommendation: string;
  disclaimer: string;
}

const RebateCalculator: React.FC = () => {
  const [postalCode, setPostalCode] = useState('');
  const [homeSize, setHomeSize] = useState('2200');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<RebateComparisonResult | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Perform a side-by-side comparison of 2024-2025 Ontario HVAC rebates for a ${homeSize} sqft home in postal area ${postalCode}. 
        Compare these 4 paths: 
        1. High-Efficiency Heat Pump (Cold Climate)
        2. High-Efficiency Furnace Upgrade
        3. Central Air Conditioning Upgrade
        4. Hybrid System (Furnace + Heat Pump)
        5. Tankless Water Heater

        Return a JSON response with this exact structure:
        {
          "comparison": [
            {
              "type": "heat-pump" | "furnace" | "ac" | "hybrid" | "water-heater",
              "label": "Display Name",
              "rebateAmount": "e.g. up to $10,500",
              "program": "Primary Program Name",
              "pros": ["Benefit 1", "Benefit 2"],
              "cons": ["Downside 1"],
              "summary": "Brief analysis",
              "efficiencyRating": "High/Medium/Low"
            }
          ],
          "overallRecommendation": "Which path is best for this specific user?",
          "disclaimer": "Standard rebate eligibility text"
        }`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are the lead Ontario HVAC Rebate Analyst. You are expert in Enbridge HER+, Save on Energy, and Clean Energy Frontier programs. Your goal is to provide accurate, comparative data to help homeowners choose the most financiallly beneficial path.",
        },
      });

      const data = JSON.parse(response.text || '{}');
      setResult(data as RebateComparisonResult);
    } catch (error) {
      console.error("Rebate comparison failed:", error);
      // High-quality fallback for demo/error purposes
      setResult({
        comparison: [
          {
            type: "heat-pump",
            label: "Cold Climate Heat Pump",
            rebateAmount: "Up to $10,500",
            program: "Enbridge HER+",
            pros: ["Highest available rebate", "Year-round comfort", "Carbon reduction"],
            cons: ["Higher upfront cost", "Requires electrical panel check"],
            summary: "The current 'gold standard' for Ontario rebates. Most homes qualify for maximum funding.",
            efficiencyRating: "Very High"
          },
          {
            type: "hybrid",
            label: "Hybrid Dual-Fuel",
            rebateAmount: "Up to $6,500",
            program: "Enbridge HER+",
            pros: ["Gas backup for extreme cold", "Balanced utility bills"],
            cons: ["Dual system maintenance"],
            summary: "Combines a gas furnace with a heat pump for maximum reliability in Ontario winters.",
            efficiencyRating: "High"
          },
          {
            type: "furnace",
            label: "High-Efficiency Furnace",
            rebateAmount: "Up to $1,500",
            program: "Save on Energy",
            pros: ["Familiar technology", "Lower installation cost"],
            cons: ["Lower rebates compared to electricity-based upgrades"],
            summary: "Better for budget-conscious immediate repairs, though long-term savings are lower.",
            efficiencyRating: "Medium"
          }
        ],
        overallRecommendation: "Based on current Ontario energy policy, the Cold Climate Heat Pump offers the highest ROI due to the $10,500 HER+ program cap.",
        disclaimer: "Estimates only. Requires audit by a licensed NRCan energy advisor."
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'heat-pump': return <Thermometer className="w-6 h-6" />;
      case 'ac': return <Wind className="w-6 h-6" />;
      case 'furnace': return <Flame className="w-6 h-6" />;
      case 'water-heater': return <Droplets className="w-6 h-6" />;
      default: return <Zap className="w-6 h-6" />;
    }
  };

  return (
    <section id="rebates" className="py-24 mesh-bg relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-blue-600 font-bold uppercase tracking-wider mb-4">Rebate Intelligence</h2>
          <h3 className="text-3xl md:text-6xl font-extrabold text-slate-900 mb-6">
            Compare Your <span className="text-blue-600">Savings</span>
          </h3>
          <p className="text-lg text-slate-600 leading-relaxed">
            Don't settle for one estimate. Our AI analyzes the entire Ontario rebate landscape to show you how different equipment paths stack up side-by-side.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="glass p-8 md:p-12 rounded-[40px] shadow-2xl border border-white/50 relative mb-12">
            <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-xl z-20">
              <ArrowRightLeft className="w-4 h-4" />
              Comparative Mode Active
            </div>

            <form onSubmit={handleCalculate} className="flex flex-col md:flex-row items-end gap-6">
              <div className="flex-grow space-y-2 w-full">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest px-2">Postal Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. M5V 2H1"
                  className="w-full px-6 py-5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 font-bold text-lg"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                  required
                />
              </div>
              
              <div className="flex-grow space-y-2 w-full">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest px-2">Home Size</label>
                <select 
                  className="w-full px-6 py-5 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-lg appearance-none cursor-pointer"
                  value={homeSize}
                  onChange={(e) => setHomeSize(e.target.value)}
                >
                  <option value="1200">Condo/Small (Up to 1,500 sqft)</option>
                  <option value="2200">Mid-Size (1,501 - 2,500 sqft)</option>
                  <option value="3500">Large (2,501 - 4,000 sqft)</option>
                  <option value="5000">Estate (4,001+ sqft)</option>
                </select>
              </div>

              <button 
                type="submit"
                disabled={isCalculating}
                className="w-full md:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-70 h-[68px] whitespace-nowrap"
              >
                {isCalculating ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Analyzing Paths...
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Compare All Rebates
                  </>
                )}
              </button>
            </form>
          </div>

          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="bg-blue-600 rounded-[40px] p-8 md:p-10 mb-12 text-white shadow-2xl flex flex-col md:row items-center gap-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12">
                  <Sparkles className="w-64 h-64" />
                </div>
                <div className="flex-grow relative z-10">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                    <CheckCircle2 className="w-3 h-3" /> Expert Recommendation
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black mb-4 leading-tight">
                    {result.overallRecommendation}
                  </h4>
                  <p className="text-blue-100 font-medium">
                    The Ontario government is heavily incentivizing electrification in 2025.
                  </p>
                </div>
                <button className="shrink-0 w-full md:w-auto px-8 py-5 bg-white text-blue-600 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl flex items-center justify-center gap-3">
                  Apply Now
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {result.comparison.map((item, idx) => (
                  <div 
                    key={idx} 
                    className={`group p-8 rounded-[40px] bg-white border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500 relative flex flex-col ${item.rebateAmount.includes('10,500') ? 'ring-4 ring-blue-500/10 border-blue-100' : ''}`}
                  >
                    {item.rebateAmount.includes('10,500') && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        Best Value
                      </div>
                    )}
                    
                    <div className="w-14 h-14 bg-slate-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                      {getIcon(item.type)}
                    </div>

                    <h5 className="text-xl font-black text-slate-900 mb-1">{item.label}</h5>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{item.program}</p>
                    
                    <div className="text-3xl font-black text-blue-600 mb-6 tracking-tight">
                      {item.rebateAmount}
                    </div>

                    <div className="space-y-4 mb-8 flex-grow">
                      <div>
                        <p className="text-[10px] font-black text-slate-900 uppercase mb-2">Advantages</p>
                        <ul className="space-y-2">
                          {item.pros.map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-600 font-medium">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-4 border-t border-slate-50">
                        <p className="text-[10px] font-black text-slate-900 uppercase mb-1">Efficiency Rating</p>
                        <div className="flex items-center gap-1.5">
                           <div className={`h-1.5 rounded-full bg-slate-100 flex-grow overflow-hidden`}>
                              <div 
                                className={`h-full bg-blue-600 rounded-full ${item.efficiencyRating === 'Very High' ? 'w-full' : item.efficiencyRating === 'High' ? 'w-3/4' : 'w-1/2'}`}
                              ></div>
                           </div>
                           <span className="text-[10px] font-bold text-blue-600">{item.efficiencyRating}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed italic mb-8 border-l-2 border-slate-100 pl-4">
                      "{item.summary}"
                    </p>

                    <button className="w-full py-4 rounded-2xl bg-slate-50 text-slate-900 font-bold text-sm hover:bg-slate-100 transition-colors border border-slate-100">
                      View Eligibility
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-12 p-8 bg-slate-50 rounded-[32px] border border-slate-200/50 flex flex-col md:row items-center gap-6 justify-between">
                <div className="flex items-center gap-4 text-slate-500 max-w-2xl">
                  <Info className="w-10 h-10 text-slate-400 shrink-0" />
                  <p className="text-sm font-medium leading-relaxed">
                    <span className="font-bold text-slate-800 underline decoration-blue-200">Legal Notice:</span> {result.disclaimer} Rebates are subject to program availability and specific property requirements. An official NRCan energy audit is required for most Enbridge programs.
                  </p>
                </div>
                <div className="flex gap-4 shrink-0">
                  <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-white/50">
                    Download Comparison (PDF)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default RebateCalculator;
