import { create } from 'zustand';
import { Member, Dog, Product } from '../types';
import { INITIAL_MEMBERS, INITIAL_DOGS, INITIAL_PRODUCTS } from '../data/mockData';

// On définit ce que notre "Cerveau" doit savoir faire
interface AppState {
  members: Member[];
  dogs: Dog[];
  products: Product[];
  
  // ACTIONS : Les fonctions pour modifier les données
  addMember: (member: Member) => void;
  updateMember: (member: Member) => void;
  deleteMember: (id: string) => void;
  
  addDog: (dog: Dog) => void;
  updateDog: (dog: Dog) => void;
  deleteDog: (id: string) => void;
  
  updateStock: (productId: string, quantity: number) => void;
}

// Création du Store (Cerveau)
export const useStore = create<AppState>((set) => ({
  // Données de départ
  members: INITIAL_MEMBERS,
  dogs: INITIAL_DOGS,
  products: INITIAL_PRODUCTS,

  // Fonctions pour gérer les membres
  addMember: (member) => 
    set((state) => ({ members: [...state.members, member] })),
    
  updateMember: (updatedMember) => 
    set((state) => ({
      members: state.members.map((m) => m.id === updatedMember.id ? updatedMember : m)
    })),
    
  deleteMember: (id) => 
    set((state) => ({
      members: state.members.filter((m) => m.id !== id),
      // On supprime aussi les chiens du membre par sécurité
      dogs: state.dogs.filter((d) => d.memberId !== id)
    })),

  // Fonctions pour gérer les chiens
  addDog: (dog) => 
    set((state) => ({ dogs: [...state.dogs, dog] })),
    
  updateDog: (updatedDog) => 
    set((state) => ({
      dogs: state.dogs.map((d) => d.id === updatedDog.id ? updatedDog : d)
    })),
    
  deleteDog: (id) => 
    set((state) => ({ dogs: state.dogs.filter((d) => d.id !== id) })),

  // Fonction pour la boutique
  updateStock: (productId, quantity) => 
    set((state) => ({
      products: state.products.map((p) => 
        p.id === productId ? { ...p, stock: p.stock + quantity } : p
      )
    })),
}));
