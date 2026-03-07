import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { useStore } from './store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORTATIONS DES PAGES ---
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Memberships from './pages/Memberships';
import Dogs from './pages/Dogs';
import SectionDetail from './pages/SectionDetail';
import Boutique from './pages/Boutique';
import Treasury from './pages/Treasury';
import Events from './pages/Events'; // <-- Ajouté !

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 ml-72 p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'membres' && <Members />}
            {activeTab === 'cotisations' && <Memberships />}
            {activeTab === 'meute' && <Dogs />}
            {activeTab === 'sections' && <SectionDetail />}
            {activeTab === 'boutique' && <Boutique />}
            {activeTab === 'finances' && <Treasury />}
            {activeTab === 'evenements' && <Events />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
