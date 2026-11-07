import React, { useRef, useState } from 'react';
import {
  X,
  Download,
  Upload,
  RotateCcw,
  ShieldCheck,
  Check,
  AlertTriangle
} from 'lucide-react';
import { AppState, exportAppData, importAppData, saveAppState, getInitialSeedState } from '../utils/storage';

interface DataManagementModalProps {
  isOpen: boolean;
  appState: AppState;
  onUpdateState: (newState: AppState) => void;
  onClose: () => void;
}

export const DataManagementModal: React.FC<DataManagementModalProps> = ({
  isOpen,
  appState,
  onUpdateState,
  onClose
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    try {
      const jsonStr = exportAppData(appState);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `suficiente-en-cristo-respaldo-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccessMsg('Copia de seguridad descargada exitosamente.');
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      setErrorMsg('No se pudo descargar el respaldo.');
      setTimeout(() => setErrorMsg(null), 3000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target?.result as string;
      const imported = importAppData(content);
      if (imported) {
        onUpdateState(imported);
        setSuccessMsg('Datos restaurados correctamente.');
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        setErrorMsg('El archivo no tiene el formato JSON válido.');
        setTimeout(() => setErrorMsg(null), 3000);
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleResetAll = () => {
    const confirmation = window.confirm(
      '¿Estás seguro de que deseas borrar todos tus registros, diarios y reflexiones de este dispositivo? Esta acción no se puede deshacer.'
    );
    if (confirmation) {
      const fresh = getInitialSeedState();
      // wipe entries and journals
      fresh.entries = [];
      fresh.dailyJournals = [];
      fresh.reflections = {};
      fresh.customTruths = [];
      fresh.freedomStartDate = Date.now();
      saveAppState(fresh);
      onUpdateState(fresh);
      setSuccessMsg('Todos los datos han sido reiniciados a cero.');
      setTimeout(() => setSuccessMsg(null), 3000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="data-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-stone-200 space-y-5 animate-in fade-in">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span id="data-modal-title">Privacidad y Gestión de Datos</span>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-stone-100 cursor-pointer"
            aria-label="Cerrar modal de gestión de datos"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="text-xs text-slate-600 leading-relaxed bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1">
          <p className="font-semibold text-slate-800">Tus datos nunca salen de tu control:</p>
          <p>
            No almacenamos tus reflexiones ni tus registros en servidores externos. Todo vive en el almacenamiento local de este navegador web. Si cambias de dispositivo o limpias el historial, te recomendamos descargar una copia de seguridad periódica.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {/* Export */}
          <button
            type="button"
            onClick={handleExport}
            className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-600" />
            <span>Exportar Copia de Seguridad (JSON)</span>
          </button>

          {/* Import */}
          <div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2.5 px-4 rounded-xl border border-stone-300 hover:bg-stone-50 text-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Upload className="w-4 h-4 text-amber-600" />
              <span>Restaurar Copia de Seguridad desde Archivo</span>
            </button>
          </div>

          {/* Reset */}
          <button
            type="button"
            onClick={handleResetAll}
            className="w-full py-2.5 px-4 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Borrar Todos Mis Registros de este Dispositivo</span>
          </button>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
