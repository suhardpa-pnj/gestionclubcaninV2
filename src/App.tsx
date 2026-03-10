import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';
import Boutique from './pages/Boutique';
import Secretariat from './pages/Secretariat';
import Organigramme from './pages/Organigramme';
import Cotisations from './pages/Cotisations';
import Treasury from './pages/Treasury'; // Pour ton bouton Finances
import Presences from './pages/Presences';
import Planning from './pages/Planning';import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';
import Boutique from './pages/Boutique';
import Secretariat from './pages/Secretariat';
import Organigramme from './pages/Organigramme';
import Cotisations from './pages/Cotisations';
import Treasury from './pages/Treasury'; // Pour ton bouton Finances
import Presences from './pages/Presences';
import Planning from './pages/Planning';
import Login from './components/Login';
import { useStore } from './store/useStore';
import { Menu } from 'lucide-react';

// Petits composants temporaires pour les sections qui n'ont pas encore de fichiers
const SectionPlaceholder = ({ title }: { title: string }) => (
  <div className="p-10 animate-in fade-in duration-700">
    <h2 className="text-5xl font-serif italic text-[#1B4332]">{title}</h2>
    <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">Contenu en cours de rédaction...</p>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('acv_role'));
  const { fetchData, isLoading, darkMode, dogs } = useStore();
  const [bgDog, setBgDog] = useState<string | null>(null);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const dogsWithPhotos = dogs.filter(d => d.photo && d.photo !== '');
    if (dogsWithPhotos.length > 0) {
      const dailyIdx = new Date().getDate() % dogsWithPhotos.length;
      setBgDog(dogsWithPhotos[dailyIdx].photo);
    }
  }, [dogs]);

  const handleLogin = (role: string) => {
    localStorage.setItem('acv_role', role);
    setUserRole(role);
  };

  if (!userRole) return <Login onLogin={handleLogin} />;
  
  return (
    <div className={`flex min-h-screen relative transition-colors duration-500 ${
      darkMode ? 'bg-[#121614] text-slate-200' : 'bg-[#F4F1EA] text-[#334155]'
    }`}>
      {!darkMode && bgDog && (
        <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
          <img src={bgDog} className="w-full h-full object-cover grayscale" alt="" />
        </div>
      )}

      <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden fixed top-5 left-5 z-40 p-3 bg-[#1B4332] text-white rounded-xl shadow-lg">
        <Menu size={20} />
      </button>
      
      <Sidebar 
        activeTab={activeTab} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        setActiveTab={(t) => { setActiveTab(t); setIsSidebarOpen(false); }} 
      />

      <main className="flex-1 p-6 lg:p-12 lg:ml-72 relative z-10">
        <div className="max-w-6xl mx-auto pt-12 lg:pt-0">
          {/* PAGES PRINCIPALES */}
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'organigramme' && <Organigramme />}
          {activeTab === 'membres' && <Members />}
          {activeTab === 'leschiens' && <Dogs />}
          {activeTab === 'cotisations' && <Cotisations />}
          {activeTab === 'boutique' && <Boutique />}
          {activeTab === 'finances' && <Treasury />}
          {activeTab === 'presences' && <Presences />}
          {activeTab === 'planning' && <Planning />}
          {activeTab === 'secretariat' && <Secretariat />}

          {/* SECTIONS D'ACTIVITÉS */}
          {activeTab === 'section-chiots' && <SectionPlaceholder title="École du Chiot" />}
          {activeTab === 'section-ring' && <SectionPlaceholder title="Ring" />}
          {activeTab === 'section-agility' && <SectionPlaceholder title="Agility" />}
          {activeTab === 'section-obeissance' && <SectionPlaceholder title="Obéissance" />}
          {activeTab === 'section-education' && <SectionPlaceholder title="Éducation" />}

          {/* SYSTÈME */}
          {activeTab === 'logs' && <SectionPlaceholder title="Historique (Logs)" />}
          {activeTab === 'parametres' && <SectionPlaceholder title="Paramètres Système" />}
        </div>
      </main>
    </div>
  );
}

export default App;
import Login from './components/Login';
import { useStore } from './store/useStore';
import { Menu } from 'lucide-react';

// Petits composants temporaires pour les sections qui n'ont pas encore de fichiers
const SectionPlaceholder = ({ title }: { title: string }) => (
  <div className="p-10 animate-in fade-in duration-700">
    <h2 className="text-5xl font-serif italic text-[#1B4332]">{title}</h2>
    <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">Contenu en cours de rédaction...</p>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('acv_role'));
  const { fetchData, isLoading, darkMode, dogs } = useStore();
  const [bgDog, setBgDog] = useState<string | null>(null);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const dogsWithPhotos = dogs.filter(d => d.photo && d.photo !== '');
    if (dogsWithPhotos.length > 0) {
      const dailyIdx = new Date().getDate() % dogsWithPhotos.length;
      setBgDog(dogsWithPhotos[dailyIdx].photo);
    }
  }, [dogs]);

  const handleLogin = (role: string) => {
    localStorage.setItem('acv_role', role);
    setUserRole(role);
  };

  if (!userRole) return <Login onLogin={handleLogin} />;
  
  return (
    <div className={`flex min-h-screen relative transition-colors duration-500 ${
      darkMode ? 'bg-[#121614] text-slate-200' : 'bg-[#F4F1EA] text-[#334155]'
    }`}>
      {!darkMode && bgDog && (
        <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
          <img src={bgDog} className="w-full h-full object-cover grayscale" alt="" />
        </div>
      )}

      <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden fixed top-5 left-5 z-40 p-3 bg-[#1B4332] text-white rounded-xl shadow-lg">
        <Menu size={20} />
      </button>
      
      <Sidebar 
        activeTab={activeTab} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        setActiveTab={(t) => { setActiveTab(t); setIsSidebarOpen(false); }} 
      />

      <main className="flex-1 p-6 lg:p-12 lg:ml-72 relative z-10">
        <div className="max-w-6xl mx-auto pt-12 lg:pt-0">
          {/* PAGES PRINCIPALES */}
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'organigramme' && <Organigramme />}
          {activeTab === 'membres' && <Members />}
          {activeTab === 'leschiens' && <Dogs />}
          {activeTab === 'cotisations' && <Cotisations />}
          {activeTab === 'boutique' && <Boutique />}
          {activeTab === 'finances' && <Treasury />}
          {activeTab === 'presences' && <Presences />}
          {activeTab === 'planning' && <Planning />}
          {activeTab === 'secretariat' && <Secretariat />}

          {/* SECTIONS D'ACTIVITÉS */}
          {activeTab === 'section-chiots' && <SectionPlaceholder title="École du Chiot" />}
          {activeTab === 'section-ring' && <SectionPlaceholder title="Ring" />}
          {activeTab === 'section-agility' && <SectionPlaceholder title="Agility" />}
          {activeTab === 'section-obeissance' && <SectionPlaceholder title="Obéissance" />}
          {activeTab === 'section-education' && <SectionPlaceholder title="Éducation" />}

          {/* SYSTÈME */}
          {activeTab === 'logs' && <SectionPlaceholder title="Historique (Logs)" />}
          {activeTab === 'parametres' && <SectionPlaceholder title="Paramètres Système" />}
        </div>
      </main>
    </div>
  );
}

export default App;
