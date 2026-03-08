import { create } from 'zustand';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy, writeBatch, doc } from 'firebase/firestore';

export interface Transaction {
  id?: string;
  date: string;
  label: string;
  category: string;
  type: 'Crédit' | 'Débit';
  amount: number;
  receipt?: string; // Ajouté pour corriger l'erreur
}

interface ClubState {
  members: any[];
  dogs: any[];
  transactions: Transaction[];
  products: any[]; // Ajouté pour corriger l'erreur Boutique
  isLoading: boolean;
  fetchData: () => Promise<void>;
  addMember: (member: any) => Promise<void>;
  addTransaction: (t: Transaction) => Promise<void>;
  importBulkData: (allData: { members: any[], dogs: any[] }) => Promise<void>;
}

export const useStore = create<ClubState>((set) => ({
  members: [],
  dogs: [],
  transactions: [],
  products: [], // Initialisé vide
  isLoading: true,

  fetchData: async () => {
    try {
      const mSnap = await getDocs(collection(db, "members"));
      const dSnap = await getDocs(collection(db, "dogs"));
      const tSnap = await getDocs(query(collection(db, "transactions"), orderBy("date", "desc")));
      
      set({
        members: mSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        dogs: dSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })),
        transactions: tSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Transaction[],
        isLoading: false
      });
    } catch (e) {
      console.error("Erreur chargement:", e);
      set({ isLoading: false });
    }
  },

  addMember: async (member) => {
    const docRef = await addDoc(collection(db, "members"), member);
    set((state) => ({ members: [...state.members, { ...member, id: docRef.id }] }));
  },

  addTransaction: async (t) => {
    const docRef = await addDoc(collection(db, "transactions"), t);
    set((state) => ({ transactions: [{ ...t, id: docRef.id }, ...state.transactions] }));
  },

  importBulkData: async (allData) => {
    const batch = writeBatch(db);
    allData.members.forEach((m) => {
      const mRef = doc(db, "members", m.id);
      batch.set(mRef, { ...m, status: 'Actif', joinDate: new Date().toISOString().split('T')[0] });
    });
    allData.dogs.forEach((d) => {
      const dRef = doc(collection(db, "dogs"));
      batch.set(dRef, d);
    });
    await batch.commit();
    alert("✅ Importation réussie !");
    window.location.reload();
  }
}));
