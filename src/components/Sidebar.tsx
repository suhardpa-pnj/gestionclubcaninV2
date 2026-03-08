import React from 'react';
import { useStore } from '../store/useStore';
import { LayoutDashboard, Users, Dog, GraduationCap, Landmark, FileText, CalendarDays, Sun, Moon, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { darkMode, toggleDarkMode } = useStore();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'membres', label: 'Adhérents', icon: <Users size={20} /> },
    { id: 'leschiens', label: 'La Meute', icon: <Dog size={20} /> },
    { id: 'sections', label: 'Sections', icon: <GraduationCap size={20} /> },
    { id: 'secretariat', label: 'Secrétariat', icon: <FileText size={20} /> },
    { id: 'finances', label: 'Finances', icon: <Landmark size={20} /> },
    { id: 'evenements', label: 'Agenda', icon: <CalendarDays size={20} /> },
  ];

  return (
    <aside className={`
      fixed left-0 top-0 h-screen w-72 border-r z-50 transition-all duration-500 flex flex-col p-8
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'}
    `}>
      {/* Bouton Fermer (Mobile uniquement) */}
      <button onClick={onClose} className="lg:hidden absolute top-6 right-6 p-2 text-slate-400">
        <X size={24} />
      </button>

      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
          <Dog size={28} />
        </div>
        <h1 className={`text-xs font-black italic uppercase leading-tight ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Amicale Canine<br/>Vernoise
        </h1>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-[20px] font-bold uppercase text-[10px] tracking-widest transition-all ${
              activeTab === item.id 
                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/20' 
                : (darkMode ? 'text-slate-500 hover:bg-slate-900 hover:text-slate-300' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-800')
            }`}
          >
            {item.icon}
            <span className="italic">{item.label}</span>
          </button>
        ))}
      </nav>

      <button 
        onClick={toggleDarkMode} 
        className={`mt-6 flex items-center justify-between p-5 rounded-[24px] border transition-all ${
          darkMode ? 'bg-slate-900 border-slate-800 text-emerald-400' : 'bg-slate-50 border-slate-200 text-slate-500'
        }`}
      >
        <span className="text-[9px] font-black uppercase tracking-widest italic">Version {darkMode ? 'Sombre' : 'Claire'}</span>
        {darkMode ? <Moon size={20} fill="currentColor" /> : <Sun size={20} fill="currentColor" />}
      </button>
    </aside>
  );
};

export default Sidebar;
