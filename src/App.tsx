import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Sections from './pages/Sections';
import SectionDetail from './pages/SectionDetail';
import Login from './components/Login';
import { useStore } from './store/useStore';

// Placeholders pour les pages en cours
const MembersPlaceholder = () => <div className="p-12 bg-white rounded-[40px] border border-slate-100 text-center text-slate-400 uppercase font-black italic">Page Membres en cours de design...</div>;
const DogsPlaceholder = () => <div className="p-12 bg-white rounded-[40px] border border-slate-100 text-center text-slate-400 uppercase font-black italic">Page Les Chiens en cours de design...</div>;
const TreasuryPlaceholder = () => <div className="p-12 bg-white rounded-[40px] border border-slate-100 text-center text-slate-400 uppercase font-black italic">Page Trésorerie en cours de design...</div>;
const EventsPlaceholder = () => <div className="p-12 bg-white rounded-[40px] border border-slate-100 text-center text-slate-400 uppercase font-black italic">Page Événements en cours de design...</div>;

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { fetchData, isLoading } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!userRole) return <Login onLogin={(role) => setUserRole(role)} />;
  if (isLoading) return <div className="h-screen flex items-center justify-center font-black uppercase italic text-slate-400">Synchronisation Amicale Canine...</div>;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedSection(null); // On réinitialise la section quand on change d'onglet
        }} 
      />
      
      <main className="flex-1 ml-72 p-12">
        {activeTab === 'dashboard' && <Dashboard />}
        
        {activeTab === 'sections' && (
          selectedSection ? (
            <SectionDetail sectionId={selectedSection} onBack={() => setSelectedSection(null)} />
          ) : (
            <Sections onSelectSection={setSelectedSection} />
          )
        )}

        {activeTab === 'membres' && <MembersPlaceholder />}
        {activeTab === 'leschiens' && <DogsPlaceholder />}
        {activeTab === 'finances' && <TreasuryPlaceholder />}
        {activeTab === 'evenements' && <EventsPlaceholder />}
      </main>
    </div>
  );
}

export default App;
