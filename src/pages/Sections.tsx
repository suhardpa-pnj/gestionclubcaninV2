import React from 'react';
import { useStore } from '../store/useStore';

interface SectionsProps {
  sectionId?: string;
}

const Sections: React.FC<SectionsProps> = ({ sectionId }) => {
  const { darkMode } = useStore();
  
  const getTitle = () => {
    switch(sectionId) {
      case 'section-chiots': return 'École du Chiot';
      case 'section-education': return 'Éducation';
      case 'section-obeissance': return 'Obéissance';
      case 'section-agility': return 'Agility';
      case 'section-ring': return 'Ring';
      default: return 'Sections';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className={`text-4xl font-black uppercase italic tracking-tighter ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
        {getTitle()}
      </h2>
      <div className={`p-8 rounded-[40px] border-2 border-dashed ${darkMode ? 'border-slate-800' : 'border-emerald-100'} flex items-center justify-center text-slate-400 italic font-bold`}>
        Espace en cours d'aménagement...
      </div>
    </div>
  );
};

export default Sections;
