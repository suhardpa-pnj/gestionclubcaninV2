import React, { useState } from 'react';
import { Calendar, MapPin, Users, Plus, Filter, Clock } from 'lucide-react';

const Events: React.FC = () => {
  // Données fictives pour l'agenda
  const events = [
    { id: 1, title: 'Entraînement Agility', date: '12 Mars 2026', time: '14:00', section: 'Agility', attendees: 8, location: 'Terrain A' },
    { id: 2, title: 'École du Chiot', date: '14 Mars 2026', time: '10:30', section: 'Éducation', attendees: 12, location: 'Petit Terrain' },
    { id: 3, title: 'Concours Obéissance', date: '22 Mars 2026', time: '09:00', section: 'Obéissance', attendees: 25, location: 'Stade Municipal' },
  ];

  const sections = ['Tous', 'Éducation', 'Agility', 'Obéissance', 'Ring'];
  const [activeSection, setActiveSection] = useState('Tous');

  const filteredEvents = activeSection === 'Tous' 
    ? events 
    : events.filter(e => e.section === activeSection);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">Événements</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Agenda et activités du club</p>
        </div>
        <button className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-emerald-500 transition-all flex items-center space-x-3">
          <Plus size={18} />
          <span>Créer un événement</span>
        </button>
      </div>

      {/* FILTRES PAR SECTIONS */}
      <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-hide">
        {sections.map(s => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`px-5 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
              activeSection === s ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* LISTE DES ÉVÉNEMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col sm:flex-row">
            {/* DATE BOX */}
            <div className="bg-slate-50 p-8 flex flex-col items-center justify-center border-r border-slate-100 sm:w-40">
              <span className="text-3xl font-black text-slate-800 italic tracking-tighter">{event.date.split(' ')[0]}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.date.split(' ')[1]}</span>
            </div>

            {/* INFOS */}
            <div className="p-8 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-lg">
                  {event.section}
                </span>
                <div className="flex items-center text-slate-400">
                  <Clock size={14} className="mr-1" />
                  <span className="text-xs font-bold">{event.time}</span>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter mb-4">{event.title}</h3>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-slate-500">
                  <MapPin size={14} className="mr-2 text-emerald-500" />
                  <span className="text-xs font-bold">{event.location}</span>
                </div>
                <div className="flex items-center text-slate-500">
                  <Users size={14} className="mr-2 text-emerald-500" />
                  <span className="text-xs font-bold">{event.attendees} Inscrits</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
