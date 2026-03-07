import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, UserPlus, Mail, Phone, MoreVertical, ShieldCheck } from 'lucide-react';

const Members: React.FC = () => {
  // 1. On récupère les membres et la fonction de suppression depuis le Store
  const { members, deleteMember } = useStore();
  
  // 2. État pour la barre de recherche
  const [searchTerm, setSearchTerm] = useState('');

  // 3. On filtre la liste en fonction de ce que l'utilisateur tape
  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* EN-TÊTE ET ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">
            Adhérents
          </h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">
            Annuaire des {members.length} membres du club
          </p>
        </div>

        <div className="flex items-center space-x-4">
          {/* BARRE DE RECHERCHE */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Chercher un nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-emerald-500/20 outline-none w-64 transition-all"
            />
          </div>
          
          {/* BOUTON AJOUTER */}
          <button className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-emerald-500 transition-all flex items-center space-x-3">
            <UserPlus size={18} />
            <span>Nouveau Membre</span>
          </button>
        </div>
      </div>

      {/* LISTE DES MEMBRES (GRILLE) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group">
            <div className="flex items-center space-x-5">
              {/* AVATAR INITIALES */}
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-black text-xl shadow-inner border border-slate-100">
                {member.firstName[0]}{member.name[0]}
              </div>
              
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-black text-slate-800 uppercase italic tracking-tight">
                    {member.firstName} {member.name}
                  </h4>
                  {member.status === 'Actif' && (
                    <ShieldCheck size={14} className="text-emerald-500" />
                  )}
                </div>
                <div className="flex items-center space-x-4 mt-1">
                   <div className="flex items-center space-x-1 text-slate-400">
                      <Mail size={12} />
                      <span className="text-[10px] font-bold">{member.email}</span>
                   </div>
                   <div className="flex items-center space-x-1 text-slate-400">
                      <Phone size={12} />
                      <span className="text-[10px] font-bold">{member.phone}</span>
                   </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                member.membershipType === 'Adulte' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'
              }`}>
                {member.membershipType}
              </span>
              <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        ))}

        {filteredMembers.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-400 font-bold italic">Aucun membre ne correspond à votre recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Members;
