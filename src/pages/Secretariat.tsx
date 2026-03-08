import React from 'react';
import { useStore } from '../store/useStore';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Secretariat = () => {
  const { members, darkMode } = useStore();

  const getStatus = (val: string) => {
    const v = val?.toLowerCase();
    if (v === 'oui' || v === 'ok') return <CheckCircle className="text-emerald-500" size={18} />;
    if (v === 'non' || !v || v === 'nan') return <XCircle className="text-red-500" size={18} />;
    return <div className="flex items-center gap-1 text-[10px] font-black text-amber-500 uppercase"><AlertCircle size={14}/> {val}</div>;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-800'}`}>Secrétariat</h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Dossiers et pièces justificatives 2026</p>
      </div>

      <div className={`rounded-[40px] border overflow-hidden transition-all ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
        <table className="w-full text-left">
          <thead className={darkMode ? 'bg-slate-950/50' : 'bg-slate-50/50'}>
            <tr className={darkMode ? 'border-b border-slate-800' : 'border-b border-slate-100'}>
              <th className="p-6 text-[10px] font-black uppercase text-slate-500">Adhérent</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-500 text-center">Vaccins</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-500 text-center">Assurance</th>
              <th className="p-6 text-[10px] font-black uppercase text-slate-500 text-center">ACMA</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-50'}`}>
            {members.map((m) => (
              <tr key={m.id} className={darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50/50'}>
                <td className="p-6">
                  <p className={`font-black uppercase italic text-sm ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{m.name} {m.firstName}</p>
                  <p className="text-[9px] font-bold text-slate-500 tracking-widest">ID: {m.id}</p>
                </td>
                <td className="p-6"><div className="flex justify-center">{getStatus(m.docVaccin)}</div></td>
                <td className="p-6"><div className="flex justify-center">{getStatus(m.docAssurance)}</div></td>
                <td className="p-6"><div className="flex justify-center">{getStatus(m.docACMA)}</div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Secretariat;
