"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language } from '../i18n/translations';

export interface RegistrationData {
  fullName: string;
  idPassport: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other' | '';
  contactNumber: string;
  emailAddress: string;
}

export interface MedicalConditions {
  diabetes: boolean;
  hypertension: boolean;
  asthma: boolean;
  heartDisease: boolean;
  epilepsy: boolean;
  arthritis: boolean;
  depression: boolean;
  cancer: boolean;
  hivAids: boolean;
  tuberculosis: boolean;
  none: boolean;
  other: string;
}

export interface MedicationsAllergies {
  currentMedications: string;
  noMedications: boolean;
  drugAllergies: string;
  noDrugAllergies: boolean;
  foodAllergies: string;
  noFoodAllergies: boolean;
}

export interface SurgicalHistory {
  surgeries: string;
  noSurgeries: boolean;
}

export interface FamilyHistory {
  heartDisease: boolean;
  diabetes: boolean;
  cancer: boolean;
  hypertension: boolean;
  stroke: boolean;
  mentalHealth: boolean;
  none: boolean;
}

export interface Lifestyle {
  smoking: 'never' | 'former' | 'current' | '';
  alcohol: 'never' | 'social' | 'regular' | 'heavy' | '';
  exercise: 'sedentary' | 'light' | 'moderate' | 'active' | '';
}

export interface MedicalHistory {
  conditions: MedicalConditions;
  medicationsAllergies: MedicationsAllergies;
  surgicalHistory: SurgicalHistory;
  familyHistory: FamilyHistory;
  lifestyle: Lifestyle;
}

export interface VitalsData {
  bloodPressure?: { systolic: number; diastolic: number };
  temperature?: number;
  weight?: number;
  height?: number;
}

export interface BloodTest {
  id: string;
  name: string;
  price: number;
  selected: boolean;
  result?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface KioskState {
  currentStep: number;
  language: Language;
  popiaAccepted: boolean;
  registration: RegistrationData;
  medicalHistory: MedicalHistory;
  medicalHistoryStep: number;
  symptoms: string;
  chatHistory: ChatMessage[];
  vitals: VitalsData;
  bloodTests: BloodTest[];
  diagnosis: string;
  recommendations: string[];
  usedVirtualDoctor: boolean;
  consultationDuration: number;
  lastActivityTime: number;
}

interface KioskContextType {
  state: KioskState;
  setLanguage: (lang: Language) => void;
  acceptPOPIA: () => void;
  updateRegistration: (data: Partial<RegistrationData>) => void;
  updateMedicalConditions: (conditions: Partial<MedicalConditions>) => void;
  updateMedicationsAllergies: (data: Partial<MedicationsAllergies>) => void;
  updateSurgicalHistory: (data: Partial<SurgicalHistory>) => void;
  updateFamilyHistory: (history: Partial<FamilyHistory>) => void;
  updateLifestyle: (lifestyle: Partial<Lifestyle>) => void;
  setMedicalHistoryStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  addChatMessage: (message: ChatMessage) => void;
  updateVitals: (vitals: Partial<VitalsData>) => void;
  toggleBloodTest: (testId: string) => void;
  updateBloodTestResult: (testId: string, result: string) => void;
  setDiagnosis: (diagnosis: string, recommendations: string[]) => void;
  startVirtualDoctor: () => void;
  updateConsultationDuration: (duration: number) => void;
  resetKiosk: () => void;
  updateActivity: () => void;
}

const initialBloodTests: BloodTest[] = [
  { id: 'glucose', name: 'Glucose (finger prick)', price: 150, selected: false },
  { id: 'cholesterol', name: 'Cholesterol Panel', price: 250, selected: false },
  { id: 'hba1c', name: 'HbA1c (Diabetes)', price: 200, selected: false },
  { id: 'crp', name: 'CRP (Inflammation)', price: 180, selected: false },
  { id: 'cbc', name: 'CBC (Full Blood Count)', price: 300, selected: false },
  { id: 'thyroid', name: 'Thyroid (TSH)', price: 280, selected: false },
  { id: 'vitaminD', name: 'Vitamin D', price: 220, selected: false },
  { id: 'hiv', name: 'HIV Rapid Test', price: 150, selected: false },
];

const initialMedicalHistory: MedicalHistory = {
  conditions: {
    diabetes: false,
    hypertension: false,
    asthma: false,
    heartDisease: false,
    epilepsy: false,
    arthritis: false,
    depression: false,
    cancer: false,
    hivAids: false,
    tuberculosis: false,
    none: false,
    other: '',
  },
  medicationsAllergies: {
    currentMedications: '',
    noMedications: false,
    drugAllergies: '',
    noDrugAllergies: false,
    foodAllergies: '',
    noFoodAllergies: false,
  },
  surgicalHistory: {
    surgeries: '',
    noSurgeries: false,
  },
  familyHistory: {
    heartDisease: false,
    diabetes: false,
    cancer: false,
    hypertension: false,
    stroke: false,
    mentalHealth: false,
    none: false,
  },
  lifestyle: {
    smoking: '',
    alcohol: '',
    exercise: '',
  },
};

const initialState: KioskState = {
  currentStep: 0,
  language: 'en',
  popiaAccepted: false,
  registration: {
    fullName: '',
    idPassport: '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    emailAddress: '',
  },
  medicalHistory: initialMedicalHistory,
  medicalHistoryStep: 0,
  symptoms: '',
  chatHistory: [],
  vitals: {},
  bloodTests: initialBloodTests,
  diagnosis: '',
  recommendations: [],
  usedVirtualDoctor: false,
  consultationDuration: 0,
  lastActivityTime: Date.now(),
};

const KioskContext = createContext<KioskContextType | undefined>(undefined);

const SESSION_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const WARNING_BEFORE_TIMEOUT_MS = 2 * 60 * 1000; // 2 minutes before timeout

export function KioskProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<KioskState>(initialState);
  const [showTimeoutWarning, setShowTimeoutWarning] = useState(false);

