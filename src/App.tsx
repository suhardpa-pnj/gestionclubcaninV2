import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Secretariat from './pages/Secretariat';
import Members from './pages/Members';
import Dogs from './pages/Dogs';
import Treasury from './pages/Treasury';
import Sections from './pages/Sections';
import SectionDetail from './pages/SectionDetail';
import Events from './pages/Events';
import Login from './components/Login';
import { useStore } from './store/useStore';
import { Menu, X } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { fetchData, isLoading, darkMode } = useStore();

  useEffect(() => { fetchData(); }, [fetchData]);

  if (!userRole) return <Login onLogin={(role) => setUserRole(role)} />;
  if (isLoading) return <div className={`h-screen flex items-center justify-center font-black uppercase italic ${darkMode ? 'bg-slate-950 text-emerald-500' : 'bg-slate-50 text-slate-400'}`}>Synchronisation ACV...</div>;

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Bouton Menu Mobile (visible uniquement sur smartphone) */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className={`lg:hidden fixed top-6 left-6 z-40 p-3 rounded-2xl shadow-xl ${darkMode ? 'bg-slate-900 text-emerald-500' : 'bg-white text-slate-800'}`}
      >
        <Menu size={24} />
      </button>

      {/* Sidebar avec gestion du tiroir mobile */}
      <Sidebar 
        activeTab={activeTab} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSelectedSection(null);
          setIsSidebarOpen(false); // FERME AUTO SUR MOBILE
        }} 
      />
      
      {/* Overlay pour fermer le menu en cliquant à côté */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Contenu Principal (La marge gauche disparait sur mobile) */}
      <main className={`flex-1 p-6 lg:p-12 transition-all duration-300 ${isSidebarOpen ? 'blur-sm lg:blur-none' : ''} lg:ml-72`}>
        <div className="max-w-7xl mx-auto pt-16 lg:pt-0">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'membres' && <Members />}
          {activeTab === 'leschiens' && <Dogs />}
          {activeTab === 'secretariat' && <Secretariat />}
          {activeTab === 'finances' && <Treasury />}
          {activeTab === 'evenements' && <Events />}
          {activeTab === 'sections' && (
            selectedSection ? <SectionDetail sectionId={selectedSection} onBack={() => setSelectedSection(null)} /> : <Sections onSelectSection={setSelectedSection} />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
