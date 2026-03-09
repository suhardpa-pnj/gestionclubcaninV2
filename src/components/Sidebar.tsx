import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  LayoutDashboard, Users, Dog, Landmark, 
  ShoppingCart, FileText, ChevronDown, 
  ChevronRight, Sun, Moon, X 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { darkMode, toggleDarkMode } = useStore();
  const [sectionsOpen, setSectionsOpen] = useState(false);

  const sections = [
    { id: 'section-chiots', label: 'École du Chiot' },
    { id: 'section-education', label: 'Éducation' },
    { id: 'section-obeissance', label: 'Obéissance' },
    { id: 'section-agility', label: 'Agility' },
    { id: 'section-ring', label: 'Ring' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 border-r z-50 transition-all duration-500 flex flex-col p-6
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      ${darkMode ? 'bg-[#0A110D] border-slate-800' : 'bg-[#1B4332] border-emerald-900 text-white'}
    `}>
      <button onClick={onClose} className="lg:hidden absolute top-6 right-6 text-emerald-200"><X size={24} /></button>

      {/* LOGO ACV */}
      <div className="flex flex-col items-center mb-10 pt-4">
        <img 
          src="https://drive.google.com/thumbnail?id=1OpIY0AEaoBUT_CAqIIkV9Y8shhUvyq_u&sz=w200" 
          alt="Logo ACV" 
          className="w-24 h-24 mb-3 drop-shadow-xl"
        />
        <h1 className="text-[10px] font-black uppercase tracking-[0.3em] text-center opacity-80">
          Amicale Canine<br/>Vernoise
        </h1>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar">
        <NavItem id="dashboard" icon={<LayoutDashboard size={18}/>} label="Dashboard" active={activeTab} onClick={setActiveTab} />
        <NavItem id="membres" icon={<Users size={18}/>} label="Adhérents" active={activeTab} onClick={setActiveTab} />
        <NavItem id="leschiens" icon={<Dog size={18}/>} label="Les Chiens" active={activeTab} onClick={setActiveTab} />
        
        {/* MENU DÉROULANT SECTIONS */}
        <div className="py-1">
          <button 
            onClick={() => setSectionsOpen(!sectionsOpen)}
            className={`w-full flex items-center justify-between px-5 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${darkMode ? 'hover:bg-slate-900' : 'hover:bg-[#2D6A4F]'}`}
          >
            <div className="flex items-center gap-4">
              <FileText size={18} />
              <span>Sections</span>
            </div>
            {sectionsOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
          
          {sectionsOpen && (
            <div className="mt-1 ml-9 space-y-1 border-l border-emerald-700/30">
              {sections.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`w-full text-left px-4 py-2 text-[9px] font-bold uppercase tracking-wider transition-all rounded-r-lg ${
                    activeTab === s.id ? 'text-white bg-emerald-500/20' : 'text-emerald-200/60 hover:text-white hover:bg-emerald-500/10'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <NavItem id="secretariat" icon={<FileText size={18}/>} label="Secrétariat" active={activeTab} onClick={setActiveTab} />
        <NavItem id="boutique" icon={<ShoppingCart size={18}/>} label="Boutique" active={activeTab} onClick={setActiveTab} />
        <NavItem id="finances" icon={<Landmark size={18}/>} label="Finances" active={activeTab} onClick={setActiveTab} />
      </nav>

      {/* BOUTON DARK MODE - UNIQUE ET CONTRASTÉ */}
      <button 
        onClick={toggleDarkMode}
        className={`mt-6 mx-auto w-14 h-14 flex items-center justify-center rounded-full border-2 transition-all shadow-lg
          ${darkMode 
            ? 'bg-[#FDFBF7] border-white text-[#1B4332] hover:scale-110' 
            : 'bg-[#0A110D] border-[#2D6A4F] text-emerald-400 hover:scale-110'}`}
      >
        {darkMode ? <Sun size={28} fill="currentColor" /> : <Moon size={28} fill="currentColor" />}
      </button>
    </aside>
  );
};

const NavItem = ({ id, icon, label, active, onClick }: any) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center space-x-4 px-5 py-4 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all ${
      active === id 
        ? 'bg-[#DDA15E] text-[#283618] shadow-lg' 
        : 'hover:bg-white/5 text-emerald-100/70 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Sidebar;
