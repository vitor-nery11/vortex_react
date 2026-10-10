import React from 'react';
import { User, Stethoscope, ArrowRight, CheckCircle2 } from 'lucide-react';
import Logo from './Logo';

export default function RoleSelector({ onSelectRole }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-6 sm:py-12 px-4 sm:px-6">
      
      {/* Hero Badge & Heading */}
      <div className="text-center max-w-2xl mx-auto space-y-4 mb-8 sm:mb-12 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-vortex-navy-900 tracking-tight leading-[1.15]">
          Saúde particular sob medida, <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-vortex-orange to-amber-500">
            simples e transparente.
          </span>
        </h1>

        <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Para começar, selecione como você deseja utilizar o <strong>Vortex</strong>:
        </p>
      </div>

      {/* Choice Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 w-full max-w-3xl">
        
        {/* CARD 1: SOU PACIENTE */}
        <div 
          onClick={() => onSelectRole('patient')}
          className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/80 hover:border-emerald-500/80 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 active:scale-[0.99] text-left overflow-hidden"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-emerald-100/60 transition-colors" />

          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-sm">
                <User className="w-7 h-7" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                100% Grátis
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-vortex-navy-900 group-hover:text-emerald-700 transition-colors">
                Sou Paciente
              </h2>
              <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                Procuro uma consulta médica particular no meu orçamento, rápida e sem intermediários burocráticos.
              </p>
            </div>

            <ul className="space-y-2 pt-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Especialistas na sua cidade ou online</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Valores que cabem no seu bolso</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Contato direto pelo WhatsApp</span>
              </li>
            </ul>
          </div>

          <div className="relative pt-6 mt-4 border-t border-slate-100">
            <button
              className="w-full py-3 px-5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all group-hover:shadow-emerald-500/25"
            >
              <span>Buscar Médico / Consulta</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* CARD 2: SOU MÉDICO / CLÍNICA */}
        <div 
          onClick={() => onSelectRole('doctor')}
          className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200/80 hover:border-vortex-orange shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 active:scale-[0.99] text-left overflow-hidden"
        >
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-vortex-orange-50 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-vortex-orange-100/60 transition-colors" />

          <div className="relative space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-vortex-orange-50 text-vortex-orange flex items-center justify-center border border-vortex-orange-100 group-hover:bg-vortex-orange group-hover:text-white transition-all duration-300 shadow-sm">
                <Stethoscope className="w-7 h-7" />
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-vortex-orange-50 text-vortex-orange-700 border border-vortex-orange-200">
                Sem Mensalidade
              </span>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-vortex-navy-900 group-hover:text-vortex-orange transition-colors">
                Sou Médico ou Clínica
              </h2>
              <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
                Receba novos pacientes particulares qualificados, com total autonomia sobre horários e valores.
              </p>
            </div>

            <ul className="space-y-2 pt-2 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vortex-orange shrink-0" />
                <span>Preencha horários ociosos na sua agenda</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vortex-orange shrink-0" />
                <span>Você define preço e modalidade</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-vortex-orange shrink-0" />
                <span>Sem exclusividade ou taxas abusivas</span>
              </li>
            </ul>
          </div>

          <div className="relative pt-6 mt-4 border-t border-slate-100">
            <button
              className="w-full py-3 px-5 rounded-2xl bg-vortex-navy-900 hover:bg-vortex-navy-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md transition-all group-hover:shadow-navy-glow"
            >
              <span>Acessar ou Participar</span>
              <ArrowRight className="w-4 h-4 text-vortex-orange group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
