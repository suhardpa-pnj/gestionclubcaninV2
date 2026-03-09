import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Phone, Search, Plus } from 'lucide-react';
import MemberDetail from './MemberDetail';

const Members = () => {
  const { members, dogs, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const formatName = (first: string) => 
    first ? first.charAt(0).toUpperCase() + first.slice(1).toLowerCase() : '';

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (selectedId) {
    return <MemberDetail memberId={selectedId} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* HEADER STYLE SECRÉTARIAT */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h2 className={`text-5xl font-serif italic tracking-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Les <span className="text-[#BC6C25]">Adhérents</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
            Amicale Canine Vernoise • {members.length} membres
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#BC6C25] transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="RECHERCHER..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-14 pr-8 py-5 rounded-[24px] text-[10px] font-black tracking-[0.2em] border outline-none transition-all w-64 lg:w-96 ${
                darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-emerald-50 shadow-2xl shadow-emerald-900/5'
              } focus:ring-2 focus:ring-[#BC6C25]/20`}
            />
          </div>
          <button className="p-5 bg-[#1B4332] text-white rounded-[24px] shadow-xl hover:scale-105 active:scale-95 transition-all">
            <Plus size={24} />
          </button>
        </div>
      </div>

      {/* GRILLE STYLE AI STUDIO */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {filteredMembers.map((m) => {
          const memberDogs = dogs.filter(d => d.ownerId === m.id || d.ownerName?.includes(m.name));
          
          return (
            <div 
              key={m.id} 
              className={`group relative p-10 rounded-[40px] border transition-all duration-500 hover:-translate-y-2 ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-2xl shadow-emerald-900/5'
              }`}
            >
              <div className="flex items-start gap-6 mb-8">
                {/* AVATAR ÉLÉGANT */}
                <div className="w-16 h-16 bg-[#FDFBF7] border border-emerald-50 rounded-[24px] flex items-center justify-center text-[#DDA15E] shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <User size={28} />
                </div>

                <div className="flex-1 min-w-0">
                  <button 
                    onClick={() => setSelectedId(m.id)}
                    className="text-left block w-full group/name"
                  >
                    <h3 className={`text-2xl font-serif italic leading-tight group-hover/name:text-[#BC6C25] transition-colors ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                      {m.name} {formatName(m.firstName)}
                    </h3>
                    {m.binome && (
                      <p className="text-[9px] text-[#BC6C25] font-black uppercase tracking-[0.1em] mt-1 italic">
                        & {m.binome}
                      </p>
                    )}
                  </button>
                </div>
              </div>

              {/* PASTILLES CHIENS */}
              <div className="flex flex-wrap gap-2 mb-10">
                {memberDogs.map(d => (
                  <span key={d.id} className="px-3 py-1 bg-[#1B4332]/5 text-[#1B4332] text-[8px] font-black uppercase tracking-widest rounded-full border border-[#1B4332]/10 italic">
                    {d.name}
                  </span>
                ))}
                {memberDogs.length === 0 && (
                  <span className="text-[8px] font-black uppercase text-slate-300 tracking-widest italic">Aucun chien</span>
                )}
              </div>

              {/* ACTIONS & DOCS */}
              <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                <a 
                  href={`tel:${m.phone}`} 
                  className="flex items-center gap-3 px-5 py-3 bg-[#1B4332] text-white rounded-2xl hover:bg-[#2D6A4F] transition-all text-[9px] font-black uppercase tracking-[0.2em] shadow-lg shadow-emerald-900/20"
                >
                  <Phone size={14} /> Appeler
                </a>
                
                <div className="flex gap-2">
                  <DocIndicator status={m.docVaccin === 'oui'} label="V" />
                  <DocIndicator status={m.docAssurance === 'oui'} label="A" />
                  <DocIndicator status={m.docACMA === 'oui'} label="M" />
                </div>
              </div>

              <div className="absolute top-8 right-10 text-[8px] font-black text-slate-200 tracking-[0.3em] group-hover:text-[#BC6C25]/20 transition-colors">
                {m.id}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DocIndicator = ({ status, label }: { status: boolean; label: string }) => (
  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${
    status 
      ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' 
      : 'bg-slate-100 text-slate-300'
  }`}>
    {label}
  </div>
);

export default Members;
