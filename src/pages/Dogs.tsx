import React from 'react';
import { useStore } from '../store/useStore';
import { Dog as DogIcon, User, Fingerprint } from 'lucide-react';

const Dogs = () => {
  const { dogs, members, darkMode } = useStore();

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Le Parc Canin
        </h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
          {dogs.length} compagnons au club
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map((dog, index) => {
          const owner = members.find(m => m.id === dog.ownerId);
          return (
            <div key={index} className={`p-8 rounded-[40px] border transition-all ${
              darkMode ? 'bg-slate-900 border-slate-800 shadow-none' : 'bg-white border-slate-100 shadow-sm'
            }`}>
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <DogIcon size={28} />
                </div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                  darkMode ? 'bg-slate-950 text-slate-500' : 'bg-slate-50 text-slate-400'
                }`}>
                  {dog.breed}
                </span>
              </div>

              <h3 className={`text-2xl font-black uppercase italic mb-1 tracking-tighter ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                {dog.name}
              </h3>
              
              <div className={`space-y-3 mt-6 pt-6 border-t ${darkMode ? 'border-slate-800' : 'border-slate-50'}`}>
                <div className="flex items-center gap-3">
                  <User size={14} className="text-slate-400" />
                  <p className={`text-xs font-bold uppercase italic ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                    {owner ? `${owner.name} ${owner.firstName}` : 'Inconnu'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Fingerprint size={14} className="text-slate-400" />
                  <p className="text-[10px] font-mono font-bold text-slate-500 tracking-wider">
                    {dog.chip || 'PUCE NC'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dogs;
