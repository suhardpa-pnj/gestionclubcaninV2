import React, { useState, useRef } from 'react';
import { useStore } from '../store/useStore';
import { Send, Smartphone, Layout, MessageSquare, AlertCircle, CheckCircle, Camera, X } from 'lucide-react';

const Support = () => {
  const { darkMode, addFeedback, uploadFeedbackFile } = useStore();
  const [sent, setSent] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    device: 'Smartphone Android',
    page: 'Présences',
    type: 'Bug',
    description: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let imageUrl = null;
      if (selectedFile) {
        imageUrl = await uploadFeedbackFile(selectedFile);
      }
      await addFeedback({ ...formData, screenshot: imageUrl });
      setSent(true);
      setFormData({ ...formData, description: '' });
      setSelectedFile(null);
      setPreviewUrl(null);
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      alert("Erreur lors de l'envoi.");
    } finally {
      setUploading(false);
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
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">Support utilisé</label>
            <select 
              value={formData.device}
              onChange={(e) => setFormData({...formData, device: e.target.value})}
              className={`w-full p-4 rounded-2xl border-none font-bold text-xs outline-none ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}
            >
              <option>PC / Mac</option>
              <option>Smartphone Android</option>
              <option>iPhone / iPad</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2 flex items-center gap-2">Page concernée</label>
            <select 
              value={formData.page}
              onChange={(e) => setFormData({...formData, page: e.target.value})}
              className={`w-full p-4 rounded-2xl border-none font-bold text-xs outline-none ${darkMode ? 'bg-slate-800 text-white' : 'bg-slate-50 shadow-inner'}`}
            >
              <option>Tableau de bord</option>
              <option>Membres / Chiens</option>
              <option>Présences</option>
              <option>Planning</option>
              <option>Croquettes / Finances</option>
              <option>Autre</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Nature du retour</label>
          <div className="grid grid-cols-3 gap-3">
            {['Bug', 'Idée', 'Design'].map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setFormData({...formData, type: t})}
                className={`py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                  formData.type === t ? 'bg-[#BC6C25] text-white border-transparent' : 'bg-slate-50 text-slate-400 border-transparent hover:border-emerald-200'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Capture d'écran (Optionnel)</label>
          <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
          {!previewUrl ? (
            <button type="button" onClick={() => fileInputRef.current?.click()} className={`w-full h-32 rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center gap-2 ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-emerald-100 bg-emerald-50/30'}`}>
              <Camera size={24} className="text-[#BC6C25]" />
              <span className="text-[9px] font-black uppercase text-slate-400">Cliquer pour charger une image</span>
            </button>
          ) : (
            <div className="relative rounded-[2rem] overflow-hidden border-2 border-[#BC6C25]">
              <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover" />
              <button type="button" onClick={() => { setSelectedFile(null); setPreviewUrl(null); }} className="absolute top-4 right-4 p-2 bg-rose-500 text-white rounded-full">
                <X size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Description</label>
          <textarea 
            required
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className={`w-full p-6 rounded-[2rem] border-none outline-none font-medium text-xs min-h-[120px] ${darkMode ? 'bg-slate-800 text-white' : 'bg-white shadow-inner'}`}
            placeholder="Détaillez ici votre retour..."
          />
        </div>

        <button type="submit" disabled={sent || uploading} className={`w-full py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-xl transition-all ${sent ? 'bg-emerald-500 text-white' : 'bg-[#1B4332] text-white hover:bg-[#BC6C25]'}`}>
          {uploading ? 'Envoi...' : (sent ? 'Retour envoyé !' : 'Transmettre au développeur')}
        </button>
      </form>
    </div>
  );
};

export default Support;
