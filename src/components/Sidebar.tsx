import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Dog, 
  ShoppingCart, 
  CalendarDays,
  LogOut
} from 'lucide-react';

// On définit les propriétés que notre Sidebar va recevoir
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  
  // Liste des menus (plus facile à gérer ici)
  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={20} /> },
    { id: 'membres', label: 'Adhérents', icon: <Users size={20} /> },
    { id: 'meute', label: 'Meute du Club', icon: <Dog size={20} /> },
    { id: 'sections', label: 'Espaces Sections', icon: <GraduationCap size={20} /> },
    { id: 'boutique', label: 'Boutique', icon: <ShoppingCart size={20} /> },
    { id: 'evenements', label: 'Événements', icon: <CalendarDays size={20} /> },
    { id: 'finances', label: 'Trésorerie', icon: <Landmark size={20} /> },
    { id: 'cotisations', label: 'Cotisations', icon: <CreditCard size={20} /> },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-100 p-8 flex flex-col shadow-sm">
      {/* LOGO / NOM DU CLUB */}
      <div className="mb-12 flex items-center space-x-3">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
          <Dog className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-black text-slate-800 italic tracking-tighter uppercase">
          Cani<span className="text-emerald-500">Club</span>
        </h1>
      </div>

      {/* NAVIGATION PRINCIPALE */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${
              activeTab === item.id
                ? 'bg-slate-900 text-white shadow-xl translate-x-2'
                : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* BAS DE SIDEBAR (Optionnel : Déconnexion) */}
      <div className="pt-8 border-t border-slate-50">
        <button className="w-full flex items-center space-x-4 px-5 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest text-rose-400 hover:bg-rose-50 transition-all">
          <LogOut size={20} />
          <span>Quitter</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
