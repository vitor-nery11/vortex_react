import React, { useState, useEffect } from 'react';
import { Download, X, Share2, PlusSquare, Smartphone, CheckCircle, WifiOff } from 'lucide-react';
import Logo from '../common/Logo';

export default function PwaInstallPrompt({ isOpen, onClose, deferredPrompt, isInstalled }) {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Check iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Check if already in standalone mode
    const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    setIsStandalone(Boolean(isStandaloneMode));

    // Listen to network status
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        if (onClose) onClose();
      }
    }
  };

  return (
    <>
      {/* Offline Toast Banner */}
      {isOffline && (
        <div className="fixed top-16 left-0 right-0 z-50 bg-amber-600 text-white py-2 px-4 text-center text-xs font-medium shadow-md flex items-center justify-center gap-2 animate-slide-up">
          <WifiOff className="w-4 h-4" />
          <span>Modo Offline: Você está sem conexão com a internet. O app continuará disponível.</span>
        </div>
      )}

      {/* Install Modal / Bottom Sheet */}
      {isOpen && !isStandalone && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4 animate-fade-in">
          <div 
            className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-slide-up"
            style={{ maxHeight: '90vh' }}
          >
            {/* Header with Close */}
            <div className="bg-vortex-navy-900 px-6 py-5 text-white flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-vortex-navy-800 p-2 border border-vortex-navy-700 flex items-center justify-center shadow-md">
                  <Logo size="sm" showText={false} />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Instalar Vortex App</h3>
                  <p className="text-xs text-slate-300">Acesso rápido direto no seu celular</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-vortex-navy-800 text-slate-400 hover:text-white transition-colors"
                aria-label="Fechar modal de instalação"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {/* Benefits list */}
              <div className="space-y-2.5">
                <div className="flex items-start gap-3 text-xs text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Acesso instantâneo sem precisar abrir o navegador</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Ocupa menos de 2MB de espaço no seu aparelho</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slate-600">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Experiência ultra-rápida, fluida e segura</span>
                </div>
              </div>

              {/* iOS Instructions */}
              {isIOS ? (
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs text-slate-700 space-y-3">
                  <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-vortex-orange" />
                    Como instalar no iPhone / iPad (Safari):
                  </p>
                  <ol className="space-y-2 pl-1 list-decimal list-inside">
                    <li className="flex items-center gap-2">
                      <span>1. Toque no botão de <strong>Compartilhar</strong></span>
                      <Share2 className="w-4 h-4 text-sky-600 inline" />
                    </li>
                    <li className="flex items-center gap-2">
                      <span>2. Role para baixo e toque em <strong>Adicionar à Tela de Início</strong></span>
                      <PlusSquare className="w-4 h-4 text-slate-800 inline" />
                    </li>
                    <li>
                      <span>3. Toque em <strong>Adicionar</strong> no canto superior direito</span>
                    </li>
                  </ol>
                </div>
              ) : (
                /* Android / Chrome Native Prompt Button */
                <div className="pt-2">
                  {deferredPrompt ? (
                    <button
                      onClick={handleInstallClick}
                      className="w-full py-3.5 px-5 rounded-2xl bg-vortex-orange hover:bg-vortex-orange-600 active:scale-[0.98] text-white font-bold text-sm shadow-orange-glow transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Instalar Aplicativo Agora
                    </button>
                  ) : (
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 text-center">
                      <p className="font-medium text-slate-800 mb-1">Para instalar no seu navegador:</p>
                      <p>Abra o menu do navegador (três pontinhos <strong className="text-slate-900">⋮</strong>) e selecione <strong className="text-slate-900">"Instalar aplicativo"</strong> ou <strong className="text-slate-900">"Adicionar à tela inicial"</strong>.</p>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={onClose}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors"
              >
                Continuar usando pelo navegador
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
