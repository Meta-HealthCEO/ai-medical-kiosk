"use client";

import { useEffect, useState } from 'react';
import { useKiosk } from '../context/KioskContext';

interface DiagnosisResult {
  condition: string;
  likelihood: number;
  description: string;
}

export default function DiagnosisScreen() {
  const { state, setDiagnosis, nextStep } = useKiosk();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [diagnoses, setDiagnoses] = useState<DiagnosisResult[]>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      const mockDiagnoses: DiagnosisResult[] = [
        {
          condition: state.language === 'en' ? 'Upper Respiratory Tract Infection' : 'Boonste Lugweginfeksie',
          likelihood: 85,
          description: state.language === 'en'
            ? 'Common viral infection affecting the nose, throat, and airways'
            : 'Algemene virale infeksie wat die neus, keel en lugweë affekteer',
        },
        {
          condition: state.language === 'en' ? 'Seasonal Allergies' : 'Seisoenale Allergieë',
          likelihood: 60,
          description: state.language === 'en'
            ? 'Allergic reaction to environmental triggers'
            : 'Allergiese reaksie op omgewingsoorsake',
        },
        {
          condition: state.language === 'en' ? 'Mild Dehydration' : 'Ligte Dehidrasie',
          likelihood: 40,
          description: state.language === 'en'
            ? 'Insufficient fluid intake'
            : 'Onvoldoende vloeistof inname',
        },
      ];

      const mockRecommendations = state.language === 'en' ? [
        'Rest and stay hydrated (2-3 liters of water daily)',
        'Over-the-counter pain relievers for discomfort',
        'Monitor temperature - seek immediate care if fever exceeds 39°C',
        'Antihistamines may help with allergy symptoms',
        'Follow up with a doctor if symptoms persist beyond 7 days',
      ] : [
        'Rus en bly gehidrateer (2-3 liter water daagliks)',
        'Oor-die-toonbank pynstillers vir ongemak',
        'Monitor temperatuur - soek onmiddellike hulp as koors 39°C oorskry',
        'Antihistamiene kan help met allergie simptome',
        'Volg op met \'n dokter as simptome langer as 7 dae aanhou',
      ];

      setDiagnoses(mockDiagnoses);
      setRecommendations(mockRecommendations);
      setDiagnosis(mockDiagnoses[0].condition, mockRecommendations);
      setIsAnalyzing(false);
    }, 3000);
  }, []);

  const getUrgencyLevel = () => {
    const topLikelihood = diagnoses[0]?.likelihood || 0;
    if (topLikelihood > 80) return { level: state.language === 'en' ? 'Low' : 'Laag', color: 'emerald' };
    if (topLikelihood > 60) return { level: state.language === 'en' ? 'Medium' : 'Medium', color: 'yellow' };
    return { level: state.language === 'en' ? 'High' : 'Hoog', color: 'red' };
  };

  const urgency = getUrgencyLevel();

  return (
    <div className="flex flex-col h-screen pt-20 pb-20 p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            {state.language === 'en' ? 'AI Analysis & Diagnosis' : 'KI Analise & Diagnose'}
          </h1>
          <p className="text-slate-400">
            {state.language === 'en' 
              ? 'Based on your symptoms, vitals, and test results'
              : 'Gebaseer op jou simptome, vitale tekens en toetsresultate'}
          </p>
        </div>

        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-6">
            <div className="relative">
              <div className="w-32 h-32 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {state.language === 'en' ? 'Analyzing Your Data...' : 'Ontleed Jou Data...'}
              </h3>
              <p className="text-slate-400">
                {state.language === 'en' ? 'Our AI is processing your information' : 'Ons KI verwerk jou inligting'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            {/* Urgency indicator */}
            <div className={`bg-${urgency.color}-900/30 border border-${urgency.color}-500/30 rounded-xl p-6`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full bg-${urgency.color}-500/20 flex items-center justify-center`}>
                    <svg className={`w-8 h-8 text-${urgency.color}-400`} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {state.language === 'en' ? 'Urgency Level' : 'Dringendheid Vlak'}
                    </h3>
                    <p className={`text-2xl font-bold text-${urgency.color}-400`}>{urgency.level}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Differential diagnoses */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                {state.language === 'en' ? 'Possible Conditions' : 'Moontlike Toestande'}
              </h2>
              {diagnoses.map((diagnosis, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{diagnosis.condition}</h3>
                      <p className="text-slate-400">{diagnosis.description}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-3xl font-bold text-emerald-400">{diagnosis.likelihood}%</div>
                      <div className="text-xs text-slate-500">
                        {state.language === 'en' ? 'Likelihood' : 'Waarskynlikheid'}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${diagnosis.likelihood}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-blue-900/30 to-slate-900 rounded-xl p-6 border border-blue-500/30">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {state.language === 'en' ? 'Recommendations' : 'Aanbevelings'}
              </h2>
              <ul className="space-y-3">
                {recommendations.map((rec, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-200">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <svg className="w-8 h-8 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-1">
                    {state.language === 'en' ? 'Important Notice' : 'Belangrike Kennisgewing'}
                  </h3>
                  <p className="text-slate-300">
                    {state.language === 'en'
                      ? 'This is not a final diagnosis. It is an AI-generated assessment based on the information provided. Please consult with a healthcare professional for confirmation and treatment.'
                      : 'Dit is nie \'n finale diagnose nie. Dit is \'n KI-gegenereerde assessering gebaseer op die inligting verskaf. Raadpleeg asseblief \'n gesondheidsorgprofessional vir bevestiging en behandeling.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={nextStep}
                className="px-8 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xl rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/50"
              >
                {state.language === 'en' ? 'Connect with Doctor' : 'Verbind met Dokter'}
              </button>
              <button
                onClick={() => nextStep() && nextStep()}
                className="px-8 py-6 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white text-xl rounded-xl font-semibold transition-all duration-300"
              >
                {state.language === 'en' ? 'Skip to Payment' : 'Slaan oor na Betaling'}
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
