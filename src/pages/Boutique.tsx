import React from 'react';
import { useStore } from '../store/useStore';
import { ExternalLink, ShoppingBag, Plus, Info } from 'lucide-react';

const Boutique = () => {
  const { products, darkMode, sellProduct } = useStore();

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col gap-2">
        <h2 className={`text-5xl font-serif italic tracking-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
          La Boutique <span className="text-[#BC6C25]">Nature</span>
        </h2>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em]">Gamme France Croquettes • Sacs de 20kg</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {products.map((p) => (
          <div key={p.id} className={`group relative flex flex-col rounded-[40px] overflow-hidden transition-all duration-500 ${
            darkMode ? 'bg-slate-900 shadow-none' : 'bg-white shadow-2xl shadow-emerald-900/5'
          } hover:-translate-y-2`}>
            
            {/* ZONE IMAGE */}
            <div className={`relative aspect-[4/5] flex items-center justify-center p-12 overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-[#FDFBF7]'}`}>
              <img 
                src={p.img} 
                alt={p.name} 
                className="w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 bg-white/90 backdrop-blur rounded-full text-[9px] font-black text-[#1B4332] shadow-sm uppercase tracking-tighter">
                  Stock: {p.stock}
                </span>
              </div>
              <a href={p.url} target="_blank" rel="noreferrer" className="absolute top-6 right-6 p-3 bg-[#1B4332] text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ExternalLink size={16} />
              </a>
            </div>

            {/* INFOS PRODUIT */}
            <div className="p-10 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h3 className={`text-2xl font-serif italic leading-tight ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                    {p.name}
                  </h3>
                  <p className="text-[#BC6C25] text-[10px] font-black uppercase mt-1">20 Kilogrammes</p>
                </div>
                <div className="text-right">
                  <p className={`text-3xl font-black italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
                    {p.price}€
                  </p>
                </div>
              </div>

              {/* BOUTON VENTE */}
              <button 
                onClick={() => sellProduct(p.id, 1, p.price)}
                className="mt-auto w-full py-5 bg-[#1B4332] text-white rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[#2D6A4F] transition-all shadow-xl shadow-emerald-900/20 active:scale-95"
              >
                <ShoppingBag size={18} />
                Enregistrer une vente
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boutique;
