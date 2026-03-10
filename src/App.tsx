import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';

// Pages temporaires respectant ton thème Nature
const Placeholder = ({ title }: { title: string }) => (
  <div className="p-10">
    <h2 className="text-5xl font-serif italic text-[#1B4332]">{title}</h2>
    <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
      Amicale Canine Vernoise • Section en cours de préparation
    </p>
  </div>
);

function App() {
  const { fetchData } = useStore();

  // IMPORTANT : C'est cette ligne qui fait apparaître tes 55 membres et tes chiens
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 font-sans">
        <Sidebar />
        
        <main className="flex-1 ml-64 min-h-screen relative overflow-hidden">
          {/* Ton image de fond Nature d'origine */}
          <div 
            className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?auto=format&fit=crop&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="relative z-10 p-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route path="/dogs" element={<Dogs />} />
              <Route path="/shop" element={<Placeholder title="La Boutique" />} />
              <Route path="/attendance" element={<Placeholder title="Présences" />} />
              <Route path="/planning" element={<Placeholder title="Planning" />} />
              <Route path="/sections" element={<Placeholder title="Sections" />} />
              <Route path="/fees" element={<Placeholder title="Cotisations" />} />
              <Route path="/org-chart" element={<Placeholder title="Organigramme" />} />
              <Route path="/admin" element={<Placeholder title="Secrétariat" />} />
              <Route path="/finances" element={<Placeholder title="Finances" />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
