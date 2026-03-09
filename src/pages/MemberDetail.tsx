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
      {/* BOUTON RETOUR */}
      <button 
        onClick={onBack} 
        className="group flex items-center gap-3 text-slate-400 hover:text-[#1B4332] transition-all text-[10px] font-black uppercase tracking-[0.3em]"
      >
        <ArrowLeft size={16} />
        <span>Retour à la liste</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* COLONNE GAUCHE : IDENTITÉ */}
        <div className={`p-10 rounded-[40px] border transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-2xl shadow-emerald-900/5'
        }`}>
          <div className="w-24 h-24 bg-[#FDFBF7] rounded-[32px] mb-8 flex items-center justify-center text-[#DDA15E] border-2 border-[#DDA15E]/10">
            <span className="text-3xl font-serif italic">{m.name.charAt(0)}{m.firstName.charAt(0)}</span>
          </div>
          
          <h2 className={`text-4xl font-serif italic tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            {m.name}
            <span className="block text-[#BC6C25]">{m.firstName}</span>
          </h2>
          
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300 mt-4 italic">
            Adhérent • {m.id}
          </p>
          
          <div className="mt-12 space-y-8">
            <ContactItem icon={<Phone size={18}/>} label="Téléphone" value={m.phone} isLink={`tel:${m.phone}`} darkMode={darkMode} />
            <ContactItem icon={<Mail size={18}/>} label="Email" value={m.email} isLink={`mailto:${m.email}`} darkMode={darkMode} />
            <ContactItem icon={<MapPin size={18}/>} label="Localisation" value={`${m.address || ''} ${m.city || ''}`} darkMode={darkMode} />
          </div>
        </div>

        {/* COLONNE CENTRE : DOCUMENTS */}
        <div className="space-y-8">
          <div className={`p-10 rounded-[40px] border ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-2xl shadow-emerald-900/5'
          }`}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BC6C25] mb-10 italic">Dossier Administratif</h3>
            
            <div className="space-y-4">
              <DocToggle label="Assurance" status={m.docAssurance} icon={<ShieldCheck size={18}/>} onClick={() => toggleDoc('docAssurance', m.docAssurance)} darkMode={darkMode} />
              <DocToggle label="Vaccins" status={m.docVaccin} icon={<Activity size={18}/>} onClick={() => toggleDoc('docVaccin', m.docVaccin)} darkMode={darkMode} />
              <DocToggle label="Protocole" status={m.docProtocole} icon={<FileText size={18}/>} onClick={() => toggleDoc('docProtocole', m.docProtocole)} darkMode={darkMode} />
              <DocToggle label="Cotisation" status={m.docACMA} icon={<Check size={18}/>} onClick={() => toggleDoc('docACMA', m.docACMA)} darkMode={darkMode} />
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : CHIENS */}
        <div className="space-y-8">
          <div className={`p-10 rounded-[40px] border ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-2xl shadow-emerald-900/5'
          }`}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#BC6C25] mb-10 italic">La Meute</h3>
            
            <div className="space-y-6">
              {memberDogs.length > 0 ? memberDogs.map(dog => (
                <div key={dog.id} className="flex items-center gap-5 p-5 bg-[#FDFBF7] rounded-[28px] border border-emerald-50">
                  <div className="w-16 h-16 rounded-[20px] bg-white flex items-center justify-center text-[#BC6C25] overflow-hidden border border-emerald-50">
                    {dog.photo ? <img src={dog.photo} className="w-full h-full object-cover" alt="" /> : <DogIcon size={24} />}
                  </div>
                  <div>
                    <p className="text-xl font-serif italic text-[#1B4332] leading-none">{dog.name}</p>
                    <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mt-2">{dog.breed || 'Race NC'}</p>
                  </div>
                </div>
              )) : (
                <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest italic text-center py-10">Aucun chien rattaché</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// COMPOSANTS INTERNES
const ContactItem = ({ icon, label, value, isLink, darkMode }: any) => (
  <div className="flex items-center gap-5">
    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-[#1B4332]/5 text-[#1B4332]'}`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[8px] font-black uppercase text-slate-400 tracking-[0.2em] mb-1">{label}</p>
      {isLink ? (
        <a href={isLink} className={`text-xs font-bold truncate block ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{value || 'NC'}</a>
      ) : (
        <p className={`text-xs font-bold truncate ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{value || 'NC'}</p>
      )}
    </div>
  </div>
);

const DocToggle = ({ label, status, icon, onClick, darkMode }: any) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center justify-between p-5 rounded-[24px] border transition-all ${
      status === 'oui' 
        ? (darkMode ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-emerald-50 border-emerald-100') 
        : (darkMode ? 'bg-slate-800 border-transparent text-slate-500' : 'bg-slate-50 border-transparent text-slate-400')
    }`}
  >
    <div className="flex items-center gap-4">
      <div className={status === 'oui' ? 'text-emerald-500' : 'text-slate-300'}>{icon}</div>
      <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'oui' ? (darkMode ? 'text-emerald-400' : 'text-[#1B4332]') : ''}`}>{label}</span>
    </div>
    <div className={`p-1.5 rounded-lg ${status === 'oui' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-white'}`}>
      {status === 'oui' ? <Check size={14} /> : <X size={14} />}
    </div>
  </button>
);

export default MemberDetail;
