"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'af';

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
  symptoms: string;
  chatHistory: ChatMessage[];
  vitals: VitalsData;
  bloodTests: BloodTest[];
  diagnosis: string;
  recommendations: string[];
  usedVirtualDoctor: boolean;
  consultationDuration: number;
}

interface KioskContextType {
  state: KioskState;
  setLanguage: (lang: Language) => void;
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

const initialState: KioskState = {
  currentStep: 0,
  language: 'en',
  symptoms: '',
  chatHistory: [],
  vitals: {},
  bloodTests: initialBloodTests,
  diagnosis: '',
  recommendations: [],
  usedVirtualDoctor: false,
  consultationDuration: 0,
};

const KioskContext = createContext<KioskContextType | undefined>(undefined);

export function KioskProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<KioskState>(initialState);

  const setLanguage = (lang: Language) => {
    setState(prev => ({ ...prev, language: lang }));
  };

  const nextStep = () => {
    setState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const prevStep = () => {
    setState(prev => ({ ...prev, currentStep: Math.max(0, prev.currentStep - 1) }));
  };

  const setStep = (step: number) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const addChatMessage = (message: ChatMessage) => {
    setState(prev => ({
      ...prev,
      chatHistory: [...prev.chatHistory, message],
    }));
  };

  const updateVitals = (vitals: Partial<VitalsData>) => {
    setState(prev => ({
      ...prev,
      vitals: { ...prev.vitals, ...vitals },
    }));
  };

  const toggleBloodTest = (testId: string) => {
    setState(prev => ({
      ...prev,
      bloodTests: prev.bloodTests.map(test =>
        test.id === testId ? { ...test, selected: !test.selected } : test
      ),
    }));
  };

  const updateBloodTestResult = (testId: string, result: string) => {
    setState(prev => ({
      ...prev,
      bloodTests: prev.bloodTests.map(test =>
        test.id === testId ? { ...test, result } : test
      ),
    }));
  };

  const setDiagnosis = (diagnosis: string, recommendations: string[]) => {
    setState(prev => ({ ...prev, diagnosis, recommendations }));
  };

  const startVirtualDoctor = () => {
    setState(prev => ({ ...prev, usedVirtualDoctor: true }));
  };

  const updateConsultationDuration = (duration: number) => {
    setState(prev => ({ ...prev, consultationDuration: duration }));
  };

  const resetKiosk = () => {
    setState({ ...initialState, bloodTests: initialBloodTests });
  };

  return (
    <KioskContext.Provider
      value={{
        state,
        setLanguage,
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
      }}
    >
      {children}
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
