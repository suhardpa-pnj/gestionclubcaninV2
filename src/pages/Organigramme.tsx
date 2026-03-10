import React from 'react';
import { useStore } from '../store/useStore';
import { User, ShieldCheck, Star, GraduationCap } from 'lucide-react';

const Organigramme = () => {
  const { darkMode } = useStore();

  const categories = [
    { 
      id: 'BUREAU', 
      label: 'Le Bureau', 
      icon: <ShieldCheck size={16} />,
      members: [
        { role: 'Président', name: 'À définir', icon: <Star /> },
        { role: 'Secrétaire', name: 'À définir', icon: <User /> },
        { role: 'Trésorier', name: 'À définir', icon: <User /> },
      ]
    },
    { 
      id: 'SECTION', 
      label: 'Responsables de Section', 
      icon: <Star size={16} />,
      members: [
        { role: 'Responsable Ring', name: 'À définir' },
        { role: 'Responsable Agility', name: 'À définir' },
        { role: 'Responsable Obéissance', name: 'À définir' },
      ]
    },
    { 
      id: 'MONITEUR', 
      label: 'Les Moniteurs', 
      icon: <GraduationCap size={16} />,
      members: [
        { role: 'Moniteur Principal', name: 'À définir' },
        { role: 'Aide Moniteur', name: 'À définir' },
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div>
        <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
          L'<span className="text-[#BC6C25]">Organigramme</span>
        </h2>
        <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
          L'équipe de l'Amicale Canine Vernoise
        </p>
      </div>

      {categories.map((cat) => (
        <div key={cat.id} className="space-y-6">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-[#1B4332]/5 text-[#1B4332]'}`}>
              {cat.icon}
              {cat.label}
            </div>
            <div className={`h-px flex-1 ${darkMode ? 'bg-slate-800' : 'bg-emerald-100'}`}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.members.map((m, idx) => (
              <div key={idx} className={`group p-8 rounded-[40px] border transition-all duration-500 hover:-translate-y-2 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
              }`}>
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center transition-colors ${
                    darkMode ? 'bg-slate-800 text-slate-500' : 'bg-[#FDFBF7] text-[#DDA15E]/30 group-hover:bg-[#BC6C25] group-hover:text-white'
                  }`}>
                    <User size={32} strokeWidth={1} />
                  </div>
                  <div>
                    <p className="text-[#BC6C25] text-[9px] font-black uppercase tracking-widest mb-1 italic">{m.role}</p>
                    <h3 className={`text-xl font-serif italic leading-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{m.name}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Organigramme;
