import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Dog, ShoppingBag, 
  ClipboardCheck, Calendar, Layers, CreditCard, 
  Network, FileText, DollarSign 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Adhérents', href: '/members', icon: Users },
  { name: 'Les Chiens', href: '/dogs', icon: Dog },
  { name: 'Boutique', href: '/shop', icon: ShoppingBag },
  { name: 'Présences', href: import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Dog, 
  ShoppingBag, 
  ClipboardCheck, 
  Calendar, 
  Layers, 
  CreditCard, 
  Sitemap, 
  FileText, 
  DollarSign 
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Adhérents', href: '/members', icon: Users },
  { name: 'Les Chiens', href: '/dogs', icon: Dog },
  { name: 'Boutique', href: '/shop', icon: ShoppingBag },
  { name: 'Présences', href: '/attendance', icon: ClipboardCheck },
  { name: 'Planning', href: '/planning', icon: Calendar },
  { name: 'Sections', href: '/sections', icon: Layers },
  { name: 'Cotisations', href: '/fees', icon: CreditCard },
  { name: 'Organigramme', href: '/org-chart', icon: Sitemap },
  { name: 'Secrétariat', href: '/admin', icon: FileText },
  { name: 'Finances', href: '/finances', icon: DollarSign },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 overflow-y-auto border-r border-gray-800 transition-colors duration-300">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-500">ACV Gestion</h1>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
'/attendance', icon: ClipboardCheck },
  { name: 'Planning', href: '/planning', icon: Calendar },
  { name: 'Sections', href: '/sections', icon: Layers },
  { name: 'Cotisations', href: '/fees', icon: CreditCard },
  { name: 'Organigramme', href: '/org-chart', icon: Network },
  { name: 'Secrétariat', href: '/admin', icon: FileText },
  { name: 'Finances', href: '/finances', icon: DollarSign },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col w-64 bg-[#1B4332] text-white h-screen fixed left-0 top-0 overflow-y-auto border-r border-emerald-900 shadow-2xl z-50">
      <div className="p-8">
        <h1 className="text-2xl font-serif italic font-bold text-white border-b border-emerald-700/50 pb-4">
          ACV Gestion
        </h1>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400/60 mt-2 italic">
          Club Canin • Nature
        </p>
      </div>
      
      <nav className="flex-1 px-4 pb-8 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-6 py-3.5 text-sm font-medium rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-[#BC6C25] text-white shadow-lg translate-x-2 font-bold'
                  : 'text-emerald-100/70 hover:bg-emerald-900/40 hover:text-white hover:translate-x-1'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`mr-4 h-5 w-5 ${isActive ? 'text-white' : 'text-emerald-600'}`} />
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
