import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Sections from './pages/Sections';
import SectionDetail from './pages/SectionDetail';
import Members from './pages/Members';
import Dogs from './pages/Dogs';
import Login from './components/Login';
import { useStore } from './store/useStore';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { fetchData, isLoading } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!userRole) return <Login onLogin={(role) => setUserRole(role)} />;
  
  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-slate-950 text-emerald-500 font-black uppercase italic animate-pulse">
      Synchronisation ACV...
    </div>
  );

  return (
    <div className="flex bg-slate-950 min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => { setActiveTab(tab); setSelectedSection(null); }} />
      
      <main className="flex-1 ml-72 p-12">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'membres' && <Members />}
        {activeTab === 'leschiens' && <Dogs />}
        
        {activeTab === 'sections' && (
          selectedSection ? (
            <SectionDetail sectionId={selectedSection} onBack={() => setSelectedSection(null)} />
          ) : (
            <Sections onSelectSection={setSelectedSection} />
          )
        )}
        
        {activeTab === 'finances' && <div className="text-slate-500 font-black uppercase italic">Module Trésorerie en cours...</div>}
        {activeTab === 'evenements' && <div className="text-slate-500 font-black uppercase italic">Module Événements en cours...</div>}
      </main>
    </div>
  );
}

export default App;
