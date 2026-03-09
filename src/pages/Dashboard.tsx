import React from 'react';
import { useStore } from '../store/useStore';
import { 
  Users, 
  Dog as DogIcon, 
  Landmark, 
  Plus, 
  ShoppingCart, 
  Calendar, 
  RefreshCw,
  ShoppingBag
} from 'lucide-react';

const Dashboard = () => {
  const { 
    members, 
    dogs, 
    transactions, 
    darkMode, 
    seedBoutique, 
    importFullUpdate 
  } = useStore();

  // Calcul du chiffre d'affaires total
  const totalRevenue = transactions
    .filter(t => t.type === 'Crédit')
    .reduce((acc, t) => acc + t.amount, 0);

  // Données pour les 3 indicateurs clés
  const stats = [
    { label: 'Adhérents', value: members.length, icon: <Users size={24} />, color: 'from-emerald-400 to-emerald-600' },
    { label: 'La Meute', value: dogs.length, icon: <DogIcon size={24} />, color: 'from-blue-400 to-blue-600' },
    { label: 'Recettes', value: `${totalRevenue}€`, icon: <Landmark size={24} />, color: 'from-amber-400 to-amber-600' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER ADAPTATIF */}
      <header className="flex flex-col gap-2">
        <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Tableau <span className="text-emerald-500">de Bord</span>
        </h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] italic opacity-70">
          Amicale Canine Vernoise • Session 2026
        </p>
      </header>

      {/* GRILLE DE STATS COMPACTE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className={`p-6 rounded-[32px] border flex items-center gap-5 transition-all ${
            darkMode ? 'bg-slate-900 border-slate-800 shadow-none' : 'bg-white border-slate-100 shadow-sm'
          }`}>
            <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className={`text-[9px] font-black uppercase tracking-widest ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                {stat.label}
              </p>
              <p className={`text-2xl font-black italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ACTIONS RAPIDES (OPTIMISÉ SMARTPHONE) */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex flex-col items-center justify-center gap-3 p-6 bg-emerald-500 text-white rounded-[32px] font-black text-[10px] uppercase italic shadow-xl shadow-emerald-500/20 active:scale-95 transition-all">
          <Plus size={24} strokeWidth={3} />
          Nouveau Membre
        </button>
        <button className={`flex flex-col items-center justify-center gap-3 p-6 rounded-[32px] font-black text-[10px] uppercase italic shadow-xl active:scale-95 transition-all ${
          darkMode ? 'bg-slate-800 text-white shadow-black/40' : 'bg-slate-900 text-white shadow-slate-200'
        }`}>
          <ShoppingCart size={24} strokeWidth={3} />
          Vendre Sac
        </button>
      </div>

      {/* AGENDA DU CLUB */}
      <div className={`p-6 rounded-[40px] border transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'
      }`}>
        <h3 className={`text-[11px] font-black uppercase mb-6 flex items-center gap-3 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          <Calendar size={18} className="text-emerald-500" /> Agenda & Rappels
        </h3>
        <div className="space-y-4">
          {[
            { t: 'Cours Éducation', d: 'Tous les Samedi - 14h00', color: 'bg-emerald-500' },
            { t: 'Entraînement Ring', d: 'Dimanche - 09h00', color: 'bg-blue-500' },
            { t: 'Clôture Adhésions', d: '31 Mars 2026', color: 'bg-red-500' }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl ${darkMode ? 'bg-slate-950' : 'bg-slate-50'}`}>
              <div className={`w-2 h-10 ${item.color} rounded-full`} />
              <div>
                <p className={`text-xs font-black uppercase italic ${darkMode ? 'text-slate-200' : 'text-slate-700'}`}>{item.t}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ZONE ADMINISTRATIVE (INITIALISATION) */}
      <div className="flex flex-wrap gap-3 pt-6">
        <button 
          onClick={() => seedBoutique()}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[9px] uppercase tracking-widest border transition-all ${
            darkMode ? 'border-slate-800 text-slate-500 hover:text-emerald-400' : 'border-slate-200 text-slate-400 hover:text-emerald-600'
          }`}
        >
          <ShoppingBag size={14} /> Initialiser Boutique
        </button>
        <button 
          onClick={() => {/* fonction de synchro docs */}}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-[9px] uppercase tracking-widest border transition-all ${
            darkMode ? 'border-slate-800 text-slate-500 hover:text-amber-400' : 'border-slate-200 text-slate-400 hover:text-amber-600'
          }`}
        >
          <RefreshCw size={14} /> Synchro Dossiers
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
