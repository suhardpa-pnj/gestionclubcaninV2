import React from 'react';
import { useStore } from '../store/useStore';
import { Wallet, ArrowUpCircle, ArrowDownCircle, PieChart, Landmark } from 'lucide-react';

const Treasury: React.FC = () => {
  const { products, members } = useStore();

  // Calculs simples pour l'exemple
  const totalAdhesions = members.length * 60; // Imagine une adhésion moyenne à 60€
  const totalVentesBoutique = products.reduce((acc, p) => acc + (p.price * (10 - p.stock)), 0); 

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">Trésorerie</h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Suivi financier du club</p>
      </div>

      {/* CARTES FINANCIÈRES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Landmark size={24} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Solde Estimé</span>
          </div>
          <p className="text-4xl font-black italic tracking-tighter">{totalAdhesions + totalVentesBoutique}€</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
              <ArrowUpCircle size={24} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entrées (Adhésions)</span>
          </div>
          <p className="text-3xl font-black text-slate-800 italic tracking-tighter">{totalAdhesions}€</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center">
              <ArrowDownCircle size={24} />
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sorties (Achats)</span>
          </div>
          <p className="text-3xl font-black text-slate-800 italic tracking-tighter">0€</p>
        </div>
      </div>

      {/* SECTION ANALYSE */}
      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter mb-6 flex items-center">
          <PieChart className="mr-3 text-emerald-500" size={24} />
          Répartition des revenus
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
            <span className="text-xs font-bold uppercase text-slate-500">Cotisations Annuelles</span>
            <span className="font-black text-slate-800">{totalAdhesions}€</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
            <span className="text-xs font-bold uppercase text-slate-500">Ventes Boutique</span>
            <span className="font-black text-slate-800">{totalVentesBoutique}€</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Treasury;
