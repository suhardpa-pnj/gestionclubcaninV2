import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, Plus, Dog as DogIcon, ShieldAlert, Calendar, User } from 'lucide-react';

const Dogs: React.FC = () => {
  const { dogs, members } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrer par nom de chien ou race
  const filteredDogs = dogs.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* EN-TÊTE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">
            La Meute
          </h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
            Suivi des {dogs.length} chiens du club
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Chercher un chien ou une race..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-emerald-500/20 outline-none w-72 transition-all"
            />
          </div>
          
          <button className="bg-emerald-500 text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-100 hover:bg-slate-900 transition-all flex items-center space-x-3">
            <Plus size={18} />
            <span>Ajouter un Chien</span>
          </button>
        </div>
      </div>

      {/* LISTE DES CHIENS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDogs.map((dog) => {
          // Trouver le propriétaire
          const owner = members.find(m => m.id === dog.memberId);
          
          return (
            <div key={dog.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
              {/* BANDEAU COULEUR SELON SECTION */}
              <div className="h-3 bg-emerald-400" />
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-inner">
                    <DogIcon size={32} />
                  </div>
                  <span className="px-3 py-1 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest rounded-lg">
                    {dog.level}
                  </span>
                </div>

                <h3 className="text-2xl font-black text-slate-800 uppercase italic tracking-tighter mb-1">
                  {dog.name}
                </h3>
                <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mb-6">
                  {dog.breed}
                </p>

                {/* INFOS PROPRIÉTAIRE & SANTÉ */}
                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <div className="flex items-center text-slate-500">
                    <User size={14} className="mr-2" />
                    <span className="text-[11px] font-bold uppercase tracking-tight">
                      Propriétaire : <span className="text-slate-800">{owner ? `${owner.firstName} ${owner.name}` : 'Inconnu'}</span>
                    </span>
                  </div>

                  <div className="flex items-center text-slate-500">
                    <Calendar size={14} className="mr-2" />
                    <span className="text-[11px] font-bold uppercase tracking-tight">
                      Section : <span className="text-slate-800">{dog.section}</span>
                    </span>
                  </div>

                  {/* RÉCAP VACCINS (LE POINT CRUCIAL) */}
                  <div className={`flex items-center p-3 rounded-xl ${dog.vaccines.length > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    <ShieldAlert size={14} className="mr-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {dog.vaccines.length > 0 ? 'Vaccins à jour' : 'Vaccins manquants'}
                    </span>
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
