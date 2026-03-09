import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowLeft, Camera, Check, X } from 'lucide-react';

const MemberDetail = ({ memberId, onBack }: any) => {
  const { members, dogs, darkMode, updateMember, uploadMemberPhoto } = useStore();
  const m = members.find(x => x.id === memberId);
  const mDogs = dogs.filter(d => d.ownerId === m?.id);

  if (!m) return null;

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400"><ArrowLeft size={14}/> Retour</button>
      
      <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-[#1A1F1C] border-slate-700' : 'bg-white border-emerald-50 shadow-xl'}`}>
        <div className="flex items-center gap-8 mb-10 border-b pb-10 border-slate-50/5">
          <div className="relative">
            <div className="w-24 h-24 bg-slate-50 rounded-[32px] overflow-hidden border border-emerald-50">
              {m.photo ? <img src={m.photo} className="w-full h-full object-cover" /> : <User className="w-full h-full p-6 text-slate-200"/>}
            </div>
            <label className="absolute -bottom-2 -right-2 p-2 bg-[#1B4332] text-white rounded-xl cursor-pointer shadow-lg hover:bg-[#BC6C25] transition-all">
              <Camera size={14}/><input type="file" className="hidden" onChange={(e)=>e.target.files?.[0] && uploadMemberPhoto(m.id, e.target.files[0])}/>
            </label>
          </div>
          <div>
            <h2 className={`text-4xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{m.name} {m.firstName}</h2>
            <div className="mt-2 space-y-1">
              {mDogs.map(d => (
                <p key={d.id} className="text-[#BC6C25] text-2xl font-serif italic">Compagnon : {d.name} ({d.breed || 'NC'})</p>
              ))}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">N° ADHÉRENT ACMA : {m.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DocBtn label="Assurance Responsabilité" status={m.docAssurance} onClick={()=>updateMember(m.id, {docAssurance: m.docAssurance === 'oui' ? 'non' : 'oui'})} />
          <DocBtn label="Protocole Signé" status={m.docProtocole} onClick={()=>updateMember(m.id, {docProtocole: m.docProtocole === 'oui' ? 'non' : 'oui'})} />
          <DocBtn label="Adhésion 2026" status={m.docACMA} onClick={()=>updateMember(m.id, {docACMA: m.docACMA === 'oui' ? 'non' : 'oui'})} />
        </div>
      </div>
    </div>
  );
};

const DocBtn = ({ label, status, onClick }: any) => (
  <button onClick={onClick} className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${status === 'oui' ? 'bg-emerald-50 border-emerald-100 text-[#1B4332]' : 'bg-slate-50 border-transparent text-slate-400'}`}>
    <span className="text-[11px] font-black uppercase tracking-tight">{label}</span>
    <div className={`p-1.5 rounded-lg ${status === 'oui' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-white'}`}>{status === 'oui' ? <Check size={16}/> : <X size={16}/>}</div>
  </button>
);
export default MemberDetail;
