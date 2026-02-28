"use client";

import { useKiosk } from '../context/KioskContext';
import { useTranslation } from '../i18n/translations';

export default function POPIAScreen() {
  const { state, acceptPOPIA, nextStep, prevStep, updateActivity } = useKiosk();
  const t = useTranslation(state.language);

  const handleAccept = () => {
    acceptPOPIA();
    nextStep();
  };

  const handleDecline = () => {
    prevStep();
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 md:p-8">
      <div className="max-w-4xl w-full space-y-8 animate-slide-in" onMouseMove={updateActivity} onTouchStart={updateActivity}>
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            {t.popiaTitle}
          </h1>
        </div>

        {/* POPIA Content */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/30 rounded-2xl p-6 md:p-8 shadow-2xl shadow-blue-500/20">
          <div className="prose prose-invert max-w-none">
            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
              {t.popiaContent}
            </p>
          </div>

          {/* Key Points */}
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm md:text-base text-slate-300">Your data is stored securely and kept confidential</span>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm md:text-base text-slate-300">No sharing with third parties without your consent</span>
            </div>
            <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <svg className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-sm md:text-base text-slate-300">You can request access, correction, or deletion at any time</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleDecline}
            className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold py-5 md:py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-slate-600 active:scale-95"
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-5 md:py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30 active:scale-95"
          >
            {t.acceptTerms}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
