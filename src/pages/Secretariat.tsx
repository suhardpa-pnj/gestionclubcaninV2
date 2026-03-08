import React from 'react';
import { useStore } from '../store/useStore';
import { FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const Secretariat = () => {
  const { members, darkMode } = useStore();

  const getStatusIcon = (val: string) => {
    if (val?.toLowerCase() === 'non') return <XCircle className="text-red-500" size={16} />;
    if (val?.toLowerCase() === 'oui' || val?.toLowerCase() === 'ok') return <CheckCircle className="text-emerald-500" size={16} />;
    return <AlertCircle className="text-amber-500" size={16} />;
  };

  return (
    <div className="space-y-8">
      <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-800'}`}>Secrétariat</h2>

      <div className={`rounded-[40px] border overflow-hidden ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
        <table className="w-full text-left">
          <thead className={darkMode ? 'bg-slate-950/50' : 'bg-slate-50/50'}>
            <tr className="border-b border-slate-800/50">
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
                  <p className={`font-black uppercase italic ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>{m.name} {m.firstName}</p>
                </td>
                <td className="p-6 text-center">{getStatusIcon(m.docVaccin)}</td>
                <td className="p-6 text-center">{getStatusIcon(m.docAssurance)}</td>
                <td className="p-6 text-center">{getStatusIcon(m.docACMA)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Secretariat;
