import React from 'react';
import { GraduationCap, Target, Trophy, Trees } from 'lucide-react';

interface SectionsProps {
  onSelectSection: (id: string) => void;
}

const Sections: React.FC<SectionsProps> = ({ onSelectSection }) => {
  const sections = [
    { id: 'Ring', icon: <Target />, color: 'bg-red-500', desc: 'Morsure et obéissance' },
    { id: 'Agility', icon: <Trophy />, color: 'bg-blue-500', desc: 'Parcours d\'obstacles' },
    { id: 'Education', icon: <GraduationCap />, color: 'bg-emerald-500', desc: 'Bases et sociabilisation' },
    { id: 'Loisirs', icon: <Trees />, color: 'bg-amber-500', desc: 'Activités détente' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800">Espaces Sections</h2>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">Cliquez sur une discipline pour voir les membres</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => onSelectSection(sec.id)}
            className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center gap-6 hover:scale-[1.02] transition-all text-left group"
          >
            <div className={`w-20 h-20 ${sec.color} rounded-3xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform`}>
              {React.cloneElement(sec.icon as React.ReactElement, { size: 32 })}
            </div>
            <div>
              <p className="text-xl font-black text-slate-800 uppercase italic tracking-tight">{sec.id}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sec.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sections;
