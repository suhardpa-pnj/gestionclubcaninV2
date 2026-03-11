import React, { useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';
import Organigramme from './pages/Organigramme';
import Cotisations from './pages/Cotisations';
import Boutique from './pages/Boutique';
import Treasury from './pages/Treasury';
import Presences from './pages/Presences';
import Planning from './pages/Planning';
import Secretariat from './pages/Secretariat';
import Support from './pages/Support';
import { useStore } from './store/useStore';

function App() {
  const { fetchData, activeTab, darkMode } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderTab = () => {
    switch (activeTab) {
      // Pilotage
      case 'dashboard': return <Dashboard />;
      case 'members': return <Members />;
      case 'dogs': return <Dogs />;
      case 'cotisations': return <Cotisations />;
      // Terrain
      case 'presences': return <Presences />;
      case 'planning': return <Planning />;
      // Gestion
      case 'boutique': return <Boutique />;
      case 'finances': return <Treasury />;
      case 'secretariat': return <Secretariat />;
      case 'organigramme': return <Organigramme />;
      // Sections (On peut créer des pages spécifiques plus tard)
      case 'section-ring': return <div className="p-10 font-serif italic text-slate-400 text-3xl text-center mt-20">Section Ring en attente de contenu...</div>;
      case 'section-agility': return <div className="p-10 font-serif italic text-slate-400 text-3xl text-center mt-20">Section Agility en attente de contenu...</div>;
      // Zone Technique
      case 'support': return <Support />;
      case 'logs': return <div className="p-10 font-serif italic text-slate-400 text-3xl text-center mt-20 underline">Journal des modifications système</div>;
      case 'settings': return <div className="p-10 font-serif italic text-slate-400 text-3xl text-center mt-20">Paramètres de l'application</div>;
      case 'admin': return <div className="p-10 font-serif italic text-slate-400 text-3xl text-center mt-20">Console Administrateur (Sécurisée)</div>;
      default: return <Dashboard />;
    }
  };

  return (
    <div className={`flex min-h-screen ${darkMode ? 'bg-slate-950 text-white' : 'bg-[#FDFBF7] text-[#1B4332]'}`}>
      <Sidebar />
      <main className="flex-1 p-4 md:p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}

export default App;
