import React, { useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { 
  Plus, User, Check, X, MapPin, 
  Image as ImageIcon, Trash2, Globe, Camera, Upload
} from 'lucide-react';

const Presences = () => {
  const { members, dogs, attendances, clubMap, darkMode, addAttendance, deleteAttendance, uploadClubMap } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSection, setSelectedSection] = useState('École du Chiot');
  const [presentDogIds, setPresentDogIds] = useState<string[]>([]);
  const [responsibleId, setResponsibleId] = useState('');
  const [guestDog, setGuestDog] = useState(''); // Utilisé pour le champ texte libre
  const [sessionNotes, setSessionNotes] = useState('');
  const [selectedTerrain, setSelectedTerrain] = useState('Principal - Zone A');
  const [isExterior, setIsExterior] = useState(false);
  const [exteriorLocation, setExteriorLocation] = useState('');
  const [isRAS, setIsRAS] = useState(true);
  const [showAllDogs, setShowAllDogs] = useState(false);

  const sectionsList = ['École du Chiot', 'Éducation', 'Obéissance', 'Agility', 'Ring'];
  
  // NOUVEAUX CODES COULEURS DEMANDÉS
  const terrainsACV = [
    { id: 'Principal - Zone A', label: 'Principal A', color: '#FF4500' }, // Rouge-orangé
    { id: 'Principal - Zone B', label: 'Principal B', color: '#FF4500' }, // Rouge-orangé
    { id: 'Chiots', label: 'Chiots', color: '#FF00FF' },              // Rose Fuschia
    { id: 'Agility', label: 'Agility', color: '#EAB308' },            // Jaune
    { id: 'Du Fond', label: 'Terrain du Fond', color: '#87CEEB' },    // Bleu ciel
    { id: 'Prairie', label: 'Prairie', color: '#22C55E' }             // Vert
  ];

  const instructors = members.filter(m => m.role === 'Moniteur' || m.category === 'MONITEUR');

  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  // LOGIQUE D'APPEL : Chiens de la section puis les autres
  const sectionDogs = dogs.filter(d => {
    const dogData = (d.section || d.sections || d.Activités || '').toString();
    return dogData.toLowerCase().includes(selectedSection.toLowerCase());
  });

  const otherDogs = dogs.filter(d => !sectionDogs.find(sd => sd.id === d.id));

  const toggleDog = (id: string) => {
    setPresentDogIds(prev => prev.includes(id) ? prev.filter(did => did !== id) : [...prev, id]);
  };

  const handleMapUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await uploadClubMap(file);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Supprimer cette feuille de présence ?")) {
      await deleteAttendance(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!responsibleId) return alert("⚠️ Sélectionnez un moniteur !");
    await addAttendance({
      date: sessionDate,
      createdAt: new Date().toISOString(),
      section: selectedSection,
      responsibleId,
      presentDogIds,
      guestDog, // Enregistre les noms saisis manuellement
      isRAS,
      notes: sessionNotes,
      terrain: isExterior ? `Extérieur : ${exteriorLocation}` : selectedTerrain,
      type: isExterior ? 'EXTERIOR' : 'CLUB'
    });
    setIsModalOpen(false);
    setPresentDogIds([]);
    setGuestDog('');
    setSessionNotes('');
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Feuilles de <span className="text-[#BC6C25]">Présence</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">Suivi des appels • AC Vernoise</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-3 px-8 py-4 bg-[#1B4332] text-white rounded-[24px] font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 transition-all">
          <Plus size={18} /> Nouveau Pointage
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attendances.map((att) => {
          const coach = members.find(m => m.id === att.responsibleId);
          return (
            <div key={att.id} className={`p-8 rounded-[40px] border transition-all relative group ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl'}`}>
              <button onClick={() => handleDelete(att.id)} className="absolute top-6 right-6 p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"><Trash2 size={16} /></button>
              <div className="flex justify-between items-start mb-6 pr-8">
                <span className="px-3 py-1 bg-[#BC6C25]/10 text-[#BC6C25] text-[8px] font-black uppercase tracking-widest rounded-full border border-[#BC6C25]/20">{att.section}</span>
                <span className="text-[10px] font-bold text-slate-400 capitalize">{formatDateDisplay(att.date)}</span>
              </div>
              <h3 className={`text-xl font-serif italic mb-4 ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{(att.presentDogIds?.length || 0)} Chiens inscrits</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-tight"><User size={14} className="text-[#BC6C25]" /> {coach ? coach.firstName : 'Moniteur NC'}</div>
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-tight"><MapPin size={14} className="text-[#BC6C25]" /> {att.terrain}</div>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4 bg-[#0A110D]/90 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className={`w-full max-w-2xl h-full md:h-auto md:max-h-[95vh] flex flex-col rounded-none md:rounded-[3rem] shadow-2xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#FDFBF7] border-white'}`}>
            
            <div className="p-8 border-b border-slate-100/10 flex justify-between items-center">
              <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Fiche de séance</h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-2xl transition-all"><X size={24} className="text-slate-400" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Date</label>
                  <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)} className={`w-full p-4 rounded-xl border-none font-bold outline-none text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Moniteur</label>
                  <select value={responsibleId} onChange={(e) => setResponsibleId(e.target.value)} className={`w-full p-4 rounded-xl border-none font-bold outline-none h-[48px] text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}>
                    <option value="">Choisir...</option>
                    {instructors.map(m => <option key={m.id} value={m.id}>{m.firstName} {m.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center px-2">
                  <div className="flex items-center gap-4">
                    <button type="button" onClick={() => setShowMap(!showMap)} className="text-[#BC6C25] hover:underline text-[9px] font-black uppercase flex items-center gap-2">
                      <ImageIcon size={14} /> {showMap ? 'Masquer le plan' : 'Voir le plan'}
                    </button>
                    {/* BOUTON POUR UPLOADER LE PLAN SUR FIREBASE */}
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="text-slate-400 hover:text-[#BC6C25] text-[9px] font-black uppercase flex items-center gap-2">
                      <Upload size={14} /> Charger plan
                    </button>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleMapUpload} />
                  </div>
                  <button type="button" onClick={() => setIsExterior(!isExterior)} className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${isExterior ? 'bg-[#BC6C25] text-white' : 'bg-slate-100 text-slate-400'}`}>
                    <Globe size={12} /> Extérieur
                  </button>
                </div>

                {showMap && (
                  <div className="rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl animate-in zoom-in-95 duration-300">
                    {clubMap ? (
                      <img src={clubMap} alt="Plan du club" className="w-full h-auto object-cover" />
                    ) : (
                      <div className="p-20 bg-slate-50 flex flex-col items-center justify-center text-slate-300 gap-4">
                        <Camera size={40} strokeWidth={1} />
                        <p className="text-[10px] font-black uppercase tracking-widest text-center">Aucun plan chargé.<br/>Utilisez le bouton "Charger plan".</p>
                      </div>
                    )}
                  </div>
                )}

                {!isExterior ? (
                  <div className="grid grid-cols-2 gap-3 p-3 bg-emerald-900/5 rounded-[2.5rem]">
                    {terrainsACV.map(t => (
                      <button 
                        key={t.id} 
                        type="button" 
                        onClick={() => setSelectedTerrain(t.id)} 
                        className={`h-12 rounded-2xl border-2 flex items-center justify-center transition-all ${
                          selectedTerrain === t.id 
                          ? 'border-white shadow-lg text-white' 
                          : 'bg-white border-transparent text-slate-400 opacity-60'
                        }`}
                        style={{ backgroundColor: selectedTerrain === t.id ? t.color : '' }}
                      >
                        <span className="text-[9px] font-black uppercase tracking-widest">{t.label}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <input type="text" value={exteriorLocation} onChange={(e) => setExteriorLocation(e.target.value)} className={`w-full p-4 rounded-xl border-none font-bold outline-none text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-md'}`} placeholder="Lieu (Ville, Forêt...)" />
                )}
              </div>

              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {sectionsList.map(s => (
                    <button key={s} type="button" onClick={() => setSelectedSection(s)} className={`px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest transition-all ${selectedSection === s ? 'bg-[#1B4332] text-white' : 'bg-white text-slate-400 border border-slate-100'}`}>{s}</button>
                  ))}
                </div>

                {/* APPEL DES CHIENS */}
                <div className="space-y-4">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">
                    Chiens de la section {selectedSection} ({sectionDogs.length})
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {sectionDogs.map(dog => (
                      <button type="button" key={dog.id} onClick={() => toggleDog(dog.id)} className={`p-4 rounded-2xl text-[9px] font-black uppercase tracking-tight border flex items-center justify-between transition-all ${presentDogIds.includes(dog.id) ? 'bg-[#1B4332] text-white border-transparent' : 'bg-white text-slate-400'}`}>
                        <span className="truncate">{dog.name}</span>
                        {presentDogIds.includes(dog.id) && <Check size={12} />}
                      </button>
                    ))}
                  </div>

                  <button type="button" onClick={() => setShowAllDogs(!showAllDogs)} className="text-[#BC6C25] text-[9px] font-black uppercase tracking-widest ml-2 flex items-center gap-2">
                    {showAllDogs ? 'Masquer les autres' : 'Afficher tous les chiens'}
                  </button>

                  {showAllDogs && (
                    <div className="grid grid-cols-2 gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      {otherDogs.map(dog => (
                        <button type="button" key={dog.id} onClick={() => toggleDog(dog.id)} className={`p-4 rounded-2xl text-[9px] font-black uppercase tracking-tight border flex items-center justify-between transition-all ${presentDogIds.includes(dog.id) ? 'bg-[#1B4332] text-white border-transparent' : 'bg-white text-slate-400'}`}>
                          <span className="truncate">{dog.name}</span>
                          {presentDogIds.includes(dog.id) && <Check size={12} />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* SÉANCE D'ESSAI TEXTE LIBRE */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-[#BC6C25] ml-2 italic">Séance d'essai pour nouveaux non inscrits</label>
                  <textarea 
                    value={guestDog} 
                    onChange={(e) => setGuestDog(e.target.value)} 
                    placeholder="Saisir les noms des chiens et propriétaires..."
                    className={`w-full p-4 rounded-2xl border-none outline-none font-medium text-xs min-h-[80px] ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}
                  />
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-slate-100/10">
              <button type="submit" className="w-full py-5 bg-[#1B4332] text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all">Enregistrer la séance</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Presences;
