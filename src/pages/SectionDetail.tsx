import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowLeft, Users } from 'lucide-react';

interface SectionDetailProps {
  sectionId: string;
  onBack: () => void;
}

const SectionDetail: React.FC<SectionDetailProps> = ({ sectionId, onBack }) => {
  const { members } = useStore();
  
  // On filtre les membres selon l'activité (Ring, Agility, Educ...)
  const sectionMembers = members.filter(m => 
    m.Activités && m.Activités.toLowerCase().includes(sectionId.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-black uppercase text-[10px] tracking-widest transition-all">
        <ArrowLeft size={16} /> Retour
      </button>

      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-800">Section {sectionId}</h2>
        <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-3">
          <Users className="text-emerald-500" size={20} />
          <span className="font-black italic text-xl">{sectionMembers.length}</span>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Membre</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Contact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sectionMembers.map((m) => (
              <tr key={m.id}>
                <td className="p-6 font-black text-slate-800 uppercase italic">{m.name} {m.firstName}</td>
                <td className="p-6 text-xs font-bold text-slate-500">{m.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectionDetail;
