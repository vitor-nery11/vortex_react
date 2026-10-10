import React, { useState } from 'react';
import { Stethoscope, Lock, Mail, Sparkles } from 'lucide-react';

export default function DoctorLanding({ onStartTestRegistration, onLoginSuccess }) {
  const [loginData, setLoginData] = useState({
    crmOrEmail: '',
    password: ''
  });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.crmOrEmail || !loginData.password) {
      setLoginError('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    setLoginError('');

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        nome: loginData.crmOrEmail.includes('@') ? 'Dr. Médico Parceiro' : `Dr. CRM ${loginData.crmOrEmail}`,
        email: loginData.crmOrEmail
      });
    }, 800);
  };

  return (
    <div className="w-full max-w-md mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/80 animate-fade-in">
        
        {/* Card Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-sm shadow-sm">
              <Stethoscope className="w-5 h-5 text-vortex-orange" />
            </div>
            <div>
              <h2 className="font-bold text-base text-vortex-navy-900">Portal do Médico</h2>
              <p className="text-xs text-slate-500">Acesso à plataforma</p>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            Acesso Seguro
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 pt-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              CRM ou E-mail cadastrado
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="CRM 123456-SP ou email@medico.com"
                value={loginData.crmOrEmail}
                onChange={(e) => setLoginData(prev => ({ ...prev, crmOrEmail: e.target.value }))}
                className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-vortex-navy-800 text-xs font-medium text-slate-800 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Senha de acesso
              </label>
              <a 
                href="#esqueceu" 
                onClick={(e) => { e.preventDefault(); alert('Link de recuperação enviado para seu e-mail cadastrado.'); }} 
                className="text-[11px] text-vortex-orange hover:underline font-medium"
              >
                Esqueceu?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginData.password}
                onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-vortex-navy-800 text-xs font-medium text-slate-800 outline-none transition-colors"
              />
            </div>
          </div>

          {loginError && (
            <p className="text-xs text-rose-600 font-medium">{loginError}</p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl bg-vortex-navy-900 hover:bg-vortex-navy-800 active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoading ? 'Entrando...' : 'Entrar na Conta'}
          </button>

          {/* Registration Section Below Login */}
          <div className="text-center pt-4 mt-2 border-t border-slate-100 space-y-2.5">
            <p className="text-xs text-slate-600">
              Ainda não tem cadastro no Vortex?
            </p>
            <button
              type="button"
              onClick={onStartTestRegistration}
              className="w-full py-3 rounded-xl border-2 border-vortex-orange/80 text-vortex-orange hover:bg-vortex-orange hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cadastre-se para o teste piloto</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
