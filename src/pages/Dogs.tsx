import React from 'react';
import { useStore } from '../store/useStore';
import { Dog, Camera, Info } from 'lucide-react';

const Dogs = ({ onSelectDog }: { onSelectDog: (id: string) => void }) => {
  const { dogs, members, darkMode, uploadDogPhoto } = useStore();

  const handleFileUpload = async (dogId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadDogPhoto(dogId, file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER HARMONISÉ - BOUTON AJOUT RETIRÉ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className={`text-4xl font-serif italic tracking-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            La <span className="text-[#BC6C25]">Meute</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">
            Amicale Canine Vernoise • {dogs.length} chiens
          </p>
        </div>
      </div>

      {/* GRILLE COMPACTÉE (Passage de 4 à 6/8 colonnes sur grand écran) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {dogs.map((dog) => {
          const owner = members.find(m => m.id === dog.ownerId);
          
          return (
            <div 
              key={dog.id} 
              onClick={() => onSelectDog(dog.id)}
              className={`group relative p-4 rounded-[24px] border transition-all duration-500 hover:-translate-y-1 cursor-pointer ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-lg shadow-emerald-900/5'
              }`}
            >
              
              {/* PHOTO DE PROFIL PLUS PETITE */}
              <div className="relative w-full aspect-square mb-3 rounded-[16px] overflow-hidden bg-[#FDFBF7] border border-emerald-50 shadow-inner">
                {dog.photo ? (
                  <img src={dog.photo} alt={dog.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#DDA15E]/20">
                    <Dog size={32} strokeWidth={1} />
                  </div>
                )}
                
                {/* BOUTON PHOTO COMPACT */}
                <label 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-2 right-2 p-2 bg-white text-[#1B4332] rounded-lg shadow-lg cursor-pointer opacity-0 group-hover:opacity-100 transition-all hover:bg-[#BC6C25] hover:text-white"
                >
                  <Camera size={14} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(dog.id, e)}
                  />
                </label>
              </div>

              {/* INFOS CHIEN RÉDUITES */}
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="overflow-hidden">
                    <h3 className={`text-sm font-serif italic tracking-tight truncate ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                      {dog.name}
                    </h3>
                    <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest truncate">
                      {owner ? owner.name : 'NC'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {dog.sections?.slice(0, 1).map((s: string) => (
                    <span key={s} className="px-2 py-0.5 bg-[#1B4332]/5 text-[#1B4332] text-[6px] font-black uppercase tracking-widest rounded-full border border-[#1B4332]/10 italic">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* BADGE RACE DISCRET */}
              <div className="absolute top-4 right-5 text-[6px] font-black text-slate-300 tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                {dog.breed ? dog.breed.split(' ')[0] : ''}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dogs;
