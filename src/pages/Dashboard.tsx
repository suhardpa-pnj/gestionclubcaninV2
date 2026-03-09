import React from 'react';
import { useStore } from '../store/useStore';
import { Plus, ShoppingCart, Calendar, Package, Users, Dog } from 'lucide-react';

const Dashboard = () => {
  const { members, dogs, darkMode, activeOrder, seedBoutique } = useStore();

  return (
    <div className="space-y-8 pb-10">
      {/* HEADER AVEC LOGO */}
      <div className="flex items-center gap-6 mb-10">
        <img 
          src="https://drive.google.com/thumbnail?id=1OpIY0AEaoBUT_CAqIIkV9Y8shhUvyq_u&sz=w200" 
          alt="Logo ACV" 
          className="w-20 h-20 drop-shadow-md"
        />
        <div>
          <h2 className={`text-3xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Tableau <span className="text-[#DDA15E]">de Bord</span>
          </h2>
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.2em] italic">Amicale Canine Vernoise</p>
        </div>
      </div>

      {/* STATS RÉDUITES */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'} flex items-center gap-4`}>
          <div className="w-10 h-10 bg-emerald-100 text-[#1B4332] rounded-full flex items-center justify-center"><Users size={18}/></div>
          <div>
            <p className="text-[8px] font-black uppercase text-slate-400">Membres</p>
            <p className={`text-xl font-black italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{members.length}</p>
          </div>
        </div>
        <div className={`p-4 rounded-3xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-100 shadow-sm'} flex items-center gap-4`}>
          <div className="w-10 h-10 bg-orange-100 text-[#BC6C25] rounded-full flex items-center justify-center"><Dog size={18}/></div>
          <div>
            <p className="text-[8px] font-black uppercase text-slate-400">Chiens</p>
            <p className={`text-xl font-black italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{dogs.length}</p>
          </div>
        </div>
      </div>

      {/* ENCART LIVRAISON CROQUETTES */}
      <div className={`p-5 rounded-[24px] border-l-4 ${
        activeOrder.status === 'pending' 
          ? 'bg-[#DDA15E]/10 border-[#DDA15E]' 
          : 'bg-slate-100 border-slate-300 opacity-60'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Package size={20} className={activeOrder.status === 'pending' ? 'text-[#BC6C25]' : 'text-slate-400'} />
            <div>
              <p className={`text-[10px] font-black uppercase tracking-widest ${darkMode ? 'text-white' : 'text-slate-700'}`}>
                {activeOrder.status === 'pending' ? 'Livraison croquettes en cours' : 'Aucune commande en cours'}
              </p>
              <p className="text-[9px] font-bold text-slate-500 uppercase">{activeOrder.date}</p>
            </div>
          </div>
          {activeOrder.status === 'pending' && <span className="animate-pulse w-2 h-2 bg-[#BC6C25] rounded-full"></span>}
        </div>
      </div>

      {/* ACTIONS RAPIDES FORMAT XS */}
      <div className="grid grid-cols-4 gap-3">
        <ActionButton icon={<Plus size={18}/>} label="Membre" color="bg-[#1B4332]" />
        <ActionButton icon={<Dog size={18}/>} label="Chien" color="bg-[#1B4332]" />
        <ActionButton icon={<ShoppingCart size={18}/>} label="Commande" color="bg-[#BC6C25]" />
        <ActionButton icon={<Calendar size={18}/>} label="Événement" color="bg-[#DDA15E]" />
      </div>

      {/* BOUTON INITIALISATION (DISCRET) */}
      <button 
        onClick={() => seedBoutique()}
        className="mt-10 text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-[#1B4332] transition-colors"
      >
        [ Initialiser Boutique Croquettes ]
      </button>
    </div>
  );
};

const ActionButton = ({ icon, label, color }: any) => (
  <button className="flex flex-col items-center gap-2 group">
    <div className={`w-12 h-12 ${color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <span className="text-[8px] font-black uppercase tracking-wider text-slate-500">{label}</span>
  </button>
);

export default Dashboard;
