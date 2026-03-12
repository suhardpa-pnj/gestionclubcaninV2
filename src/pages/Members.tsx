import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Search, Dog as DogIcon } from 'lucide-react';
import MemberDetail from './MemberDetail';

const Members = () => {
  const { members, dogs, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (selectedId) return <MemberDetail memberId={selectedId} onBack={() => setSelectedId(null)} />;

  // Filtrage par Nom ou Prénom
  const filteredMembers = members.filter(m => 
    (m.firstName + ' ' + m.name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      
      {/* BARRE DE RECHERCHE ALIGNÉE EN HAUT À DROITE (Harmonisée avec les chiens) */}
      <div className="absolute top-0 right-0 z-20">
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

      {/* HEADER BI-COULEUR & SOUS-TITRE */}
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

      {/* GRILLE HARMONISÉE (6 colonnes sur XL) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredMembers.map((m) => {
          // On récupère le premier chien pour la vue "couple"
          const firstDog = dogs.find(d => d.ownerId === m.id);
          
          return (
            <div 
              key={m.id} 
              onClick={() => setSelectedId(m.id)}
              className={`group relative p-4 rounded-[24px] border transition-all duration-500 hover:-translate-y-1 cursor-pointer ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-lg shadow-emerald-900/5'
              }`}
            >
              
              {/* VUE DU COUPLE : PHOTO MAITRE & PHOTO CHIEN */}
              <div className="flex gap-2 mb-3">
                {/* Photo Membre */}
                <div className="relative w-1/2 aspect-square rounded-[12px] overflow-hidden bg-slate-50 border border-emerald-50 shadow-inner">
                  {m.photo ? (
                    <img src={m.photo} alt={m.firstName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-200">
                      <User size={20} strokeWidth={1.5} />
                    </div>
                  )}
                </div>
                
                {/* Photo Chien associé */}
                <div className="relative w-1/2 aspect-square rounded-[12px] overflow-hidden bg-[#FDFBF7] border border-emerald-50 shadow-inner">
                  {firstDog?.photo ? (
                    <img src={firstDog.photo} alt={firstDog.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#DDA15E]/20">
                      <DogIcon size={20} strokeWidth={1.5} />
                    </div>
                  )}
                </div>
              </div>

              {/* INFOS MEMBRE : TYPO INVERSÉE */}
              <div className="space-y-1">
                <div className="overflow-hidden">
                  <h3 className={`text-sm font-serif italic tracking-tight truncate lowercase ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                    {m.firstName}
                  </h3>
                  <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest truncate">
                    {m.name}
                  </p>
                </div>

                <div className="pt-1">
                  <span className="text-[6px] font-black text-[#BC6C25] uppercase tracking-widest block italic opacity-70">
                    adhérent ACV / ACMA n°{m.id.slice(0,5).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* NOM DU CHIEN EN BADGE AU SURVOL */}
              {firstDog && (
                <div className="absolute top-4 right-5 text-[6px] font-black text-[#BC6C25] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  {firstDog.name.toUpperCase()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Members;
