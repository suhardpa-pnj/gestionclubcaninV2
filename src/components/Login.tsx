import React, { useState } from 'react';
import { Lock, Dog } from 'lucide-react';

interface LoginProps {
  onLogin: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [pass, setPass] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === 'ACV2026') {
      onLogin('admin');
    } else {
      alert('Code accès incorrect');
    }
  };

  return (
    <div className="h-screen w-full bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-[40px] p-12 shadow-2xl shadow-slate-200 text-center border border-slate-100">
        <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-emerald-100">
          <Dog size={40} />
        </div>
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-800 mb-2">
          Amicale Canine Vernoise
        </h2>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-10">
          Accès Bureau & Administration
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="password" 
              placeholder="CODE D'ACCÈS"
              className="w-full pl-14 pr-4 py-5 bg-slate-50 border-none rounded-2xl font-black text-center tracking-[0.4em] focus:ring-2 focus:ring-emerald-500 transition-all text-slate-700"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              autoFocus
            />
          </div>
          <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-emerald-600 shadow-xl shadow-slate-200 transition-all active:scale-95">
            Entrer dans le Club
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
