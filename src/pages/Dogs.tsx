import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';
import { Search, X, Dog as DogIcon, User, Calendar, Hash } from 'lucide-react';

interface DogData {
  id: string;
  name: string;
  breed: string;
  ownerName: string;
  photoUrl: string;
  birthDate: string;
}

export default function Dogs() {
  const [dogs, setDogs] = useState<DogData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDog, setSelectedDog] = useState<DogData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'dogs'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as DogData[];
      setDogs(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredDogs = dogs.filter(dog =>
    dog.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dog.breed?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-white">Récupération de la meute...</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">La Meute</h1>
        <p className="text-gray-400 mt-2 italic">L'âme du club ({dogs.length} chiens)</p>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Rechercher un chien ou une race..."
          className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:border-blue-500 transition-all outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredDogs.map((dog) => (
          <div
            key={dog.id}
            onClick={() => setSelectedDog(dog)}
            className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 flex items-center space-x-4 cursor-pointer hover:border-blue-500 transition-all group shadow-lg"
          >
            <img src={dog.photoUrl || 'https://via.placeholder.com/150'} className="h-16 w-16 rounded-full object-cover border-2 border-gray-700 group-hover:border-blue-500 transition-colors" alt="" />
            <div className="overflow-hidden">
              <h3 className="text-lg font-bold text-white truncate">{dog.name}</h3>
              <p className="text-blue-400 text-xs truncate">({dog.breed})</p>
              <p className="text-gray-500 text-[10px] mt-1">Maître : {dog.ownerName}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedDog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative">
            <button onClick={() => setSelectedDog(null)} className="absolute top-4 right-4 p-2 bg-gray-900 rounded-full text-white z-10"><X className="h-6 w-6" /></button>
            <img src={selectedDog.photoUrl || 'https://via.placeholder.com/400'} className="w-full h-64 object-cover" alt="" />
            <div className="p-8">
              <h2 className="text-3xl font-black text-white">{selectedDog.name}</h2>
              <p className="text-blue-400 text-lg font-medium">{selectedDog.breed}</p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-4 text-gray-300">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-600">Maître</p>
                    <p className="font-semibold text-white">{selectedDog.ownerName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-600">Naissance</p>
                    <p className="font-semibold text-white">{selectedDog.birthDate || 'Inconnue'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
