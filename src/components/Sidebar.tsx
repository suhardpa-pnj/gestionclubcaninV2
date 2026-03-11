import React from 'react';
import { 
  LayoutDashboard, Users, Dog, CreditCard, 
  ShoppingBag, Wallet, ClipboardCheck, Calendar, 
  FileText, MessageSquare, Settings, ShieldCheck, 
  History, UserCircle, Target, Sun, Moon, ChevronRight
} from 'lucide-react';
import { useStore } from '../store/useStore';

const Sidebar = () => {
  const { activeTab, setActiveTab, darkMode, toggleDarkMode } = useStore();

  const NavItem = ({ id, label, icon: Icon }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
        activeTab === id
          ? 'bg-[#1B4332] text-white shadow-lg'
          : 'text-slate-400 hover:bg-emerald-50 hover:text-[#1B4332]'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon size={14} />
        {label}
      </div>
      {activeTab === id && <ChevronRight size={10} />}
    </button>
  );

  const SectionTitle = ({ children }: any) => (
    <p className="px-4 mt-6 mb-2 text-[8px] font-black text-[#BC6C25] uppercase tracking-[0.3em] opacity-60">
      {children}
    </p>
  );

  return (
    <aside className={`w-64 flex flex-col border-r transition-all hidden md:flex ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'}`}>
      {/* BRANDING */}
      <div className="p-8">
        <h1 className="text-xl font-serif italic font-bold text-[#1B4332]">AC Vernoise</h1>
        <div className="h-1 w-8 bg-[#BC6C25] mt-1 rounded-full"></div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-3 overflow-y-auto custom-scrollbar pb-10">
        <SectionTitle>Pilotage</SectionTitle>
        <NavItem id="dashboard" label="Tableau de bord" icon={LayoutDashboard} />
        <NavItem id="members" label="Membres" icon={Users} />
        <NavItem id="dogs" label="Les Chiens" icon={Dog} />
        <NavItem id="cotisations" label="Cotisations" icon={CreditCard} />

        <SectionTitle>Terrain</SectionTitle>
        <NavItem id="presences" label="Présences" icon={ClipboardCheck} />
        <NavItem id="planning" label="Planning" icon={Calendar} />

        <SectionTitle>Gestion & Équipe</SectionTitle>
        <NavItem id="boutique" label="Boutique" icon={ShoppingBag} />
        <NavItem id="finances" label="Trésorerie" icon={Wallet} />
        <NavItem id="secretariat" label="Secrétariat" icon={FileText} />
        <NavItem id="organigramme" label="Organigramme" icon={UserCircle} />

        <SectionTitle>Sections</SectionTitle>
        <NavItem id="section-ring" label="Ring" icon={Target} />
        <NavItem id="section-agility" label="Agility" icon={Target} />

        {/* ZONE TECHNIQUE */}
        <div className="mt-10 pt-6 border-t border-slate-100/10">
          <SectionTitle>Zone Technique</SectionTitle>
          <NavItem id="support" label="Support & Idées" icon={MessageSquare} />
          <NavItem id="logs" label="Logs" icon={History} />
          <NavItem id="settings" label="Paramètres" icon={Settings} />
          <NavItem id="admin" label="Accès Admin" icon={ShieldCheck} />
        </div>
      </nav>

      {/* FOOTER */}
      <div className="p-4 bg-emerald-900/5">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[9px] font-black uppercase text-slate-400 hover:bg-white transition-all shadow-sm"
        >
          {darkMode ? <Sun size={14} className="text-yellow-500" /> : <Moon size={14} />}
          {darkMode ? 'Lumière' : 'Obscurité'}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
