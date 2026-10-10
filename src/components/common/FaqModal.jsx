import React, { useState } from 'react';
import { X, HelpCircle, ChevronDown, ChevronUp, ShieldCheck, HeartHandshake, Phone, Smartphone, Stethoscope } from 'lucide-react';

export default function FaqModal({ isOpen, onClose, onOpenInstallApp }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'O que é o Vortex e como funciona?',
      a: 'O Vortex é uma plataforma inteligente que conecta pacientes com necessidade de consultas médicas particulares a médicos e clínicas qualificadas, sem intermediários demorados e com retorno direto via WhatsApp.',
      icon: Stethoscope
    },
    {
      q: 'O uso da plataforma é gratuito para pacientes?',
      a: 'Sim, 100% gratuito. Pacientes não pagam nenhuma mensalidade, taxa de adesão ou custo para buscar e solicitar opções de atendimento no Vortex. O valor pago refere-se exclusivamente à consulta diretamente ao médico/clínica.',
      icon: HeartHandshake
    },
    {
      q: 'Como os médicos e clínicas participam sem mensalidade?',
      a: 'Médicos e clínicas credenciados no programa piloto mantêm autonomia total sobre horários disponibilizados, modalidades (presencial ou telemedicina) e valores das consultas, sem qualquer taxa mensal fixa ou exigência de exclusividade.',
      icon: ShieldCheck
    },
    {
      q: 'Meus dados e número de WhatsApp estão seguros?',
      a: 'Sim. Seus dados são confidenciais e tratados com rigor sob as diretrizes da Lei Geral de Proteção de Dados (LGPD). As informações são utilizadas exclusivamente para apresentar as opções de consulta ideais para sua solicitação.',
      icon: Phone
    },
    {
      q: 'Como instalar o aplicativo no celular?',
      a: 'O Vortex é um Progressive Web App (PWA). No Android (Chrome), toque em "Baixar aplicativo" no menu. No iPhone (Safari), toque no botão de Compartilhar e selecione "Adicionar à Tela de Início". Ele ocupa menos de 2MB e funciona como um app nativo.',
      icon: Smartphone
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh] animate-slide-up"
      >
        {/* Modal Header */}
        <div className="bg-vortex-navy-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-vortex-navy-800 text-vortex-orange flex items-center justify-center border border-vortex-navy-700">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Perguntas Frequentes (FAQ)</h3>
              <p className="text-xs text-slate-300">Tire suas dúvidas sobre o Vortex</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-vortex-navy-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Fechar FAQ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content / Accordion */}
        <div className="p-5 overflow-y-auto space-y-3 flex-1">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const Icon = faq.icon;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-slate-200/80 bg-slate-50/60 overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full text-left p-4 flex items-center justify-between gap-3 font-bold text-xs sm:text-sm text-vortex-navy-900 hover:bg-slate-100/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-vortex-orange shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/50 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenInstallApp) onOpenInstallApp();
            }}
            className="text-xs font-bold text-vortex-orange hover:text-vortex-orange-600 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Smartphone className="w-4 h-4" />
            <span>Instalar app no celular</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-vortex-navy-900 text-white font-bold text-xs hover:bg-vortex-navy-800 transition-colors cursor-pointer"
          >
            Entendi
          </button>
        </div>
      </div>
    </div>
  );
}
