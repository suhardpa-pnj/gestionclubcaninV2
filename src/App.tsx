import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';
import Cotisations from './pages/Cotisations'; // Anciennement Memberships
import Boutique from './pages/Boutique';
import Treasury from './pages/Treasury';
import Presences from './pages/Presences';
import Planning from './pages/Planning';
import Support from './pages/Support'; // <--- IMPORT ICI
import { useStore } from './store/useStore';

function App() {
  const { fetchData, activeTab, darkMode } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'members': return <Members />;
      case 'dogs': return <Dogs />;
      case 'cotisations': return <Cotisations />;
      case 'boutique': return <Boutique />;
      case 'finances': return <Treasury />;
      case 'presences': return <Presences />;
      case 'planning': return <Planning />;
      case 'support': return <Support />; // <--- AJOUT ICI
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-[#FDFBF7] text-[#1B4332]'}`}>
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        {renderTab()}
      </main>
    </div>
  );
}

export default App;
