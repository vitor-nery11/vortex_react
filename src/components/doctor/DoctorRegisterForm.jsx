import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Stethoscope, 
  Building2, 
  DollarSign, 
  Video, 
  CalendarClock, 
  Phone, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  Check
} from 'lucide-react';
import { POPULAR_SPECIALTIES, POPULAR_CITIES, formatPhone } from '../../data/mockData';
import confetti from 'canvas-confetti';

export default function DoctorRegisterForm({ onSubmitSuccess, onBack }) {
  const [formData, setFormData] = useState({
    nome: '',
    cidade: '',
    especialidade: '',
    tipoPerfil: 'Médico', // Médico | Clínica
    interesseNovosPacientes: 'Sim', // Sim | Não
    valorConsulta: '250',
    modalidade: 'ambos', // Presencial | Teleconsulta | Ambos
    temHorariosVagos: 'Sim', // Sim | Às vezes | Não
    whatsapp: '',
    autorizaContato: 'Sim', // Sim | Não
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [specialtySuggestions, setSpecialtySuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);

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

  const validate = () => {
    const newErrors = {};
    if (!formData.nome.trim()) newErrors.nome = 'Por favor, informe seu nome ou nome da clínica';
    if (!formData.cidade.trim()) newErrors.cidade = 'Informe sua cidade de atuação';
    if (!formData.especialidade.trim()) newErrors.especialidade = 'Informe sua especialidade principal';
    if (!formData.valorConsulta.trim()) newErrors.valorConsulta = 'Informe o valor médio da consulta';
    if (!formData.whatsapp.trim() || formData.whatsapp.length < 14) {
      newErrors.whatsapp = 'Informe um WhatsApp de contato válido';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

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
    <div className="w-full max-w-2xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      
      {/* Back button */}
      <div className="mb-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-vortex-navy-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para a apresentação</span>
        </button>
      </div>

      {/* Header Form intro */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-vortex-orange-50 border border-vortex-orange-200 text-vortex-orange-700 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-vortex-orange" />
          <span>Inscrição no Teste Piloto Vortex</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-vortex-navy-900 tracking-tight">
          Formulário de Credenciamento
        </h1>
        <p className="text-slate-600 text-sm mt-1.5">
          Preencha as 10 perguntas rápidas para configurarmos seu perfil de atendimento.
        </p>
      </div>

      {/* Main Form Container */}
      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-slate-200/80 space-y-6 animate-slide-up"
      >
        
        {/* 1. NOME */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-bold text-slate-800">
            1. Nome do Médico(a) ou Responsável <span className="text-vortex-orange">*</span>
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              required
              placeholder="Ex: Dr. Roberto Guimarães"
              value={formData.nome}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, nome: e.target.value }));
                if (errors.nome) setErrors(prev => ({ ...prev, nome: null }));
              }}
              className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border ${
                errors.nome ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-vortex-navy-700 focus:ring-4 focus:ring-vortex-navy-100'
              } text-slate-900 text-sm font-medium transition-all outline-none`}
            />
          </div>
          {errors.nome && <p className="text-xs text-rose-500 font-medium">{errors.nome}</p>}
        </div>

        {/* 2. CIDADE */}
        <div className="space-y-1.5 relative">
          <label className="block text-xs sm:text-sm font-bold text-slate-800">
            2. Cidade de atuação principal <span className="text-vortex-orange">*</span>
          </label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              required
              placeholder="Ex: São Paulo - SP"
              value={formData.cidade}
              onChange={handleCityChange}
              className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border ${
                errors.cidade ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-vortex-navy-700 focus:ring-4 focus:ring-vortex-navy-100'
              } text-slate-900 text-sm font-medium transition-all outline-none`}
            />
          </div>
          {citySuggestions.length > 0 && (
            <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white rounded-2xl shadow-xl border border-slate-200 py-1 overflow-hidden">
              {citySuggestions.map((city, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, cidade: city }));
                    setCitySuggestions([]);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs sm:text-sm hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2"
                >
                  <MapPin className="w-3.5 h-3.5 text-vortex-orange" />
                  {city}
                </button>
              ))}
            </div>
          )}
          {errors.cidade && <p className="text-xs text-rose-500 font-medium">{errors.cidade}</p>}
        </div>

        {/* 3. ESPECIALIDADE */}
        <div className="space-y-1.5 relative">
          <label className="block text-xs sm:text-sm font-bold text-slate-800">
            3. Especialidade médica <span className="text-vortex-orange">*</span>
          </label>
          <div className="relative">
            <Stethoscope className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="text"
              required
              placeholder="Ex: Cardiologia, Dermatologia, Ortopedia..."
              value={formData.especialidade}
              onChange={handleSpecialtyChange}
              className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border ${
                errors.especialidade ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-vortex-navy-700 focus:ring-4 focus:ring-vortex-navy-100'
              } text-slate-900 text-sm font-medium transition-all outline-none`}
            />
          </div>
          {specialtySuggestions.length > 0 && (
            <div className="absolute z-20 left-0 right-0 top-full mt-1 bg-white rounded-2xl shadow-xl border border-slate-200 py-1 overflow-hidden">
              {specialtySuggestions.map((spec, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setFormData(prev => ({ ...prev, especialidade: spec }));
                    setSpecialtySuggestions([]);
                  }}
                  className="w-full text-left px-4 py-2.5 text-xs sm:text-sm hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-2"
                >
                  <Stethoscope className="w-3.5 h-3.5 text-vortex-orange" />
                  {spec}
                </button>
              ))}
            </div>
          )}
          {errors.especialidade && <p className="text-xs text-rose-500 font-medium">{errors.especialidade}</p>}
        </div>

        {/* 4. MÉDICO OU CLÍNICA? */}
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-bold text-slate-800">
            4. Médico ou clínica?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: 'Médico', label: 'Médico(a) Individual', icon: User, desc: 'Consultório próprio ou autônomo' },
              { id: 'Clínica', label: 'Clínica / Consultório', icon: Building2, desc: 'Represento clínica médica' }
            ].map(item => {
              const Icon = item.icon;
              const selected = formData.tipoPerfil === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, tipoPerfil: item.id }))}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    selected 
                      ? 'bg-vortex-navy-900 border-vortex-navy-900 text-white shadow-md' 
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Icon className={`w-5 h-5 ${selected ? 'text-vortex-orange' : 'text-slate-500'}`} />
                    {selected && <Check className="w-4 h-4 text-vortex-orange" />}
                  </div>
                  <div className="mt-2">
                    <p className="font-bold text-xs sm:text-sm">{item.label}</p>
                    <p className={`text-[10px] mt-0.5 ${selected ? 'text-slate-300' : 'text-slate-500'}`}>{item.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. HOJE TEM INTERESSE EM RECEBER NOVOS PACIENTES PARTICULARES? */}
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-bold text-slate-800">
            5. Hoje tem interesse em receber novos pacientes particulares?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['Sim', 'Não'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, interesseNovosPacientes: opt }))}
                className={`py-3 px-4 rounded-2xl border font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  formData.interesseNovosPacientes === opt
                    ? 'bg-vortex-navy-900 border-vortex-navy-900 text-white shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {formData.interesseNovosPacientes === opt && <Check className="w-4 h-4 text-vortex-orange" />}
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 6. VALOR MÉDIO DA CONSULTA */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-bold text-slate-800">
            6. Valor médio da consulta particular (R$) <span className="text-vortex-orange">*</span>
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3.5 top-3.5 w-5 h-5 text-slate-400" />
            <input
              type="number"
              required
              placeholder="Ex: 250"
              value={formData.valorConsulta}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, valorConsulta: e.target.value }));
                if (errors.valorConsulta) setErrors(prev => ({ ...prev, valorConsulta: null }));
              }}
              className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border ${
                errors.valorConsulta ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-vortex-navy-700 focus:ring-4 focus:ring-vortex-navy-100'
              } text-slate-900 text-sm font-medium transition-all outline-none`}
            />
          </div>
          {errors.valorConsulta && <p className="text-xs text-rose-500 font-medium">{errors.valorConsulta}</p>}
        </div>

        {/* 7. PRESENCIAL / TELECONSULTA / AMBOS */}
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-bold text-slate-800">
            7. Presencial / Teleconsulta / Ambos
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'presencial', label: 'Presencial', icon: Building2 },
              { id: 'teleconsulta', label: 'Teleconsulta', icon: Video },
              { id: 'ambos', label: 'Ambos', icon: CheckCircle2 }
            ].map((opt) => {
              const Icon = opt.icon;
              const selected = formData.modalidade === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, modalidade: opt.id }))}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                    selected 
                      ? 'bg-vortex-navy-900 border-vortex-navy-900 text-white shadow-md' 
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${selected ? 'text-vortex-orange' : 'text-slate-500'}`} />
                  <span className="font-bold text-xs capitalize">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 8. EXISTEM HORÁRIOS VAGOS OU CANCELAMENTOS COM ALGUMA FREQUÊNCIA? */}
        <div className="space-y-2">
          <label className="block text-xs sm:text-sm font-bold text-slate-800">
            8. Existem horários vagos ou cancelamentos com alguma frequência?
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {['Sim', 'Às vezes', 'Não'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, temHorariosVagos: opt }))}
                className={`py-3 px-2 rounded-2xl border font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
                  formData.temHorariosVagos === opt
                    ? 'bg-vortex-navy-900 border-vortex-navy-900 text-white shadow-md'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                {formData.temHorariosVagos === opt && <Check className="w-3.5 h-3.5 text-vortex-orange" />}
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 9. WHATSAPP */}
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-bold text-slate-800">
            9. WhatsApp de contato profissional <span className="text-vortex-orange">*</span>
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-3.5 w-5 h-5 text-emerald-500" />
            <input
              type="tel"
              required
              placeholder="(11) 99999-9999"
              value={formData.whatsapp}
              onChange={handlePhoneChange}
              maxLength={16}
              className={`w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border ${
                errors.whatsapp ? 'border-rose-500 ring-2 ring-rose-100' : 'border-slate-200 focus:border-vortex-navy-700 focus:ring-4 focus:ring-vortex-navy-100'
              } text-slate-900 text-sm font-medium transition-all outline-none`}
            />
          </div>
          {errors.whatsapp && <p className="text-xs text-rose-500 font-medium">{errors.whatsapp}</p>}
        </div>

        {/* 10. SE SURGIR UM PACIENTE COMPATÍVEL, PODEMOS ENTRAR EM CONTATO? */}
        <div className="space-y-2 p-4 rounded-2xl bg-vortex-orange-50/70 border border-vortex-orange-200">
          <label className="block text-xs sm:text-sm font-extrabold text-vortex-navy-900">
            10. “Se surgir um paciente compatível, podemos entrar em contato?”
          </label>
          <div className="grid grid-cols-2 gap-3 pt-1">
            {['Sim', 'Não'].map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, autorizaContato: opt }))}
                className={`py-3 px-4 rounded-xl border font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  formData.autorizaContato === opt
                    ? 'bg-vortex-orange border-vortex-orange text-white shadow-md'
                    : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {formData.autorizaContato === opt && <Check className="w-4 h-4 text-white" />}
                <span>{opt}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-vortex-navy-900 hover:bg-vortex-navy-800 active:scale-[0.99] text-white font-extrabold text-base shadow-navy-glow hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-70 cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Enviando credenciamento...</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-vortex-orange" />
                <span>Finalizar Inscrição no Teste Piloto</span>
                <ArrowRight className="w-5 h-5 text-vortex-orange" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
