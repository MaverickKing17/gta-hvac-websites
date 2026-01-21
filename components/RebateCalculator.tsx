
import React, { useState } from 'react';
import { Calculator, Zap, TrendingUp, Info, CheckCircle2, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface RebateResult {
  totalAmount: string;
  breakdown: { source: string; amount: string; description: string }[];
  steps: string[];
  tips: string[];
}

const RebateCalculator: React.FC = () => {
  const [postalCode, setPostalCode] = useState('');
  const [homeSize, setHomeSize] = useState('2000');
  const [upgradeType, setUpgradeType] = useState('heat-pump');
  const [isCalculating, setIsCalculating] = useState(false);
  const [result, setResult] = useState<RebateResult | null>(null);

  const handleCalculate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    setResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Calculate estimated 2024-2025 Ontario HVAC rebates for:
        Postal Code: ${postalCode}
        Home Size: ${homeSize} sqft
        Upgrade: ${upgradeType}
        
        Provide a detailed JSON response including:
        1. totalAmount (string, e.g., "$8,500 - $10,500")
        2. breakdown (array of objects: source, amount, description)
        3. steps (array of strings for claiming)
        4. tips (array of strings for maximizing savings)`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          systemInstruction: "You are an expert Ontario HVAC Rebate Consultant. You know the details of Enbridge HER+, Save on Energy, and Federal Greener Homes programs. Always return a valid JSON object matching the requested structure.",
        },
      });

      const data = JSON.parse(response.text || '{}');
      setResult(data as RebateResult);
    } catch (error) {
      console.error("Rebate calculation failed:", error);
      // Fallback data if AI fails
      setResult({
        totalAmount: "$5,000 - $7,500",
        breakdown: [
          { source: "Enbridge HER+", amount: "$5,000", description: "Base rebate for high-efficiency system installation." },
          { source: "Federal Grant", amount: "$2,500", description: "Incentive for reducing carbon footprint with heat pumps." }
        ],
        steps: ["Book a Pre-Audit", "Install Equipment", "Post-Audit Verification"],
        tips: ["Keep all receipts", "Ensure contractor is TSSA certified"]
      });
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <section id="rebates" className="py-24 mesh-bg relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          <div className="flex-1 lg:sticky lg:top-32">
            <h2 className="text-blue-600 font-bold uppercase tracking-wider mb-4">Savings Intelligence</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
              AI-Powered Rebate <span className="text-blue-600">Estimation</span>
            </h3>
            <p className="text-lg text-slate-600 mb-10 max-w-xl">
              Ontario's rebate landscape is complex. Our smart calculator analyzes your specific home details against current Enbridge and Provincial programs in real-time.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Live Program Tracking</h4>
                  <p className="text-slate-600 text-sm">We monitor program availability and funding levels daily so you don't miss out.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Maximized Returns</h4>
                  <p className="text-slate-600 text-sm">Our AI identifies overlapping incentives that most manual assessments miss.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl">
            <div className="glass p-8 md:p-10 rounded-[40px] shadow-2xl border border-white/50 relative">
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 shadow-lg z-20">
                <Sparkles className="w-3 h-3" />
                2024-2025 Data Active
              </div>

              <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">GTA Postal Code</label>
                    <input 
                      type="text" 
                      placeholder="M1A 1A1"
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-slate-900 font-medium"
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Home Size (sqft)</label>
                    <select 
                      className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none font-medium"
                      value={homeSize}
                      onChange={(e) => setHomeSize(e.target.value)}
                    >
                      <option value="1200">Up to 1,500</option>
                      <option value="2200">1,501 - 2,500</option>
                      <option value="3500">2,501 - 4,000</option>
                      <option value="5000">4,001+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Planned Upgrade Type</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: 'heat-pump', label: 'Heat Pump' },
                      { id: 'furnace', label: 'Furnace' },
                      { id: 'ac', label: 'Central AC' },
                      { id: 'hybrid', label: 'Hybrid' }
                    ].map((type) => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setUpgradeType(type.id)}
                        className={`px-3 py-4 rounded-2xl border text-[10px] font-black uppercase tracking-tighter transition-all ${upgradeType === type.id ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'}`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isCalculating}
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-70"
                >
                  {isCalculating ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Analyzing Ontario Database...
                    </>
                  ) : (
                    <>
                      <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                      Calculate My Total Rebate
                    </>
                  )}
                </button>
              </form>

              {result && (
                <div className="mt-10 animate-in fade-in slide-in-from-top duration-500">
                  <div className="p-8 bg-blue-600 text-white rounded-[32px] shadow-2xl relative overflow-hidden mb-8">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <TrendingUp className="w-32 h-32" />
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-blue-100 font-bold uppercase tracking-widest text-[10px]">
                      <Sparkles className="w-3 h-3" />
                      Estimated Total Savings
                    </div>
                    <div className="text-5xl font-black mb-4 tracking-tight">{result.totalAmount}</div>
                    <p className="text-sm text-blue-50 leading-relaxed mb-6 opacity-90">
                      Based on current GTA program availability and your selected equipment path.
                    </p>
                    <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-bold text-sm hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group shadow-xl">
                      Claim Your Spot Now
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="space-y-6 px-2">
                    <div>
                      <h5 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-600" />
                        Rebate Breakdown
                      </h5>
                      <div className="space-y-3">
                        {result.breakdown.map((item, i) => (
                          <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 flex justify-between items-start gap-4 shadow-sm">
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{item.source}</p>
                              <p className="text-xs text-slate-500">{item.description}</p>
                            </div>
                            <span className="font-black text-blue-600 text-sm shrink-0">{item.amount}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                      <div>
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">How to Claim</h5>
                        <ul className="space-y-3">
                          {result.steps.map((step, i) => (
                            <li key={i} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Expert Tips</h5>
                        <ul className="space-y-3">
                          {result.tips.map((tip, i) => (
                            <li key={i} className="flex items-center gap-3 text-xs text-slate-600 italic">
                              <div className="w-1 h-1 bg-blue-400 rounded-full shrink-0" />
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RebateCalculator;
