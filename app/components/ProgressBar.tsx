"use client";

import { useKiosk } from '../context/KioskContext';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const { state } = useKiosk();

  // Step labels (excluding welcome and POPIA)
  const steps = [
    'Registration',
    'Medical History',
    'AI Consultation',
    'Vitals',
    'Blood Tests',
    'Diagnosis',
    'Virtual Doctor',
    'Payment',
  ];

  // Adjust for zero-indexed, accounting for Welcome (0) and POPIA (1)
  const adjustedStep = Math.max(0, currentStep - 2);
  const progress = ((adjustedStep + 1) / steps.length) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        {/* Progress Bar */}
        <div className="relative h-2 bg-slate-700 rounded-full overflow-hidden mb-3">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-blue-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = index === adjustedStep;
            const isCompleted = index < adjustedStep;

            return (
              <div
                key={step}
                className={`flex flex-col items-center transition-all duration-300 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/50'
                      : isActive
                      ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/50 animate-pulse'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-[10px] md:text-xs font-medium text-center whitespace-nowrap transition-colors duration-300 ${
                    isActive ? 'text-blue-400' : isCompleted ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
