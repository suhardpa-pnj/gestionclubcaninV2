import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Dog, Camera, Info, Search } from 'lucide-react';

const Dogs = ({ onSelectDog, onSelectMember }: { 
  onSelectDog: (id: string) => void,
  onSelectMember: (id: string) => void 
}) => {
  const { dogs, members, darkMode, uploadDogPhoto } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = async (dogId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadDogPhoto(dogId, file);
    }
  };

  const filteredDogs = dogs.filter(dog => 
    dog.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-700 relative">
      
      {/* BARRE DE RECHERCHE ALIGNÉE EN HAUT À DROITE */}
      <div className="absolute top-0 right-0 z-20">
        <div className={`relative flex items-center rounded-2xl border transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'
        }`}>
          <Search size={14} className="ml-4 text-[#BC6C25]" />
          <input 
            type="text"
            placeholder="Chercher un chien..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-none outline-none p-3 text-[10px] font-bold uppercase tracking-widest w-40 md:w-64"
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className={`text-4xl font-serif italic tracking-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            La <span className="text-[#BC6C25]">Meute</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-2 italic">
            Amicale Canine Vernoise • {filteredDogs.length} chiens
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {filteredDogs.map((dog) => {
          const owner = members.find(m => m.id === dog.ownerId);
          
          return (
            <div 
              key={dog.id} 
              onClick={() => onSelectDog(dog.id)}
              className={`group relative p-4 rounded-[24px] border transition-all duration-500 hover:-translate-y-1 cursor-pointer ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-lg shadow-emerald-900/5'
              }`}
            >
              
              <div className="relative w-full aspect-square mb-3 rounded-[16px] overflow-hidden bg-[#FDFBF7] border border-emerald-50 shadow-inner">
                {dog.photo ? (
                  <img src={dog.photo} alt={dog.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#DDA15E]/20">
                    <Dog size={32} strokeWidth={1} />
                  </div>
                )}
                
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

              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <div className="overflow-hidden">
                    <h3 className={`text-sm font-serif italic tracking-tight truncate ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                      {dog.name}
                    </h3>
                    
                    {/* PRÉNOM DU MAÎTRE CLIQUABLE */}
                    {owner ? (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectMember(owner.id);
                        }}
                        className="text-[9px] font-serif italic text-[#BC6C25] hover:underline lowercase block truncate text-left"
                      >
                        {owner.firstName || owner.name}
                      </button>
                    ) : (
                      <p className="text-[7px] font-black text-slate-400 uppercase tracking-widest truncate">NC</p>
                    )}
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
