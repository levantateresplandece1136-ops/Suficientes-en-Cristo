import { ImpulsoEntry, TruthCard, SafetyPlan, DailyJournalEntry } from '../types';
import { INITIAL_TRUTHS } from '../data/biblicalData';

export interface AppState {
  entries: ImpulsoEntry[];
  customTruths: TruthCard[];
  reflections: Record<string, string>;
  dailyJournals: DailyJournalEntry[];
  safetyPlan: SafetyPlan;
  checkup: boolean[];
  freedomStartDate: number; // For streak calculation
}

const STORAGE_KEY = 'suficiente_en_cristo_libertad_v2';

export const DEFAULT_SAFETY_PLAN: SafetyPlan = {
  alertas: 'Tensión en los hombros, aceleración en los pensamientos, ganas de aislarme o revisar el teléfono compulsivamente.',
  disp: 'Quedarme despierto hasta tarde solo, una discusión familiar, sensación de vacío o cansancio extremo.',
  quien: 'Hermano / Amigo de confianza',
  tel: '+1 555 0192',
  pasaje: 'Filipenses 4:6-7: Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios.',
  accion: 'Levantarme inmediatamente del lugar, beber un vaso de agua fresca y orar en voz alta.',
  emer: '911 / Línea de apoyo 988'
};

// Generates warm, realistic initial demo records so progress charts are motivating from first open
export function getInitialSeedState(): AppState {
  const now = Date.now();
  const day = 86400000;

  const sampleEntries: ImpulsoEntry[] = [
    {
      id: 'demo-1',
      t: now - day * 4 - 3600000 * 3,
      emo: 'Ansiedad',
      intensity: 7,
      trig: 'Noticia estresante en el trabajo al final de la tarde',
      did: 'Me detuve, respiré 3 minutos y recité Filipenses 4:6-7',
      resisted: true,
      truthRef: 'Filipenses 4:6-7',
      truthText: 'Puedo presentar mis ansiedades a Dios y Su paz guardará mi corazón.',
      notes: 'Sentí alivio al soltar el control.'
    },
    {
      id: 'demo-2',
      t: now - day * 3 - 3600000 * 5,
      emo: 'Soledad',
      intensity: 6,
      trig: 'Noche de viernes sin planes en casa',
      did: 'Llamé a mi persona de confianza y leímos un Salmo',
      resisted: true,
      truthRef: 'Colosenses 3:3-4',
      truthText: 'Mi vida está escondida con Cristo en Dios.',
      notes: 'No tuve que buscar consuelo falso.'
    },
    {
      id: 'demo-3',
      t: now - day * 2 - 3600000 * 2,
      emo: 'Frustración',
      intensity: 8,
      trig: 'Desacuerdo familiar donde quise forzar mi opinión',
      did: 'Reconocí mi deseo de controlar; pedí perdón y me aparté a orar',
      resisted: true,
      truthRef: 'Filipenses 1:6',
      truthText: 'El que comenzó en nosotros la buena obra la perfeccionará.',
      notes: 'Soltar a la persona en manos de Dios trajo paz.'
    },
    {
      id: 'demo-4',
      t: now - day * 1 - 3600000 * 4,
      emo: 'Cansancio',
      intensity: 5,
      trig: 'Día largo y agotador, impulso de evadir la realidad',
      did: 'Me preparé un té caliente y me acosté temprano leyendo Salmos',
      resisted: true,
      truthRef: 'Mateo 11:28-30',
      truthText: 'Venid a mí todos los que estáis trabajados y cargados.',
      notes: 'El descanso físico es honrar a Dios.'
    }
  ];

  const sampleJournals: DailyJournalEntry[] = [
    {
      id: 'journal-demo-1',
      date: new Date(now - day * 1).toISOString().split('T')[0],
      t: now - day * 1,
      surrender: 'Hoy entregué el temor a no ser suficiente y la urgencia de complacer a todos.',
      gratitude: 'Agradezco el sustento de Dios y la lucidez para reconocer mis límites sin culpa.',
      victoryMoment: 'Al final de la tarde sentí el viejo impulso de refugiarme en la evasión, pero Dios me dio firmeza para llamar a orar.',
      verse: 'Filipenses 4:13 · Todo lo puedo en Cristo que me fortalece.',
      mood: 'paz'
    }
  ];

  return {
    entries: sampleEntries,
    customTruths: [],
    reflections: {
      'theme-1-q1-1': 'A veces buscaba en la validación de los demás la calma que solo el Señor me asegura en Su Palabra.',
      'theme-2-q2-1': 'Aprendiendo que Dios ama a las personas de mi entorno más de lo que yo podría; no soy su salvador, Cristo lo es.'
    },
    dailyJournals: sampleJournals,
    safetyPlan: DEFAULT_SAFETY_PLAN,
    checkup: [false, false, false, false, false],
    freedomStartDate: now - day * 14 // 14 days baseline
  };
}

export function loadAppState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialSeedState();
      saveAppState(initial);
      return initial;
    }
    const parsed = JSON.parse(raw);
    return {
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
      customTruths: Array.isArray(parsed.customTruths) ? parsed.customTruths : [],
      reflections: parsed.reflections && typeof parsed.reflections === 'object' ? parsed.reflections : {},
      dailyJournals: Array.isArray(parsed.dailyJournals) ? parsed.dailyJournals : [],
      safetyPlan: { ...DEFAULT_SAFETY_PLAN, ...(parsed.safetyPlan || {}) },
      checkup: Array.isArray(parsed.checkup) ? parsed.checkup : [false, false, false, false, false],
      freedomStartDate: typeof parsed.freedomStartDate === 'number' ? parsed.freedomStartDate : Date.now() - 86400000 * 7
    };
  } catch (e) {
    console.error('Error loading app state from localStorage:', e);
    return getInitialSeedState();
  }
}

export function saveAppState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving app state:', e);
  }
}

export function exportAppData(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function importAppData(jsonString: string): AppState | null {
  try {
    const data = JSON.parse(jsonString);
    if (!data || typeof data !== 'object') return null;
    const cleanState: AppState = {
      entries: Array.isArray(data.entries) ? data.entries : [],
      customTruths: Array.isArray(data.customTruths) ? data.customTruths : [],
      reflections: data.reflections && typeof data.reflections === 'object' ? data.reflections : {},
      dailyJournals: Array.isArray(data.dailyJournals) ? data.dailyJournals : [],
      safetyPlan: { ...DEFAULT_SAFETY_PLAN, ...(data.safetyPlan || {}) },
      checkup: Array.isArray(data.checkup) ? data.checkup : [false, false, false, false, false],
      freedomStartDate: typeof data.freedomStartDate === 'number' ? data.freedomStartDate : Date.now()
    };
    saveAppState(cleanState);
    return cleanState;
  } catch (e) {
    console.error('Failed to parse imported JSON data:', e);
    return null;
  }
}
