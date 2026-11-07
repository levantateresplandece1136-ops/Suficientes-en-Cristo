import { TruthCard, ReflectionTheme } from '../types';

export interface EmotionOption {
  id: string;
  label: string;
  iconName: string;
  hint: string;
  color: string;
}

export const EMOTIONS: EmotionOption[] = [
  { id: 'Ansiedad', label: 'Ansiedad', iconName: 'Wind', hint: 'Inquietud o agobio por el futuro', color: 'amber' },
  { id: 'Soledad', label: 'Soledad', iconName: 'UserX', hint: 'Sensación de aislamiento o vacío', color: 'blue' },
  { id: 'Frustración', label: 'Frustración', iconName: 'Flame', hint: 'Cosas fuera de mi control', color: 'orange' },
  { id: 'Aburrimiento', label: 'Aburrimiento', iconName: 'Clock', hint: 'Falta de estímulo o rumbo', color: 'slate' },
  { id: 'Inseguridad', label: 'Inseguridad', iconName: 'ShieldAlert', hint: 'Duda de mi valor o capacidad', color: 'rose' },
  { id: 'Rechazo', label: 'Rechazo', iconName: 'HeartCrack', hint: 'Herida en una relación o juicio ajeno', color: 'purple' },
  { id: 'Culpa', label: 'Culpa', iconName: 'HelpCircle', hint: 'Remordimiento o vergüenza', color: 'indigo' },
  { id: 'Enojo', label: 'Enojo', iconName: 'AlertTriangle', hint: 'Molestia intensa o resentimiento', color: 'red' },
  { id: 'Cansancio', label: 'Cansancio', iconName: 'BatteryLow', hint: 'Agotamiento físico o mental', color: 'stone' },
];

export const INITIAL_TRUTHS: TruthCard[] = [
  {
    id: 'tr-1',
    lie: 'No puedo vivir sin esa persona o esa gratificación.',
    truth: 'Mi vida está escondida con Cristo en Dios. Él es la fuente de mi plenitud.',
    ref: 'Colosenses 3:3-4',
    category: 'Identidad y Plenitud'
  },
  {
    id: 'tr-2',
    lie: 'Necesito esto inmediatamente para calmar mi dolor o estar tranquilo.',
    truth: 'Por nada estéis afanosos. Puedo presentar mis ansiedades a Dios y Su paz guardará mi corazón.',
    ref: 'Filipenses 4:6-7',
    category: 'Paz y Ansiedad'
  },
  {
    id: 'tr-3',
    lie: 'No tengo dominio propio, la tentación es más fuerte que yo.',
    truth: 'No nos ha dado Dios espíritu de cobardía, sino de poder, de amor y de dominio propio. El fruto del Espíritu es templanza.',
    ref: '2 Timoteo 1:7 · Gálatas 5:22-23',
    category: 'Dominio Propio'
  },
  {
    id: 'tr-4',
    lie: 'Mi pasado y mis caídas determinan mi futuro.',
    truth: 'De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.',
    ref: '2 Corintios 5:17',
    category: 'Nueva Vida'
  },
  {
    id: 'tr-5',
    lie: 'Ya lo he intentado muchas veces; no puedo cambiar.',
    truth: 'Dios es el que en vosotros produce así el querer como el hacer, por su buena voluntad. No estoy solo en este proceso.',
    ref: 'Filipenses 2:13',
    category: 'Poder de Dios'
  },
  {
    id: 'tr-6',
    lie: 'Necesito satisfacer de inmediato lo que deseo o no lo soportaré.',
    truth: 'He aprendido a contentarme, cualquiera que sea mi situación. Todo lo puedo en Cristo que me fortalece.',
    ref: 'Filipenses 4:11-13',
    category: 'Contentamiento'
  },
  {
    id: 'tr-7',
    lie: 'Sin mí todo se cae; si no controlo la situación, ocurrirá una catástrofe.',
    truth: 'Estando persuadido de esto, que el que comenzó en vosotros la buena obra, la perfeccionará hasta el día de Jesucristo.',
    ref: 'Filipenses 1:6',
    category: 'Confianza y Control'
  },
  {
    id: 'tr-8',
    lie: 'Mi valor depende de lo que otros piensen de mí o de que me acepten.',
    truth: 'Con Cristo estoy juntamente crucificado, y ya no vivo yo, mas vive Cristo en mí. Mi aprobación proviene del Padre.',
    ref: 'Gálatas 2:20',
    category: 'Aceptación'
  },
  {
    id: 'tr-9',
    lie: 'Si no me necesitan, no valgo nada y no tengo propósito.',
    truth: 'Fuiste comprado por precio de sangre. Tu valor fue decretado para siempre en la cruz.',
    ref: '1 Corintios 6:20',
    category: 'Valor en Dios'
  },
  {
    id: 'tr-10',
    lie: 'Tengo que complacer a todos, aunque cueste mi paz y mi fidelidad a Dios.',
    truth: 'Pues, ¿busco ahora el favor de los hombres, o el de Dios? Si todavía agradara a los hombres, no sería siervo de Cristo.',
    ref: 'Gálatas 1:10',
    category: 'Límites Saludables'
  },
  {
    id: 'tr-11',
    lie: 'Nadie comprende mi sufrimiento, no hay salida para mí.',
    truth: 'No os ha sobrevenido ninguna tentación que no sea humana; pero fiel es Dios, que no os dejará ser tentados más de lo que podéis resistir.',
    ref: '1 Corintios 10:13',
    category: 'Victoria en la Tentación'
  },
  {
    id: 'tr-12',
    lie: 'Ya arruiné todo, Dios está cansado de mí.',
    truth: 'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.',
    ref: 'Lamentaciones 3:22-23',
    category: 'Gracia y Perdón'
  }
];

