import React, { useState } from 'react';
import { Lock, Dog } from 'lucide-react';

interface LoginProps {
  onLogin: (role: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [pass, setPass] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pass === '0000') onLogin('admin');
    else alert('Code accès incorrect');
  };

  return (
    <div className="h-screen w-full bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 rounded-[40px] p-12 shadow-2xl border border-slate-800 text-center">
        <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-8 shadow-lg shadow-emerald-900/40">
          <Dog size={40} />
        </div>
        <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-100 mb-8">
          Amicale Canine Vernoise
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input 
            type="password" 
            placeholder="CODE D'ACCÈS"
            className="w-full px-4 py-5 bg-slate-950 border-none rounded-2xl font-black text-center tracking-[0.4em] focus:ring-2 focus:ring-emerald-500 text-slate-100"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            autoFocus
          />
          <button className="w-full bg-emerald-500 text-white py-5 rounded-2xl font-black uppercase italic tracking-widest hover:bg-emerald-400 transition-all">
            Connexion
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
