import React, { useState } from 'react';
import { 
  Stethoscope, 
  Building2, 
  Clock, 
  Video, 
  DollarSign, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Key, 
  Sparkles,
  ShieldAlert,
  HelpCircle,
  Target,
  Smartphone,
  Percent
} from 'lucide-react';
import Logo from '../common/Logo';

export default function DoctorLanding({ onStartTestRegistration, onLoginSuccess }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
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
    <div className="w-full max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6 space-y-10">
      
      {/* Top Banner / Pitch for Doctors */}
      <div className="relative bg-gradient-to-br from-vortex-navy-900 via-vortex-navy-800 to-vortex-navy-950 text-white rounded-3xl p-6 sm:p-10 border border-vortex-navy-700/80 shadow-2xl overflow-hidden animate-fade-in">
        
        {/* Background glow graphics */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-vortex-orange/15 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-sky-500/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left / Main Pitch */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vortex-orange/20 border border-vortex-orange/40 text-vortex-orange-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-vortex-orange" />
              <span>Programa Piloto Exclusivo</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
              É médico ou representa uma clínica?
            </h1>

            <p className="text-slate-200 text-base sm:text-lg font-medium leading-relaxed">
              Receba novos pacientes particulares <strong className="text-white underline decoration-vortex-orange decoration-2 underline-offset-4">sem mensalidade</strong> e <strong className="text-white underline decoration-vortex-orange decoration-2 underline-offset-4">sem exclusividade</strong>.
            </p>

            {/* Bullet points from specification */}
            <div className="space-y-3 pt-2">
              <p className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wider">
                Você mantém controle total sobre:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-vortex-navy-800/80 border border-vortex-navy-700/60">
                  <Clock className="w-4 h-4 text-vortex-orange shrink-0" />
                  <span>Horários que deseja disponibilizar</span>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-vortex-navy-800/80 border border-vortex-navy-700/60">
                  <Video className="w-4 h-4 text-vortex-orange shrink-0" />
                  <span>Modalidade de atendimento</span>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-vortex-navy-800/80 border border-vortex-navy-700/60">
                  <DollarSign className="w-4 h-4 text-vortex-orange shrink-0" />
                  <span>Preço da sua consulta</span>
                </div>

                <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-vortex-navy-800/80 border border-vortex-navy-700/60">
                  <Users className="w-4 h-4 text-vortex-orange shrink-0" />
                  <span>Quantidade de pacientes a receber</span>
                </div>
              </div>
            </div>

            {/* Primary Action Button Required by Specification */}
            <div className="pt-3">
              <button
                onClick={onStartTestRegistration}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-vortex-orange hover:bg-vortex-orange-600 active:scale-[0.98] text-white font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-orange-glow hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>[ QUERO PARTICIPAR DO TESTE ]</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Fast Login / Signup Option */}
          <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-xs">
                  <Stethoscope className="w-4 h-4 text-vortex-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-vortex-navy-900">Portal do Médico</h3>
                  <p className="text-[11px] text-slate-500">Acesso à plataforma</p>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Acesso Seguro
              </span>
            </div>

            <form onSubmit={handleLogin} className="space-y-3.5 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  CRM ou E-mail cadastrado
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="CRM 123456-SP ou email@medico.com"
                    value={loginData.crmOrEmail}
                    onChange={(e) => setLoginData(prev => ({ ...prev, crmOrEmail: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-vortex-navy-800 text-xs font-medium text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700">
                    Senha de acesso
                  </label>
                  <a href="#esqueceu" onClick={(e) => { e.preventDefault(); alert('Link de recuperação enviado para seu e-mail cadastrado.'); }} className="text-[11px] text-vortex-orange hover:underline font-medium">
                    Esqueceu?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-vortex-navy-800 text-xs font-medium text-slate-800 outline-none"
                  />
                </div>
              </div>

              {loginError && (
                <p className="text-xs text-rose-600 font-medium">{loginError}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-vortex-navy-900 hover:bg-vortex-navy-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? 'Entrando...' : 'Entrar na Conta'}
              </button>

              <div className="text-center pt-2 border-t border-slate-100">
                <p className="text-xs text-slate-600 mb-2">
                  Ainda não tem cadastro no Vortex?
                </p>
                <button
                  type="button"
                  onClick={onStartTestRegistration}
                  className="w-full py-2.5 rounded-xl border border-vortex-orange text-vortex-orange hover:bg-vortex-orange hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Cadastre-se para o teste piloto</span>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>

      {/* Additional Features / Value Proposition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Percent className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Sem mensalidades fixas</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Você não paga nenhuma taxa de adesão ou custo mensal para fazer parte do programa piloto.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Pacientes particulares qualificados</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conectamos pacientes que buscam sua especialidade com disposição imediata para consulta particular.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
            <Smartphone className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-slate-900 text-sm">Agendamento direto & flexível</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Aprovação ágil pelo WhatsApp da clínica ou do médico, preenchendo horários vagos e cancelamentos.
          </p>
        </div>
      </div>

    </div>
  );
}
