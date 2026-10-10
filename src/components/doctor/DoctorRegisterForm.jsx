import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { 
  User, 
  MapPin, 
  Stethoscope, 
  Building2, 
  DollarSign, 
  Video, 
  Phone, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Check,
  CalendarClock
} from 'lucide-react';
import { POPULAR_SPECIALTIES, POPULAR_CITIES, formatPhone } from '../../data/mockData';
import confetti from 'canvas-confetti';

const DoctorRegisterForm = forwardRef(function DoctorRegisterForm({ onSubmitSuccess, onBack }, ref) {
  const [activeStep, setActiveStep] = useState(1); // 1, 2, 3, 4, 5

  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    especialidade: '',
    tipoPerfil: 'Médico', // Médico | Clínica
    interesseNovosPacientes: 'Sim', // Sim | Não
    valorConsulta: '250',
    modalidade: 'ambos', // presencial | teleconsulta | ambos
    temHorariosVagos: 'Sim', // Sim | Às vezes | Não
    whatsapp: '',
    autorizaContato: 'Sim', // Sim | Não
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specialtySuggestions, setSpecialtySuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);

  const stepLabels = [
    'Identificação & Perfil',
    'Especialidade Médica',
    'Atendimento & Agenda',
    'Honorários da Consulta',
    'Contato & Confirmação'
  ];

  const quickSpecialties = [
    'Clínico Geral',
    'Cardiologia',
    'Dermatologia',
    'Ortopedia',
    'Ginecologia',
    'Pediatria'
  ];

  const pricePills = ['150', '200', '250', '300', '400'];

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

  // Step validation
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.nome.trim()) newErrors.nome = 'Por favor, informe seu nome ou nome da clínica';
      if (!formData.cidade.trim()) newErrors.cidade = 'Informe sua cidade de atuação';
    } else if (step === 2) {
      if (!formData.especialidade.trim()) newErrors.especialidade = 'Informe sua especialidade principal';
    } else if (step === 4) {
      if (!formData.valorConsulta.trim()) newErrors.valorConsulta = 'Informe o valor médio da consulta';
    } else if (step === 5) {
      if (!formData.whatsapp.trim() || formData.whatsapp.length < 14) {
        newErrors.whatsapp = 'Informe um WhatsApp de contato válido com DDD';
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

  useImperativeHandle(ref, () => ({
    prevStep,
    activeStep
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ED3E1A', '#182D50', '#10B981', '#38BDF8']
      });
    } catch (err) {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(formData);
    }, 700);
  };

  return (
    <div className="w-full max-w-md mx-auto py-2 px-3 sm:px-4 space-y-4 animate-fade-in">
      
      {/* Header & 5-Step Progress Bar */}
      <section className="px-2 pt-2 pb-1 text-left">
        <h1 className="text-2xl font-black text-vortex-navy-900 leading-tight tracking-tight">
          Credenciamento Médico
        </h1>
        <p className="text-slate-600 text-sm mt-1 leading-relaxed">
          Preencha os dados abaixo para configurarmos seu perfil de atendimento.
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

      {/* Main Form: Shows Active Step Card */}
      <form onSubmit={activeStep === 5 ? handleSubmit : (e) => { e.preventDefault(); nextStep(); }}>

        {/* CARD ETAPA 1: Identificação & Perfil */}
        {activeStep === 1 && (
          <article 
            key="step-1"
            className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80 space-y-4 animate-slide-up"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-xs">
                <User className="w-4 h-4 text-vortex-orange" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-vortex-navy-900">1. Identificação & Perfil</h2>
                <p className="text-[11px] text-slate-500">Dados do profissional ou clínica</p>
              </div>
            </div>

            {/* 1. Nome */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Nome do Médico(a) ou Responsável <span className="text-vortex-orange">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Dr. Roberto Guimarães"
                  value={formData.nome}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, nome: e.target.value }));
                    if (errors.nome) setErrors(prev => ({ ...prev, nome: null }));
                  }}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border ${
                    errors.nome ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-vortex-navy-700'
                  } text-slate-900 text-xs font-medium outline-none transition-all`}
                />
              </div>
              {errors.nome && <p className="text-[11px] text-rose-500 font-medium">{errors.nome}</p>}
            </div>

            {/* 2. Cidade */}
            <div className="space-y-1 relative">
              <label className="block text-xs font-bold text-slate-700">
                Cidade de atuação principal <span className="text-vortex-orange">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Ex: São Paulo - SP"
                  value={formData.cidade}
                  onChange={handleCityChange}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border ${
                    errors.cidade ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-vortex-navy-700'
                  } text-slate-900 text-xs font-medium outline-none transition-all`}
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
                      className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2"
                    >
                      <MapPin className="w-3.5 h-3.5 text-vortex-orange" />
                      {city}
                    </button>
                  ))}
                </div>
              )}
              {errors.cidade && <p className="text-[11px] text-rose-500 font-medium">{errors.cidade}</p>}
            </div>

            {/* 4. Médico ou Clínica */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-bold text-slate-700">
                Tipo de Perfil
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: 'Médico', label: 'Médico(a) Individual', icon: User, desc: 'Consultório próprio' },
                  { id: 'Clínica', label: 'Clínica Médica', icon: Building2, desc: 'Represento clínica' }
                ].map(item => {
                  const Icon = item.icon;
                  const selected = formData.tipoPerfil === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tipoPerfil: item.id }))}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        selected 
                          ? 'bg-vortex-navy-900 border-vortex-navy-900 text-white shadow-sm' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Icon className={`w-4 h-4 ${selected ? 'text-vortex-orange' : 'text-slate-500'}`} />
                        {selected && <Check className="w-3.5 h-3.5 text-vortex-orange" />}
                      </div>
                      <div className="mt-1.5">
                        <p className="font-bold text-xs">{item.label}</p>
                        <p className={`text-[10px] ${selected ? 'text-slate-300' : 'text-slate-500'}`}>{item.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3.5 px-4 rounded-xl bg-vortex-navy-900 hover:bg-vortex-navy-800 active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4 text-vortex-orange" />
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
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-xs">
                <Stethoscope className="w-4 h-4 text-vortex-orange" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-vortex-navy-900">2. Especialidade Médica</h2>
                <p className="text-[11px] text-slate-500">Sua área de atuação principal</p>
              </div>
            </div>

            <div className="space-y-1 relative">
              <label className="block text-xs font-bold text-slate-700">
                Especialidade principal <span className="text-vortex-orange">*</span>
              </label>
              <div className="relative">
                <Stethoscope className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="Ex: Cardiologia, Dermatologia..."
                  value={formData.especialidade}
                  onChange={handleSpecialtyChange}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border ${
                    errors.especialidade ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-vortex-navy-700'
                  } text-slate-900 text-xs font-medium outline-none transition-all`}
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
                      className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-vortex-orange" />
                      {spec}
                    </button>
                  ))}
                </div>
              )}
              {errors.especialidade && <p className="text-[11px] text-rose-500 font-medium">{errors.especialidade}</p>}
            </div>

            {/* Quick Specialties */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-500">Especialidades comuns:</span>
              <div className="flex flex-wrap gap-1.5">
                {quickSpecialties.map(spec => (
                  <button
                    key={spec}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, especialidade: spec }))}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                      formData.especialidade === spec
                        ? 'bg-vortex-navy-900 text-white border-vortex-navy-900'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {spec}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3.5 px-4 rounded-xl bg-vortex-navy-900 hover:bg-vortex-navy-800 active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4 text-vortex-orange" />
              </button>
            </div>
          </article>
        )}

        {/* CARD ETAPA 3: Atendimento & Agenda */}
        {activeStep === 3 && (
          <article 
            key="step-3"
            className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80 space-y-4 animate-slide-up"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-xs">
                <CalendarClock className="w-4 h-4 text-vortex-orange" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-vortex-navy-900">3. Atendimento & Agenda</h2>
                <p className="text-[11px] text-slate-500">Modalidade e disponibilidade de horários</p>
              </div>
            </div>

            {/* 7. Modalidade */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Modalidade de atendimento
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'presencial', label: 'Presencial', icon: Building2 },
                  { id: 'teleconsulta', label: 'Online', icon: Video },
                  { id: 'ambos', label: 'Ambos', icon: CheckCircle2 }
                ].map((opt) => {
                  const Icon = opt.icon;
                  const selected = formData.modalidade === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, modalidade: opt.id }))}
                      className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        selected 
                          ? 'bg-vortex-navy-900 border-vortex-navy-900 text-white shadow-sm' 
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${selected ? 'text-vortex-orange' : 'text-slate-500'}`} />
                      <span className="font-bold text-xs">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 8. Horários vagos */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Existem horários vagos ou cancelamentos na agenda?
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Sim', 'Às vezes', 'Não'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, temHorariosVagos: opt }))}
                    className={`py-2.5 px-2 rounded-xl border font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      formData.temHorariosVagos === opt
                        ? 'bg-vortex-navy-900 border-vortex-navy-900 text-white shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {formData.temHorariosVagos === opt && <Check className="w-3.5 h-3.5 text-vortex-orange" />}
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Interesse em novos pacientes */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700">
                Interesse atual em novos pacientes particulares?
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Sim', 'Não'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, interesseNovosPacientes: opt }))}
                    className={`py-2.5 px-3 rounded-xl border font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      formData.interesseNovosPacientes === opt
                        ? 'bg-vortex-navy-900 border-vortex-navy-900 text-white shadow-sm'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    {formData.interesseNovosPacientes === opt && <Check className="w-3.5 h-3.5 text-vortex-orange" />}
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3.5 px-4 rounded-xl bg-vortex-navy-900 hover:bg-vortex-navy-800 active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4 text-vortex-orange" />
              </button>
            </div>
          </article>
        )}

        {/* CARD ETAPA 4: Honorários da Consulta */}
        {activeStep === 4 && (
          <article 
            key="step-4"
            className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80 space-y-4 animate-slide-up"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-xs">
                <DollarSign className="w-4 h-4 text-vortex-orange" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-vortex-navy-900">4. Honorários da Consulta</h2>
                <p className="text-[11px] text-slate-500">Valor médio cobrado por consulta</p>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                Valor médio da consulta particular (R$) <span className="text-vortex-orange">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  required
                  placeholder="Ex: 250"
                  value={formData.valorConsulta}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, valorConsulta: e.target.value }));
                    if (errors.valorConsulta) setErrors(prev => ({ ...prev, valorConsulta: null }));
                  }}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border ${
                    errors.valorConsulta ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-vortex-navy-700'
                  } text-slate-900 text-xs font-medium outline-none transition-all`}
                />
              </div>
              {errors.valorConsulta && <p className="text-[11px] text-rose-500 font-medium">{errors.valorConsulta}</p>}
            </div>

            {/* Quick Price Pills */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-semibold text-slate-500">Sugestões rápidas (R$):</span>
              <div className="flex flex-wrap gap-2">
                {pricePills.map(val => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, valorConsulta: val }));
                      if (errors.valorConsulta) setErrors(prev => ({ ...prev, valorConsulta: null }));
                    }}
                    className={`text-xs px-3 py-1.5 rounded-xl border font-bold transition-all ${
                      formData.valorConsulta === val
                        ? 'bg-vortex-orange text-white border-vortex-orange shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    R$ {val}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              Você mantém autonomia total para alterar ou praticar valores específicos para cada paciente.
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={nextStep}
                className="w-full py-3.5 px-4 rounded-xl bg-vortex-navy-900 hover:bg-vortex-navy-800 active:scale-[0.99] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continuar</span>
                <ArrowRight className="w-4 h-4 text-vortex-orange" />
              </button>
            </div>
          </article>
        )}

        {/* CARD ETAPA 5: Contato & Confirmação */}
        {activeStep === 5 && (
          <article 
            key="step-5"
            className="bg-white rounded-2xl p-5 shadow-card border border-slate-200/80 space-y-4 animate-slide-up"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xl bg-vortex-navy-900 text-white flex items-center justify-center font-bold text-xs">
                <Phone className="w-4 h-4 text-vortex-orange" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-vortex-navy-900">5. Contato & Confirmação</h2>
                <p className="text-[11px] text-slate-500">Canal direto para envio de novos pacientes</p>
              </div>
            </div>

            {/* 9. WhatsApp */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-700">
                WhatsApp de contato profissional <span className="text-vortex-orange">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-emerald-500" />
                <input
                  type="tel"
                  required
                  placeholder="(11) 99999-9999"
                  value={formData.whatsapp}
                  onChange={handlePhoneChange}
                  maxLength={16}
                  className={`w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border ${
                    errors.whatsapp ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-vortex-navy-700'
                  } text-slate-900 text-xs font-medium outline-none transition-all`}
                />
              </div>
              {errors.whatsapp && <p className="text-[11px] text-rose-500 font-medium">{errors.whatsapp}</p>}
            </div>

            {/* 10. Permissão de Contato */}
            <div className="space-y-1.5 p-3 rounded-xl bg-vortex-orange-50/70 border border-vortex-orange-200">
              <label className="block text-xs font-extrabold text-vortex-navy-900">
                “Se surgir um paciente compatível, podemos entrar em contato?”
              </label>
              <div className="grid grid-cols-2 gap-2 pt-1">
                {['Sim', 'Não'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, autorizaContato: opt }))}
                    className={`py-2 px-3 rounded-lg border font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                      formData.autorizaContato === opt
                        ? 'bg-vortex-orange border-vortex-orange text-white shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {formData.autorizaContato === opt && <Check className="w-3.5 h-3.5 text-white" />}
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-4 rounded-xl bg-vortex-navy-900 hover:bg-vortex-navy-800 active:scale-[0.99] text-white font-extrabold text-xs shadow-navy-glow hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Enviando credenciamento...</span>
                  </div>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-vortex-orange" />
                    <span>Finalizar Inscrição no Teste Piloto</span>
                    <ArrowRight className="w-4 h-4 text-vortex-orange" />
                  </>
                )}
              </button>
            </div>
          </article>
        )}

      </form>
    </div>
  );
});

export default DoctorRegisterForm;
