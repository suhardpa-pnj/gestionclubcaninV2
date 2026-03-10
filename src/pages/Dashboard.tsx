import React from 'react';
import { useStore } from '../store/useStore';
import { Users, Dog, ShoppingCart, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { members, dogs, transactions, seedBoutique, darkMode } = useStore();

  const stats = [
    { label: 'Adhérents', value: members.length, icon: <Users size={20}/>, color: 'bg-blue-500' },
    { label: 'Chiens', value: dogs.length, icon: <Dog size={20}/>, color: 'bg-emerald-500' },
    { label: 'Ventes', value: transactions.filter(t => t.category === 'Boutique').length, icon: <ShoppingCart size={20}/>, color: 'bg-orange-500' },
    { label: 'CA Boutique', value: `${transactions.filter(t => t.category === 'Boutique').reduce((acc, t) => acc + t.amount, 0)}€`, icon: <TrendingUp size={20}/>, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Tableau de <span className="text-[#BC6C25]">Bord</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2 italic">Amicale Canine Vernoise • Session 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`p-8 rounded-[40px] border transition-all hover:scale-105 ${darkMode ? 'bg-[#1A1F1C] border-slate-700 shadow-none' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
            <div className={`w-12 h-12 rounded-2xl ${s.color} text-white flex items-center justify-center mb-6 shadow-lg`}>{s.icon}</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
            <p className={`text-3xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-[#1A1F1C] border-slate-700' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="text-[#BC6C25]" size={20} />
            <h3 className={`text-xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Prochaines séances</h3>
          </div>
          <p className="text-slate-400 font-serif italic">Aucune séance programmée cette semaine.</p>
        </div>

        <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-[#1A1F1C] border-slate-700' : 'bg-[#1B4332] border-transparent shadow-2xl'}`}>
          <h3 className="text-white text-xl font-serif italic mb-4">Initialisation Boutique</h3>
          <p className="text-emerald-100/60 text-xs mb-8">Utilisez ce bouton pour charger les 6 références de croquettes ACV par défaut.</p>
          <button onClick={seedBoutique} className="w-full py-4 bg-[#BC6C25] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-[#DDA15E] transition-all">Réinitialiser le catalogue</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
