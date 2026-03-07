import React from 'react';
import { useStore } from '../store/useStore';
import { Users, Dog, ShoppingCart, AlertTriangle, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  // On récupère les données depuis le "Cerveau" (Store)
  const { members, dogs, products } = useStore();

  // On calcule quelques statistiques rapides
  const totalMembers = members.length;
  const totalDogs = dogs.length;
  const lowStockProducts = products.filter(p => p.stock <= p.minStock).length;

  return (
    <div className="space-y-8">
      {/* TITRE DE LA PAGE */}
      <div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">
          Tableau de Bord
        </h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
          Aperçu global de l'activité du club
        </p>
      </div>

      {/* GRILLE DE STATISTIQUES (CARTES) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* CARTE : MEMBRES */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center space-x-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shadow-inner">
            <Users size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Adhérents</p>
            <p className="text-3xl font-black text-slate-800 italic tracking-tighter">{totalMembers}</p>
          </div>
        </div>

        {/* CARTE : CHIENS */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center space-x-6">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shadow-inner">
            <Dog size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Meute</p>
            <p className="text-3xl font-black text-slate-800 italic tracking-tighter">{totalDogs}</p>
          </div>
        </div>

        {/* CARTE : STOCKS BAS */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center space-x-6">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${lowStockProducts > 0 ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-300'}`}>
            <ShoppingCart size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stocks Bas</p>
            <p className={`text-3xl font-black italic tracking-tighter ${lowStockProducts > 0 ? 'text-rose-500' : 'text-slate-800'}`}>
              {lowStockProducts}
            </p>
          </div>
        </div>

        {/* CARTE : FINANCES (Exemple) */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl flex items-center space-x-6 text-white">
          <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20 text-slate-900">
            <TrendingUp size={28} />
          </div>
          <div>
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Caisse Club</p>
            <p className="text-2xl font-black italic tracking-tighter">En cours</p>
          </div>
        </div>
      </div>

      {/* ZONE CENTRALE (MESSAGE DE BIENVENUE) */}
      <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-xl">
          <h3 className="text-4xl font-black text-slate-800 italic tracking-tighter uppercase leading-none mb-6">
            Bienvenue sur votre <br />
            <span className="text-emerald-500 text-5xl">Nouvel Outil.</span>
          </h3>
          <p className="text-slate-500 font-bold leading-relaxed mb-8">
            L'architecture de votre application est maintenant prête. Vous pouvez naviguer entre les sections et commencer à gérer vos membres avec une base saine et évolutive.
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1,2,3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200" />
              ))}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              + {totalMembers} membres connectés
            </p>
          </div>
        </div>
        
        {/* DÉCORATION DE FOND (L'ICÔNE CHIEN GÉANTE) */}
        <Dog className="absolute -bottom-10 -right-10 w-80 h-80 text-slate-50 -rotate-12 z-0" />
      </div>
    </div>
  );
};

export default Dashboard;
