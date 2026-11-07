import React, { useState } from 'react';
import {
  Compass,
  BookOpen,
  ChevronDown,
  ChevronUp,
  PenTool,
  Save,
  Check,
  Calendar,
  Sparkles,
  Heart,
  Trash2
} from 'lucide-react';
import { REFLECTION_THEMES } from '../data/biblicalData';
import { DailyJournalEntry } from '../types';

interface ReflectiveJournalsProps {
  reflections: Record<string, string>;
  dailyJournals: DailyJournalEntry[];
  onSaveReflection: (key: string, value: string) => void;
  onAddDailyJournal: (entry: Omit<DailyJournalEntry, 'id' | 't'>) => void;
  onDeleteDailyJournal: (id: string) => void;
}

export const ReflectiveJournals: React.FC<ReflectiveJournalsProps> = ({
  reflections,
  dailyJournals,
  onSaveReflection,
  onAddDailyJournal,
  onDeleteDailyJournal
}) => {
  const [activeTab, setActiveTab] = useState<'themes' | 'daily'>('themes');
  const [expandedThemes, setExpandedThemes] = useState<Record<string, boolean>>({
    'theme-1': true // First expanded by default
  });

  // Daily entry form state
  const [surrender, setSurrender] = useState<string>('');
  const [gratitude, setGratitude] = useState<string>('');
  const [victoryMoment, setVictoryMoment] = useState<string>('');
  const [verse, setVerse] = useState<string>('');
  const [mood, setMood] = useState<DailyJournalEntry['mood']>('paz');
  const [showSavedFeedback, setShowSavedFeedback] = useState<boolean>(false);

  const toggleTheme = (id: string) => {
    setExpandedThemes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleCreateDaily = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surrender.trim() && !gratitude.trim() && !victoryMoment.trim()) {
      alert('Por favor escribe al menos una reflexión o motivo de gratitud.');
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];
    onAddDailyJournal({
      date: todayStr,
      surrender: surrender.trim(),
      gratitude: gratitude.trim(),
      victoryMoment: victoryMoment.trim(),
      verse: verse.trim() || 'Filipenses 4:13',
      mood
    });

    setSurrender('');
    setGratitude('');
    setVictoryMoment('');
    setVerse('');
    setShowSavedFeedback(true);
    setTimeout(() => setShowSavedFeedback(false), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Compass className="w-5 h-5 text-amber-600" />
              Diarios Reflexivos e Introspección
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              La introspección guiada por la Escritura desenmascara raíces de codependencia y dolor, abriendo paso a la sanidad.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex p-1 bg-stone-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('themes')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'themes'
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              6 Áreas de Libertad
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('daily')}
              className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                activeTab === 'daily'
                  ? 'bg-slate-900 text-amber-300 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Diario Diario de Gracia
            </button>
          </div>
        </div>

        <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/60 text-xs text-amber-950 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>
            <strong>Privacidad total:</strong> Todas tus respuestas se guardan de forma segura y privada únicamente en este dispositivo.
          </span>
        </div>
      </div>

      {/* VIEW A: 6 Thematic Reflection Guides */}
      {activeTab === 'themes' && (
        <div className="space-y-4">
          {REFLECTION_THEMES.map(theme => {
            const isExpanded = !!expandedThemes[theme.id];
            // Count answered
            const answeredCount = theme.questions.filter(q => !!reflections[`${theme.id}-${q.id}`]).length;

            return (
              <div
                key={theme.id}
                className="bg-white rounded-2xl border border-stone-200/90 shadow-xs overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleTheme(theme.id)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50/80 transition-colors cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="pr-4">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                      {theme.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">{theme.description}</p>
                    <div className="mt-2 flex items-center gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-amber-700">
                        {answeredCount} de {theme.questions.length} respondidas
                      </span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-slate-600 flex-shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-6 border-t border-stone-100 bg-stone-50/40 space-y-6">
                    {theme.questions.map((q, qIndex) => {
                      const refKey = `${theme.id}-${q.id}`;
                      const val = reflections[refKey] || '';

                      return (
                        <div key={q.id} className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                            <p className="text-sm font-semibold text-slate-900 leading-snug">
                              {qIndex + 1}. {q.q}
                            </p>
                            <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 self-start sm:self-auto flex-shrink-0">
                              {q.ref}
                            </span>
                          </div>

                          <textarea
                            value={val}
                            onChange={e => onSaveReflection(refKey, e.target.value)}
                            rows={3}
                            placeholder="Escribe aquí con sinceridad delante de Dios..."
                            className="w-full p-3 rounded-lg border border-stone-300 text-sm text-slate-800 placeholder-slate-400 focus:border-amber-600 focus:ring-1 focus:ring-amber-600 bg-stone-50/50 resize-y"
                          />
                          <div className="flex justify-between items-center text-[11px] text-slate-400">
                            <span>{val ? '✓ Guardado automáticamente' : 'Pendiente de reflexionar'}</span>
                            <span className="text-[10px] text-slate-400">Solo en este dispositivo</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW B: Daily Grace Journal Entries */}
      {activeTab === 'daily' && (
        <div className="space-y-6">
          {/* New Daily Entry Card */}
          <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200/90 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <PenTool className="w-4 h-4 text-amber-600" />
                Mi Introspección Diaria de Hoy
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {new Date().toLocaleDateString('es', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            {showSavedFeedback && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Tu diario reflexivo ha sido guardado. Descansa en la fidelidad de Dios.</span>
              </div>
            )}

            <form onSubmit={handleCreateDaily} className="space-y-4">
              {/* Mood selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  ¿Cómo estuvo la condición de tu corazón hoy?
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['paz', 'esperanza', 'lucha', 'vulnerable', 'agradecido'] as const).map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m)}
                      className={`text-xs px-3 py-1.5 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                        mood === m
                          ? 'bg-amber-600 text-white shadow-xs'
                          : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Surrender */}
              <div>
                <label htmlFor="daily-surrender-input" className="block text-xs font-bold text-slate-800 mb-1">
                  1. ¿Qué carga, temor o control solté y entregué hoy a los pies de Cristo?
                </label>
                <textarea
                  id="daily-surrender-input"
                  value={surrender}
                  onChange={e => setSurrender(e.target.value)}
                  rows={2}
                  placeholder="Ej.: Hoy entregué la angustia por el futuro laboral y el deseo de controlar las decisiones de mi pareja..."
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                />
              </div>

              {/* 2. Victory Moment */}
              <div>
                <label htmlFor="daily-victory-input" className="block text-xs font-bold text-slate-800 mb-1">
                  2. ¿En qué momento sentí victoria, templanza o la paz de Dios?
                </label>
                <textarea
                  id="daily-victory-input"
                  value={victoryMoment}
                  onChange={e => setVictoryMoment(e.target.value)}
                  rows={2}
                  placeholder="Ej.: Al final de la tarde cuando sentí el deseo de evadirme, respiré hondo y oré en lugar de caer..."
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                />
              </div>

              {/* 3. Gratitude */}
              <div>
                <label htmlFor="daily-gratitude-input" className="block text-xs font-bold text-slate-800 mb-1">
                  3. Gratitud: 1 a 3 cosas concretas por las que agradezco hoy al Señor
                </label>
                <textarea
                  id="daily-gratitude-input"
                  value={gratitude}
                  onChange={e => setGratitude(e.target.value)}
                  rows={2}
                  placeholder="Ej.: Agradezco la lucidez para detenerme, la conversación con mi amigo y el descanso de esta noche..."
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                />
              </div>

              {/* 4. Verse */}
              <div>
                <label htmlFor="daily-verse-input" className="block text-xs font-bold text-slate-800 mb-1">
                  4. Versículo o promesa bíblica ancla que me sostuvo hoy
                </label>
                <input
                  id="daily-verse-input"
                  type="text"
                  value={verse}
                  onChange={e => setVerse(e.target.value)}
                  placeholder="Ej.: Salmo 46:1 · Dios es nuestro amparo y fortaleza..."
                  className="w-full p-2.5 rounded-xl border border-stone-300 text-sm text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 font-bold text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Reflexión de Hoy</span>
              </button>
            </form>
          </div>

          {/* Past Daily Entries List */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Entradas anteriores de mi diario ({dailyJournals.length})
            </h4>

            {dailyJournals.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center text-xs text-slate-500 border border-stone-200">
                Aún no has registrado reflexiones diarias. Escribe tu primera entrega arriba.
              </div>
            ) : (
              dailyJournals.map(j => (
                <div
                  key={j.id}
                  className="bg-white rounded-2xl p-5 border border-stone-200/90 shadow-2xs space-y-3 relative group"
                >
                  <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-900">{j.date}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-stone-100 text-slate-700">
                        {j.mood}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm('¿Eliminar esta entrada de diario?')) {
                          onDeleteDailyJournal(j.id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Eliminar entrada"
                      aria-label="Eliminar entrada de diario"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-xs text-slate-700 space-y-2">
                    {j.surrender && (
                      <p>
                        <strong className="text-slate-900">Entregué a Dios: </strong>
                        {j.surrender}
                      </p>
                    )}
                    {j.victoryMoment && (
                      <p>
                        <strong className="text-slate-900">Momento de victoria o calma: </strong>
                        {j.victoryMoment}
                      </p>
                    )}
                    {j.gratitude && (
                      <p>
                        <strong className="text-slate-900">Gratitud: </strong>
                        {j.gratitude}
                      </p>
                    )}
                    {j.verse && (
                      <div className="p-2.5 rounded-lg bg-amber-50/60 border border-amber-200/70 text-amber-950 font-serif italic text-xs">
                        "{j.verse}"
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
