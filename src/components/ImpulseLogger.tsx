import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  Flame,
  Check,
  ChevronDown
} from 'lucide-react';
import { ImpulsoEntry, TruthCard } from '../types';
import { EMOTIONS, INITIAL_TRUTHS, ALTERNATIVE_ACTIONS } from '../data/biblicalData';
import { EmotionIcon } from './EmotionIcon';

interface ImpulseLoggerProps {
  customTruths: TruthCard[];
  onAddEntry: (entry: Omit<ImpulsoEntry, 'id' | 't'>) => void;
  onOpenSOS: () => void;
}

const COMMON_TRIGGER_SUGGESTIONS = [
  'Soledad en casa',
  'Discusión o tensión',
  'Cansancio extremo',
  'Navegando redes sociales',
  'Aburrimiento sin rumbo',
  'Noticia desalentadora',
  'Estar a solas de noche'
];

export const ImpulseLogger: React.FC<ImpulseLoggerProps> = ({
  customTruths,
  onAddEntry,
  onOpenSOS
}) => {
  const [selectedEmo, setSelectedEmo] = useState<string>('');
  const [intensity, setIntensity] = useState<number>(6);
  const [trigger, setTrigger] = useState<string>('');
  const [actionDone, setActionDone] = useState<string>('');
  const [selectedTruthId, setSelectedTruthId] = useState<string>('');
  const [resisted, setResisted] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>('');
  const [savedAlert, setSavedAlert] = useState<boolean>(false);
  const [showTruthDropdown, setShowTruthDropdown] = useState<boolean>(false);

  const allTruths = [...customTruths, ...INITIAL_TRUTHS];
  const activeTruth = allTruths.find(t => t.id === selectedTruthId);

  // Daily rotating truth
  const today = new Date();
  const dayIndex = (today.getFullYear() * 366 + (today.getMonth() + 1) * 31 + today.getDate()) % INITIAL_TRUTHS.length;
  const featuredTruth = INITIAL_TRUTHS[dayIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEmo && !trigger && !actionDone && !selectedTruthId) {
      alert('Por favor selecciona una emoción o escribe qué activó el impulso.');
      return;
    }

    onAddEntry({
      emo: selectedEmo || 'Ansiedad',
      intensity,
      trig: trigger.trim(),
      did: actionDone.trim(),
      resisted,
      trId: activeTruth?.id,
      truthText: activeTruth?.truth,
      truthRef: activeTruth?.ref,
      notes: notes.trim()
    });

    // Reset form fields
    setSelectedEmo('');
    setIntensity(6);
    setTrigger('');
    setActionDone('');
    setSelectedTruthId('');
    setResisted(true);
    setNotes('');

    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Featured Scripture Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-stone-100 rounded-2xl p-5 sm:p-6 shadow-sm border border-slate-700/60 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10 text-amber-500 pointer-events-none">
          <BookOpen className="w-36 h-36" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
              Verdad bíblica para hoy
            </span>
            <span className="text-xs text-slate-400">{featuredTruth.category}</span>
          </div>
          <p className="text-xs text-rose-300/90 line-through mb-1">
            {featuredTruth.lie}
          </p>
          <blockquote className="text-base sm:text-lg font-serif italic text-white leading-relaxed mb-2.5">
            "{featuredTruth.truth}"
          </blockquote>
          <div className="flex items-center justify-between">
            <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-md bg-amber-600/90 text-white">
              {featuredTruth.ref}
            </span>
            <button
              onClick={() => setSelectedTruthId(featuredTruth.id)}
              type="button"
              className="text-xs text-amber-300 hover:text-amber-200 underline underline-offset-4 cursor-pointer"
            >
              Usar esta verdad en mi registro
            </button>
          </div>
        </div>
      </div>

      {/* Main Impulse Logger Form */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 shadow-sm border border-stone-200/90">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              Diario de Impulsos y Deseos
            </h2>
            <button
              onClick={onOpenSOS}
              type="button"
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded-lg border border-rose-200 transition-colors cursor-pointer"
            >
              ¿Sientes urgencia extrema?
            </button>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Cuando el deseo o craving aparezca, tómate 60 segundos. Sentir el impulso no significa que debas obedecerlo: 
            <span className="font-semibold text-slate-800"> el impulso no es una orden</span>. Confróntalo con la verdad de Dios.
          </p>
        </div>

        {savedAlert && (
          <div className="mb-5 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-3 animate-in fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-semibold">¡Registro guardado con éxito!</p>
              <p className="text-xs text-emerald-700">Cada vez que te detienes y reflexionas, fortaleces tu dominio propio en Cristo.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Emotion Selector */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              1. ¿Qué emoción o estado sentiste cuando llegó el deseo?
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {EMOTIONS.map(emo => {
                const isSelected = selectedEmo === emo.id;
                return (
                  <button
                    key={emo.id}
                    type="button"
                    onClick={() => setSelectedEmo(isSelected ? '' : emo.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-amber-300 border-slate-900 shadow-sm scale-[1.02]'
                        : 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-slate-700'
                    }`}
                  >
                    <EmotionIcon
                      name={emo.iconName}
                      className={`w-5 h-5 mb-1 ${isSelected ? 'text-amber-400' : 'text-slate-500'}`}
                    />
                    <span className="text-xs font-semibold leading-tight">{emo.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Intensity Slider */}
          <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="intensity-slider" className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <Flame className={`w-4 h-4 ${intensity >= 7 ? 'text-rose-600' : 'text-amber-600'}`} />
                2. Intensidad del deseo (1 al 10):
              </label>
              <span className={`text-sm font-bold px-2 py-0.5 rounded-md ${
                intensity <= 3 ? 'bg-emerald-100 text-emerald-800' :
                intensity <= 6 ? 'bg-amber-100 text-amber-800' :
                'bg-rose-100 text-rose-800'
              }`}>
                {intensity} / 10 · {intensity <= 3 ? 'Leve' : intensity <= 6 ? 'Moderado' : intensity <= 8 ? 'Fuerte' : 'Muy Intenso'}
              </span>
            </div>
            <input
              id="intensity-slider"
              type="range"
              min="1"
              max="10"
              value={intensity}
              onChange={e => setIntensity(Number(e.target.value))}
              className="w-full h-2 bg-stone-300 rounded-lg appearance-none cursor-pointer accent-amber-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1">
              <span>1 (Ligera molestia)</span>
              <span>5 (Deseo marcado)</span>
              <span>10 (Urgencia abrumadora)</span>
            </div>
          </div>

          {/* 3. Trigger input */}
          <div>
            <label htmlFor="trigger-input" className="block text-sm font-bold text-slate-800 mb-1">
              3. ¿Qué lo activó? (Disparador, situación o pensamiento)
            </label>
            <input
              id="trigger-input"
              type="text"
              value={trigger}
              onChange={e => setTrigger(e.target.value)}
              placeholder="Ej.: Estaba solo de noche, tuve una discusión, sentí que nadie me entiende..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-colors"
            />
            {/* Quick trigger chips */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[11px] text-slate-500 self-center mr-1">Sugerencias:</span>
              {COMMON_TRIGGER_SUGGESTIONS.map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTrigger(sug)}
                  className="text-xs px-2.5 py-1 rounded-full bg-stone-100 hover:bg-stone-200 text-slate-700 transition-colors cursor-pointer"
                >
                  + {sug}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Action Taken & Alternatives */}
          <div>
            <label htmlFor="action-input" className="block text-sm font-bold text-slate-800 mb-1">
              4. ¿Qué hiciste o qué decidiste hacer en su lugar?
            </label>
            <input
              id="action-input"
              type="text"
              value={actionDone}
              onChange={e => setActionDone(e.target.value)}
              placeholder="Ej.: Respiré hondo, recité mi versículo, llamé a mi amigo, salí a caminar..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-slate-900 text-sm focus:border-amber-600 focus:ring-1 focus:ring-amber-600 transition-colors"
            />
            {/* Quick alternative suggestions */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              <span className="text-[11px] text-slate-500 self-center mr-1">Alternativas sanas:</span>
              {ALTERNATIVE_ACTIONS.map((alt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActionDone(alt)}
                  className="text-xs px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60 transition-colors cursor-pointer"
                >
                  ✓ {alt}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Biblical Scripture / Truth */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-1">
              5. ¿Qué verdad de Dios responde y desarma este impulso?
            </label>
            
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTruthDropdown(!showTruthDropdown)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-left text-sm flex items-center justify-between text-slate-800 hover:border-stone-400 cursor-pointer"
              >
                <span className="truncate">
                  {activeTruth ? `${activeTruth.ref} — "${activeTruth.truth.substring(0, 55)}..."` : 'Seleccionar una verdad bíblica de consuelo y victoria...'}
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500 ml-2 flex-shrink-0" />
              </button>

              {showTruthDropdown && (
                <div className="absolute left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-white border border-stone-200 rounded-xl shadow-lg z-20 p-1.5 space-y-1">
                  {allTruths.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setSelectedTruthId(t.id);
                        setShowTruthDropdown(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        selectedTruthId === t.id
                          ? 'bg-amber-50 border border-amber-300 text-amber-950 font-medium'
                          : 'hover:bg-stone-50 text-slate-700'
                      }`}
                    >
                      <div className="font-bold text-slate-900 flex items-center justify-between">
                        <span>{t.ref}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{t.category}</span>
                      </div>
                      <div className="text-slate-500 line-through text-[11px] mt-0.5">{t.lie}</div>
                      <div className="text-amber-900 font-medium mt-0.5">{t.truth}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {activeTruth && (
              <div className="mt-2 p-3 bg-amber-50/60 rounded-xl border border-amber-200 text-xs space-y-1">
                <span className="text-rose-600 line-through block font-medium">Mentira: {activeTruth.lie}</span>
                <span className="text-slate-900 font-serif italic block text-sm">"{activeTruth.truth}"</span>
                <span className="text-amber-700 font-bold block">{activeTruth.ref}</span>
              </div>
            )}
          </div>

          {/* 6. Outcome: Resisted / Overcame */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-800">
              ¿Lograste frenar el impulso o aplicar tu respuesta sana?
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setResisted(true)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  resisted
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                }`}
              >
                ✓ Sí, resistí en Cristo
              </button>
              <button
                type="button"
                onClick={() => setResisted(false)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !resisted
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
                }`}
              >
                En lucha / Necesito gracia
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-[0.99] text-white font-bold text-sm sm:text-base transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-5 h-5" />
            <span>Guardar Registro de Impulso</span>
          </button>
        </form>
      </div>
    </div>
  );
};
