import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowLeft, Phone, Mail, MapPin, ShieldCheck, Activity, FileText, Check, X, Dog as DogIcon } from 'lucide-react';

interface MemberDetailProps {
  memberId: string;
  onBack: () => void;
}

const MemberDetail: React.FC<MemberDetailProps> = ({ memberId, onBack }) => {
  const { members, dogs, darkMode, updateMember } = useStore();
  const m = members.find(member => member.id === memberId);
  const memberDogs = dogs.filter(d => d.ownerId === m?.id || d.ownerName?.includes(m?.name || ''));

  if (!m) return null;

  const toggleDoc = (field: string, current: string) => {
    updateMember(m.id, { [field]: current === 'oui' ? 'non' : 'oui' });
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* BOUTON RETOUR HARMONISÉ */}
      <button 
        onClick={onBack} 
        className="group flex items-center gap-3 text-slate-400 hover:text-[#1B4332] transition-all text-[10px] font-black uppercase tracking-[0.3em]"
      >
        <div className="p-2 rounded-full group-hover:bg-[#1B4332]/5 transition-all">
          <ArrowLeft size={16} />
        </div>
        Retour à la liste
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* COLONNE GAUCHE : IDENTITÉ & CONTACT */}
        <div className={`p-10 rounded-[40px] border transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-2xl shadow-emerald-900/5'
        }`}>
          <div className="w-32 h-32 bg-[#FDFBF7] rounded-[32px] mb-8 flex items-center justify-center text-[#DDA15E] border-2 border-[#DDA15E]/10 shadow-inner">
            <span className="text-4xl font-serif italic">{m.name.charAt(0)}{m.firstName.charAt(0)}</span>
          </div>
          
          <h2 className={`text-4xl font-serif italic tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            {m.name}
