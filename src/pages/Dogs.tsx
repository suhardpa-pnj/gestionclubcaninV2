import React from 'react';
import { useStore } from '../store/useStore';
import { Dog as DogIcon, User, Fingerprint } from 'lucide-react';

const Dogs = () => {
  const { dogs, members } = useStore();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-800">Le Parc Canin</h2>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
          {dogs.length} chiens enregistrés au club
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dogs.map((dog, index) => {
          // On cherche le propriétaire
          const owner = members.find(m => m.id === dog.ownerId);
          return (
            <div key={index} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100 group-hover:rotate-6 transition-transform">
                  <DogIcon size={28} />
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-slate-50 text-slate-400 rounded-full">
                    {dog.breed}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-black text-slate-800 uppercase italic mb-1 tracking-tighter">
                {dog.name}
              </h3>
              
              <div className="space-y-3 mt-6 pt-6 border-t border-slate-50">
                <div className="flex items-center gap-3">
                  <User size={14} className="text-slate-300" />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Propriétaire</p>
                    <p className="text-xs font-bold text-slate-700 uppercase italic">
                      {owner ? `${owner.name} ${owner.firstName}` : 'Inconnu'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Fingerprint size={14} className="text-slate-300" />
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">N° Puce / Tatouage</p>
                    <p className="text-xs font-mono font-bold text-slate-500 tracking-wider">
                      {dog.chip || 'Non renseigné'}
                    </p>
                  </div>
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
