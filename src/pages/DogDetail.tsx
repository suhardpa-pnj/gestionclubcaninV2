import React from 'react';
import { useStore } from '../store/useStore';
import { 
  ArrowLeft, Dog, Calendar, Fingerprint, 
  ShieldCheck, Activity, Trophy, User, Bone
} from 'lucide-react';

interface DogDetailProps {
  dogId: string;
  onBack: () => void;
}

const DogDetail: React.FC<DogDetailProps> = ({ dogId, onBack }) => {
  const { dogs, members, darkMode } = useStore();
  const dog = dogs.find(d => d.id === dogId);
  const owner = members.find(m => m.id === dog?.ownerId);

  if (!dog) return null;

  const InfoCard = ({ icon: Icon, label, value, color }: any) => (
    <div className={`p-8 rounded-[40px] border transition-all ${
      darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${darkMode ? 'bg-slate-800' : 'bg-emerald-50'} ${color}`}>
          <Icon size={20} />
        </div>
      </div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
      <p className={`text-xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{value || 'Non renseigné'}</p>
    </div>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* NAVIGATION & ACTIONS */}
      <div className="flex items-center justify-between">
        <button 
          onClick={onBack}
          className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase transition-all ${
            darkMode ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-white text-[#1B4332] shadow-md hover:shadow-lg'
          }`}
        >
          <ArrowLeft size={16} /> Retour à la meute
        </button>
      </div>

      {/* HEADER : PHOTO & IDENTITÉ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="relative group">
          <div className="aspect-square rounded-[60px] overflow-hidden border-8 border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
            {dog.photo ? (
              <img src={dog.photo} alt={dog.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-200">
                <Dog size={120} strokeWidth={1} />
              </div>
            )}
          </div>
          <div className="absolute -bottom-4 -right-4 bg-[#BC6C25] text-white p-6 rounded-full shadow-2xl -rotate-12 group-hover:rotate-0 transition-transform">
            <Bone size={32} />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className={`text-7xl font-serif italic tracking-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
              {dog.name}
            </h2>
            <div className="flex items-center gap-4 mt-4">
              <span className="px-4 py-2 bg-[#BC6C25]/10 text-[#BC6C25] text-[10px] font-black uppercase tracking-widest rounded-full italic border border-[#BC6C25]/20">
                {dog.breed || 'Race Inconnue'}
              </span>
              <span className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                dog.sex === 'M' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                {dog.sex === 'M' ? 'Mâle' : 'Femelle'}
              </span>
            </div>
          </div>
          
          <div className={`p-8 rounded-[40px] border-l-8 border-[#BC6C25] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-lg'}`}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <User size={14} /> Propriétaire
            </p>
            <p className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
              {owner ? `${owner.firstName} ${owner.name}` : 'Aucun propriétaire lié'}
            </p>
          </div>
        </div>
      </div>

      {/* GRILLE D'INFORMATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <InfoCard 
          icon={Calendar} 
          label="Date de Naissance" 
          value={dog.birthDate ? new Date(dog.birthDate).toLocaleDateString('fr-FR') : 'NC'} 
          color="text-amber-500" 
        />
        <InfoCard 
          icon={Fingerprint} 
          label="Numéro ICAD / Puce" 
          value={dog.icad} 
          color="text-blue-500" 
        />
        <InfoCard 
          icon={ShieldCheck} 
          label="Statut Vaccinal" 
          value={dog.vaccines} 
          color="text-emerald-500" 
        />
        <InfoCard 
          icon={Activity} 
          label="Section" 
          value={dog.section} 
          color="text-purple-500" 
        />
        <InfoCard 
          icon={Trophy} 
          label="Niveau de travail" 
          value={dog.level} 
          color="text-amber-600" 
        />
        <div className={`p-8 rounded-[40px] border flex flex-col justify-center items-center text-center space-y-2 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#1B4332] border-transparent text-white'
        }`}>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 italic">Licence Club</p>
          <p className="text-3xl font-serif italic">ACV-{dogId.slice(0,4).toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default DogDetail;