export const REFLECTION_THEMES: ReflectionTheme[] = [
  {
    id: 'theme-1',
    title: '1. Identidad en Cristo vs. Temor del Hombre',
    description: 'Reconoce si buscas en personas o aprobación aquello que solo Dios concede.',
    questions: [
      {
        id: 'q1-1',
        q: '¿Estoy buscando en una persona o en una conducta la seguridad, aceptación o valor que solo Dios puede darme?',
        ref: 'Jeremías 17:5-8'
      },
      {
        id: 'q1-2',
        q: '¿Qué tanto mi identidad se sostiene en Cristo y no en la mirada y opiniones de los demás?',
        ref: 'Gálatas 2:20'
      },
      {
        id: 'q1-3',
        q: '¿Me preocupa más caerle bien a la gente o ser fiel y agradar a Dios en lo secreto?',
        ref: 'Juan 12:43'
      },
      {
        id: 'q1-4',
        q: '¿Me siento avergonzado de quién soy en lugar de descansar en mi nueva naturaleza redimida?',
        ref: '2 Corintios 5:17'
      }
    ]
  },
  {
    id: 'theme-2',
    title: '2. Límites Sanos y Necesidad de Control',
    description: 'Aprende a soltar la carga de resolver vidas ajenas y encomendarlas al Señor.',
    questions: [
      {
        id: 'q2-1',
        q: '¿Estoy tratando de controlar, rescatar o solucionar la vida de otros en vez de dejarlos en las manos de Dios?',
        ref: '1 Pedro 5:7'
      },
      {
        id: 'q2-2',
        q: '¿Me siento responsable de otros hasta el punto de descuidar mi salud, mi descanso y mi relación con Dios?',
        ref: 'Mateo 11:28-30'
      },
      {
        id: 'q2-3',
        q: '¿Uso súplicas, manipulación o silencios para obligar a otros a no alejarse?',
        ref: 'Efesios 4:15'
      },
      {
        id: 'q2-4',
        q: '¿Permito que otros vulneren mi dignidad una y otra vez por miedo a poner un límite claro y amoroso?',
        ref: 'Efesios 4:25'
      }
    ]
  },
  {
    id: 'theme-3',
    title: '3. Amor Genuino vs. Necesidad de Ser Necesitado',
    description: 'Distingue entre el amor bíblico desinteresado y la dependencia emocional.',
    questions: [
      {
        id: 'q3-1',
        q: '¿Mi servicio y entrega nacen del amor de Cristo o de la necesidad egoísta de sentirme indispensable?',
        ref: '1 Corintios 13:3'
      },
      {
        id: 'q3-2',
        q: '¿Me desgasto dando porque en el fondo exijo reconocimiento o afecto a cambio?',
        ref: 'Colosenses 3:23-24'
      },
      {
        id: 'q3-3',
        q: '¿Confundo amor sacrificial con dependencia compulsiva y permisividad dañina?',
        ref: 'Efesios 5:2'
      },
      {
        id: 'q3-4',
        q: '¿Adopto el papel de «mártir» esperando compasión humana en vez de buscar el agrado del Señor?',
        ref: 'Mateo 6:33'
      }
    ]
  },
  {
    id: 'theme-4',
    title: '4. Culpa, Resentimiento y Heridas del Corazón',
    description: 'Examina tus raíces de enojo o amargura con la luz y gracia del Espíritu Santo.',
    questions: [
      {
        id: 'q4-1',
        q: '¿Estoy más enfocado en señalar los errores de los demás que en examinar la condición de mi propio corazón?',
        ref: 'Mateo 7:3-5'
      },
      {
        id: 'q4-2',
        q: '¿Siento un resentimiento constante porque considero que no se me valora como merezco?',
        ref: 'Gálatas 1:10'
      },
      {
        id: 'q4-3',
        q: '¿Mi ira refleja celo santo o simple frustración porque las cosas no salieron a mi manera?',
        ref: 'Santiago 1:19-20'
      },
      {
        id: 'q4-4',
        q: '¿Estoy dispuesto a perdonar como Cristo me perdonó a mí y renunciar a la venganza?',
        ref: 'Efesios 4:31-32'
      }
    ]
  },
  {
    id: 'theme-5',
    title: '5. Fe Viva y Descanso en la Soberanía de Dios',
    description: 'Confianza real en que Dios tiene el gobierno de las circunstancias.',
    questions: [
      {
        id: 'q5-1',
        q: '¿Confío en que Dios tiene poder para obrar en otros sin necesidad de que yo intervenga con ansiedad?',
        ref: 'Filipenses 1:6'
      },
      {
        id: 'q5-2',
        q: '¿Mi oración es un descanso humilde en Dios o un intento de darle instrucciones al Creador?',
        ref: 'Filipenses 4:6-7'
      },
      {
        id: 'q5-3',
        q: '¿Estoy dispuesto a soltar lo que me ata y creer de corazón que Su gracia me basta?',
        ref: 'Salmo 55:22 · 2 Corintios 12:9'
      },
      {
        id: 'q5-4',
        q: 'Si aquello a lo que me aferro desapareciera hoy, ¿seguiría creyendo que Cristo es suficiente para mí?',
        ref: 'Habacuc 3:17-18'
      }
    ]
  },
  {
    id: 'theme-6',
    title: '6. Caminar en la Verdadera Libertad',
    description: 'La libertad que Cristo compró no es para volver al yugo de la esclavitud.',
    questions: [
      {
        id: 'q6-1',
        q: '¿Estoy viviendo en la libertad con que Cristo me hizo libre o regresando a cadenas emocionales?',
        ref: 'Gálatas 5:1'
      },
      {
        id: 'q6-2',
        q: '¿Estoy sacrificando mi paz mental, mi devoción a Dios o mi familia por mantener un hábito oculto?',
        ref: 'Mateo 6:33'
      },
      {
        id: 'q6-3',
        q: '¿Oscilo entre ser hipercontrolador o descuidado, en lugar de caminar en sobriedad y gracia?',
        ref: 'Eclesiastés 7:18'
      },
      {
        id: 'q6-4',
        q: '¿Qué paso concreto de rendición y verdad daré hoy para que el Hijo me haga verdaderamente libre?',
        ref: 'Juan 8:36'
      }
    ]
  }
];

export const CHECKUP_QUESTIONS: string[] = [
  '¿He perdido con frecuencia la capacidad de frenar o moderar este deseo una vez que se activa?',
  '¿He prometido a Dios o a otros detenerme, pero volví a caer en el mismo ciclo?',
  '¿Continúo recurriendo a este impulso a pesar de experimentar culpa, tristeza o daño en mis relaciones?',
  '¿Este deseo o conducta está desplazando mis oraciones, responsabilidades o momentos de calidad con seres queridos?',
  '¿Se ha convertido en mi principal anestésico ante la soledad, el estrés, el enojo o la tristeza?'
];

export const ALTERNATIVE_ACTIONS = [
  'Hacer una pausa y orar el Salmo 23',
  'Realizar 3 minutos de respiración profunda consciente',
  'Llamar o escribir a mi persona de confianza',
  'Salir a caminar 10 minutos y tomar agua',
  'Leer en voz alta la verdad bíblica elegida',
  'Escribir en el diario reflexivo lo que siento'
];
