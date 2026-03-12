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
    (m.firstName + ' ' + (m.name || '')).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      
      {/* BARRE DE RECHERCHE - Alignée avec le bouton sidebar */}
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

      {/* HEADER */}
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

      {/* GRILLE DES CARTES (Format plus large, 2 ou 3 colonnes pour l'ergonomie) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((m) => {
          const memberDogs = dogs.filter(d => d.ownerId === m.id);
          
          return (
            <div 
              key={m.id} 
              onClick={() => setSelectedId(m.id)}
              className={`group relative p-6 rounded-[40px] border transition-all duration-500 hover:shadow-2xl hover:shadow-[#BC6C25]/5 cursor-pointer flex items-center gap-6 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
              }`}
            >
              {/* NUMÉRO ADHÉRENT - En haut à droite */}
              <div className="absolute top-6 right-8">
                <span className="text-[7px] font-black text-slate-300 uppercase tracking-[0.2em] group-hover:text-[#BC6C25] transition-colors">
                  adhérent ACV / ACMA n°A{m.id.slice(0,4).toUpperCase()}
                </span>
              </div>

              {/* PHOTO MEMBRE (Grande et à gauche) */}
              <div className="relative w-28 h-28 rounded-[32px] overflow-hidden bg-slate-50 border-4 border-white shrink-0 shadow-lg group-hover:rotate-2 transition-transform">
                {m.photo ? (
                  <img src={m.photo} alt={m.firstName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-200">
                    <User size={40} strokeWidth={1} />
                  </div>
                )}
              </div>

              {/* INFOS CENTRALES */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-3xl font-serif italic tracking-tight lowercase leading-none ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                  {m.firstName}
                </h3>
                <p className="text-[#BC6C25] text-lg font-serif italic mt-1 truncate">
                  {memberDogs.map(d => d.name).join(' & ') || 'Aucun chien'}
                </p>
              </div>

              {/* PHOTOS DES CHIENS (Alignées verticalement à droite) */}
              <div className="flex flex-col gap-2 shrink-0 pr-2">
                {memberDogs.slice(0, 3).map((dog) => (
                  <div 
                    key={dog.id} 
                    className="w-12 h-12 rounded-2xl overflow-hidden bg-[#FDFBF7] border-2 border-white shadow-sm transition-transform hover:scale-110"
                  >
                    {dog.photo ? (
                      <img src={dog.photo} alt={dog.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#DDA15E]/20">
                        <DogIcon size={20} strokeWidth={1} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Members;
