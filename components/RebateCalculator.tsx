
import React, { useState } from 'react';
import { Calculator, Zap, TrendingUp, Info } from 'lucide-react';

const RebateCalculator: React.FC = () => {
  const [postalCode, setPostalCode] = useState('');
  const [homeSize, setHomeSize] = useState('2000');
  const [upgradeType, setUpgradeType] = useState('heat-pump');
  const [calculated, setCalculated] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setCalculated(true);
  };

  return (
    <section id="rebates" className="py-24 mesh-bg relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-blue-600 font-bold uppercase tracking-wider mb-4">Savings Potential</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Calculate Your 2024 Energy Rebates
            </h3>
            <p className="text-lg text-slate-600 mb-10 max-w-xl">
              Qualified homeowners in Ontario can save up to $10,500 via Enbridge and Save on Energy programs. Let's find out how much you can keep in your pocket.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">HER+ Program</h4>
                  <p className="text-slate-600">Up to $10,000 for energy audits and equipment upgrades.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white shadow-md rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Save on Energy</h4>
                  <p className="text-slate-600">Incentives for air-source heat pumps and insulation.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-lg">
            <div className="glass p-8 md:p-10 rounded-[40px] shadow-2xl border border-white/50 relative">
              <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-4 py-2 rounded-full font-bold text-sm animate-bounce shadow-lg">
                Limited Rebate Spots!
              </div>

              <form onSubmit={handleCalculate} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Postal Code (for GTA verification)</label>
                  <input 
                    type="text" 
                    placeholder="M1A 1A1"
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Home Size (Approx. sqft)</label>
                  <select 
                    className="w-full px-5 py-4 rounded-2xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
                    value={homeSize}
                    onChange={(e) => setHomeSize(e.target.value)}
                  >
                    <option value="1000">Up to 1,500 sqft</option>
                    <option value="2000">1,500 - 2,500 sqft</option>
                    <option value="3500">2,500 - 4,000 sqft</option>
                    <option value="5000">4,000+ sqft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Planned Upgrade</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['heat-pump', 'furnace', 'ac', 'all'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setUpgradeType(type)}
                        className={`px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-tight transition-all ${upgradeType === type ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-600 hover:border-blue-300'}`}
                      >
                        {type.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 group"
                >
                  <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  See Savings Result
                </button>
              </form>

              {calculated && (
                <div className="mt-8 p-6 bg-blue-600 text-white rounded-3xl animate-in zoom-in duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-blue-100 font-medium">Estimated Rebates</span>
                    <Info className="w-5 h-5 opacity-60" />
                  </div>
                  <div className="text-4xl md:text-5xl font-black mb-2">$8,500 - $10,500</div>
                  <p className="text-sm text-blue-50 leading-relaxed mb-6">
                    Based on your profile, you are eligible for premium heat pump incentives. Book an audit to lock in this amount.
                  </p>
                  <button className="w-full py-4 bg-white text-blue-600 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
                    Lock In My Rebate
                  </button>
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
