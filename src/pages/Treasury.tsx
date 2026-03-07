import React, { useState } from 'react';
import { useStore, Transaction } from '../store/useStore';
import { 
  PlusCircle, ArrowUpRight, ArrowDownRight, 
  FileText, Download, PieChart, Landmark 
} from 'lucide-react';

const Treasury: React.FC = () => {
  const { transactions } = useStore();
  
  // Calculs comptables
  const totalCredit = transactions.filter(t => t.type === 'Crédit').reduce((acc, t) => acc + t.amount, 0);
  const totalDebit = transactions.filter(t => t.type === 'Débit').reduce((acc, t) => acc + t.amount, 0);
  const soldeCalculé = totalCredit - totalDebit;

  return (
    <div className="space-y-8">
      {/* HEADER COMPTABLE */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">Comptabilité</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Exercice 2026 • Journal de Trésorerie</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">
            <Download size={16} />
            <span>Export Excel</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-emerald-500 transition-all">
            <PlusCircle size={16} />
            <span>Nouvelle Écriture</span>
          </button>
        </div>
      </div>

      {/* BILAN RAPIDE (LOOK BANQUE) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white col-span-1 md:col-span-2 shadow-2xl relative overflow-hidden">
          <Landmark className="absolute right-[-10px] bottom-[-10px] text-white/5" size={150} />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-4">Solde de Trésorerie</p>
          <p className="text-5xl font-black italic tracking-tighter mb-2">{soldeCalculé.toLocaleString()}€</p>
          <div className="flex items-center text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
            <ArrowUpRight size={14} className="mr-1" /> Compte à jour
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Recettes</p>
          <p className="text-3xl font-black text-emerald-500 italic tracking-tighter">+{totalCredit}€</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Dépenses</p>
          <p className="text-3xl font-black text-rose-500 italic tracking-tighter">-{totalDebit}€</p>
        </div>
      </div>

      {/* JOURNAL DES OPÉRATIONS (STYLE TABLEAU COMPTABLE) */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <h3 className="font-black uppercase italic tracking-tighter text-slate-800">Grand Livre des Écritures</h3>
            <div className="flex space-x-2">
                <span className="px-4 py-2 bg-slate-50 rounded-xl text-[9px] font-black uppercase text-slate-400">Toutes les sections</span>
            </div>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Date</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Libellé de l'opération</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Catégorie</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Débit</th>
              <th className="px-8 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Crédit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50/30 transition-colors group">
                <td className="px-8 py-6 text-xs font-bold text-slate-400">{t.date}</td>
                <td className="px-8 py-6">
                  <p className="font-black text-slate-800 uppercase italic tracking-tight text-sm">{t.label}</p>
                </td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                    t.category === 'ACMA' ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {t.category}
                  </span>
                </td>
                <td className="px-8 py-6 text-right font-black text-rose-500 italic">
                  {t.type === 'Débit' ? `-${t.amount}€` : '-'}
                </td>
                <td className="px-8 py-6 text-right font-black text-emerald-500 italic">
                  {t.type === 'Crédit' ? `+${t.amount}€` : '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ANALYSE DES CHARGES ACMA */}
      <div className="bg-amber-50 rounded-[3rem] p-10 border border-amber-100">
        <div className="flex items-center space-x-4 mb-6">
            <div className="p-3 bg-amber-200 rounded-2xl text-amber-700">
                <FileText size={24} />
            </div>
            <div>
                <h4 className="font-black uppercase italic tracking-tighter text-amber-900">Suivi des Obligations ACMA</h4>
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest">Estimation des reversements en cours</p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/50 p-6 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-800">Part Collectée (15€/Adh)</span>
                    <span className="font-black text-amber-900">450€</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-amber-800">Cotisation Club Fixe</span>
                    <span className="font-black text-amber-900">15€</span>
                </div>
                <div className="pt-3 border-t border-amber-200 flex justify-between items-center">
                    <span className="text-xs font-black uppercase text-amber-900">Total à reverser</span>
                    <span className="text-xl font-black text-amber-900">465€</span>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <p className="text-xs text-amber-700 italic leading-relaxed">
                    "Note comptable : Le reversement à l'ACMA doit être effectué mensuellement. 
                    Le montant est calculé sur la base des nouveaux membres validés dans le registre."
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Treasury;
