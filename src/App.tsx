import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Sections from './pages/Sections';
import SectionDetail from './pages/SectionDetail';
import Members from './pages/Members';
import Dogs from './pages/Dogs';
import Treasury from './pages/Treasury'; // Import réel
import Login from './components/Login';
import { useStore } from './store/useStore';

const EventsPlaceholder = () => <div className="p-12 text-slate-500 uppercase font-black italic">Page Événements en cours...</div>;

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { fetchData, isLoading, darkMode } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!userRole) return <Login onLogin={(role) => setUserRole(role)} />;
  if (isLoading) return (
    <div className={`h-screen flex items-center justify-center font-black uppercase italic ${darkMode ? 'bg-slate-950 text-emerald-500' : 'bg-slate-50 text-slate-400'}`}>
      Synchronisation ACV...
    </div>
  );

  return (
    <div className={`flex min-h-screen transition-colors ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedSection(null);
        }} 
      />
      
      <main className="flex-1 ml-72 p-12">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'membres' && <Members />}
        {activeTab === 'leschiens' && <Dogs />}
        {activeTab === 'finances' && <Treasury />}
        {activeTab === 'evenements' && <EventsPlaceholder />}
        
        {activeTab === 'sections' && (
          selectedSection ? (
            <SectionDetail sectionId={selectedSection} onBack={() => setSelectedSection(null)} />
          ) : (
            <Sections onSelectSection={setSelectedSection} />
          )
        )}
      </main>
    </div>
  );
}

export default App;
