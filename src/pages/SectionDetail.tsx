import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  Trophy, GraduationCap, Dog as DogIcon, 
  Target, Zap, Ruler, ClipboardCheck, ArrowUpRight 
} from 'lucide-react';

const SectionDetail: React.FC = () => {
  const { dogs } = useStore();
  const [selectedSection, setSelectedSection] = useState('Ring');
  const sections = ['École du Chiot', 'Éducation', 'Agility', 'Obéissance', 'Ring'];

  const sectionDogs = dogs.filter(d => d.section === selectedSection);

  return (
    <div className="space-y-8">
      {/* SÉLECTEUR DE SECTION */}
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
        {sections.map(s => (
          <button
            key={s}
            onClick={() => setSelectedSection(s)}
            className={`px-8 py-6 rounded-[2rem] border-2 transition-all flex flex-col items-center min-w-[160px] ${
              selectedSection === s 
              ? 'border-slate-900 bg-slate-900 text-white shadow-xl' 
              : 'border-slate-100 bg-white text-slate-400 hover:border-emerald-200'
            }`}
          >
            {s === 'Ring' ? <Zap size={24} className="mb-2" /> : <GraduationCap size={24} className="mb-2" />}
            <span className="text-[10px] font-black uppercase tracking-widest">{s}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LISTE DES CHIENS DE LA SECTION */}
        <div className="xl:col-span-1 space-y-4">
          <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter flex items-center">
            <DogIcon className="mr-2 text-emerald-500" size={20} />
            Effectif {selectedSection}
          </h3>
          <div className="space-y-3">
            {sectionDogs.map(dog => (
              <div key={dog.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-500 transition-all cursor-pointer">
                <div>
                  <p className="font-black text-slate-800 uppercase italic tracking-tight">{dog.name}</p>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{dog.level}</p>
                </div>
                <ArrowUpRight size={16} className="text-slate-200 group-hover:text-emerald-500" />
              </div>
            ))}
          </div>
        </div>

        {/* OUTILS MÉTIERS DÉDIÉS */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* --- MODULE RING --- */}
          {selectedSection === 'Ring' && (
            <div className="space-y-6">
              <div className="bg-rose-600 rounded-[3rem] p-10 text-white shadow-xl shadow-rose-100">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center">
                  <Target size={28} className="mr-3 text-rose-200" /> Carnet de Mordant & Sauts
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-[9px] font-black uppercase mb-2 opacity-70">Haie (Max)</p>
                    <p className="text-3xl font-black italic tracking-tighter">1m20</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-[9px] font-black uppercase mb-2 opacity-70">Longueur</p>
                    <p className="text-3xl font-black italic tracking-tighter">4m50</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-center">
                    <p className="text-[9px] font-black uppercase mb-2 opacity-70">Palissade</p>
                    <p className="text-3xl font-black italic tracking-tighter">2m30</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-[3rem] border border-slate-100">
                <h4 className="font-black uppercase italic tracking-tighter text-slate-800 mb-4">Suivi des Cessations (Mordant)</h4>
                <div className="space-y-3">
                  {['Vitesse d\'entrée', 'Qualité de prise', 'Cessation au commandement'].map(skill => (
                    <div key={skill} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                      <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{skill}</span>
                      <div className="flex space-x-1">
                        {[1,2,3,4,5].map(i => <div key={i} className={`w-4 h-2 rounded-full ${i <= 4 ? 'bg-rose-500' : 'bg-slate-200'}`} />)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* --- MODULE OBÉISSANCE --- */}
          {selectedSection === 'Obéissance' && (
            <div className="space-y-6">
              <div className="bg-blue-600 rounded-[3rem] p-10 text-white shadow-xl shadow-blue-100">
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-6 flex items-center">
                  <ClipboardCheck size={28} className="mr-3 text-blue-200" /> Précision & Rapport
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                    <p className="text-[9px] font-black uppercase mb-2">Positions à distance</p>
                    <div className="flex justify-between text-xs font-bold">
                      <span>Assis/Debout</span>
                      <span className="text-emerald-300">Impeccable</span>
                    </div>
                  </div>
                  <div className="bg-white/10 p-6 rounded-2xl border border-white/10">
                    <p className="text-[9px] font-black uppercase mb-2">Odorat (Identification)</p>
                    <div className="flex justify-between text-xs font-bold">
                      <span>Réussite</span>
                      <span className="text-emerald-300">90%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SI AUTRE SECTION */}
          {!['Ring', 'Obéissance'].includes(selectedSection) && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] p-20 text-center">
               <p className="text-slate-400 font-bold italic">Sélectionnez une section pour voir ses outils spécifiques.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SectionDetail;
