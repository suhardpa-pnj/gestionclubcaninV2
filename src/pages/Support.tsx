import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Send, Smartphone, Monitor, Layout, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';

const Support = () => {
  const { darkMode, addFeedback } = useStore();
  const [sent, setSent] = useState(false);
  
  const [formData, setFormData] = useState({
    device: 'PC / Mac',
    page: 'Tableau de bord',
    type: 'Bug',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addFeedback(formData);
      setSent(true);
      setFormData({ ...formData, description: '' });
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      alert("Erreur lors de l'envoi du feedback.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-12 animate-in fade-in duration-700 pb-20">
      <div>
        <h2 className={`text-5xl font-serif italic ${darkMode ? 'text-white' : 'text-[#1B4332]'}`}>
          Support & <span className="text-[#BC6C25]">Retours</span>
        </h2>
        <p className="text-[#BC6C25] text-[10px] font-black uppercase tracking-[0.3em] mt-3 italic">
          Signaler un problème ou suggérer une idée
        </p>
      </div>

      <form onSubmit={handleSubmit} className={`p-10 rounded-[40px] border space-y-8 ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-emerald-50 shadow-xl'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* SUPPORT */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
              <Smartphone size={12} /> Support utilisé
            </label>
            <select 
              value={formData.device}
              onChange={(e) => setFormData({...formData, device: e.target.value})}
              className={`w-full p-4 rounded-2xl border-none font-bold text-xs outline-none ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}
            >
              <option>PC / Mac</option>
              <option>Smartphone Android</option>
              <option>iPhone / iPad</option>
              <option>Tablette Android</option>
            </select>
          </div>

          {/* PAGE */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
              <Layout size={12} /> Page / Onglet
            </label>
            <select 
              value={formData.page}
              onChange={(e) => setFormData({...formData, page: e.target.value})}
              className={`w-full p-4 rounded-2xl border-none font-bold text-xs outline-none ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}
            >
              <option>Tableau de bord</option>
              <option>Planning</option>
              <option>Présences</option>
              <option>Cotisations</option>
              <option>Membres / Les Chiens</option>
              <option>Boutique</option>
              <option>Autre</option>
            </select>
          </div>
        </div>

        {/* TYPE DE RETOUR */}
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Nature du retour</label>
          <div className="grid grid-cols-3 gap-3">
            {['Bug', 'Idée', 'Design'].map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setFormData({...formData, type: t})}
                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  formData.type === t 
                  ? 'bg-[#BC6C25] text-white border-transparent shadow-lg' 
                  : 'bg-slate-50 text-slate-400 border-transparent hover:border-emerald-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">
            <MessageSquare size={12} /> Description libre
          </label>
          <textarea 
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className={`w-full p-6 rounded-[2rem] border-none outline-none font-medium text-xs min-h-[150px] leading-relaxed ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}
            placeholder="Détaillez ici le problème (ce qui s'est passé) ou votre idée d'amélioration..."
          />
        </div>

        {/* BOUTON ENVOI */}
        <div className="relative pt-4">
          <button 
            type="submit" 
            disabled={sent}
            className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl transition-all flex items-center justify-center gap-3 ${
              sent ? 'bg-emerald-500 text-white' : 'bg-[#1B4332] text-white hover:bg-[#BC6C25]'
            }`}
          >
            {sent ? <CheckCircle size={18} /> : <Send size={16} />}
            {sent ? 'Retour envoyé !' : 'Transmettre au développeur'}
          </button>
        </div>
      </form>

      <div className={`p-8 rounded-[40px] border-2 border-dashed flex items-start gap-4 ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-emerald-100 bg-emerald-50/30'}`}>
        <AlertCircle className="text-[#BC6C25] shrink-0" size={20} />
        <p className="text-[11px] text-slate-500 leading-relaxed font-serif italic">
          Chaque retour est enregistré avec un horodatage et les informations de session. Merci de contribuer à rendre l'application de l'Amicale Canine Vernoise plus performante.
        </p>
      </div>
    </div>
  );
};

export default Support;
