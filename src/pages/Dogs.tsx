import React, { useState } from 'react';
import { Search, X, Dog, User, Calendar, Hash, Activity } from 'lucide-react';

// Interface pour la structure des données d'un chien
interface DogData {
  id: string;
  name: string;
  breed: string;
  ownerName: string;
  photoUrl: string;
  birthDate?: string;
  sex?: string;
  chipNumber?: string;
  category?: string;
}

export default function Dogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDog, setSelectedDog] = useState<DogData | null>(null);

  // Données de test (à lier à Firebase plus tard)
  const dogs: DogData[] = [
    { 
      id: '1', 
      name: 'Rio', 
      breed: 'Berger Australien', 
      ownerName: 'Julien', 
      photoUrl: 'https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?auto=format&fit=crop&q=80',
      birthDate: '12/04/2022',
      sex: 'Mâle',
      chipNumber: '250268741234567',
      category: 'Travail'
    },
    { 
      id: '2', 
      name: 'Alvin', 
      breed: 'Golden Retriever', 
      ownerName: 'Marie', 
      photoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80',
      birthDate: '05/09/2021',
      sex: 'Mâle',
      chipNumber: '250268741299999',
      category: 'Éducation'
    }
  ];

  const filteredDogs = dogs.filter(dog =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      {/* Header avec Titre de Page */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-white">La Meute</h1>
        <p className="text-gray-400 mt-2">Gestion des chiens du club</p>
      </div>

      {/* Barre de Recherche (Sans bouton +) */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Rechercher un chien, une race ou un maître..."
          className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors shadow-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grille des Étiquettes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDogs.map((dog) => (
          <div
            key={dog.id}
            onClick={() => setSelectedDog(dog)}
            className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center space-x-4 cursor-pointer hover:border-blue-500 transition-all hover:bg-gray-800 group shadow-lg"
          >
            <img
              src={dog.photoUrl}
              alt={dog.name}
              className="h-16 w-16 rounded-full object-cover border-2 border-gray-700 group-hover:border-blue-500 transition-colors"
            />
            <div className="overflow-hidden">
              <h3 className="text-lg font-bold text-white truncate">{dog.name}</h3>
              <p className="text-blue-400 font-medium text-sm truncate">
                {dog.breed} <span className="text-gray-500 text-xs">({dog.breed})</span>
              </p>
              <p className="text-gray-400 text-xs mt-1 truncate">{dog.ownerName}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MODALE : FICHE DÉTAILLÉE (Format Vertical Mobile-First) */}
      {selectedDog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            {/* Bouton Fermer */}
            <button 
              onClick={() => setSelectedDog(null)}
              className="absolute top-4 right-4 p-2 bg-gray-900 rounded-full text-gray-400 hover:text-white z-10"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Photo de couverture */}
            <div className="h-64 relative">
              <img 
                src={selectedDog.photoUrl} 
                alt={selectedDog.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-gray-950 to-transparent" />
            </div>

            {/* Contenu de la fiche (Vertical) */}
            <div className="px-6 pb-8 -mt-6 relative">
              <h2 className="text-3xl font-black text-white">{selectedDog.name}</h2>
              <p className="text-blue-400 text-lg font-medium">{selectedDog.breed}</p>

              <div className="mt-8 space-y-6">
                {/* Informations par lignes */}
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-900 rounded-2xl"><User className="h-5 w-5 text-gray-400" /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Maître</p>
                    <p className="text-white font-semibold">{selectedDog.ownerName}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-900 rounded-2xl"><Calendar className="h-5 w-5 text-gray-400" /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Date de naissance</p>
                    <p className="text-white font-semibold">{selectedDog.birthDate || 'Non renseigné'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-900 rounded-2xl"><Hash className="h-5 w-5 text-gray-400" /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Numéro d'identification</p>
                    <p className="text-white font-mono text-sm">{selectedDog.chipNumber || 'Inconnu'}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gray-900 rounded-2xl"><Activity className="h-5 w-5 text-gray-400" /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">Discipline</p>
                    <span className="inline-block mt-1 px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold rounded-full border border-blue-600/30">
                      {selectedDog.category || 'Standard'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bouton d'action en bas de fiche */}
              <button className="w-full mt-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-colors">
                Modifier la fiche
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
