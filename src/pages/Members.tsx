import React from 'react';
import { useStore } from '../store/useStore';
import { User, Phone, Mail, MapPin } from 'lucide-react';

const Members = () => {
  const { members, dogs, darkMode } = useStore();

  return (
    <div className="space-y-8">
      <div>
        <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Les Adhérents
        </h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">
          {members.length} membres enregistrés
        </p>
      </div>

      <div className={`rounded-[40px] border overflow-hidden transition-all ${
        darkMode ? 'bg-slate-900 border-slate-800 shadow-none' : 'bg-white border-slate-100 shadow-sm'
      }`}>
        <table className="w-full text-left">
          <thead>
            <tr className={`${darkMode ? 'bg-slate-950/50' : 'bg-slate-50/50'} border-b ${darkMode ? 'border-slate-800' : 'border-slate-100'}`}>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Conducteur</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Coordonnées</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Ville</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${darkMode ? 'divide-slate-800' : 'divide-slate-50'}`}>
            {members.map((member) => {
              const firstDog = dogs.find(d => d.ownerId === member.id);
              return (
                <tr key={member.id} className={`transition-colors ${darkMode ? 'hover:bg-slate-800/50' : 'hover:bg-slate-50/50'}`}>
                  <td className="p-6">
                    <p className={`font-black uppercase italic ${darkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      {member.name} {member.firstName} 
                      <span className="text-emerald-500 ml-2">({firstDog ? firstDog.name : '...'})</span>
                    </p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">ID: {member.id}</p>
                  </td>
                  <td className="p-6">
                    <p className={`text-xs font-bold ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>{member.phone}</p>
                    <p className="text-[10px] text-slate-500">{member.email}</p>
                  </td>
                  <td className={`p-6 text-[10px] font-bold uppercase ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {member.city}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Members;
