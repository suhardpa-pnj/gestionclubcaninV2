import React from 'react';
import { useStore } from '../store/useStore';
import { 
  User, ShieldCheck, Star, GraduationCap, 
  Edit3 
} from 'lucide-react';

const Organigramme = () => {
  const { darkMode } = useStore();

  // Structure des données organisée par binômes ou individus
  const bureau = [
    { 
      role: 'Présidence', 
      principal: { name: 'À définir', role: 'Président' },
      adjoint: { name: 'À définir', role: 'Adjoint' }
    },
    { 
      role: 'Secrétariat', 
      principal: { name: 'À définir', role: 'Secrétaire' },
      adjoint: { name: 'À définir', role: 'Adjoint' }
    },
    { 
      role: 'Trésorerie', 
      principal: { name: 'À définir', role: 'Trésorier' },
      adjoint: { name: 'À définir', role: 'Adjoint' }
    }
  ];

  const membresBureau = [
    { name: 'À définir', role: 'Membre du Bureau', isSimpleMember: true },
    { name: 'À définir', role: 'Membre du Bureau', isSimpleMember: true },
  ];

  const sections = [
    { role: 'Responsable Ring', name: 'À définir' },
    { role: 'Responsable Agility', name: 'À définir' },
    { role: 'Responsable Obéissance', name: 'À définir' },
    { role: 'Responsable École du Chiot', name: 'À définir' },
    { role: 'Responsable Éducation', name: 'À définir' },
    { role: 'Responsable Hoopers', name: 'À définir' },
  ];

  const moniteurs = [
    { role: 'Moniteur Principal', name: 'À définir' },
    { role: 'Moniteur', name: 'À définir' },
    { role: 'Moniteur', name: 'À définir' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      
      {/* HEADER AVEC BOUTON ÉDITION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            L'<span className="text-[#BC6C25]">Organigramme</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
            L'équipe de l'Amicale Canine Vernoise
          </p>
        </div>

        <button className="flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase bg-[#BC6C25] text-white shadow-lg hover:scale-105 transition-all">
          <Edit3 size={16} /> Édition Bureau
        </button>
      </div>

      {/* SECTION 1 : LE BUREAU (BINÔMES) */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-3 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-[#1B4332]/5 text-[#1B4332]'}`}>
            <ShieldCheck size={16} /> Le Bureau
          </div>
          <div className={`h-px flex-1 ${darkMode ? 'bg-slate-800' : 'bg-emerald-100'}`}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {bureau.map((pair, idx) => (
            <div key={idx} className={`relative p-6 rounded-[40px] border flex items-center gap-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
              <div className="absolute top-6 right-8">
                <span className="text-[7px] font-black text-slate-300 uppercase tracking-[0.2em]">ACV / ACMA</span>
              </div>

              {/* DUO DE PHOTOS (Titulaire + Adjoint) */}
              <div className="flex items-end shrink-0">
                <div className="w-20 h-20 rounded-[24px] bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center text-slate-300 overflow-hidden">
                  <User size={32} strokeWidth={1} />
                </div>
                <div className="w-12 h-12 rounded-[16px] bg-[#FDFBF7] border-4 border-white shadow-md -ml-6 -mb-2 flex items-center justify-center text-[#DDA15E]/30 overflow-hidden">
                  <User size={20} strokeWidth={1} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="mb-2">
                  <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest italic">{pair.principal.role}</p>
                  <h3 className={`text-xl font-serif italic lowercase truncate ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{pair.principal.name}</h3>
                </div>
                <div>
                  <p className="text-[#BC6C25]/60 text-[7px] font-black uppercase tracking-widest italic">{pair.adjoint.role}</p>
                  <p className={`text-sm font-serif italic lowercase truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{pair.adjoint.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* MEMBRES DU BUREAU (INDIVIDUELS) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {membresBureau.map((m, idx) => (
            <div key={idx} className={`p-6 rounded-[40px] border flex items-center gap-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-md'}`}>
              <div className="w-14 h-14 rounded-[20px] bg-slate-50 border-2 border-white flex items-center justify-center text-slate-200"><User size={24} strokeWidth={1} /></div>
              <div>
                <div className="flex items-center gap-2">
                   <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest italic">{m.role}</p>
                   <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-[#1B4332] text-[6px] font-black uppercase">Membre</span>
                </div>
                <h3 className={`text-lg font-serif italic lowercase ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{m.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2 : LES SECTIONS */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-3 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-[#1B4332]/5 text-[#1B4332]'}`}>
            <Star size={16} /> Responsables Sections
          </div>
          <div className={`h-px flex-1 ${darkMode ? 'bg-slate-800' : 'bg-emerald-100'}`}></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sections.map((s, idx) => (
            <div key={idx} className={`p-6 rounded-[32px] border flex items-center gap-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'}`}>
              <div className="w-12 h-12 rounded-[16px] bg-slate-50 flex items-center justify-center text-slate-200"><User size={20} strokeWidth={1} /></div>
              <div>
                <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest italic">{s.role}</p>
                <h3 className={`text-lg font-serif italic lowercase ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{s.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3 : LES MONITEURS */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-3 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-[#1B4332]/5 text-[#1B4332]'}`}>
            <GraduationCap size={16} /> Corps Enseignant
          </div>
          <div className={`h-px flex-1 ${darkMode ? 'bg-slate-800' : 'bg-emerald-100'}`}></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {moniteurs.map((m, idx) => (
            <div key={idx} className={`p-8 rounded-[40px] border text-center space-y-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl'}`}>
              <div className="w-20 h-20 rounded-[24px] bg-slate-50 mx-auto flex items-center justify-center text-slate-200 border-4 border-white shadow-inner"><User size={32} strokeWidth={1} /></div>
              <div>
                <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest italic">{m.role}</p>
                <h3 className={`text-xl font-serif italic lowercase ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{m.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Organigramme;
