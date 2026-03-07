import { create } from 'zustand';

// On définit les types directement ici pour éviter de chercher des fichiers externes
export interface Transaction {
  id: string;
  date: string;
  label: string;
  category: 'ACMA' | 'Bricolage & Entretien' | 'Électricité' | 'Eau' | 'Assurances' | 'Achats Boutique' | 'Matériel Sportif' | 'Adhésion' | 'Événementiel' | 'Autre' | 'Boutique';
  type: 'Crédit' | 'Débit';
  amount: number;
  receipt?: string;
}

interface ClubState {
  members: any[];
  dogs: any[];
  products: any[];
  transactions: Transaction[];
  addMember: (member: any) => void;
  addDog: (dog: any) => void;
  addTransaction: (t: Transaction) => void;
}

export const useStore = create<ClubState>((set) => ({
  members: [
    { id: 'm1', name: 'Dupont', firstName: 'Jean', email: 'jean@mail.com', phone: '0601020304', membershipType: 'Adulte', status: 'Actif' }
  ],
  dogs: [
    { id: 'd1', name: 'Olympe', breed: 'Malinois', memberId: 'm1', section: 'Ring', level: 'Niveau 3' }
  ],
  products: [],
  transactions: [
    { id: 't1', date: '2026-03-01', label: 'Adhésion Test', category: 'Adhésion', type: 'Crédit', amount: 60 }
  ],
  addMember: (member) => set((state) => ({ members: [...state.members, member] })),
  addDog: (dog) => set((state) => ({ dogs: [...state.dogs, dog] })),
  addTransaction: (t) => set((state) => ({ transactions: [t, ...state.transactions] })),
}));
