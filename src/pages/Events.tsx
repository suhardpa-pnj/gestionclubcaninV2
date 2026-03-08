import React from 'react';
import { useStore } from '../store/useStore';
import { CalendarDays, Trophy, MapPin, Clock } from 'lucide-react';

const Events = () => {
  const { darkMode } = useStore();

  const clubEvents = [
    { title: "Concours Ring", date: "15 Mai 2026", type: "Compétition", location: "Terrain Principal" },
    { title: "Portes Ouvertes", date: "12 Juin 2026", type: "Club", location: "Accueil" },
    { title: "Stage Agility", date: "04 Juillet 2026", type: "Formation", location: "Espace Agility" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-800'}`}>Événements</h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Calendrier de la saison 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubEvents.map((event, i) => (
          <div key={i} className={`p-8 rounded-[40px] border transition-all ${darkMode ? 'bg-slate-900 border-slate-800 shadow-none' : 'bg-white border-slate-100 shadow-sm'}`}>
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-900/20">
                <CalendarDays size={24} />
              </div>
              <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${darkMode ? 'bg-slate-950 text-slate-500' : 'bg-slate-50 text-slate-400'}`}>
                {event.type}
              </span>
            </div>
            
            <h3 className={`text-xl font-black uppercase italic mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>{event.title}</h3>
            
            <div className="space-y-3 pt-4 border-t border-slate-800/10">
              <div className="flex items-center gap-3 text-slate-500">
                <Clock size={14} />
                <span className="text-xs font-bold">{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <MapPin size={14} />
                <span className="text-xs font-bold uppercase">{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
