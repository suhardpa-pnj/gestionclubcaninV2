import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, User, Check, X, Dog, ChevronDown, ChevronUp } from 'lucide-react';

const Presences = () => {
  const { members, dogs, darkMode } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // État du pointage
  const [selectedSection, setSelectedSection] = useState('École du Chiot');
  const [presentDogIds, setPresentDogIds] = useState<string[]>([]);
  const [responsibleId, setResponsibleId] = useState('');
  const [guestDog, setGuestDog] = useState(''); // Pour les essais
  const [showAllDogs, setShowAllDogs] = useState(false);

  const sectionsList = [
    'École du Chiot',
    'Éducation',
    'Obéissance',
    'Agility',
    'Ring'
  ];

  // Filtrage des chiens par section
  const sectionDogs = dogs.filter(d => d.sections?.includes(selectedSection));
  const otherDogs = dogs.filter(d => !d.sections?.includes(selectedSection));

  const toggleDog = (id: string) => {
    setPresentDogIds(prev => 
      prev.includes(id) ? prev.filter(did => did !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Feuilles de <span className="text-[#BC6C25]">Présence</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
            Suivi des appels et participations
          </p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-[#1B4332] text-white rounded-[24px] font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 transition-all"
        >
          <Plus size={18} /> Nouveau Pointage
        </button>
      </div>

      {/* MODAL DE POINTAGE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A110D]/80 backdrop-blur-md">
          <div className={`w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden border ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#FDFBF7] border-white'
          }`}>
            <div className="p-10 border-b border-slate-100/10 flex justify-between items-center">
              <div>
                <h3 className={`text-3xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Appel du jour</h3>
                <p className="text-[10px] font-black text-[#BC6C25] uppercase tracking-widest mt-1 italic">Pointer les présences sur le terrain</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-white/10 rounded-2xl transition-all">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Cours / Section</label>
                  <select 
                    value={selectedSection}
                    onChange={(e) => { setSelectedSection(e.target.value); setShowAllDogs(false); }}
                    className={`w-full p-4 rounded-2xl border-none font-bold outline-none ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}
                  >
                    {sectionsList.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Moniteur</label>
                  <select 
                    value={responsibleId}
                    onChange={(e) => setResponsibleId(e.target.value)}
                    className={`w-full p-4 rounded-2xl border-none font-bold outline-none ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}
                  >
                    <option value="">Sélectionner...</option>
                    {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
              </div>

              {/* ZONE ESSAI / CHIEN LIBRE */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Nouveau / Essai (Champs libre)</label>
                <div className="flex gap-4">
                   <div className={`flex-1 flex items-center px-4 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-white shadow-inner'}`}>
                     <Dog size={18} className="text-[#BC6C25] mr-3" />
                     <input 
                      type="text" 
                      placeholder="Nom du chien en essai..." 
                      className="w-full py-4 bg-transparent border-none outline-none font-bold text-sm"
                      value={guestDog}
                      onChange={(e) => setGuestDog(e.target.value)}
                     />
                   </div>
                </div>
              </div>

              {/* LISTE DES CHIENS */}
              <div className="space-y-4">
                <div className="flex justify-between items-center ml-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Chiens de la section ({sectionDogs.length})
                  </label>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {sectionDogs.map(dog => (
                    <button
                      key={dog.id}
                      onClick={() => toggleDog(dog.id)}
                      className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-tight transition-all border flex items-center justify-between ${
                        presentDogIds.includes(dog.id)
                        ? 'bg-[#1B4332] text-white border-transparent shadow-lg'
                        : 'bg-white text-slate-400 border-slate-100 hover:border-[#BC6C25]'
                      }`}
                    >
                      <span className="truncate">{dog.name}</span>
                      {presentDogIds.includes(dog.id) && <Check size={14} />}
                    </button>
                  ))}
                </div>

                {/* BOUTON POUR AFFICHER LES AUTRES */}
                <div className="pt-4">
                  <button 
                    onClick={() => setShowAllDogs(!showAllDogs)}
                    className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#BC6C25] hover:opacity-80 transition-all"
                  >
                    {showAllDogs ? <ChevronUp size={14} /> : <Plus size={14} />}
                    {showAllDogs ? 'Masquer les autres' : 'Afficher les autres sections'}
                  </button>
                </div>

                {showAllDogs && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-in slide-in-from-top-2 duration-300">
                    {otherDogs.map(dog => (
                      <button
                        key={dog.id}
                        onClick={() => toggleDog(dog.id)}
                        className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-tight transition-all border flex items-center justify-between ${
                          presentDogIds.includes(dog.id)
                          ? 'bg-[#BC6C25] text-white border-transparent shadow-lg'
                          : 'bg-slate-50 text-slate-300 border-slate-100'
                        }`}
                      >
                        <span className="truncate">{dog.name}</span>
                        {presentDogIds.includes(dog.id) && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-10 bg-[#1B4332]/5">
              <button className="w-full py-6 bg-[#1B4332] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-xl hover:bg-[#BC6C25] transition-all">
                Enregistrer la séance
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Presences;
