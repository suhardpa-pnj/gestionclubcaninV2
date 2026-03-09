import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { FileCheck, ShieldCheck, Activity, FileText, Search, UserCheck } from 'lucide-react';

const Secretariat = () => {
  const { members, darkMode } = useStore();
  const [view, setView] = useState<'adhesions' | 'documents' | 'archives'>('adhesions');

  return (
    <div className="space-y-8 pb-20">
      {/* HEADER & TABS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className={`text-5xl font-serif italic tracking-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Secrétariat
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-2">Gestion Administrative & Conformité</p>
        </div>
        
        <div className={`flex p-1.5 rounded-2xl ${darkMode ? 'bg-slate-900' : 'bg-[#1B4332]/5'}`}>
          <TabBtn active={view === 'adhesions'} label="Adhésions" onClick={() => setView('adhesions')} />
          <TabBtn active={view === 'documents'} label="Documents" onClick={() => setView('documents')} />
          <TabBtn active={view === 'archives'} label="Archives" onClick={() => setView('archives')} />
        </div>
      </div>

      {/* VUE : ADHÉSIONS (SUIVI ACMA & COTISATIONS) */}
      {view === 'adhesions' && (
        <div className={`overflow-hidden rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${darkMode ? 'bg-slate-800/50' : 'bg-[#FDFBF7]'} text-[9px] font-black uppercase tracking-widest text-slate-400`}>
                <th className="px-8 py-6">Adhérent</th>
                <th className="px-8 py-6">ID ACMA</th>
                <th className="px-8 py-6 text-center">Fiche Renseignement</th>
                <th className="px-8 py-6 text-center">Statut Cotisation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {members.map(m => (
                <tr key={m.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <p className={`text-[11px] font-black uppercase italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{m.name} {m.firstName}</p>
                    <p className="text-[9px] text-slate-400 font-bold">{m.email || 'Pas de mail'}</p>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{m.id}</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <StatusBadge status={m.docProtocole === 'oui'} label="Papier" />
                  </td>
                  <td className="px-8 py-5 text-center">
                     <span className={`text-[10px] font-black italic ${m.docACMA === 'oui' ? 'text-emerald-500' : 'text-orange-400'}`}>
                       {m.docACMA === 'oui' ? 'À JOUR' : 'À RÉGLER'}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* VUE : DOCUMENTS (FEU ROUGE / VERT) */}
      {view === 'documents' && (
        <div className="grid grid-cols-1 gap-4">
          {members.map(m => (
            <div key={m.id} className={`p-6 rounded-[32px] border flex items-center justify-between group ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'
            }`}>
              <div className="flex items-center gap-6">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${darkMode ? 'bg-slate-800 text-emerald-400' : 'bg-emerald-50 text-[#1B4332]'}`}>
                  <UserCheck size={20} />
                </div>
                <div>
                  <h3 className={`text-sm font-black uppercase italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{m.name} {m.firstName}</h3>
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Contrôle des pièces obligatoires</p>
                </div>
              </div>

              <div className="flex items-center gap-8">
                <DocCheck label="Assurance" status={m.docAssurance === 'oui'} icon={<ShieldCheck size={14}/>} />
                <DocCheck label="Vaccins" status={m.docVaccin === 'oui'} icon={<Activity size={14}/>} />
                <DocCheck label="Protocole" status={m.docProtocole === 'oui'} icon={<FileText size={14}/>} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VUE : ARCHIVES (VIDE POUR L'INSTANT) */}
      {view === 'archives' && (
        <div className={`p-20 text-center border-2 border-dashed rounded-[40px] ${darkMode ? 'border-slate-800' : 'border-emerald-100'}`}>
          <FileText size={48} className="mx-auto text-slate-200 mb-4" />
          <p className="text-slate-400 font-serif italic">Le coffre-fort numérique sera disponible prochainement.</p>
        </div>
      )}
    </div>
  );
};

const TabBtn = ({ active, label, onClick }: any) => (
  <button onClick={onClick} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
    active ? 'bg-[#1B4332] text-white shadow-lg' : 'text-slate-400 hover:text-[#1B4332]'
  }`}>
    {label}
  </button>
);

const StatusBadge = ({ status, label }: any) => (
  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[8px] font-black uppercase ${
    status ? 'bg-emerald-100 text-emerald-600' : 'bg-red-50 text-red-400'
  }`}>
    <div className={`w-1.5 h-1.5 rounded-full ${status ? 'bg-emerald-500' : 'bg-red-500'}`} />
    {label}
  </span>
);

const DocCheck = ({ label, status, icon }: any) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${status ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-100 text-slate-300'}`}>
      {icon}
    </div>
    <span className={`text-[7px] font-black uppercase tracking-tighter ${status ? 'text-emerald-600' : 'text-slate-400'}`}>{label}</span>
  </div>
);

export default Secretariat;
