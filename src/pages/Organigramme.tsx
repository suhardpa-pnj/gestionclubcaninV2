import React, { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';
import { 
  User, ShieldCheck, Star, GraduationCap, 
  Edit3, X, Check, Plus, Trash2
} from 'lucide-react';

const Organigramme = () => {
  const { darkMode, members, organigramme, updateOrganigramme } = useStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [orgData, setOrgData] = useState<any>({
    bureauMembers: [],
    moniteursList: []
  });

  // Synchronise les données locales avec le store
  useEffect(() => {
    if (organigramme) {
      setOrgData({
        ...organigramme,
        bureauMembers: organigramme.bureauMembers || [],
        moniteursList: organigramme.moniteursList || []
      });
    }
  }, [organigramme]);

  const handleSave = async () => {
    await updateOrganigramme(orgData);
    setIsEditModalOpen(false);
  };

  const getMember = (id: string) => members.find(m => m.id === id);

  // Méthodes pour gérer les listes dynamiques dans la modale
  const addBureauMember = () => setOrgData({ ...orgData, bureauMembers: [...orgData.bureauMembers, ""] });
  const removeBureauMember = (index: number) => {
    const newList = [...orgData.bureauMembers];
    newList.splice(index, 1);
    setOrgData({ ...orgData, bureauMembers: newList });
  };

  const addMoniteur = () => setOrgData({ ...orgData, moniteursList: [...orgData.moniteursList, { id: "", level: "moniteur diplômé" }] });
  const removeMoniteur = (index: number) => {
    const newList = [...orgData.moniteursList];
    newList.splice(index, 1);
    setOrgData({ ...orgData, moniteursList: newList });
  };

  const categories = [
    { 
      id: 'BUREAU', 
      label: 'Le Bureau', 
      icon: <ShieldCheck size={16} />,
      pairs: [
        { title: 'Présidence', pId: orgData.president, pRole: 'Président', aId: orgData.presidentAdj, aRole: 'Adjoint' },
        { title: 'Secrétariat', pId: orgData.secretaire, pRole: 'Secrétaire', aId: orgData.secretaireAdj, aRole: 'Adjoint' },
        { title: 'Trésorerie', pId: orgData.tresorier, pRole: 'Trésorier', aId: orgData.tresorierAdj, aRole: 'Adjoint' },
      ],
      simpleMembers: orgData.bureauMembers || []
    },
    { 
      id: 'SECTION', 
      label: 'Responsables Sections', 
      icon: <Star size={16} />,
      items: [
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
      items: orgData.moniteursList || []
    }
  ];

  const DuoCard = ({ pair }: any) => {
    const p = getMember(pair.pId);
    const a = getMember(pair.aId);
    return (
      <div className={`relative p-6 rounded-[40px] border flex items-center gap-6 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl shadow-emerald-900/5'}`}>
        <div className="flex items-end shrink-0">
          <div className="w-20 h-20 rounded-[24px] overflow-hidden bg-slate-100 border-4 border-white shadow-lg flex items-center justify-center text-slate-300">
            {p?.photo ? <img src={p.photo} className="w-full h-full object-cover" /> : <User size={32} strokeWidth={1} />}
          </div>
          <div className="w-12 h-12 rounded-[16px] overflow-hidden bg-[#FDFBF7] border-4 border-white shadow-md -ml-6 -mb-2 flex items-center justify-center text-[#DDA15E]/30">
            {a?.photo ? <img src={a.photo} className="w-full h-full object-cover" /> : <User size={20} strokeWidth={1} />}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest italic">{pair.pRole}</p>
          <h3 className={`text-xl font-serif italic lowercase truncate ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{p?.firstName || 'À définir'}</h3>
          <p className="text-[#BC6C25]/60 text-[7px] font-black uppercase tracking-widest italic mt-2">{pair.aRole}</p>
          <p className={`text-sm font-serif italic lowercase truncate ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{a?.firstName || 'À définir'}</p>
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
              <>
                {cat.pairs?.map((pair, i) => <DuoCard key={i} pair={pair} />)}
                {cat.simpleMembers?.map((mId: string, i: number) => {
                  const person = getMember(mId);
                  return (
                    <div key={`member-${i}`} className={`p-6 rounded-[40px] border flex items-center gap-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-md'}`}>
                      <div className="w-14 h-14 rounded-[20px] overflow-hidden bg-slate-50 border-2 border-white">
                        {person?.photo ? <img src={person.photo} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-200"><User size={24}/></div>}
                      </div>
                      <div>
                        <div className="flex items-center gap-2"><p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest italic">Membre</p><span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-[#1B4332] text-[6px] font-black uppercase">Bureau</span></div>
                        <h3 className={`text-lg font-serif italic lowercase ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{person?.firstName || 'À définir'}</h3>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : cat.id === 'MONITEURS' ? (
              cat.items?.map((item: any, i: number) => {
                const person = getMember(item.id);
                return (
                  <div key={i} className={`p-6 rounded-[32px] border flex items-center gap-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'}`}>
                    <div className="w-12 h-12 rounded-[16px] overflow-hidden bg-slate-50 border-2 border-white shadow-sm flex items-center justify-center text-slate-200">
                      {person?.photo ? <img src={person.photo} className="w-full h-full object-cover" /> : <User size={20} strokeWidth={1} />}
                    </div>
                    <div>
                      <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest italic">Moniteur</p>
                      <h3 className={`text-lg font-serif italic lowercase ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>{person?.firstName || 'À définir'}</h3>
                      <p className="text-[7px] font-black uppercase text-slate-400 mt-1">{item.level}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              cat.items?.map((item: any, i: number) => {
                const person = getMember(item.id);
                return (
                  <div key={i} className={`p-6 rounded-[32px] border flex items-center gap-4 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-sm'}`}>
                    <div className="w-12 h-12 rounded-[16px] overflow-hidden bg-slate-50 border-2 border-white shadow-sm flex items-center justify-center text-slate-200">
                      {person?.photo ? <img src={person.photo} className="w-full h-full object-cover" /> : <User size={20} strokeWidth={1} />}
                    </div>
                    <div>
                      <p className="text-[#BC6C25] text-[8px] font-black uppercase tracking-widest italic">{item.role}</p>
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
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-rose-50 rounded-full transition-colors"><X size={20}/></button>
            </div>
            
            <div className="p-8 overflow-y-auto max-h-[60vh] space-y-10">
              {/* FONCTIONS FIXES DU BUREAU */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase text-[#BC6C25] tracking-widest border-b pb-2">Bureau (Fonctions fixes)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Président', key: 'president' }, { label: 'Adjoint Prés.', key: 'presidentAdj' },
                    { label: 'Secrétaire', key: 'secretaire' }, { label: 'Adjoint Sec.', key: 'secretaireAdj' },
                    { label: 'Trésorier', key: 'tresorier' }, { label: 'Adjoint Tré.', key: 'tresorierAdj' },
                  ].map((item) => (
                    <div key={item.key} className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">{item.label}</label>
                      <select 
                        value={orgData[item.key] || ''} 
                        onChange={(e) => setOrgData({...orgData, [item.key]: e.target.value})}
                        className={`w-full p-3 rounded-xl border-none outline-none font-serif italic text-sm ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}
                      >
                        <option value="">Sélectionner...</option>
                        {members.sort((a,b) => a.firstName.localeCompare(b.firstName)).map(m => (
                          <option key={m.id} value={m.id}>{m.firstName} {m.name}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* MEMBRES SIMPLES DU BUREAU (DYNAMIQUE) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="text-[10px] font-black uppercase text-[#BC6C25] tracking-widest">Membres simples du Bureau</h4>
                  <button onClick={addBureauMember} className="p-2 bg-emerald-50 text-[#1B4332] rounded-lg hover:bg-[#BC6C25] hover:text-white transition-all">
                    <Plus size={16}/>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {orgData.bureauMembers.map((mId: string, index: number) => (
                    <div key={index} className="flex gap-2">
                      <select 
                        value={mId} 
                        onChange={(e) => {
                          const newList = [...orgData.bureauMembers];
                          newList[index] = e.target.value;
                          setOrgData({...orgData, bureauMembers: newList});
                        }}
                        className={`flex-1 p-3 rounded-xl border-none outline-none font-serif italic text-sm ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}
                      >
                        <option value="">Choisir un membre...</option>
                        {members.map(m => <option key={m.id} value={m.id}>{m.firstName} {m.name}</option>)}
                      </select>
                      <button onClick={() => removeBureauMember(index)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTIONS FIXES */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase text-[#BC6C25] tracking-widest border-b pb-2">Responsables Sections</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Resp. Ring', key: 'responsableRing' }, { label: 'Resp. Agility', key: 'responsableAgility' },
                    { label: 'Resp. Obéissance', key: 'responsableObe' }, { label: 'Resp. École Chiot', key: 'responsableChiot' },
                    { label: 'Resp. Éducation', key: 'responsableEduc' }
                  ].map((item) => (
                    <div key={item.key} className="space-y-1">
                      <label className="text-[9px] font-black uppercase text-slate-400 ml-2 tracking-widest">{item.label}</label>
                      <select 
                        value={orgData[item.key] || ''} 
                        onChange={(e) => setOrgData({...orgData, [item.key]: e.target.value})}
                        className={`w-full p-3 rounded-xl border-none outline-none font-serif italic text-sm ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}
                      >
                        <option value="">Sélectionner...</option>
                        {members.map(m => <option key={m.id} value={m.id}>{m.firstName} {m.name}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* MONITEURS (DYNAMIQUE) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h4 className="text-[10px] font-black uppercase text-[#BC6C25] tracking-widest">Les Moniteurs</h4>
                  <button onClick={addMoniteur} className="p-2 bg-emerald-50 text-[#1B4332] rounded-lg hover:bg-[#BC6C25] hover:text-white transition-all">
                    <Plus size={16}/>
                  </button>
                </div>
                <div className="space-y-3">
                  {orgData.moniteursList.map((moni: any, index: number) => (
                    <div key={index} className="flex flex-col md:flex-row gap-3 p-4 bg-slate-50/50 rounded-2xl">
                      <select 
                        value={moni.id} 
                        onChange={(e) => {
                          const newList = [...orgData.moniteursList];
                          newList[index].id = e.target.value;
                          setOrgData({...orgData, moniteursList: newList});
                        }}
                        className={`flex-1 p-3 rounded-xl border-none outline-none font-serif italic text-sm ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-sm'}`}
                      >
                        <option value="">Choisir un moniteur...</option>
                        {members.map(m => <option key={m.id} value={m.id}>{m.firstName} {m.name}</option>)}
                      </select>
                      <select 
                        value={moni.level} 
                        onChange={(e) => {
                          const newList = [...orgData.moniteursList];
                          newList[index].level = e.target.value;
                          setOrgData({...orgData, moniteursList: newList});
                        }}
                        className={`md:w-64 p-3 rounded-xl border-none outline-none font-black text-[10px] uppercase tracking-widest ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-sm'}`}
                      >
                        <option value="moniteur diplômé">Moniteur diplômé</option>
                        <option value="moniteur en formation">Moniteur en formation</option>
                      </select>
                      <button onClick={() => removeMoniteur(index)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl">
                        <Trash2 size={18}/>
                      </button>
                    </div>
                  ))}
                </div>
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
