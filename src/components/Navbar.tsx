import React from 'react';
import { PenLine, TrendingUp, Compass, BookOpen, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

interface TabItem {
  id: ActiveTab;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TABS: TabItem[] = [
  { id: 'hoy', label: 'Diario de Deseos', shortLabel: 'Deseos', icon: PenLine },
  { id: 'progreso', label: 'Progreso y Gráficos', shortLabel: 'Progreso', icon: TrendingUp },
  { id: 'ref', label: 'Reflexión', shortLabel: 'Reflexión', icon: Compass },
  { id: 'ver', label: 'Verdades Bíblicas', shortLabel: 'Verdades', icon: BookOpen },
  { id: 'plan', label: 'Plan y Chequeo', shortLabel: 'Plan', icon: ShieldCheck },
];

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  return (
    <>
      {/* Mobile Bottom Fixed Nav */}
      <nav
        aria-label="Navegación principal"
        className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 z-40 pb-[env(safe-area-inset-bottom)] shadow-lg"
      >
        <div className="flex items-center justify-around">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                type="button"
                className={`flex-1 flex flex-col items-center justify-center py-2.5 px-1 text-[11px] font-medium transition-colors relative cursor-pointer ${
                  isActive
                    ? 'text-amber-400 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {isActive && (
                  <span className="absolute top-0 left-3 right-3 h-0.5 bg-amber-500 rounded-full" />
                )}
                <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span className="truncate max-w-[65px]">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sub-Header Navigation Bar */}
      <div className="hidden md:block bg-stone-100 border-b border-stone-200/90 sticky top-[68px] z-20 backdrop-blur-md bg-stone-100/95">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-1 py-1.5" role="tablist">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-amber-300 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-stone-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
