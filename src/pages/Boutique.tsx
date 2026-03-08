import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Search, Package, AlertTriangle, Plus, ShoppingCart } from 'lucide-react';

const Boutique: React.FC = () => {
 const products = [];
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* EN-TÊTE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">Boutique</h2>
          <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Gestion des stocks et inventaire</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              placeholder="Chercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white border border-slate-100 rounded-2xl text-sm font-bold shadow-sm focus:ring-2 focus:ring-emerald-500/20 outline-none w-64 transition-all"
            />
          </div>
          <button className="bg-slate-900 text-white px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-emerald-500 transition-all flex items-center space-x-3">
            <Plus size={18} />
            <span>Nouveau Produit</span>
          </button>
        </div>
      </div>

      {/* GRILLE PRODUITS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-48 bg-slate-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-black text-slate-800 uppercase italic tracking-tighter mb-1 line-clamp-1">
                {product.name}
              </h3>
              <p className="text-slate-400 font-bold text-[9px] uppercase tracking-widest mb-4">{product.brand}</p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="text-2xl font-black text-emerald-500 italic tracking-tighter">
                  {product.price}€
                </div>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-xl ${product.stock <= product.minStock ? 'bg-rose-50 text-rose-500' : 'bg-slate-50 text-slate-500'}`}>
                  <Package size={14} />
                  <span className="text-[11px] font-black tracking-tight">{product.stock} en stock</span>
                </div>
              </div>

              <button className="w-full py-3 bg-slate-50 hover:bg-emerald-50 text-slate-400 hover:text-emerald-600 rounded-2xl transition-all flex items-center justify-center space-x-2 border border-slate-100">
                <ShoppingCart size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Vendre</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boutique;
