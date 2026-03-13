import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  Plus, Landmark, ArrowUpCircle, ArrowDownCircle, 
  Search, Receipt, X, Save, Tag, Euro, Calendar
} from 'lucide-react';

const Treasury = () => {
  const { transactions, darkMode, addTransaction } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // État pour le nouveau mouvement
  const [formData, setFormData] = useState({
    label: '',
    amount: '',
    type: 'Crédit' as 'Crédit' | 'Débit',
    category: 'Général',
    date: new Date().toISOString().split('T')[0]
  });

  const totalIn = transactions.filter(t => t.type === 'Crédit').reduce((acc, t) => acc + t.amount, 0);
  const totalOut = transactions.filter(t => t.type === 'Débit').reduce((acc, t) => acc + t.amount, 0);
  const balance = totalIn - totalOut;

  const filteredTransactions = transactions.filter(t =>
    t.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (addTransaction) {
      await addTransaction({
        ...formData,
        amount: parseFloat(formData.amount)
      });
      setIsModalOpen(false);
      setFormData({ label: '', amount: '', type: 'Crédit', category: 'Général', date: new Date().toISOString().split('T')[0] });
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Trésorerie <span className="text-[#BC6C25]">Générale</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
            Amicale Canine Vernoise • Gestion des flux
          </p>
        </div>

        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 rounded-[2rem] bg-[#1B4332] text-white font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all"
        >
          <Plus size={18} /> Nouvelle Saisie
        </button>
      </div>

      {/* RÉSUMÉ (SOLDE / ENTRÉES / SORTIES) */}
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

      {/* TABLEAU HISTORIQUE */}
      <div className={`rounded-[40px] border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
        <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row items-center justify-between gap-6">
          <h3 className={`text-xl font-serif italic ${darkMode ? 'text-slate-300' : 'text-[#1B4332]'}`}>Historique des flux</h3>
          <div className={`flex items-center px-4 py-2 rounded-2xl border ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-transparent shadow-inner'}`}>
            <Search className="text-[#BC6C25]" size={14} />
            <input 
              type="text"
              placeholder="RECHERCHER..."
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
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6 text-[10px] font-bold text-slate-400">{t.date}</td>
                  <td className="p-6">
                    <p className={`text-lg font-serif italic lowercase ${darkMode ? 'text-slate-100' : 'text-[#1B4332]'}`}>{t.label}</p>
                    <span className="text-[8px] font-black text-[#BC6C25] uppercase tracking-widest italic">{t.category}</span>
                  </td>
                  <td className={`p-6 text-right font-serif italic text-xl ${t.type === 'Crédit' ? 'text-[#1B4332]' : 'text-rose-500'}`}>
                    {t.type === 'Crédit' ? '+' : '-'}{t.amount.toLocaleString('fr-FR')} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE DE NOUVELLE SAISIE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#1B4332]/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="w-full max-w-md rounded-[40px] bg-white shadow-2xl overflow-hidden">
            <div className="p-8 flex items-center justify-between border-b border-slate-50">
              <h3 className="text-2xl font-serif italic text-[#1B4332]">Nouveau Mouvement</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="flex p-1 bg-slate-100 rounded-2xl">
                {['Crédit', 'Débit'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({...formData, type: type as any})}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      formData.type === type ? 'bg-white text-[#BC6C25] shadow-sm' : 'text-slate-400'
                    }`}
                  >
                    {type === 'Crédit' ? 'Recette' : 'Dépense'}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest italic">Désignation</label>
                  <div className="relative">
                    <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC6C25]" size={16} />
                    <input type="text" placeholder="Ex: Achat matériel agility..." value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-xs" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest italic">Montant (€)</label>
                    <div className="relative">
                      <Euro className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC6C25]" size={16} />
                      <input type="number" step="0.01" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-xs" required />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest italic">Date</label>
                    <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-xs" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest italic">Catégorie</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-xs">
                    <option>Général</option>
                    <option>Adhésions</option>
                    <option>Boutique</option>
                    <option>Travaux / Entretien</option>
                    <option>Événements</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="w-full py-5 rounded-[2rem] bg-[#1B4332] text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all flex items-center justify-center gap-2">
                <Save size={16} /> Enregistrer le mouvement
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Treasury;
