import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CreditCard, CheckCircle, Clock, AlertCircle, Info } from 'lucide-react';

const Memberships: React.FC = () => {
  const { members } = useStore();
  const [filter, setFilter] = useState<'Tous' | 'À jour' | 'En retard'>('Tous');

  const filteredMembers = members.filter(m => {
    const isPaid = m.lastPayment && m.lastPayment.includes('2025');
    if (filter === 'À jour') return isPaid;
    if (filter === 'En retard') return !isPaid;
    return true;
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">Cotisations</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Suivi des Adhésions & Licences</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center space-x-3">
          <Info className="text-blue-500" size={20} />
          <p className="text-[9px] font-black uppercase text-blue-600 leading-tight">
            Chaque adhésion inclut <br /> 15€ pour l'ACMA
          </p>
        </div>
      </div>

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

      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Adhérent</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Ventilation</th>
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
                    <p className="text-[10px] font-bold text-slate-400">{member.membershipType}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col space-y-1">
                      <span className="text-[10px] font-bold text-slate-600">Club : 45€</span>
                      <span className="text-[10px] font-bold text-blue-500">ACMA : 15€</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`flex items-center font-black uppercase text-[9px] tracking-widest ${isPaid ? 'text-emerald-500' : 'text-rose-500'}`}>
                      {isPaid ? <CheckCircle size={14} className="mr-2" /> : <AlertCircle size={14} className="mr-2" />}
                      {isPaid ? 'Payé' : 'En attente'}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {!isPaid && (
                      <button className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-md">
                        Encaisser 60€
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
