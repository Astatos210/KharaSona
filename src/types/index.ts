export type ContractSymbol = 'GOLDM' | 'GOLDTEN' | 'GOLDGUINEA' | 'GOLDPETAL';

export interface ContractMetadata {
  symbol: ContractSymbol;
  name: string;
  contractSizeGrams: number;
  quotationBasisGrams: number;
  purity: number; // 995 or 999
  description: string;
  lotDescription: string;
  tickSize: number;
}

export interface DailyBhavcopyRecord {
  symbol: ContractSymbol;
  date: string; // ISO date 'YYYY-MM-DD'
  displayDate: string; // e.g. '07 Oct 2026'
  expiryDate: string; // ISO date 'YYYY-MM-DD'
  displayExpiryDate: string; // e.g. '28 Oct 2026'
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  openInterest: number;
  quotedGrams: number;
  purity: number;
  normalizedPrice: number; // INR per gram normalized to 999 purity basis
}

export interface ContractSnapshotItem {
  contractName: string;
  symbol: ContractSymbol;
  contractSize: string;
  quotationBasis: string;
  purity: string;
  expiryDate: string;
  normalizedPrice: number;
  volume: number;
  openInterest: number;
  liquidityStatus: 'High' | 'Normal' | 'Moderate' | 'Constrained';
}

export interface NormalizedPriceSeriesPoint {
  date: string;
  displayDate: string;
  GOLDM: number;
  GOLDTEN: number;
  GOLDGUINEA: number;
  GOLDPETAL: number;
}

export interface PairSpreadPoint {
  date: string;
  displayDate: string;
  priceA: number;
  priceB: number;
  spread: number;
  rollingMean: number;
  rollingStd: number;
  zScore: number;
  volumeA: number;
  volumeB: number;
  oiA: number;
  oiB: number;
}

export type AlertFilterCategory = 'all' | 'investigate' | 'no_signal' | 'suppressed';

export interface ResearchAlertItem {
  id: string;
  pair: string;
  contractA: ContractSymbol;
  contractB: ContractSymbol;
  direction: string;
  zScore: number;
  expiryGap: string;
  volumeStatus: 'Passed' | 'Low' | 'Warning';
  openInterestStatus: 'Passed' | 'Low' | 'Warning';
  costCheck: 'Passed' | 'Not required' | 'Not evaluated' | 'Failed';
  alertStatus: 'Investigate' | 'No signal' | 'Suppressed';
  detail: string;
}

export interface BacktestSettings {
  pair: string;
  entryThresholdZ: number;
  exitThresholdZ: number;
  costPerLegPct: number;
  slippagePerLegPct: number;
  expiryCutoffDays: number;
  trainingPeriod: string;
  testPeriod: string;
}

export interface BacktestTradeItem {
  id: string;
  entryDate: string;
  exitDate: string;
  pair: string;
  entryZScore: number;
  exitZScore: number;
  grossResultPct: number;
  estimatedCostPct: number;
  netResultPct: number;
  status: 'Closed' | 'Target Exited' | 'Expiry Cutoff';
}

export interface BacktestSummaryMetrics {
  signalsGenerated: number;
  completedTrades: number;
  grossPairedReturnPct: number;
  estimatedCostsPct: number;
  netPairedReturnPct: number;
  maxDrawdownPct: number;
  testPeriodStatus: string;
}

export interface EquityCurvePoint {
  date: string;
  displayDate: string;
  strategyBeforeCosts: number;
  strategyAfterCosts: number;
  goldBenchmark: number;
}
