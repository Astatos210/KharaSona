# KharaSona (खरा सोना) — MCX Gold Contract Relative-Value Intelligence

> **“Same gold. Clearer prices.”**  
> *Explainable intelligence for comparing related MCX gold futures contracts.*

KharaSona is a specialized financial analytics dashboard engineered to evaluate the relative valuation across Multi Commodity Exchange of India (MCX) gold contracts: **GOLDM**, **GOLDTEN**, **GOLDGUINEA**, and **GOLDPETAL**.

By normalizing disparate contract specifications, quoting bases, and metallurgical fineness to a uniform 999-fineness metric (INR per gram), KharaSona enables commodity market participants, researchers, and financial analysts to identify statistical spread anomalies, track rolling dispersion z-scores, and validate historical mean-reversion behavior under real-world transaction friction constraints.

---

## Brand & Product Philosophy

- **Name**: **KharaSona** — Derived from Hindi *“Khara Sona”* (*“Genuine gold”* or *“true gold value”*).
- **Core Value Proposition**: The same physical gold trades across different MCX contract variants with varying tick sizes, lot sizes, physical delivery terms, and margins. KharaSona cuts through cosmetic quote divergence to reveal true relative pricing parity.
- **Analytical Governance**: Strictly non-speculative and explainable. No profit guarantees, execution promises, or algorithmic trading black boxes.

---

## Core Capabilities & Architecture

### 1. Market Overview
- **Snapshot Table**: Live tracking across the four primary MCX gold contract variants:
  - **GOLDM**: 100 g lot size, quoted per 10 g, 995 fineness.
  - **GOLDTEN**: 10 g lot size, quoted per 10 g, 999 fineness.
  - **GOLDGUINEA**: 8 g lot size (1 sovereign), quoted per 8 g, 999 fineness.
  - **GOLDPETAL**: 1 g micro lot, quoted per 1 g, 999 fineness.
- **Normalized Price Trajectory**: 20-day historical multi-series comparison chart.
- **Bhavcopy Data Quality Engine**: Automated verification of end-of-day exchange record consistency, null values, and duplicate records.

### 2. Interactive Contract Comparison
- **Dynamic Pair Selection**: Compare any permutation of base leg (Contract A) and comparison leg (Contract B).
- **Expiry Tolerance Filtering**: Calibrated for 3-day, 7-day, and 14-day calendar maturity deltas.
- **Rolling Lookback Windows**: Selectable 7-day, 20-day, and 60-day historical analysis periods.
- **Synchronized Visualizations**:
  - Normalized price comparison chart (A vs B).
  - Spread delta chart with rolling mean baseline.
  - Rolling dispersion Z-score chart with `±2.0σ` alert boundaries.
  - Dual volume lot turnover bar charts.
  - Open-interest depth comparison charts.

### 3. Research Alerts
- Rigorous multistage verification pipeline:
  1. Statistical dispersion breach (`|Z-score| ≥ 2.0`).
  2. Calendar expiry proximity check.
  3. Minimum volume threshold gate.
  4. Open-interest depth gate.
  5. Cost-friction hurdle check.
- Filterable view across **All**, **Investigate**, **No Signal**, and **Suppressed** alert categories with graceful empty-state handling.

### 4. Historical Validation (Backtest Simulation)
- Out-of-sample backtest engine evaluated across unseen 2026 data (`01 Jan 2026 – 07 Oct 2026`) following a 2025 calibration period.
- Incorporates realistic friction assumptions:
  - Cost per leg: `0.10%` (brokerage + exchange levies + STT/CTT).
  - Slippage per leg: `0.05%`.
  - Delivery notice cutoff: 5 days prior to contract expiry.
- **Metrics**: Signals generated, completed roundtrips, gross paired returns, transaction friction drag, net return, and maximum drawdown.
- **Visuals**: Tri-curve equity performance chart (Before Costs vs After Costs vs Gold Benchmark) and granular trade log.

### 5. Methodology & System Flow
- Explicit mathematical documentation of normalization, spread formulation, and z-score calculations:
  $$\text{Price per Gram} = \frac{\text{Quoted Close Price}}{\text{Quoted Grams}}$$
  $$\text{Purity-Adjusted Price} = \text{Price per Gram} \times \frac{\text{Contract Purity}}{999}$$
  $$\text{Spread} = \text{Normalized Price}_A - \text{Normalized Price}_B$$
  $$\text{Z-Score} = \frac{\text{Current Spread} - \mu_{\text{rolling}}}{\sigma_{\text{rolling}}}$$
- Eight-stage architecture flowchart from raw exchange Bhavcopy ingestion to user presentation.

---

## Technology Stack

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS (custom dark financial palette with navy & gold accents)
- **Charts**: Recharts with custom tooltips, reference lines, and responsive layouts
- **Icons**: Lucide React
- **Build Tool**: Vite 5

---

## Getting Started

### Prerequisites

Node.js (v18 or newer) and npm installed.

### Installation

1. Navigate to the project root directory:
   ```bash
   cd "d:\gold price comparison project"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview production build:
   ```bash
   npm run preview
   ```

---

## Design Standards & Compliance

- **Visual Tone**: Dark financial intelligence interface with `#0B1220` (Dark Navy), `#D4AF37` (Primary Gold), `#F4C95D` (Bright Gold), `#22C55E` (Passed Checks), and `#F59E0B` (Review Conditions).
- **Zero Speculative Framing**: Avoids speculative claims or return guarantees. Clearly identifies the environment as a sample data research laboratory.
- **Accessibility**: Semantic HTML tables, ARIA labels, responsive touch targets, and accessible color contrast.
