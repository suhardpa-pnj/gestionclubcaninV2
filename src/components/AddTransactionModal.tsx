import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { X, Save, Paperclip, FileUp, AlertCircle } from 'lucide-react';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({ isOpen, onClose }) => {
  const { addTransaction } = useStore();
  
  // Gestion du fichier justificatif
  const [file, setFile] = useState<File | null>(null);

  // Liste des catégories professionnelles pour un club
  const categories = [
    'ACMA', 
    'Bricolage & Entretien', 
    'Électricité', 
    'Eau', 
    'Assurances', 
    'Achats Boutique', 
    'Matériel Sportif', 
    'Adhésion', 
    'Événementiel', 
    'Autre'
  ];

  // État local du formulaire
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    label: '',
    category: 'Autre' as any,
    type: 'Débit' as 'Crédit' | 'Débit',
    amount: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.label) return;

    addTransaction({
      id: `t${Date.now()}`,
      date: formData.date,
      label: formData.label,
      category: formData.category,
      type: formData.type,
      amount: parseFloat(formData.amount),
      receipt: file ? file.name : undefined // On stocke le nom du fichier
    });
    
    // Réinitialisation et fermeture
    setFile(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* EN-TÊTE */}
        <div className="bg-slate-50 px-10 py-8 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white">
              <FileUp size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase italic tracking-tighter text-slate-800">Saisie Comptable</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nouvelle écriture au journal</p>
            </div>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {/* FORMULAIRE */}
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          
          {/* TYPE D'OPÉRATION (BOUTONS) */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: 'Débit'})}
              className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                formData.type === 'Débit' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Dépense (Débit)
            </button>
            <button 
              type="button"
              onClick={() => setFormData({...formData, type: 'Crédit'})}
              className={`flex-1 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all ${
                formData.type === 'Crédit' ? 'bg-emerald-500 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Recette (Crédit)
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="block md:col-span-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Libellé de l'opération</span>
              <input 
                required 
                type="text" 
                placeholder="Ex: Facture Leroy Merlin, Vente Croquettes..." 
                className="mt-1 w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-emerald-500/20 rounded-2xl text-sm font-bold outline-none transition-all"
                value={formData.label}
                onChange={e => setFormData({...formData, label: e.target.value})}
              />
            </label>

            <label className="block">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Catégorie</span>
              <select 
                className="mt-1 w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none cursor-pointer"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as any})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Montant (€)</span>
              <input 
                required 
                type="number" 
                step="0.01"
                placeholder="0.00"
                className="mt-1 w-full px-6 py-4 bg-slate-50 border-none rounded-2xl text-sm font-bold outline-none"
                value={formData.amount}
                onChange={e => setFormData({...formData, amount: e.target.value})}
              />
            </label>
          </div>

          {/* ZONE DE TÉLÉCHARGEMENT JUSTIFICATIF */}
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Justificatif (PDF, Photo)</span>
            <div className={`relative border-2 border-dashed rounded-[2rem] p-8 transition-all flex flex-col items-center justify-center group ${
              file ? 'border-emerald-500 bg-emerald-50/50' : 'border-slate-200 hover:border-slate-300 bg-slate-50/30'
            }`}>
              <input 
                type="file" 
                accept="image/*,.pdf" 
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                onChange={e => setFile(e.target.files?.[0] || null)}
              />
              
              {file ? (
                <div className="flex items-center space-x-3 text-emerald-600 animate-in fade-in slide-in-from-bottom-2">
                  <Paperclip size={24} />
                  <div className="text-left">
                    <p className="text-xs font-black uppercase leading-none mb-1">Fichier joint</p>
                    <p className="text-[10px] font-bold opacity-70 truncate max-w-[200px]">{file.name}</p>
                  </div>
                </div>
              ) : (
                <>
                  <Paperclip size={32} className="text-slate-300 mb-3 group-hover:text-slate-400 transition-colors" />
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                    Cliquez ou glissez le document
                  </p>
                </>
              )}
            </div>
          </div>

          {/* BOUTON DE VALIDATION */}
          <button 
            type="submit" 
            className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center space-x-3 hover:bg-emerald-500 transition-all shadow-xl shadow-slate-200 hover:shadow-emerald-100"
          >
            <Save size={20} />
            <span>Enregistrer l'opération</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
