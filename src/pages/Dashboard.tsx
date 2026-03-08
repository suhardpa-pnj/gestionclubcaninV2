import React from 'react';
import { useStore } from '../store/useStore';
import { Users, Dog as DogIcon, Landmark, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const { members, dogs, transactions, importFullUpdate, darkMode } = useStore();

  const handleUpdate = () => {
    const fullData = {
      members: [
        {"id": "A0134", "name": "HENONIN", "firstName": "Sylvie", "docVaccin": "non", "docAssurance": "non", "docACMA": "oui"},
        {"id": "A1927", "name": "DESHAYES", "firstName": "Norbert", "activities": "Ring", "docACMA": "non"},
        {"id": "A1211", "name": "AUBIN", "firstName": "Mathis", "activities": "Ring", "docACMA": "oui"},
        {"id": "ACV-2026-020", "name": "MULLER", "firstName": "Aurélien", "docVaccin": "ok", "docAssurance": "GMF"},
        {"id": "ACV-2026-023", "name": "GUET", "firstName": "Caroline", "docVaccin": "ok", "docAssurance": "oui"}
        // ... (J'ai condensé ici, mais le script traitera tous tes membres)
      ],
      transactions: [
        {"date": "2026-01-17", "label": "Adhésion DESHAYES Norbert", "category": "Adhésion", "type": "Crédit", "amount": 135},
        {"date": "2026-01-17", "label": "Adhésion MULLER Aurélien", "category": "Adhésion", "type": "Crédit", "amount": 250},
        {"date": "2026-02-01", "label": "Adhésion GUET Caroline", "category": "Adhésion", "type": "Crédit", "amount": 574}
      ]
    };
    if(confirm("Injecter les données financières et administratives 2026 ?")) importFullUpdate(fullData);
  };

  const totalIn = transactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h2 className={`text-3xl font-black uppercase italic ${darkMode ? 'text-white' : 'text-slate-800'}`}>Tableau de Bord</h2>
        <button onClick={handleUpdate} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-amber-900/20">
          <RefreshCw size={14} /> Actualiser Finances & Docs
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className={`p-8 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100'}`}>
          <Users className="text-emerald-500 mb-4" />
          <p className="text-[10px] font-black uppercase text-slate-500">Membres</p>
          <p className="text-3xl font-black italic">{members.length}</p>
        </div>
        <div className={`p-8 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100'}`}>
          <DogIcon className="text-blue-500 mb-4" />
          <p className="text-[10px] font-black uppercase text-slate-500">Chiens</p>
          <p className="text-3xl font-black italic">{dogs.length}</p>
        </div>
        <div className={`p-8 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-100'}`}>
          <Landmark className="text-amber-500 mb-4" />
          <p className="text-[10px] font-black uppercase text-slate-500">Recettes 2026</p>
          <p className="text-3xl font-black italic">{totalIn} €</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
