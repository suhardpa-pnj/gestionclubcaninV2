import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  LayoutDashboard, Users, Dog, Landmark, 
  ShoppingCart, FileText, ChevronDown, 
  ChevronRight, Sun, Moon, X, Network,
  CreditCard, ClipboardCheck, Calendar, Settings, History
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { darkMode, toggleDarkMode } = useStore();

  const sections = [
    { id: 'section-chiots', label: 'École du Chiot' },
    { id: 'section-ring', label: 'Ring' },
    { id: 'section-agility', label: 'Agility' },
    { id: 'section-obeissance', label: 'Obéissance' },
    { id: 'section-education', label: 'Éducation' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 border-r z-50 transition-all duration-500 flex flex-col p-6
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      ${darkMode ? 'bg-[#0A110D] border-slate-800' : 'bg-[#1B4332] border-emerald-900 text-white'}
    `}>
      <button onClick={onClose} className="lg:hidden absolute top-6 right-6 text-emerald-200"><X size={24} /></button>

      {/* LOGO ACV */}
      <div className="flex flex-col items-center mb-8 pt-4">
        <img 
          src="https://drive.google.com/thumbnail?id=1OpIY0AEaoBUT_CAqIIkV9Y8shhUvyq_u&sz=w200" 
          alt="Logo ACV" 
          className="w-20 h-20 mb-3 drop-shadow-xl"
        />
        <h1 className="text-[9px] font-black uppercase tracking-[0.3em] text-center opacity-80">
          Amicale Canine<br/>Vernoise
        </h1>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
        <NavItem id="dashboard" icon={<LayoutDashboard size={18}/>} label="Tableau de bord" active={activeTab} onClick={setActiveTab} />
        <NavItem id="organigramme" icon={<Network size={18}/>} label="L'Organigramme" active={activeTab} onClick={setActiveTab} />
        <NavItem id="membres" icon={<Users size={18}/>} label="Membres" active={activeTab} onClick={setActiveTab} />
        <NavItem id="leschiens" icon={<Dog size={18}/>} label="Chiens" active={activeTab} onClick={setActiveTab} />
        <NavItem id="cotisations" icon={<CreditCard size={18}/>} label="Cotisations" active={activeTab} onClick={setActiveTab} />
        <NavItem id="boutique" icon={<ShoppingCart size={18}/>} label="Croquettes" active={activeTab} onClick={setActiveTab} />
        <NavItem id="finances" icon={<Landmark size={18}/>} label="Finances" active={activeTab} onClick={setActiveTab} />
        <NavItem id="presences" icon={<ClipboardCheck size={18}/>} label="Présences" active={activeTab} onClick={setActiveTab} />
        <NavItem id="planning" icon={<Calendar size={18}/>} label="Planning" active={activeTab} onClick={setActiveTab} />
        <NavItem id="secretariat" icon={<FileText size={18}/>} label="Secrétariat" active={activeTab} onClick={setActiveTab} />

        {/* ACTIVITÉS / SECTIONS */}
        <div className="pt-6 pb-2 text-[8px] font-black uppercase tracking-[0.2em] opacity-40 px-5">Activités</div>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`w-full flex items-center px-5 py-2 text-[9px] font-bold uppercase tracking-widest transition-all rounded-xl mb-1 ${
              activeTab === s.id ? 'bg-emerald-500/20 text-white' : 'text-emerald-100/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full border mr-4 ${activeTab === s.id ? 'bg-emerald-400 border-emerald-400' : 'border-emerald-500'}`}></div>
            {s.label}
          </button>
        ))}

        {/* SYSTÈME */}
        <div className="pt-6 pb-2 text-[8px] font-black uppercase tracking-[0.2em] opacity-40 px-5">Système</div>
        <NavItem id="logs" icon={<History size={16}/>} label="Logs" active={activeTab} onClick={setActiveTab} />
        <NavItem id="parametres" icon={<Settings size={16}/>} label="Paramètres" active={activeTab} onClick={setActiveTab} />
        <NavItem id="support" icon={<MessageSquare size={16}/>} label="Support & Idées" active={activeTab} onClick={setActiveTab} />
      </nav>

      <button 
        onClick={toggleDarkMode}
        className={`mt-4 mx-auto w-12 h-12 flex items-center justify-center rounded-full border transition-all shadow-lg
          ${darkMode 
            ? 'bg-[#FDFBF7] border-white text-[#1B4332]' 
            : 'bg-[#0A110D] border-[#2D6A4F] text-emerald-400'}`}
      >
        {darkMode ? <Sun size={24} fill="currentColor" /> : <Moon size={24} fill="currentColor" />}
      </button>
    </aside>
  );
};

const NavItem = ({ id, icon, label, active, onClick }: any) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center space-x-4 px-5 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all mb-1 ${
      active === id 
        ? 'bg-[#BC6C25] text-white shadow-lg' 
        : 'hover:bg-white/5 text-emerald-100/70 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Sidebar;
