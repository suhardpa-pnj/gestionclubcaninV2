import React from 'react';
import { 
  Users, 
  Dog, 
  PlusCircle, 
  ShoppingBag, 
  CalendarPlus, 
  AlertCimport React from 'react';
import { useStore } from '../store/useStore';
import { Users, Dog, ShoppingCart, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { members, dogs, transactions, seedBoutique, darkMode } = useStore();

  const stats = [
    { label: 'Adhérents', value: members.length, icon: <Users size={20}/>, color: 'bg-blue-500' },
    { label: 'Chiens', value: dogs.length, icon: <Dog size={20}/>, color: 'bg-emerald-500' },
    { label: 'Ventes', value: transactions.filter(t => t.category === 'Boutique').length, icon: <ShoppingCart size={20}/>, color: 'bg-orange-500' },
    { label: 'CA Boutique', value: `${transactions.filter(t => t.category === 'Boutique').reduce((acc, t) => acc + t.amount, 0)}€`, icon: <TrendingUp size={20}/>, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Tableau de <span className="text-[#BC6C25]">Bord</span></h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2 italic">Amicale Canine Vernoise • Session 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className={`p-8 rounded-[40px] border transition-all hover:scale-105 ${darkMode ? 'bg-[#1A1F1C] border-slate-700 shadow-none' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
            <div className={`w-12 h-12 rounded-2xl ${s.color} text-white flex items-center justify-center mb-6 shadow-lg`}>{s.icon}</div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
            <p className={`text-3xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-[#1A1F1C] border-slate-700' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="text-[#BC6C25]" size={20} />
            <h3 className={`text-xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Prochaines séances</h3>
          </div>
          <p className="text-slate-400 font-serif italic">Aucune séance programmée cette semaine.</p>
        </div>

        <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-[#1A1F1C] border-slate-700' : 'bg-[#1B4332] border-transparent shadow-2xl'}`}>
          <h3 className="text-white text-xl font-serif italic mb-4">Initialisation Boutique</h3>
          <p className="text-emerald-100/60 text-xs mb-8">Utilisez ce bouton pour charger les 6 références de croquettes ACV par défaut.</p>
          <button onClick={seedBoutique} className="w-full py-4 bg-[#BC6C25] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-[#DDA15E] transition-all">Réinitialiser le catalogue</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
ircle,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  // Statistiques simulées (à lier à ta base Firebase plus tard)
  const stats = {
    membersCount: 55,
    lastMember: "Jean Dupont",
    dogsCount: 42,
    feesToPayThisMonth: 3
  };

  const quickActions = [
    { label: 'Croquettes', icon: ShoppingBag, color: 'bg-orange-500' },
    { label: 'Membre', icon: PlusCircle, color: 'bg-blue-500' },
    { label: 'Chien', icon: PlusCircle, color: 'bg-green-500' },
    { label: 'Événement', icon: CalendarPlus, color: 'bg-purple-500' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header avec Titre de Bienvenue */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">Tableau de bord</h1>
          <p className="text-gray-400 mt-2 text-lg">Gestion globale du club</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm text-gray-500 uppercase tracking-widest">Dernière mise à jour</p>
          <p className="text-white font-mono">10 Mars 2026</p>
        </div>
      </div>

      {/* Cartes de Statistiques Condensées */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Carte Adhérents */}
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 p-6 rounded-2xl flex items-center justify-between hover:border-blue-500/50 transition-all shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-blue-500/10 rounded-xl">
              <Users className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <div className="flex items-baseline space-x-2">
                <p className="text-4xl font-bold text-white">{stats.membersCount}</p>
                <p className="text-gray-400 font-medium">adhérents</p>
              </div>
              <p className="text-sm text-blue-400 mt-1 italic">Bienvenue à {stats.lastMember}</p>
            </div>
          </div>
          <TrendingUp className="h-6 w-6 text-gray-700" />
        </div>

        {/* Carte Chiens */}
        <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 p-6 rounded-2xl flex items-center justify-between hover:border-green-500/50 transition-all shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-green-500/10 rounded-xl">
              <Dog className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <div className="flex items-baseline space-x-2">
                <p className="text-4xl font-bold text-white">{stats.dogsCount}</p>
                <p className="text-gray-400 font-medium">chiens</p>
              </div>
              <p className="text-sm text-green-400 mt-1 italic">La meute s'agrandit</p>
            </div>
          </div>
          <TrendingUp className="h-6 w-6 text-gray-700" />
        </div>
      </div>

      {/* Rappel Cotisations & Actions Rapides */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Rappel Cotisations (Prend 1/3) */}
        <div className="bg-red-900/20 border border-red-900/30 p-6 rounded-2xl shadow-lg">
          <div className="flex items-center space-x-3 mb-6">
            <AlertCircle className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-bold text-white">Rappels de cotisations</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-300">
              <span className="text-red-400 font-bold">{stats.feesToPayThisMonth}</span> adhérents doivent renouveler ce mois-ci.
            </p>
            <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors text-sm">
              Voir la liste
            </button>
          </div>
        </div>

        {/* Actions Rapides (Prend 2/3) */}
        <div className="lg:col-span-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl font-bold text-white mb-6">Actions rapides</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-blue-500 hover:bg-gray-800 transition-all group"
              >
                <div className={`p-3 rounded-lg ${action.color} mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white text-center">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
