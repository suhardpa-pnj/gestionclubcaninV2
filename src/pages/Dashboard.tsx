import React from 'react';
import { useStore } from '../store/useStore';
import { Users, Dog, Landmark, Plus, ShoppingCart, Calendar } from 'lucide-react';

const Dashboard = () => {
  const { members, dogs, transactions, darkMode } = useStore();
  const total = transactions.reduce((acc, t) => acc + (t.type === 'Crédit' ? t.amount : -t.amount), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-3">
        {[
          { l: 'Membres', v: members.length, c: 'bg-emerald-500' },
          { l: 'Chiens', v: dogs.length, c: 'bg-blue-500' },
          { l: 'Solde', v: `${total}€`, c: 'bg-amber-500' }
        ].map((s, i) => (
          <div key={i} className={`${darkMode ? 'bg-slate-900' : 'bg-white'} p-4 rounded-3xl border ${darkMode ? 'border-slate-800' : 'border-slate-100'} text-center shadow-sm`}>
            <p className="text-[8px] font-black uppercase text-slate-400 mb-1">{s.l}</p>
            <p className={`text-xl font-black italic ${darkMode ? 'text-white' : 'text-slate-800'}`}>{s.v}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 p-4 bg-emerald-500 text-white rounded-2xl font-black text-[10px] uppercase italic shadow-lg shadow-emerald-500/20">
          <Plus size={16} /> Nouveau Membre
        </button>
        <button className="flex items-center justify-center gap-2 p-4 bg-slate-800 text-white rounded-2xl font-black text-[10px] uppercase italic shadow-lg shadow-black/20">
          <ShoppingCart size={16} /> Vendre Sac
        </button>
      </div>

      <div className={`${darkMode ? 'bg-slate-900' : 'bg-white'} p-6 rounded-[32px] border ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
        <h3 className="text-[10px] font-black uppercase text-slate-500 mb-4 flex items-center gap-2">
          <Calendar size={14} /> Agenda du Club
        </h3>
        <div className="space-y-3">
          {[
            { t: 'Cours Éducation', d: 'Samedi - 14h00', c: 'border-emerald-500' },
            { t: 'Entraînement Ring', d: 'Dimanche - 09h00', c: 'border-blue-500' }
          ].map((e, i) => (
            <div key={i} className={`p-3 border-l-4 ${e.c} ${darkMode ? 'bg-slate-950' : 'bg-slate-50'} rounded-r-xl`}>
              <p className="text-[10px] font-black uppercase italic">{e.t}</p>
              <p className="text-[9px] text-slate-500 font-bold">{e.d}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
