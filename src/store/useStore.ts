import { create } from 'zustand';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy, writeBatch, doc, updateDoc } from 'firebase/firestore';

interface ClubState {
  members: any[]; dogs: any[]; transactions: any[]; products: any[];
  isLoading: boolean; darkMode: boolean;
  activeOrder: { status: 'none' | 'pending', date: string }; // Pour le Dashboard
  toggleDarkMode: () => void;
  fetchData: () => Promise<void>;
  seedBoutique: () => Promise<void>;
  updateDogSections: (dogId: string, sections: string[]) => Promise<void>;
  sellProduct: (pId: string, qty: number, price: number) => Promise<void>;
}

export const useStore = create<ClubState>((set, get) => ({
  members: [], dogs: [], transactions: [], products: [],
  isLoading: true, darkMode: false,
  activeOrder: { status: 'none', date: 'Samedi 14 Mars' }, // Changera selon tes commandes

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

  fetchData: async () => {
    try {
      const [mS, dS, tS, pS] = await Promise.all([
        getDocs(collection(db, "members")),
        getDocs(collection(db, "dogs")),
        getDocs(query(collection(db, "transactions"), orderBy("date", "desc"))),
        getDocs(collection(db, "products"))
      ]);

      const membersData = mS.docs.map(d => ({ id: d.id, ...d.data() }));
      const dogsData = dS.docs.map(d => {
        const data = d.data();
        // Attribution de la photo de RIO spécifiquement
        if (data.name?.toUpperCase() === 'RIO') {
          return { id: d.id, ...data, photo: "https://drive.google.com/thumbnail?id=1Ol8bi8QMx-pVnKrYlXf-HeLXqBuLZY-6&sz=w400" };
        }
        return { id: d.id, ...data };
      });

      set({ 
        members: membersData, 
        dogs: dogsData, 
        transactions: tS.docs.map(d => ({ id: d.id, ...d.data() })),
        products: pS.docs.map(d => ({ id: d.id, ...d.data() })),
        isLoading: false 
      });
    } catch (e) { set({ isLoading: false }); }
  },

  seedBoutique: async () => {
    const batch = writeBatch(db);
    const refs = [
      { name: "Gold 28/16", price: 58, cost: 51.36, url: "https://www.france-croquettes.fr/boutique/chien/nature-gold-28-16-20kg/" },
      { name: "Équilibre 25/10", price: 44, cost: 41.28, url: "https://www.france-croquettes.fr/boutique/chien/nature-equilibre-25-10-20kg/" },
      { name: "Super Light 26/8", price: 60, cost: 52.80, url: "https://www.france-croquettes.fr/boutique/chien/nature-super-light-26-8-20kg/" },
      { name: "Maxi Chiots", price: 65, cost: 53.52, url: "https://www.france-croquettes.fr/boutique/chien/nature-maxi-chiots-20kg/" },
      { name: "Mini Chiot", price: 65, cost: 53.52, url: "https://www.france-croquettes.fr/boutique/chien/nature-mini-chiots-20kg/" },
      { name: "Gold Compétition 32/22", price: 68, cost: 56.16, url: "https://www.france-croquettes.fr/boutique/chien/nature-gold-competition-32-22-20kg/" }
    ];
    refs.forEach(p => {
      const pRef = doc(collection(db, "products"));
      batch.set(pRef, { ...p, stock: 10, category: "Croquettes", weight: "20kg" });
    });
    await batch.commit();
    get().fetchData();
  },

  updateDogSections: async (dogId, sections) => {
    const dRef = doc(db, "dogs", dogId);
    await updateDoc(dRef, { sections });
    get().fetchData();
  },

  sellProduct: async (pId, qty, price) => {
    const pRef = doc(db, "products", pId);
    const product = get().products.find(p => p.id === pId);
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
