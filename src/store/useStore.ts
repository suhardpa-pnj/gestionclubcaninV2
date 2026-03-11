import { create } from 'zustand';
import { db, storage } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy, writeBatch, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ClubState {
  members: any[]; dogs: any[]; transactions: any[]; products: any[]; attendances: any[];
  isLoading: boolean; darkMode: boolean;
  activeTab: string; // Réintégré
  setActiveTab: (tab: string) => void; // Réintégré
  toggleDarkMode: () => void;
  fetchData: () => Promise<void>;import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Dogs from './pages/Dogs';
import Boutique from './pages/Boutique';
import Secretariat from './pages/Secretariat';
import Organigramme from './pages/Organigramme';
import Cotisations from './pages/Cotisations'; // Pointera vers ton ancien Memberships renommé
import Treasury from './pages/Treasury';
import Presences from './pages/Presences';
import Planning from './pages/Planning';
import Login from './components/Login';
import { useStore } from './store/useStore';
import { Menu } from 'lucide-react';

const SectionPlaceholder = ({ title }: { title: string }) => (
  <div className="p-10 animate-in fade-in duration-700">
    <h2 className="text-5xl font-serif italic text-[#1B4332]">{title}</h2>
    <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
      Section en cours de construction • Amicale Canine Vernoise
    </p>
  </div>
);

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(localStorage.getItem('acv_role'));
  const { fetchData, isLoading, darkMode, dogs } = useStore();
  const [bgDog, setBgDog] = useState<string | null>(null);

  useEffect(() => { fetchData(); }, [fetchData]);

  useEffect(() => {
    const dogsWithPhotos = dogs.filter(d => d.photo && d.photo !== '');
    if (dogsWithPhotos.length > 0) {
      const dailyIdx = new Date().getDate() % dogsWithPhotos.length;
      setBgDog(dogsWithPhotos[dailyIdx].photo);
    }
  }, [dogs]);

  const handleLogin = (role: string) => {
    localStorage.setItem('acv_role', role);
    setUserRole(role);
  };

  if (!userRole) return <Login onLogin={handleLogin} />;
  
  return (
    <div className={`flex min-h-screen relative transition-colors duration-500 ${
      darkMode ? 'bg-[#121614] text-slate-200' : 'bg-[#F4F1EA] text-[#334155]'
    }`}>
      {!darkMode && bgDog && (
        <div className="fixed inset-0 pointer-events-none opacity-5 z-0">
          <img src={bgDog} className="w-full h-full object-cover grayscale" alt="" />
        </div>
      )}

      <button 
        onClick={() => setIsSidebarOpen(true)} 
        className="lg:hidden fixed top-5 left-5 z-40 p-3 bg-[#1B4332] text-white rounded-xl shadow-lg"
      >
        <Menu size={20} />
      </button>
      
      <Sidebar 
        activeTab={activeTab} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        setActiveTab={(t) => { setActiveTab(t); setIsSidebarOpen(false); }} 
      />

      <main className="flex-1 p-6 lg:p-12 lg:ml-72 relative z-10">
        <div className="max-w-6xl mx-auto pt-12 lg:pt-0">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'organigramme' && <Organigramme />}
          {activeTab === 'membres' && <Members />}
          {activeTab === 'leschiens' && <Dogs />}
          {activeTab === 'cotisations' && <Cotisations />}
          {activeTab === 'boutique' && <Boutique />}
          {activeTab === 'finances' && <Treasury />}
          {activeTab === 'presences' && <Presences />}
          {activeTab === 'planning' && <Planning />}
          {activeTab === 'secretariat' && <Secretariat />}

          {activeTab.startsWith('section-') && <SectionPlaceholder title="Activités Club" />}
          {activeTab === 'logs' && <SectionPlaceholder title="Historique" />}
          {activeTab === 'parametres' && <SectionPlaceholder title="Paramètres" />}
        </div>
      </main>
    </div>
  );
}

export default App;

  addMember: (m: any) => Promise<void>;
  updateMember: (id: string, data: any) => Promise<void>;
  addTransaction: (t: any) => Promise<void>;
  addAttendance: (a: any) => Promise<void>;
  addFeedback: (f: any) => Promise<void>;
  uploadFeedbackFile: (file: File) => Promise<string>;
  uploadMemberPhoto: (id: string, file: File) => Promise<void>;
  uploadDogPhoto: (dogId: string, file: File) => Promise<void>;
  uploadProductPhoto: (productId: string, file: File) => Promise<void>;
  seedBoutique: () => Promise<void>;
  sellProduct: (pId: string, qty: number, price: number) => Promise<void>;
}

export const useStore = create<ClubState>((set, get) => ({
  members: [], dogs: [], transactions: [], products: [], attendances: [],
  isLoading: true, darkMode: false,
  activeTab: 'dashboard', // État initial

  setActiveTab: (tab) => set({ activeTab: tab }),
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

  addFeedback: async (f) => {
    await addDoc(collection(db, "feedback"), {
      ...f,
      timestamp: new Date().toISOString(),
      status: 'new'
    });
  },

  uploadFeedbackFile: async (file) => {
    const fileId = Date.now();
    const storageRef = ref(storage, `feedback/${fileId}_${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
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
