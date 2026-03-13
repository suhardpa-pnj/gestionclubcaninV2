import React from 'react';
import { useStore } from '../store/useStore';
import { Users, Dog as DogIcon, Calendar, Trophy, Medal, Star } from 'lucide-react';

const Dashboard = () => {
  const { members, dogs, attendances, darkMode } = useStore();

  // --- LOGIQUE DU PODIUM ---
  // 1. Compter les présences par chien
  const dogAttendanceCount: Record<string, number> = {};
  attendances.forEach(session => {
    session.presentDogIds?.forEach((dogId: string) => {
      dogAttendanceCount[dogId] = (dogAttendanceCount[dogId] || 0) + 1;
    });
  });

  // 2. Trier et récupérer le Top 3
  const topThree = Object.entries(dogAttendanceCount)
    .map(([id, count]) => {
      const dog = dogs.find(d => d.id === id);
      return { ...dog, count };
    })
    .filter(d => d.id) // Sécurité si un chien a été supprimé
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const stats = [
    { label: 'Adhérents', value: members.length, icon: <Users size={20}/> },
    { label: 'Chiens', value: dogs.length, icon: <DogIcon size={20}/> },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      {/* HEADER HARMONISÉ */}
      <div>
        <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
          Tableau de <span className="text-[#BC6C25]">Bord</span>
        </h2>
        <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
          Statistiques & Activités • AC Vernoise
        </p>
      </div>

      {/* STATS SIMPLIFIÉES & COLORÉES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`p-8 rounded-[40px] border flex items-center gap-8 transition-all hover:-translate-y-1 ${
            darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
          }`}>
            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-lg ${
              darkMode ? 'bg-slate-800 text-[#BC6C25]' : 'bg-[#1B4332]/5 text-[#1B4332]'
            }`}>
              {s.icon}
            </div>
            <div>
              <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-widest mb-1 italic">{s.label}</p>
              <p className={`text-4xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LE PODIUM DE L'ASSIDUITÉ (2/3 de l'espace) */}
        <div className={`lg:col-span-2 p-10 rounded-[40px] border ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
        }`}>
          <div className="flex items-center gap-3 mb-12">
            <Trophy className="text-[#BC6C25]" size={22} />
            <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Podium de l'Assiduité</h3>
          </div>

          {topThree.length > 0 ? (
            <div className="flex flex-col md:flex-row items-end justify-around gap-8 pt-10">
              {/* DEUXIÈME */}
              {topThree[1] && (
                <div className="flex flex-col items-center text-center order-2 md:order-1">
                  <div className="relative mb-4">
                    <div className="w-24 h-24 rounded-full border-4 border-slate-200 overflow-hidden bg-slate-100 shadow-lg">
                      {topThree[1].photo ? <img src={topThree[1].photo} className="w-full h-full object-cover" /> : <DogIcon className="w-full h-full p-6 text-slate-300" />}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs border-2 border-white">2</div>
                  </div>
                  <p className={`font-serif italic text-lg ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{topThree[1].name}</p>
                  <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest mt-1">{topThree[1].count} séances</p>
                </div>
              )}

              {/* PREMIER */}
              {topThree[0] && (
                <div className="flex flex-col items-center text-center order-1 md:order-2">
                  <div className="relative mb-6">
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[#BC6C25] animate-bounce">
                      <Medal size={32} />
                    </div>
                    <div className="w-32 h-32 rounded-full border-4 border-[#BC6C25] overflow-hidden bg-slate-100 shadow-2xl scale-110">
                      {topThree[0].photo ? <img src={topThree[0].photo} className="w-full h-full object-cover" /> : <DogIcon className="w-full h-full p-8 text-slate-300" />}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#BC6C25] rounded-full flex items-center justify-center text-white font-bold text-sm border-2 border-white">1</div>
                  </div>
                  <p className={`font-serif italic text-2xl ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{topThree[0].name}</p>
                  <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.2em] mt-2 italic">{topThree[0].count} séances</p>
                </div>
              )}

              {/* TROISIÈME */}
              {topThree[2] && (
                <div className="flex flex-col items-center text-center order-3 md:order-3">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full border-4 border-orange-200 overflow-hidden bg-slate-100 shadow-lg">
                      {topThree[2].photo ? <img src={topThree[2].photo} className="w-full h-full object-cover" /> : <DogIcon className="w-full h-full p-5 text-slate-300" />}
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-200 rounded-full flex items-center justify-center text-orange-800 font-bold text-xs border-2 border-white">3</div>
                  </div>
                  <p className={`font-serif italic text-lg ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{topThree[2].name}</p>
                  <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest mt-1">{topThree[2].count} séances</p>
                </div>
              )}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center">
              <p className="text-slate-400 font-serif italic">Pas encore assez de données de présence.</p>
            </div>
          )}
        </div>

        {/* PROCHAINES SÉANCES (1/3 de l'espace) */}
        <div className={`p-10 rounded-[40px] border ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
        }`}>
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="text-[#BC6C25]" size={20} />
            <h3 className={`text-xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>À l'Agenda</h3>
          </div>
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-[#1B4332]/5 border border-[#1B4332]/5">
               <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest mb-1 italic text-center">Prochainement</p>
               <p className="text-slate-400 font-serif italic text-center text-sm">Le planning des entraînements sera affiché ici.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
