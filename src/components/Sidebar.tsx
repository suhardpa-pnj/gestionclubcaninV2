import React from 'react';
import { 
  LayoutDashboard, Users, Dog, ShoppingCart, 
  CalendarDays, Settings, LogOut, GraduationCap, 
  Landmark, CreditCard 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={20} /> },
    { id: 'membres', label: 'Adhérents', icon: <Users size={20} /> },
    { id: 'cotisations', label: 'Cotisations', icon: <CreditCard size={20} /> },
    { id: 'sections', label: 'Espaces Sections', icon: <GraduationCap size={20} /> },
    { id: 'meute', label: 'La Meute', icon: <Dog size={20} /> },
    { id: 'boutique', label: 'Boutique', icon: <ShoppingCart size={20} /> },
    { id: 'evenements', label: 'Événements', icon: <CalendarDays size={20} /> },
    { id: 'finances', label: 'Trésorerie', icon: <Landmark size={20} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-100 flex flex-col p-8 z-50">
      <div className="flex items-center space-x-3 mb-12 px-2">
        <div className="w-10 h-10 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black italic">
          C
        </div>
        <h1 className="text-xl font-black uppercase italic tracking-tighter text-slate-900">
          CaniClub <span className="text-emerald-500 text-sm">v2</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all ${
              activeTab === item.id
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-2'
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="pt-8 border-t border-slate-50 space-y-2">
        <button className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
          <Settings size={20} />
          <span>Paramètres</span>
        </button>
        <button className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-all">
          <LogOut size={20} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
