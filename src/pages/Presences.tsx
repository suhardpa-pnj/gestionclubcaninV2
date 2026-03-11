import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, User, Check, X, Dog, ChevronUp, Calendar, AlertTriangle, Map as MapIcon, Globe, MapPin, Image as ImageIcon } from 'lucide-react';

const Presences = () => {
  const { members, dogs, attendances, darkMode, addAttendance } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSection, setSelectedSection] = useState('École du Chiot');
  const [presentDogIds, setPresentDogIds] = useState<string[]>([]);
  const [responsibleId, setResponsibleId] = useState('');
  const [guestDog, setGuestDog] = useState('');
  const [showAllDogs, setShowAllDogs] = useState(false);
  const [isRAS, setIsRAS] = useState(true);
  const [sessionNotes, setSessionNotes] = useState('');
  
  const [selectedTerrain, setSelectedTerrain] = useState('Principal - Zone A');
  const [isExterior, setIsExterior] = useState(false);
  const [exteriorLocation, setExteriorLocation] = useState('');

  const sectionsList = ['École du Chiot', 'Éducation', 'Obéissance', 'Agility', 'Ring'];
  
  const terrainsACV = [
    { id: 'Principal - Zone A', label: 'Principal A' },
    { id: 'Principal - Zone B', label: 'Principal B' },
    { id: 'Chiots', label: 'Chiots' },
    { id: 'Agility', label: 'Agility' },
    { id: 'Du Fond', label: 'Terrain du Fond' },
    { id: 'Prairie', label: 'Prairie' }
  ];

  // Filtrage uniquement des moniteurs
  const instructors = members.filter(m => m.role === 'Moniteur' || m.category === 'MONITEUR');

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
        terrain: isExterior ? `Extérieur : ${exteriorLocation}` : selectedTerrain,
        type: isExterior ? 'EXTERIOR' : 'CLUB'
      });
      setIsModalOpen(false);
      setPresentDogIds([]);
      setGuestDog('');
      setSessionNotes('');
      setIsRAS(true);
      setIsExterior(false);
      setExteriorLocation('');
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
            Suivi des appels • AC Vernoise
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
                  <User size={14} className="text-[#BC6C25]" /> {coach?.name || 'Moniteur'}
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-tight">
                  <MapPin size={14} className="text-[#BC6C25]" /> {att.terrain}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4 bg-[#0A110D]/90 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className={`w-full max-w-2xl h-full md:h-auto md:max-h-[95vh] flex flex-col rounded-none md:rounded-[3rem] shadow-2xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#FDFBF7] border-white'}`}>
            
            {/* HEADER FIXE */}
            <div className="p-8 border-b border-slate-100/10 flex justify-between items-center bg-inherit">
              <div>
                <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Fiche de séance</h3>
                <p className="text-[9px] font-black text-[#BC6C25] uppercase tracking-widest mt-1 italic">
                  Ouverte le {formatDateDisplay(new Date().toISOString())}
                </p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            {/* CONTENU SCROLLABLE */}
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              <div className="grid grid-cols-1 gap-8">
                
                {/* CONFIG DATE & MONITEUR */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Date</label>
                    <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} className={`w-full p-4 rounded-xl border-none font-bold outline-none text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Moniteur</label>
                    <select value={responsibleId} onChange={(e) => setResponsibleId(e.target.value)} className={`w-full p-4 rounded-xl border-none font-bold outline-none h-[48px] text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}>
                      <option value="">Choisir...</option>
                      {instructors.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                    </select>
                  </div>
                </div>

                {/* TERRAINS */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Terrain</label>
                      <button type="button" onClick={() => setShowMap(!showMap)} className="text-[#BC6C25] hover:underline text-[9px] font-black uppercase flex items-center gap-1">
                        <ImageIcon size={12} /> Carte
                      </button>
                    </div>
                    <button type="button" onClick={() => setIsExterior(!isExterior)} className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${isExterior ? 'bg-[#BC6C25] text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Globe size={12} /> Extérieur
                    </button>
                  </div>

                  {showMap && (
                    <div className="p-2 bg-slate-100 rounded-2xl animate-in zoom-in-95 duration-300">
                      <div className="aspect-video bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-[10px] font-bold italic uppercase">
                        [ Affichage du Plan ACV ]
                      </div>
                    </div>
                  )}

                  {!isExterior ? (
                    <div className="grid grid-cols-2 gap-2 p-2 bg-emerald-900/5 rounded-[2rem]">
                      {terrainsACV.map(t => (
                        <button key={t.id} type="button" onClick={() => setSelectedTerrain(t.id)} className={`h-10 rounded-xl border-2 flex items-center justify-center transition-all ${selectedTerrain === t.id ? 'bg-[#1B4332] border-[#BC6C25] text-white' : 'bg-white border-transparent text-slate-400'}`}>
                          <span className="text-[8px] font-black uppercase tracking-widest">{t.label}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input type="text" value={exteriorLocation} onChange={(e) => setExteriorLocation(e.target.value)} className={`w-full p-4 rounded-xl border-none font-bold outline-none text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-md'}`} placeholder="Lieu (Ville, Forêt...)" />
                  )}
                </div>

                {/* SECTION & APPEL */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    {sectionsList.map(s => (
                      <button key={s} type="button" onClick={() => setSelectedSection(s)} className={`px-3 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${selectedSection === s ? 'bg-[#1B4332] text-white' : 'bg-white text-slate-400 border border-slate-100'}`}>
                        {s}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Appel ({sectionDogs.length})</label>
                    <div className="grid grid-cols-2 gap-2">
                      {sectionDogs.map(dog => (
                        <button type="button" key={dog.id} onClick={() => toggleDog(dog.id)} className={`p-4 rounded-xl text-[9px] font-black uppercase tracking-tight border flex items-center justify-between transition-all ${presentDogIds.includes(dog.id) ? 'bg-[#1B4332] text-white border-transparent' : 'bg-white text-slate-400'}`}>
                          <span className="truncate">{dog.name}</span>
                          {presentDogIds.includes(dog.id) && <Check size={12} />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* NOTES */}
                <div className="pt-6 border-t border-slate-100/10 space-y-4">
                  <button type="button" onClick={() => setIsRAS(!isRAS)} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isRAS ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300'}`}>
                      {isRAS && <Check size={14} />}
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Rien à signaler</span>
                  </button>
                  {!isRAS && <textarea value={sessionNotes} onChange={(e) => setSessionNotes(e.target.value)} className={`w-full p-4 rounded-2xl border-none outline-none font-medium text-xs min-h-[80px] ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`} placeholder="Notes d'incidents..." />}
                </div>
              </div>
            </div>

            {/* BOUTON ENREGISTRER FIXE */}
            <div className="p-6 bg-inherit border-t border-slate-100/10">
              <button type="submit" className="w-full py-5 bg-[#1B4332] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all">
                Enregistrer la séance
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Presences;
