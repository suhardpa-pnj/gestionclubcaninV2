import React from 'react';
import { useStore } from '../store/useStore';
import { User, Phone, CheckCircle, XCircle, Search } from 'lucide-react';

const Members = () => {
  const { members, dogs, darkMode } = useStore();

  // Fonction pour formater le prénom proprement
  const formatName = (first: string) => first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Adhérents
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-widest italic">{members.length} membres actifs</p>
        </div>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="RECHERCHER..." 
            className={`pl-10 pr-4 py-2 rounded-xl text-[10px] font-bold border outline-none transition-all w-48 lg:w-64 ${
              darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-emerald-100'
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((m) => {
          const memberDogs = dogs.filter(d => d.ownerId === m.id || d.ownerName?.includes(m.name));
          
          return (
            <div key={m.id} className={`p-5 rounded-[28px] border transition-all hover:scale-[1.02] ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'
            }`}>
              <div className="flex items-start gap-4">
                {/* PHOTO PROFIL (DÉFAUT) */}
                <div className="w-14 h-14 bg-[#FDFBF7] border-2 border-[#DDA15E]/20 rounded-2xl flex items-center justify-center text-[#DDA15E] overflow-hidden shrink-0">
                  <User size={24} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* LIEN VERS FICHE */}
                  <button className="text-left group">
                    <h3 className={`text-[11px] font-black uppercase italic tracking-tight leading-tight group-hover:text-[#BC6C25] transition-colors ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                      {m.name} {formatName(m.firstName)}
                      {m.binome && (
                        <div className="mt-1 pt-1 border-t border-slate-100 text-[10px] text-slate-500 normal-case">
                          & {m.binome}
                        </div>
                      )}
                    </h3>
                  </button>

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[8px] font-black bg-slate-100 px-2 py-0.5 rounded text-slate-500 uppercase">{m.id}</span>
                    {memberDogs.length > 0 && (
                      <span className="text-[8px] font-bold text-[#BC6C25] uppercase italic">
                        ({memberDogs.map(d => d.name).join(', ')})
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                <a href={`tel:${m.phone}`} className="p-2 bg-emerald-50 text-[#1B4332] rounded-lg hover:bg-[#1B4332] hover:text-white transition-all">
                  <Phone size={14} />
                </a>
                <div className="flex gap-2">
                  <DocIcon status={m.docVaccin} label="V" />
                  <DocIcon status={m.docAssurance} label="A" />
                  <DocIcon status={m.docACMA} label="M" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DocIcon = ({ status, label }: any) => (
  <div className={`w-5 h-5 rounded-md flex items-center justify-center text-[8px] font-black ${
    status === 'oui' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-50 text-red-400'
  }`}>
    {label}
  </div>
);

export default Members;
