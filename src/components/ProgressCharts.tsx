import React, { useState } from 'react';
import {
  Award,
  TrendingUp,
  ShieldCheck,
  Flame,
  Calendar,
  Sparkles,
  RefreshCw,
  BarChart3,
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { ImpulsoEntry } from '../types';
import {
  calculateFreedomDays,
  getFreedomMilestone,
  getEmotionDistribution,
  getWeeklyActivity,
  getVictoryStats,
  getCommonTriggers
} from '../utils/stats';
import { EmotionIcon } from './EmotionIcon';

interface ProgressChartsProps {
  entries: ImpulsoEntry[];
  freedomStartDate: number;
  onUpdateFreedomDate: (newTimestamp: number) => void;
}

export const ProgressCharts: React.FC<ProgressChartsProps> = ({
  entries,
  freedomStartDate,
  onUpdateFreedomDate
}) => {
  const [timeFilter, setTimeFilter] = useState<'all' | '30' | '7'>('all');
  const [isEditingDate, setIsEditingDate] = useState<boolean>(false);
  const [customDays, setCustomDays] = useState<number>(() => calculateFreedomDays(freedomStartDate));

  const daysFree = calculateFreedomDays(freedomStartDate);
  const milestone = getFreedomMilestone(daysFree);

  const filterDaysNum = timeFilter === '7' ? 7 : timeFilter === '30' ? 30 : undefined;
  const emotionDist = getEmotionDistribution(entries, filterDaysNum);
  const weeklyData = getWeeklyActivity(entries);
  const victoryStats = getVictoryStats(entries);
  const topTriggers = getCommonTriggers(entries, 5);

  // Maximum value for weekly chart scaling
  const maxWeeklyCount = Math.max(1, ...weeklyData.map(d => d.total));

  const handleSaveDays = () => {
    const clamped = Math.max(0, customDays);
    const newTimestamp = Date.now() - clamped * 86400000;
    onUpdateFreedomDate(newTimestamp);
    setIsEditingDate(false);
  };

  return (
    <div className="space-y-6">
      {/* 1. Milestone Hero Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-700 relative overflow-hidden">
        <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 opacity-10 pointer-events-none">
          <Award className="w-64 h-64 text-amber-400" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              {milestone.title}
            </span>
            <button
              onClick={() => setIsEditingDate(!isEditingDate)}
              type="button"
              className="text-xs text-slate-300 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              {isEditingDate ? 'Cerrar ajuste' : 'Ajustar mi día de inicio'}
            </button>
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white font-serif">
              {daysFree}
            </span>
            <span className="text-lg sm:text-2xl text-amber-300 font-medium">
              {daysFree === 1 ? 'día de libertad continua' : 'días de libertad continua'}
            </span>
          </div>

          <p className="text-sm sm:text-base text-slate-200 leading-relaxed mb-4">
            "{milestone.desc}"
          </p>

          {isEditingDate && (
            <div className="bg-slate-800/90 p-4 rounded-xl border border-slate-600 mb-4 max-w-sm">
              <label htmlFor="custom-days-input" className="block text-xs font-semibold text-slate-200 mb-1">
                ¿Cuántos días llevas desde que tomaste tu decisión de cambio?
              </label>
              <div className="flex gap-2">
                <input
                  id="custom-days-input"
                  type="number"
                  min="0"
                  value={customDays}
                  onChange={e => setCustomDays(Number(e.target.value))}
                  className="w-24 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-600 text-white text-sm"
                />
                <button
                  onClick={handleSaveDays}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  Guardar días
                </button>
              </div>
            </div>
          )}

          {/* Scripture Anchor in Hero */}
          <div className="pt-4 border-t border-slate-700/80 flex items-start gap-2 text-xs sm:text-sm text-slate-300">
            <span className="text-amber-400 font-serif font-bold text-base">“</span>
            <p className="italic">
              Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias; nuevas son cada mañana.
              <span className="font-bold text-amber-400 not-italic ml-1">Lamentaciones 3:22-23</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Summary Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Tasa de Victoria</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">
            {victoryStats.rate}%
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {victoryStats.resisted} de {victoryStats.total} impulsos vencidos
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Impulsos Registrados</span>
            <BarChart3 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">
            {victoryStats.total}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Cada registro es un acto de conciencia
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Intensidad Media</span>
            <Flame className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-slate-900">
            {victoryStats.avgIntensity} <span className="text-xs font-normal text-slate-400">/ 10</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Nivel promedio de deseo sentido
          </p>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs mb-1">
            <span>Emoción Frecuente</span>
            <Sparkles className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
            {emotionDist[0]?.emo || '—'}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {emotionDist[0] ? `${emotionDist[0].percentage}% de tus episodios` : 'Sin registros aún'}
          </p>
        </div>
      </div>

      {/* 3. Weekly Activity Chart */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200/90 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              Actividad Semanal: Impulsos vs. Victorias
            </h3>
            <p className="text-xs text-slate-500">
              Observa cómo enfrentas los impulsos a lo largo de los últimos 7 días.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span className="w-3 h-3 rounded bg-amber-600 inline-block" />
              Impulsos superados
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <span className="w-3 h-3 rounded bg-stone-300 inline-block" />
              En lucha
            </span>
          </div>
        </div>

        {/* Responsive Bar Chart Rendering */}
        <div className="pt-6 pb-2">
          <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44">
            {weeklyData.map((day, i) => {
              const heightTotal = day.total > 0 ? Math.max(16, (day.total / maxWeeklyCount) * 130) : 6;
              const heightResisted = day.total > 0 ? (day.resisted / day.total) * heightTotal : 0;
              const heightStruggle = heightTotal - heightResisted;

              return (
                <div key={i} className="flex flex-col items-center justify-end h-full group">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] rounded px-2 py-1 mb-1.5 pointer-events-none whitespace-nowrap shadow-sm">
                    {day.total === 0 ? 'Sin registros' : `${day.resisted} vencidos / ${day.total} total`}
                  </div>

                  {/* Bars Container */}
                  <div
                    style={{ height: `${heightTotal}px` }}
                    className="w-full max-w-[42px] rounded-lg overflow-hidden flex flex-col justify-end transition-all bg-stone-200/70"
                  >
                    {/* Struggle segment */}
                    {heightStruggle > 0 && (
                      <div
                        style={{ height: `${heightStruggle}px` }}
                        className="w-full bg-stone-400/80 transition-all"
                      />
                    )}
                    {/* Resisted segment */}
                    {heightResisted > 0 && (
                      <div
                        style={{ height: `${heightResisted}px` }}
                        className="w-full bg-amber-600 transition-all"
                      />
                    )}
                  </div>

                  {/* Day Label */}
                  <div className="mt-2 text-center">
                    <span className="block text-xs font-bold text-slate-800">{day.dayName}</span>
                    <span className="block text-[10px] text-slate-400 font-medium">
                      {day.total > 0 ? `${day.total}` : '0'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Emotional Breakdown & Triggers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Emotion Distribution */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-amber-600" />
              Patrones Emocionales
            </h3>
            <div className="flex gap-1 text-[11px] bg-stone-100 p-0.5 rounded-lg">
              <button
                onClick={() => setTimeFilter('7')}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  timeFilter === '7' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                7 días
              </button>
              <button
                onClick={() => setTimeFilter('30')}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  timeFilter === '30' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                30 días
              </button>
              <button
                onClick={() => setTimeFilter('all')}
                className={`px-2 py-0.5 rounded-md font-semibold transition-colors cursor-pointer ${
                  timeFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                }`}
              >
                Todo
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Identifica qué estado de ánimo antecede al deseo para orar específicamente antes de caer.
          </p>

          {emotionDist.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400">
              No hay datos emocionales en este período.
            </div>
          ) : (
            <div className="space-y-3">
              {emotionDist.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                    <span className="flex items-center gap-1.5">
                      <EmotionIcon name={item.emo} className="w-3.5 h-3.5 text-amber-600" />
                      {item.emo}
                    </span>
                    <span className="text-slate-500 font-normal">
                      {item.count} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.percentage}%` }}
                      className="h-full bg-amber-600 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Recurring Triggers */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/90 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-500" />
            Disparadores Más Frecuentes
          </h3>
          <p className="text-xs text-slate-500">
            Conocer tus disparadores te permite anticipar y preparar de antemano una salida.
          </p>

          {topTriggers.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400">
              Aún no hay disparadores registrados. Escribe qué activa el deseo en tus registros.
            </div>
          ) : (
            <div className="space-y-2.5">
              {topTriggers.map((trig, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-800 truncate mr-2">
                    {trig.trigger}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-stone-200 text-slate-700 font-bold flex-shrink-0">
                    {trig.count} {trig.count === 1 ? 'vez' : 'veces'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Encouraging Biblical Callout */}
          <div className="mt-4 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-950">
            <div className="flex items-center gap-1.5 font-bold mb-1 text-amber-900">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
              Consejo Bíblico de Prevención
            </div>
            <p className="italic font-serif">
              "Sobre toda cosa guardada, guarda tu corazón; porque de él mana la vida."
            </p>
            <span className="font-bold text-[11px] text-amber-800 mt-0.5 block">Proverbios 4:23</span>
          </div>
        </div>
      </div>
    </div>
  );
};
