"use client";

import { KioskProvider, useKiosk } from './context/KioskContext';
import WelcomeScreen from './components/WelcomeScreen';
import POPIAScreen from './components/POPIAScreen';
import RegistrationScreen from './components/RegistrationScreen';
import MedicalHistoryWizard from './components/MedicalHistoryWizard';
import ChatScreen from './components/ChatScreen';
import VitalsScreen from './components/VitalsScreen';
import BloodTestsScreen from './components/BloodTestsScreen';
import DiagnosisScreen from './components/DiagnosisScreen';
import VirtualDoctorScreen from './components/VirtualDoctorScreen';
import PaymentScreen from './components/PaymentScreen';
import ProgressBar from './components/ProgressBar';

function KioskContent() {
  const { state } = useKiosk();

  const screens = [
    <WelcomeScreen key="welcome" />,
    <POPIAScreen key="popia" />,
    <RegistrationScreen key="registration" />,
    <MedicalHistoryWizard key="medical-history" />,
    <ChatScreen key="chat" />,
    <VitalsScreen key="vitals" />,
    <BloodTestsScreen key="blood-tests" />,
    <DiagnosisScreen key="diagnosis" />,
    <VirtualDoctorScreen key="virtual-doctor" />,
    <PaymentScreen key="payment" />,
  ];

  // Show progress bar after welcome screen and before payment
  const showProgressBar = state.currentStep > 0 && state.currentStep < screens.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white">
      {showProgressBar && (
        <ProgressBar 
          currentStep={state.currentStep} 
          totalSteps={screens.length - 2} 
        />
      )}
      <main className="h-screen overflow-hidden">
        {screens[state.currentStep]}
      </main>
      <footer className="fixed bottom-0 left-0 right-0 bg-slate-900/50 backdrop-blur-sm py-2 text-center text-xs text-slate-400 z-10">
        Powered by <span className="text-emerald-400 font-semibold">Ripple Labs</span>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <KioskProvider>
      <KioskContent />
    </KioskProvider>
  );
}
