import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { useStore } from './store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

// --- IMPORTATIONS DES PAGES ---
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Memberships from './pages/Memberships';
import Dogs from './pages/Dogs';
import Boutique from './pages/Boutique';
import Treasury from './pages/Treasury';

function App() {
  // L'onglet par défaut au démarrage
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Accès aux données globales (Store)
  const { members, dogs } = useStore();

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* BARRE DE NAVIGATION (GÉRÉE DANS SIDEBAR.TSX) */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* ZONE DE CONTENU PRINCIPAL */}
      <main className="flex-1 ml-72 p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {/* LOGIQUE D'AFFICHAGE DES PAGES */}
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'membres' && <Members />}
            {activeTab === 'cotisations' && <Memberships />}
            {activeTab === 'meute' && <Dogs />}
            {activeTab === 'boutique' && <Boutique />}
            {activeTab === 'finances' && <Treasury />}

            {/* PAGE ÉVÉNEMENTS (ENCORE EN ATTENTE DE CRÉATION) */}
            {activeTab === 'evenements' && (
              <div>
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-2 text-slate-800">Événements</h2>
                <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Agenda et Inscriptions</p>
                <div className="mt-8 p-12 border-2 border-dashed border-slate-200 rounded-[3rem] text-center">
                  <p className="text-slate-400 font-bold italic text-sm">
                    Cette page sera créée lors de notre prochaine étape.
                  </p>
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
