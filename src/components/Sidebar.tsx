import React from 'react';
import { useStore } from '../store/useStore';
import { LayoutDashboard, Users, Dog, GraduationCap, Landmark, FileText, Sun, Moon } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { darkMode, toggleDarkMode } = useStore();
  
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={20} /> },
    { id: 'membres', label: 'Membres', icon: <Users size={20} /> },
    { id: 'leschiens', label: 'Les Chiens', icon: <Dog size={20} /> },
    { id: 'sections', label: 'Sections', icon: <GraduationCap size={20} /> },
    { id: 'secretariat', label: 'Secrétariat', icon: <FileText size={20} /> }, // Indispensable
    { id: 'finances', label: 'Trésorerie', icon: <Landmark size={20} /> },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 border-r flex flex-col p-8 z-50 transition-colors ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-100'}`}>
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg">
          <Dog size={24} />
        </div>
        <h1 className={`text-sm font-black italic leading-none tracking-tighter uppercase ${darkMode ? 'text-white' : 'text-slate-800'}`}>
          Amicale Canine<br/>Vernoise
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all ${
              activeTab === item.id 
                ? 'bg-emerald-500 text-white shadow-lg' 
                : (darkMode ? 'text-slate-500 hover:bg-slate-900' : 'text-slate-400 hover:bg-slate-50')
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <button onClick={toggleDarkMode} className={`mt-auto flex items-center justify-between p-4 rounded-2xl border transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-emerald-500' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
        <span className="text-[9px] font-black uppercase tracking-widest">Mode {darkMode ? 'Sombre' : 'Clair'}</span>
        {darkMode ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </aside>
  );
};

export default Sidebar;
