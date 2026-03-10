import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Phone, Search, Plus } from 'lucide-react';
import MemberDetail from './MemberDetail';

const Members = () => {
  const { members, dogs, darkMode } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (selectedId) return <MemberDetail memberId={selectedId} onBack={() => setSelectedId(null)} />;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-end">
        <h2 className={`text-4xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Les Adhérents</h2>
        <div className="flex gap-4">
          <input type="text" placeholder="Rechercher..." onChange={(e)=>setSearchTerm(e.target.value)} className={`px-6 py-3 rounded-2xl outline-none text-xs font-bold border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-emerald-50 shadow-sm'}`} />
          <button className="p-3 bg-[#1B4332] text-white rounded-2xl shadow-lg"><Plus size={20}/></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase())).map(m => {
          const mDogs = dogs.filter(d => d.ownerId === m.id);
          return (
            <div key={m.id} className={`p-5 rounded-[32px] border transition-all ${darkMode ? 'bg-[#1E2521] border-slate-700 hover:border-[#BC6C25]' : 'bg-white border-emerald-50 shadow-sm hover:shadow-md'}`}>
              <button onClick={() => setSelectedId(m.id)} className="text-left w-full mb-3">
                <h3 className={`text-[11px] font-black uppercase tracking-tight truncate ${darkMode ? 'text-slate-300' : 'text-[#1B4332]'}`}>{m.name} {m.firstName.charAt(0)}.</h3>
                {mDogs.map(d => (
                  <p key={d.id} className="text-[#BC6C25] text-[20px] font-serif italic leading-none mt-1">{d.name}</p>
                ))}
              </button>
              <div className="flex justify-between items-center pt-3 border-t border-slate-50/10">
                <a href={`tel:${m.phone}`} className="flex items-center gap-2 px-3 py-2 bg-[#1B4332]/5 text-[#1B4332] rounded-xl text-[10px] font-bold hover:bg-[#1B4332] hover:text-white transition-all group">
                  <Phone size={12} /> <span>{m.phone}</span>
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
