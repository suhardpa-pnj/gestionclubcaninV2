import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, Plus, Dog as DogIcon, ShieldAlert, Calendar, User, Filter } from 'lucide-react';

const Dogs: React.FC = () => {
  const { dogs, members } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  // --- NOUVEAU : GESTION DES SECTIONS ---
  const [activeSection, setActiveSection] = useState('Toutes');
  const sections = ['Toutes', 'École du Chiot', 'Éducation', 'Agility', 'Obéissance', 'Ring', 'Loisir'];

  // Filtrage combiné : Recherche par nom + Filtre par section
  const filteredDogs = dogs.filter(d => {
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         d.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = activeSection === 'Toutes' || d.section === activeSection;
    
    return matchesSearch && matchesSection;
  });

  return (
    <div className="space-y-8">
      {/* EN-TÊTE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">
            La Meute
          </h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
            {filteredDogs.length} chiens affichés sur {dogs.length} au total
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Chercher un chien..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-emerald-500/20 outline-none w-64 transition-all"
            />
          </div>
          <button className="bg-emerald-500 text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-slate-900 transition-all flex items-center space-x-3">
            <Plus size={18} />
            <span>Nouveau Chien</span>
          </button>
        </div>
      </div>

      {/* --- NOUVELLE BARRE DE SECTIONS --- */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        <div className="p-3 bg-white rounded-xl border border-slate-100 text-slate-400 mr-2">
          <Filter size={16} />
        </div>
        {sections.map(s => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              activeSection === s 
                ? 'bg-slate-900 text-white shadow-lg' 
                : 'bg-white text-slate-400 border border-slate-100 hover:border-emerald-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* GRILLE DES CHIENS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDogs.map((dog) => {
          const owner = members.find(m => m.id === dog.memberId);
          return (
            <div key={dog.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden group hover:shadow-md transition-all">
              {/* COULEUR DE SECTION DYNAMIQUE */}
              <div className={`h-3 ${
                dog.section === 'Agility' ? 'bg-orange-400' : 
                dog.section === 'Ring' ? 'bg-rose-500' : 'bg-emerald-400'
              }`} />
              
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

                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <div className="flex items-center text-slate-500">
                    <User size={14} className="mr-2" />
                    <span className="text-[11px] font-bold uppercase tracking-tight">
                      Propriétaire : <span className="text-slate-800">{owner ? `${owner.firstName} ${owner.name}` : 'Inconnu'}</span>
                    </span>
                  </div>
                  <div className="flex items-center text-slate-500">
                    <Calendar size={14} className="mr-2 text-emerald-500" />
                    <span className="text-[11px] font-bold uppercase tracking-tight">
                      Section : <span className="text-slate-800">{dog.section}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredDogs.length === 0 && (
          <div className="col-span-full py-20 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
            <p className="text-slate-400 font-bold italic">Aucun chien dans la section "{activeSection}".</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dogs;
