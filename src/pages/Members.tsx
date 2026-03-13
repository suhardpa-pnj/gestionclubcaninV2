import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Search, Dog as DogIcon } from 'lucide-react';
import MemberDetail from './MemberDetail';

const Members = () => {
  const { members, dogs, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const clubLogo = "https://votre-url-logo-acv.png";

  if (selectedId) return <MemberDetail memberId={selectedId} onBack={() => setSelectedId(null)} />;

  const filteredMembers = members.filter(m => 
    (m.firstName + ' ' + (m.name || '')).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      
      {/* BARRE DE RECHERCHE */}
      <div className="absolute -top-12 lg:-top-6 right-0 z-20">
        <div className={`relative flex items-center rounded-2xl border transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'
        }`}>
          <Search size={14} className="ml-4 text-[#BC6C25]" />
          <input 
            type="text"
            placeholder="Chercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none p-3 text-[10px] font-bold uppercase tracking-widest w-32 md:w-64"
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

      {/* GRILLE DES CARTES AJUSTÉE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMembers.map((m) => {
          const memberDogs = dogs.filter(d => d.ownerId === m.id);
          
          return (
            <div 
              key={m.id} 
              onClick={() => setSelectedId(m.id)}
              className={`group relative p-4 md:p-6 rounded-[40px] border transition-all duration-500 hover:shadow-2xl hover:shadow-[#BC6C25]/5 cursor-pointer flex items-center gap-3 md:gap-5 overflow-hidden ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
              }`}
            >
              {/* ID ADHÉRENT */}
              <div className="absolute top-1 right-4 md:right-6">
                <span className="text-[6px] md:text-[7px] font-black text-slate-300 uppercase tracking-[0.2em] group-hover:text-[#BC6C25] transition-colors">
                  adhérent ACV / ACMA n°{m.id.toUpperCase()}
                </span>
              </div>

              {/* PHOTO MEMBRE - Décalage ajusté (-10px vers la gauche) */}
              <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-[32px] overflow-hidden bg-slate-50 border-4 border-white shrink-0 shadow-lg group-hover:rotate-2 transition-transform ml-[-10px]">
                <img 
                  src={m.photo || clubLogo} 
                  alt={m.firstName} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* INFOS CENTRALES - Décalage ajusté (+9px vers la droite) */}
              <div className="flex-1 min-w-0 mt-16 ml-[9px]">
                <h3 className={`text-2xl md:text-3xl font-serif italic tracking-tight lowercase leading-none ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                  {m.firstName}
                </h3>
                <p className="text-[#BC6C25] text-sm md:text-lg font-serif italic mt-1 truncate">
                  {memberDogs.map(d => d.name).join(' & ') || 'Aucun chien'}
                </p>
              </div>

              {/* PHOTOS DES CHIENS */}
              <div className="flex flex-col gap-0.5 shrink-0 pr-1 md:pr-2">
                {memberDogs.slice(0, 3).map((dog) => (
                  <div 
                    key={dog.id} 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden bg-[#FDFBF7] border-2 border-white shadow-sm transition-transform hover:scale-110"
                  >
                    <img 
                      src={dog.photo || clubLogo} 
                      alt={dog.name} 
                      className="w-full h-full object-cover" 
                    />
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
