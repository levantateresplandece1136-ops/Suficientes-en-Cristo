import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Copy,
  Check,
  Search,
  Sparkles,
  Trash2,
  Tag
} from 'lucide-react';
import { TruthCard } from '../types';
import { INITIAL_TRUTHS } from '../data/biblicalData';

interface TruthsCatalogProps {
  customTruths: TruthCard[];
  onAddCustomTruth: (card: Omit<TruthCard, 'id' | 'isCustom'>) => void;
  onDeleteCustomTruth: (id: string) => void;
}

export const TruthsCatalog: React.FC<TruthsCatalogProps> = ({
  customTruths,
  onAddCustomTruth,
  onDeleteCustomTruth
}) => {
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // New card form
  const [newLie, setNewLie] = useState<string>('');
  const [newTruth, setNewTruth] = useState<string>('');
  const [newRef, setNewRef] = useState<string>('');
  const [newCategory, setNewCategory] = useState<string>('Mi Proceso');

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const allCards: TruthCard[] = [
    ...customTruths.map(c => ({ ...c, isCustom: true })),
    ...INITIAL_TRUTHS
  ];

  // Daily rotating truth
  const today = new Date();
  const dayIndex = (today.getFullYear() * 366 + (today.getMonth() + 1) * 31 + today.getDate()) % INITIAL_TRUTHS.length;
  const dayCard = INITIAL_TRUTHS[dayIndex];

  // Unique categories
  const categories = ['all', ...Array.from(new Set(allCards.map(c => c.category || 'General')))];

  const filteredCards = allCards.filter(card => {
    if (selectedCategory !== 'all' && card.category !== selectedCategory) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchLie = card.lie.toLowerCase().includes(q);
      const matchTruth = card.truth.toLowerCase().includes(q);
      const matchRef = card.ref.toLowerCase().includes(q);
      return matchLie || matchTruth || matchRef;
    }
    return true;
  });

  const handleCopy = (card: TruthCard) => {
    const text = `"${card.truth}" — ${card.ref}`;
    navigator.clipboard.writeText(text);
    setCopiedId(card.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLie.trim() || !newTruth.trim()) {
      alert('Por favor ingresa tanto la mentira como la verdad de Dios.');
      return;
    }

    onAddCustomTruth({
      lie: newLie.trim(),
      truth: newTruth.trim(),
      ref: newRef.trim() || 'Escrituras',
      category: newCategory.trim() || 'Mi Proceso'
    });

    setNewLie('');
    setNewTruth('');
    setNewRef('');
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Featured Truth of the Day */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-stone-100 rounded-2xl p-6 sm:p-7 shadow-sm border border-slate-700 relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Verdad del Día para Meditar
          </span>
          <span className="text-xs text-slate-400 font-medium">{dayCard.category}</span>
        </div>

        <p className="text-sm text-rose-300/90 line-through mb-2 font-medium">
          {dayCard.lie}
        </p>

        <blockquote className="text-lg sm:text-xl font-serif text-white italic leading-relaxed mb-4">
          "{dayCard.truth}"
        </blockquote>

        <div className="flex items-center justify-between pt-2 border-t border-slate-700/80">
          <span className="text-xs font-bold px-3 py-1 rounded-md bg-amber-600 text-white">
            {dayCard.ref}
          </span>
          <button
            onClick={() => handleCopy(dayCard)}
            type="button"
            className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-white transition-colors cursor-pointer"
          >
            {copiedId === dayCard.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar versículo</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Action Bar & Search */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por versículo, mentira o verdad..."
              className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-xl border border-stone-300 bg-stone-50/50 focus:bg-white focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
            />
          </div>

          {/* Add custom button */}
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{showAddForm ? 'Cancelar' : 'Agregar mi propia tarjeta'}</span>
          </button>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-amber-300 shadow-2xs font-bold'
                  : 'bg-stone-100 text-slate-600 hover:bg-stone-200'
              }`}
            >
              {cat === 'all' ? 'Todas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Add Custom Card Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddSubmit}
          className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-amber-500/40 shadow-sm space-y-4 animate-in fade-in"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-600" />
              Nueva Tarjeta: Mentira del Impulso → Verdad Bíblica
            </h3>
            <span className="text-xs text-amber-700 font-semibold bg-amber-50 px-2.5 py-0.5 rounded-full">
              Personalizada
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Identifica la frase que te repites cuando sientes dependencia y reemplázala con la verdad de la Palabra de Dios.
          </p>

          <div>
            <label htmlFor="new-lie-input" className="block text-xs font-bold text-slate-700 mb-1">
              La mentira que me repito (lo que el impulso me dice)
            </label>
            <input
              id="new-lie-input"
              type="text"
              value={newLie}
              onChange={e => setNewLie(e.target.value)}
              placeholder="Ej.: Ya no tengo remedio, nunca voy a ser libre..."
              className="w-full p-2.5 rounded-xl border border-stone-300 text-sm text-slate-800"
            />
          </div>

          <div>
            <label htmlFor="new-truth-input" className="block text-xs font-bold text-slate-700 mb-1">
              La verdad de Dios (lo que la Palabra dice)
            </label>
            <textarea
              id="new-truth-input"
              value={newTruth}
              onChange={e => setNewTruth(e.target.value)}
              rows={2}
              placeholder="Ej.: Fiel es el que comenzó en mí la buena obra, Él la completará..."
              className="w-full p-2.5 rounded-xl border border-stone-300 text-sm text-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="new-ref-input" className="block text-xs font-bold text-slate-700 mb-1">
                Pasaje o cita bíblica
              </label>
              <input
                id="new-ref-input"
                type="text"
                value={newRef}
                onChange={e => setNewRef(e.target.value)}
                placeholder="Ej.: Filipenses 1:6"
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm text-slate-800"
              />
            </div>
            <div>
              <label htmlFor="new-category-input" className="block text-xs font-bold text-slate-700 mb-1">
                Categoría
              </label>
              <input
                id="new-category-input"
                type="text"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder="Ej.: Identidad, Paz, Dominio Propio..."
                className="w-full p-2.5 rounded-xl border border-stone-300 text-sm text-slate-800"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-stone-100 cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold shadow-xs cursor-pointer"
            >
              Guardar Tarjeta
            </button>
          </div>
        </form>
      )}

      {/* Cards Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map(card => {
          const isCopied = copiedId === card.id;

          return (
            <div
              key={card.id}
              className={`bg-white rounded-2xl p-5 border shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-3 relative ${
                card.isCustom
                  ? 'border-amber-300/80 bg-amber-50/20'
                  : 'border-stone-200/90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="flex items-center gap-1 font-medium">
                    <Tag className="w-3 h-3 text-slate-400" />
                    {card.category || 'Verdad Bíblica'}
                  </span>
                  {card.isCustom && (
                    <button
                      onClick={() => {
                        if (confirm('¿Eliminar esta tarjeta personalizada?')) {
                          onDeleteCustomTruth(card.id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                      title="Eliminar tarjeta"
                      aria-label="Eliminar tarjeta personalizada"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Lie */}
                <p className="text-xs text-rose-600/90 line-through font-medium mb-1.5 leading-relaxed">
                  {card.lie}
                </p>

                {/* Biblical Truth */}
                <h4 className="text-sm sm:text-base font-serif font-semibold text-slate-900 leading-relaxed">
                  "{card.truth}"
                </h4>
              </div>

              {/* Reference & Copy */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
                <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-amber-900">
                  {card.ref}
                </span>

                <button
                  onClick={() => handleCopy(card)}
                  type="button"
                  className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-stone-100 transition-colors cursor-pointer"
                  title="Copiar versículo"
                  aria-label="Copiar versículo al portapapeles"
                >
                  {isCopied ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
