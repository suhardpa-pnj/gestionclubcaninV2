import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowLeft, Camera, Check, X, Dog } from 'lucide-react';

const MemberDetail = ({ memberId, onBack }: any) => {
  const { members, dogs, darkMode, updateMember, uploadMemberPhoto } = useStore();
  const m = members.find(x => x.id === memberId);
  const mDogs = dogs.filter(d => d.ownerId === m?.id);

  if (!m) return null;

  return (
    <div className="space-y-10">
      <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 hover:text-[#1B4332] transition-colors"><ArrowLeft size={14}/> Retour</button>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* COLONNE GAUCHE : MES CHIENS */}
        <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-[#1E2521] border-slate-700' : 'bg-white shadow-xl border-emerald-50'}`}>
          <h3 className="text-[10px] font-black uppercase tracking-widest text-[#BC6C25] mb-8 italic">{mDogs.length > 1 ? 'Mes Chiens' : 'Mon Chien'}</h3>
          <div className="space-y-4">
            {mDogs.map(d => (
              <div key={d.id} className="flex items-center gap-6 p-6 bg-[#FDFBF7] rounded-[32px] border border-emerald-50">
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shrink-0 shadow-sm">
                   {d.photo ? <img src={d.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-200"><Dog/></div>}
                </div>
                <div>
                  <p className="text-3xl font-serif italic text-[#1B4332]">{d.name}</p>
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">{d.breed}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLONNE DROITE : INFOS & DOSSIER */}
        <div className="space-y-10">
          <div className={`p-10 rounded-[40px] border relative ${darkMode ? 'bg-[#1E2521] border-slate-700' : 'bg-white shadow-xl border-emerald-50'}`}>
            <div className="flex items-center gap-8 mb-10">
              <div className="relative group">
                <div className="w-24 h-24 bg-emerald-50 rounded-[32px] overflow-hidden shadow-inner">
                  {m.photo ? <img src={m.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#DDA15E] text-2xl font-serif">{m.name.charAt(0)}</div>}
                </div>
                <label className="absolute -bottom-2 -right-2 p-2 bg-[#1B4332] text-white rounded-xl cursor-pointer shadow-lg hover:bg-[#BC6C25] transition-all"><Camera size={14}/><input type="file" className="hidden" onChange={(e)=>e.target.files?.[0] && uploadMemberPhoto(m.id, e.target.files[0])}/></label>
              </div>
              <div>
                <h2 className={`text-3xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{m.name} {m.firstName}</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 italic">ACMA: {m.id}</p>
              </div>
            </div>

            <h3 className="text-[10px] font-black uppercase tracking-widest text-[#BC6C25] mb-6 italic">Dossier Administratif</h3>
            <div className="space-y-3">
              <DocRow label="Assurance Responsabilité" status={m.docAssurance} onClick={()=>updateMember(m.id, {docAssurance: m.docAssurance === 'oui' ? 'non' : 'oui'})} />
              <DocRow label="Protocole ACV signé" status={m.docProtocole} onClick={()=>updateMember(m.id, {docProtocole: m.docProtocole === 'oui' ? 'non' : 'oui'})} />
              <DocRow label="Adhésion 2026" status={m.docACMA} onClick={()=>updateMember(m.id, {docACMA: m.docACMA === 'oui' ? 'non' : 'oui'})} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DocRow = ({ label, status, onClick }: any) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl hover:bg-slate-100 transition-all border border-transparent hover:border-emerald-50">
    <span className="text-[11px] font-black uppercase text-[#1B4332] tracking-tight">{label}</span>
    <div className={`p-1.5 rounded-lg ${status === 'oui' ? 'bg-emerald-500 text-white' : 'bg-red-50 text-red-400'}`}>
      {status === 'oui' ? <Check size={14}/> : <X size={14}/>}
    </div>
  </button>
);
export default MemberDetail;
