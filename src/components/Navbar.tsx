import React from 'react';
import {
  LayoutDashboard,
  GitCompare,
  BellRing,
  History,
  BookOpen,
  Menu,
  X,
} from 'lucide-react';
import Logo from './Logo';

export type PageId = 'overview' | 'comparison' | 'alerts' | 'validation' | 'methodology';

interface NavigationProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
  activeAlertCount?: number;
}

export const NAV_ITEMS: { id: PageId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'overview', label: 'Market Overview', icon: LayoutDashboard },
  { id: 'comparison', label: 'Contract Comparison', icon: GitCompare },
  { id: 'alerts', label: 'Research Alerts', icon: BellRing },
  { id: 'validation', label: 'Historical Validation', icon: History },
  { id: 'methodology', label: 'Methodology', icon: BookOpen },
];

export const Sidebar: React.FC<NavigationProps & { isOpenMobile: boolean; onCloseMobile: () => void }> = ({
  currentPage,
  onSelectPage,
  activeAlertCount = 1,
  isOpenMobile,
  onCloseMobile,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-navy-900 border-r border-navy-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-navy-800 flex items-center justify-between">
          <Logo size="md" showWordmark showTagline />
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tagline Badge for Context */}
        <div className="px-5 py-3 border-b border-navy-800/60 bg-navy-950/40">
          <p className="text-[11px] text-slate-400 leading-tight">
            MCX Gold Futures Relative-Value Intelligence
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectPage(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-gold/60 ${
                  isActive
                    ? 'bg-gradient-to-r from-gold/15 to-gold/5 text-gold-bright border-l-4 border-gold shadow-sm font-semibold'
                    : 'text-slate-300 hover:text-slate-100 hover:bg-navy-800/80'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-gold-bright' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.id === 'alerts' && activeAlertCount > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-gold/20 text-gold-bright border border-gold/30">
                    {activeAlertCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Contract Quick Reference in Sidebar */}
        <div className="p-3 mx-3 mb-3 bg-navy-950/80 border border-navy-800 rounded-lg text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold tracking-wider uppercase">
            <span>Tracked Basket</span>
            <span className="text-emerald-400">4 Active</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
            <span className="bg-navy-900/90 px-1.5 py-1 rounded border border-navy-800/80 font-mono">GOLDM</span>
            <span className="bg-navy-900/90 px-1.5 py-1 rounded border border-navy-800/80 font-mono">GOLDTEN</span>
            <span className="bg-navy-900/90 px-1.5 py-1 rounded border border-navy-800/80 font-mono">GOLDGUINEA</span>
            <span className="bg-navy-900/90 px-1.5 py-1 rounded border border-navy-800/80 font-mono">GOLDPETAL</span>
          </div>
        </div>

        {/* Footer info in sidebar */}
        <div className="p-4 border-t border-navy-800 text-xs text-slate-400 space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span>Exchange Reference</span>
            <span className="font-mono text-slate-300">MCX India</span>
          </div>
          <div className="text-[10px] text-slate-400">
            Research & Educational Intelligence
          </div>
        </div>
      </aside>
    </>
  );
};

export const Header: React.FC<{
  onOpenMobile: () => void;
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
}> = ({ onOpenMobile, currentPage, onSelectPage }) => {
  const activeItem = NAV_ITEMS.find((n) => n.id === currentPage);

  return (
    <header className="sticky top-0 z-30 bg-navy-950/85 backdrop-blur-md border-b border-navy-800/80 px-4 sm:px-6 py-3.5">
      <div className="flex items-center justify-between">
        {/* Left: Mobile Toggle & Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobile}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-navy-800 focus:outline-none focus:ring-2 focus:ring-gold"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="lg:hidden">
            <Logo size="sm" showWordmark />
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">KharaSona</span>
            <span className="text-slate-400">/</span>
            <h1 className="text-sm font-semibold text-slate-100">
              {activeItem?.label}
            </h1>
          </div>
        </div>

        {/* Right: Environment Badge & Metadata */}
        <div className="flex items-center gap-3">
          {/* Sample Data Environment Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-800/80 border border-gold/30 text-gold-bright text-xs font-medium shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-medium">Sample data environment</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 border-l border-navy-800 pl-3">
            <span>Market Date:</span>
            <span className="font-mono text-slate-200 font-medium">07 Oct 2026</span>
          </div>
        </div>
      </div>
    </header>
  );
};
