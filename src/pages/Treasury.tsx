import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Landmark, ArrowUpCircle, ArrowDownCircle, Search, Receipt } from 'lucide-react';

const Treasury = () => {
  const { transactions, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Calculs dynamiques
  const totalIn = transactions.filter(t => t.type === 'Crédit').reduce((acc, t) => acc + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'Débit').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIn - totalOut;

  const filteredTransactions = transactions.filter(t =>
    t.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            Trésorerie
          </h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
            Gestion financière de l'Amicale
          </p>
        </div>
        <button className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase italic text-xs tracking-widest transition-all shadow-xl ${
          darkMode ? 'bg-emerald-500 text-white shadow-emerald-900/20' : 'bg-slate-900 text-white shadow-slate-200'
        }`}>
          <Plus size={20} /> Nouvelle Saisie
        </button>
      </div>

      {/* Cartes de Résumé */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={`p-8 rounded-[40px] border transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex items-center gap-4 mb-4 text-emerald-500">
            <Landmark size={24} />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Solde Actuel</p>
          </div>
          <p className={`text-4xl font-black tracking-tighter italic ${darkMode ? 'text-white' : 'text-slate-800'}`}>
            {balance.toLocaleString()} €
          </p>
        </div>

        <div className={`p-8 rounded-[40px] border transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex items-center gap-4 mb-4 text-blue-500">
            <ArrowUpCircle size={24} />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Recettes</p>
          </div>
          <p className="text-4xl font-black text-blue-500 tracking-tighter italic">+{totalIn.toLocaleString()} €</p>
        </div>

        <div className={`p-8 rounded-[40px] border transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="flex items-center gap-4 mb-4 text-red-500">
            <ArrowDownCircle size={24} />
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Dépenses</p>
          </div>
          <p className="text-4xl font-black text-red-500 tracking-tighter italic">-{totalOut.toLocaleString()} €</p>
        </div>
      </div>

      {/* Liste des Transactions */}
      <div className={`rounded-[40px] border overflow-hidden transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800 shadow-none' : 'bg-white border-slate-100 shadow-sm'
      }`}>
        <div className={`p-8 border-b flex items-center justify-between ${darkMode ? 'border-slate-800' : 'border-slate-50'}`}>
          <h3 className={`font-black uppercase italic tracking-tight ${darkMode ? 'text-slate-300' : 'text-slate-800'}`}>
            Historique des flux
          </h3>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text"
              placeholder="RECHERCHER..."
              className={`pl-12 pr-6 py-3 border-none rounded-xl text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-emerald-500 w-64 transition-colors ${
                darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="w-full text-left">
          <thead className={darkMode ? 'bg-slate-950/50' : 'bg-slate-50/50'}>
            <tr>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Date</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Libellé</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Montant</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-50'}`}>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((t) => (
                <tr key={t.id} className={`transition-colors ${darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50/50'}`}>
                  <td className="p-6 text-xs font-bold text-slate-500">{t.date}</td>
                  <td className="p-6">
                    <p className={`font-black uppercase italic text-sm ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{t.label}</p>
                    <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">{t.category}</p>
                  </td>
                  <td className={`p-6 text-right font-black italic text-lg ${t.type === 'Crédit' ? 'text-blue-500' : 'text-red-500'}`}>
                    {t.type === 'Crédit' ? '+' : '-'}{t.amount} €
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-20 text-center">
                  <Receipt className="mx-auto text-slate-700 mb-4" size={40} />
                  <p className="text-slate-500 font-black uppercase italic text-sm">Aucun mouvement</p>
                  <p className="text-[10px] text-slate-600 uppercase font-bold tracking-widest mt-2">
                    Enregistrez les adhésions ACMA pour voir les chiffres
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Treasury;
