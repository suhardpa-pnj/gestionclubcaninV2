import { create } from 'zustand';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy, writeBatch, doc, updateDoc } from 'firebase/firestore';

interface ClubState {
  members: any[]; dogs: any[]; transactions: any[]; products: any[];
  isLoading: boolean; darkMode: boolean;
  activeOrder: { status: 'none' | 'pending', date: string };
  toggleDarkMode: () => void;
  fetchData: () => Promise<void>;
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

      const membersData = mS.docs.map(d => ({ id: d.id, ...d.data() }));
      
      // LOGIQUE IDENTIFIANT UNIQUE CHIENS
      let provIdCounter = 1;
      const dogsData = dS.docs.map(d => {
        const data = d.data();
        // On utilise la puce, sinon un ID provisoire
        const dogId = data.chip && data.chip !== "" ? data.chip : `ACV-D-2026-${(provIdCounter++).toString().padStart(3, '0')}`;
        
        // Attribution de la photo de RIO via son identifiant unique
        // (Remplace 'NUMERO_PUCE_RIO' par son vrai numéro une fois saisi)
        if (data.name?.toUpperCase() === 'RIO' && data.ownerName?.includes('DESHAYES')) {
          return { ...data, id: dogId, photo: "https://drive.google.com/thumbnail?id=1Ol8bi8QMx-pVnKrYlXf-HeLXqBuLZY-6&sz=w400" };
        }
        return { ...data, id: dogId };
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

  // ... (Garder seedBoutique et sellProduct identiques au bloc précédent)
  seedBoutique: get().seedBoutique,
  sellProduct: get().sellProduct
}));
