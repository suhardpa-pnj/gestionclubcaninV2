import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  ShoppingBag, Camera, Package, History, 
  Settings, Info, Plus, User, Euro, Calendar, 
  X, Save, FileText, ChevronRight
} from 'lucide-react';

const Boutique = () => {
  const { products, transactions, members, darkMode, sellProduct, uploadProductPhoto } = useStore();
  const [activeTab, setActiveTab] = useState<'presentation' | 'commandes' | 'stock'>('presentation');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showComposition, setShowComposition] = useState<string | null>(null);

  const clubLogo = "https://votre-url-logo-acv.png"; // À remplacer par ton URL réelle

  // Filtrage des transactions pour l'historique boutique
  const boutiqueHistory = transactions
    .filter(t => t.category === 'Boutique')
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* HEADER & TABS */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
            Espace <span className="text-[#BC6C25]">Croquettes</span>
          </h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">Boutique & Logistique • AC Vernoise</p>
        </div>

        <div className={`flex p-1.5 rounded-[24px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'}`}>
          {[
            { id: 'presentation', label: 'Produits', icon: <ShoppingBag size={14}/> },
            { id: 'commandes', label: 'Ventes', icon: <History size={14}/> },
            { id: 'stock', label: 'Stock', icon: <Package size={14}/> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-[18px] text-[9px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                ? 'bg-[#1B4332] text-white shadow-lg' 
                : 'text-slate-400 hover:text-[#BC6C25]'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- VOLET 1 : PRÉSENTATION PRODUITS --- */}
      {activeTab === 'presentation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className={`p-8 rounded-[40px] border relative flex flex-col ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'
            }`}>
              <div className="relative h-48 rounded-[30px] overflow-hidden bg-white mb-6 border border-slate-50">
                <img src={p.img || clubLogo} className="w-full h-full object-contain p-4" alt={p.name} />
                <div className="absolute top-4 right-4 px-4 py-2 bg-[#BC6C25] text-white text-[10px] font-black rounded-full shadow-lg">
                  {p.price} €
                </div>
              </div>

              <h3 className={`text-2xl font-serif italic mb-3 ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{p.name}</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-1">
                Gamme premium sélectionnée par l'AC Vernoise pour la santé et la vitalité de votre compagnon. 
                Adapté aux chiens de sport et d'utilité.
              </p>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowComposition(p.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl border text-[9px] font-black uppercase tracking-widest transition-all ${
                    darkMode ? 'border-slate-800 text-slate-400' : 'border-[#1B4332]/10 text-[#1B4332]'
                  } hover:bg-[#BC6C25] hover:text-white hover:border-transparent`}
                >
                  <Info size={14} /> Composition
                </button>
                <button 
                  onClick={() => { setSelectedProduct(p); setIsOrderModalOpen(true); }}
                  className="px-6 bg-[#1B4332] text-white rounded-2xl shadow-lg hover:bg-[#BC6C25] hover:scale-105 transition-all"
                >
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- VOLET 2 : COMMANDES & HISTORIQUE --- */}
      {activeTab === 'commandes' && (
        <div className="space-y-8">
          <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-3">
                <History className="text-[#BC6C25]" size={22} />
                <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Ventes Récentes</h3>
              </div>
              <button 
                onClick={() => setIsOrderModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 bg-[#1B4332] text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-[#BC6C25] transition-all"
              >
                <Plus size={14} /> Nouvelle Vente
              </button>
            </div>

            <div className="space-y-4">
              {boutiqueHistory.length > 0 ? boutiqueHistory.map((t, i) => (
                <div key={i} className="flex items-center justify-between p-5 rounded-[24px] bg-slate-50/50 dark:bg-slate-800/50 border border-transparent hover:border-[#BC6C25]/20 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <ShoppingBag size={16} className="text-[#BC6C25]" />
                    </div>
                    <div>
                      <p className={`font-serif italic text-lg ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{t.description}</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{t.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-black italic text-lg ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{t.amount} €</p>
                    <span className="text-[8px] font-black text-[#BC6C25] uppercase tracking-widest italic">Paiement validé</span>
                  </div>
                </div>
              )) : (
                <p className="text-center py-10 text-slate-400 font-serif italic">Aucune vente enregistrée.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- VOLET 3 : GESTION STOCK & FOURNISSEUR --- */}
      {activeTab === 'stock' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* État des stocks */}
          <div className={`lg:col-span-2 p-10 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
             <div className="flex items-center gap-3 mb-10">
                <Package className="text-[#BC6C25]" size={22} />
                <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Inventaire</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map(p => (
                  <div key={p.id} className="p-6 rounded-[24px] bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-xl bg-white overflow-hidden border border-slate-100 flex items-center justify-center p-2">
                         <img src={p.img || clubLogo} className="w-full h-full object-contain" />
                       </div>
                       <div>
                         <p className={`font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{p.name}</p>
                         <p className="text-[8px] font-black text-[#BC6C25] uppercase tracking-widest">Sacs de 20kg</p>
                       </div>
                    </div>
                    <div className={`px-4 py-2 rounded-xl text-[10px] font-black ${p.stock < 3 ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-[#1B4332]'}`}>
                      {p.stock} en stock
                    </div>
                  </div>
                ))}
              </div>
          </div>

          {/* Achats Fournisseur */}
          <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
            <h3 className={`text-xl font-serif italic mb-6 ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Dernier Réappro.</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-[#1B4332]/5 border border-transparent space-y-2">
                <div className="flex justify-between text-[8px] font-black uppercase text-[#BC6C25]">
                  <span>Facture #2026-004</span>
                  <span>14/03/2026</span>
                </div>
                <p className={`font-serif italic text-sm ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Commande Grossiste Croquettes</p>
                <p className="font-black text-lg text-[#BC6C25]">1,240.00 €</p>
              </div>
              <button className="w-full py-4 border-2 border-dashed border-slate-200 text-slate-400 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:border-[#BC6C25] hover:text-[#BC6C25] transition-all">
                Ajouter un achat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODALE DE COMMANDE --- */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#1B4332]/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className={`w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'}`}>
            <div className="p-8 flex items-center justify-between border-b border-slate-50">
              <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Nouvelle Vente</h3>
              <button onClick={() => setIsOrderModalOpen(false)} className="p-2 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <form className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-[#BC6C25] ml-2 tracking-widest italic">Client (Adhérent)</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC6C25]" size={16} />
                    <select className={`w-full pl-12 pr-4 py-4 rounded-2xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}>
                      <option>Sélectionner un membre...</option>
                      {members.map(m => <option key={m.id}>{m.firstName} {m.name}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-[#BC6C25] ml-2 tracking-widest italic">Produit</label>
                  <div className="relative">
                    <ShoppingBag className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BC6C25]" size={16} />
                    <select 
                      defaultValue={selectedProduct?.id} 
                      className={`w-full pl-12 pr-4 py-4 rounded-2xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}
                    >
                      {products.map(p => <option key={p.id} value={p.id}>{p.name} - {p.price}€</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                 <div className="flex-1 space-y-1">
                    <label className="text-[9px] font-black uppercase text-[#BC6C25] ml-2 tracking-widest italic">Date</label>
                    <input type="date" className={`w-full p-4 rounded-2xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} defaultValue={new Date().toISOString().split('T')[0]} />
                 </div>
                 <div className="flex-1 space-y-1">
                    <label className="text-[9px] font-black uppercase text-[#BC6C25] ml-2 tracking-widest italic">Quantité</label>
                    <input type="number" defaultValue="1" className={`w-full p-4 rounded-2xl border-none outline-none font-bold text-xs ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`} />
                 </div>
              </div>

              <button type="submit" className="w-full py-5 rounded-[2rem] bg-[#1B4332] text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all flex items-center justify-center gap-2">
                <Euro size={16} /> Valider l'encaissement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODALE COMPOSITION (Simple placeholder visuel) */}
      {showComposition && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-[#1B4332]/80 backdrop-blur-md">
          <div className="bg-white rounded-[40px] p-10 max-w-lg w-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif italic text-[#1B4332]">Composition du sac</h3>
              <button onClick={() => setShowComposition(null)}><X /></button>
            </div>
            <div className="space-y-4 text-sm text-slate-500 font-medium">
              <p>Constitué d'ingrédients de haute qualité, ce mélange assure une digestibilité optimale.</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Protéines déshydratées : 28%</li>
                <li>Matières grasses : 16%</li>
                <li>Cendres brutes : 7%</li>
                <li>Cellulose : 2.5%</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boutique;
