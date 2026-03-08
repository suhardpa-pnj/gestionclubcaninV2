import React from 'react';
import { useStore } from '../store/useStore';
import { Users, Dog as DogIcon, Landmark } from 'lucide-react';

const Dashboard = () => {
  const { members, dogs } = useStore();

  const stats = [
    { label: 'Membres Actifs', value: members.length, icon: <Users />, color: 'bg-emerald-500' },
    { label: 'Le Parc Canin', value: dogs.length, icon: <DogIcon />, color: 'bg-blue-500' },
    { label: 'Trésorerie', value: '0 €', icon: <Landmark />, color: 'bg-slate-900' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800">
          Tableau de Bord
        </h2>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
          Amicale Canine Vernoise - Session 2026
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-6">
            <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-slate-800 tracking-tighter italic">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
