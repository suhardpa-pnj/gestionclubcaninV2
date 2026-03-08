import { create } from 'zustand';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy, writeBatch, doc, updateDoc } from 'firebase/firestore';

interface ClubState {
  members: any[]; dogs: any[]; transactions: any[]; products: any[];
  isLoading: boolean; darkMode: boolean;
  toggleDarkMode: () => void;
  fetchData: () => Promise<void>;
  addMember: (m: any) => Promise<void>;
  addDog: (d: any) => Promise<void>;
  updateDocStatus: (mId: string, docType: string, status: string) => Promise<void>;
  sellProduct: (pId: string, qty: number, price: number) => Promise<void>;
}

export const useStore = create<ClubState>((set, get) => ({
  members: [], dogs: [], transactions: [], products: [],
  isLoading: true, darkMode: false,

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  fetchData: async () => {
    const mSnap = await getDocs(collection(db, "members"));
    const dSnap = await getDocs(collection(db, "dogs"));
    const tSnap = await getDocs(query(collection(db, "transactions"), orderBy("date", "desc")));
    const pSnap = await getDocs(collection(db, "products"));
    set({
      members: mSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      dogs: dSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      transactions: tSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      products: pSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      isLoading: false
    });
  },

  addMember: async (m) => {
    const res = await addDoc(collection(db, "members"), m);
    set({ members: [...get().members, { ...m, id: res.id }] });
  },

  addDog: async (d) => {
    await addDoc(collection(db, "dogs"), d);
    get().fetchData();
  },

  updateDocStatus: async (mId, docType, status) => {
    const mRef = doc(db, "members", mId);
    await updateDoc(mRef, { [docType]: status });
    get().fetchData();
  },

  sellProduct: async (pId, qty, price) => {
    const pRef = doc(db, "products", pId);
    const product = get().products.find(p => p.id === pId);
    await updateDoc(pRef, { stock: product.stock - qty });
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
