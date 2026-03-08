import React from 'react';
import { useStore } from '../store/useStore';
import { Users, Dog as DogIcon, Landmark, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const { members, dogs, transactions, darkMode } = useStore();
  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);

  const stats = [
    { label: 'Adhérents', value: members.length, icon: <Users size={28} />, color: 'from-emerald-400 to-emerald-600', shadow: 'shadow-emerald-500/30' },
    { label: 'La Meute', value: dogs.length, icon: <DogIcon size={28} />, color: 'from-blue-400 to-blue-600', shadow: 'shadow-blue-500/30' },
    { label: 'Recettes', value: `${totalRevenue}€`, icon: <TrendingUp size={28} />, color: 'from-amber-400 to-amber-600', shadow: 'shadow-amber-500/30' },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h2 className={`text-5xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Tableau <span className="text-emerald-500">de Bord</span>
        </h2>
        <p className="text-slate-500 text-[11px] font-black uppercase tracking-[0.3em] mt-2 italic opacity-60">
          Amicale Canine Vernoise • Session 2026
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className={`relative group p-10 rounded-[48px] border transition-all duration-500 ${
            darkMode ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-100 shadow-2xl shadow-slate-200/50 hover:shadow-emerald-100/50'
          }`}>
            <div className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-[28px] flex items-center justify-center text-white mb-8 shadow-2xl ${stat.shadow} group-hover:scale-110 transition-transform`}>
              {stat.icon}
            </div>
            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              {stat.label}
            </p>
            <p className={`text-5xl font-black italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {stat.value}
            </p>
            <div className="absolute top-10 right-10 opacity-5">
              {React.cloneElement(stat.icon as React.ReactElement, { size: 100 })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Bannière Info */}
      <div className={`p-8 rounded-[40px] border-2 border-dashed ${darkMode ? 'border-slate-800 bg-slate-900/30' : 'border-slate-100 bg-slate-50/50'}`}>
        <p className={`text-center text-xs font-bold uppercase tracking-widest italic ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          Prochain événement : <span className="text-emerald-500">Concours Ring - 15 Mai 2026</span>
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
