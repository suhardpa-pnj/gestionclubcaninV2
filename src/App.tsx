import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';

// On simule Shop s'il n'est pas encore créé proprement pour éviter l'erreur de build
const Shop = () => <div className="p-8"><h1 className="text-3xl font-bold text-white">Boutique</h1><p className="mt-4 text-gray-400">Page boutique en cours...</p></div>;

const Attendance = () => <div className="p-8"><h1 className="text-3xl font-bold text-white">Présences</h1><p className="mt-4 text-gray-400">Page en cours de création...</p></div>;
const Planning = () => <div className="p-8"><h1 className="text-3xl font-bold text-white">Planning</h1><p className="mt-4 text-gray-400">Page en cours de création...</p></div>;
const Sections = () => <div className="p-8"><h1 className="text-3xl font-bold text-white">Sections</h1><p className="mt-4 text-gray-400">Page en cours de création...</p></div>;
const Fees = () => <div className="p-8"><h1 className="text-3xl font-bold text-white">Cotisations</h1><p className="mt-4 text-gray-400">Page en cours de création...</p></div>;
const OrgChart = () => <div className="p-8"><h1 className="text-3xl font-bold text-white">Organigramme</h1><p className="mt-4 text-gray-400">Page en cours de création...</p></div>;
const Admin = () => <div className="p-8"><h1 className="text-3xl font-bold text-white">Secrétariat</h1><p className="mt-4 text-gray-400">Page en cours de création...</p></div>;
const Finances = () => <div className="p-8"><h1 className="text-3xl font-bold text-white">Finances</h1><p className="mt-4 text-gray-400">En attente...</p></div>;

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-950 text-gray-100 font-sans">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-screen relative overflow-hidden">
          <div 
            className="absolute inset-0 z-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?auto=format&fit=crop&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'contrast(130%) brightness(80%)'
            }}
          />
          
          <div className="relative z-10">
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
