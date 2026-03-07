import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { useStore } from './store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORTATIONS DES PAGES ---
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';      // <-- Connecté !
import Boutique from './pages/Boutique'; // <-- Connecté !

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
            {activeTab === 'meute' && <Dogs />}
            {activeTab === 'boutique' && <Boutique />}

            {activeTab === 'evenements' && (
              <div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Événements</h2>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Agenda du club</p>
                <div className="mt-8 p-12 border-2 border-dashed border-slate-200 rounded-[3rem] text-center">
                  <p className="text-slate-400 font-bold italic">La page événements sera notre prochain gros chantier.</p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
