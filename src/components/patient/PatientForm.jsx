import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Stethoscope, 
  Calendar, 
  CalendarDays,
  Zap,
  Smile,
  Lock,
  Video, 
  Building2, 
  HelpCircle, 
  Phone, 
  Search, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { POPULAR_SPECIALTIES, POPULAR_CITIES, formatPhone } from '../../data/mockData';
import confetti from 'canvas-confetti';

export default function PatientForm({ onSubmitSuccess, onBack }) {
  const [activeStep, setActiveStep] = useState(1); // 1, 2, 3, 4, 5
  
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    especialidade: '',
    urgencia: 'hoje/amanhã', // hoje/amanhã | até 3 dias | até 7 dias | sem urgência
    modalidade: 'tanto faz', // presencial | online | tanto faz
    orcamento: 'R$ 150 - R$ 250',
    whatsapp: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specialtySuggestions, setSpecialtySuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);

  const stepLabels = [
    'Sobre Você & Localização',
    'Especialidade Médica',
    'Quando e Como',
    'Faixa de Investimento',
    'Contato WhatsApp'
  ];

  // Timeframe options
  const timeframeOptions = [
    { 
      id: 'hoje/amanhã', 
      label: 'Hoje ou Amanhã', 
      sub: 'Mais prioritário', 
      badge: 'Urgente',
      icon: Zap 
    },
    { 
      id: 'até 3 dias', 
      label: 'Até 3 dias', 
      sub: 'Esta semana', 
      icon: Calendar 
    },
    { 
      id: 'até 7 dias', 
      label: 'Até 7 dias', 
      sub: 'Próximos dias', 
      icon: CalendarDays 
    },
    { 
      id: 'sem urgência', 
      label: 'Sem urgência', 
      sub: 'Rotina / Check-up', 
      icon: Smile 
    },
  ];

  // Modality options
  const modalityOptions = [
    { id: 'presencial', label: 'Presencial', icon: Building2, desc: 'No consultório' },
    { id: 'online', label: 'Online', icon: Video, desc: 'Teleconsulta' },
    { id: 'tanto faz', label: 'Tanto Faz', icon: HelpCircle, desc: 'Melhor opção' },
  ];

  // Price suggestions
  const priceOptions = [
    'Até R$ 150',
    'R$ 150 - R$ 250',
    'R$ 250 - R$ 400',
    'Acima de R$ 400',
    'Flexível'
  ];

  // Quick specialty pills
  const quickSpecialties = [
    'Clínico Geral',
    'Dermatologia',
    'Cardiologia',
    'Ginecologia'
  ];

  const handleSpecialtyChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, especialidade: val }));
    if (val.length > 1) {
      const filtered = POPULAR_SPECIALTIES.filter(s => 
        s.toLowerCase().includes(val.toLowerCase())
      );
      setSpecialtySuggestions(filtered.slice(0, 5));
    } else {
      setSpecialtySuggestions([]);
    }
    if (errors.especialidade) setErrors(prev => ({ ...prev, especialidade: null }));
  };

  const handleCityChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, cidade: val }));
    if (val.length > 1) {
      const filtered = POPULAR_CITIES.filter(c => 
        c.toLowerCase().includes(val.toLowerCase())
      );
      setCitySuggestions(filtered.slice(0, 5));
    } else {
      setCitySuggestions([]);
    }
    if (errors.cidade) setErrors(prev => ({ ...prev, cidade: null }));
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value);
    setFormData(prev => ({ ...prev, whatsapp: formatted }));
    if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: null }));
  };

  // Step-by-step validation
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.nome.trim()) newErrors.nome = 'Por favor, informe seu nome completo';
      if (!formData.cidade.trim()) newErrors.cidade = 'Informe sua cidade / estado';
    } else if (step === 2) {
      if (!formData.especialidade.trim()) newErrors.especialidade = 'Informe qual especialidade procura';
    } else if (step === 5) {
      if (!formData.whatsapp.trim() || formData.whatsapp.length < 14) {
        newErrors.whatsapp = 'Informe um número de WhatsApp válido com DDD';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(activeStep)) {
      if (activeStep < 5) {
        setActiveStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onBack) {
      onBack();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ED3E1A', '#182D50', '#10B981', '#F59E0B']
      });
    } catch (err) {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(formData);
    }, 600);
  };

  return (
    <div className="w-full max-w-md mx-auto py-4 px-3 sm:px-4 space-y-4 animate-fade-in">
      
      {/* Navigation Top: Back Button & Step Tag */}
      <div className="flex items-center justify-between px-1">
        <button
          type="button"
          onClick={prevStep}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-vortex-navy-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{activeStep === 1 ? 'Início' : 'Voltar'}</span>
        </button>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-vortex-orange-50 border border-orange-200/60 text-vortex-orange text-[11px] font-bold tracking-wide uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-vortex-orange animate-pulse" />
          Busca Inteligente em Minutos
        </div>
      </div>

      {/* Hero Headline & 5-Step Progress Bar */}
      <section className="px-2 pt-2 pb-1 text-left">
        <h1 className="text-2xl font-black text-vortex-navy-900 leading-tight tracking-tight">
          Encontre o médico ideal para você
        </h1>
        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
          Preencha os dados abaixo para recebermos sua solicitação com rapidez e segurança.
        </p>

        {/* 5-Step Segmented Progress Bar */}
        <div className="grid grid-cols-5 gap-1.5 mt-4">
          {[1, 2, 3, 4, 5].map((step) => {
            const isCompletedOrCurrent = step <= activeStep;
            return (
              <div
                key={step}
                className={`h-2 rounded-full transition-all duration-500 ${
                  isCompletedOrCurrent
                    ? 'bg-gradient-to-r from-vortex-orange to-orange-400 shadow-sm'
                    : 'bg-slate-200/90'
                }`}
              />
            );
          })}
        </div>

        {/* Step Counter Label */}
        <div className="flex justify-between items-center text-[11px] font-medium text-slate-500 mt-2">
          <span className="text-slate-700 font-semibold truncate max-w-[220px]">
            {stepLabels[activeStep - 1]}
          </span>
          <span className="font-extrabold text-vortex-orange bg-vortex-orange-50 px-2 py-0.5 rounded-md border border-vortex-orange-100 shrink-0">
            Etapa {activeStep} de 5
          </span>
        </div>
      </section>

      {/* Form Container: Shows ONLY the Current Step Card */}
      <form onSubmit={activeStep === 5 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>
        
        {/* CARD ETAPA 1: Identificação & Localização */}
        {activeStep === 1 && (
          <article 
            key="step-1"
            className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80 space-y-4 animate-slide-up"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                1
              </div>
              <div>
                <h2 className="text-sm font-bold text-vortex-navy-900 uppercase tracking-wider">
                  Sobre Você & Localização
                </h2>
                <p className="text-[11px] text-slate-400">Informe seus dados básicos</p>
              </div>
            </div>

            {/* Input Nome */}
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-700">
                Nome completo <span className="text-vortex-orange">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  autoFocus
                  required
                  value={formData.nome}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, nome: e.target.value }));
                    if (errors.nome) setErrors(prev => ({ ...prev, nome: null }));
                  }}
                  placeholder="Ex: Maria Fernanda Silva"
                  className={`block w-full pl-10 pr-3 py-3 bg-slate-50/70 border ${
                    errors.nome ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-vortex-orange/20 focus:border-vortex-orange'
                  } rounded-xl text-sm placeholder:text-slate-400 text-vortex-navy-900 transition-colors outline-none`}
                />
              </div>
              {errors.nome && <p className="text-xs text-rose-500 font-medium">{errors.nome}</p>}
            </div>

            {/* Input Cidade */}
            <div className="space-y-1 relative">
              <label className="block text-xs font-semibold text-slate-700">
                Cidade / Estado <span className="text-vortex-orange">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.cidade}
                  onChange={handleCityChange}
                  placeholder="Ex: São Paulo - SP"
                  className={`block w-full pl-10 pr-3 py-3 bg-slate-50/70 border ${
                    errors.cidade ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-vortex-orange/20 focus:border-vortex-orange'
                  } rounded-xl text-sm placeholder:text-slate-400 text-vortex-navy-900 transition-colors outline-none`}
                />
              </div>
              {citySuggestions.length > 0 && (
                <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-200 py-1 overflow-hidden">
                  {citySuggestions.map((city, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, cidade: city }));
                        setCitySuggestions([]);
                      }}
                      className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-vortex-orange" />
                      {city}
                    </button>
                  ))}
                </div>
              )}
              {errors.cidade && <p className="text-xs text-rose-500 font-medium">{errors.cidade}</p>}
            </div>

            {/* Step 1 Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-vortex-orange to-[#ff6b4a] hover:from-vortex-orange-600 hover:to-vortex-orange active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-orange-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar para Especialidade</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        )}

        {/* CARD ETAPA 2: Especialidade Médica */}
        {activeStep === 2 && (
          <article 
            key="step-2"
            className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80 space-y-4 animate-slide-up"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                2
              </div>
              <div>
                <h2 className="text-sm font-bold text-vortex-navy-900 uppercase tracking-wider">
                  Especialidade Médica
                </h2>
                <p className="text-[11px] text-slate-400">Qual médico você precisa consultar?</p>
              </div>
            </div>

            <div className="space-y-2 relative">
              <label className="block text-xs font-semibold text-slate-700">
                Qual especialidade procura? <span className="text-vortex-orange">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Stethoscope className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  autoFocus
                  required
                  value={formData.especialidade}
                  onChange={handleSpecialtyChange}
                  placeholder="Ex: Dermatologia, Cardiologia..."
                  className={`block w-full pl-10 pr-3 py-3 bg-slate-50/70 border ${
                    errors.especialidade ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-vortex-orange/20 focus:border-vortex-orange'
                  } rounded-xl text-sm placeholder:text-slate-400 text-vortex-navy-900 transition-colors outline-none`}
                />
              </div>
              {specialtySuggestions.length > 0 && (
                <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-slate-200 py-1 overflow-hidden">
                  {specialtySuggestions.map((spec, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, especialidade: spec }));
                        setSpecialtySuggestions([]);
                      }}
                      className="w-full text-left px-3.5 py-2.5 text-xs hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-vortex-orange" />
                      {spec}
                    </button>
                  ))}
                </div>
              )}
              {errors.especialidade && <p className="text-xs text-rose-500 font-medium">{errors.especialidade}</p>}

              {/* Quick Suggestions Tags */}
              <div className="pt-2">
                <span className="text-[11px] font-semibold text-slate-500 mb-1.5 block">
                  Ou selecione uma sugestão rápida:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {quickSpecialties.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, especialidade: item }));
                        if (errors.especialidade) setErrors(prev => ({ ...prev, especialidade: null }));
                      }}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition active:scale-95 ${
                        formData.especialidade === item
                          ? 'bg-vortex-orange text-white border-vortex-orange shadow-sm'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 2 Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-vortex-orange to-[#ff6b4a] hover:from-vortex-orange-600 hover:to-vortex-orange active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-orange-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar para Prazos e Modalidade</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        )}

        {/* CARD ETAPA 3: Quando e Como */}
        {activeStep === 3 && (
          <article 
            key="step-3"
            className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80 space-y-4 animate-slide-up"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                3
              </div>
              <div>
                <h2 className="text-sm font-bold text-vortex-navy-900 uppercase tracking-wider">
                  Quando e Como
                </h2>
                <p className="text-[11px] text-slate-400">Prazos e formato de atendimento</p>
              </div>
            </div>

            {/* Quando */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Para quando gostaria da consulta?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {timeframeOptions.map((opt) => {
                  const selected = formData.urgencia === opt.id;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, urgencia: opt.id }))}
                      className={`flex flex-col justify-between p-3 h-24 rounded-xl border transition-all text-left cursor-pointer active:scale-95 ${
                        selected 
                          ? 'bg-vortex-navy-900 border-vortex-navy-900 text-white shadow-md' 
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className={`p-1.5 rounded-lg ${selected ? 'bg-white/15 text-vortex-orange' : 'bg-orange-50 text-vortex-orange'}`}>
                          <Icon className="w-4 h-4" />
                        </span>
                        {opt.badge && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tight ${
                            selected ? 'bg-vortex-orange/20 text-vortex-orange-300' : 'bg-vortex-orange/10 text-vortex-orange'
                          }`}>
                            {opt.badge}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="block text-xs font-bold leading-tight">{opt.label}</span>
                        <span className={`text-[10px] ${selected ? 'text-slate-300' : 'text-slate-400'}`}>
                          {opt.sub}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Formato / Modalidade */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Preferência de atendimento:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {modalityOptions.map((mod) => {
                  const selected = formData.modalidade === mod.id;
                  const Icon = mod.icon;
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, modalidade: mod.id }))}
                      className={`flex flex-col items-center justify-center p-2.5 h-20 rounded-xl border text-center transition-all cursor-pointer active:scale-95 ${
                        selected 
                          ? 'bg-vortex-navy-900 border-vortex-navy-900 text-white shadow-md' 
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <span className={`p-1.5 rounded-lg mb-1 ${selected ? 'bg-white/15 text-vortex-orange' : 'bg-slate-50 text-slate-600'}`}>
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="text-xs font-bold block leading-tight">{mod.label}</span>
                      <span className={`text-[9px] ${selected ? 'text-slate-300' : 'text-slate-400'}`}>
                        {mod.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3 Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-vortex-orange to-[#ff6b4a] hover:from-vortex-orange-600 hover:to-vortex-orange active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-orange-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar para Investimento</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        )}

        {/* CARD ETAPA 4: Faixa de Investimento */}
        {activeStep === 4 && (
          <article 
            key="step-4"
            className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80 space-y-4 animate-slide-up"
          >
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <div className="w-7 h-7 rounded-lg bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                4
              </div>
              <div>
                <h2 className="text-sm font-bold text-vortex-navy-900 uppercase tracking-wider">
                  Faixa de Investimento
                </h2>
                <p className="text-[11px] text-slate-400">Qual o seu orçamento aproximado?</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                Quanto pretende gastar aproximadamente?
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {priceOptions.map((val) => {
                  const selected = formData.orcamento === val;
                  return (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, orcamento: val }))}
                      className={`p-3 rounded-xl border text-left font-bold text-xs cursor-pointer active:scale-95 transition-all flex items-center justify-between ${
                        selected 
                          ? 'border-vortex-orange bg-vortex-orange text-white shadow-sm' 
                          : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span>{val}</span>
                      {selected && <CheckCircle2 className="w-4 h-4 text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4 Action */}
            <div className="pt-2">
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-vortex-orange to-[#ff6b4a] hover:from-vortex-orange-600 hover:to-vortex-orange active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-orange-glow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar para Contato WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        )}

        {/* CARD ETAPA 5: Contato Seguro WhatsApp */}
        {activeStep === 5 && (
          <article 
            key="step-5"
            className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80 space-y-4 animate-slide-up"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  5
                </div>
                <div>
                  <h2 className="text-sm font-bold text-vortex-navy-900 uppercase tracking-wider">
                    Contato WhatsApp
                  </h2>
                  <p className="text-[11px] text-slate-400">Para envio das opções</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-slate-700">
                Seu número de WhatsApp <span className="text-vortex-orange">*</span>
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-600">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  autoFocus
                  required
                  value={formData.whatsapp}
                  onChange={handlePhoneChange}
                  maxLength={16}
                  placeholder="(11) 99999-9999"
                  className={`block w-full pl-10 pr-3 py-3 bg-slate-50/70 border ${
                    errors.whatsapp ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500'
                  } rounded-xl text-sm placeholder:text-slate-400 text-vortex-navy-900 transition-colors outline-none font-medium`}
                />
              </div>
              {errors.whatsapp && <p className="text-xs text-rose-500 font-medium">{errors.whatsapp}</p>}

              {/* Privacy Badge */}
              <div className="flex items-start gap-2 bg-slate-50 rounded-xl p-3 border border-slate-100">
                <Lock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-500 leading-tight">
                  Seus dados são 100% confidenciais e utilizados exclusivamente para apresentar as opções de consulta ideais.
                </p>
              </div>
            </div>

            {/* Final CTA Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-vortex-orange to-[#ff6b4a] hover:from-vortex-orange-600 hover:to-vortex-orange active:scale-[0.98] text-white font-bold text-base rounded-2xl shadow-orange-glow transition-all flex items-center justify-center gap-2.5 disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Buscando opções...</span>
                  </div>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Buscar opções disponíveis</span>
                    <ArrowRight className="w-4 h-4 ml-0.5" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-3 mt-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 font-medium text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Sem custo inicial
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-medium text-slate-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  Médicos verificados
                </span>
              </div>
            </div>
          </article>
        )}

      </form>
    </div>
  );
}
