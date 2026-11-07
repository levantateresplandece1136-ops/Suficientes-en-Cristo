import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  ShieldAlert,
  Wind,
  CheckCircle2,
  Heart,
  BookOpen,
  ArrowRight,
  LifeBuoy
} from 'lucide-react';
import { SafetyPlan } from '../types';

interface EmergencyPauseModalProps {
  isOpen: boolean;
  safetyPlan: SafetyPlan;
  onClose: () => void;
}

type BreathingPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export const EmergencyPauseModal: React.FC<EmergencyPauseModalProps> = ({
  isOpen,
  safetyPlan,
  onClose
}) => {
  const [phase, setPhase] = useState<BreathingPhase>('inhale');
  const [countdown, setCountdown] = useState<number>(4);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Box Breathing cycle: Inhale 4s -> Hold 4s -> Exhale 4s -> Hold 4s
  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev > 1) {
          return prev - 1;
        } else {
          // Switch phase
          setPhase(current => {
            switch (current) {
              case 'inhale':
                return 'hold1';
              case 'hold1':
                return 'exhale';
              case 'exhale':
                return 'hold2';
              case 'hold2':
                return 'inhale';
            }
          });
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  const phaseDetails = {
    inhale: { label: 'Inhala profundamente por la nariz...', color: 'text-amber-400', scale: 'scale-125' },
    hold1: { label: 'Sostén el aire con calma...', color: 'text-emerald-400', scale: 'scale-125' },
    exhale: { label: 'Exhala despacio por la boca...', color: 'text-blue-400', scale: 'scale-90' },
    hold2: { label: 'Descansa en quietud...', color: 'text-purple-400', scale: 'scale-90' }
  }[phase];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-modal-title"
      className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md overflow-y-auto p-4 sm:p-6 flex flex-col justify-between text-white animate-in fade-in"
    >
      {/* Top Bar */}
      <div className="max-w-xl mx-auto w-full flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm sm:text-base">
          <ShieldAlert className="w-5 h-5 text-amber-500 animate-pulse" />
          <span id="sos-modal-title">Pausa de Emergencia · Haz un Alto</span>
        </div>
        <button
          onClick={onClose}
          type="button"
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Cerrar pausa de emergencia"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-xl mx-auto w-full py-6 space-y-6 text-center">
        {/* Core Reminder */}
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
            El impulso no es una orden.
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Es una ola química y emocional de pocos minutos. No tienes que obedecerla. Respira y recuerda la verdad.
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="flex flex-col items-center justify-center py-4">
          <div
            className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full border-4 border-amber-500/30 bg-gradient-to-br from-amber-600/20 to-slate-800 flex flex-col items-center justify-center shadow-lg transition-transform duration-1000 ${phaseDetails.scale}`}
          >
            <Wind className="w-8 h-8 text-amber-400 mb-1" />
            <span className="text-3xl sm:text-4xl font-extrabold font-serif text-white">
              {countdown}s
            </span>
          </div>
          <p className={`mt-4 text-base sm:text-lg font-semibold transition-colors duration-300 ${phaseDetails.color}`}>
            {phaseDetails.label}
          </p>
        </div>

        {/* Anchor Scripture */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-700/80 text-left space-y-2">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Palabra de Paz para este instante</span>
          </div>
          <p className="font-serif italic text-base sm:text-lg text-white leading-relaxed">
            "{safetyPlan.pasaje || 'Filipenses 4:6-7: Por nada estéis afanosos... la paz de Dios que sobrepasa todo entendimiento guardará vuestros corazones en Cristo Jesús.'}"
          </p>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {/* Quick Call */}
          {safetyPlan.tel && (
            <a
              href={`tel:${safetyPlan.tel.replace(/\s+/g, '')}`}
              className="p-4 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm flex items-center gap-3 transition-colors shadow-sm"
            >
              <Phone className="w-5 h-5 flex-shrink-0" />
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-amber-200">Llamar ahora a:</span>
                <span className="text-sm truncate block">{safetyPlan.quien || 'Persona de apoyo'}</span>
              </div>
            </a>
          )}

          {/* Emergency Line */}
          {safetyPlan.emer && (
            <a
              href={`tel:${safetyPlan.emer.replace(/\s+/g, '')}`}
              className="p-4 rounded-xl bg-rose-700 hover:bg-rose-600 text-white font-bold text-sm flex items-center gap-3 transition-colors shadow-sm"
            >
              <LifeBuoy className="w-5 h-5 flex-shrink-0" />
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-rose-200">Línea de Crisis:</span>
                <span className="text-sm truncate block">{safetyPlan.emer}</span>
              </div>
            </a>
          )}
        </div>

        {/* Alternative Action */}
        {safetyPlan.accion && (
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs sm:text-sm text-slate-200">
            <strong className="text-amber-400 block mb-1">Mi acción alternativa inmediata:</strong>
            {safetyPlan.accion}
          </div>
        )}
      </div>

      {/* Bottom Dismiss */}
      <div className="max-w-xl mx-auto w-full pt-4 border-t border-slate-800 flex justify-center">
        <button
          onClick={onClose}
          type="button"
          className="w-full sm:w-auto px-8 py-3 rounded-xl bg-stone-100 hover:bg-white text-slate-900 font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer"
        >
          Ya me siento más tranquilo / Volver a la app
        </button>
      </div>
    </div>
  );
};
