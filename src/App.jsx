import React, { useState, useEffect } from 'react';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RoleSelector from './components/common/RoleSelector';
import PatientForm from './components/patient/PatientForm';
import PatientSuccess from './components/patient/PatientSuccess';
import DoctorLanding from './components/doctor/DoctorLanding';
import DoctorRegisterForm from './components/doctor/DoctorRegisterForm';
import DoctorSuccess from './components/doctor/DoctorSuccess';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import PwaInstallPrompt from './components/pwa/PwaInstallPrompt';
import FaqModal from './components/common/FaqModal';

export default function App() {
  const [currentView, setCurrentView] = useState('selector');
  // 'selector' | 'patient-form' | 'patient-success' | 'doctor-landing' | 'doctor-register' | 'doctor-success' | 'doctor-dashboard'

  const [patientData, setPatientData] = useState(null);
  const [doctorData, setDoctorData] = useState(null);

  // PWA State & Modals
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [isPwaInstalled, setIsPwaInstalled] = useState(false);

  useEffect(() => {
    // Listen for beforeinstallprompt event (Android / Chrome)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setIsPwaInstalled(true);
      setDeferredPrompt(null);
      setIsInstallModalOpen(false);
    };

    // Check if already in standalone mode
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsPwaInstalled(true);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Smooth scroll to top when changing view
  const setView = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handlers for Patient Flow
  const handleSelectRole = (role) => {
    if (role === 'patient') {
      setView('patient-form');
    } else {
      setView('doctor-landing');
    }
  };

  const handlePatientSubmit = (data) => {
    setPatientData(data);
    setView('patient-success');
  };

  const handlePatientReset = () => {
    setView('patient-form');
  };

  // Handlers for Doctor Flow
  const handleStartDoctorRegistration = () => {
    setView('doctor-register');
  };

  const handleDoctorSubmit = (data) => {
    setDoctorData(data);
    setView('doctor-success');
  };

  const handleDoctorLogin = (userData) => {
    setDoctorData(userData);
    setView('doctor-dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-vortex-orange selection:text-white">
      {/* Top Navbar */}
      <Header
        currentView={currentView}
        setView={setView}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        onOpenFaqModal={() => setIsFaqModalOpen(true)}
        isPwaInstalled={isPwaInstalled}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center">
        {currentView === 'selector' && (
          <RoleSelector onSelectRole={handleSelectRole} />
        )}

        {/* --- FLUXO PACIENTE --- */}
        {currentView === 'patient-form' && (
          <PatientForm
            onSubmitSuccess={handlePatientSubmit}
            onBack={() => setView('selector')}
          />
        )}

        {currentView === 'patient-success' && (
          <PatientSuccess
            data={patientData}
            onReset={handlePatientReset}
            onBackHome={() => setView('selector')}
          />
        )}

        {/* --- FLUXO MÉDICO --- */}
        {currentView === 'doctor-landing' && (
          <DoctorLanding
            onStartTestRegistration={handleStartDoctorRegistration}
            onLoginSuccess={handleDoctorLogin}
          />
        )}

        {currentView === 'doctor-register' && (
          <DoctorRegisterForm
            onSubmitSuccess={handleDoctorSubmit}
            onBack={() => setView('doctor-landing')}
          />
        )}

        {currentView === 'doctor-success' && (
          <DoctorSuccess
            data={doctorData}
            onOpenDashboard={() => setView('doctor-dashboard')}
            onBackHome={() => setView('selector')}
          />
        )}

        {currentView === 'doctor-dashboard' && (
          <DoctorDashboard
            doctorInfo={doctorData}
            onBackHome={() => setView('selector')}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setView={setView} />

      {/* PWA Installation Guidance Modal */}
      <PwaInstallPrompt
        isOpen={isInstallModalOpen}
        onClose={() => setIsInstallModalOpen(false)}
        deferredPrompt={deferredPrompt}
        isInstalled={isPwaInstalled}
      />

      {/* FAQ Modal */}
      <FaqModal
        isOpen={isFaqModalOpen}
        onClose={() => setIsFaqModalOpen(false)}
        onOpenInstallApp={() => setIsInstallModalOpen(true)}
      />
    </div>
  );
}
