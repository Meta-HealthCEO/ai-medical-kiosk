"use client";

import { useKiosk } from '../context/KioskContext';
import { Language, languageNames, languageFlags, useTranslation } from '../i18n/translations';

export default function WelcomeScreen() {
  const { setLanguage, nextStep } = useKiosk();

  const handleStart = (lang: Language) => {
    setLanguage(lang);
    nextStep();
  };

  const languages: Language[] = ['en', 'af', 'zu', 'xh', 'st', 'tn', 'nso', 'ts', 'ss', 've', 'nr'];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 md:p-8 text-center overflow-y-auto">
      <div className="max-w-6xl w-full space-y-8 md:space-y-12 animate-fade-in py-8">
        {/* Logo/Header */}
        <div className="space-y-4">
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50">
            <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            AI Medical Kiosk
          </h1>
          <p className="text-lg md:text-xl text-slate-300">
            Your 24/7 Self-Service Health Consultation
          </p>
        </div>

        {/* Language Selection */}
        <div className="space-y-6">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-200">
            Select Your Language / Khetha Ulimi Lwakho
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => handleStart(lang)}
                className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 hover:from-emerald-600 hover:to-emerald-700 border-2 border-emerald-500/30 hover:border-emerald-400 rounded-xl md:rounded-2xl p-6 md:p-8 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50 active:scale-95"
              >
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl mb-2 md:mb-3">{languageFlags[lang]}</div>
                  <div className="text-lg md:text-xl font-bold mb-1 md:mb-2">{languageNames[lang]}</div>
                  <div className="text-xs md:text-sm text-slate-400 group-hover:text-emerald-100">
                    {lang === 'en' ? 'Start' : lang === 'af' ? 'Begin' : 'Qala'}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-600/0 group-hover:from-emerald-500/20 group-hover:to-emerald-600/20 transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 text-xs md:text-sm">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-slate-700/50">
            <div className="text-emerald-400 font-bold mb-1">Fast</div>
            <div className="text-slate-400">15-minute consultation</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-slate-700/50">
            <div className="text-emerald-400 font-bold mb-1">Private</div>
            <div className="text-slate-400">Confidential & secure</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-slate-700/50">
            <div className="text-emerald-400 font-bold mb-1">Professional</div>
            <div className="text-slate-400">AI + Real doctors</div>
          </div>
        </div>
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
