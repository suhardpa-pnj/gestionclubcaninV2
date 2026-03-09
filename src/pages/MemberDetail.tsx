import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowLeft, Phone, Mail, MapPin, Shield, Check, X, Dog as DogIcon } from 'lucide-react';

interface MemberDetailProps {
  memberId: string;
  onBack: () => void;
}

const MemberDetail: React.FC<MemberDetailProps> = ({ memberId, onBack }) => {
  const { members, dogs, darkMode, updateMember } = useStore();
  const m = members.find(member => member.id === memberId);
  const memberDogs = dogs.filter(d => d.ownerId === m?.id);

  if (!m) return null;

  const toggleDoc = (field: string, current: string) => {
    updateMember(m.id, { [field]: current === 'oui' ? 'non' : 'oui' });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-[#1B4332] transition-colors text-[10px] font-black uppercase tracking-widest">
        <ArrowLeft size={16} /> Retour à la liste
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLONNE GAUCHE : PROFIL */}
        <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
          <div className="w-32 h-32 bg-[#FDFBF7] rounded-[32px] mb-6 flex items-center justify-center text-[#DDA15E] border-2 border-[#DDA15E]/10">
            <span className="text-4xl font-serif italic">{m.name.charAt(0)}{m.firstName.charAt(0)}</span>
          </div>
          <h2 className={`text-3xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{m.name} {m.firstName}</h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-widest mt-1">ID: {m.id}</p>
          
          <div className="mt-10 space-y-6">
            <ContactItem icon={<Phone size={18}/>} label="Téléphone" value={m.phone} isLink={`tel:${m.phone}`} />
            <ContactItem icon={<Mail size={18}/>} label="Email" value={m.email} isLink={`mailto:${m.email}`} />
            <ContactItem icon={<MapPin size={18}/>} label="Adresse" value={`${m.address}, ${m.cp} ${m.city}`} />
          </div>
        </div>

        {/* COLONNE CENTRE : DOCUMENTS & STATUT */}
        <div className="space-y-6">
          <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Pièces Justificatives</h3>
            <div className="space-y-4">
              <DocRow label="Assurance Responsabilité" status={m.docAssurance} onClick={() => toggleDoc('docAssurance', m.docAssurance)} />
              <DocRow label="Vaccins à jour" status={m.docVaccin} onClick={() => toggleDoc('docVaccin', m.docVaccin)} />
              <DocRow label="Protocole signé" status={m.docProtocole} onClick={() => toggleDoc('docProtocole', m.docProtocole)} />
              <DocRow label="Cotisation ACMA" status={m.docACMA} onClick={() => toggleDoc('docACMA', m.docACMA)} />
            </div>
          </div>
        </div>

        {/* COLONNE DROITE : SES CHIENS */}
        <div className="space-y-6">
          <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Ses Chiens</h3>
            <div className="space-y-4">
              {memberDogs.map(dog => (
                <div key={dog.id} className="flex items-center gap-4 p-4 bg-[#FDFBF7] rounded-3xl border border-emerald-50">
                  <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#BC6C25]">
                    {dog.photo ? <img src={dog.photo} className="w-full h-full object-cover rounded-2xl" /> : <DogIcon size={20}/>}
                  </div>
                  <div>
                    <p className="text-sm font-black uppercase italic text-[#1B4332]">{dog.name}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">{dog.breed}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, label, value, isLink }: any) => (
  <div className="flex items-center gap-4">
    <div className="text-slate-300">{icon}</div>
    <div>
      <p className="text-[8px] font-black uppercase text-slate-400 tracking-tighter">{label}</p>
      {isLink ? (
        <a href={isLink} className="text-xs font-bold text-[#1B4332] hover:underline">{value || 'Non renseigné'}</a>
      ) : (
        <p className="text-xs font-bold text-[#1B4332]">{value || 'Non renseigné'}</p>
      )}
    </div>
  </div>
);

const DocRow = ({ label, status, onClick }: any) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-emerald-50">
    <span className="text-[10px] font-black uppercase text-slate-600">{label}</span>
    {status === 'oui' ? (
      <div className="bg-emerald-500 text-white p-1 rounded-lg"><Check size={14} /></div>
    ) : (
      <div className="bg-red-50 text-red-400 p-1 rounded-lg"><X size={14} /></div>
    )}
  </button>
);

export default MemberDetail;
