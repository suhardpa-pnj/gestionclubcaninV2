import React from 'react';
import { useStore } from '../store/useStore';
import { Landmark, ArrowUpCircle, ArrowDownCircle, ShieldCheck, PieChart } from 'lucide-react';

const Treasury: React.FC = () => {
  const { members, products } = useStore();

  // CALCULS FINANCIERS
  const prixAdhesion = 60; // Exemple
  const partACMA = 15;
  const fraisClubACMA = 15;

  const totalEncaisse = members.length * prixAdhesion;
  const totalDuACMA = (members.length * partACMA) + fraisClubACMA;
  const resteClub = totalEncaisse - totalDuACMA;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">Trésorerie</h2>
        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Gestion financière & Reversements ACMA</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ENCAISSÉ TOTAL */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Encaissé</p>
          <p className="text-4xl font-black text-slate-800 italic tracking-tighter">{totalEncaisse}€</p>
          <div className="mt-4 flex items-center text-emerald-500 text-[10px] font-bold uppercase">
            <ArrowUpCircle size={14} className="mr-1" /> Bruts Adhésions
          </div>
        </div>

        {/* DÛ À L'ACMA */}
        <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100 shadow-sm">
          <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-4">Dû à l'ACMA</p>
          <p className="text-4xl font-black text-rose-600 italic tracking-tighter">-{totalDuACMA}€</p>
          <p className="mt-4 text-[10px] font-bold text-rose-400 uppercase">15€/membre + 15€ fixe club</p>
        </div>

        {/* RESTE CLUB */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-xl text-white">
          <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-4">Solde Réel Club</p>
          <p className="text-4xl font-black italic tracking-tighter">{resteClub}€</p>
          <div className="mt-4 flex items-center text-slate-400 text-[10px] font-bold uppercase">
            <ShieldCheck size={14} className="mr-1 text-emerald-500" /> Après frais ACMA
          </div>
        </div>
      </div>

      <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm">
        <h3 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter mb-6 flex items-center">
          <PieChart className="mr-3 text-emerald-500" size={24} /> Analyse des flux
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
                <div className="flex justify-between p-4 bg-slate-50 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-slate-500">Part ACMA (Collectée)</span>
                    <span className="font-black text-rose-500">{members.length * 15}€</span>
                </div>
                <div className="flex justify-between p-4 bg-slate-50 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-slate-500">Cotisation Club fixe ACMA</span>
                    <span className="font-black text-rose-500">15€</span>
                </div>
            </div>
            <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100">
                <p className="text-[11px] font-bold text-emerald-700 leading-relaxed italic">
                    "L'ACMA (Association Canine Maine Anjou) assure le lien avec la Centrale Canine. 
                    Le club collecte les cotisations pour leur compte."
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Treasury;
