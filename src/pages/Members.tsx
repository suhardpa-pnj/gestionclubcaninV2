import React from 'react';
import { useStore } from '../store/useStore';
import { Phone, CheckCircle, XCircle } from 'lucide-react';

const Members = () => {
  const { members, darkMode } = useStore();

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className={`text-2xl font-black uppercase italic ${darkMode ? 'text-white' : 'text-slate-800'}`}>Adhérents</h2>
        <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[9px] font-black uppercase">{members.length}</span>
      </div>

      <div className="grid gap-3">
        {members.map((m) => (
          <div key={m.id} className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-4 rounded-2xl border flex items-center justify-between`}>
            <div className="flex-1">
              <p className={`text-xs font-black uppercase italic ${darkMode ? 'text-white' : 'text-slate-800'}`}>{m.name} {m.firstName}</p>
              <div className="flex gap-2 mt-1">
                <span className="text-[8px] font-bold text-slate-500 uppercase">{m.id}</span>
                <span className="text-[8px] font-bold text-emerald-500 uppercase italic px-1 bg-emerald-500/5 rounded">{m.activities || 'Loisirs'}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <a href={`tel:${m.phone}`} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500"><Phone size={14}/></a>
              {m.docVaccin === 'oui' ? <CheckCircle size={16} className="text-emerald-500" /> : <XCircle size={16} className="text-red-500" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
