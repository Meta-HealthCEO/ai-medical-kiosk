"use client";

import { useState } from 'react';
import { useKiosk } from '../context/KioskContext';
import { useTranslation } from '../i18n/translations';

export default function RegistrationScreen() {
  const { state, updateRegistration, nextStep, prevStep, updateActivity } = useKiosk();
  const t = useTranslation(state.language);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!state.registration.fullName.trim()) {
      newErrors.fullName = 'Required';
    }
    if (!state.registration.idPassport.trim()) {
      newErrors.idPassport = 'Required';
    }
    if (!state.registration.dateOfBirth) {
      newErrors.dateOfBirth = 'Required';
    }
    if (!state.registration.gender) {
      newErrors.gender = 'Required';
    }
    if (!state.registration.contactNumber.trim()) {
      newErrors.contactNumber = 'Required';
    }
    if (!state.registration.emailAddress.trim()) {
      newErrors.emailAddress = 'Required';
    } else if (!/\S+@\S+\.\S+/.test(state.registration.emailAddress)) {
      newErrors.emailAddress = 'Invalid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 md:p-8 overflow-y-auto">
      <div className="max-w-4xl w-full space-y-8 animate-slide-in py-8" onMouseMove={updateActivity} onTouchStart={updateActivity}>
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            {t.registrationTitle}
          </h1>
        </div>

        {/* Form */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-emerald-500/30 rounded-2xl p-6 md:p-8 shadow-2xl shadow-emerald-500/20">
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-slate-200 mb-2">
                {t.fullName} *
              </label>
              <input
                type="text"
                value={state.registration.fullName}
                onChange={(e) => updateRegistration({ fullName: e.target.value })}
                className={`w-full bg-slate-700/50 border-2 ${errors.fullName ? 'border-red-500' : 'border-slate-600'} rounded-xl px-4 md:px-6 py-4 md:py-5 text-base md:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors`}
                placeholder="John Doe"
              />
              {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* ID/Passport Number */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-slate-200 mb-2">
                {t.idNumber} / {t.passportNumber} *
              </label>
              <input
                type="text"
                value={state.registration.idPassport}
                onChange={(e) => updateRegistration({ idPassport: e.target.value })}
                className={`w-full bg-slate-700/50 border-2 ${errors.idPassport ? 'border-red-500' : 'border-slate-600'} rounded-xl px-4 md:px-6 py-4 md:py-5 text-base md:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors`}
                placeholder="1234567890123"
              />
              {errors.idPassport && <p className="text-red-400 text-sm mt-1">{errors.idPassport}</p>}
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-slate-200 mb-2">
                {t.dateOfBirth} *
              </label>
              <input
                type="date"
                value={state.registration.dateOfBirth}
                onChange={(e) => updateRegistration({ dateOfBirth: e.target.value })}
                className={`w-full bg-slate-700/50 border-2 ${errors.dateOfBirth ? 'border-red-500' : 'border-slate-600'} rounded-xl px-4 md:px-6 py-4 md:py-5 text-base md:text-lg text-white focus:outline-none focus:border-emerald-500 transition-colors`}
              />
              {errors.dateOfBirth && <p className="text-red-400 text-sm mt-1">{errors.dateOfBirth}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-slate-200 mb-3">
                {t.gender} *
              </label>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {(['male', 'female', 'other'] as const).map((gender) => (
                  <button
                    key={gender}
                    onClick={() => updateRegistration({ gender })}
                    className={`py-4 md:py-5 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      state.registration.gender === gender
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30'
                        : 'bg-slate-700/50 text-slate-300 border-2 border-slate-600 hover:border-emerald-500'
                    }`}
                  >
                    {gender === 'other' ? t.genderOther : t[gender]}
                  </button>
                ))}
              </div>
              {errors.gender && <p className="text-red-400 text-sm mt-1">{errors.gender}</p>}
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-slate-200 mb-2">
                {t.contactNumber} *
              </label>
              <input
                type="tel"
                value={state.registration.contactNumber}
                onChange={(e) => updateRegistration({ contactNumber: e.target.value })}
                className={`w-full bg-slate-700/50 border-2 ${errors.contactNumber ? 'border-red-500' : 'border-slate-600'} rounded-xl px-4 md:px-6 py-4 md:py-5 text-base md:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors`}
                placeholder="+27 12 345 6789"
              />
              {errors.contactNumber && <p className="text-red-400 text-sm mt-1">{errors.contactNumber}</p>}
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm md:text-base font-semibold text-slate-200 mb-2">
                {t.emailAddress} *
              </label>
              <input
                type="email"
                value={state.registration.emailAddress}
                onChange={(e) => updateRegistration({ emailAddress: e.target.value })}
                className={`w-full bg-slate-700/50 border-2 ${errors.emailAddress ? 'border-red-500' : 'border-slate-600'} rounded-xl px-4 md:px-6 py-4 md:py-5 text-base md:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors`}
                placeholder="john@example.com"
              />
              {errors.emailAddress && <p className="text-red-400 text-sm mt-1">{errors.emailAddress}</p>}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={prevStep}
            className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold py-5 md:py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-slate-600 active:scale-95"
          >
            {t.back}
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-5 md:py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30 active:scale-95"
          >
            {t.continue}
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
