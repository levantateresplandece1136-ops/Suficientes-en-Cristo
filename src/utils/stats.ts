import { ImpulsoEntry } from '../types';

export interface EmotionCount {
  emo: string;
  count: number;
  percentage: number;
}

export interface DayActivity {
  dayName: string;
  dateKey: string;
  total: number;
  resisted: number;
}

export function calculateFreedomDays(freedomStartDate: number, referenceTime = Date.now()): number {
  if (!freedomStartDate || freedomStartDate > referenceTime) return 0;
  const diffMs = referenceTime - freedomStartDate;
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

export function getFreedomMilestone(days: number): { title: string; desc: string; icon: string } {
  if (days >= 90) return { title: '90+ Días de Renovación', desc: 'Un testimonio de la gracia transformadora de Dios día a día.', icon: 'Award' };
  if (days >= 30) return { title: '1 Mes de Firmeza', desc: 'Nuevos hábitos y una mente anclada en la verdad bíblica.', icon: 'ShieldCheck' };
  if (days >= 14) return { title: '2 Semanas de Claridad', desc: 'La sobriedad y la templanza se fortalecen con cada elección.', icon: 'Sparkles' };
  if (days >= 7) return { title: '7 Días de Victoria', desc: 'Una semana completa venciendo los impulsos un momento a la vez.', icon: 'CheckCircle' };
  if (days >= 3) return { title: '3 Días de Determinación', desc: 'El comienzo de un camino firme de restauración.', icon: 'HeartHandshake' };
  return { title: 'Un Día a la Vez', desc: 'Bástale a cada día su propio afán. Enfócate en la fidelidad de hoy.', icon: 'Sun' };
}

export function getEmotionDistribution(entries: ImpulsoEntry[], filterDays?: number, referenceTime = Date.now()): EmotionCount[] {
  let list = entries;
  if (filterDays) {
    const cutoff = referenceTime - filterDays * 86400000;
    list = entries.filter(e => e.t >= cutoff);
  }

  const map: Record<string, number> = {};
  let total = 0;

  for (const entry of list) {
    if (!entry.emo) continue;
    map[entry.emo] = (map[entry.emo] || 0) + 1;
    total++;
  }

  if (total === 0) return [];

  return Object.entries(map)
    .map(([emo, count]) => ({
      emo,
      count,
      percentage: Math.round((count / total) * 100)
    }))
    .sort((a, b) => b.count - a.count);
}

export function getWeeklyActivity(entries: ImpulsoEntry[], referenceTime = Date.now()): DayActivity[] {
  const days: DayActivity[] = [];
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  for (let i = 6; i >= 0; i--) {
    const targetDate = new Date(referenceTime - i * 86400000);
    const dateKey = targetDate.toISOString().split('T')[0];
    const dayName = dayNames[targetDate.getDay()];

    const matching = entries.filter(e => {
      const eDate = new Date(e.t).toISOString().split('T')[0];
      return eDate === dateKey;
    });

    const total = matching.length;
    const resisted = matching.filter(e => e.resisted).length;

    days.push({
      dayName,
      dateKey,
      total,
      resisted
    });
  }

  return days;
}

export function getVictoryStats(entries: ImpulsoEntry[]): { total: number; resisted: number; rate: number; avgIntensity: number } {
  const total = entries.length;
  if (total === 0) {
    return { total: 0, resisted: 0, rate: 100, avgIntensity: 0 };
  }

  const resisted = entries.filter(e => e.resisted).length;
  const rate = Math.round((resisted / total) * 100);

  const totalIntensity = entries.reduce((acc, curr) => acc + (curr.intensity || 5), 0);
  const avgIntensity = Number((totalIntensity / total).toFixed(1));

  return {
    total,
    resisted,
    rate,
    avgIntensity
  };
}

export function getCommonTriggers(entries: ImpulsoEntry[], maxItems = 5): { trigger: string; count: number }[] {
  const map: Record<string, number> = {};

  for (const e of entries) {
    const clean = e.trig?.trim();
    if (!clean) continue;
    // Normalize casing for count grouping
    const lower = clean.toLowerCase();
    map[clean] = (map[clean] || 0) + 1;
  }

  return Object.entries(map)
    .map(([trigger, count]) => ({ trigger, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, maxItems);
}
