"use client";

import { useKiosk } from '../context/KioskContext';
import { useTranslation } from '../i18n/translations';

export default function MedicalHistoryWizard() {
  const { state, setMedicalHistoryStep, nextStep, prevStep, updateActivity } = useKiosk();
  const t = useTranslation(state.language);

  const totalSteps = 5;
  const currentPage = state.medicalHistoryStep;

  const handleNext = () => {
    if (currentPage < totalSteps - 1) {
      setMedicalHistoryStep(currentPage + 1);
    } else {
      // Completed medical history wizard
      nextStep();
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setMedicalHistoryStep(currentPage - 1);
    } else {
      prevStep();
    }
  };

  const pages = [
    <ExistingConditionsPage key="conditions" />,
    <MedicationsAllergiesPage key="medications" />,
    <SurgicalHistoryPage key="surgical" />,
    <FamilyHistoryPage key="family" />,
    <LifestylePage key="lifestyle" />,
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-6 md:p-8 overflow-y-auto">
      <div className="max-w-4xl w-full space-y-8 animate-slide-in py-8" onMouseMove={updateActivity} onTouchStart={updateActivity}>
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            {t.medicalHistoryTitle}
          </h1>
          <div className="flex items-center justify-center gap-2 mt-4">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'w-8 bg-blue-500'
                    : index < currentPage
                    ? 'w-2 bg-emerald-500'
                    : 'w-2 bg-slate-600'
                }`}
              />
            ))}
          </div>
          <p className="text-slate-400 text-sm">
            Step {currentPage + 1} of {totalSteps}
          </p>
        </div>

        {/* Page Content */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-blue-500/30 rounded-2xl p-6 md:p-8 shadow-2xl shadow-blue-500/20 min-h-[400px]">
          {pages[currentPage]}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={handleBack}
            className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white font-bold py-5 md:py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-slate-600 active:scale-95"
          >
            {t.previous}
          </button>
          <button
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-5 md:py-6 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30 active:scale-95"
          >
            {currentPage === totalSteps - 1 ? t.continue : t.next}
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

// Page 1: Existing Conditions
function ExistingConditionsPage() {
  const { state, updateMedicalConditions } = useKiosk();
  const t = useTranslation(state.language);
  const conditions = state.medicalHistory.conditions;

  const toggleCondition = (key: keyof typeof conditions) => {
    if (key === 'none') {
      // If "None" is selected, clear all others
      updateMedicalConditions({
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
        none: !conditions.none,
        other: '',
      });
    } else if (typeof conditions[key] === 'boolean') {
      // If selecting any condition, uncheck "None"
      updateMedicalConditions({
        [key]: !conditions[key],
        none: false,
      });
    }
  };

  const conditionKeys: Array<{ key: keyof typeof conditions; label: keyof typeof t }> = [
    { key: 'diabetes', label: 'diabetes' },
    { key: 'hypertension', label: 'hypertension' },
    { key: 'asthma', label: 'asthma' },
    { key: 'heartDisease', label: 'heartDisease' },
    { key: 'epilepsy', label: 'epilepsy' },
    { key: 'arthritis', label: 'arthritis' },
    { key: 'depression', label: 'depression' },
    { key: 'cancer', label: 'cancer' },
    { key: 'hivAids', label: 'hivAids' },
    { key: 'tuberculosis', label: 'tuberculosis' },
    { key: 'none', label: 'none' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">{t.existingConditions}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {conditionKeys.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => toggleCondition(key)}
            className={`p-4 md:p-5 rounded-xl font-semibold text-left transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              conditions[key]
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-700/50 text-slate-300 border-2 border-slate-600 hover:border-blue-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                conditions[key] ? 'bg-white border-white' : 'border-slate-400'
              }`}>
                {conditions[key] && (
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-base md:text-lg">{t[label]}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Other conditions text field */}
      <div className="mt-6">
        <label className="block text-sm md:text-base font-semibold text-slate-200 mb-2">
          {t.otherConditions}
        </label>
        <textarea
          value={conditions.other}
          onChange={(e) => updateMedicalConditions({ other: e.target.value, none: false })}
          className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-xl px-4 md:px-6 py-4 text-base md:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
          rows={3}
          placeholder={t.otherConditions}
        />
      </div>
    </div>
  );
}

// Page 2: Medications & Allergies
function MedicationsAllergiesPage() {
  const { state, updateMedicationsAllergies } = useKiosk();
  const t = useTranslation(state.language);
  const data = state.medicalHistory.medicationsAllergies;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">{t.medicationsAllergies}</h2>

      {/* Current Medications */}
      <div>
        <label className="block text-sm md:text-base font-semibold text-slate-200 mb-2">
          {t.currentMedications}
        </label>
        <textarea
          value={data.currentMedications}
          onChange={(e) => updateMedicationsAllergies({ currentMedications: e.target.value, noMedications: false })}
          disabled={data.noMedications}
          className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-xl px-4 md:px-6 py-4 text-base md:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none disabled:opacity-50"
          rows={3}
          placeholder="e.g., Metformin 500mg twice daily"
        />
        <button
          onClick={() => updateMedicationsAllergies({ noMedications: !data.noMedications, currentMedications: data.noMedications ? '' : data.currentMedications })}
          className={`mt-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            data.noMedications
              ? 'bg-blue-500 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {t.noMedications}
        </button>
      </div>

      {/* Drug Allergies */}
      <div>
        <label className="block text-sm md:text-base font-semibold text-slate-200 mb-2">
          {t.drugAllergies}
        </label>
        <textarea
          value={data.drugAllergies}
          onChange={(e) => updateMedicationsAllergies({ drugAllergies: e.target.value, noDrugAllergies: false })}
          disabled={data.noDrugAllergies}
          className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-xl px-4 md:px-6 py-4 text-base md:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none disabled:opacity-50"
          rows={2}
          placeholder="e.g., Penicillin - causes rash"
        />
        <button
          onClick={() => updateMedicationsAllergies({ noDrugAllergies: !data.noDrugAllergies, drugAllergies: data.noDrugAllergies ? '' : data.drugAllergies })}
          className={`mt-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            data.noDrugAllergies
              ? 'bg-blue-500 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {t.noDrugAllergies}
        </button>
      </div>

      {/* Food Allergies */}
      <div>
        <label className="block text-sm md:text-base font-semibold text-slate-200 mb-2">
          {t.foodAllergies}
        </label>
        <textarea
          value={data.foodAllergies}
          onChange={(e) => updateMedicationsAllergies({ foodAllergies: e.target.value, noFoodAllergies: false })}
          disabled={data.noFoodAllergies}
          className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-xl px-4 md:px-6 py-4 text-base md:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none disabled:opacity-50"
          rows={2}
          placeholder="e.g., Peanuts, shellfish"
        />
        <button
          onClick={() => updateMedicationsAllergies({ noFoodAllergies: !data.noFoodAllergies, foodAllergies: data.noFoodAllergies ? '' : data.foodAllergies })}
          className={`mt-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            data.noFoodAllergies
              ? 'bg-blue-500 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {t.noFoodAllergies}
        </button>
      </div>
    </div>
  );
}

