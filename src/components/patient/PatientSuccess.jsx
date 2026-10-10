import React from 'react';
import { 
  CheckCircle2, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Stethoscope, 
  ArrowLeft, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  Video, 
  ShieldCheck,
  Building2,
  Share2
} from 'lucide-react';
import Logo from '../common/Logo';

export default function PatientSuccess({ data, onReset, onBackHome }) {
  const whatsappNumber = data?.whatsapp ? data.whatsapp.replace(/\D/g, '') : '';
  const firstName = data?.nome ? data.nome.split(' ')[0] : 'Paciente';

  return (
    <div className="w-full max-w-2xl mx-auto py-8 sm:py-12 px-4 sm:px-6">
      
      {/* Success Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-slate-200/80 text-center space-y-6 animate-scale-in">
        
        {/* Success Icon */}
        <div className="inline-flex items-center justify-center">
          <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
        </div>

        {/* Primary Notification Text Required by Specification */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Solicitação Confirmada com Sucesso</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-vortex-navy-900 tracking-tight leading-tight">
            Olá, {firstName}!
          </h1>

          <div className="p-4 sm:p-5 rounded-2xl bg-vortex-navy-50/70 border border-vortex-navy-100 text-vortex-navy-900 text-base sm:text-lg font-medium leading-relaxed max-w-lg mx-auto">
            "Recebemos sua solicitação. Vamos verificar as opções disponíveis e entraremos em contato pelo WhatsApp."
          </div>
        </div>

        {/* Live Tracking Timeline */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left space-y-3">
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Status do seu atendimento:
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Solicitação registrada no Vortex</p>
                <p className="text-slate-500 text-xs">Especialidade: <strong>{data?.especialidade || 'Consulta Médica'}</strong></p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-vortex-orange text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-slate-900">Buscando médicos compatíveis</p>
                <p className="text-slate-500 text-xs">Analisando agendas em {data?.cidade || 'sua região'}</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                <MessageCircle className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-600">Envio das opções no WhatsApp</p>
                <p className="text-slate-400 text-xs">{data?.whatsapp || 'No seu número'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary of Request */}
        <div className="border-t border-slate-100 pt-5 text-left">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            Resumo dos dados enviados:
          </h2>
          <div className="grid grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Especialidade</span>
              <span className="font-bold text-slate-800">{data?.especialidade}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Cidade</span>
              <span className="font-bold text-slate-800">{data?.cidade}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Prazo desejado</span>
              <span className="font-bold text-slate-800 capitalize">{data?.urgencia}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Modalidade</span>
              <span className="font-bold text-slate-800 capitalize">{data?.modalidade}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 col-span-2">
              <span className="text-slate-400 block text-[10px]">Orçamento pretendido</span>
              <span className="font-bold text-slate-800">{data?.orcamento || 'Não informado'}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onReset}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-vortex-navy-900 hover:bg-vortex-navy-800 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Fazer outra busca</span>
          </button>

          <button
            onClick={onBackHome}
            className="py-3.5 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
          >
            Voltar ao Início
          </button>
        </div>

      </div>
    </div>
  );
}
