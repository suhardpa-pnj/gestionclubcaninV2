import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Phone, Search } from 'lucide-react';
import MemberDetail from './MemberDetail';

const Members = () => {
  const { members, dogs, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (selectedId) return <MemberDetail memberId={selectedId} onBack={() => setSelectedId(null)} />;

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-end">
        <h2 className={`text-4xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Les Adhérents</h2>
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
          <input type="text" placeholder="RECHERCHER..." onChange={(e)=>setSearchTerm(e.target.value)} className={`pl-12 pr-6 py-3 rounded-2xl outline-none text-[10px] font-black tracking-widest border transition-all ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-emerald-50 shadow-sm'}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase())).map(m => {
          const mDogs = dogs.filter(d => d.ownerId === m.id);
          return (
            <div key={m.id} className={`p-4 rounded-[32px] border transition-all hover:border-[#BC6C25] ${darkMode ? 'bg-[#1A1F1C] border-slate-700' : 'bg-white border-emerald-50'}`}>
              <button onClick={() => setSelectedId(m.id)} className="flex items-center gap-4 text-left w-full mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-emerald-50 overflow-hidden shrink-0">
                  {m.photo ? <img src={m.photo} className="w-full h-full object-cover" /> : <User className="w-full h-full p-3 text-slate-200"/>}
                </div>
                <div className="min-w-0">
                  <h3 className={`text-[12px] font-black uppercase truncate ${darkMode ? 'text-slate-300' : 'text-[#1B4332]'}`}>{m.name} {m.firstName.charAt(0)}.</h3>
                  {mDogs.map(d => (
                    <p key={d.id} className="text-[#BC6C25] text-[20px] font-serif italic leading-none mt-1 truncate">{d.name}</p>
                  ))}
                </div>
              </button>
              <div className="pt-3 border-t border-slate-50/5 flex justify-between items-center">
                <a href={`tel:${m.phone}`} className="flex items-center gap-2 px-3 py-2 bg-[#1B4332]/5 text-[#1B4332] rounded-xl text-[10px] font-black uppercase">
                  <Phone size={12} /> {m.phone}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Members;
