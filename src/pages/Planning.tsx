import React from 'react';
import { useStore } from '../store/useStore';
import { Clock, MapPin, User, Calendar as CalendarIcon } from 'lucide-react';

const Planning = () => {
  const { darkMode } = useStore();

  const weeklySchedule = [
    {
      day: 'Samedi',
      sessions: [
        { time: '14h00 - 15h00', title: 'École du Chiot', coach: 'Jean Dupont', spot: 'Terrain A' },
        { time: '15h15 - 16h15', title: 'Éducation Débutant', coach: 'Marie Curie', spot: 'Terrain B' },
        { time: '16h30 - 18h00', title: 'Agility Passion', coach: 'Pierre Martin', spot: 'Espace Agility' },
      ]
    },
    {
      day: 'Dimanche',
      sessions: [
        { time: '09h30 - 11h00', title: 'Ring / Mordant', coach: 'Lucie Bernard', spot: 'Terrain Ring' },
        { time: '11h15 - 12h15', title: 'Obéissance Rythmée', coach: 'Jean Dupont', spot: 'Terrain A' },
      ]
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Le <span className="text-[#BC6C25]">Planning</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
            Séances hebdomadaires • Saison 2026
          </p>
        </div>
        <div className={`px-6 py-3 rounded-2xl border flex items-center gap-3 ${darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-emerald-50 text-[#1B4332] shadow-sm'}`}>
          <CalendarIcon size={18} className="text-[#BC6C25]" />
          <span className="text-[10px] font-black uppercase tracking-widest">Mars 2026</span>
        </div>
      </div>

      <div className="space-y-16">
        {weeklySchedule.map((dayPlan) => (
          <div key={dayPlan.day} className="relative">
            <div className="flex items-center gap-4 mb-8">
              <h3 className={`text-2xl font-serif italic px-6 py-2 rounded-full border ${
                darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-[#1B4332] border-transparent text-white'
              }`}>
                {dayPlan.day}
              </h3>
              <div className={`h-px flex-1 ${darkMode ? 'bg-slate-800' : 'bg-emerald-100'}`}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dayPlan.sessions.map((session, idx) => (
                <div key={idx} className={`group p-8 rounded-[40px] border transition-all duration-500 hover:-translate-y-2 ${
                  darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
                }`}>
                  <div className="flex items-center gap-2 text-[#BC6C25] mb-6">
                    <Clock size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{session.time}</span>
                  </div>
                  <h4 className={`text-2xl font-serif italic mb-6 leading-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                    {session.title}
                  </h4>
                  <div className="space-y-3 pt-6 border-t border-slate-100/10">
                    <div className="flex items-center gap-3 text-slate-400">
                      <User size={14} className="text-[#BC6C25]/50" />
                      <span className="text-[11px] font-bold uppercase tracking-tight">{session.coach}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <MapPin size={14} className="text-[#BC6C25]/50" />
                      <span className="text-[11px] font-bold uppercase tracking-tight italic">{session.spot}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planning;
