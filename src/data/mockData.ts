import { Member, Dog, Product } from '../types';

// La liste de tes membres
export const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'DUBOIS',
    firstName: 'Jean',
    email: 'j.dubois@email.com',
    phone: '06.12.34.56.78',
    address: '12 Rue des Lilas',
    city: 'Angers',
    zipCode: '49000',
    joinDate: '2023-09-15',
    status: 'Actif',
    membershipType: 'Adulte',
    lastPayment: '2025-01-10',
    notes: 'Bénévole actif pour les concours.'
  }
];

// La liste des chiens rattachés aux membres
export const INITIAL_DOGS: Dog[] = [
  {
    id: 'd1',
    memberId: 'm1', // Ce chien appartient à Jean Dubois (id: m1)
    name: 'Olympe',
    breed: 'Berger Belge Malinois',
    birthDate: '2021-05-20',
    sex: 'F',
    section: 'Agility',
    level: 'Niveau 2',
    microchip: '250268712345678',
    vaccines: [
      { name: 'CHPPIL', dateDone: '2024-05-20', dateRecall: '2025-05-20', isMandatory: true },
      { name: 'Rage', dateDone: '2024-05-20', dateRecall: '2025-05-20', isMandatory: true }
    ],
    medicalNotes: 'Sensibilité digestive.'
  }
];

// La liste des produits de la boutique
export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Laisse 2 mètres',
    brand: 'Club Pro',
    category: 'Matériel',
    price: 25.00,
    purchasePrice: 15.00,
    stock: 10,
    minStock: 3,
    image: 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=300'
  }
];
