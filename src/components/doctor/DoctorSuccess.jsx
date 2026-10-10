import React from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Stethoscope, 
  Building2, 
  CalendarClock, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  LayoutDashboard,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function DoctorSuccess({ data, onOpenDashboard, onBackHome }) {
  const firstName = data?.nome ? data.nome.split(' ')[0] : 'Doutor(a)';

  return (
    <div className="w-full max-w-2xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-200/80 text-center space-y-6 animate-scale-in">
        
        {/* Success Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-vortex-navy-50 text-vortex-navy-900 flex items-center justify-center border border-vortex-navy-200 shadow-sm">
            <Stethoscope className="w-10 h-10 text-vortex-orange" />
          </div>
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs shadow-md">
            <Check className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vortex-orange-50 border border-vortex-orange-200 text-vortex-orange-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-vortex-orange" />
            <span>Inscrição Confirmada</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-vortex-navy-900 tracking-tight">
            Bem-vindo ao Vortex, {firstName}!
          </h1>

          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto">
            Recebemos seus dados para o teste piloto. Você não pagará mensalidades e terá total autonomia sobre sua agenda.
          </p>
        </div>

        {/* Steps Card */}
        <div className="bg-vortex-navy-900 text-white rounded-2xl p-5 text-left space-y-3 shadow-md">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Próximos passos do piloto:
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-bold text-white">Perfil cadastrado com sucesso</p>
                <p className="text-slate-300 text-xs">{data?.especialidade} • {data?.cidade}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-vortex-orange text-white flex items-center justify-center shrink-0 animate-pulse">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-bold text-white">Validação e contato da equipe Vortex</p>
                <p className="text-slate-300 text-xs">Entraremos em contato via WhatsApp no número {data?.whatsapp || ''}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-vortex-navy-800 text-slate-400 flex items-center justify-center shrink-0">
                <DollarSign className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold text-slate-300">Primeiros encaminhamentos</p>
                <p className="text-slate-400 text-xs">Pacientes particulares direcionados para sua aprovação</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="border-t border-slate-100 pt-5 text-left">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Resumo da sua inscrição:
          </h2>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Perfil</span>
              <span className="font-bold text-slate-800">{data?.tipoPerfil || 'Médico'}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Especialidade</span>
              <span className="font-bold text-slate-800">{data?.especialidade}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Valor da Consulta</span>
              <span className="font-bold text-slate-800">R$ {data?.valorConsulta}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Atendimento</span>
              <span className="font-bold text-slate-800 capitalize">{data?.modalidade}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onOpenDashboard}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-vortex-navy-900 hover:bg-vortex-navy-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4 text-vortex-orange" />
            <span>Explorar Painel do Médico (Demo)</span>
          </button>

          <button
            onClick={onBackHome}
            className="py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
          >
            Voltar ao Início
          </button>
        </div>

      </div>
    </div>
  );
}
