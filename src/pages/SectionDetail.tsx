import React from 'react';
import { useStore } from '../store/useStore';
import { ArrowLeft, Users, Calendar } from 'lucide-react';

interface SectionDetailProps {
  sectionId: string;
  onBack: () => void;
}

const SectionDetail: React.FC<SectionDetailProps> = ({ sectionId, onBack }) => {
  const { members } = useStore();
  
  // On filtre les membres qui pratiquent cette activité
  const sectionMembers = members.filter(m => 
    m.Activités?.toLowerCase().includes(sectionId.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-emerald-600 font-black uppercase text-[10px] tracking-widest transition-all"
      >
        <ArrowLeft size={16} /> Retour aux sections
      </button>

      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-800">
          Section {sectionId}
        </h2>
        <div className="flex gap-4">
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 flex items-center gap-3">
            <Users className="text-emerald-500" size={20} />
            <span className="font-black italic text-xl">{sectionMembers.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Conducteur</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Contact</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sectionMembers.length > 0 ? (
              sectionMembers.map((member) => (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-6">
                    <p className="font-black text-slate-800 uppercase italic">{member.name} {member.firstName}</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase">ACMA: {member.id}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-xs font-bold text-slate-500">{member.phone}</p>
                    <p className="text-[10px] text-slate-400">{member.email}</p>
                  </td>
                  <td className="p-6 text-right">
                    <button className="text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-slate-900">
                      Voir Fiche
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="p-12 text-center text-slate-400 italic text-xs font-bold uppercase">
                  Aucun membre inscrit dans cette section pour 2026
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SectionDetail;
