import React from 'react';
import Logo from './Logo';

export default function Footer({ setView }) {
  return (
    <footer className="w-full bg-vortex-navy-950 text-slate-400 border-t border-vortex-navy-800/80 py-6 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Bottom copyright & quick links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Logo size="xs" variant="dark" />
            <span className="text-slate-500">| © {new Date().getFullYear()} Vortex Saúde Brasil. Todos os direitos reservados.</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button onClick={() => setView('patient-form')} className="hover:text-vortex-orange transition-colors">
              Buscar Consulta
            </button>
            <span>•</span>
            <button onClick={() => setView('doctor-landing')} className="hover:text-vortex-orange transition-colors">
              Sou Médico / Clínica
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
