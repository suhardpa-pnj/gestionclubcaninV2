import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  ArrowLeft, User, Phone, Mail, MapPin, 
  Dog, ShieldCheck, Edit3, X, Save, Camera, Calendar // Ajout de Calendar ici
} from 'lucide-react';

interface MemberDetailProps {
  memberId: string;
  onBack: () => void;
}

const MemberDetail: React.FC<MemberDetailProps> = ({ memberId, onBack }) => {
  const { members, dogs, darkMode, updateMember, uploadMemberPhoto } = useStore();
  const member = members.find(m => m.id === memberId);
  const memberDogs = dogs.filter(d => d.ownerId === memberId);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState(member || {});

  if (!member) return null;

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await uploadMemberPhoto(member.id, file);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateMember(member.id, formData);
    setIsEditModalOpen(false);
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
          <ArrowLeft size={16} /> Retour aux membres
        </button>

        <button 
          onClick={() => setIsEditModalOpen(true)}
          className="flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase bg-[#BC6C25] text-white shadow-lg hover:scale-105 transition-all"
        >
          <Edit3 size={16} /> Édition
        </button>
      </div>

      {/* HEADER : PHOTO & IDENTITÉ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="relative group mx-auto lg:mx-0">
          <div className="w-64 h-64 rounded-[60px] overflow-hidden border-8 border-white shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-emerald-50 flex items-center justify-center text-emerald-200">
                <User size={80} strokeWidth={1} />
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
            <h2 className={`text-7xl font-serif italic tracking-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
              {member.firstName} <span className="text-[#BC6C25]">{member.name}</span>
            </h2>
            <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-4 italic">
              Adhérent ACV • Licence n° {member.id.slice(0,6).toUpperCase()}
            </p>
          </div>
          
          <div className={`p-8 rounded-[40px] border-l-8 border-[#1B4332] ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-lg'}`}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">La Meute associée</p>
            <div className="flex flex-wrap gap-4">
              {memberDogs.length > 0 ? memberDogs.map(dog => (
                <div key={dog.id} className="flex items-center gap-3 px-4 py-2 bg-emerald-50 text-[#1B4332] rounded-2xl border border-emerald-100">
                  <Dog size={16} />
                  <span className="font-serif italic text-sm">{dog.name}</span>
                </div>
              )) : (
                <p className="text-xs italic text-slate-400">Aucun chien rattaché</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* GRILLE D'INFORMATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <InfoCard icon={Phone} label="Téléphone" value={member.phone} color="text-blue-500" />
        <InfoCard icon={Mail} label="Email" value={member.email} color="text-amber-500" />
        <InfoCard icon={MapPin} label="Adresse" value={member.address} color="text-rose-500" />
        <InfoCard icon={ShieldCheck} label="Statut Adhésion" value={member.status || 'Actif'} color="text-emerald-500" />
        <InfoCard icon={Calendar} label="Date d'inscription" value={member.joinDate} color="text-purple-500" />
      </div>

      {/* MODALE D'ÉDITION */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#1B4332]/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className={`w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'}`}>
            <div className="p-8 flex items-center justify-between border-b border-slate-50">
              <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Modifier l'adhérent</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleUpdate} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Nom</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Prénom</label>
                  <input type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Téléphone</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">Adresse complète</label>
                <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className={`w-full p-3 rounded-xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} />
              </div>

              <button type="submit" className="w-full py-4 mt-4 rounded-2xl bg-[#1B4332] text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all flex items-center justify-center gap-2">
                <Save size={16} /> Enregistrer les modifications
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetail;
