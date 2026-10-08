import React, { useState } from 'react';
import {
  History,
  Sliders,
  TrendingUp,
  Percent,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  ShieldCheck,
  Zap,
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
import { SAMPLE_BACKTEST_DATA } from '../data/sampleMarketData';

export const HistoricalValidation: React.FC = () => {
  const availablePairs = Object.keys(SAMPLE_BACKTEST_DATA);
  const [selectedPair, setSelectedPair] = useState<string>('GOLDPETAL / GOLDGUINEA');

  const backtest = SAMPLE_BACKTEST_DATA[selectedPair] ?? SAMPLE_BACKTEST_DATA['GOLDPETAL / GOLDGUINEA'];
  const { settings, summary, equityCurve, trades } = backtest;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-navy-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            Historical Validation
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Out-of-sample backtest simulation for relative-value statistical mean-reversion with transaction frictions and calendar expiry constraints.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-navy-900 border border-navy-800 px-3 py-1.5 rounded-lg self-start sm:self-auto font-mono">
          <span>Out-of-Sample Window: 2026 YTD</span>
        </div>
      </div>

      {/* Settings Panel */}
      <section className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-md">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-navy-800">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-100">
            <Sliders className="w-4 h-4 text-gold-bright" />
            <span>Simulation Parameters & Model Configuration</span>
          </div>
          <span className="text-xs text-slate-400">Fixed Baseline Model</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pair Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Validation Contract Pair
            </label>
            <select
              value={selectedPair}
              onChange={(e) => setSelectedPair(e.target.value)}
              className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-gold font-medium"
              aria-label="Select Backtest Pair"
            >
              {availablePairs.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <span className="text-[11px] text-slate-400 block">
              Updates metrics and trade journal
            </span>
          </div>

          {/* Entry & Exit Thresholds */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Z-Score Entry / Exit Triggers
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-navy-950 px-2.5 py-1.5 rounded-lg border border-navy-800 text-xs">
                <span className="text-[10px] text-slate-400 block">Entry (±)</span>
                <span className="font-mono font-bold text-slate-200">±{settings.entryThresholdZ.toFixed(1)}σ</span>
              </div>
              <div className="bg-navy-950 px-2.5 py-1.5 rounded-lg border border-navy-800 text-xs">
                <span className="text-[10px] text-slate-400 block">Exit (±)</span>
                <span className="font-mono font-bold text-slate-200">±{settings.exitThresholdZ.toFixed(1)}σ</span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Statistical dispersion bounds
            </span>
          </div>

          {/* Friction Assumptions */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Estimated Transaction Frictions
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-navy-950 px-2.5 py-1.5 rounded-lg border border-navy-800 text-xs">
                <span className="text-[10px] text-slate-400 block">Cost / Leg</span>
                <span className="font-mono font-bold text-slate-200">{(settings.costPerLegPct).toFixed(2)}%</span>
              </div>
              <div className="bg-navy-950 px-2.5 py-1.5 rounded-lg border border-navy-800 text-xs">
                <span className="text-[10px] text-slate-400 block">Slippage</span>
                <span className="font-mono font-bold text-slate-200">{(settings.slippagePerLegPct).toFixed(2)}%</span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Brokerage, exchange levy, STT/CTT
            </span>
          </div>

          {/* Periods & Constraints */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 block">
              Expiry & Test Timeline
            </label>
            <div className="bg-navy-950 px-3 py-1.5 rounded-lg border border-navy-800 text-xs space-y-0.5">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Cutoff:</span>
                <span className="font-mono text-slate-200">{settings.expiryCutoffDays} days to expiry</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Test Period:</span>
                <span className="font-mono text-slate-200 truncate">01 Jan - 07 Oct 2026</span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 block">
              Train: 01 Jan 2025 to 31 Dec 2025
            </span>
          </div>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-medium text-slate-400 block">Signals Generated</span>
          <div className="text-xl font-bold font-mono text-slate-100 mt-1">
            {summary.signalsGenerated}
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">Threshold breaches</span>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-medium text-slate-400 block">Completed Trades</span>
          <div className="text-xl font-bold font-mono text-slate-100 mt-1">
            {summary.completedTrades}
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">Roundtrip cycles</span>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-medium text-slate-400 block">Gross Paired Return</span>
          <div className="text-xl font-bold font-mono text-sky-400 mt-1">
            +{summary.grossPairedReturnPct.toFixed(1)}%
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">Pre-friction alpha</span>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-medium text-slate-400 block">Estimated Costs</span>
          <div className="text-xl font-bold font-mono text-rose-400 mt-1">
            -{summary.estimatedCostsPct.toFixed(1)}%
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">Total friction drag</span>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-medium text-slate-400 block">Net Paired Return</span>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
            +{summary.netPairedReturnPct.toFixed(1)}%
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">Post-cost realization</span>
        </div>

        <div className="bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-medium text-slate-400 block">Max Drawdown</span>
          <div className="text-xl font-bold font-mono text-amber-400 mt-1">
            {summary.maxDrawdownPct.toFixed(1)}%
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">Peak-to-trough decline</span>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-navy-900 border border-navy-800 rounded-xl p-3.5 shadow-sm">
          <span className="text-[11px] font-medium text-slate-400 block">Test Period Status</span>
          <div className="text-sm font-bold text-slate-200 mt-1 truncate">
            {summary.testPeriodStatus}
          </div>
          <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
            Statistical validity pass
          </span>
        </div>
      </section>

      {/* Equity-Curve Chart */}
      <section className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-navy-800">
          <div>
            <h3 className="text-base font-bold text-slate-100">
              Cumulative Equity Curve (Base = 100)
            </h3>
            <p className="text-xs text-slate-400">
              Strategy before costs vs Strategy after costs vs Gold Benchmark (Unseen Test Window)
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">Rebased to 100.0</span>
        </div>

        <div className="h-72 w-full pt-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={equityCurve}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="displayDate" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis
                domain={['auto', 'auto']}
                stroke="#64748B"
                fontSize={11}
                tickFormatter={(val) => `${val.toFixed(1)}`}
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
                formatter={(val: number) => [val.toFixed(2)]}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line
                type="monotone"
                dataKey="strategyBeforeCosts"
                name="Strategy Before Costs"
                stroke="#38BDF8"
                strokeWidth={2}
                dot={{ r: 2 }}
              />
              <Line
                type="monotone"
                dataKey="strategyAfterCosts"
                name="Strategy After Costs"
                stroke="#22C55E"
                strokeWidth={2.4}
                dot={{ r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="goldBenchmark"
                name="Gold Benchmark"
                stroke="#F4C95D"
                strokeWidth={1.8}
                strokeDasharray="4 3"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Note */}
        <div className="bg-navy-950 p-3.5 rounded-lg border border-navy-800 text-xs text-slate-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-gold shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Historical results are illustrative sample results and do not guarantee future performance.</strong> Model returns are hypothetical, reconstructed using synthetic Bhavcopy data, and do not represent actual exchange trade fills or execution slippages under extreme market shocks.
          </p>
        </div>
      </section>

      {/* Trade Log Table */}
      <section className="bg-navy-900 border border-navy-800 rounded-xl overflow-hidden shadow-lg">
        <div className="p-5 border-b border-navy-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100">Trade Execution Journal</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulated entries, dispersion exits, and net performance breakdown for {selectedPair}
            </p>
          </div>
          <span className="text-xs text-slate-400 bg-navy-950 px-2.5 py-1 rounded border border-navy-800">
            {trades.length} Records
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm" aria-label="Backtest Trades Table">
            <thead className="bg-navy-950/70 text-slate-400 text-xs uppercase tracking-wider border-b border-navy-800">
              <tr>
                <th scope="col" className="px-4 py-3 font-semibold">Trade ID</th>
                <th scope="col" className="px-4 py-3 font-semibold">Entry Date</th>
                <th scope="col" className="px-4 py-3 font-semibold">Exit Date</th>
                <th scope="col" className="px-4 py-3 font-semibold">Pair</th>
                <th scope="col" className="px-4 py-3 font-semibold text-center">Entry Z</th>
                <th scope="col" className="px-4 py-3 font-semibold text-center">Exit Z</th>
                <th scope="col" className="px-4 py-3 font-semibold text-right">Gross Result</th>
                <th scope="col" className="px-4 py-3 font-semibold text-right">Cost</th>
                <th scope="col" className="px-4 py-3 font-semibold text-right">Net Result</th>
                <th scope="col" className="px-4 py-3 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-800/80">
              {trades.map((tr) => (
                <tr key={tr.id} className="hover:bg-navy-850/60 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gold-bright whitespace-nowrap">
                    {tr.id}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-200 whitespace-nowrap">
                    {tr.entryDate}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-200 whitespace-nowrap">
                    {tr.exitDate}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-300 whitespace-nowrap">
                    {tr.pair}
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-xs text-slate-200 whitespace-nowrap">
                    {tr.entryZScore > 0 ? '+' : ''}{tr.entryZScore.toFixed(2)}σ
                  </td>
                  <td className="px-4 py-3 text-center font-mono text-xs text-slate-200 whitespace-nowrap">
                    {tr.exitZScore > 0 ? '+' : ''}{tr.exitZScore.toFixed(2)}σ
                  </td>
                  <td className={`px-4 py-3 text-right font-mono text-xs font-bold whitespace-nowrap ${
                    tr.grossResultPct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {tr.grossResultPct >= 0 ? '+' : ''}{tr.grossResultPct.toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-xs text-slate-400 whitespace-nowrap">
                    -{tr.estimatedCostPct.toFixed(2)}%
                  </td>
                  <td className={`px-4 py-3 text-right font-mono text-xs font-bold whitespace-nowrap ${
                    tr.netResultPct >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {tr.netResultPct >= 0 ? '+' : ''}{tr.netResultPct.toFixed(2)}%
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                        tr.status === 'Closed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {tr.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default HistoricalValidation;
