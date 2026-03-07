import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { useStore } from './store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORTATIONS DES PAGES ---
import Dashboard from './pages/Dashboard';
import Members from './pages/Members'; // <-- On ajoute cette ligne

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { dogs } = useStore();

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
            {/* AFFICHAGE DU DASHBOARD */}
            {activeTab === 'dashboard' && <Dashboard />}

            {/* --- AFFICHAGE DE LA VRAIE PAGE ADHÉRENTS --- */}
            {activeTab === 'membres' && <Members />}

            {activeTab === 'meute' && (
              <div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Meute</h2>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Suivi des {dogs.length} chiens</p>
                <div className="mt-8 p-12 border-2 border-dashed border-slate-200 rounded-[3rem] text-center">
                  <p className="text-slate-400 font-bold italic">La liste des chiens sera codée ici.</p>
                </div>
              </div>
            )}

            {activeTab === 'boutique' && (
              <div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Boutique</h2>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Stocks et ventes</p>
                <div className="mt-8 p-12 border-2 border-dashed border-slate-200 rounded-[3rem] text-center">
                  <p className="text-slate-400 font-bold italic">Le catalogue boutique sera codé ici.</p>
                </div>
              </div>
            )}

            {activeTab === 'evenements' && (
              <div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2">Événements</h2>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Agenda du club</p>
                <div className="mt-8 p-12 border-2 border-dashed border-slate-200 rounded-[3rem] text-center">
                  <p className="text-slate-400 font-bold italic">L'agenda sera codé ici.</p>
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
