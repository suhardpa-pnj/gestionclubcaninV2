import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Landmark, ArrowUpCircle, ArrowDownCircle, Search, Receipt } from 'lucide-react';

const Treasury = () => {
  const { transactions, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Calculs dynamiques basés sur le type de transaction [cite: 4, 5]
  const totalIn = transactions.filter(t => t.type === 'Crédit').reduce((acc, t) => acc + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'Débit').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIn - totalOut;

  const filteredTransactions = transactions.filter(t =>
    t.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* HEADER HARMONISÉ [cite: 7] */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Trésorerie <span className="text-[#BC6C25]">Générale</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
            Amicale Canine Vernoise • Gestion des flux
          </p>
        </div>

        <button className="flex items-center gap-3 px-8 py-4 rounded-[2rem] bg-[#1B4332] text-white font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all">
          <Plus size={18} /> Nouvelle Saisie
        </button>
      </div>

      {/* RÉSUMÉ FINANCIER [cite: 9, 10] */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={`p-10 rounded-[40px] border relative overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
          <div className="flex items-center gap-4 mb-6 text-[#BC6C25]">
            <Landmark size={22} />
            <p className="text-[10px] font-black uppercase tracking-widest italic">Solde en banque</p>
          </div>
          <p className={`text-4xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            {balance.toLocaleString('fr-FR')} €
          </p>
        </div>

        <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-emerald-50/30 border-emerald-100 shadow-sm'}`}>
          <div className="flex items-center gap-4 mb-6 text-[#1B4332]">
            <ArrowUpCircle size={22} />
            <p className="text-[10px] font-black uppercase tracking-widest italic">Recettes cumulées</p>
          </div>
          <p className="text-4xl font-serif italic text-[#1B4332]">+{totalIn.toLocaleString('fr-FR')} €</p>
        </div>

        <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-rose-50/30 border-rose-100 shadow-sm'}`}>
          <div className="flex items-center gap-4 mb-6 text-rose-500">
            <ArrowDownCircle size={22} />
            <p className="text-[10px] font-black uppercase tracking-widest italic">Dépenses engagées</p>
          </div>
          <p className="text-4xl font-serif italic text-rose-500">-{totalOut.toLocaleString('fr-FR')} €</p>
        </div>
      </div>

      {/* HISTORIQUE DES FLUX [cite: 15, 16] */}
      <div className={`rounded-[40px] border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className={`text-xl font-serif italic ${darkMode ? 'text-slate-300' : 'text-[#1B4332]'}`}>Historique des flux</h3>
          
          <div className={`flex items-center px-4 py-2 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-transparent shadow-inner'}`}>
            <Search className="text-[#BC6C25]" size={14} />
            <input 
              type="text"
              placeholder="RECHERCHER UN FLUX..."
              className="bg-transparent border-none outline-none p-2 text-[10px] font-black uppercase tracking-widest w-48"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={darkMode ? 'bg-slate-950/50' : 'bg-[#1B4332]/5'}>
                <th className="p-6 text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">Date</th>
                <th className="p-6 text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">Désignation</th>
                <th className="p-6 text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="p-6 text-[10px] font-bold text-slate-400">{t.date}</td>
                    <td className="p-6">
                      <p className={`text-lg font-serif italic lowercase ${darkMode ? 'text-slate-100' : 'text-[#1B4332]'}`}>
                        {t.label}
                      </p>
                      <span className="text-[8px] font-black text-[#BC6C25] uppercase tracking-widest italic">
                        {t.category}
                      </span>
                    </td>
                    <td className={`p-6 text-right font-serif italic text-xl ${t.type === 'Crédit' ? 'text-[#1B4332]' : 'text-rose-500'}`}>
                      {t.type === 'Crédit' ? '+' : '-'}{t.amount.toLocaleString('fr-FR')} €
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-24 text-center">
                    <Receipt className="mx-auto text-slate-200 mb-4" size={48} />
                    <p className="text-slate-400 font-serif italic text-lg">Aucun mouvement enregistré</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Treasury;
