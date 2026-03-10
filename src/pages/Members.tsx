import React, { useState } from 'react';
import { Search, X, Mail, Phone, MapPin, CreditCard, Calendar, ExternalLink } from 'lucide-react';

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
  }
];

export default function Members() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = members.filter(m =>
    m.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.dogName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-white">Adhérents</h1>
        <p className="text-gray-400 mt-2 italic">L'équipe des humains</p>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
        <input
          type="text"
          placeholder="Rechercher un prénom ou un chien..."
          className="w-full bg-gray-900/50 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-all"
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
              src={member.photoUrl}
              alt={member.firstName}
              className="h-24 w-24 rounded-full object-cover border-2 border-gray-700 group-hover:border-blue-500 transition-colors shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{member.firstName}</h3>
              <p className="text-blue-400 font-medium text-sm">Binôme : {member.dogName}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-gray-950 border border-gray-800 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl relative">
            <button onClick={() => setSelectedMember(null)} className="absolute top-6 right-6 p-2 bg-gray-900 rounded-full text-white z-20"><X className="h-6 w-6" /></button>
            <div className="h-64 relative">
              <img src={selectedMember.photoUrl} className="w-full h-full object-cover opacity-80" alt="Membre" />
              <div className="absolute bottom-4 right-6">
                <img src={selectedMember.dogPhotoUrl} className="h-20 w-20 rounded-xl object-cover border-4 border-gray-950 shadow-2xl transform rotate-3" alt="Chien" />
              </div>
            </div>
            <div className="px-8 pb-10 -mt-10 relative">
              <h2 className="text-4xl font-black text-white">{selectedMember.firstName}</h2>
              <div className="mt-8 space-y-4">
                <a href={`tel:${selectedMember.phone}`} className="flex items-center space-x-4 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="text-white font-bold">{selectedMember.phone}</span>
                </a>
                <div className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-2xl">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-white truncate">{selectedMember.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
