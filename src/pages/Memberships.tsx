import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CreditCard, CheckCircle, Clock, AlertCircle, Search, Filter } from 'lucide-react';

const Memberships: React.FC = () => {
  const { members } = useStore();
  const [filter, setFilter] = useState<'Tous' | 'À jour' | 'En retard'>('Tous');

  // Simulation de logique : on considère "En retard" si pas de paiement en 2025
  const filteredMembers = members.filter(m => {
    const isPaid = m.lastPayment && m.lastPayment.includes('2025');
    if (filter === 'À jour') return isPaid;
    if (filter === 'En retard') return !isPaid;
    return true;
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">Cotisations</h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Suivi des adhésions {new Date().getFullYear()}</p>
      </div>

      {/* FILTRES RAPIDES */}
      <div className="flex items-center space-x-4">
        {(['Tous', 'À jour', 'En retard'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
              filter === f ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* TABLEAU DES PAIEMENTS */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Adhérent</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Type</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Dernier Paiement</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Statut</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredMembers.map((member) => {
              const isPaid = member.lastPayment && member.lastPayment.includes('2025');
              return (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <p className="font-black text-slate-800 uppercase italic tracking-tight">{member.firstName} {member.name}</p>
                    <p className="text-[10px] font-bold text-slate-400">{member.email}</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                      {member.membershipType}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center text-slate-600 font-bold text-xs">
                      <Clock size={14} className="mr-2 text-slate-300" />
                      {member.lastPayment || "Aucun"}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`flex items-center font-black uppercase text-[9px] tracking-widest ${isPaid ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {isPaid ? <CheckCircle size={14} className="mr-2" /> : <AlertCircle size={14} className="mr-2" />}
                      {isPaid ? 'À jour' : 'En retard'}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {!isPaid && (
                      <button className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                        Encaisser
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Memberships;
