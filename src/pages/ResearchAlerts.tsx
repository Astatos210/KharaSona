import React, { useState } from 'react';
import {
  BellRing,
  Filter,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Info,
} from 'lucide-react';
import { SAMPLE_RESEARCH_ALERTS } from '../data/sampleMarketData';
import { AlertFilterCategory } from '../types';
import { LogoIcon } from '../components/Logo';

export const ResearchAlerts: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<AlertFilterCategory>('all');

  const filteredAlerts = SAMPLE_RESEARCH_ALERTS.filter((alert) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'investigate') return alert.alertStatus === 'Investigate';
    if (activeFilter === 'no_signal') return alert.alertStatus === 'No signal';
    if (activeFilter === 'suppressed') return alert.alertStatus === 'Suppressed';
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-navy-800">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            Research Alerts
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            KharaSona generates alerts only when a relative-price difference is unusual and
            passes basic expiry, liquidity, and cost checks.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-navy-900 border border-navy-800 px-3 py-1.5 rounded-lg self-start sm:self-auto">
          <Info className="w-3.5 h-3.5 text-gold-bright" />
          <span>Automated sanity filtering</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5" />
          Filter:
        </span>

        {(
          [
            { id: 'all', label: 'All Alerts', count: SAMPLE_RESEARCH_ALERTS.length },
            {
              id: 'investigate',
              label: 'Investigate',
              count: SAMPLE_RESEARCH_ALERTS.filter((a) => a.alertStatus === 'Investigate').length,
            },
            {
              id: 'no_signal',
              label: 'No Signal',
              count: SAMPLE_RESEARCH_ALERTS.filter((a) => a.alertStatus === 'No signal').length,
            },
            {
              id: 'suppressed',
              label: 'Suppressed',
              count: SAMPLE_RESEARCH_ALERTS.filter((a) => a.alertStatus === 'Suppressed').length,
            },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 flex items-center gap-2 border whitespace-nowrap ${
              activeFilter === tab.id
                ? 'bg-gold text-navy-950 border-gold font-bold shadow-sm'
                : 'bg-navy-900 text-slate-300 border-navy-800 hover:bg-navy-850 hover:text-slate-100'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                activeFilter === tab.id
                  ? 'bg-navy-950/20 text-navy-950 font-bold'
                  : 'bg-navy-800 text-slate-400'
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Alert Table or Empty State */}
      <section className="bg-navy-900 border border-navy-800 rounded-xl overflow-hidden shadow-lg">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="flex justify-center">
              <LogoIcon size={48} className="opacity-40" />
            </div>
            <h3 className="text-base font-bold text-slate-200">
              No meaningful signal detected for the selected filters.
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Current market spreads across the filtered category remain inside statistical bounds or have been suppressed by liquidity/expiry guards.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm" aria-label="Research Alerts Table">
              <thead className="bg-navy-950/70 text-slate-400 text-xs uppercase tracking-wider border-b border-navy-800">
                <tr>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Pair</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold">Direction</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold text-center">Z-Score</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold text-center">Expiry Gap</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold text-center">Volume Status</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold text-center">OI Status</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold text-center">Cost Check</th>
                  <th scope="col" className="px-4 py-3.5 font-semibold text-right">Alert Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-800/80">
                {filteredAlerts.map((item) => {
                  const isInvestigate = item.alertStatus === 'Investigate';
                  const isSuppressed = item.alertStatus === 'Suppressed';

                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-navy-850/60 transition-colors"
                    >
                      {/* Pair */}
                      <td className="px-4 py-4 font-bold text-slate-100 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-gold-bright">{item.pair}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-normal block mt-0.5 max-w-xs truncate">
                          {item.detail}
                        </span>
                      </td>

                      {/* Direction */}
                      <td className="px-4 py-4 text-xs font-medium whitespace-nowrap">
                        {item.direction.includes('expensive') ? (
                          <span className="inline-flex items-center gap-1 text-amber-400">
                            <ArrowUpRight className="w-3.5 h-3.5" />
                            {item.direction}
                          </span>
                        ) : item.direction.includes('cheap') ? (
                          <span className="inline-flex items-center gap-1 text-sky-400">
                            <ArrowDownRight className="w-3.5 h-3.5" />
                            {item.direction}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-slate-400">
                            <Minus className="w-3.5 h-3.5" />
                            {item.direction}
                          </span>
                        )}
                      </td>

                      {/* Z-Score */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <span
                          className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                            Math.abs(item.zScore) >= 2.0
                              ? item.zScore > 0
                                ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                                : 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                              : 'bg-navy-950 text-slate-300'
                          }`}
                        >
                          {item.zScore > 0 ? '+' : ''}{item.zScore.toFixed(2)}
                        </span>
                      </td>

                      {/* Expiry Gap */}
                      <td className="px-4 py-4 text-center font-mono text-xs text-slate-300 whitespace-nowrap">
                        {item.expiryGap}
                      </td>

                      {/* Volume Status */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                            item.volumeStatus === 'Passed'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-rose-500/10 text-rose-400'
                          }`}
                        >
                          {item.volumeStatus === 'Passed' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {item.volumeStatus}
                        </span>
                      </td>

                      {/* OI Status */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold ${
                            item.openInterestStatus === 'Passed'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {item.openInterestStatus === 'Passed' ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <AlertTriangle className="w-3 h-3" />
                          )}
                          {item.openInterestStatus}
                        </span>
                      </td>

                      {/* Cost Check */}
                      <td className="px-4 py-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                            item.costCheck === 'Passed'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : 'bg-navy-950 text-slate-400'
                          }`}
                        >
                          {item.costCheck}
                        </span>
                      </td>

                      {/* Alert Status */}
                      <td className="px-4 py-4 text-right whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                            isInvestigate
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm'
                              : isSuppressed
                              ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                              : 'bg-navy-800 text-slate-300 border border-navy-700'
                          }`}
                        >
                          {item.alertStatus}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Advisory Context Card */}
      <section className="bg-navy-950 p-4 rounded-xl border border-navy-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-200 font-semibold">
          <Info className="w-4 h-4 text-gold-bright" />
          <span>Research Alert Lifecycle & Suppression Logic</span>
        </div>
        <p className="leading-relaxed">
          Alerts labeled <strong>Investigate</strong> signify contracts that have exceeded the statistical dispersion threshold (Z-score ≥ ±2.0) while passing liquidity, contract expiry calendar proximity, and brokerage transaction cost thresholds.
          Alerts labeled <strong>Suppressed</strong> are withheld from signal generation because physical delivery cycles, large calendar gaps, or insufficient lot turn-over introduce execution drag.
        </p>
      </section>
    </div>
  );
};

export default ResearchAlerts;
