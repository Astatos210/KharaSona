import React from 'react';
import {
  Calendar,
  Layers,
  GitCompare,
  Bell,
  ShieldCheck,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  getLatestContractSnapshots,
  get20DayNormalizedSeries,
  LATEST_MARKET_DATE,
} from '../data/sampleMarketData';
import DataQualityPanel from '../components/DataQualityPanel';
import { PageId } from '../components/Navbar';

interface MarketOverviewProps {
  onNavigate: (page: PageId) => void;
}

export const MarketOverview: React.FC<MarketOverviewProps> = ({ onNavigate }) => {
  const snapshots = getLatestContractSnapshots();
  const normalized20DayData = get20DayNormalizedSeries();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy-900 via-navy-850 to-navy-950 border border-navy-700/80 p-6 sm:p-8 shadow-xl">
        {/* Subtle decorative radial gold glow */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/25 text-gold-bright text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-bright animate-ping" />
            MCX Gold Relative-Value Intelligence
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Same gold. <span className="text-gold-bright">Clearer prices.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            KharaSona normalizes related MCX gold contracts, compares comparable expiries,
            detects unusual relative pricing, and validates research signals after liquidity
            and cost checks.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('comparison')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold hover:bg-gold-bright text-navy-950 font-semibold text-sm transition-all duration-150 shadow-md hover:shadow-gold/20 focus:outline-none focus:ring-2 focus:ring-gold"
            >
              <span>Explore Contracts</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('methodology')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy-800 hover:bg-navy-750 text-slate-200 border border-navy-700 font-medium text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <span>View Methodology</span>
            </button>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="bg-navy-900 border border-navy-800 rounded-xl p-4 shadow-sm hover:border-navy-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-medium tracking-wider">Market Date</span>
            <Calendar className="w-4 h-4 text-gold" />
          </div>
          <div className="text-base sm:text-lg font-bold text-slate-100">{LATEST_MARKET_DATE}</div>
          <div className="text-[11px] text-slate-400 mt-1">Settlement baseline</div>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-xl p-4 shadow-sm hover:border-navy-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-medium tracking-wider">Contracts</span>
            <Layers className="w-4 h-4 text-gold-bright" />
          </div>
          <div className="text-2xl font-bold text-slate-100">4</div>
          <div className="text-[11px] text-slate-400 mt-1">GOLDM, TEN, GUINEA, PETAL</div>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-xl p-4 shadow-sm hover:border-navy-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-medium tracking-wider">Pairs Tracked</span>
            <GitCompare className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold text-slate-100">3</div>
          <div className="text-[11px] text-slate-400 mt-1">Expiry aligned pairs</div>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-xl p-4 shadow-sm hover:border-navy-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-medium tracking-wider">Research Alerts</span>
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </div>
          <div className="text-2xl font-bold text-amber-400">1</div>
          <div className="text-[11px] text-amber-300/80 mt-1">GOLDPETAL / GOLDGUINEA</div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-navy-900 border border-navy-800 rounded-xl p-4 shadow-sm hover:border-navy-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs uppercase font-medium tracking-wider">Data Quality</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-lg font-bold text-emerald-400 flex items-center gap-1.5">
            <span>Validated</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">0 missing or duplicate fields</div>
        </div>
      </section>

      {/* Contract Snapshot Table */}
      <section className="bg-navy-900 border border-navy-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-5 border-b border-navy-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-100">Contract Snapshot</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Physical specifications, settlement expiries, and 999-fineness normalized pricing per gram
            </p>
          </div>
          <div className="text-xs text-slate-400 bg-navy-950 px-3 py-1.5 rounded-lg border border-navy-800">
            Quotation Basis Adjusted
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm" aria-label="MCX Gold Contract Snapshot">
            <thead className="bg-navy-950/70 text-slate-400 text-xs uppercase tracking-wider border-b border-navy-800">
              <tr>
                <th scope="col" className="px-4 py-3.5 font-semibold">Contract</th>
                <th scope="col" className="px-4 py-3.5 font-semibold">Contract Size</th>
                <th scope="col" className="px-4 py-3.5 font-semibold">Quotation Basis</th>
                <th scope="col" className="px-4 py-3.5 font-semibold">Purity</th>
                <th scope="col" className="px-4 py-3.5 font-semibold">Expiry Date</th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-right">Normalized Price (/g)</th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-right">Volume (Lots)</th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-right">Open Interest</th>
                <th scope="col" className="px-4 py-3.5 font-semibold text-center">Liquidity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/80">
              {snapshots.map((item) => (
                <tr
                  key={item.symbol}
                  className="hover:bg-navy-850/60 transition-colors"
                >
                  <td className="px-4 py-3.5 font-semibold text-slate-100 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gold-bright bg-gold/10 px-2 py-0.5 rounded text-xs">
                        {item.symbol}
                      </span>
                      <span className="text-xs text-slate-300 hidden md:inline">
                        {item.contractName.split('(')[0]}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-slate-300 font-mono text-xs whitespace-nowrap">
                    {item.contractSize}
                  </td>
                  <td className="px-4 py-3.5 text-slate-300 text-xs whitespace-nowrap">
                    {item.quotationBasis}
                  </td>
                  <td className="px-4 py-3.5 text-slate-300 font-mono text-xs whitespace-nowrap">
                    <span className={item.symbol === 'GOLDM' ? 'text-amber-300' : 'text-slate-300'}>
                      {item.purity}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-slate-300 font-mono text-xs whitespace-nowrap">
                    {item.expiryDate}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono font-bold text-slate-100 whitespace-nowrap">
                    ₹{item.normalizedPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-slate-300 text-xs whitespace-nowrap">
                    {item.volume.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono text-slate-300 text-xs whitespace-nowrap">
                    {item.openInterest.toLocaleString('en-IN')}
                  </td>
                  <td className="px-4 py-3.5 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                        item.liquidityStatus === 'High'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                      }`}
                    >
                      {item.liquidityStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 20-Day Normalized Price Chart for all 4 contracts */}
      <section className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-navy-800">
          <div>
            <h2 className="text-lg font-bold text-slate-100">
              Normalized Price Trajectory (20 Trading Days)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical normalized price per gram across GOLDM, GOLDTEN, GOLDGUINEA, and GOLDPETAL
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>Unit: INR / Gram (999 Purity Equivalent)</span>
          </div>
        </div>

        <div className="h-80 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={normalized20DayData}
              margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis
                dataKey="displayDate"
                stroke="#64748B"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                domain={['auto', 'auto']}
                stroke="#64748B"
                fontSize={11}
                tickFormatter={(val) => `₹${val}`}
                tickLine={false}
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0F172A',
                  borderColor: '#334155',
                  borderRadius: '0.5rem',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                }}
                formatter={(value: number, name: string) => [
                  `₹${value.toFixed(2)} /g`,
                  name,
                ]}
                labelStyle={{ color: '#E2E8F0', fontWeight: 'bold', marginBottom: '4px' }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />
              <Line
                type="monotone"
                dataKey="GOLDPETAL"
                name="GOLDPETAL (1g)"
                stroke="#F4C95D"
                strokeWidth={2.2}
                dot={false}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="GOLDGUINEA"
                name="GOLDGUINEA (8g)"
                stroke="#38BDF8"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="GOLDTEN"
                name="GOLDTEN (10g)"
                stroke="#A78BFA"
                strokeWidth={1.8}
                dot={false}
                strokeDasharray="4 2"
              />
              <Line
                type="monotone"
                dataKey="GOLDM"
                name="GOLDM (100g, 995p)"
                stroke="#22C55E"
                strokeWidth={1.8}
                dot={false}
                strokeDasharray="2 2"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Mandatory Note */}
        <div className="bg-navy-950 p-3.5 rounded-lg border border-navy-800 text-xs text-slate-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Sample market data is used for interface demonstration.</strong> Settlement
            prices are not guaranteed executable prices. Contract prices reflect synthetic daily
            settlement records normalized to 999 purity basis.
          </p>
        </div>
      </section>

      {/* Data Quality Panel */}
      <DataQualityPanel />
    </div>
  );
};

export default MarketOverview;
