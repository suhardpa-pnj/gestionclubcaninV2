import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, User, Check, X, Dog, ChevronUp, Calendar, AlertTriangle, Map as MapIcon, Globe } from 'lucide-react';

const Presences = () => {
  const { members, dogs, attendances, darkMode, addAttendance } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSection, setSelectedSection] = useState('École du Chiot');
  const [presentDogIds, setPresentDogIds] = useState<string[]>([]);
  const [responsibleId, setResponsibleId] = useState('');
  const [guestDog, setGuestDog] = useState('');
  const [showAllDogs, setShowAllDogs] = useState(false);
  const [isRAS, setIsRAS] = useState(true);
  const [sessionNotes, setSessionNotes] = useState('');
  
  // Nouveaux états : Terrain et Extérieur
  const [selectedTerrain, setSelectedTerrain] = useState('Terrain A');
  const [isExterior, setIsExterior] = useState(false);

  const sectionsList = ['École du Chiot', 'Éducation', 'Obéissance', 'Agility', 'Ring'];
  const terrains = ['Terrain A', 'Terrain B', 'Terrain Ring', 'Terrain Agility'];

  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  const sectionDogs = dogs.filter(d => {
    const dogSections = d.sections || d.section || d.Activités || '';
    return typeof dogSections === 'string' 
      ? dogSections.includes(selectedSection) 
      : Array.isArray(dogSections) && dogSections.includes(selectedSection);
  });

  const toggleDog = (id: string) => {
    setPresentDogIds(prev => prev.includes(id) ? prev.filter(did => did !== id) : [...prev, id]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!responsibleId) return alert("⚠️ Sélectionnez un moniteur !");

    try {
      await addAttendance({
        date: sessionDate,
        createdAt: new Date().toISOString(),
        section: selectedSection,
        responsibleId,
        presentDogIds,
        guestDog,
        isRAS,
        notes: sessionNotes,
        terrain: isExterior ? 'Extérieur' : selectedTerrain,
        type: isExterior ? 'EXTERIOR' : 'CLUB'
      });
      setIsModalOpen(false);
      setPresentDogIds([]);
      setGuestDog('');
      setSessionNotes('');
      setIsRAS(true);
      setIsExterior(false);
    } catch (error) {
      alert("⚠️ Erreur lors de l'enregistrement.");
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Feuilles de <span className="text-[#BC6C25]">Présence</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
            Suivi des appels et participations
          </p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 px-8 py-4 bg-[#1B4332] text-white rounded-[24px] font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 transition-all">
          <Plus size={18} /> Nouveau Pointage
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attendances.map((att) => {
          const coach = members.find(m => m.id === att.responsibleId);
          return (
            <div key={att.id} className={`p-8 rounded-[40px] border transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-[#BC6C25]/10 text-[#BC6C25] text-[8px] font-black uppercase tracking-widest rounded-full border border-[#BC6C25]/20">
                  {att.section}
                </span>
                <span className="text-[10px] font-bold text-slate-400 capitalize">{formatDateDisplay(att.date)}</span>
              </div>
              <h3 className={`text-xl font-serif italic mb-4 ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                {(att.presentDogIds?.length || 0) + (att.guestDog ? 1 : 0)} Chiens présents
              </h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-tight">
                  <User size={14} className="text-[#BC6C25]" /> Moniteur : {coach?.name || 'Inconnu'}
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-tight">
                  <MapIcon size={14} className="text-[#BC6C25]" /> {att.terrain || 'Terrain non défini'}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A110D]/80 backdrop-blur-md">
          <form onSubmit={handleSubmit} className={`w-full max-w-4xl rounded-[3rem] shadow-2xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#FDFBF7] border-white'}`}>
            <div className="p-10 border-b border-slate-100/10 flex justify-between items-center">
              <div>
                <h3 className={`text-3xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Fiche de séance</h3>
                <p className="text-[10px] font-black text-[#BC6C25] uppercase tracking-widest mt-1 italic">
                  Ouverte le {formatDateDisplay(new Date().toISOString())}
                </p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-white/10 rounded-2xl transition-all">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-10 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Date du cours</label>
                    <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} className={`w-full p-4 rounded-2xl border-none font-bold outline-none text-sm ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Moniteur</label>
                    <select value={responsibleId} onChange={(e) => setResponsibleId(e.target.value)} className={`w-full p-4 rounded-2xl border-none font-bold outline-none h-[52px] ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}>
                      <option value="">Choisir...</option>
                      {members.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                </div>

                {/* CARTE DU CLUB STYLISÉE */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Localisation du cours</label>
                    <button type="button" onClick={() => setIsExterior(!isExterior)} className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${isExterior ? 'bg-[#BC6C25] text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Globe size={12} /> Extérieur
                    </button>
                  </div>

                  {!isExterior ? (
                    <div className="grid grid-cols-2 gap-3 p-4 bg-emerald-900/5 rounded-[2.5rem] border border-emerald-900/10">
                      {terrains.map(t => (
                        <button key={t} type="button" onClick={() => setSelectedTerrain(t)} className={`h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${selectedTerrain === t ? 'bg-[#1B4332] border-[#BC6C25] text-white shadow-lg' : 'bg-white border-transparent text-slate-400 hover:border-emerald-200'}`}>
                          <MapIcon size={20} className={selectedTerrain === t ? 'text-[#BC6C25]' : 'text-slate-200'} />
                          <span className="text-[9px] font-black uppercase tracking-widest">{t}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="h-24 bg-[#BC6C25]/10 border-2 border-dashed border-[#BC6C25]/30 rounded-[2.5rem] flex items-center justify-center text-[#BC6C25] font-serif italic text-sm">
                      Cours hors des enceintes du club
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Section</label>
                  <div className="flex flex-wrap gap-2">
                    {sectionsList.map(s => (
                      <button key={s} type="button" onClick={() => setSelectedSection(s)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${selectedSection === s ? 'bg-[#1B4332] text-white' : 'bg-white text-slate-400 border border-slate-100'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Appel ({sectionDogs.length})</label>
                  <div className="grid grid-cols-2 gap-2">
                    {sectionDogs.map(dog => (
                      <button type="button" key={dog.id} onClick={() => toggleDog(dog.id)} className={`p-4 rounded-2xl text-[10px] font-black uppercase tracking-tight border flex items-center justify-between transition-all ${presentDogIds.includes(dog.id) ? 'bg-[#1B4332] text-white border-transparent' : 'bg-white text-slate-400 border-slate-100'}`}>
                        <span className="truncate">{dog.name}</span>
                        {presentDogIds.includes(dog.id) && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100/10 space-y-4">
                  <button type="button" onClick={() => setIsRAS(!isRAS)} className="flex items-center gap-3 group">
                    <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${isRAS ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>
                      {isRAS && <Check size={16} />}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Rien à signaler (RAS)</span>
                  </button>
                  {!isRAS && <textarea value={sessionNotes} onChange={(e) => setSessionNotes(e.target.value)} className={`w-full p-6 rounded-[2rem] border-none outline-none font-medium text-sm min-h-[100px] ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`} placeholder="Notes d'incidents..." />}
                </div>
              </div>
            </div>

            <div className="p-10 bg-[#1B4332]/5">
              <button type="submit" className="w-full py-6 bg-[#1B4332] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[11px] shadow-xl hover:bg-[#BC6C25] transition-all">
                Enregistrer la fiche de séance
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Presences;
