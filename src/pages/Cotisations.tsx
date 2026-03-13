import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  Check, X, Edit3, Save, Calendar, 
  Euro, ShieldCheck, Calculator, ChevronDown, ChevronUp 
} from 'lucide-react';

const Cotisations = () => {
  const { members, darkMode, updateMember } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showCalc, setShowCalc] = useState(false); // État pour afficher/masquer le calculateur
  const [selectedMember, setSelectedMember] = useState<any>(null);
  
  // États pour le calculateur
  const [calcType, setCalcType] = useState('Solo');
  const [calcDogs, setCalcDogs] = useState(1);
  const [calcACMA, setCalcACMA] = useState(false);

  const [formData, setFormData] = useState({
    lastPaymentDate: '',
    lastPaymentAmount: '',
    hasACMA: false
  });

  // Logique de calcul (à ajuster selon tes tarifs réels)
  const calculateTotal = () => {
    let base = calcType === 'Solo' ? 120 : calcType === 'Couple' ? 180 : 80;
    let extraDogs = Math.max(0, calcDogs - 1) * 30;
    let acma = calcACMA ? 35 : 0;
    return base + extraDogs + acma;
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
      hasACMA: member.hasACMA || false
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
      {/* HEADER */}
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
            <input 
              type="text" 
              placeholder="Chercher..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none text-[10px] font-black uppercase tracking-widest w-32"
            />
          </div>
        </div>
      </div>

      {/* --- BLOC CALCULATEUR RE-INTÉGRÉ --- */}
      {showCalc && (
        <div className={`p-8 rounded-[40px] border animate-in slide-in-from-top duration-500 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#FDFBF7] border-white shadow-xl shadow-emerald-900/5'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-[#BC6C25] tracking-widest italic">Type d'adhésion</label>
              <select 
                value={calcType} 
                onChange={(e) => setCalcType(e.target.value)}
                className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}
              >
                <option value="Solo">Solo (Adulte)</option>
                <option value="Couple">Couple</option>
                <option value="Jeune">Jeune / Réduit</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase text-[#BC6C25] tracking-widest italic">Nombre de chiens</label>
              <input 
                type="number" 
                value={calcDogs} 
                onChange={(e) => setCalcDogs(parseInt(e.target.value))}
                className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}
              />
            </div>

            <div className="flex items-center gap-3 pt-4">
              <button 
                onClick={() => setCalcACMA(!calcACMA)}
                className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all ${
                  calcACMA ? 'bg-[#BC6C25] border-[#BC6C25] text-white shadow-md' : 'border-slate-200'
                }`}
              >
                {calcACMA && <Check size={20} strokeWidth={3} />}
              </button>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Licence ACMA</span>
            </div>

            <div className="text-right">
              <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-widest italic">Total estimé</p>
              <p className={`text-4xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                {calculateTotal()} €
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TABLEAU DE SUIVI (Resserré) */}
      <div className={`rounded-[40px] border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
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
                  <tr key={m.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-3">
                      <p className={`text-lg font-serif italic lowercase ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                        {m.firstName} {m.name}
                      </p>
                    </td>
                    <td className="px-6 py-3 text-center text-[10px] font-bold text-slate-400">
                      {m.lastPaymentDate ? new Date(m.lastPaymentDate).toLocaleDateString('fr-FR') : '--/--/----'}
                    </td>
                    <td className="px-6 py-3 text-center text-[10px] font-black text-[#1B4332] dark:text-emerald-400">
                      {m.lastPaymentAmount || '0'} €
                    </td>
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
                      <button onClick={() => openEditModal(m)} className="p-2 text-slate-300 hover:text-[#BC6C25] hover:bg-slate-50 rounded-xl transition-all">
                        <Edit3 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE D'ÉDITION (inchangée) */}
      {isEditModalOpen && selectedMember && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#1B4332]/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className={`w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'}`}>
            <div className="p-8 flex items-center justify-between border-b border-slate-50">
              <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Mise à jour Cotisation</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 space-y-6">
              <div className="text-center mb-4">
                <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-widest italic">Membre concerné</p>
                <p className={`text-xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{selectedMember.firstName} {selectedMember.name}</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest italic">Date du paiement</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC6C25]" size={16} />
                    <input type="date" value={formData.lastPaymentDate} onChange={e => setFormData({...formData, lastPaymentDate: e.target.value})} className={`w-full pl-12 pr-4 py-4 rounded-2xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest italic">Montant encaissé (€)</label>
                  <div className="relative">
                    <Euro className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC6C25]" size={16} />
                    <input type="number" placeholder="0.00" value={formData.lastPaymentAmount} onChange={e => setFormData({...formData, lastPaymentAmount: e.target.value})} className={`w-full pl-12 pr-4 py-4 rounded-2xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} />
                  </div>
                </div>

                <button type="button" onClick={() => setFormData({...formData, hasACMA: !formData.hasACMA})} className={`w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all ${formData.hasACMA ? 'border-[#BC6C25] bg-[#BC6C25]/5' : 'border-slate-100 bg-transparent'}`}>
                  <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className={formData.hasACMA ? 'text-[#BC6C25]' : 'text-slate-300'} />
                    <span className={`text-[10px] font-black uppercase tracking-widest ${formData.hasACMA ? 'text-[#BC6C25]' : 'text-slate-400'}`}>Licence ACMA</span>
                  </div>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${formData.hasACMA ? 'bg-[#BC6C25] text-white' : 'bg-slate-100'}`}>
                    {formData.hasACMA && <Check size={14} strokeWidth={3} />}
                  </div>
                </button>
              </div>

              <button type="submit" className="w-full py-5 rounded-[2rem] bg-[#1B4332] text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all flex items-center justify-center gap-2">
                <Save size={16} /> Enregistrer l'encaissement
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cotisations;
