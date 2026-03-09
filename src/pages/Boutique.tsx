import React from 'react';
import { useStore } from '../store/useStore';
import { ShoppingBag, Package } from 'lucide-react';

const Boutique = () => {
  const { products, darkMode, sellProduct } = useStore();

  return (
    <div className="space-y-8">
      <h2 className={`text-4xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Vente de croquettes</h2>
      <div className={`rounded-[40px] overflow-hidden border ${darkMode ? 'bg-[#1A1F1C] border-slate-700' : 'bg-white border-emerald-50 shadow-xl'}`}>
        <table className="w-full text-left">
          <thead className={darkMode ? 'bg-slate-800' : 'bg-[#FDFBF7]'}>
            <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              <th className="px-8 py-6">Produit</th>
              <th className="px-8 py-6 text-center">Stock</th>
              <th className="px-8 py-6 text-right">Prix</th>
              <th className="px-8 py-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map(p => (
              <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                <td className="px-8 py-4 flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#FDFBF7] rounded-2xl p-2 border border-emerald-50 shrink-0">
                    <img src={p.img} alt={p.name} className="w-full h-full object-contain" />
                  </div>
                  <span className={`font-serif italic text-lg ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{p.name}</span>
                </td>
                <td className="px-8 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black ${p.stock < 3 ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                    {p.stock}
                  </span>
                </td>
                <td className={`px-8 py-4 text-right font-black italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{p.price}€</td>
                <td className="px-8 py-4 text-right">
                  <button onClick={() => sellProduct(p.id, 1, p.price)} className="p-3 bg-[#1B4332] text-white rounded-xl hover:scale-110 transition-all">
                    <ShoppingBag size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Boutique;
