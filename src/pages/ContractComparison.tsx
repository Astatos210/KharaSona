import React, { useState, useMemo } from 'react';
import {
  GitCompare,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  ArrowRightLeft,
  Sliders,
  Info,
  Calendar,
  Layers,
  BarChart3,
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  Legend,
} from 'recharts';
import { ContractSymbol } from '../types';
import { CONTRACT_METADATA, CONTRACT_LIST } from '../data/contractMetadata';
import { calculatePairComparison, CONTRACT_EXPIRIES } from '../data/sampleMarketData';

export const ContractComparison: React.FC = () => {
  // Default selections specified by prompt
  const [contractA, setContractA] = useState<ContractSymbol>('GOLDPETAL');
  const [contractB, setContractB] = useState<ContractSymbol>('GOLDGUINEA');
  const [expiryTolerance, setExpiryTolerance] = useState<number>(7); // 3, 7, 14
  const [timeRange, setTimeRange] = useState<number>(20); // 7, 20, 60

  // Calculate pair analytics dynamically based on user state
  const pairData = useMemo(() => {
    return calculatePairComparison(contractA, contractB, timeRange, expiryTolerance);
  }, [contractA, contractB, timeRange, expiryTolerance]);

  const metaA = CONTRACT_METADATA[contractA];
  const metaB = CONTRACT_METADATA[contractB];

  // Identical contract edge case handling
  const isIdentical = contractA === contractB;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-navy-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            Contract Comparison
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Normalized relative valuation, spread volatility, and statistical dispersion across MCX gold contracts
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-gold-bright bg-gold/10 px-3 py-1.5 rounded-lg border border-gold/25 self-start sm:self-auto">
          <span>Spread = Normalized Price A − Normalized Price B</span>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <section className="bg-navy-900 border border-navy-800 rounded-xl p-4 shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Contract A Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Contract A (Base Leg)
            </label>
            <select
              value={contractA}
              onChange={(e) => setContractA(e.target.value as ContractSymbol)}
              className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent font-medium"
              aria-label="Select Contract A"
            >
              {CONTRACT_LIST.map((c) => (
                <option key={c.symbol} value={c.symbol}>
                  {c.symbol} ({c.name})
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-400 block truncate">
              {metaA.lotDescription} • Purity {metaA.purity}
            </span>
          </div>

          {/* Contract B Dropdown */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Contract B (Comparison Leg)
            </label>
            <select
              value={contractB}
              onChange={(e) => setContractB(e.target.value as ContractSymbol)}
              className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent font-medium"
              aria-label="Select Contract B"
            >
              {CONTRACT_LIST.map((c) => (
                <option key={c.symbol} value={c.symbol}>
                  {c.symbol} ({c.name})
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-400 block truncate">
              {metaB.lotDescription} • Purity {metaB.purity}
            </span>
          </div>

          {/* Expiry Matching Tolerance */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Expiry Tolerance (Days)
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-navy-950 p-1 rounded-lg border border-navy-800">
              {[3, 7, 14].map((tol) => (
                <button
                  key={tol}
                  type="button"
                  onClick={() => setExpiryTolerance(tol)}
                  className={`py-1.5 text-xs font-semibold rounded transition-colors text-center ${
                    expiryTolerance === tol
                      ? 'bg-gold text-navy-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  aria-pressed={expiryTolerance === tol}
                >
                  {tol}d
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-400 block">
              Maximum allowable expiry calendar delta
            </span>
          </div>

          {/* Time Range Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Rolling History Range
            </label>
            <div className="grid grid-cols-3 gap-1.5 bg-navy-950 p-1 rounded-lg border border-navy-800">
              {[7, 20, 60].map((tr) => (
                <button
                  key={tr}
                  type="button"
                  onClick={() => setTimeRange(tr)}
                  className={`py-1.5 text-xs font-semibold rounded transition-colors text-center ${
                    timeRange === tr
                      ? 'bg-gold text-navy-950 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  aria-pressed={timeRange === tr}
                >
                  {tr}d
                </button>
              ))}
            </div>
            <span className="text-[11px] text-slate-400 block">
              Historical sample calculation window
            </span>
          </div>
        </div>
      </section>

      {/* Identical Contract Warning Guard */}
      {isIdentical ? (
        <div className="p-8 text-center bg-navy-900 border border-navy-800 rounded-xl space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-slate-100">Identical Contract Selected</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto">
            Please choose two distinct contracts (for example, <strong>GOLDPETAL</strong> and <strong>GOLDGUINEA</strong>) to calculate comparative relative pricing and historical spread metrics.
          </p>
        </div>
      ) : (
        <>
          {/* Status Badge & Analytical Explanation */}
          <div
            className={`p-4 rounded-xl border transition-all ${
              pairData.isUnusual
                ? 'bg-amber-500/10 border-amber-500/30'
                : 'bg-navy-900 border-navy-800'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                    pairData.isUnusual
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                      : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25'
                  }`}
                >
                  {pairData.isUnusual ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                      Unusual relative pricing
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Normal pricing equilibrium
                    </>
                  )}
                </span>
                <span className="text-xs text-slate-400">
                  Tolerance: {pairData.expiryGapDays}d gap vs {expiryTolerance}d limit (
                  <strong className={pairData.isToleranceSatisfied ? 'text-emerald-400' : 'text-amber-400'}>
                    {pairData.isToleranceSatisfied ? 'Passed' : 'Exceeded'}
                  </strong>
                  )
                </span>
              </div>

              <div className="text-xs font-mono text-slate-300">
                Pair: <span className="text-gold-bright">{contractA}</span> /{' '}
                <span className="text-gold-bright">{contractB}</span>
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed">
              {pairData.isUnusual ? (
                <>
                  The current spread is above its recent historical range. Further checks are
                  required before treating it as a research signal.
                </>
              ) : (
                <>
                  The spread is trading within standard historical tolerances. No significant
                  deviation detected across the selected time horizon.
                </>
              )}
            </p>
          </div>

          {/* Key Metric Cards */}
          <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {/* Card 1: Contract A Normalized Price */}
            <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block truncate">
                {contractA} Norm. Price
              </span>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-100 mt-1">
                ₹{pairData.priceA.toLocaleString('en-IN', { minimumFractionDigits: 2 })}/g
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                999 base ({CONTRACT_EXPIRIES[contractA].display})
              </span>
            </div>

            {/* Card 2: Contract B Normalized Price */}
            <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block truncate">
                {contractB} Norm. Price
              </span>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-100 mt-1">
                ₹{pairData.priceB.toLocaleString('en-IN', { minimumFractionDigits: 2 })}/g
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                999 base ({CONTRACT_EXPIRIES[contractB].display})
              </span>
            </div>

            {/* Card 3: Current Spread */}
            <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block truncate">
                Current Spread
              </span>
              <div className={`text-base sm:text-lg font-bold font-mono mt-1 ${pairData.currentSpread >= 0 ? 'text-gold-bright' : 'text-sky-400'}`}>
                {pairData.currentSpread >= 0 ? '+' : ''}₹{pairData.currentSpread.toFixed(2)}/g
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                A minus B delta
              </span>
            </div>

            {/* Card 4: Historical Average Spread */}
            <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block truncate">
                Historical Avg Spread
              </span>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-200 mt-1">
                ₹{pairData.historicalAvgSpread.toFixed(2)}/g
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {timeRange}d rolling mean
              </span>
            </div>

            {/* Card 5: Current Z-Score */}
            <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block truncate">
                Current Z-Score
              </span>
              <div
                className={`text-base sm:text-lg font-bold font-mono mt-1 ${
                  pairData.isUnusual ? 'text-amber-400' : 'text-slate-100'
                }`}
              >
                {pairData.currentZScore >= 0 ? '+' : ''}{pairData.currentZScore.toFixed(2)}
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                {pairData.isUnusual ? '±2.0 threshold broken' : 'Within normal band'}
              </span>
            </div>

            {/* Card 6: Expiry Gap */}
            <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block truncate">
                Expiry Gap
              </span>
              <div className="text-base sm:text-lg font-bold font-mono text-slate-100 mt-1">
                {pairData.expiryGapDays} {pairData.expiryGapDays === 1 ? 'day' : 'days'}
              </div>
              <span
                className={`text-[10px] font-semibold block mt-0.5 ${
                  pairData.isToleranceSatisfied ? 'text-emerald-400' : 'text-amber-400'
                }`}
              >
                {pairData.isToleranceSatisfied ? 'Within tolerance' : 'Exceeds tolerance'}
              </span>
            </div>

            {/* Card 7: Liquidity Status */}
            <div className="col-span-2 sm:col-span-1 bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
              <span className="text-[11px] font-medium text-slate-400 block truncate">
                Liquidity Status
              </span>
              <div className="text-base sm:text-lg font-bold text-emerald-400 mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Passed</span>
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Volume & OI verified
              </span>
            </div>
          </section>

          {/* Charts Grid */}
          <div className="space-y-6">
            {/* Chart 1: Normalized Price Comparison Chart */}
            <div className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-lg space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-navy-800">
                <h3 className="text-base font-bold text-slate-100">
                  Normalized Price Trajectory: {contractA} vs {contractB}
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  INR / gram (999 fineness normalized)
                </span>
              </div>
              <div className="h-72 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pairData.series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="displayDate" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis
                      domain={['auto', 'auto']}
                      stroke="#64748B"
                      fontSize={11}
                      tickFormatter={(v) => `₹${v}`}
                      tickLine={false}
                      width={65}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: '#334155',
                        borderRadius: '0.5rem',
                        fontSize: '12px',
                      }}
                      formatter={(val: number) => [`₹${val.toFixed(2)}/g`]}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line
                      type="monotone"
                      dataKey="priceA"
                      name={`${contractA} (Leg A)`}
                      stroke="#F4C95D"
                      strokeWidth={2.2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="priceB"
                      name={`${contractB} (Leg B)`}
                      stroke="#38BDF8"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 2: Spread Chart with Average Line */}
            <div className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-lg space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-navy-800">
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    Price Spread (Normalized Price A − Normalized Price B)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Evolution of price difference per gram with rolling mean baseline
                  </p>
                </div>
                <div className="text-xs font-mono text-gold-bright bg-navy-950 px-2.5 py-1 rounded border border-navy-800">
                  Latest: ₹{pairData.currentSpread.toFixed(2)}/g
                </div>
              </div>
              <div className="h-64 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pairData.series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="displayDate" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis
                      domain={['auto', 'auto']}
                      stroke="#64748B"
                      fontSize={11}
                      tickFormatter={(v) => `₹${v}`}
                      tickLine={false}
                      width={55}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: '#334155',
                        borderRadius: '0.5rem',
                        fontSize: '12px',
                      }}
                      formatter={(val: number) => [`₹${val.toFixed(2)}/g`]}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <ReferenceLine
                      y={pairData.historicalAvgSpread}
                      stroke="#94A3B8"
                      strokeDasharray="4 4"
                      label={{
                        value: `Mean ₹${pairData.historicalAvgSpread.toFixed(2)}`,
                        fill: '#94A3B8',
                        fontSize: 10,
                        position: 'insideTopLeft',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="spread"
                      name="Normalized Spread (₹/g)"
                      stroke="#F4C95D"
                      strokeWidth={2.4}
                      dot={{ r: 2 }}
                      activeDot={{ r: 5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="rollingMean"
                      name="Rolling Avg Spread"
                      stroke="#64748B"
                      strokeWidth={1.5}
                      strokeDasharray="3 3"
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Chart 3: Rolling Z-Score Chart with Thresholds */}
            <div className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-lg space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-navy-800">
                <div>
                  <h3 className="text-base font-bold text-slate-100">
                    Rolling Dispersion Z-Score
                  </h3>
                  <p className="text-xs text-slate-400">
                    Z-score = (Spread − Rolling Avg) / Rolling Std. Dashed lines indicate ±2.0 alert boundary.
                  </p>
                </div>
                <div
                  className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                    pairData.isUnusual
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-navy-950 text-slate-300 border-navy-800'
                  }`}
                >
                  Current: {pairData.currentZScore >= 0 ? '+' : ''}{pairData.currentZScore.toFixed(2)}σ
                </div>
              </div>
              <div className="h-64 w-full pt-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={pairData.series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="displayDate" stroke="#64748B" fontSize={11} tickLine={false} />
                    <YAxis
                      domain={[-3.5, 3.5]}
                      ticks={[-3, -2, -1, 0, 1, 2, 3]}
                      stroke="#64748B"
                      fontSize={11}
                      tickLine={false}
                      width={45}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F172A',
                        borderColor: '#334155',
                        borderRadius: '0.5rem',
                        fontSize: '12px',
                      }}
                      formatter={(val: number) => [`${val.toFixed(2)} σ`]}
                    />
                    <ReferenceLine y={2.0} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: '+2.0 Threshold', fill: '#F59E0B', fontSize: 10 }} />
                    <ReferenceLine y={0.0} stroke="#475569" strokeWidth={1} />
                    <ReferenceLine y={-2.0} stroke="#F59E0B" strokeDasharray="3 3" label={{ value: '-2.0 Threshold', fill: '#F59E0B', fontSize: 10 }} />
                    <Line
                      type="monotone"
                      dataKey="zScore"
                      name="Dispersion Z-Score"
                      stroke="#22C55E"
                      strokeWidth={2.2}
                      dot={{ r: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts 4 & 5: Volume and Open-Interest Comparison Side-by-Side */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Volume Comparison Chart */}
              <div className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-navy-800">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-sky-400" />
                    Trading Volume (Lots)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Daily Traded</span>
                </div>
                <div className="h-60 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={pairData.series}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                      <XAxis dataKey="displayDate" stroke="#64748B" fontSize={10} tickLine={false} />
                      <YAxis stroke="#64748B" fontSize={10} tickLine={false} width={45} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          borderColor: '#334155',
                          borderRadius: '0.5rem',
                          fontSize: '11px',
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Bar dataKey="volumeA" name={`${contractA} Vol`} fill="#F4C95D" radius={[3, 3, 0, 0]} />
                      <Bar dataKey="volumeB" name={`${contractB} Vol`} fill="#38BDF8" radius={[3, 3, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Open-Interest Comparison Chart */}
              <div className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-navy-800">
                  <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-emerald-400" />
                    Open Interest (Contracts)
                  </h3>
                  <span className="text-xs text-slate-400 font-mono">Market Depth</span>
                </div>
                <div className="h-60 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={pairData.series}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                      <XAxis dataKey="displayDate" stroke="#64748B" fontSize={10} tickLine={false} />
                      <YAxis stroke="#64748B" fontSize={10} tickLine={false} width={45} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0F172A',
                          borderColor: '#334155',
                          borderRadius: '0.5rem',
                          fontSize: '11px',
                        }}
                      />
                      <Legend wrapperStyle={{ fontSize: '11px' }} />
                      <Line
                        type="monotone"
                        dataKey="oiA"
                        name={`${contractA} OI`}
                        stroke="#F4C95D"
                        strokeWidth={2}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="oiB"
                        name={`${contractB} OI`}
                        stroke="#38BDF8"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ContractComparison;
