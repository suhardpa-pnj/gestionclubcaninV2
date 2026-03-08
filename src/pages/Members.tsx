import React from 'react';
import { useStore } from '../store/useStore';
import { User, Phone, Mail, MapPin } from 'lucide-react';

const Members = () => {
  const { members, dogs } = useStore();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-4xl font-black uppercase italic tracking-tighter text-slate-800">Les Adhérents</h2>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
          {members.length} membres enregistrés pour 2026
        </p>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Membre & Binôme</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Coordonnées</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Localisation</th>
              <th className="p-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Statut</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {members.map((member) => {
              // On cherche le nom du premier chien lié à ce membre pour l'affichage
              const firstDog = dogs.find(d => d.ownerId === member.id);
              return (
                <tr key={member.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 uppercase italic">
                          {member.name} {member.firstName} 
                          <span className="text-emerald-500 ml-2">
                            ({firstDog ? firstDog.name : 'Pas de chien'})
                          </span>
                        </p>
                        {member.binome && (
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">
                            Binôme : {member.binome}
                          </p>
                        )}
                        <p className="text-[9px] font-bold text-slate-300 uppercase">ID: {member.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <Phone size={12} className="text-slate-300" /> {member.phone}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                        <Mail size={12} className="text-slate-300" /> {member.email}
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase">
                      <MapPin size={12} className="text-slate-300" /> {member.city} ({member.cp})
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase rounded-full tracking-widest">
                      Actif
                    </span>
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
