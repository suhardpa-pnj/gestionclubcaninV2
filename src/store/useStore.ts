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
  addMember: (m: any) => Promise<void>;
  updateMember: (id: string, data: any) => Promise<void>;
  addTransaction: (t: any) => Promise<void>;
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

  uploadMemberPhoto: async (id, file) => {
    const storageRef = ref(storage, `members/${id}_${Date.now()}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    await updateDoc(doc(db, "members", id), { photo: url });
    get().fetchData();
  },

  uploadDogPhoto: async (dogId, file) => {
    try {
      const storageRef = ref(storage, `dogs/${dogId}_${Date.now()}`);
      // Correction ici : on utilise storageRef pour l'envoi
      const snapshot = await uploadBytes(storageRef,