  // Session timeout management
  useEffect(() => {
    const checkTimeout = setInterval(() => {
      const timeSinceActivity = Date.now() - state.lastActivityTime;
      
      if (timeSinceActivity >= SESSION_TIMEOUT_MS) {
        // Session expired - reset to start
        setState({ ...initialState, bloodTests: initialBloodTests, lastActivityTime: Date.now() });
        setShowTimeoutWarning(false);
      } else if (timeSinceActivity >= SESSION_TIMEOUT_MS - WARNING_BEFORE_TIMEOUT_MS && !showTimeoutWarning) {
        // Show warning
        setShowTimeoutWarning(true);
      }
    }, 1000);

    return () => clearInterval(checkTimeout);
  }, [state.lastActivityTime, showTimeoutWarning]);

  const updateActivity = () => {
    setState(prev => ({ ...prev, lastActivityTime: Date.now() }));
    setShowTimeoutWarning(false);
  };

  const setLanguage = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
    updateActivity();
  };

  const acceptPOPIA = () => {
    setState(prev => ({ ...prev, popiaAccepted: true }));
    updateActivity();
  };

  const updateRegistration = (data: Partial<RegistrationData>) => {
    setState(prev => ({
      ...prev,
      registration: { ...prev.registration, ...data },
    }));
    updateActivity();
  };

  const updateMedicalConditions = (conditions: Partial<MedicalConditions>) => {
    setState(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        conditions: { ...prev.medicalHistory.conditions, ...conditions },
      },
    }));
    updateActivity();
  };

  const updateMedicationsAllergies = (data: Partial<MedicationsAllergies>) => {
    setState(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        medicationsAllergies: { ...prev.medicalHistory.medicationsAllergies, ...data },
      },
    }));
    updateActivity();
  };

  const updateSurgicalHistory = (data: Partial<SurgicalHistory>) => {
    setState(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        surgicalHistory: { ...prev.medicalHistory.surgicalHistory, ...data },
      },
    }));
    updateActivity();
  };

  const updateFamilyHistory = (history: Partial<FamilyHistory>) => {
    setState(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        familyHistory: { ...prev.medicalHistory.familyHistory, ...history },
      },
    }));
    updateActivity();
  };

  const updateLifestyle = (lifestyle: Partial<Lifestyle>) => {
    setState(prev => ({
      ...prev,
      medicalHistory: {
        ...prev.medicalHistory,
        lifestyle: { ...prev.medicalHistory.lifestyle, ...lifestyle },
      },
    }));
    updateActivity();
  };

  const setMedicalHistoryStep = (step: number) => {
    setState(prev => ({ ...prev, medicalHistoryStep: step }));
    updateActivity();
  };

  const nextStep = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    updateActivity();
  };

  const prevStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }));
    updateActivity();
  };

  const setStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
    updateActivity();
  };

  const addChatMessage = (message: ChatMessage) => {
    setState(prev => ({
      ...prev,
      chatHistory: [...prev.chatHistory, message],
    }));
    updateActivity();
  };

  const updateVitals = (vitals: Partial<VitalsData>) => {
    setState(prev => ({
      ...prev,
      vitals: { ...prev.vitals, ...vitals },
    }));
    updateActivity();
  };

  const toggleBloodTest = (testId: string) => {
    setState(prev => ({
      ...prev,
      bloodTests: prev.bloodTests.map(test =>
        test.id === testId ? { ...test, selected: !test.selected } : test
      ),
    }));
    updateActivity();
  };

  const updateBloodTestResult = (testId: string, result: string) => {
    setState(prev => ({
      ...prev,
      bloodTests: prev.bloodTests.map(test =>
        test.id === testId ? { ...test, result } : test
      ),
    }));
    updateActivity();
  };

  const setDiagnosis = (diagnosis: string, recommendations: string[]) => {
    setState(prev => ({ ...prev, diagnosis, recommendations }));
    updateActivity();
  };

  const startVirtualDoctor = () => {
    setState(prev => ({ ...prev, usedVirtualDoctor: true }));
    updateActivity();
  };

  const updateConsultationDuration = (duration: number) => {
    setState(prev => ({ ...prev, consultationDuration: duration }));
    updateActivity();
  };

  const resetKiosk = () => {
    setState({ ...initialState, bloodTests: initialBloodTests, lastActivityTime: Date.now() });
    setShowTimeoutWarning(false);
  };

  return (
    <KioskContext.Provider
      value={{
        state,
        setLanguage,
        acceptPOPIA,
        updateRegistration,
        updateMedicalConditions,
        updateMedicationsAllergies,
        updateSurgicalHistory,
        updateFamilyHistory,
        updateLifestyle,
        setMedicalHistoryStep,
        nextStep,
        prevStep,
        setStep,
        addChatMessage,
        updateVitals,
        toggleBloodTest,
        updateBloodTestResult,
        setDiagnosis,
        startVirtualDoctor,
        updateConsultationDuration,
        resetKiosk,
        updateActivity,
      }}
    >
      {children}
      {showTimeoutWarning && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-yellow-500/50 rounded-2xl p-8 max-w-md mx-4 shadow-2xl shadow-yellow-500/20">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-yellow-400">Session Timeout Warning</h3>
            </div>
            <p className="text-slate-300 mb-6">
              Your session will expire in 2 minutes due to inactivity. Please interact with the screen to continue.
            </p>
            <button
              onClick={updateActivity}
              className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30"
            >
              Continue Session
            </button>
          </div>
        </div>
      )}
    </KioskContext.Provider>
  );
}

export function useKiosk() {
  const context = useContext(KioskContext);
  if (!context) {
    throw new Error('useKiosk must be used within KioskProvider');
  }
  return context;
}
