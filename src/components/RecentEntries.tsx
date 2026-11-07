import React, { useState } from 'react';
import { Trash2, ShieldCheck, Flame, BookOpen, Clock, Filter } from 'lucide-react';
import { ImpulsoEntry } from '../types';
import { EmotionIcon } from './EmotionIcon';
import { EMOTIONS } from '../data/biblicalData';

interface RecentEntriesProps {
  entries: ImpulsoEntry[];
  onDeleteEntry: (id: string) => void;
}

export const RecentEntries: React.FC<RecentEntriesProps> = ({
  entries,
  onDeleteEntry
}) => {
  const [filterEmo, setFilterEmo] = useState<string>('all');
  const [filterResisted, setFilterResisted] = useState<'all' | 'resisted' | 'struggle'>('all');

  const filtered = entries.filter(e => {
    if (filterEmo !== 'all' && e.emo !== filterEmo) return false;
    if (filterResisted === 'resisted' && !e.resisted) return false;
    if (filterResisted === 'struggle' && e.resisted) return false;
    return true;
  });

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-stone-200/90 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            Historial de Registros Recientes ({entries.length})
          </h3>
          <p className="text-xs text-slate-500">
            Revisar tus impulsos pasados te ayuda a identificar patrones y celebrar victorias.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setFilterResisted('all')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                filterResisted === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterResisted('resisted')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                filterResisted === 'resisted' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Vencidos
            </button>
            <button
              onClick={() => setFilterResisted('struggle')}
              className={`px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                filterResisted === 'struggle' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              En lucha
            </button>
          </div>

          <select
            value={filterEmo}
            onChange={e => setFilterEmo(e.target.value)}
            className="text-xs bg-stone-100 border-none rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:ring-1 focus:ring-amber-600 cursor-pointer"
          >
            <option value="all">Todas las emociones</option>
            {EMOTIONS.map(emo => (
              <option key={emo.id} value={emo.id}>{emo.label}</option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-10 px-4">
          <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-slate-400 mb-3">
            <Filter className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700 mb-1">No hay registros con este filtro</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Registra lo que sientas cuando surja un deseo para comenzar a ver tu patrón de avance.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(entry => {
            const dateStr = new Date(entry.t).toLocaleString('es', {
              dateStyle: 'medium',
              timeStyle: 'short'
            });

            return (
              <div
                key={entry.id}
                className="p-4 rounded-xl border border-stone-200/80 bg-stone-50/60 hover:bg-stone-50 transition-colors space-y-2.5 relative group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-slate-800 shadow-2xs">
                      <EmotionIcon name={entry.emo} className="w-3.5 h-3.5 text-amber-600" />
                      {entry.emo}
                    </span>

                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md flex items-center gap-1 ${
                      entry.resisted
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      <ShieldCheck className="w-3 h-3" />
                      {entry.resisted ? 'Victoria en Cristo' : 'En proceso / Gracia'}
                    </span>

                    <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-amber-600" />
                      Intensidad {entry.intensity}/10
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">{dateStr}</span>
                    <button
                      onClick={() => {
                        if (confirm('¿Deseas eliminar este registro?')) {
                          onDeleteEntry(entry.id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors cursor-pointer"
                      title="Eliminar registro"
                      aria-label="Eliminar registro de impulso"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="text-xs text-slate-700 space-y-1 pl-1">
                  {entry.trig && (
                    <p>
                      <span className="font-semibold text-slate-800">Lo activó: </span>
                      {entry.trig}
                    </p>
                  )}
                  {entry.did && (
                    <p>
                      <span className="font-semibold text-slate-800">Acción tomada: </span>
                      {entry.did}
                    </p>
                  )}
                  {entry.truthText && (
                    <div className="mt-2 p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-amber-950 flex items-start gap-2">
                      <BookOpen className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-serif italic font-medium block">"{entry.truthText}"</span>
                        {entry.truthRef && (
                          <span className="text-[11px] font-bold text-amber-800 mt-0.5 block">{entry.truthRef}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
