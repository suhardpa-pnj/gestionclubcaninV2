import React from 'react';
import { useStore } from '../store/useStore';
import { Package, Minus, Plus } from 'lucide-react';

const Boutique = () => {
  const { products, darkMode, sellProduct } = useStore();

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-black uppercase italic ${darkMode ? 'text-white' : 'text-slate-800'}`}>Gestion Croquettes</h2>
      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p.id} className={`${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'} p-5 rounded-[28px] border`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-xs font-black uppercase italic">{p.name}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">{p.stock} sacs en stock</p>
              </div>
              <p className="text-lg font-black text-emerald-500 italic">{p.price}€</p>
            </div>
            <button 
              onClick={() => sellProduct(p.id, 1, p.price)}
              className="w-full py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all"
            >
              Vendre 1 sac
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boutique;
