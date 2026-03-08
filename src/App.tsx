import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import Sections from './pages/Sections';
import { useStore } from './store/useStore';

// On crée des placeholders simples pour les pages manquantes afin d'éviter les erreurs de build
const MembersPlaceholder = () => <div className="text-slate-400 uppercase font-black italic">Page Membres en cours...</div>;
const DogsPlaceholder = () => <div className="text-slate-400 uppercase font-black italic">Page Les Chiens en cours...</div>;
const TreasuryPlaceholder = () => <div className="text-slate-400 uppercase font-black italic">Page Trésorerie en cours...</div>;
const EventsPlaceholder = () => <div className="text-slate-400 uppercase font-black italic">Page Événements en cours...</div>;

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<string | null>(null);
  const { fetchData, isLoading } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!userRole) return <Login onLogin={(role) => setUserRole(role)} />;

  if (isLoading) return <div className="h-screen flex items-center justify-center font-black uppercase italic text-slate-400">Synchronisation ACV...</div>;

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 ml-72 p-12">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'sections' && <Sections />}
        {activeTab === 'membres' && <MembersPlaceholder />}
        {activeTab === 'leschiens' && <DogsPlaceholder />}
        {activeTab === 'finances' && <TreasuryPlaceholder />}
        {activeTab === 'evenements' && <EventsPlaceholder />}
      </main>
    </div>
  );
}

export default App;
