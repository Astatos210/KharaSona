import React from 'react';
import {
  Database,
  Filter,
  Calculator,
  Calendar,
  LineChart,
  ShieldAlert,
  ShieldCheck,
  LayoutDashboard,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

export const Methodology: React.FC = () => {
  const architectureSteps = [
    {
      step: 1,
      title: 'MCX Bhavcopy Data',
      desc: 'Ingests end-of-day symbol, OHLC, volume, open interest, and contract expiry schedules.',
      icon: Database,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
    },
    {
      step: 2,
      title: 'Validation & Cleaning',
      desc: 'Sanity checks for missing quotes, duplicate timestamps, and anomalous zero volumes.',
      icon: Filter,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      step: 3,
      title: 'Unit & Purity Normalization',
      desc: 'Converts raw lots (10g, 8g, 1g) and purity (995 vs 999) into uniform INR per gram (999 equivalent).',
      icon: Calculator,
      color: 'text-gold-bright bg-gold/10 border-gold/25',
    },
    {
      step: 4,
      title: 'Expiry Matching',
      desc: 'Filters contract pairings ensuring calendar maturity dates fall within tolerance windows.',
      icon: Calendar,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      step: 5,
      title: 'Spread & Z-Score Analysis',
      desc: 'Computes normalized delta and rolling historical dispersion relative to recent mean.',
      icon: LineChart,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      step: 6,
      title: 'Liquidity & Cost Filters',
      desc: 'Suppresses false signals lacking volume, open interest depth, or exceeding friction thresholds.',
      icon: ShieldCheck,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      step: 7,
      title: 'Historical Validation',
      desc: 'Tests mean-reversion persistence against unseen out-of-sample data with slippage penalties.',
      icon: TrendingUp,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      step: 8,
      title: 'KharaSona Dashboard',
      desc: 'Delivers explainable, transparent relative-value intelligence for responsible decision-making.',
      icon: LayoutDashboard,
      color: 'text-gold-bright bg-gold/15 border-gold/30',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="pb-2 border-b border-navy-800">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          How KharaSona Works
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
          The mathematical principles, contract normalization formulas, liquidity filters, and architectural pipeline powering explainable MCX gold relative-value analytics.
        </p>
      </div>

      {/* System Flow Architecture Display */}
      <section className="bg-navy-900 border border-navy-800 rounded-xl p-6 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-navy-800">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-gold-bright" />
              <span>System Flow Architecture</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              End-to-end analytical pipeline from exchange record ingestion to dashboard presentation
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
            Linear Deterministic Pipeline
          </span>
        </div>

        {/* Responsive Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {architectureSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="bg-navy-950/80 border border-navy-800 rounded-xl p-4 flex flex-col justify-between hover:border-navy-700 transition-colors relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-9 h-9 rounded-lg border flex items-center justify-center ${step.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 font-bold">
                      STAGE 0{step.step}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {idx < architectureSteps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Explanatory Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Data Ingestion Card */}
        <div className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-sky-400 font-bold text-sm">
            <Database className="w-4 h-4" />
            <span>1. Data Ingestion</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            KharaSona processes daily MCX Bhavcopy-style records containing symbol, date, expiry date, open, high, low, close, volume, and open interest.
          </p>
          <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 font-mono text-xs text-slate-300 space-y-1">
            <div className="text-[11px] text-slate-400 uppercase tracking-wider">Required Ingestion Schema:</div>
            <div className="text-gold-bright text-[11px]">Symbol, Date, ExpiryDate, Open, High, Low, Close, Volume, OpenInterest</div>
          </div>
        </div>

        {/* Normalization Card */}
        <div className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-gold-bright font-bold text-sm">
            <Calculator className="w-4 h-4" />
            <span>2. Unit & Purity Normalization</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Contracts on MCX have differing quotation lots and fineness standards. To evaluate true comparative parity, every quote is brought to a 999-fineness 1-gram standard.
          </p>
          <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 font-mono text-xs space-y-2">
            <div>
              <div className="text-[11px] text-slate-400">Unit Price per Gram:</div>
              <div className="text-gold-bright font-semibold">Price per gram = Quoted close price ÷ Quoted grams</div>
            </div>
            <div className="pt-1 border-t border-navy-800">
              <div className="text-[11px] text-slate-400">Purity Standardized Price:</div>
              <div className="text-gold-bright font-semibold">Purity-adjusted price = Price per gram × Contract purity ÷ 999</div>
            </div>
          </div>
        </div>

        {/* Expiry Matching Card */}
        <div className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-purple-400 font-bold text-sm">
            <Calendar className="w-4 h-4" />
            <span>3. Expiry Matching</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Contracts are compared only when their expiry dates fall within the selected tolerance. Comparing distant contract months would distort relative pricing through carry costs and financing rate differentials.
          </p>
          <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 text-xs text-slate-300">
            <span className="text-purple-300 font-medium font-mono">Tolerance Gate:</span> |Expiry Date(A) − Expiry Date(B)| ≤ Max Tolerance Days (3d, 7d, or 14d).
          </div>
        </div>

        {/* Spread & Z-Score Card */}
        <div className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-sm">
            <LineChart className="w-4 h-4" />
            <span>4. Spread & Dispersion Metrics</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            The normalized price difference is calculated daily, and rolling dispersion is quantified as standard deviations from the recent baseline.
          </p>
          <div className="bg-navy-950 p-3 rounded-lg border border-navy-800 font-mono text-xs space-y-2">
            <div>
              <div className="text-[11px] text-slate-400">Spread:</div>
              <div className="text-emerald-400 font-semibold">Spread = Normalized Price A − Normalized Price B</div>
            </div>
            <div className="pt-1 border-t border-navy-800">
              <div className="text-[11px] text-slate-400">Rolling Dispersion Z-Score:</div>
              <div className="text-emerald-400 font-semibold">
                Z-score = (Current spread − Rolling average spread) / Rolling spread standard deviation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters & Sanitization Rules */}
      <section className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-md space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-100 pb-2 border-b border-navy-800">
          <Filter className="w-4 h-4 text-sky-400" />
          <span>Multivariate Validation Filters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            {
              name: 'Volume Threshold',
              detail: 'Requires minimum daily lot turnover on both contract legs to prevent artificial settlement distortion.',
            },
            {
              name: 'Open Interest Depth',
              detail: 'Ensures existing positioning can absorb simulated square-offs without erratic slippage spikes.',
            },
            {
              name: 'Expiry Distance',
              detail: 'Suppresses signals when contracts are within the final delivery notice window (5-day cutoff).',
            },
            {
              name: 'Expiry-Date Gap',
              detail: 'Rejects pairs whose settlement calendar delta exceeds selected tolerance threshold.',
            },
            {
              name: 'Estimated Cost Check',
              detail: 'Validates that expected statistical mean reversion exceeds roundtrip friction (brokerage + exchange levies).',
            },
            {
              name: 'Missing / Invalid Records',
              detail: 'Automatically discards null quotes, negative values, and non-conforming exchange trading timestamps.',
            },
          ].map((f, i) => (
            <div key={i} className="p-3 bg-navy-950 rounded-lg border border-navy-800">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-200 mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{f.name}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {f.detail}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Limitations & Disclaimers */}
      <section className="bg-navy-900 border border-navy-800 rounded-xl p-5 shadow-md space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-amber-400 pb-2 border-b border-navy-800">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Analytical Scope & Known Limitations</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="flex items-start gap-2 bg-navy-950 p-3 rounded-lg border border-navy-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span><strong>Sample data is used in this interface.</strong> Values are modeled to demonstrate relative-value analytics.</span>
          </div>

          <div className="flex items-start gap-2 bg-navy-950 p-3 rounded-lg border border-navy-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span><strong>End-of-day settlement data is not an executable price.</strong> Intraday bid-ask spreads and liquidity fluctuations occur.</span>
          </div>

          <div className="flex items-start gap-2 bg-navy-950 p-3 rounded-lg border border-navy-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span><strong>Volume is not the same as market depth.</strong> A contract with moderate volume may have thin top-of-book order queues.</span>
          </div>

          <div className="flex items-start gap-2 bg-navy-950 p-3 rounded-lg border border-navy-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span><strong>Thin contracts may create misleading differences.</strong> Illiquid expiries can show anomalous divergence that is costly to exploit.</span>
          </div>

          <div className="flex items-start gap-2 bg-navy-950 p-3 rounded-lg border border-navy-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span><strong>Purity adjustment is an analytical approximation.</strong> Refining, hallmarking, and vaulted delivery parity can have basis friction.</span>
          </div>

          <div className="flex items-start gap-2 bg-navy-950 p-3 rounded-lg border border-navy-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
            <span><strong>Historical results do not guarantee future performance.</strong> Backtested statistical relationships can shift over time.</span>
          </div>
        </div>

        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-xs text-amber-300 font-medium">
          <strong>Notice:</strong> KharaSona is designed exclusively for research and educational market intelligence. It does not provide financial advice, trading signals, or execution guarantees.
        </div>
      </section>
    </div>
  );
};

export default Methodology;
