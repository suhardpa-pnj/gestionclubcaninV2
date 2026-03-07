import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  PlusCircle, ArrowUpRight, ArrowDownRight, 
  FileText, Download, Landmark, Paperclip, 
  AlertCircle, History, CheckCircle2 
} from 'lucide-react';
import AddTransactionModal from '../components/AddTransactionModal';

const Treasury: React.FC = () => {
  const { transactions, members } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // --- LOGIQUE COMPTABLE GÉNÉRALE ---
  const totalCredit = transactions
    .filter(t => t.type === 'Crédit')
    .reduce((acc, t) => acc + t.amount, 0);
    
  const totalDebit = transactions
    .filter(t => t.type === 'Débit')
    .reduce((acc, t) => acc + t.amount, 0);
    
  const soldeActuel = totalCredit - totalDebit;

  // --- LOGIQUE SPÉCIFIQUE ACMA (RECONCILIATION) ---
  
  // 1. Dette totale théorique (15€ par membre + 15€ fixe club)
  const totalTheoriqueACMA = (members.length * 15) + 15;

  // 2. Somme de tous les paiements déjà effectués à l'ACMA (enregistrés en catégorie ACMA / Débit)
  const totalDejaPayeACMA = transactions
    .filter(t => t.category === 'ACMA' && t.type === 'Débit')
    .reduce((acc, t) => acc + t.amount, 0);

  // 3. Dette réelle en cours (Ce qu'il reste à payer)
  const detteRestanteACMA = totalTheoriqueACMA - totalDejaPayeACMA;

  return (
    <div className="space-y-8">
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">Comptabilité</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Journal de Trésorerie • Exercice {new Date().getFullYear()}</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-6 py-4 bg-white border border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">
            <Download size={16} />
            <span>Export .CSV</span>
          </button>
          <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 px-6 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-emerald-500 transition-all">
            <PlusCircle size={18} />
            <span>Nouvelle Écriture</span>
          </button>
        </div>
      </div>

      {/* RÉSUMÉ FINANCIER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
          <Landmark className="absolute right-[-20px] bottom-[-20px] text-white/5" size={180} />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-4">Solde en Banque</p>
          <p className="text-5xl font-black italic tracking-tighter mb-4">{soldeActuel.toLocaleString()}€</p>
          <div className="inline-flex items-center px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-[9px] font-black uppercase tracking-widest">
            <CheckCircle2 size={12} className="mr-1" /> Compte à jour
          </div>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Recettes</p>
            <p className="text-3xl font-black text-emerald-500 italic tracking-tighter">+{totalCredit.toLocaleString()}€</p>
          </div>
          <div className="text-[9px] font-bold text-slate-300 uppercase mt-4">Somme des entrées</div>
        </div>

        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Dépenses</p>
            <p className="text-3xl font-black text-rose-500 italic tracking-tighter">-{totalDebit.toLocaleString()}€</p>
          </div>
          <div className="text-[9px] font-bold text-slate-300 uppercase mt-4">Somme des sorties</div>
        </div>
      </div>

      {/* --- BLOC DETTE ACMA DYNAMIQUE --- */}
      <div className={`rounded-[3rem] p-10 border transition-all ${
        detteRestanteACMA > 0 ? 'bg-amber-50 border-amber-100' : 'bg-emerald-50 border-emerald-100'
      }`}>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm ${
              detteRestanteACMA > 0 ? 'bg-white text-amber-500' : 'bg-emerald-500 text-white'
            }`}>
              {detteRestanteACMA > 0 ? <AlertCircle size={32} /> : <CheckCircle2 size={32} />}
            </div>
            <div>
              <h4 className={`text-xl font-black uppercase italic tracking-tighter ${
                detteRestanteACMA > 0 ? 'text-amber-900' : 'text-emerald-900'
              }`}>
                Dette ACMA en cours
              </h4>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                Total dû : {totalTheoriqueACMA}€ | Déjà réglé : {totalDejaPayeACMA}€
              </p>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-[9px] font-black uppercase opacity-60 mb-1">Reste à payer</p>
            <p className={`text-4xl font-black italic tracking-tighter ${
              detteRestanteACMA > 0 ? 'text-amber-900' : 'text-emerald-500'
            }`}>
              {detteRestanteACMA <= 0 ? 'À JOUR' : `${detteRestanteACMA}€`}
            </p>
          </div>
        </div>
      </div>

      {/* JOURNAL DES OPÉRATIONS */}
      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-50 bg-slate-50/30 flex items-center space-x-3">
          <History size={20} className="text-slate-400" />
          <h3 className="font-black uppercase italic tracking-tighter text-slate-800">Grand Livre des Écritures</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-10 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="px-10 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Libellé</th>
                <th className="px-10 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400">Catégorie</th>
                <th className="px-10 py-5 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-10 py-6 text-xs font-bold text-slate-400">{t.date}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center space-x-3">
                      <p className="font-black text-slate-800 uppercase italic tracking-tight">{t.label}</p>
                      {t.receipt ? (
                        <Paperclip size={14} className="text-emerald-500" />
                      ) : (
                        <AlertCircle size={14} className="text-rose-300" />
                      )}
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      t.category === 'ACMA' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {t.category}
                    </span>
                  </td>
                  <td className={`px-10 py-6 text-right font-black italic text-lg ${
                    t.type === 'Crédit' ? 'text-emerald-500' : 'text-rose-500'
                  }`}>
                    {t.type === 'Crédit' ? `+${t.amount}` : `-${t.amount}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Treasury;
