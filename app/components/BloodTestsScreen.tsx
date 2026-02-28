"use client";

import { useState } from 'react';
import { useKiosk } from '../context/KioskContext';

export default function BloodTestsScreen() {
  const { state, toggleBloodTest, updateBloodTestResult, nextStep } = useKiosk();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedTests, setProcessedTests] = useState<Set<string>>(new Set());

  const selectedTests = state.bloodTests.filter(t => t.selected);
  const allSelectedProcessed = selectedTests.length > 0 && selectedTests.every(t => processedTests.has(t.id));

  const handleRunTests = async () => {
    const testsToRun = state.bloodTests.filter(t => t.selected && !processedTests.has(t.id));
    if (testsToRun.length === 0) return;

    setIsProcessing(true);

    for (const test of testsToRun) {
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate realistic results
      let result = '';
      switch (test.id) {
        case 'glucose':
          result = `${(4.5 + Math.random() * 2).toFixed(1)} mmol/L (Normal: 4.0-6.0)`;
          break;
        case 'cholesterol':
          result = `Total: ${(4.0 + Math.random() * 2).toFixed(1)} mmol/L, HDL: ${(1.0 + Math.random() * 0.5).toFixed(1)} mmol/L`;
          break;
        case 'hba1c':
          result = `${(4.5 + Math.random() * 1.5).toFixed(1)}% (Normal: <5.7%)`;
          break;
        case 'crp':
          result = `${(0.5 + Math.random() * 2).toFixed(1)} mg/L (Normal: <3.0)`;
          break;
        case 'cbc':
          result = `WBC: ${(4.5 + Math.random() * 6).toFixed(1)} × 10⁹/L, RBC: ${(4.0 + Math.random() * 2).toFixed(1)} × 10¹²/L`;
          break;
        case 'thyroid':
          result = `${(1.0 + Math.random() * 3).toFixed(2)} mIU/L (Normal: 0.5-4.5)`;
          break;
        case 'vitaminD':
          result = `${(30 + Math.random() * 40).toFixed(0)} ng/mL (Normal: 30-100)`;
          break;
        case 'hiv':
          result = 'Negative';
          break;
      }

      updateBloodTestResult(test.id, result);
      setProcessedTests(prev => new Set([...prev, test.id]));
    }

    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col h-screen pt-20 pb-20 p-8 overflow-y-auto">
      <div className="max-w-6xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            {state.language === 'en' ? 'Point-of-Care Blood Tests' : 'Punt-van-Sorg Bloedtoetse'}
          </h1>
          <p className="text-slate-400">
            {state.language === 'en' 
              ? 'Select the tests you would like to perform'
              : 'Kies die toetse wat jy wil uitvoer'}
          </p>
        </div>

        {/* AI Recommendations */}
        {state.chatHistory.length > 0 && (
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <svg className="w-8 h-8 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  {state.language === 'en' ? 'AI Recommendations' : 'KI Aanbevelings'}
                </h3>
                <p className="text-slate-300">
                  {state.language === 'en'
                    ? 'Based on your symptoms, we recommend: Glucose, CRP, and CBC tests'
                    : 'Gebaseer op jou simptome, beveel ons aan: Glukose, CRP, en CBC toetse'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Blood tests grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {state.bloodTests.map(test => (
            <div
              key={test.id}
              className={`relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border-2 transition-all cursor-pointer ${
                test.selected
                  ? 'border-emerald-500 shadow-lg shadow-emerald-500/30'
                  : 'border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => !processedTests.has(test.id) && toggleBloodTest(test.id)}
            >
              {/* Checkbox */}
              <div className="absolute top-4 right-4">
                <div className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all ${
                  test.selected
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-slate-600'
                }`}>
                  {test.selected && (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>

              <div className="pr-12">
                <h3 className="text-xl font-bold mb-2 text-white">{test.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-emerald-400">R{test.price}</span>
                </div>

                {/* Result */}
                {processedTests.has(test.id) && test.result && (
                  <div className="mt-4 p-4 bg-emerald-900/30 border border-emerald-500/30 rounded-lg animate-slide-in">
                    <div className="text-sm text-emerald-400 font-semibold mb-1">
                      {state.language === 'en' ? 'Result' : 'Resultaat'}
                    </div>
                    <div className="text-white font-mono text-sm">{test.result}</div>
                  </div>
                )}

                {/* Processing */}
                {isProcessing && test.selected && !processedTests.has(test.id) && (
                  <div className="mt-4 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-blue-400 text-sm">
                        {state.language === 'en' ? 'Processing...' : 'Verwerk...'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Summary and actions */}
        {selectedTests.length > 0 && (
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">
                  {state.language === 'en' ? 'Selected Tests' : 'Geselekteerde Toetse'}
                </h3>
                <p className="text-slate-400">
                  {selectedTests.length} {state.language === 'en' ? 'test(s) selected' : 'toets(e) gekies'}
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">
                  {state.language === 'en' ? 'Total Cost' : 'Totale Koste'}
                </div>
                <div className="text-3xl font-bold text-emerald-400">
                  R{selectedTests.reduce((sum, t) => sum + t.price, 0)}
                </div>
              </div>
            </div>

            {!allSelectedProcessed ? (
              <button
                onClick={handleRunTests}
                disabled={isProcessing}
                className="w-full px-8 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xl rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-emerald-500/50"
              >
                {isProcessing
                  ? (state.language === 'en' ? 'Running Tests...' : 'Toetse word uitgevoer...')
                  : (state.language === 'en' ? 'Run Selected Tests' : 'Voer Geselekteerde Toetse uit')}
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="w-full px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xl rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
              >
                {state.language === 'en' ? 'Continue to Diagnosis →' : 'Gaan voort na Diagnose →'}
              </button>
            )}
          </div>
        )}

        {selectedTests.length === 0 && (
          <button
            onClick={nextStep}
            className="w-full px-8 py-6 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-white text-xl rounded-xl font-semibold transition-all duration-300"
          >
            {state.language === 'en' ? 'Skip Blood Tests →' : 'Slaan Bloedtoetse oor →'}
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
