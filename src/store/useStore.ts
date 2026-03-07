import { create } from 'zustand';

export interface Transaction {
  id: string;
  date: string;
  label: string;
  // Liste exhaustive des postes de dépenses/recettes
  category: 
    | 'ACMA' 
    | 'Bricolage & Entretien' 
    | 'Électricité' 
    | 'Eau' 
    | 'Assurances' 
    | 'Achats Boutique' 
    | 'Matériel Sportif' 
    | 'Adhésion' 
    | 'Événementiel'
    | 'Autre';
  type: 'Crédit' | 'Débit';
  amount: number;
  receipt?: string;
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
    { id: '2', date: '2026-03-02', label: 'Achat Sacs Croquettes', category: 'Boutique', type: 'Débit', amount: 450, receipt: 'facture_croquettes_02.pdf' },
  ],
  addTransaction: (t) => set((state) => ({ transactions: [t, ...state.transactions] })),
}));
