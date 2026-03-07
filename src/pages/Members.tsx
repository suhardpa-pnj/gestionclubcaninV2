import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, UserPlus, Mail, Phone, MoreVertical, ShieldCheck } from 'lucide-react';
import AddMemberModal from '../components/AddMemberModal'; // On importe le formulaire

const Members: React.FC = () => {
  const { members } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  // État pour ouvrir la modale
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* APPEL DE LA MODALE */}
      <AddMemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">Adhérents</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Annuaire du club</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Chercher un nom..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold shadow-sm outline-none w-64"
            />
          </div>
          
          {/* BOUTON QUI OUVRE LE FORMULAIRE */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-emerald-500 transition-all flex items-center space-x-3"
          >
            <UserPlus size={18} />
            <span>Nouveau Membre</span>
          </button>
        </div>
      </div>

      {/* LISTE */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between group">
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-black text-xl shadow-inner border border-slate-100 uppercase">
                {member.firstName[0]}{member.name[0]}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-black text-slate-800 uppercase italic tracking-tight">{member.firstName} {member.name}</h4>
                  <ShieldCheck size={14} className="text-emerald-500" />
                </div>
                <div className="flex items-center space-x-4 mt-1 text-slate-400">
                   <span className="text-[10px] font-bold">{member.email}</span>
                   <span className="text-[10px] font-bold">{member.phone}</span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest">
              {member.membershipType}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
