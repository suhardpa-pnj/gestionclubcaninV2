import React from 'react';
import { 
  LayoutDashboard, Users, Dog, ShoppingCart, 
  CalendarDays, GraduationCap, 
  Landmark, CreditCard 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={20} /> },
    { id: 'membres', label: 'Membres', icon: <Users size={20} /> },
    { id: 'cotisations', label: 'Cotisations', icon: <CreditCard size={20} /> },
    { id: 'sections', label: 'Espaces Sections', icon: <GraduationCap size={20} /> },
    { id: 'leschiens', label: 'Les Chiens', icon: <Dog size={20} /> }, // Changé ici
    { id: 'boutique', label: 'Boutique', icon: <ShoppingCart size={20} /> },
    { id: 'evenements', label: 'Événements', icon: <CalendarDays size={20} /> },
    { id: 'finances', label: 'Trésorerie', icon: <Landmark size={20} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-white border-r border-slate-100 flex flex-col p-8 z-50">
      {/* BRANDING MIS À JOUR */}
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
          <Dog className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-sm font-black italic leading-none tracking-tighter text-slate-800 uppercase">
            Amicale Canine<br/>Vernoise
          </h1>
          <span className="text-[9px] font-bold text-emerald-600 tracking-widest uppercase">Gestion Club</span>
        </div>
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
    </aside>
  );
};

export default Sidebar;
