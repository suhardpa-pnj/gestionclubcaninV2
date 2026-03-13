import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  Check, X, Edit3, Save, Calendar, 
  Euro, ShieldCheck, Calculator, ChevronDown, ChevronUp, UserPlus
} from 'lucide-react';

const Cotisations = () => {
  const { members, darkMode, updateMember } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  // États pour le calculateur avec les tarifs officiels
  const [calcType, setCalcType] = useState('Adulte');
  const [calcDogs, setCalcDogs] = useState(1);
  const [droitEntree, setDroitEntree] = useState(false);

  const [formData, setFormData] = useState({
    lastPaymentDate: '',
    lastPaymentAmount: '',
    hasACMA: true // Par défaut à true puisque inclus
  });

  // LOGIQUE DU CALCULATEUR (Tarifs ACV 2026)
  const calculateTotal = () => {
    const prices: Record<string, number> = { 
      'Adulte': 100, 
      'Mineur': 50, 
      'Binôme': 150, 
      'Famille': 180, 
      'Bienfaiteur': 50 
    };
    
    const base = prices[calcType] || 100;
    const dogCost = calcDogs > 0 ? 50 + (Math.max(0, calcDogs - 1) * 25) : 0;
    const entryFee = droitEntree ? 50 : 0;
    
    return base + dogCost + entryFee;
  };

  const getValidity = (dateStr: string) => {
    if (!dateStr) return -999;
    const today = new Date();
    const paymentDate = new Date(dateStr);
    const expiryDate = new Date(paymentDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const processedMembers = members
    .filter(m => (m.firstName + ' ' + (m.name || '')).toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => getValidity(a.lastPaymentDate) - getValidity(b.lastPaymentDate));

  const openEditModal = (member: any) => {
    setSelectedMember(member);
    setFormData({
      lastPaymentDate: member.lastPaymentDate || new Date().toISOString().split('T')[0],
      lastPaymentAmount: member.lastPaymentAmount || '',
      hasACMA: member.hasACMA ?? true
    });
    setIsEditModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMember) {
      await updateMember(selectedMember.id, formData);
      setIsEditModalOpen(false);
      setSelectedMember(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Suivi des <span className="text-[#BC6C25]">Cotisations</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
            Adhésions & Licences ACMA 2026
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowCalc(!showCalc)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all ${
              showCalc ? 'bg-[#BC6C25] text-white' : 'bg-[#1B4332] text-white shadow-lg'
            }`}
          >
            <Calculator size={16} /> {showCalc ? 'Fermer Calculateur' : 'Simulateur de tarif'}
          </button>
          <div className={`flex items-center px-4 py-2 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'}`}>
            <input type="text" placeholder="Chercher..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-32" />
          </div>
        </div>
      </div>

      {showCalc && (
        <div className={`p-8 rounded-[40px] border animate-in slide-in-from-top duration-500 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#FDFBF7] border-white shadow-xl'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-[#BC6C25] tracking-widest italic">Adhésion</label>
              <select value={calcType} onChange={(e) => setCalcType(e.target.value)} className={`w-full p-3 rounded-xl border-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}>
                <option value="Adulte">Adulte (100€)</option>
                <option value="Mineur">Mineur (50€)</option>
                <option value="Binôme">Binôme (150€)</option>
                <option value="Famille">Famille (180€)</option>
                <option value="Bienfaiteur">Bienfaiteur (50€)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-[#BC6C25] tracking-widest italic">Nombre de chiens</label>
              <input type="number" min="0" value={calcDogs} onChange={(e) => setCalcDogs(parseInt(e.target.value) || 0)} className={`w-full p-3 rounded-xl border-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`} />
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => setDroitEntree(!droitEntree)}
                className={`flex items-center gap-3 group transition-all`}
              >
                <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center ${droitEntree ? 'bg-[#BC6C25] border-[#BC6C25] text-white shadow-md' : 'border-slate-200'}`}>
                  {droitEntree && <Check size={20} strokeWidth={3} />}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Droit d'entrée (50€)</span>
              </button>
              
              <div className="flex items-start gap-2 max-w-[180px]">
                <ShieldCheck size={14} className="text-[#BC6C25] shrink-0 mt-0.5" />
                <p className="text-[8px] font-bold text-slate-400 uppercase leading-tight italic">
                  La cotisation ACMA est inclue (15€/membre ou 18€/binôme)
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-widest italic">Total à encaisser</p>
              <p className={`text-4xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{calculateTotal()} €</p>
            </div>
          </div>
        </div>
      )}

      <div className={`rounded-[40px] border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl'}`}>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className={darkMode ? 'bg-slate-800/50' : 'bg-[#1B4332]/5'}>
                <th className="px-6 py-4 text-left text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">Membre</th>
                <th className="px-6 py-4 text-center text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">Paiement</th>
                <th className="px-6 py-4 text-center text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">Montant</th>
                <th className="px-6 py-4 text-center text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">ACMA</th>
                <th className="px-6 py-4 text-center text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">Validité</th>
                <th className="px-6 py-4 text-right text-[#BC6C25] text-[9px] font-black uppercase tracking-widest italic">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {processedMembers.map((m) => {
                const daysLeft = getValidity(m.lastPaymentDate);
                const isExpired = daysLeft <= 0;
                const isWarning = daysLeft > 0 && daysLeft <= 30;

                return (
                  <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-3">
                      <p className={`text-lg font-serif italic lowercase ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{m.firstName} {m.name}</p>
                    </td>
                    <td className="px-6 py-3 text-center text-[10px] font-bold text-slate-400">
                      {m.lastPaymentDate ? new Date(m.lastPaymentDate).toLocaleDateString('fr-FR') : '--/--/----'}
                    </td>
                    <td className="px-6 py-3 text-center text-[10px] font-black text-[#1B4332] dark:text-emerald-400">{m.lastPaymentAmount || '0'} €</td>
                    <td className="px-6 py-3 text-center">
                      <div className="flex justify-center">
                        <div className={`w-4 h-4 rounded border flex items-center justify-center ${m.hasACMA ? 'bg-[#BC6C25] border-[#BC6C25] text-white' : 'border-slate-200'}`}>
                          {m.hasACMA && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      {m.lastPaymentDate ? (
                        <span className={`text-[10px] font-black uppercase tracking-widest ${isExpired ? 'text-rose-500' : isWarning ? 'text-amber-500' : 'text-emerald-500'}`}>
                          {isExpired ? 'Expiré' : `${daysLeft}j`}
                        </span>
                      ) : <span className="text-slate-300">-</span>}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button onClick={() => openEditModal(m)} className="p-2 text-slate-300 hover:text-[#BC6C25] rounded-xl transition-all"><Edit3 size={16} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {isEditModalOpen && selectedMember && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#1B4332]/60 backdrop-blur-md">
          <div className={`w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden bg-white`}>
            <div className="p-8 flex items-center justify-between border-b">
              <h3 className="text-2xl font-serif italic text-[#1B4332]">Mise à jour Cotisation</h3>
              <button onClick={() => setIsEditModalOpen(false)}><X /></button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="text-center">
                <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-widest italic">Membre</p>
                <p className="text-xl font-serif italic text-[#1B4332]">{selectedMember.firstName} {selectedMember.name}</p>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 italic">Date</label>
                  <input type="date" value={formData.lastPaymentDate} onChange={e => setFormData({...formData, lastPaymentDate: e.target.value})} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 italic">Montant (€)</label>
                  <input type="number" value={formData.lastPaymentAmount} onChange={e => setFormData({...formData, lastPaymentAmount: e.target.value})} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-xs" />
                </div>
              </div>
              <button type="submit" className="w-full py-5 rounded-[2rem] bg-[#1B4332] text-white font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all flex items-center justify-center gap-2">
                <Save size={16} /> Enregistrer
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cotisations;
