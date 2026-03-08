import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';
import Treasury from './pages/Treasury';
import Sections from './pages/Sections';
import Boutique from './pages/Boutique';
import Events from './pages/Events';
import Login from './components/Login';
import { useStore } from './store/useStore';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userRole, setUserRole] = useState<string | null>(null);
  const { fetchData, isLoading } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!userRole) {
    return <Login onLogin={(role) => setUserRole(role)} />;
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">Synchronisation ACV...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-72 p-12">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'membres' && <Members />}
        {activeTab === 'leschiens' && <Dogs />}
        {activeTab === 'finances' && <Treasury />}
        {activeTab === 'sections' && <Sections />}
        {activeTab === 'boutique' && <Boutique />}
        {activeTab === 'evenements' && <Events />}
      </main>
    </div>
  );
}

export default App;
