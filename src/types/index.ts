export interface ImpulsoEntry {
  id: string;
  t: number; // timestamp
  emo: string;
  intensity: number; // 1 to 10
  trig: string;
  did: string;
  resisted: boolean; // Overcame / applied alternative response
  trId?: string; // truth card id if selected
  truthText?: string;
  truthRef?: string;
  notes?: string;
}

export interface TruthCard {
  id: string;
  lie: string;
  truth: string;
  ref: string;
  category?: string;
  isCustom?: boolean;
}

export interface ReflectionQuestion {
  id: string;
  q: string;
  ref: string;
}

export interface ReflectionTheme {
  id: string;
  title: string;
  description: string;
  questions: ReflectionQuestion[];
}

export interface DailyJournalEntry {
  id: string;
  date: string; // ISO date YYYY-MM-DD
  t: number;
  surrender: string; // Qué entregué a Dios
  gratitude: string; // Por qué doy gracias
  victoryMoment: string; // En qué momento sentí victoria o calma
  verse: string; // Versículo que medité
  mood: 'paz' | 'esperanza' | 'lucha' | 'vulnerable' | 'agradecido';
}

export interface SafetyPlan {
  alertas: string;
  disp: string;
  quien: string;
  tel: string;
  pasaje: string;
  accion: string;
  emer: string;
}

export type ActiveTab = 'hoy' | 'progreso' | 'ref' | 'ver' | 'plan';
