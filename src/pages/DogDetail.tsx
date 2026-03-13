import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { 
  ArrowLeft, Dog, Calendar, Fingerprint, 
  ShieldCheck, Activity, Trophy, User, Edit3, X, Save, Camera,
  MapPin, Clock
} from 'lucide-react';

interface DogDetailProps {
  dogId: string;
  onBack: () => void;
}

const DogDetail: React.FC<DogDetailProps> = ({ dogId, onBack }) => {
  const { dogs, members, attendances, darkMode, uploadDogPhoto, updateDog } = useStore();
  const dog = dogs.find(d => d.id === dogId);
  const owner = members.find(m => m.id === dog?.ownerId);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  // Configuration des terrains pour les couleurs de la timeline
  const terrainsACV = [
    { id: 'Principal - Zone A', color: '#FF4500' },
    { id: 'Principal - Zone B', color: '#FF4500' },
    { id: 'Chiots', color: '#FF00FF' },
    { id: 'Agility', color: '#EAB308' },
    { id: 'Du Fond', color: '#87CEEB' },
    { id: 'Prairie', color: '#22C55E' }
  ];

  // Extraction de l'historique de présence
  const dogAttendances = attendances
    .filter(att => att.presentDogIds?.includes(dogId))
    .sort((a, b) => b.date.localeCompare(a.date));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (dog) {
      setFormData({ ...dog });
    }
  }, [dogId, dog]);

  if (!dog) return null;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateDog(dog.id, formData);
    setIsEditModalOpen(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadDogPhoto(dog.id, file);
    }
  };

  const InfoCard = ({ icon: Icon, label, value, color }: any) => (
    <div className={`p-8 rounded-[40px] border transition-all ${
      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-emerald-50'} ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.2em] mb-1 italic">{label}</p>
      <p className={`text-xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{value || 'NC'}</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* NAVIGATION */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all ${darkMode ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-[#1B4332] shadow-md'}`}>
          <ArrowLeft size={16} /> Retour à la meute
        </button>
        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase bg-[#BC6C25] text-white shadow-lg hover:scale-105 transition-all">
          <Edit3 size={16} /> Édition
        </button>
      </div>

      {/* HEADER SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="relative group mx-auto lg:mx-0">
          <div className="w-64 h-64 rounded-[60px] overflow-hidden border-8 border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
            {dog.photo ? (
              <img src={dog.photo} alt={dog.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-200">
                <Dog size={80} strokeWidth={1} />
              </div>
            )}
          </div>
          <label className="absolute -bottom-2 -right-2 bg-[#BC6C25] text-white p-4 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-all z-10">
            <Camera size={20} />
            <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
          </label>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className={`text-7xl font-serif italic tracking-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{dog.name}</h2>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-4 py-2 bg-[#BC6C25]/10 text-[#BC6C25] text-[10px] font-black uppercase tracking-widest rounded-full italic border border-[#BC6C25]/20">
                {dog.breed || 'Race NC'}
              </span>
              <span className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                dog.sex === 'M' ? 'bg-blue-50 text-blue-600 border-blue-100' : 
                dog.sex === 'F' ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                'bg-slate-100 text-slate-400 border-slate-200'
              }`}>
                {dog.sex === 'M' ? 'Mâle' : dog.sex === 'F' ? 'Femelle' : 'Sexe NC'}
              </span>
            </div>
          </div>
          <div className={`p-8 rounded-[40px] border-l-8 border-[#BC6C25] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-lg'}`}>
            <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-widest mb-2 flex items-center gap-2 italic"><User size={14} /> Propriétaire</p>
            <p className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{owner ? `${owner.firstName} ${owner.name}` : 'Aucun propriétaire lié'}</p>
          </div>
        </div>
      </div>

      {/* CARDS INFO ET TIMELINE */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          <InfoCard icon={Calendar} label="Date de Naissance" value={dog.birthDate ? new Date(dog.birthDate).toLocaleDateString('fr-FR') : 'NC'} color="text-amber-500" />
          <InfoCard icon={Fingerprint} label="Numéro ICAD / Puce" value={dog.icad} color="text-blue-500" />
          <InfoCard icon={ShieldCheck} label="Statut Vaccinal" value={dog.vaccines} color="text-emerald-500" />
          <InfoCard icon={Activity} label="Section" value={dog.section} color="text-purple-500" />
          <InfoCard icon={Trophy} label="Niveau de travail" value={dog.level} color="text-amber-600" />
          <div className={`p-8 rounded-[40px] border flex flex-col justify-center items-center text-center space-y-2 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#1B4332] border-transparent text-white'}`}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 italic">Licence Club</p>
            <p className="text-3xl font-serif italic">ACV-{dogId.slice(0,4).toUpperCase()}</p>
          </div>
        </div>

        {/* TIMELINE DE PRÉSENCE */}
        <div className={`p-10 rounded-[40px] border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
          <div className="flex items-center gap-3 mb-10">
            <Clock className="text-[#BC6C25]" size={22} />
            <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Historique des séances</h3>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-[11px] before:w-px before:bg-slate-100 dark:before:bg-slate-800">
            {dogAttendances.length > 0 ? (
              dogAttendances.map((att, i) => {
                const terrain = terrainsACV.find(t => t.id === att.terrain);
                const coaches = (att.responsibleIds || [att.responsibleId])
                  .map(id => members.find(m => m.id === id)?.firstName)
                  .filter(Boolean)
                  .join(', ');

                return (
                  <div key={i} className="relative pl-10 animate-in slide-in-from-left duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 shadow-md" style={{ backgroundColor: terrain?.color || '#BC6C25' }}></div>
                    <div>
                      <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest italic leading-none mb-1">
                        {new Date(att.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                      </p>
                      <h4 className={`text-lg font-serif italic leading-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{att.section}</h4>
                      <div className="flex flex-col gap-1 mt-2 text-slate-400 text-[9px] font-bold uppercase tracking-tight">
                        <span className="flex items-center gap-1.5"><MapPin size={10} className="text-[#BC6C25]" /> {att.terrain}</span>
                        <span className="flex items-center gap-1.5"><User size={10} className="text-[#BC6C25]" /> {coaches || 'Moniteur NC'}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-300 font-serif italic text-sm">Aucune séance enregistrée pour le moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MODALE D'ÉDITION */}
      {isEditModalOpen && formData && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#1B4332]/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className={`w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'}`}>
            <div className="p-8 flex items-center justify-between border-b border-slate-50">
              <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Édition de {dog.name}</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-8 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-[#BC6C25] ml-2 tracking-widest italic">Nom</label>
                  <input type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-[#BC6C25] ml-2 tracking-widest italic">Sexe</label>
                  <select value={formData.sex || ''} onChange={e => setFormData({...formData, sex: e.target.value})} className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}>
                    <option value="">Non renseigné</option>
                    <option value="M">Mâle</option>
                    <option value="F">Femelle</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-[#BC6C25] ml-2 tracking-widest italic">Section Club</label>
                  <select value={formData.section || ''} onChange={e => setFormData({...formData, section: e.target.value})} className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}>
                    <option value="">Choisir...</option>
                    <option value="École du Chiot">École du Chiot</option>
                    <option value="Éducation">Éducation</option>
                    <option value="Agility">Agility</option>
                    <option value="Obéissance">Obéissance</option>
                    <option value="Ring">Ring</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-[#BC6C25] ml-2 tracking-widest italic">Niveau</label>
                  <input type="text" value={formData.level || ''} onChange={e => setFormData({...formData, level: e.target.value})} className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-[#BC6C25] ml-2 tracking-widest italic">ICAD / Puce</label>
                <input type="text" value={formData.icad || ''} onChange={e => setFormData({...formData, icad: e.target.value})} className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} />
              </div>

              <button type="submit" className="w-full py-5 mt-4 rounded-2xl bg-[#1B4332] text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all flex items-center justify-center gap-2">
                <Save size={16} /> Enregistrer les modifications
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DogDetail;
