import React, { useState, useRef, useEffect } from 'react';
import Logo from './Logo';
import { User, Stethoscope, Download, HelpCircle, Menu, X, Smartphone, ShieldCheck } from 'lucide-react';

export default function Header({ currentView, setView, onOpenInstallModal, onOpenFaqModal, isPwaInstalled }) {
  const isHome = currentView === 'selector';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close popup menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full bg-vortex-navy-900/95 backdrop-blur-md border-b border-vortex-navy-700/60 transition-all duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-3">
          <Logo 
            size="sm" 
            variant="dark" 
            onClick={() => setView('selector')} 
            className="cursor-pointer"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Quick Role Switcher Pill */}
          {currentView.startsWith('patient') && (
            <button
              onClick={() => setView('doctor-landing')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-vortex-navy-800 hover:bg-vortex-navy-700 border border-vortex-navy-600 transition-colors cursor-pointer"
            >
              <Stethoscope className="w-3.5 h-3.5 text-vortex-orange" />
              <span className="hidden sm:inline">Área do Médico</span>
              <span className="sm:hidden">Médico</span>
            </button>
          )}

          {currentView.startsWith('doctor') && (
            <button
              onClick={() => setView('patient-form')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-vortex-navy-800 hover:bg-vortex-navy-700 border border-vortex-navy-600 transition-colors cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Buscar Médico</span>
              <span className="sm:hidden">Paciente</span>
            </button>
          )}

          {isHome && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 mr-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Conexão Segura & LGPD</span>
            </div>
          )}

          {/* POPUP MENU BUTTON */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                isMenuOpen
                  ? 'bg-vortex-orange text-white border-vortex-orange shadow-orange-glow'
                  : 'bg-vortex-navy-800 text-slate-200 border-vortex-navy-700 hover:text-white hover:bg-vortex-navy-700'
              }`}
              title="Menu de opções"
              aria-label="Abrir menu de opções"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* FLOATING POPUP MENU */}
            {isMenuOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 text-slate-800 animate-slide-up overflow-hidden"
              >
                <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Opções do Vortex
                </div>

                {/* Opção 1: Baixar Aplicativo */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (onOpenInstallModal) onOpenInstallModal();
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-slate-800 hover:text-vortex-orange cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-vortex-orange-50 text-vortex-orange flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block leading-snug">Baixar Aplicativo</span>
                    <span className="block text-[10px] font-normal text-slate-400">Instalar no celular ou PC</span>
                  </div>
                </button>

                {/* Opção 2: FAQ */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    if (onOpenFaqModal) onOpenFaqModal();
                  }}
                  className="w-full text-left px-3.5 py-2.5 text-xs font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2.5 text-slate-800 hover:text-sky-600 cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block leading-snug">Dúvidas Frequentes (FAQ)</span>
                    <span className="block text-[10px] font-normal text-slate-400">Como funciona o sistema</span>
                  </div>
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
