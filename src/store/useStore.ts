import { create } from 'zustand';

export interface Transaction {
  id: string;
  date: string;
  label: string;
  category: 'Adhésion' | 'Boutique' | 'Matériel' | 'Frais Fixes' | 'ACMA';
  type: 'Crédit' | 'Débit';
  amount: number;
}

interface ClubState {
  members: any[];
  dogs: any[];
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
}

export const useStore = create<ClubState>((set) => ({
  members: [], 
  dogs: [],
  transactions: [
    { id: '1', date: '2026-03-01', label: 'Adhésion Jean Dupont', category: 'Adhésion', type: 'Crédit', amount: 60 },
    { id: '2', date: '2026-03-02', label: 'Achat Sacs Croquettes', category: 'Boutique', type: 'Débit', amount: 450 },
    { id: '3', date: '2026-03-05', label: 'Reversement ACMA Février', category: 'ACMA', type: 'Débit', amount: 120 },
  ],
  addTransaction: (t) => set((state) => ({ transactions: [t, ...state.transactions] })),
}));
