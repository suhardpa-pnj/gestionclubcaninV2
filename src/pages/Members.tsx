import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Search, Dog as DogIcon } from 'lucide-react';
import MemberDetail from './MemberDetail';

const Members = () => {
  const { members, dogs, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (selectedId) return <MemberDetail memberId={selectedId} onBack={() => setSelectedId(null)} />;

  const filteredMembers = members.filter(m => 
    (m.firstName + ' ' + m.name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      
      {/* BARRE DE RECHERCHE - Positionnée en haut pour ne pas masquer le titre */}
      <div className="absolute -top-12 lg:-top-6 right-0 z-20">
        <div className={`relative flex items-center rounded-2xl border transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'
        }`}>
          <Search size={14} className="ml-4 text-[#BC6C25]" />
          <input 
            type="text"
            placeholder="Chercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none p-3 text-[10px] font-bold uppercase tracking-widest w-40 md:w-64"
          />
        </div>
      </div>

      {/* HEADER BI-COULEUR */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className={`text-4xl font-serif italic tracking-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Les <span className="text-[#BC6C25]">Membres</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">
            Amicale Canine Vernoise • {filteredMembers.length} membres
          </p>
        </div>
      </div>

      {/* GRILLE DES VIGNETTES */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {filteredMembers.map((m) => {
          // On récupère TOUS les chiens du membre
          const memberDogs = dogs.filter(d => d.ownerId === m.id);
          
          return (
            <div 
              key={m.id} 
              onClick={() => setSelectedId(m.id)}
              className={`group relative p-6 rounded-[32px] border transition-all duration-500 hover:border-[#BC6C25] cursor-pointer ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
              }`}
            >
              <div className="flex items-end gap-2 mb-4">
                {/* PHOTO MEMBRE (Grande - 64px) */}
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-50 border border-emerald-50 shrink-0 shadow-inner z-10">
                  {m.photo ? (
                    <img src={m.photo} alt={m.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                      <User size={24} strokeWidth={1} />
                    </div>
                  )}
                </div>

                {/* PHOTOS DES CHIENS (Petites - 40px) en éventail */}
                <div className="flex -space-x-4 mb-0.5">
                  {memberDogs.length > 0 ? (
                    memberDogs.slice(0, 3).map((dog, index) => (
                      <div 
                        key={dog.id} 
                        className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#FDFBF7] border-2 border-white shrink-0 shadow-sm transition-transform group-hover:translate-x-1"
                        style={{ zIndex: 5 - index }}
                      >
                        {dog.photo ? (
                          <img src={dog.photo} alt={dog.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#DDA15E]/20">
                            <DogIcon size={16} strokeWidth={1} />
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="w-10 h-10 rounded-xl border border-dashed border-slate-200 flex items-center justify-center text-slate-200">
                      <DogIcon size={16} strokeWidth={1} />
                    </div>
                  )}
                </div>
              </div>

              {/* INFOS MEMBRE */}
              <div className="space-y-1">
                <h3 className={`text-2xl font-serif italic tracking-tight lowercase leading-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                  {m.firstName}
                </h3>
                
                {/* LISTE DES NOMS DES CHIENS */}
                <p className="text-[#BC6C25] text-sm font-serif italic truncate">
                  {memberDogs.map(d => d.name).join(' & ') || 'Aucun chien'}
                </p>

                <div className="pt-2 border-t border-slate-50 mt-2">
                  <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest block">
                    adhérent ACV / ACMA n°A{m.id.slice(0,4).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Members;
