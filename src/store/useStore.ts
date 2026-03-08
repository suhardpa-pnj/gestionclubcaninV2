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
  memberId?: string;
}

interface ClubState {
  members: any[];
  dogs: any[];
  transactions: Transaction[];
  products: any[];
  isLoading: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  fetchData: () => Promise<void>;
  addMember: (member: any) => Promise<void>; // Restauré
  addTransaction: (t: Transaction) => Promise<void>; // Restauré
  importFullUpdate: (data: { members: any[], transactions: any[] }) => Promise<void>;
}

export const useStore = create<ClubState>((set) => ({
  members: [],
  dogs: [],
  transactions: [],
  products: [],
  isLoading: true,
  darkMode: false,

  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

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
    } catch (e) { set({ isLoading: false }); }
  },

  addMember: async (member) => {
    const docRef = await addDoc(collection(db, "members"), member);
    set((state) => ({ members: [...state.members, { ...member, id: docRef.id }] }));
  },

  addTransaction: async (t) => {
    const docRef = await addDoc(collection(db, "transactions"), t);
    set((state) => ({ transactions: [{ ...t, id: docRef.id }, ...state.transactions] }));
  },

  importFullUpdate: async (data) => {
    const batch = writeBatch(db);
    data.members.forEach((m) => {
      const mRef = doc(db, "members", m.id);
      batch.set(mRef, {
        docVaccin: m.docVaccin || "non",
        docAssurance: m.docAssurance || "non",
        docProtocole: m.docProtocole || "non",
        docACMA: m.docACMA || "non"
      }, { merge: true });
    });
    data.transactions.forEach((t) => {
      const tRef = doc(collection(db, "transactions"));
      batch.set(tRef, t);
    });
    await batch.commit();
    alert("✅ Données synchronisées !");
    window.location.reload();
  }
}));
