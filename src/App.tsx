import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';

// Composants temporaires pour les pages en construction
const Shop = () => <div className="p-8 text-white"><h1 className="text-4xl font-black">Boutique</h1><p className="mt-4 text-gray-400">Section en cours de préparation...</p></div>;
const Attendance = () => <div className="p-8 text-white"><h1 className="text-4xl font-black">Présences</h1><p className="mt-4 text-gray-400">Section en cours de préparation...</p></div>;
const Planning = () => <div className="p-8 text-white"><h1 className="text-4xl font-black">Planning</h1><p className="mt-4 text-gray-400">Section en cours de préparation...</p></div>;
const Sections = () => <div className="p-8 text-white"><h1 className="text-4xl font-black">Sections</h1><p className="mt-4 text-gray-400">Section en cours de préparation...</p></div>;
const Fees = () => <div className="p-8 text-white"><h1 className="text-4xl font-black">Cotisations</h1><p className="mt-4 text-gray-400">Section en cours de préparation...</p></div>;
const OrgChart = () => <div className="p-8 text-white"><h1 className="text-4xl font-black">Organigramme</h1><p className="mt-4 text-gray-400">Section en cours de préparation...</p></div>;
const Admin = () => <div className="p-8 text-white"><h1 className="text-4xl font-black">Secrétariat</h1><p className="mt-4 text-gray-400">Section en cours de préparation...</p></div>;
const Finances = () => <div className="p-8 text-white"><h1 className="text-4xl font-black">Finances</h1><p className="mt-4 text-gray-400">En attente...</p></div>;

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-950 text-gray-100 font-sans">
        <Sidebar />
        
        <main className="flex-1 ml-64 min-h-screen relative overflow-hidden">
          {/* Image de fond avec contraste augmenté */}
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
