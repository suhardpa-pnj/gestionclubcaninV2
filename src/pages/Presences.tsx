import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Plus, User, Check, X, Dog, ChevronUp, Calendar, AlertTriangle } from 'lucide-react';

const Presences = () => {
  const { members, dogs, attendances, darkMode, addAttendance } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // État du pointage
  const [sessionDate, setSessionDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedSection, setSelectedSection] = useState('École du Chiot');
  const [presentDogIds, setPresentDogIds] = useState<string[]>([]);
  const [responsibleId, setResponsibleId] = useState('');
  const [guestDog, setGuestDog] = useState('');
  const [showAllDogs, setShowAllDogs] = useState(false);
  const [isRAS, setIsRAS] = useState(true);
  const [sessionNotes, setSessionNotes] = useState('');

  const sectionsList = ['École du Chiot', 'Éducation', 'Obéissance', 'Agility', 'Ring'];
  const sectionDogs = dogs.filter(d => d.sections?.includes(selectedSection));
  const otherDogs = dogs.filter(d => !d.sections?.includes(selectedSection));

  const toggleDog = (id: string) => {
    setPresentDogIds(prev => 
      prev.includes(id) ? prev.filter(did => did !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!responsibleId) return alert("Sélectionnez un moniteur !");

    const payload = {
      date: sessionDate,
      createdAt: new Date().toISOString(),
      section: selectedSection,
      responsibleId,
      presentDogIds,
      guestDog,
      isRAS,
      notes: sessionNotes,
    };

    await addAttendance(payload);
    
    // Reset et Fermeture
    setIsModalOpen(false);
    setPresentDogIds([]);
    setGuestDog('');
    setSessionNotes('');
    setIsRAS(true);
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
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-[#1B4332] text-white rounded-[24px] font-black uppercase text-[10px] tracking-widest shadow-xl hover:scale-105 transition-all"
        >
          <Plus size={18} /> Nouveau Pointage
        </button>
      </div>

      {/* HISTORIQUE RÉEL DEPUIS FIREBASE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attendances.length > 0 ? attendances.map((att) => {
          const coach = members.find(m => m.id === att.responsibleId);
          return (
            <div key={att.id} className={`p-8 rounded-[40px] border transition-all ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
            }`}>
              <div className="flex justify-between items-start mb-6">
                <span className="px-3 py-1 bg-[#BC6C25]/10 text-[#BC6C25] text-[8px] font-black uppercase tracking-widest rounded-full border border-[#BC6C25]/20">
                  {att.section}
                </span>
                <span className="text-[10px] font-bold text-slate-400">{att.date}</span>
              </div>
              <h3 className={`text-xl font-serif italic mb-4 ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                {att.presentDogIds?.length + (att.guestDog ? 1 : 0)} Chiens présents
              </h3>
              <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-tight">
                <User size={14} className="text-[#BC6C25]" /> Moniteur : {coach?.name || 'Inconnu'}
              </div>
              {!att.isRAS && (
                <div className="mt-4 pt-4 border-t border-slate-100/10 flex items-center gap-2 text-rose-500 text-[9px] font-black uppercase">
                  <AlertTriangle size={12} /> Incident ou note signalée
                </div>
              )}
            </div>
          );
        }) : (
          <p className="text-slate-400 font-serif italic col-span-full text-center py-20">Aucune fiche de séance enregistrée.</p>
        )}
      </div>

      {/* MODAL DE SÉANCE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A110D]/80 backdrop-blur-md">
          <form onSubmit={handleSubmit} className={`w-full max-w-3xl rounded-[3rem] shadow-2xl overflow-hidden border ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#FDFBF7] border-white'
          }`}>
            <div className="p-10 border-b border-slate-100/10 flex justify-between items-center">
              <div>
                <h3 className={`text-3xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Fiche de séance</h3>
                <p className="text-[10px] font-black text-[#BC6C25] uppercase tracking-widest mt-1 italic">
                  Saisie terrain ACV
                </p>
              </div>
              <button type="button" onClick={() => setIsModalOpen(false)} className="p-4 hover:bg-white/10 rounded-2xl transition-all">
                <X size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="p-10 space-y-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Date du cours</label>
                  <input type="date" value={sessionDate} onChange={(e) => setSessionDate(e.target.value)}
                    className={`w-full p-4 rounded-2xl border-none