// Page 3: Surgical History
function SurgicalHistoryPage() {
  const { state, updateSurgicalHistory } = useKiosk();
  const t = useTranslation(state.language);
  const data = state.medicalHistory.surgicalHistory;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">{t.surgicalHistory}</h2>

      <div>
        <label className="block text-sm md:text-base font-semibold text-slate-200 mb-2">
          {t.previousSurgeries}
        </label>
        <textarea
          value={data.surgeries}
          onChange={(e) => updateSurgicalHistory({ surgeries: e.target.value, noSurgeries: false })}
          disabled={data.noSurgeries}
          className="w-full bg-slate-700/50 border-2 border-slate-600 rounded-xl px-4 md:px-6 py-4 text-base md:text-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none disabled:opacity-50"
          rows={6}
          placeholder={t.surgeryPlaceholder}
        />
        <button
          onClick={() => updateSurgicalHistory({ noSurgeries: !data.noSurgeries, surgeries: data.noSurgeries ? '' : data.surgeries })}
          className={`mt-3 px-6 py-3 rounded-lg font-semibold transition-all ${
            data.noSurgeries
              ? 'bg-blue-500 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          {t.noSurgeries}
        </button>
      </div>
    </div>
  );
}

// Page 4: Family History
function FamilyHistoryPage() {
  const { state, updateFamilyHistory } = useKiosk();
  const t = useTranslation(state.language);
  const history = state.medicalHistory.familyHistory;

  const toggleHistory = (key: keyof typeof history) => {
    if (key === 'none') {
      updateFamilyHistory({
        heartDisease: false,
        diabetes: false,
        cancer: false,
        hypertension: false,
        stroke: false,
        mentalHealth: false,
        none: !history.none,
      });
    } else {
      updateFamilyHistory({
        [key]: !history[key],
        none: false,
      });
    }
  };

  const historyKeys: Array<keyof typeof history> = [
    'heartDisease',
    'diabetes',
    'cancer',
    'hypertension',
    'stroke',
    'mentalHealth',
    'none',
  ];

  const labels = {
    heartDisease: t.familyHeartDisease,
    diabetes: t.familyDiabetes,
    cancer: t.familyCancer,
    hypertension: t.familyHypertension,
    stroke: t.familyStroke,
    mentalHealth: t.familyMentalHealth,
    none: t.noFamilyHistory,
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">{t.familyHistory}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {historyKeys.map((key) => (
          <button
            key={key}
            onClick={() => toggleHistory(key)}
            className={`p-4 md:p-5 rounded-xl font-semibold text-left transition-all duration-300 transform hover:scale-105 active:scale-95 ${
              history[key]
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-700/50 text-slate-300 border-2 border-slate-600 hover:border-blue-500'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                history[key] ? 'bg-white border-white' : 'border-slate-400'
              }`}>
                {history[key] && (
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-base md:text-lg">{labels[key]}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Page 5: Lifestyle
function LifestylePage() {
  const { state, updateLifestyle } = useKiosk();
  const t = useTranslation(state.language);
  const lifestyle = state.medicalHistory.lifestyle;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white mb-6">{t.lifestyle}</h2>

      {/* Smoking */}
      <div>
        <label className="block text-base md:text-lg font-semibold text-slate-200 mb-3">
          {t.smoking}
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['never', 'former', 'current'] as const).map((status) => (
            <button
              key={status}
              onClick={() => updateLifestyle({ smoking: status })}
              className={`py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                lifestyle.smoking === status
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-700/50 text-slate-300 border-2 border-slate-600 hover:border-blue-500'
              }`}
            >
              {t[`smoking${status.charAt(0).toUpperCase()}${status.slice(1)}` as keyof typeof t]}
            </button>
          ))}
        </div>
      </div>

      {/* Alcohol */}
      <div>
        <label className="block text-base md:text-lg font-semibold text-slate-200 mb-3">
          {t.alcohol}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['never', 'social', 'regular', 'heavy'] as const).map((status) => (
            <button
              key={status}
              onClick={() => updateLifestyle({ alcohol: status })}
              className={`py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                lifestyle.alcohol === status
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-700/50 text-slate-300 border-2 border-slate-600 hover:border-blue-500'
              }`}
            >
              {t[`alcohol${status.charAt(0).toUpperCase()}${status.slice(1)}` as keyof typeof t]}
            </button>
          ))}
        </div>
      </div>

      {/* Exercise */}
      <div>
        <label className="block text-base md:text-lg font-semibold text-slate-200 mb-3">
          {t.exercise}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['sedentary', 'light', 'moderate', 'active'] as const).map((level) => (
            <button
              key={level}
              onClick={() => updateLifestyle({ exercise: level })}
              className={`py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                lifestyle.exercise === level
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-700/50 text-slate-300 border-2 border-slate-600 hover:border-blue-500'
              }`}
            >
              {t[`exercise${level.charAt(0).toUpperCase()}${level.slice(1)}` as keyof typeof t]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
