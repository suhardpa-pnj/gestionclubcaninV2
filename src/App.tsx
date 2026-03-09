import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';
import Boutique from './pages/Boutique';
import Secretariat from './pages/Secretariat';
import Login from './components/Login';
import { useStore } from './store/useStore';
import { Menu } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { fetchData, isLoading, darkMode, dogs } = useStore();
  const [bgDog, setBgDog] = useState<string | null>(null);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    if (dogs.length > 0) {
      const dailyIdx = new Date().getDate() % dogs.length;
      setBgDog(dogs[dailyIdx]?.photo || null);
    }
  }, [dogs]);

  if (!userRole) return <Login onLogin={(r) => setUserRole(r)} />;
  if (isLoading) return <div className="h-screen flex items-center justify-center bg-[#F4F1EA] text-[#1B4332] font-serif italic">ACV • Synchronisation...</div>;

  return (
    <div className={`flex min-h-screen relative transition-colors duration-500 ${
      darkMode ? 'bg-[#121614] text-slate-100' : 'bg-[#F4F1EA] text-[#334155]'
    }`}>
      
      {/* FOND ALÉATOIRE DISCRET EN MODE JOUR */}
      {!darkMode && bgDog && (
        <div className="fixed inset-0 pointer-events-none opacity-5 transition-opacity duration-1000">
          <img src={bgDog} className="w-full h-full object-cover grayscale" alt="" />
        </div>
      )}

      <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden fixed top-5 left-5 z-40 p-3 bg-[#1B4332] text-white rounded-xl shadow-lg"><Menu size={20} /></button>
      
      <Sidebar activeTab={activeTab} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} setActiveTab={(t) => { setActiveTab(t); setIsSidebarOpen(false); }} />

      <main className="flex-1 p-6 lg:p-12 lg:ml-72 relative z-10">
        <div className="max-w-6xl mx-auto pt-12 lg:pt-0">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'membres' && <Members />}
          {activeTab === 'leschiens' && <Dogs />}
          {activeTab === 'boutique' && <Boutique />}
          {activeTab === 'secretariat' && <Secretariat />}
        </div>
      </main>
    </div>
  );
}
export default App;
