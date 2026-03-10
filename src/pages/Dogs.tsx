import React, { useState } from 'react';
import { Search, X, Dog, User, Calendar, Hash } from 'lucide-react';

interface DogData {
  id: string;
  name: string;
  breed: string;
  ownerName: string;
  photoUrl: string;
  birthDate: string;
}

const dogs: DogData[] = [
  { 
    id: '1', 
    name: 'Rio', 
    breed: 'Berger Australien', 
    ownerName: 'Julien', 
    photoUrl: 'https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?auto=format&fit=crop&q=80',
    birthDate: '12/04/2022'
  }
];

export default function Dogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDog, setSelectedDog] = useState<DogData | null>(null);

  const filteredDogs = dogs.filter(dog =>
    dog.name.toLowerCase().includes(searchTerm.toLowerCase()) || dog.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">La Meute</h1>
        <p className="text-gray-400 mt-2">Les quatre pattes du club</p>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Rechercher un chien..."
          className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDogs.map((dog) => (
          <div
            key={dog.id}
            onClick={() => setSelectedDog(dog)}
            className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 flex items-center space-x-4 cursor-pointer hover:border-blue-500 transition-all group"
          >
            <img src={dog.photoUrl} alt={dog.name} className="h-16 w-16 rounded-full object-cover border-2 border-gray-700 group-hover:border-blue-500 transition-colors" />
            <div>
              <h3 className="text-lg font-bold text-white">{dog.name} <span className="text-gray-500 text-xs">({dog.breed})</span></h3>
              <p className="text-gray-400 text-xs">{dog.ownerName}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedDog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative">
            <button onClick={() => setSelectedDog(null)} className="absolute top-4 right-4 p-2 bg-gray-900 rounded-full text-white z-10"><X className="h-6 w-6" /></button>
            <img src={selectedDog.photoUrl} className="w-full h-64 object-cover" alt={selectedDog.name} />
            <div className="p-8">
              <h2 className="text-3xl font-black text-white">{selectedDog.name}</h2>
              <p className="text-blue-400 text-lg">{selectedDog.breed}</p>
              <div className="mt-6 space-y-4">
                <div className="flex items-center space-x-3 text-gray-300"><User className="h-5 w-5" /> <span>Maître : {selectedDog.ownerName}</span></div>
                <div className="flex items-center space-x-3 text-gray-300"><Calendar className="h-5 w-5" /> <span>Né le : {selectedDog.birthDate}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
