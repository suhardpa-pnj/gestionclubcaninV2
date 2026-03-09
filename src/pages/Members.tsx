import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Phone, Search, Plus, Filter } from 'lucide-react';
import MemberDetail from './MemberDetail';

const Members = () => {
  const { members, dogs, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Formatage du prénom (ex: PIERRE -> Pierre)
  const formatName = (first: string) => 
    first ? first.charAt(0).toUpperCase() + first.slice(1).toLowerCase() : '';

  // Filtrage des membres selon la recherche
  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // SI UN MEMBRE EST SÉLECTIONNÉ : On affiche sa fiche détaillée
  if (selectedId) {
    return <MemberDetail memberId={selectedId} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER : Titre et Recherche */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className={`text-5xl font-serif italic tracking-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Les <span className="text-[#BC6C25]">Adhérents</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            {members.length} membres actifs • Saison 2026
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#BC6C25] transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="RECHERCHER UN NOM..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-12 pr-6 py-4 rounded-[20px] text-[10px] font-bold border outline-none transition-all w-64 lg:w-80 ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
              } focus:border-[#BC6C25]`}
            />
          </div>
          <button className="p-4 bg-[#1B4332] text-white rounded-[20px] shadow-lg hover:scale-105 transition-all">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* GRILLE DES MEMBRES */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((m) => {
          // On récupère les chiens rattachés à ce membre
          const memberDogs = dogs.filter(d => d.ownerId === m.id || d.ownerName?.includes(m.name));
          
          return (
            <div 
              key={m.id} 
              className={`group relative p-8 rounded-[40px] border transition-all duration-500 hover:-translate-y-1 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-2xl shadow-emerald-900/5'
              }`}
            >
              <div className="flex items-start gap-6">
                {/* AVATAR / ICONE */}
                <div className="w-16 h-16 bg-[#FDFBF7] border border-emerald-50 rounded-[24px] flex items-center justify-center text-[#DDA15E] shrink-0 group-hover:scale-110 transition-transform">
                  <User size={28} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* NOM CLIQUABLE POUR OUVRIR LA FICHE */}
                  <button 
                    onClick={() => setSelectedId(m.id)}
                    className="text-left block w-full group/name"
                  >
                    <h3 className={`text-lg font-serif italic leading-tight group-hover/name:text-[#BC6C25] transition-colors ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                      {m.name} {formatName(m.firstName)}
                    </h3>
                    {m.binome && (
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-1">
                        & {m.binome}
                      </p>
                    )}
                  </button>

                  {/* CHIENS ET ACTIVITÉS */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {memberDogs.length > 0 ? (
                      memberDogs.map(d => (
                        <span key={d.id} className="text-[8px] font-black bg-[#BC6C25]/10 text-[#BC6C25] px-2 py-0.5 rounded-md uppercase italic">
                          {d.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-[8px] font-bold text-slate-300 uppercase italic">Aucun chien</span>
                    )}
                  </div>
                </div>
              </div>

              {/* ACTIONS ET DOCUMENTS */}
              <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                <a 
                  href={`tel:${m.phone}`} 
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-[#1B4332] rounded-xl hover:bg-[#1B4332] hover:text-white transition-all text-[9px] font-black uppercase tracking-widest"
                >
                  <Phone size={14} /> Appeler
                </a>
                
                <div className="flex gap-1.5">
                  <DocIndicator status={m.docVaccin === 'oui'} label="V" />
                  <DocIndicator status={m.docAssurance === 'oui'} label="A" />
                  <DocIndicator status={m.docACMA === 'oui'} label="M" />
                </div>
              </div>

              {/* PETIT BADGE ID */}
              <div className="absolute top-6 right-8 text-[8px] font-mono text-slate-300">
                {m.id}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Petit composant interne pour les indicateurs de documents
const DocIndicator = ({ status, label }: { status: boolean; label: string }) => (
  <div 
    title={label === 'V' ? 'Vaccins' : label === 'A' ? 'Assurance' : 'ACMA'}
    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-black transition-colors ${
      status ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-300'
    }`}
  >
    {label}
  </div>
);

export default Members;
