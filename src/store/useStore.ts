import { create } from 'zustand';
import { db, storage } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy, writeBatch, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ClubState {
  members: any[]; dogs: any[]; transactions: any[]; products: any[]; attendances: any[];
  isLoading: boolean; darkMode: boolean;
  toggleDarkMode: () => void;
  fetchData: () => Promise<void>;
  addMember: (m: any) => Promise<void>;
  updateMember: (id: string, data: any) => Promise<void>;
  addTransaction: (t: any) => Promise<void>;
  addAttendance: (a: any) => Promise<void>;
  addFeedback: (f: any) => Promise<void>; // Nouvelle méthode
  uploadMemberPhoto: (id: string, file: File) => Promise<void>;
  uploadDogPhoto: (dogId: string, file: File) => Promise<void>;
  uploadProductPhoto: (productId: string, file: File) => Promise<void>;
  seedBoutique: () => Promise<void>;
  sellProduct: (pId: string, qty: number, price: number) => Promise<void>;
}

export const useStore = create<ClubState>((set, get) => ({
  members: [], dogs: [], transactions: [], products: [], attendances: [],
  isLoading: true, darkMode: false,

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
