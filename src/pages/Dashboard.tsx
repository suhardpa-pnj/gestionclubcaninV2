import React from 'react';
import { useStore } from '../store/useStore';
import { Users, Dog as DogIcon, Landmark, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const { members, dogs, transactions, importFullUpdate, darkMode } = useStore();

  const handleUpdate = () => {
    const fullData = {
      members: [
        {"id": "A1927", "docVaccin": "oui", "docAssurance": "oui", "docACMA": "oui"},
        {"id": "A1211", "docVaccin": "oui", "docAssurance": "oui", "docACMA": "oui"},
        {"id": "A0384", "docVaccin": "ok", "docAssurance": "oui", "docACMA": "oui"},
        {"id": "ACV-2026-020", "docVaccin": "ok", "docAssurance": "GMF", "docACMA": "non"},
        {"id": "ACV-2026-021", "docVaccin": "oui", "docAssurance": "oui", "docACMA": "non"}
      ],
      transactions: [
        {"date": "2026-01-14", "label": "Cotisation PAILLARD Sophie", "category": "Adhésion", "type": "Crédit", "amount": 200},
        {"date": "2026-01-15", "label": "Cotisation MULLER Aurélien", "category": "Adhésion", "type": "Crédit", "amount": 250},
        {"date": "2026-01-17", "label": "Cotisation HENONIN Sylvie", "category": "Adhésion", "type": "Crédit", "amount": 15}
      ]
    };
    if(confirm("Voulez-vous enrichir les fiches membres avec les statuts documents et finances ?")) {
      importFullUpdate(fullData);
    }
  };

  const totalRevenue = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-3xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-slate-800'}`}>Tableau de Bord</h2>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Amicale Canine Vernoise</p>
        </div>
        <button onClick={handleUpdate} className="flex items-center gap-2 px-6 py-4 bg-amber-500 text-white rounded-2xl font-black uppercase italic text-[10px] tracking-widest shadow-xl shadow-amber-900/20 hover:scale-105 transition-all">
          <RefreshCw size={16} /> Synchroniser Dossiers 2026
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={`p-8 rounded-[40px] border transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 shadow-sm'}`}>
          <Users className="text-emerald-500 mb-4" size={32} />
          <p className="text-[10px] font-black uppercase text-slate-500">Adhérents</p>
          <p className="text-4xl font-black italic">{members.length}</p>
        </div>
        <div className={`p-8 rounded-[40px] border transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 shadow-sm'}`}>
          <DogIcon className="text-blue-500 mb-4" size={32} />
          <p className="text-[10px] font-black uppercase text-slate-500">Parc Canin</p>
          <p className="text-4xl font-black italic">{dogs.length}</p>
        </div>
        <div className={`p-8 rounded-[40px] border transition-all ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100 shadow-sm'}`}>
          <Landmark className="text-amber-500 mb-4" size={32} />
          <p className="text-[10px] font-black uppercase text-slate-500">Recettes</p>
          <p className="text-4xl font-black italic">{totalRevenue} €</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
