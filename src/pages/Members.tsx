import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Vérifie bien que le chemin vers ton fichier firebase est bon
import { collection, onSnapshot } from 'firebase/firestore';
import { Search, X, Mail, Phone, MapPin, Calendar, ExternalLink } from 'lucide-react';

interface Member {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  joinDate: string;
  status: 'A jour' | 'En retard';
  dogName: string;
  dogPhotoUrl: string;
}

export default function Members() {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  // CONNEXION TEMPS RÉEL FIREBASE
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'members'), (snapshot) => {
      const membersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Member[];
      setMembers(membersData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const filteredMembers = members.filter(m =>
    m.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.dogName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-8 text-white">Chargement de la base Adhérents...</div>;

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-white">Adhérents</h1>
        <p className="text-gray-400 mt-2">Gestion des {members.length} membres en temps réel</p>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Rechercher un prénom ou un chien..."
          className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all shadow-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 flex items-center space-x-6 cursor-pointer hover:border-blue-500 transition-all group"
          >
            <img
              src={member.photoUrl || 'https://via.placeholder.com/150'}
              alt={member.firstName}
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-700 group-hover:border-blue-500 transition-colors shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{member.firstName}</h3>
              <p className="text-blue-400 font-medium text-sm">Binôme : {member.dogName || 'N/C'}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Fiche détaillée (Modale) */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 p-2 bg-gray-900 rounded-full text-white z-20 hover:bg-white hover:text-black transition-all">
              <X className="h-6 w-6" />
            </button>

            <div className="h-64 relative bg-gray-900">
              <img src={selectedMember.photoUrl || 'https://via.placeholder.com/400'} className="w-full h-full object-cover opacity-80" alt="Membre" />
              <div className="absolute bottom-4 right-6">
                <p className="text-[10px] text-white font-bold uppercase text-right mb-1">Son Compagnon</p>
                <img src={selectedMember.dogPhotoUrl || 'https://via.placeholder.com/150'} className="h-24 w-24 rounded-2xl object-cover border-4 border-gray-950 shadow-2xl transform rotate-3" alt="Chien" />
              </div>
            </div>

            <div className="px-8 pb-10 -mt-10 relative">
              <h2 className="text-4xl font-black text-white">{selectedMember.firstName}</h2>
              <p className="text-gray-500 font-medium uppercase tracking-widest text-sm">{selectedMember.lastName}</p>

              <div className="mt-8 space-y-4">
                <a href={`tel:${selectedMember.phone}`} className="flex items-center space-x-4 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 group hover:bg-blue-500/20 transition-all">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="text-white font-bold text-lg">{selectedMember.phone || 'Non renseigné'}</span>
                </a>
                <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-2xl">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-white truncate">{selectedMember.email}</span>
                </div>
                <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-2xl">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-white text-sm">{selectedMember.address}, {selectedMember.zipCode} {selectedMember.city}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
