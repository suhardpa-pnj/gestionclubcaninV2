import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { CreditCard, Check, AlertCircle, Calendar, Euro } from 'lucide-react';

const Cotisations = () => {
  const { members, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Fonction pour calculer les jours restants
  const getValidity = (dateStr: string) => {
    if (!dateStr) return -999;
    const today = new Date();
    const paymentDate = new Date(dateStr);
    const expiryDate = new Date(paymentDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Filtrage et tri par durée de validité
  const processedMembers = members
    .filter(m => (m.firstName + ' ' + (m.name || '')).toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => getValidity(a.lastPaymentDate) - getValidity(b.lastPaymentDate));

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      {/* HEADER HARMONISÉ */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Suivi des <span className="text-[#BC6C25]">Cotisations</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
            Adhésions & Licences ACMA 2026
          </p>
        </div>

        {/* RECHERCHE RESSRRÉE */}
        <div className={`flex items-center px-4 py-2 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'}`}>
          <input 
            type="text" 
            placeholder="Chercher un membre..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-48"
          />
        </div>
      </div>

      {/* TABLEAU REMODELÉ ET RESSERRÉ */}
      <div className={`rounded-[40px] border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={darkMode ? 'bg-slate-800/50' : 'bg-[#1B4332]/5'}>
                <th className="px-6 py-4 text-left text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">Membre</th>
                <th className="px-6 py-4 text-center text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">Paiement</th>
                <th className="px-6 py-4 text-center text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">Montant</th>
                <th className="px-6 py-4 text-center text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">ACMA</th>
                <th className="px-6 py-4 text-right text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">Validité</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {processedMembers.map((m) => {
                const daysLeft = getValidity(m.lastPaymentDate);
                const isExpired = daysLeft <= 0;
                const isWarning = daysLeft > 0 && daysLeft <= 30;

                return (
                  <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-3">
                      <p className={`text-lg font-serif italic lowercase ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                        {m.firstName} {m.name}
                      </p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">ID: {m.id}</p>
                    </td>
                    
                    <td className={`px-6 py-3 text-center font-bold text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      {m.lastPaymentDate ? new Date(m.lastPaymentDate).toLocaleDateString('fr-FR') : '--/--/----'}
                    </td>

                    <td className="px-6 py-3 text-center">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black ${darkMode ? 'bg-slate-800 text-white' : 'bg-emerald-50 text-[#1B4332]'}`}>
                        {m.lastPaymentAmount || '0'} €
                      </span>
                    </td>

                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          m.hasACMA ? 'bg-[#BC6C25] border-[#BC6C25] text-white' : 'border-slate-200'
                        }`}>
                          {m.hasACMA && <Check size={14} strokeWidth={3} />}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-3 text-right">
                      {m.lastPaymentDate ? (
                        <div className="inline-flex flex-col items-end">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${
                            isExpired ? 'text-rose-500' : isWarning ? 'text-amber-500' : 'text-emerald-500'
                          }`}>
                            {isExpired ? 'Expiré' : `${daysLeft} jours`}
                          </span>
                          <div className={`h-1 w-16 rounded-full mt-1 ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                            <div 
                              className={`h-full rounded-full ${isExpired ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.max(0, Math.min(100, (daysLeft / 365) * 100))}%` }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-slate-300 text-[9px] font-black uppercase italic">Non renseigné</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cotisations;
