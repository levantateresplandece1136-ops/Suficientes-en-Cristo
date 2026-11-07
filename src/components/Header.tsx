import React from 'react';
import { ShieldAlert, Settings, Award } from 'lucide-react';
import { calculateFreedomDays } from '../utils/stats';

interface HeaderProps {
  freedomStartDate: number;
  onOpenSOS: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  freedomStartDate,
  onOpenSOS,
  onOpenSettings
}) => {
  const days = calculateFreedomDays(freedomStartDate);

  return (
    <header className="bg-slate-900 text-stone-100 border-b-4 border-amber-600/80 sticky top-0 z-30 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex items-center justify-between gap-3">
        {/* Brand info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white shadow-sm font-serif font-bold text-xl select-none">
            †
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Suficiente en Cristo
            </h1>
            <p className="text-xs text-slate-300 hidden sm:block">
              Plan personal de libertad e introspección diaria
            </p>
          </div>
        </div>

        {/* Action badges and SOS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Days streak badge */}
          <div
            title={`Llevas ${days} días continuos en este camino de libertad`}
            className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-amber-300 text-xs sm:text-sm font-semibold select-none"
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span>
              {days} {days === 1 ? 'día' : 'días'} libre
            </span>
          </div>

          {/* Emergency SOS Button */}
          <button
            onClick={onOpenSOS}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
            aria-label="Abrir Pausa de Emergencia o SOS"
          >
            <ShieldAlert className="w-4 h-4" />
            <span className="hidden xs:inline">Pausa SOS</span>
            <span className="xs:hidden">SOS</span>
          </button>

          {/* Settings / Backup Button */}
          <button
            onClick={onOpenSettings}
            type="button"
            className="p-1.5 sm:p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Configuración y copia de seguridad de datos"
            title="Datos y respaldo"
          >
            <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
