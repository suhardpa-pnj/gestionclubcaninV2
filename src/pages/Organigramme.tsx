import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { 
  User, ShieldCheck, Star, GraduationCap, 
  Edit3, X, Check
} from 'lucide-react';

const Organigramme = () => {
  const { darkMode, members, organigramme, updateOrganigramme } = useStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orgData, setOrgData] = useState<any>({});

  // Synchronise les données locales quand celles du store changent
  useEffect(() => {
    if (organigramme) {
      setOrgData(organigramme);
    }
  }, [organigramme]);

  const handleSave = async () => {
    await updateOrganigramme(orgData);
    setIsEditModalOpen(false);
  };

  const getMember = (id: string) => members.find(m => m.id === id);

  const categories = [
    { 
      id: 'BUREAU', 
      label: 'Le Bureau', 
      icon: <ShieldCheck size={16} />,
      pairs: [
        { title: 'Présidence', pId: orgData.president, pRole: 'Président', aId: orgData.presidentAdj, aRole: 'Adjoint' },
        { title: 'Secrétariat', pId: orgData.secretaire, pRole: 'Secrétaire', aId: orgData.secretaireAdj, aRole: 'Adjoint' },
        { title: 'Trésorerie', pId: orgData.tresorier, pRole: 'Trésorier', aId: orgData.tresorierAdj, aRole: 'Adjoint' },
      ]
    },
    { 
      id: 'SECTION', 
      label: 'Responsables Sections', 
      icon: <Star size={16} />,
      members: [
        { role: 'Responsable Ring', id: orgData.responsableRing },
        { role: 'Responsable Agility', id: orgData.responsableAgility },
        { role: 'Responsable Obéissance', id: orgData.responsableObe },
        { role: 'Responsable École du Chiot', id: orgData.responsableChiot },
        { role: 'Responsable Éducation', id: orgData.responsableEduc },
      ]
    },
    { 
      id: 'MONITEURS', 
      label: 'Les Moniteurs', 
      icon: <GraduationCap size={16} />,
      members: [
        { role: 'Moniteur Principal', id: orgData.moniteur1 },
        { role: 'Moniteur', id: orgData.moniteur2 },
        { role: 'Moniteur', id: orgData.moniteur3 },
      ]
    }
  ];

  const DuoCard = ({ pair }: any) => {
    const p = getMember(pair.pId);
    const a = getMember(pair.aId);
    return (
      <div className={`relative p-6 rounded-[40px] border flex items-center gap-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl'}`}>
        <div className="flex items-end shrink-0">
          <div className="w-20 h-20 rounded-[24px] overflow-hidden bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center text-slate-300">
            {p?.photo ? <img src={p.photo} className="w-full h-full object-cover" /> : <User size={32} strokeWidth={1} />}
          </div>
          <div className="w-12 h-12 rounded-[16px] overflow-hidden bg-[#FDFBF7] border-4 border-white shadow-md -ml-6 -mb-2 flex items-center justify-center text-[#DDA15E]/30">
            {a?.photo ? <img src={a.photo} className="w-full h-full object-cover" /> : <User size={20} strokeWidth={1} />}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest italic">{pair.pRole}</p>
            <h3 className={`text-xl font-serif italic lowercase truncate ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{p?.firstName || 'À définir'}</h3>
          </div>
          <div>
            <p className="text-[#BC6C25]/60 text-[7px] font-black uppercase tracking-widest italic">{pair.aRole}</p>
            <p className={`text-sm font-serif italic lowercase truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{a?.firstName || 'À définir'}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>L'<span className="text-[#BC6C25]">Organigramme</span></h2>
          <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">L'équipe de l'Amicale Canine Vernoise</p>
        </div>
        <button onClick={() => setIsEditModalOpen(true)} className="flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest uppercase bg-[#BC6C25] text-white shadow-lg hover:scale-105 transition-all">
          <Edit3 size={16} /> Édition Bureau
        </button>
      </div>

      {categories.map((cat) => (
        <div key={cat.id} className="space-y-8">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-3 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-[#1B4332]/5 text-[#1B4332]'}`}>
              {cat.icon} {cat.label}
            </div>
            <div className={`h-px flex-1 ${darkMode ? 'bg-slate-800' : 'bg-emerald-100'}`}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cat.id === 'BUREAU' ? (
              cat.pairs?.map((pair, i) => <DuoCard key={i} pair={pair} />)
            ) : (
              cat.members?.map((m, i) => {
                const person = getMember(m.id);
                return (
                  <div key={i} className={`p-6 rounded-[32px] border flex items-center gap-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'}`}>
                    <div className="w-12 h-12 rounded-[16px] overflow-hidden bg-slate-50 border-2 border-white shadow-sm flex items-center justify-center text-slate-200">
                      {person?.photo ? <img src={person.photo} className="w-full h-full object-cover" /> : <User size={20} strokeWidth={1} />}
                    </div>
                    <div>
                      <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest italic">{m.role}</p>
                      <h3 className={`text-lg font-serif italic lowercase ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{person?.firstName || 'À définir'}</h3>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ))}

      {isEditModalOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4 bg-[#1B4332]/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className={`w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl overflow-hidden border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50'}`}>
            <div className="p-8 flex items-center justify-between border-b border-slate-50">
              <h3 className={`text-2xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>Attribuer les fonctions</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-rose-50 hover:text-rose-500 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <div className="p-8 overflow-y-auto max-h-[60vh] space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { label: 'Président', key: 'president' }, { label: 'Adjoint Prés.', key: 'presidentAdj' },
                  { label: 'Secrétaire', key: 'secretaire' }, { label: 'Adjoint Sec.', key: 'secretaireAdj' },
                  { label: 'Trésorier', key: 'tresorier' }, { label: 'Adjoint Tré.', key: 'tresorierAdj' },
                  { label: 'Resp. Ring', key: 'responsableRing' }, { label: 'Resp. Agility', key: 'responsableAgility' },
                  { label: 'Resp. École du Chiot', key: 'responsableChiot' }, { label: 'Resp. Éducation', key: 'responsableEduc' },
                  { label: 'Moniteur 1', key: 'moniteur1' }, { label: 'Moniteur 2', key: 'moniteur2' }, { label: 'Moniteur 3', key: 'moniteur3' }
                ].map((item) => (
                  <div key={item.key} className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-[#BC6C25] ml-2 tracking-widest">{item.label}</label>
                    <select 
                      value={orgData[item.key] || ''} 
                      onChange={(e) => setOrgData({...orgData, [item.key]: e.target.value})}
                      className={`w-full p-4 rounded-2xl border-none outline-none font-serif italic text-sm ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}
                    >
                      <option value="">Sélectionner un adhérent...</option>
                      {members.sort((a,b) => (a.firstName || '').localeCompare(b.firstName || '')).map(m => (
                        <option key={m.id} value={m.id}>{m.firstName} {m.name}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 border-t border-slate-50">
              <button 
                onClick={handleSave}
                className="w-full py-5 rounded-[24px] bg-[#1B4332] text-white font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#BC6C25] transition-all flex items-center justify-center gap-3"
              >
                <Check size={18} /> Enregistrer l'organigramme
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Organigramme;
