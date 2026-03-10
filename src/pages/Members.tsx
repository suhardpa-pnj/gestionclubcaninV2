import React, { useState } from 'react';
import { Search, X, Mail, Phone, MapPin, CreditCard, Calendar, User as UserIcon, ExternalLink } from 'lucide-react';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Données de test (à synchroniser avec ta base plus tard)
  const members: Member[] = [
    {
      id: '1',
      firstName: 'Julien',
      lastName: 'Martin',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
      email: 'julien.m@email.com',
      phone: '06 12 34 56 78',
      address: '12 rue de la Paix',
      city: 'Angers',
      zipCode: '49000',
      joinDate: '2023-01-15',
      status: 'A jour',
      dogName: 'Rio',
      dogPhotoUrl: 'https://images.unsplash.com/photo-1541364983171-a8ba01d95cfc?auto=format&fit=crop&q=80'
    },
    {
      id: '2',
      firstName: 'Marie',
      lastName: 'Bernard',
      photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      email: 'marie.b@email.com',
      phone: '06 98 76 54 32',
      address: '5 avenue des Fleurs',
      city: 'Avrillé',
      zipCode: '49240',
      joinDate: '2024-02-10',
      status: 'En retard',
      dogName: 'Alvin',
      dogPhotoUrl: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80'
    }
  ];

  const filteredMembers = members.filter(m =>
    m.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.dogName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-white">Adhérents</h1>
        <p className="text-gray-400 mt-2">Gestion des membres du club</p>
      </div>

      {/* Recherche */}
      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Rechercher un prénom ou un chien..."
          className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors shadow-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grille des Adhérents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedMember(member)}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center space-x-6 cursor-pointer hover:border-blue-500 transition-all hover:bg-gray-800 group shadow-xl"
          >
            {/* Photo agrandie x1.5 (h-24 au lieu de h-16) */}
            <img
              src={member.photoUrl}
              alt={member.firstName}
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-700 group-hover:border-blue-500 transition-colors shadow-lg"
            />
            <div className="overflow-hidden">
              <h3 className="text-xl font-bold text-white truncate">{member.firstName}</h3>
              <p className="text-blue-400 font-medium text-sm mt-1">Binôme : {member.dogName}</p>
              <div className={`mt-2 inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${member.status === 'A jour' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {member.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODALE : FICHE DÉTAILLÉE (Format Vertical Smartphone) */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-6 right-6 p-2 bg-gray-900/80 rounded-full text-white hover:bg-white hover:text-black z-20 transition-all"
            >
              <X className="h-6 w-6" />
            </button>

            {/* En-tête avec les deux photos */}
            <div className="h-72 relative bg-gray-900">
              <img 
                src={selectedMember.photoUrl} 
                className="w-full h-full object-cover opacity-80"
                alt="Membre"
              />
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent" />
              
              {/* Vignette du Chien en bas à droite */}
              <div className="absolute bottom-4 right-6 group">
                <p className="text-[10px] text-white font-bold uppercase text-right mb-1 tracking-widest shadow-black drop-shadow-md">Son Compagnon</p>
                <img 
                  src={selectedMember.dogPhotoUrl} 
                  className="h-24 w-24 rounded-2xl object-cover border-4 border-gray-950 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform"
                  alt="Chien"
                />
              </div>
            </div>

            {/* Corps de la fiche */}
            <div className="px-8 pb-10 -mt-10 relative">
              <h2 className="text-4xl font-black text-white">{selectedMember.firstName}</h2>
              <p className="text-gray-500 font-medium text-lg uppercase tracking-tighter">{selectedMember.lastName}</p>

              <div className="mt-8 space-y-5">
                {/* Téléphone Cliquable */}
                <a href={`tel:${selectedMember.phone.replace(/\s/g, '')}`} className="flex items-center space-x-4 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 hover:bg-blue-500/10 transition-colors group">
                  <div className="p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform"><Phone className="h-5 w-5 text-blue-500" /></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Téléphone</p>
                    <p className="text-white font-bold text-lg">{selectedMember.phone}</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <div className="flex items-center space-x-4 p-2">
                  <div className="p-3 bg-gray-900 rounded-xl"><Mail className="h-5 w-5 text-gray-400" /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">E-mail</p>
                    <p className="text-white font-medium break-all">{selectedMember.email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-2">
                  <div className="p-3 bg-gray-900 rounded-xl"><MapPin className="h-5 w-5 text-gray-400" /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Adresse</p>
                    <p className="text-white font-medium">{selectedMember.address}</p>
                    <p className="text-gray-400 text-sm">{selectedMember.zipCode} {selectedMember.city}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-2 border-t border-gray-800 pt-5">
                  <div className="p-3 bg-gray-900 rounded-xl"><Calendar className="h-5 w-5 text-gray-400" /></div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">Adhérent depuis</p>
                    <p className="text-white font-medium">{selectedMember.joinDate}</p>
                  </div>
                </div>
              </div>

              <div className={`mt-8 p-4 rounded-2xl text-center font-black uppercase tracking-widest border ${selectedMember.status === 'A jour' ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                Statut : {selectedMember.status}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
