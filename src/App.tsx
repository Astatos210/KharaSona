import React, { useState } from 'react';
import { PageId, Sidebar, Header } from './components/Navbar';
import MarketOverview from './pages/MarketOverview';
import ContractComparison from './pages/ContractComparison';
import ResearchAlerts from './pages/ResearchAlerts';
import HistoricalValidation from './pages/HistoricalValidation';
import Methodology from './pages/Methodology';
import Logo from './components/Logo';
import { SAMPLE_RESEARCH_ALERTS } from './data/sampleMarketData';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageId>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeAlertCount = SAMPLE_RESEARCH_ALERTS.filter(
    (a) => a.alertStatus === 'Investigate'
  ).length;

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col font-sans selection:bg-gold/30 selection:text-gold-bright">
      {/* Navigation Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={setCurrentPage}
        activeAlertCount={activeAlertCount}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen">
        {/* Sticky Top Header */}
        <Header
          onOpenMobile={() => setIsMobileMenuOpen(true)}
          currentPage={currentPage}
          onSelectPage={setCurrentPage}
        />

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === 'overview' && (
            <MarketOverview onNavigate={(p) => setCurrentPage(p)} />
          )}
          {currentPage === 'comparison' && <ContractComparison />}
          {currentPage === 'alerts' && <ResearchAlerts />}
          {currentPage === 'validation' && <HistoricalValidation />}
          {currentPage === 'methodology' && <Methodology />}
        </main>

        {/* Comprehensive Professional Footer */}
        <footer className="mt-auto border-t border-navy-800 bg-navy-900/60 py-6 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <Logo size="sm" showWordmark />
              <span className="hidden sm:inline text-navy-700">|</span>
              <p className="text-slate-400">
                Explainable intelligence for comparing related MCX gold futures contracts.
              </p>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400 flex-wrap justify-center">
              <span>MCX Reference: Bhavcopy Settlement</span>
              <span>•</span>
              <span>Research Environment</span>
              <span>•</span>
              <button
                onClick={() => setCurrentPage('methodology')}
                className="text-gold-bright hover:underline"
              >
                Methodology & Disclaimers
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
