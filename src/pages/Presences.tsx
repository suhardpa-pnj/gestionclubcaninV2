import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, Calendar, MapPin, User, Check, X, ClipboardCheck, AlertCircle } from 'lucide-react';

const Presences = () => {
  const { members, dogs, darkMode } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // État pour le nouveau pointage
  const [selectedSection, setSelectedSection] = useState('École du Chiot');
  const [presentDogIds, setPresentDogIds] = useState<string[]>([]);
  const [responsibleId, setResponsibleId] = useState('');
  const [notes, setNotes] = useState('');

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

      {/* GRILLE HISTORIQUE (MOCKUP) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className={`p-8 rounded-[40px] border transition-all ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
          }`}>
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-[#BC6C25]/10 text-[#BC6C25] text-[8px] font-black uppercase tracking-widest rounded-full border border-[#BC6C25]/20">
                Agility
              </span>
              <span className="text-[10px] font-bold text-slate-400">10/03/2026</span>
            </div>
            <h3 className={`text-xl font-serif italic mb-4 ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
              {8 + i} Chiens présents
            </h3>
            <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-tight">
              <User size={14} className="text-[#BC6C25]" /> Responsable : Jean D.
            </div>
          </div>
        ))}
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
                <p className="text-[10px] font-black text-[#BC6C25] uppercase tracking-widest mt-1">Sélectionnez les chiens présents sur le terrain</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-white/10 rounded-2xl transition-all">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              {/* CONFIG SÉANCE */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Section</label>
                  <select 
                    value={selectedSection}
                    onChange={(e) => setSelectedSection(e.target.value)}
                    className={`w-full p-4 rounded-2xl border-none font-bold outline-none ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}
                  >
                    <option>École du Chiot</option>
                    <option>Ring</option>
                    <option>Agility</option>
                    <option>Éducation</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Responsable</label>
                  <select 
                    value={responsibleId}
                    onChange={(e) => setResponsibleId(e.target.value)}
                    className={`w-full p-4 rounded-2xl border-none font-bold outline-none ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}
                  >
                    <option value="">Choisir un moniteur...</option>
                    {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                  </select>
                </div>
              </div>

              {/* LISTE DES CHIENS (POINTAGE) */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Chiens attendus</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {dogs.map(dog => (
                    <button
                      key={dog.id}
                      onClick={() => toggleDog(dog.id)}
                      className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-tight transition-all border flex items-center justify-between ${
                        presentDogIds.includes(dog.id)
                        ? 'bg-[#1B4332] text-white border-transparent shadow-lg scale-95'
                        : 'bg-white text-slate-400 border-slate-100 hover:border-[#BC6C25]'
                      }`}
                    >
                      <span className="truncate">{dog.name}</span>
                      {presentDogIds.includes(dog.id) && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-10 bg-[#1B4332]/5">
              <button className="w-full py-6 bg-[#BC6C25] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-xl hover:bg-[#1B4332] transition-all">
                Enregistrer la feuille d'appel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Presences;
