import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { X, Save, UserPlus } from 'lucide-react';

interface Props { isOpen: boolean; onClose: () => void; }

const AddMemberModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addMember } = useStore();
  const [formData, setFormData] = useState({
    name: '', firstName: '', email: '', phone: '',
    address: '', city: '', zipCode: '', membershipType: 'Adulte' as any,
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMember({
      ...formData,
      id: `m${Date.now()}`,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Actif',
      lastPayment: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden">
        <div className="bg-slate-50 px-10 py-8 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white"><UserPlus size={24} /></div>
            <h3 className="text-xl font-black uppercase italic tracking-tighter">Nouvel Adhérent</h3>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-slate-100 rounded-2xl"><X size={20} /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-10 grid grid-cols-2 gap-6">
          <input placeholder="Nom" required className="p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={e => setFormData({...formData, name: e.target.value})} />
          <input placeholder="Prénom" required className="p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={e => setFormData({...formData, firstName: e.target.value})} />
          <input placeholder="Email" type="email" required className="p-4 bg-slate-50 rounded-2xl border-none font-bold col-span-2 outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input placeholder="Téléphone" className="p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={e => setFormData({...formData, phone: e.target.value})} />
          <select className="p-4 bg-slate-50 rounded-2xl border-none font-bold outline-none" onChange={e => setFormData({...formData, membershipType: e.target.value as any})}>
            <option value="Adulte">Adulte (60€)</option>
            <option value="Couple">Couple</option>
            <option value="Famille">Famille</option>
            <option value="Mineur">Mineur</option>
          </select>
          <button type="submit" className="col-span-2 mt-6 py-5 bg-emerald-500 text-white rounded-[2rem] font-black uppercase tracking-widest shadow-xl hover:bg-slate-900 transition-all">
            Valider l'adhésion
          </button>
        </form>
      </div>
    </div>
  );
};
export default AddMemberModal;
