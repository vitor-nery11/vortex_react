import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  MessageSquare, 
  Settings, 
  DollarSign, 
  Video, 
  Building2, 
  ArrowLeft, 
  TrendingUp, 
  Sparkles,
  Phone,
  ShieldCheck,
  Check,
  Radio,
  PauseCircle
} from 'lucide-react';

export default function DoctorDashboard({ doctorInfo, onBackHome }) {
  const [activeTab, setActiveTab] = useState('requests');
  const [isAvailable, setIsAvailable] = useState(true);
  const [teleconsultPrice, setTeleconsultPrice] = useState(doctorInfo?.valorConsulta || '250');
  const [inPersonPrice, setInPersonPrice] = useState(doctorInfo?.valorConsulta || '300');

  // Simulated live incoming patient requests matching the doctor's specialty
  const [patientRequests, setPatientRequests] = useState([
    {
      id: 1,
      name: 'Carla Vasconcelos',
      cidade: doctorInfo?.cidade || 'São Paulo - SP',
      urgencia: 'Hoje / Amanhã',
      modalidade: 'Presencial',
      orcamento: 'R$ 250 - R$ 350',
      whatsapp: '(11) 98721-4412',
      status: 'pending',
      timestamp: 'Há 8 minutos'
    },
    {
      id: 2,
      name: 'Marcelo P. Andrade',
      cidade: doctorInfo?.cidade || 'São Paulo - SP',
      urgencia: 'Até 3 dias',
      modalidade: 'Teleconsulta',
      orcamento: 'R$ 200 - R$ 280',
      whatsapp: '(11) 99123-5561',
      status: 'pending',
      timestamp: 'Há 35 minutos'
    },
    {
      id: 3,
      name: 'Juliana Mendes',
      cidade: doctorInfo?.cidade || 'São Paulo - SP',
      urgencia: 'Até 7 dias',
      modalidade: 'Tanto faz',
      orcamento: 'R$ 250 - R$ 400',
      whatsapp: '(11) 97782-9900',
      status: 'accepted',
      timestamp: 'Ontem às 16:40'
    }
  ]);

  const handleAcceptRequest = (id) => {
    setPatientRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'accepted' } : req
    ));
  };

  const handleDeclineRequest = (id) => {
    setPatientRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'declined' } : req
    ));
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-6 sm:py-8 px-4 sm:px-6 space-y-6">
      
      {/* Top Banner / Doctor Profile Bar */}
      <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-vortex-navy-900 text-white flex items-center justify-center font-extrabold text-xl shadow-md border-2 border-vortex-orange">
            {doctorInfo?.nome ? doctorInfo.nome.charAt(0) : 'D'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-vortex-navy-900">
                {doctorInfo?.nome || 'Dr(a). Médico Parceiro'}
              </h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <Check className="w-3 h-3" /> Piloto Ativo
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {doctorInfo?.especialidade || 'Clínica Geral'} • {doctorInfo?.cidade || 'Brasil'} • Sem Mensalidade
            </p>
          </div>
        </div>

        {/* Status Toggle */}
        <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div className="text-right text-xs">
            <p className="font-bold text-slate-800">Status para novos pacientes</p>
            <div className="flex items-center justify-end">
              {isAvailable ? (
                <span className="inline-flex items-center gap-1.5 text-emerald-600 font-medium">
                  <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  <span>Recebendo solicitações</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-slate-500">
                  <PauseCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Pausado temporariamente</span>
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsAvailable(!isAvailable)}
            className={`w-12 h-7 rounded-full transition-colors relative p-1 cursor-pointer ${
              isAvailable ? 'bg-emerald-500' : 'bg-slate-300'
            }`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${isAvailable ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-500 text-xs font-medium">Solicitações Recebidas</span>
          <p className="text-2xl font-extrabold text-vortex-navy-900">14</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +4 esta semana
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-500 text-xs font-medium">Consultas Confirmadas</span>
          <p className="text-2xl font-extrabold text-emerald-600">9</p>
          <span className="text-[11px] text-slate-500 font-medium">100% particulares</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-500 text-xs font-medium">Economia em Mensalidade</span>
          <p className="text-2xl font-extrabold text-vortex-orange">R$ 0,00</p>
          <span className="text-[11px] text-slate-500 font-medium">Plano Piloto Isento</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-1">
          <span className="text-slate-500 text-xs font-medium">Tempo Médio de Resposta</span>
          <p className="text-2xl font-extrabold text-sky-600">12 min</p>
          <span className="text-[11px] text-slate-500 font-medium">Via WhatsApp</span>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'requests'
              ? 'bg-vortex-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Solicitações de Pacientes ({patientRequests.filter(r => r.status === 'pending').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'settings'
              ? 'bg-vortex-navy-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Configuração de Preços & Agenda</span>
        </button>
      </div>

      {/* Tab: Requests List */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {patientRequests.map((req) => (
            <div 
              key={req.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-slate-900">{req.name}</span>
                  <span className="text-[11px] text-slate-400">• {req.timestamp}</span>
                  {req.status === 'accepted' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700">
                      Aceito
                    </span>
                  )}
                  {req.status === 'declined' && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500">
                      Recusado
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-vortex-orange" />
                    <strong>Urgência:</strong> {req.urgencia}
                  </span>
                  <span className="flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-sky-500" />
                    <strong>Modalidade:</strong> {req.modalidade}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                    <strong>Orçamento:</strong> {req.orcamento}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {req.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleAcceptRequest(req.id)}
                      className="flex-1 md:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" />
                      <span>Aceitar e Abrir WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleDeclineRequest(req.id)}
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                      title="Recusar horário"
                    >
                      <XCircle className="w-4 h-4" />
                    </button>
                  </>
                ) : req.status === 'accepted' ? (
                  <a
                    href={`https://wa.me/55${req.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Abrir Conversa ({req.whatsapp})</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-400 italic">Solicitação dispensada</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-card space-y-6">
          <div>
            <h2 className="text-lg font-bold text-vortex-navy-900">Configurações de Consulta e Autonomia</h2>
            <p className="text-xs text-slate-500">Defina os valores que você deseja cobrar nas consultas particulares pelo Vortex.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Valor da Teleconsulta (R$)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={teleconsultPrice}
                  onChange={(e) => setTeleconsultPrice(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Valor da Consulta Presencial (R$)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={inPersonPrice}
                  onChange={(e) => setInPersonPrice(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => alert('Configurações salvas com sucesso!')}
              className="px-6 py-2.5 rounded-xl bg-vortex-navy-900 hover:bg-vortex-navy-800 text-white font-bold text-xs shadow-md"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      )}

      {/* Back to main home */}
      <div className="text-center pt-4">
        <button
          onClick={onBackHome}
          className="text-xs font-semibold text-slate-500 hover:text-vortex-navy-900 inline-flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Sair do modo de visualização médica e voltar ao início</span>
        </button>
      </div>

    </div>
  );
}
