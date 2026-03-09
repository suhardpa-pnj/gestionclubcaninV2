import { create } from 'zustand';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy, writeBatch, doc, updateDoc, deleteDoc } from 'firebase/firestore';

interface ClubState {
  members: any[];
  dogs: any[];
  transactions: any[];
  products: any[];
  isLoading: boolean;
  darkMode: boolean;
  activeOrder: { status: 'none' | 'pending', date: string };
  toggleDarkMode: () => void;
  fetchData: () => Promise<void>;
  addMember: (m: any) => Promise<void>;
  addTransaction: (t: any) => Promise<void>;
  updateDogPhoto: (dogId: string, photoUrl: string) => Promise<void>;
  seedBoutique: () => Promise<void>;
  sellProduct: (pId: string, qty: number, price: number) => Promise<void>;
}

export const useStore = create<ClubState>((set, get) => ({
  members: [],
  dogs: [],
  transactions: [],
  products: [],
  isLoading: true,
  darkMode: false,
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
    } catch (e) {
      console.error("Erreur de chargement:", e);
      set({ isLoading: false });
    }
  },

  addMember: async (m) => {
    await addDoc(collection(db, "members"), m);
    get().fetchData();
  },

  addTransaction: async (t) => {
    await addDoc(collection(db, "transactions"), t);
    get().fetchData();
  },

  updateDogPhoto: async (dogId, photoUrl) => {
    const dRef = doc(db, "dogs", dogId);
    await updateDoc(dRef, { photo: photoUrl });
    get().fetchData();
  },

  seedBoutique: async () => {
    try {
      const batch = writeBatch(db);
      
      // 1. Suppression des anciens produits pour éviter les doublons
      const pSnap = await getDocs(collection(db, "products"));
      pSnap.forEach(p => batch.delete(p.ref));
      await batch.commit();

      // 2. Création des 6 références propres avec IDs fixes
      const newBatch = writeBatch(db);
      const refs = [
        { id: "gold-28-16", name: "Gold 28/16", price: 58, cost: 51.36, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-GOLD-28-16.png", url: "https://www.france-croquettes.fr/boutique/chien/nature-gold-28-16-20kg/" },
        { id: "equilibre-25-10", name: "Équilibre 25/10", price: 44, cost: 41.28, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-EQUILIBRE-25-10.png", url: "https://www.france-croquettes.fr/boutique/chien/nature-equilibre-25-10-20kg/" },
        { id: "super-light-26-8", name: "Super Light 26/8", price: 60, cost: 52.80, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-SUPER-LIGHT-26-8.png", url: "https://www.france-croquettes.fr/boutique/chien/nature-super-light-26-8-20kg/" },
        { id: "maxi-chiots", name: "Maxi Chiots", price: 65, cost: 53.52, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-MAXI-CHIOTS.png", url: "https://www.france-croquettes.fr/boutique/chien/nature-maxi-chiots-20kg/" },
        { id: "mini-chiot", name: "Mini Chiot", price: 65, cost: 53.52, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-MINI-CHIOTS.png", url: "https://www.france-croquettes.fr/boutique/chien/nature-mini-chiots-20kg/" },
        { id: "gold-competition-32-22", name: "Gold Compétition 32/22", price: 68, cost: 56.16, img: "https://www.france-croquettes.fr/wp-content/uploads/2018/11/NATURE-GOLD-COMPETITION-32-22.png", url: "https://www.france-croquettes.fr/boutique/chien/nature-gold-competition-32-22-20kg/" }
      ];

      refs.forEach(p => {
        const pRef = doc(db, "products", p.id);
        newBatch.set(pRef, { ...p, stock: 10, weight: "20kg" });
      });

      await newBatch.commit();
      alert("✅ Boutique réinitialisée sans doublons !");
      get().fetchData();
    } catch (e) {
      alert("Erreur lors de l'initialisation de la boutique");
    }
  },

  sellProduct: async (pId, qty, price) => {
    const pRef = doc(db, "products", pId);
    const product = get().products.find(p => p.id === pId);
    if (!product) return;
    await updateDoc(pRef, { stock: (product.stock || 0) - qty });
    await addDoc(collection(db, "transactions"), {
      date: new Date().toISOString().split('T')[0],
      label: `Vente ${product.name}`,
      amount: price,
      type: 'Crédit',
      category: 'Boutique'
    });
    set({ activeOrder: { status: 'pending', date: 'Samedi 14 Mars' } });
    get().fetchData();
  }
}));
