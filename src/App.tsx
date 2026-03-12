import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import MemberDetail from './pages/MemberDetail'; // Ajout de l'import
import Dogs from './pages/Dogs';
import DogDetail from './pages/DogDetail';
import Boutique from './pages/Boutique';
import Secretariat from './pages/Secretariat';
import Organigramme from './pages/Organigramme';
import Cotisations from './pages/Cotisations'; 
import Treasury from './pages/Treasury';
import Presences from './pages/Presences';
import Planning from './pages/Planning';
import Login from './components/Login';
import Support from './pages/Support';
import { useStore } from './store/useStore';
import { Menu } from 'lucide-react';

const SectionPlaceholder = ({ title }: { title: string }) => (
  <div className="p-10 animate-in fade-in duration-700">
    <h2 className="text-5xl font-serif italic text-[#1B4332]">{title}</h2>
    <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
      Section en cours de construction • Amicale Canine Vernoise
    </p>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedDogId, setSelectedDogId] = useState<string | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null); // État pour le membre
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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedDogId(null);
    setSelectedMemberId(null); // Reset membre au changement d'onglet
    setIsSidebarOpen(false);
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

      {/* Menu Mobile */}
      <button 
        onClick={() => setIsSidebarOpen(true)} 
        className="lg:hidden fixed top-5 left-5 z-40 p-3 bg-[#1B4332] text-white rounded-xl shadow-lg"
      >
        <Menu size={20} />
      </button>
      
      <Sidebar 
        activeTab={activeTab} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        setActiveTab={handleTabChange} 
      />

      <main className="flex-1 p-6 lg:p-12 lg:ml-72 relative z-10">
        <div className="max-w-6xl mx-auto pt-12 lg:pt-0">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'organigramme' && <Organigramme />}
          
          {/* Membres : Liste ou Détail */}
          {activeTab === 'membres' && (
            selectedMemberId ? (
              <MemberDetail memberId={selectedMemberId} onBack={() => setSelectedMemberId(null)} />
            ) : (
              <Members /> 
            )
          )}
          
          {/* Chiens : Liste ou Détail */}
          {activeTab === 'leschiens' && (
            selectedDogId ? (
              <DogDetail dogId={selectedDogId} onBack={() => setSelectedDogId(null)} />
            ) : (
              <Dogs 
                onSelectDog={(id) => setSelectedDogId(id)} 
                onSelectMember={(id) => {
                  setSelectedMemberId(id);
                  setActiveTab('membres');
                }}
              />
            )
          )}

          {activeTab === 'cotisations' && <Cotisations />}
          {activeTab === 'boutique' && <Boutique />}
          {activeTab === 'finances' && <Treasury />}
          {activeTab === 'presences' && <Presences />}
          {activeTab === 'planning' && <Planning />}
          {activeTab === 'secretariat' && <Secretariat />}
          {activeTab === 'support' && <Support />}

          {activeTab.startsWith('section-') && <SectionPlaceholder title="Activités Club" />}
          {activeTab === 'logs' && <SectionPlaceholder title="Historique" />}
          {activeTab === 'parametres' && <SectionPlaceholder title="Paramètres" />}
        </div>
      </main>
    </div>
  );
}

export default App;
