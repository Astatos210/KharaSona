import React from 'react';
import { CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

interface DataQualityPanelProps {
  className?: string;
}

export const DataQualityPanel: React.FC<DataQualityPanelProps> = ({
  className = '',
}) => {
  const qualityChecks = [
    { label: 'Date validation', status: 'Passed', value: '07 Oct 2026 == 07 Oct 2026' },
    { label: 'Missing close prices', status: 'Passed', value: '0 detected' },
    { label: 'Missing expiry dates', status: 'Passed', value: '0 detected' },
    { label: 'Duplicate records', status: 'Passed', value: '0 detected' },
    { label: 'Invalid symbols', status: 'Passed', value: '0 detected' },
  ];

  return (
    <div
      className={`bg-navy-900 border border-navy-700/80 rounded-xl p-5 shadow-lg relative overflow-hidden ${className}`}
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-navy-800">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
              Bhavcopy Data Quality Engine
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Validated
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Automated sanity verification across raw exchange contract records
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 bg-navy-950/60 px-3 py-1.5 rounded-lg border border-navy-800">
          <Clock className="w-3.5 h-3.5 text-gold-bright" />
          <span>Last processed: <strong className="text-slate-200">08 October 2026, 09:15 IST</strong></span>
        </div>
      </div>

      {/* Pipeline Status Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="bg-navy-950/70 p-3 rounded-lg border border-navy-800/80">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
            Requested Date
          </span>
          <span className="text-sm font-semibold text-slate-200 mt-0.5 block">
            07 October 2026
          </span>
        </div>
        <div className="bg-navy-950/70 p-3 rounded-lg border border-navy-800/80">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
            Returned Date
          </span>
          <span className="text-sm font-semibold text-slate-200 mt-0.5 block">
            07 October 2026
          </span>
        </div>
        <div className="bg-navy-950/70 p-3 rounded-lg border border-navy-800/80">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
            Records Parsed
          </span>
          <span className="text-sm font-semibold text-slate-200 mt-0.5 block">
            4 / 4 Active
          </span>
        </div>
        <div className="bg-navy-950/70 p-3 rounded-lg border border-navy-800/80">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 block font-medium">
            Integrity Score
          </span>
          <span className="text-sm font-semibold text-emerald-400 mt-0.5 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            100% Pass
          </span>
        </div>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
        {qualityChecks.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2.5 rounded-lg bg-navy-850 border border-navy-800/70 text-xs"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <span className="text-slate-200 font-medium block truncate">{item.label}</span>
                <span className="text-[10px] text-slate-400 block truncate">{item.value}</span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
              Pass
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataQualityPanel;
