import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  ShoppingBag, Package, History, 
  Info, Plus, User, Euro, 
  X, ShoppingCart
} from 'lucide-react';

const Boutique = () => {
  const { products, transactions, members, darkMode, sellProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'presentation' | 'commandes' | 'stock'>('presentation');
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showComposition, setShowComposition] = useState<string | null>(null);

  const clubLogo = "https://static.wixstatic.com/media/893c83_7f603a11756540c1809088654c6017b2~mv2.png"; // Logo par défaut

  // Historique filtré pour la boutique
  const boutiqueHistory = (transactions || [])
    .filter(t => t.category === 'Boutique')
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* HEADER & ONGLETS */}
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

      {/* VOLET 1 : PRODUITS */}
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
              <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-1">Gamme premium sélectionnée pour l'AC Vernoise.</p>
              <div className="flex gap-3">
                <button onClick={() => setShowComposition(p.id)} className="flex-1 py-4 rounded-2xl border text-[9px] font-black uppercase tracking-widest text-[#1B4332] hover:bg-[#BC6C25] hover:text-white transition-all">Composition</button>
                <button onClick={() => { setSelectedProduct(p); setIsOrderModalOpen(true); }} className="px-6 bg-[#1B4332] text-white rounded-2xl shadow-lg hover:bg-[#BC6C25] transition-all"><ShoppingCart size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VOLET 2 : VENTES */}
      {activeTab === 'commandes' && (
        <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl'}`}>
          <div className="flex items-center justify-between mb-10">
            <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Ventes Récentes</h3>
            <button onClick={() => setIsOrderModalOpen(true)} className="px-6 py-3 bg-[#1B4332] text-white rounded-2xl text-[9px] font-black uppercase shadow-lg hover:bg-[#BC6C25] transition-all">Nouvelle Vente</button>
          </div>
          <div className="space-y-4">
            {boutiqueHistory.map((t, i) => (
              <div key={i} className="flex items-center justify-between p-5 rounded-[24px] bg-slate-50/50 dark:bg-slate-800/50">
                <p className={`font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{t.description}</p>
                <p className="font-black text-[#BC6C25]">{t.amount} €</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VOLET 3 : STOCK */}
      {activeTab === 'stock' && (
        <div className={`p-10 rounded-[40px] border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl'}`}>
          <h3 className={`text-2xl font-serif italic mb-10 ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Inventaire</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(p => (
              <div key={p.id} className="p-6 rounded-[24px] bg-slate-50/50 dark:bg-slate-800/50 flex items-center justify-between">
                <span className={`font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{p.name}</span>
                <span className={`px-4 py-2 rounded-xl text-[10px] font-black ${p.stock < 3 ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-[#1B4332]'}`}>{p.stock} sacs</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODALE COMMANDE */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-[#1B4332]/60 backdrop-blur-md">
          <div className={`w-full max-w-lg rounded-[40px] bg-white shadow-2xl overflow-hidden p-8`}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-serif italic text-[#1B4332]">Vente Croquettes</h3>
              <button onClick={() => setIsOrderModalOpen(false)}><X /></button>
            </div>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-[#BC6C25] italic">Adhérent</label>
                <select className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-xs">
                  <option>Sélectionner...</option>
                  {members.map(m => <option key={m.id}>{m.firstName} {m.name}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-[#BC6C25] italic">Produit</label>
                <select defaultValue={selectedProduct?.id} className="w-full p-4 rounded-2xl bg-slate-50 border-none outline-none font-bold text-xs">
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <button type="submit" className="w-full py-5 rounded-[2rem] bg-[#1B4332] text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all flex items-center justify-center gap-2">
                <Euro size={16} /> Valider
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODALE COMPOSITION */}
      {showComposition && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-[#1B4332]/80 backdrop-blur-md">
          <div className="bg-white rounded-[40px] p-10 max-w-lg w-full relative">
            <button onClick={() => setShowComposition(null)} className="absolute top-6 right-6 text-slate-400"><X /></button>
            <h3 className="text-2xl font-serif italic text-[#1B4332] mb-6">Composition</h3>
            <p className="text-sm text-slate-500 font-medium">Protéines : 28% • Matières Grasses : 16% • Cendres : 7% • Cellulose : 2.5%</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boutique;
