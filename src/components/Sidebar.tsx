import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { 
  LayoutDashboard, Users, Dog, Landmark, 
  ShoppingCart, FileText, ChevronDown, 
  ChevronRight, Sun, Moon, X, Network,
  CreditCard, ClipboardCheck, Calendar, Settings, History
} from 'lucide-react';
import { create } from 'zustand';
import { db, storage } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy, writeBatch, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ClubState {
  members: any[]; dogs: any[]; transactions: any[]; products: any[]; attendances: any[];
  isLoading: boolean; darkMode: boolean;
  toggleDarkMode: () => void;
  fetchData: () => Promise<void>;
  addMember: (m: any) => Promise<void>;
  updateMember: (id: string, data: any) => Promise<void>;
  addTransaction: (t: any) => Promise<void>;
  addAttendance: (a: any) => Promise<void>;
  uploadMemberPhoto: (id: string, file: File) => Promise<void>;
  uploadDogPhoto: (dogId: string, file: File) => Promise<void>;
  uploadProductPhoto: (productId: string, file: File) => Promise<void>;
  seedBoutique: () => Promise<void>;
  sellProduct: (pId: string, qty: number, price: number) => Promise<void>;
}

export const useStore = create<ClubState>((set, get) => ({
  members: [], dogs: [], transactions: [], products: [], attendances: [],
  isLoading: true, darkMode: false,

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  fetchData: async () => {
    try {
      const [mS, dS, tS, pS, aS] = await Promise.all([
        getDocs(collection(db, "members")),
        getDocs(collection(db, "dogs")),
        getDocs(query(collection(db, "transactions"), orderBy("date", "desc"))),
        getDocs(collection(db, "products")),
        getDocs(query(collection(db, "attendances"), orderBy("date", "desc")))
      ]);
      set({ 
        members: mS.docs.map(d => ({ id: d.id, ...d.data() })),
        dogs: dS.docs.map(d => ({ id: d.id, ...d.data() })),
        transactions: tS.docs.map(d => ({ id: d.id, ...d.data() })),
        products: pS.docs.map(d => ({ id: d.id, ...d.data() })),
        attendances: aS.docs.map(d => ({ id: d.id, ...d.data() })),
        isLoading: false 
      });
    } catch (e) { set({ isLoading: false }); }
  },

  addMember: async (m) => {
    await addDoc(collection(db, "members"), m);
    get().fetchData();
  },

  updateMember: async (id, data) => {
    await updateDoc(doc(db, "members", id), data);
    get().fetchData();
  },

  addTransaction: async (t) => {
    await addDoc(collection(db, "transactions"), t);
    get().fetchData();
  },

  addAttendance: async (a) => {
    await addDoc(collection(db, "attendances"), a);
    get().fetchData();
  },

  uploadMemberPhoto: async (id, file) => {
    const storageRef = ref(storage, `members/${id}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    await updateDoc(doc(db, "members", id), { photo: url });
    get().fetchData();
  },

  uploadDogPhoto: async (dogId, file) => {
    const storageRef = ref(storage, `dogs/${dogId}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    await updateDoc(doc(db, "dogs", dogId), { photo: url });
    get().fetchData();
  },

  uploadProductPhoto: async (productId, file) => {
    const storageRef = ref(storage, `products/${productId}`);
    // C'est ici qu'était l'erreur ! Corrigé avec storageRef :
    const snapshot = await uploadBytes(storageRef, file); 
    const url = await getDownloadURL(snapshot.ref);
    await updateDoc(doc(db, "products", productId), { img: url });
    get().fetchData();
  },

  seedBoutique: async () => {
    const batch = writeBatch(db);
    const pSnap = await getDocs(collection(db, "products"));
    pSnap.forEach(p => batch.delete(p.ref));
    await batch.commit();

    const newBatch = writeBatch(db);
    const refs = [
      { id: "gold", name: "Gold 28/16", price: 58, img: "" },
      { id: "equilibre", name: "Équilibre 25/10", price: 44, img: "" },
      { id: "light", name: "Super Light 26/8", price: 60, img: "" },
      { id: "maxi", name: "Maxi Chiots", price: 65, img: "" },
      { id: "mini", name: "Mini Chiot", price: 65, img: "" },
      { id: "comp", name: "Gold Compétition", price: 68, img: "" }
    ];
    refs.forEach(p => newBatch.set(doc(db, "products", p.id), { ...p, stock: 10 }));
    await newBatch.commit();
    get().fetchData();
  },

  sellProduct: async (pId, qty, price) => {
    const product = get().products.find(p => p.id === pId);
    if (!product) return;
    await updateDoc(doc(db, "products", pId), { stock: (product.stock || 0) - qty });
    await addDoc(collection(db, "transactions"), {
      date: new Date().toISOString().split('T')[0],
      label: `Vente ${product.name}`,
      amount: price,
      type: 'Crédit',
      category: 'Boutique'
    });
    get().fetchData();
  }
}));

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const { darkMode, toggleDarkMode } = useStore();

  const sections = [
    { id: 'section-chiots', label: 'École du Chiot' },
    { id: 'section-ring', label: 'Ring' },
    { id: 'section-agility', label: 'Agility' },
    { id: 'section-obeissance', label: 'Obéissance' },
    { id: 'section-education', label: 'Éducation' },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-screen w-72 border-r z-50 transition-all duration-500 flex flex-col p-6
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      ${darkMode ? 'bg-[#0A110D] border-slate-800' : 'bg-[#1B4332] border-emerald-900 text-white'}
    `}>
      <button onClick={onClose} className="lg:hidden absolute top-6 right-6 text-emerald-200"><X size={24} /></button>

      {/* LOGO ACV */}
      <div className="flex flex-col items-center mb-8 pt-4">
        <img 
          src="https://drive.google.com/thumbnail?id=1OpIY0AEaoBUT_CAqIIkV9Y8shhUvyq_u&sz=w200" 
          alt="Logo ACV" 
          className="w-20 h-20 mb-3 drop-shadow-xl"
        />
        <h1 className="text-[9px] font-black uppercase tracking-[0.3em] text-center opacity-80">
          Amicale Canine<br/>Vernoise
        </h1>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
        <NavItem id="dashboard" icon={<LayoutDashboard size={18}/>} label="Tableau de bord" active={activeTab} onClick={setActiveTab} />
        <NavItem id="organigramme" icon={<Network size={18}/>} label="L'Organigramme" active={activeTab} onClick={setActiveTab} />
        <NavItem id="membres" icon={<Users size={18}/>} label="Membres" active={activeTab} onClick={setActiveTab} />
        <NavItem id="leschiens" icon={<Dog size={18}/>} label="Chiens" active={activeTab} onClick={setActiveTab} />
        <NavItem id="cotisations" icon={<CreditCard size={18}/>} label="Cotisations" active={activeTab} onClick={setActiveTab} />
        <NavItem id="boutique" icon={<ShoppingCart size={18}/>} label="Croquettes" active={activeTab} onClick={setActiveTab} />
        <NavItem id="finances" icon={<Landmark size={18}/>} label="Finances" active={activeTab} onClick={setActiveTab} />
        <NavItem id="presences" icon={<ClipboardCheck size={18}/>} label="Présences" active={activeTab} onClick={setActiveTab} />
        <NavItem id="planning" icon={<Calendar size={18}/>} label="Planning" active={activeTab} onClick={setActiveTab} />
        <NavItem id="secretariat" icon={<FileText size={18}/>} label="Secrétariat" active={activeTab} onClick={setActiveTab} />

        {/* ACTIVITÉS / SECTIONS */}
        <div className="pt-6 pb-2 text-[8px] font-black uppercase tracking-[0.2em] opacity-40 px-5">Activités</div>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`w-full flex items-center px-5 py-2 text-[9px] font-bold uppercase tracking-widest transition-all rounded-xl mb-1 ${
              activeTab === s.id ? 'bg-emerald-500/20 text-white' : 'text-emerald-100/50 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full border mr-4 ${activeTab === s.id ? 'bg-emerald-400 border-emerald-400' : 'border-emerald-500'}`}></div>
            {s.label}
          </button>
        ))}

        {/* SYSTÈME */}
        <div className="pt-6 pb-2 text-[8px] font-black uppercase tracking-[0.2em] opacity-40 px-5">Système</div>
        <NavItem id="logs" icon={<History size={16}/>} label="Logs" active={activeTab} onClick={setActiveTab} />
        <NavItem id="parametres" icon={<Settings size={16}/>} label="Paramètres" active={activeTab} onClick={setActiveTab} />
      </nav>

      <button 
        onClick={toggleDarkMode}
        className={`mt-4 mx-auto w-12 h-12 flex items-center justify-center rounded-full border transition-all shadow-lg
          ${darkMode 
            ? 'bg-[#FDFBF7] border-white text-[#1B4332]' 
            : 'bg-[#0A110D] border-[#2D6A4F] text-emerald-400'}`}
      >
        {darkMode ? <Sun size={24} fill="currentColor" /> : <Moon size={24} fill="currentColor" />}
      </button>
    </aside>
  );
};

const NavItem = ({ id, icon, label, active, onClick }: any) => (
  <button
    onClick={() => onClick(id)}
    className={`w-full flex items-center space-x-4 px-5 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-all mb-1 ${
      active === id 
        ? 'bg-[#BC6C25] text-white shadow-lg' 
        : 'hover:bg-white/5 text-emerald-100/70 hover:text-white'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

export default Sidebar;
