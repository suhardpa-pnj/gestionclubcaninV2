import React from 'react';
import { useStore } from '../store/useStore';
import { Dog, Plus, Camera, Award, Link as LinkIcon } from 'lucide-react';

const Dogs = () => {
  const { dogs, members, darkMode, updateDogPhoto } = useStore();

  return (
    <div className="space-y-8">
      {/* HEADER COMPACT */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Les <span className="text-[#BC6C25]">Chiens</span>
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest italic">Gestion de la meute • {dogs.length} chiens</p>
        </div>
        <button className="p-3 bg-[#1B4332] text-white rounded-2xl shadow-lg hover:scale-105 transition-all">
          <Plus size={20} />
        </button>
      </div>

      {/* GRILLE DES CHIENS (VIGNETTES XS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dogs.map((dog) => {
          const owner = members.find(m => m.id === dog.ownerId);
          
          return (
            <div key={dog.id} className={`group relative p-4 rounded-[32px] border transition-all ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'
            }`}>
              
              {/* PHOTO DE PROFIL */}
              <div className="relative w-full aspect-square mb-4 rounded-[24px] overflow-hidden bg-[#FDFBF7] border border-slate-100">
                {dog.photo ? (
                  <img src={dog.photo} alt={dog.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#DDA15E]/30">
                    <Dog size={48} strokeWidth={1} />
                  </div>
                )}
                {/* BOUTON PHOTO RAPIDE */}
                <button 
                  onClick={() => {
                    const url = prompt("URL de la photo (Google Drive ou autre) :");
                    if (url) updateDogPhoto(dog.id, url);
                  }}
                  className="absolute bottom-2 right-2 p-2 bg-white/90 backdrop-blur text-[#1B4332] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                >
                  <Camera size={14} />
                </button>
              </div>

              {/* INFOS CHIEN */}
              <div className="space-y-2">
                <button className="text-left block w-full group/link">
                  <h3 className={`text-sm font-black uppercase italic tracking-tight flex items-center gap-2 ${
                    darkMode ? 'text-white' : 'text-[#1B4332]'
                  }`}>
                    {dog.name}
                    <LinkIcon size={10} className="opacity-0 group-hover/link:opacity-100 text-[#BC6C25]" />
                  </h3>
                </button>

                <p className="text-[9px] font-bold text-slate-400 uppercase leading-none">
                  Proprio: <span className="text-slate-600">{owner ? `${owner.name} ${owner.firstName.charAt(0)}.` : 'Non assigné'}</span>
                </p>

                {/* SECTIONS (PASTILLES) */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {dog.sections && dog.sections.length > 0 ? (
                    dog.sections.map((s: string) => (
                      <span key={s} className="px-2 py-0.5 bg-[#1B4332]/5 text-[#1B4332] text-[7px] font-black uppercase rounded-md border border-[#1B4332]/10">
                        {s}
                      </span>
                    ))
                  ) : (
                    <span className="text-[7px] font-bold text-slate-300 uppercase">Aucune section</span>
                  )}
                </div>
              </div>

              {/* BADGE AGE OU RACE (OPTIONNEL) */}
              <div className="absolute top-6 left-6 pointer-events-none">
                <span className="bg-[#BC6C25] text-white text-[7px] font-black px-2 py-1 rounded-lg uppercase shadow-lg">
                  {dog.breed || 'NC'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dogs;
