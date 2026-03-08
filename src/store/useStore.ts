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
  isLoading: boolean;
  darkMode: boolean;
  toggleDarkMode: () => void;
  fetchData: () => Promise<void>;
  importFullUpdate: (data: { members: any[], transactions: any[] }) => Promise<void>;
}

export const useStore = create<ClubState>((set) => ({
  members: [],
  dogs: [],
  transactions: [],
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

  importFullUpdate: async (data) => {
    const batch = writeBatch(db);
    // Mise à jour des membres (avec docs et activités)
    data.members.forEach((m) => {
      const mRef = doc(db, "members", m.id);
      batch.set(mRef, { ...m, status: 'Actif' }, { merge: true });
    });
    // Ajout des transactions financières trouvées
    data.transactions.forEach((t) => {
      const tRef = doc(collection(db, "transactions"));
      batch.set(tRef, t);
    });
    await batch.commit();
    alert("✅ Base de données enrichie (Finances + Docs) !");
    window.location.reload();
  }
}));
