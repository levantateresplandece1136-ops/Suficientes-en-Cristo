import React, { useState, useEffect } from 'react';
import {
  loadAppState,
  saveAppState,
  AppState
} from './utils/storage';
import { ActiveTab, ImpulsoEntry, TruthCard, DailyJournalEntry, SafetyPlan } from './types';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { ImpulseLogger } from './components/ImpulseLogger';
import { RecentEntries } from './components/RecentEntries';
import { ProgressCharts } from './components/ProgressCharts';
import { ReflectiveJournals } from './components/ReflectiveJournals';
import { TruthsCatalog } from './components/TruthsCatalog';
import { SafetyPlanView } from './components/SafetyPlanView';
import { EmergencyPauseModal } from './components/EmergencyPauseModal';
import { DataManagementModal } from './components/DataManagementModal';

export default function App() {
  const [appState, setAppState] = useState<AppState>(() => loadAppState());
  const [activeTab, setActiveTab] = useState<ActiveTab>('hoy');
  const [isSOSOpen, setIsSOSOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Sync state to local storage whenever changed
  useEffect(() => {
    saveAppState(appState);
  }, [appState]);

  // Handlers
  const handleAddImpulse = (entry: Omit<ImpulsoEntry, 'id' | 't'>) => {
    const newEntry: ImpulsoEntry = {
      ...entry,
      id: `imp-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      t: Date.now()
    };
    setAppState(prev => ({
      ...prev,
      entries: [newEntry, ...prev.entries]
    }));
  };

  const handleDeleteImpulse = (id: string) => {
    setAppState(prev => ({
      ...prev,
      entries: prev.entries.filter(e => e.id !== id)
    }));
  };

  const handleUpdateFreedomDate = (newTimestamp: number) => {
    setAppState(prev => ({
      ...prev,
      freedomStartDate: newTimestamp
    }));
  };

  const handleSaveReflection = (key: string, value: string) => {
    setAppState(prev => ({
      ...prev,
      reflections: {
        ...prev.reflections,
        [key]: value
      }
    }));
  };

  const handleAddDailyJournal = (entry: Omit<DailyJournalEntry, 'id' | 't'>) => {
    const newJournal: DailyJournalEntry = {
      ...entry,
      id: `jnl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      t: Date.now()
    };
    setAppState(prev => ({
      ...prev,
      dailyJournals: [newJournal, ...prev.dailyJournals]
    }));
  };

  const handleDeleteDailyJournal = (id: string) => {
    setAppState(prev => ({
      ...prev,
      dailyJournals: prev.dailyJournals.filter(j => j.id !== id)
    }));
  };

  const handleAddCustomTruth = (card: Omit<TruthCard, 'id' | 'isCustom'>) => {
    const newCard: TruthCard = {
      ...card,
      id: `custom-tr-${Date.now()}`,
      isCustom: true
    };
    setAppState(prev => ({
      ...prev,
      customTruths: [newCard, ...prev.customTruths]
    }));
  };

  const handleDeleteCustomTruth = (id: string) => {
    setAppState(prev => ({
      ...prev,
      customTruths: prev.customTruths.filter(c => c.id !== id)
    }));
  };

  const handleUpdatePlan = (field: keyof SafetyPlan, val: string) => {
    setAppState(prev => ({
      ...prev,
      safetyPlan: {
        ...prev.safetyPlan,
        [field]: val
      }
    }));
  };

  const handleToggleCheckup = (index: number) => {
    setAppState(prev => {
      const nextCheck = [...prev.checkup];
      nextCheck[index] = !nextCheck[index];
      return {
        ...prev,
        checkup: nextCheck
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-slate-800 flex flex-col font-sans selection:bg-amber-200">
      {/* Top Header */}
      <Header
        freedomStartDate={appState.freedomStartDate}
        onOpenSOS={() => setIsSOSOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Navigation */}
      <Navbar
        activeTab={activeTab}
        onTabChange={tab => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 sm:py-8 pb-24 md:pb-12 space-y-6">
        {activeTab === 'hoy' && (
          <div className="space-y-6">
            <ImpulseLogger
              customTruths={appState.customTruths}
              onAddEntry={handleAddImpulse}
              onOpenSOS={() => setIsSOSOpen(true)}
            />
            <RecentEntries
              entries={appState.entries}
              onDeleteEntry={handleDeleteImpulse}
            />
          </div>
        )}

        {activeTab === 'progreso' && (
          <ProgressCharts
            entries={appState.entries}
            freedomStartDate={appState.freedomStartDate}
            onUpdateFreedomDate={handleUpdateFreedomDate}
          />
        )}

        {activeTab === 'ref' && (
          <ReflectiveJournals
            reflections={appState.reflections}
            dailyJournals={appState.dailyJournals}
            onSaveReflection={handleSaveReflection}
            onAddDailyJournal={handleAddDailyJournal}
            onDeleteDailyJournal={handleDeleteDailyJournal}
          />
        )}

        {activeTab === 'ver' && (
          <TruthsCatalog
            customTruths={appState.customTruths}
            onAddCustomTruth={handleAddCustomTruth}
            onDeleteCustomTruth={handleDeleteCustomTruth}
          />
        )}

        {activeTab === 'plan' && (
          <SafetyPlanView
            safetyPlan={appState.safetyPlan}
            checkup={appState.checkup}
            onUpdatePlan={handleUpdatePlan}
            onToggleCheckup={handleToggleCheckup}
            onOpenSOS={() => setIsSOSOpen(true)}
          />
        )}
      </main>

      {/* Emergency SOS Modal */}
      <EmergencyPauseModal
        isOpen={isSOSOpen}
        safetyPlan={appState.safetyPlan}
        onClose={() => setIsSOSOpen(false)}
      />

      {/* Data Management & Settings Modal */}
      <DataManagementModal
        isOpen={isSettingsOpen}
        appState={appState}
        onUpdateState={setAppState}
        onClose={() => setIsSettingsOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-stone-200/80 bg-stone-100 py-6 text-center text-xs text-slate-500 hidden md:block">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Suficiente en Cristo · Plan personal de libertad</span>
          <span className="italic font-serif">"Todo lo puedo en Cristo que me fortalece" — Fil. 4:13</span>
        </div>
      </footer>
    </div>
  );
}
