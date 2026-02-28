"use client";

import { useKiosk, Language } from '../context/KioskContext';

export default function WelcomeScreen() {
  const { setLanguage, nextStep } = useKiosk();

  const handleStart = (lang: Language) => {
    setLanguage(lang);
    nextStep();
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
      <div className="max-w-2xl w-full space-y-12 animate-fade-in">
        {/* Logo/Header */}
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            AI Medical Kiosk
          </h1>
          <p className="text-xl text-slate-300">
            Your 24/7 Self-Service Health Consultation
          </p>
        </div>

        {/* Language Selection */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-200">Select Your Language</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() => handleStart('en')}
              className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 hover:from-emerald-600 hover:to-emerald-700 border-2 border-emerald-500/30 hover:border-emerald-400 rounded-2xl p-12 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50"
            >
              <div className="relative z-10">
                <div className="text-6xl mb-4">🇬🇧</div>
                <div className="text-3xl font-bold mb-2">English</div>
                <div className="text-slate-400 group-hover:text-emerald-100">Start Consultation</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-600/0 group-hover:from-emerald-500/20 group-hover:to-emerald-600/20 transition-all duration-300" />
            </button>

            <button
              onClick={() => handleStart('af')}
              className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 hover:from-emerald-600 hover:to-emerald-700 border-2 border-emerald-500/30 hover:border-emerald-400 rounded-2xl p-12 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/50"
            >
              <div className="relative z-10">
                <div className="text-6xl mb-4">🇿🇦</div>
                <div className="text-3xl font-bold mb-2">Afrikaans</div>
                <div className="text-slate-400 group-hover:text-emerald-100">Begin Konsultasie</div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-emerald-600/0 group-hover:from-emerald-500/20 group-hover:to-emerald-600/20 transition-all duration-300" />
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="text-emerald-400 font-bold mb-1">Fast</div>
            <div className="text-slate-400">15-minute consultation</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
            <div className="text-emerald-400 font-bold mb-1">Private</div>
            <div className="text-slate-400">Confidential & secure</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50">
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
