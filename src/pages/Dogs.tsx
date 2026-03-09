import React from 'react';
import { useStore } from '../store/useStore';
import { Dog, Plus, Camera, Link as LinkIcon } from 'lucide-react';

const Dogs = () => {
  // Correction : on utilise uploadDogPhoto au lieu de updateDogPhoto
  const { dogs, members, darkMode, uploadDogPhoto } = useStore();

  const handleFileUpload = async (dogId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadDogPhoto(dogId, file);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* HEADER HARMONISÉ */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className={`text-5xl font-serif italic tracking-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            La <span className="text-[#BC6C25]">Meute</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
            Amicale Canine Vernoise • {dogs.length} chiens
          </p>
        </div>
        <button className="p-5 bg-[#1B4332] text-white rounded-[24px] shadow-xl hover:scale-105 active:scale-95 transition-all">
          <Plus size={24} />
        </button>
      </div>

      {/* GRILLE HARMONISÉE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        {dogs.map((dog) => {
          const owner = members.find(m => m.id === dog.ownerId);
          
          return (
            <div key={dog.id} className={`group relative p-8 rounded-[40px] border transition-all duration-500 hover:-translate-y-2 ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-2xl shadow-emerald-900/5'
            }`}>
              
              {/* PHOTO DE PROFIL AVEC UPLOAD */}
              <div className="relative w-full aspect-square mb-8 rounded-[32px] overflow-hidden bg-[#FDFBF7] border border-emerald-50 shadow-inner">
                {dog.photo ? (
                  <img src={dog.photo} alt={dog.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#DDA15E]/20">
                    <Dog size={64} strokeWidth={1} />
                  </div>
                )}
                
                {/* BOUTON PHOTO (APPAREIL) */}
                <label className="absolute bottom-4 right-4 p-4 bg-white text-[#1B4332] rounded-2xl shadow-xl cursor-pointer opacity-0 group-hover:opacity-100 transition-all hover:bg-[#BC6C25] hover:text-white transform translate-y-2 group-hover:translate-y-0">
                  <Camera size={20} />
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleFileUpload(dog.id, e)}
                  />
                </label>
              </div>

              {/* INFOS CHIEN TYPO HARMONISÉE */}
              <div className="space-y-4">
                <div>
                  <h3 className={`text-2xl font-serif italic tracking-tight leading-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                    {dog.name}
                  </h3>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
                    Propriétaire : <span className="text-[#BC6C25]">{owner ? owner.name : 'NC'}</span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {dog.sections?.map((s: string) => (
                    <span key={s} className="px-3 py-1 bg-[#1B4332]/5 text-[#1B4332] text-[8px] font-black uppercase tracking-widest rounded-full border border-[#1B4332]/10 italic">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* PETIT BADGE RACE OU ID */}
              <div className="absolute top-8 right-10 text-[8px] font-black text-slate-200 tracking-[0.3em] group-hover:text-[#BC6C25]/20 transition-colors">
                {dog.breed || 'RACE NC'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dogs;
