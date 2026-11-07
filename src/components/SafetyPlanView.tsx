import React from 'react';
import {
  ShieldCheck,
  Phone,
  AlertTriangle,
  UserCheck,
  Sparkles,
  BookOpen,
  LifeBuoy,
  Save,
  CheckCircle2
} from 'lucide-react';
import { SafetyPlan } from '../types';
import { CHECKUP_QUESTIONS } from '../data/biblicalData';

interface SafetyPlanViewProps {
  safetyPlan: SafetyPlan;
  checkup: boolean[];
  onUpdatePlan: (field: keyof SafetyPlan, val: string) => void;
  onToggleCheckup: (index: number) => void;
  onOpenSOS: () => void;
}

export const SafetyPlanView: React.FC<SafetyPlanViewProps> = ({
  safetyPlan,
  checkup,
  onUpdatePlan,
  onToggleCheckup,
  onOpenSOS
}) => {
  const checkCount = checkup.filter(Boolean).length;

  const getCheckupMessage = () => {
    if (checkCount === 0) {
      return {
        level: 'good',
        text: 'Excelente. No reportas señales agudas de dependencia compulsiva en este momento. Mantén la sobriedad y la oración continua.',
        badge: 'Saludable y Consciente'
      };
    }
    if (checkCount <= 2) {
      return {
        level: 'warn',
        text: 'Hay señales de alerta temprana. Es el momento perfecto para observar tus disparadores, escribir en el diario reflexivo y rendir cuentas con tu persona de confianza.',
        badge: 'Alerta Temprana'
      };
    }
    return {
      level: 'urgent',
      text: 'Existen múltiples indicadores de dependencia activa. Te animamos con todo cariño a hablar pronto con tu pastor, consejero bíblico o profesional de la salud. En Cristo hay esperanza y no tienes que librar esta batalla en soledad.',
      badge: 'Atención Requerida'
    };
  };

  const chkResult = getCheckupMessage();

  return (
    <div className="space-y-6">
      {/* 1. Safety Response Plan Form */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              Mi Plan de Respuesta y Prevención
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Diseña tu plan con calma hoy, antes del momento de vulnerabilidad. Cuando llegue el impulso, solo tendrás que abrirlo.
            </p>
          </div>

          <button
            onClick={onOpenSOS}
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs sm:text-sm shadow-xs transition-all self-start sm:self-auto cursor-pointer"
          >
            <LifeBuoy className="w-4 h-4" />
            <span>Abrir Plan SOS en Crisis</span>
          </button>
        </div>

        <div className="space-y-4">
          {/* Alertas */}
          <div>
            <label htmlFor="plan-alertas-input" className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              1. Mis Señales de Alerta Temprana (¿Qué siento o pienso justo antes?)
            </label>
            <textarea
              id="plan-alertas-input"
              value={safetyPlan.alertas}
              onChange={e => onUpdatePlan('alertas', e.target.value)}
              rows={2}
              placeholder="Ej.: Tensión física, ganas de aislarme, ver el reloj repetidamente..."
              className="w-full p-3 rounded-xl border border-stone-300 text-sm text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {/* Disparadores */}
          <div>
            <label htmlFor="plan-disp-input" className="block text-xs font-bold text-slate-800 mb-1">
              2. Mis Disparadores (Personas, lugares, horarios, emociones)
            </label>
            <textarea
              id="plan-disp-input"
              value={safetyPlan.disp}
              onChange={e => onUpdatePlan('disp', e.target.value)}
              rows={2}
              placeholder="Ej.: Estar solo de noche, después de una discusión, aburrimiento..."
              className="w-full p-3 rounded-xl border border-stone-300 text-sm text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {/* Contacto de confianza */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="plan-quien-input" className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                3. Mi Persona de Confianza
              </label>
              <input
                id="plan-quien-input"
                type="text"
                value={safetyPlan.quien}
                onChange={e => onUpdatePlan('quien', e.target.value)}
                placeholder="Nombre de tu mentor, amigo o familiar"
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>

            <div>
              <label htmlFor="plan-tel-input" className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                4. Su Teléfono o WhatsApp
              </label>
              <input
                id="plan-tel-input"
                type="text"
                value={safetyPlan.tel}
                onChange={e => onUpdatePlan('tel', e.target.value)}
                placeholder="+1 555..."
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
              />
            </div>
          </div>

          {/* Pasaje Bíblico Ancla */}
          <div>
            <label htmlFor="plan-pasaje-input" className="block text-xs font-bold text-slate-800 mb-1 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              5. Mi Pasaje Bíblico Ancla y Verdad de Libertad
            </label>
            <textarea
              id="plan-pasaje-input"
              value={safetyPlan.pasaje}
              onChange={e => onUpdatePlan('pasaje', e.target.value)}
              rows={2}
              placeholder="Ej.: Filipenses 4:13 · Todo lo puedo en Cristo que me fortalece."
              className="w-full p-3 rounded-xl border border-stone-300 text-sm text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {/* Acción alternativa */}
          <div>
            <label htmlFor="plan-accion-input" className="block text-xs font-bold text-slate-800 mb-1">
              6. Mi Acción Alternativa Inmediata (Lo que haré en los primeros 5 minutos)
            </label>
            <textarea
              id="plan-accion-input"
              value={safetyPlan.accion}
              onChange={e => onUpdatePlan('accion', e.target.value)}
              rows={2}
              placeholder="Ej.: Levantarme del lugar, tomar 2 vasos de agua fría, salir a caminar y orar el Padre Nuestro..."
              className="w-full p-3 rounded-xl border border-stone-300 text-sm text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {/* Teléfono de emergencia país */}
          <div>
            <label htmlFor="plan-emer-input" className="block text-xs font-bold text-slate-800 mb-1">
              7. Línea de Apoyo Emocional / Emergencias de mi País
            </label>
            <input
              id="plan-emer-input"
              type="text"
              value={safetyPlan.emer}
              onChange={e => onUpdatePlan('emer', e.target.value)}
              placeholder="Ej.: 911 / Línea de crisis 988"
              className="w-full p-2.5 rounded-xl border border-stone-300 text-sm text-slate-800 focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 p-3 rounded-xl">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>Los cambios en tu plan se guardan de forma instantánea y privada en tu dispositivo.</span>
        </div>
      </div>

      {/* 2. Self-Check Section */}
      <div className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200/90 shadow-xs space-y-5">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Chequeo Personal de Autoevaluación
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Cinco preguntas de autoexamen para identificar patrones de dependencia problemática. Es una guía de honestidad interior, no un diagnóstico clínico.
          </p>
        </div>

        <div className="space-y-3">
          {CHECKUP_QUESTIONS.map((question, idx) => {
            const isChecked = !!checkup[idx];

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onToggleCheckup(idx)}
                className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3.5 cursor-pointer ${
                  isChecked
                    ? 'bg-amber-50/80 border-amber-400/80 text-amber-950 shadow-2xs'
                    : 'bg-stone-50/50 hover:bg-stone-100/70 border-stone-200 text-slate-800'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                    isChecked
                      ? 'bg-amber-600 border-amber-600 text-white'
                      : 'border-stone-400 bg-white'
                  }`}
                >
                  {isChecked && <CheckCircle2 className="w-4 h-4" />}
                </div>

                <div className="text-xs sm:text-sm leading-relaxed font-medium">
                  {idx + 1}. {question}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback Card */}
        <div className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed space-y-1.5 ${
          chkResult.level === 'good' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' :
          chkResult.level === 'warn' ? 'bg-amber-50 border-amber-200 text-amber-950' :
          'bg-rose-50 border-rose-200 text-rose-950'
        }`}>
          <div className="flex items-center justify-between font-bold">
            <span>Resultado: {checkCount} de 5 afirmaciones</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/80 border">
              {chkResult.badge}
            </span>
          </div>
          <p>{chkResult.text}</p>
        </div>

        {/* Biblical Quote Card */}
        <div className="bg-slate-900 text-stone-100 rounded-xl p-5 border-l-4 border-amber-500">
          <blockquote className="font-serif italic text-sm sm:text-base text-white">
            "¿Estás utilizando aquello que tienes, o aquello que tienes ha comenzado a utilizarte a ti?"
          </blockquote>
          <span className="text-xs text-amber-400 font-semibold mt-1 block">
            1 Corintios 6:12 — «Todas las cosas me son lícitas, mas no todas convienen; todas las cosas me son lícitas, mas yo no me dejaré dominar de ninguna.»
          </span>
        </div>
      </div>

      {/* Responsibility note */}
      <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-slate-600 leading-relaxed">
        <strong>Acompañamiento responsable:</strong> Esta herramienta apoya tu camino personal de dominio propio y fe, pero no reemplaza la ayuda pastoral, la consejería especializada o el tratamiento médico. Si estás experimentando pensamientos de hacerte daño o peligro inminente, comunícate de inmediato con la línea de emergencia de tu localidad.
      </div>
    </div>
  );
};
