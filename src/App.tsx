import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useStore } from './store/useStore';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';

// Pages temporaires (pour éviter les erreurs de build)
const Shop = () => <div className="p-10 text-[#1B4332] font-serif italic text-3xl">Boutique • À venir</div>;
const Attendance = () => <div className="p-10 text-[#1B4332] font-serif italic text-3xl">Présences</div>;
const Planning = () => <div className="p-10 text-[#1B4332] font-serif italic text-3xl">Planning</div>;
const Sections = () => <div className="p-10 text-[#1B4332] font-serif italic text-3xl">Sections</div>;
const Fees = () => <div className="p-10 text-[#1B4332] font-serif italic text-3xl">Cotisations</div>;
const OrgChart = () => <div className="p-10 text-[#1B4332] font-serif italic text-3xl">Organigramme</div>;
const Admin = () => <div className="p-10 text-[#1B4332] font-serif italic text-3xl">Secrétariat</div>;
const Finances = () => <div className="p-10 text-[#1B4332] font-serif italic text-3xl">Finances</div>;

function App() {
  const { fetchData } = useStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50 font-sans">
        <Sidebar />
        
        <main className="flex-1 ml-64 min-h-screen relative overflow-hidden">
          {/* Image de fond "Nature" discrète */}
          <div 
            className="absolute inset-0 z-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?auto=format&fit=crop&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          
          <div className="relative z-10 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/members" element={<Members />} />
              <Route path="/dogs" element={<Dogs />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/sections" element={<Sections />} />
              <Route path="/fees" element={<Fees />} />
              <Route path="/org-chart" element={<OrgChart />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/finances" element={<Finances />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
