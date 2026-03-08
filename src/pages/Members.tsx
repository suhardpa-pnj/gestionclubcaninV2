import React from 'react';
import { useStore } from '../store/useStore';
import { User, Phone, Mail, MapPin } from 'lucide-react';

const Members = () => {
  const { members, dogs } = useStore();

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-100">Les Adhérents</h2>

      <div className="bg-slate-900 rounded-[40px] border border-slate-800 overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-950/50">
            <tr>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Conducteur</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Coordonnées</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-500">Ville</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-300">
            {members.map((member) => {
              const firstDog = dogs.find(d => d.ownerId === member.id);
              return (
                <tr key={member.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="p-6">
                    <p className="font-black text-slate-100 uppercase italic">
                      {member.name} {member.firstName} 
                      <span className="text-emerald-500 ml-2">({firstDog ? firstDog.name : '...'})</span>
                    </p>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">ID: {member.id}</p>
                  </td>
                  <td className="p-6">
                    <p className="text-xs font-bold">{member.phone}</p>
                    <p className="text-[10px] text-slate-500">{member.email}</p>
                  </td>
                  <td className="p-6 text-[10px] font-bold uppercase text-slate-400">{member.city}</td>
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
