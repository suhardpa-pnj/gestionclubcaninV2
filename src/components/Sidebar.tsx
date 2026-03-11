import React from 'react';
import { 
  LayoutDashboard, Users, Dog, CreditCard, 
  ShoppingBag, Wallet, ClipboardCheck, Calendar, 
  MessageSquare, Sun, Moon, LogOut 
} from 'lucide-react';
import { useStore } from '../store/useStore';

const Sidebar = () => {
  const { activeTab, setActiveTab, darkMode, toggleDarkMode } = useStore();

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'members', label: 'Membres', icon: Users },
    { id: 'dogs', label: 'Les Chiens', icon: Dog },
    { id: 'cotisations', label: 'Cotisations', icon: CreditCard },
    { id: 'presences', label: 'Présences', icon: ClipboardCheck },
    { id: 'planning', label: 'Planning', icon: Calendar },
    { id: 'boutique', label: 'Boutique', icon: ShoppingBag },
    { id: 'finances', label: 'Trésorerie', icon: Wallet },
    { id: 'support', label: 'Support & Idées', icon: MessageSquare }, // <--- AJOUT ICI
  ];

  return (
    <aside className={`w-64 flex flex-col border-r transition-colors ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'}`}>
      <div className="p-8">
        <h1 className="text-2xl font-serif italic font-bold text-[#1B4332]">AC Vernoise</h1>
        <p className="text-[10px] font-black text-[#BC6C25] uppercase tracking-widest mt-1">Gestion Club</p>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
              activeTab === item.id
                ? 'bg-[#1B4332] text-white shadow-lg shadow-emerald-900/20'
                : 'text-slate-400 hover:bg-emerald-50 hover:text-[#1B4332]'
            }`}
          >
            <item.icon size={18} />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100/10 space-y-2">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-slate-400 hover:bg-slate-100 transition-all"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? 'Mode Clair' : 'Mode Sombre'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
