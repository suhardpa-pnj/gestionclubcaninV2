import { create } from 'zustand';
import { db, storage } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy, writeBatch, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ClubState {
  members: any[]; dogs: any[]; transactions: any[]; products: any[];
  isLoading: boolean; darkMode: boolean;
  activeOrder: { status: 'none' | 'pending', date: string };
  toggleDarkMode: () => void;
  fetchData: () => Promise<void>;
  updateMember: (id: string, data: any) => Promise<void>;
  uploadMemberPhoto: (id: string, file: File) => Promise<void>;
  uploadDogPhoto: (dogId: string, file: File) => Promise<void>;
  seedBoutique: () => Promise<void>;
  sellProduct: (pId: string, qty: number, price: number) => Promise<void>;
}

export const useStore = create<ClubState>((set, get) => ({
  members: [], dogs: [], transactions: [], products: [],
  isLoading: true, darkMode: false,
  activeOrder: { status: 'none', date: 'Pas de commande en cours' },

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  fetchData: async () => {
    try {
      const [mS, dS, tS, pS] = await Promise.all([
        getDocs(collection(db, "members")),
        getDocs(collection(db, "dogs")),
        getDocs(query(collection(db, "transactions"), orderBy("date", "desc"))),
        getDocs(collection(db, "products"))
      ]);
      set({ 
        members: mS.docs.map(d => ({ id: d.id, ...d.data() })),
        dogs: dS.docs.map(d => ({ id: d.id, ...d.data() })),
        transactions: tS.docs.map(d => ({ id: d.id, ...d.data() })),
        products: pS.docs.map(d => ({ id: d.id, ...d.data() })),
        isLoading: false 
      });
    } catch (e) { set({ isLoading: false }); }
  },

  updateMember: async (id, data) => {
    await updateDoc(doc(db, "members", id), data);
    get().fetchData();
  },

  uploadMemberPhoto: async (id, file) => {
    const storageRef = ref(storage, `members/${id}_${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    await updateDoc(doc(db, "members", id), { photo: url });
    get().fetchData();
  },

  uploadDogPhoto: async (dogId, file) => {
    const storageRef = ref(storage, `dogs/${dogId}_${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    await updateDoc(doc(db, "dogs", dogId), { photo: url });
    get().fetchData();
  },

  seedBoutique: async () => {
    const batch = writeBatch(db);
    const pSnap = await getDocs(collection(db, "products"));
    pSnap.forEach(p => batch.delete(p.ref));
    await batch.commit();

    const newBatch = writeBatch(db);
    const refs = [
      { id: "gold-28-16", name: "Gold 28/16", price: 58, cost: 51.36, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-GOLD-28-16.png" },
      { id: "equilibre-25-10", name: "Équilibre 25/10", price: 44, cost: 41.28, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-EQUILIBRE-25-10.png" },
      { id: "super-light-26-8", name: "Super Light 26/8", price: 60, cost: 52.80, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-SUPER-LIGHT-26-8.png" },
      { id: "maxi-chiots", name: "Maxi Chiots", price: 65, cost: 53.52, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-MAXI-CHIOTS.png" },
      { id: "mini-chiot", name: "Mini Chiot", price: 65, cost: 53.52, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-MINI-CHIOTS.png" },
      { id: "gold-competition", name: "Gold Compétition 32/22", price: 68, cost: 56.16, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-GOLD-COMPETITION-32-22.png" }
    ];
    refs.forEach(p => newBatch.set(doc(db, "products", p.id), { ...p, stock: 10, category: "Croquettes" }));
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
    set({ activeOrder: { status: 'pending', date: 'Samedi Prochain' } });
    get().fetchData();
  }
}));
