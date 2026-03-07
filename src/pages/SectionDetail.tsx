import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Star, Timer, Map, CheckCircle2, Trophy, GraduationCap, Dog as DogIcon } from 'lucide-react';

const SectionDetail: React.FC = () => {
  const { dogs } = useStore();
  const [selectedSection, setSelectedSection] = useState('Agility');
  const sections = ['École du Chiot', 'Éducation', 'Agility', 'Obéissance', 'Ring'];

  // On filtre les chiens de la section sélectionnée
  const sectionDogs = dogs.filter(d => d.section === selectedSection);

  return (
    <div className="space-y-8">
      {/* SÉLECTEUR DE SECTION GÉANT */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {sections.map(s => (
          <button
            key={s}
            onClick={() => setSelectedSection(s)}
            className={`px-8 py-6 rounded-[2rem] border-2 transition-all flex flex-col items-center min-w-[160px] ${
              selectedSection === s 
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-xl shadow-emerald-100' 
              : 'border-slate-100 bg-white text-slate-400 hover:border-slate-200'
            }`}
          >
            <GraduationCap size={24} className="mb-2" />
            <span className="text-[10px] font-black uppercase tracking-widest">{s}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* COLONNE GAUCHE : LA MEUTE DE LA SECTION */}
        <div className="xl:col-span-1 space-y-4">
          <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter flex items-center">
            <DogIcon className="mr-2 text-emerald-500" size={20} />
            Élèves ({sectionDogs.length})
          </h3>
          <div className="space-y-3">
            {sectionDogs.map(dog => (
              <div key={dog.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <p className="font-black text-slate-800 uppercase italic tracking-tight">{dog.name}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{dog.breed}</p>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3].map(i => <Star key={i} size={12} className="text-amber-400 fill-amber-400" />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COLONNE DROITE : OUTILS SPÉCIFIQUES (DYNAMIQUE) */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* SI SECTION = AGILITY */}
          {selectedSection === 'Agility' && (
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-6">
                  <Timer className="text-orange-400" size={32} />
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Chronomètres & Parcours</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">Dernier tracé</p>
                    <div className="h-32 bg-slate-800 rounded-xl mb-4 flex items-center justify-center border border-dashed border-slate-700">
                       <Map size={40} className="text-slate-600" />
                    </div>
                    <button className="w-full py-3 bg-orange-500 rounded-xl font-black uppercase text-[10px] tracking-widest">Voir le plan</button>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-widest text-orange-400 mb-2">Top Performance</p>
                    <p className="text-3xl font-black italic tracking-tighter">34.52s</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-2">Olympe (Malinois)</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SI SECTION = ÉCOLE DU CHIOT */}
          {selectedSection === 'École du Chiot' && (
            <div className="bg-emerald-500 rounded-[3rem] p-10 text-white">
               <div className="flex items-center space-x-3 mb-6">
                  <Trophy className="text-yellow-300" size={32} />
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">Objectifs de Sociabilisation</h3>
                </div>
                <div className="space-y-4">
                  {['Rencontre congénères', 'Bruits urbains', 'Manipulation vétérinaire', 'Rappel au jeu'].map(task => (
                    <div key={task} className="flex items-center justify-between bg-white/10 p-5 rounded-2xl border border-white/10">
                       <span className="font-black uppercase italic tracking-tighter">{task}</span>
                       <CheckCircle2 size={24} className="text-white" />
                    </div>
                  ))}
                </div>
            </div>
          )}

          {/* MESSAGE POUR LES AUTRES SECTIONS (EN TRAVAUX) */}
          {!['Agility', 'École du Chiot'].includes(selectedSection) && (
            <div className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center">
              <p className="text-slate-400 font-bold italic">Espace "{selectedSection}" en cours de configuration...</p>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-4">Quels outils voulez-vous ajouter ici ?</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
