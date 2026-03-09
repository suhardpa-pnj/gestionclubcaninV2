import React, { useState } from 'react';

const Login = ({ onLogin }: { onLogin: (r: string) => void }) => {
  const [pass, setPass] = useState('');

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#F4F1EA] p-6 font-sans">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* LOGO DU CLUB ACV */}
        <img 
          src="https://drive.google.com/thumbnail?id=1OpIY0AEaoBUT_CAqIIkV9Y8shhUvyq_u&sz=w400" 
          className="w-32 h-32 mb-8 drop-shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
          alt="Logo ACV" 
        />
        
        <div className="bg-white p-10 rounded-[40px] shadow-2xl w-full border border-emerald-50 relative overflow-hidden">
          {/* PETIT DÉTAIL DÉCO NATURE */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#1B4332] via-[#BC6C25] to-[#1B4332] opacity-20" />
          
          <h1 className="text-2xl font-serif italic text-[#1B4332] text-center mb-8">Espace Gestion</h1>
          
          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
              if(pass === '0000') onLogin('admin'); // CODE MIS À JOUR : 0000
            }} 
            className="space-y-6"
          >
            <div className="space-y-2">
              <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-2">Code d'accès</label>
              <input 
                type="password" 
                value={pass} 
                onChange={(e)=>setPass(e.target.value)} 
                placeholder="••••" 
                className="w-full px-6 py-4 bg-[#F8F9FA] rounded-2xl border-none outline-none text-center font-bold text-xl tracking-[0.5em] focus:ring-2 focus:ring-[#BC6C25]/20 transition-all" 
              />
            </div>
            
            <button className="w-full py-5 bg-[#1B4332] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-lg hover:bg-[#2D6A4F] hover:shadow-[#1B4332]/20 transition-all active:scale-95">
              Entrer dans le club
            </button>
          </form>
        </div>
        
        <p className="mt-8 text-[8px] font-black uppercase tracking-[0.2em] text-[#1B4332]/40 italic text-center">
          Amicale Canine Vernoise • Système Protégé
        </p>
      </div>
    </div>
  );
};

export default Login;
