import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Secretariat from './pages/Secretariat';
import Members from './pages/Members';
import Dogs from './pages/Dogs';
import Boutique from './pages/Boutique';
import Treasury from './pages/Treasury';
import Sections from './pages/Sections';
import Login from './components/Login';
import { useStore } from './store/useStore';
import { Menu } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // AJOUT DE L'ÉTAT DU LOGIN
  const [userRole, setUserRole] = useState<string | null>(null);
  const { fetchData, isLoading, darkMode } = useStore();

  useEffect(() => { fetchData(); }, [fetchData]);

  // ÉCRAN DE GARDE : Si pas de rôle (pas connecté), on affiche uniquement le Login
  if (!userRole) return <Login onLogin={(role) => setUserRole(role)} />;

  if (isLoading) return (
    <div className="h-screen flex items-center justify-center bg-[#FDFBF7] text-[#1B4332] font-black italic animate-pulse">
      ACV • Synchronisation...
    </div>
  );

  return (
    <div className={`flex min-h-screen transition-colors duration-500 ${
      darkMode ? 'bg-[#0F1A15] text-[#E2E8F0]' : 'bg-[#FDFBF7] text-[#334155]'
    }`}>
      
      {/* Menu Mobile - Vert Forêt */}
      <button 
        onClick={() => setIsSidebarOpen(true)} 
        className="lg:hidden fixed top-5 left-5 z-40 p-3 bg-[#1B4332] text-white rounded-xl shadow-lg hover:bg-[#2D6A4F] transition-colors"
      >
        <Menu size={20} />
      </button>

      <Sidebar 
        activeTab={activeTab} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        setActiveTab={(tab) => { setActiveTab(tab); setIsSidebarOpen(false); }} 
      />
      
      {/* Overlay Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Contenu Principal */}
      <main className={`flex-1 p-6 lg:p-12 lg:ml-72 transition-all`}>
        <div className="max-w-6xl mx-auto pt-12 lg:pt-0">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'membres' && <Members />}
          {activeTab === 'leschiens' && <Dogs />}
          {activeTab === 'secretariat' && <Secretariat />}
          {activeTab === 'boutique' && <Boutique />}
          {activeTab === 'finances' && <Treasury />}
          {activeTab.startsWith('section-') && <Sections sectionId={activeTab} />}
        </div>
      </main>
    </div>
  );
}

export default App;
