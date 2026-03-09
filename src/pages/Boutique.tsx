import React from 'react';
import { useStore } from '../store/useStore';
import { Package, ExternalLink, ShoppingCart, TrendingUp } from 'lucide-react';

const Boutique = () => {
  const { products, darkMode, sellProduct } = useStore();

  return (
    <div className="space-y-8">
      <header>
        <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
          Boutique <span className="text-[#DDA15E]">Croquettes</span>
        </h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mt-1 italic">Ventes de sacs de 20kg • France Croquettes</p>
      </header>

      {products.length === 0 ? (
        <div className="p-20 text-center border-2 border-dashed border-emerald-100 rounded-[40px]">
          <p className="text-slate-400 font-bold italic">Le catalogue est vide. Clique sur "Initialiser" sur le Dashboard.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => {
            const margin = p.price - p.cost;
            return (
              <div key={p.id} className={`p-8 rounded-[40px] border transition-all relative overflow-hidden group ${
                darkMode ? 'bg-slate-900 border-slate-800 shadow-none' : 'bg-white border-emerald-50 shadow-sm shadow-emerald-100/20'
              }`}>
                {/* Badge Stock */}
                <div className={`absolute top-6 right-6 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                  p.stock < 3 ? 'bg-orange-500 text-white' : (darkMode ? 'bg-slate-800 text-slate-400' : 'bg-emerald-50 text-emerald-600')
                }`}>
                  Stock: {p.stock}
                </div>

                {/* Lien Fournisseur */}
                <a href={p.url} target="_blank" rel="noreferrer" className="block mb-6 relative group/img">
                  <div className="w-20 h-20 bg-[#FDFBF7] border border-emerald-100 rounded-3xl flex items-center justify-center text-[#DDA15E] shadow-sm group-hover/img:scale-105 transition-transform">
                    <Package size={32} />
                    <div className="absolute inset-0 flex items-center justify-center bg-[#1B4332]/80 rounded-3xl opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <ExternalLink size={20} className="text-white" />
                    </div>
                  </div>
                </a>

                <h3 className={`text-xl font-black uppercase italic mb-1 ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{p.name}</h3>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-6">Format 20 KG • Nature</p>

                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Prix de vente</p>
                    <p className={`text-3xl font-black italic ${darkMode ? 'text-[#DDA15E]' : 'text-[#BC6C25]'}`}>{p.price}€</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center justify-end gap-1">
                      <TrendingUp size={10} /> Marge
                    </p>
                    <p className="text-lg font-black italic text-slate-500">{margin.toFixed(2)}€</p>
                  </div>
                </div>

                <button 
                  onClick={() => sellProduct(p.id, 1, p.price)}
                  className="w-full py-4 bg-[#1B4332] text-white rounded-2xl font-black uppercase italic text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-emerald-900/20"
                >
                  Valider une Vente
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Boutique;
