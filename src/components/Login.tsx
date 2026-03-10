import React, { useState } from 'react';

const Login = ({ onLogin }: { onLogin: (r: string) => void }) => {
  const [pass, setPass] = useState('');

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F4F1EA] p-6">
      <div className="w-full max-w-sm flex flex-col items-center">
        <img src="https://drive.google.com/thumbnail?id=1OpIY0AEaoBUT_CAqIIkV9Y8shhUvyq_u&sz=w400" className="w-32 h-32 mb-8" alt="Logo ACV" />
        <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full border border-emerald-50">
          <h1 className="text-2xl font-serif italic text-[#1B4332] text-center mb-8">Espace Gestion</h1>
          <form onSubmit={(e) => { e.preventDefault(); if(pass === '0000') onLogin('admin'); }} className="space-y-4">
            <input type="password" value={pass} onChange={(e)=>setPass(e.target.value)} placeholder="CODE D'ACCÈS" className="w-full px-6 py-4 bg-[#F8F9FA] rounded-2xl border-none outline-none text-center font-bold tracking-[0.2em] focus:ring-2 focus:ring-[#BC6C25]/20" />
            <button className="w-full py-4 bg-[#1B4332] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg">Connexion</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
