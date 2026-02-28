"use client";

import { useState } from 'react';
import { useKiosk } from '../context/KioskContext';

export default function PaymentScreen() {
  const { state, resetKiosk } = useKiosk();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);

  const AI_CONSULTATION_FEE = 250;
  const VIRTUAL_DOCTOR_FEE = 500;
  const VAT_RATE = 0.15;

  const selectedTests = state.bloodTests.filter(t => t.selected);
  const testsTotal = selectedTests.reduce((sum, test) => sum + test.price, 0);
  const virtualDoctorFee = state.usedVirtualDoctor ? VIRTUAL_DOCTOR_FEE : 0;
  const subtotal = AI_CONSULTATION_FEE + testsTotal + virtualDoctorFee;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  const handlePayment = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      setShowReceipt(true);
    }, 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleNewPatient = () => {
    resetKiosk();
  };

  if (isPaid && showReceipt) {
    return (
      <div className="flex flex-col h-screen pt-20 pb-20 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto w-full space-y-8">
          {/* Success animation */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/50 animate-scale-in">
              <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-5xl font-bold text-white mb-2">
                {state.language === 'en' ? 'Payment Successful!' : 'Betaling Suksesvol!'}
              </h1>
              <p className="text-xl text-emerald-400">
                {state.language === 'en' ? 'Thank you for your visit' : 'Dankie vir jou besoek'}
              </p>
            </div>
          </div>

          {/* Receipt */}
          <div className="bg-white text-slate-900 rounded-2xl p-8 shadow-2xl">
            <div className="border-b-2 border-slate-300 pb-6 mb-6">
              <h2 className="text-3xl font-bold text-center mb-2">Medical Receipt</h2>
              <p className="text-center text-slate-600">AI Medical Kiosk</p>
              <p className="text-center text-sm text-slate-500 mt-2">
                {new Date().toLocaleString(state.language === 'en' ? 'en-ZA' : 'af-ZA')}
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {/* Line items */}
              <div className="flex justify-between py-2">
                <span className="font-semibold">AI Consultation</span>
                <span className="font-mono">R {AI_CONSULTATION_FEE.toFixed(2)}</span>
              </div>

              {selectedTests.map(test => (
                <div key={test.id} className="flex justify-between py-2 border-t border-slate-200">
                  <span>{test.name}</span>
                  <span className="font-mono">R {test.price.toFixed(2)}</span>
                </div>
              ))}

              {state.usedVirtualDoctor && (
                <div className="flex justify-between py-2 border-t border-slate-200">
                  <span>Virtual Doctor Consultation ({state.consultationDuration}s)</span>
                  <span className="font-mono">R {VIRTUAL_DOCTOR_FEE.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between py-2 border-t-2 border-slate-300 font-semibold">
                <span>Subtotal</span>
                <span className="font-mono">R {subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-2">
                <span>VAT (15%)</span>
                <span className="font-mono">R {vat.toFixed(2)}</span>
              </div>

              <div className="flex justify-between py-3 border-t-2 border-slate-900 text-2xl font-bold">
                <span>Total Paid</span>
                <span className="font-mono text-emerald-600">R {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="bg-slate-100 rounded-lg p-4 text-sm text-slate-600 space-y-2">
              <p><strong>Payment Method:</strong> Card Payment</p>
              <p><strong>Transaction ID:</strong> {Math.random().toString(36).substr(2, 12).toUpperCase()}</p>
              <p><strong>Status:</strong> <span className="text-emerald-600 font-semibold">Approved</span></p>
            </div>

            {/* Medical summary */}
            {state.diagnosis && (
              <div className="mt-6 pt-6 border-t-2 border-slate-300">
                <h3 className="font-bold text-lg mb-3">Visit Summary</h3>
                <p className="mb-2"><strong>Primary Assessment:</strong> {state.diagnosis}</p>
                {state.recommendations.length > 0 && (
                  <div>
                    <strong>Key Recommendations:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                      {state.recommendations.slice(0, 3).map((rec, idx) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-slate-300 text-center text-xs text-slate-500">
              <p>Powered by Ripple Labs • ripplelabs.co.za</p>
              <p className="mt-1">For support, contact: support@ripplelabs.co.za</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={handlePrint}
              className="px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xl rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" />
              </svg>
              {state.language === 'en' ? 'Print Receipt' : 'Druk Kwitansie'}
            </button>

            <button
              onClick={handleNewPatient}
              className="px-8 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xl rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 flex items-center justify-center gap-3"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              {state.language === 'en' ? 'New Patient' : 'Nuwe Pasiënt'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen pt-20 pb-20 p-8">
      <div className="max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            {state.language === 'en' ? 'Payment & Checkout' : 'Betaling & Afhandeling'}
          </h1>
          <p className="text-slate-400">
            {state.language === 'en' ? 'Review your invoice and complete payment' : 'Hersien jou faktuur en voltooi betaling'}
          </p>
        </div>

        {/* Invoice */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-emerald-500/30 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6 text-white">
            {state.language === 'en' ? 'Invoice' : 'Faktuur'}
          </h2>

          <div className="space-y-4 mb-6">
            {/* Line items */}
            <div className="flex justify-between py-3 border-b border-slate-700">
              <div>
                <div className="font-semibold text-white">AI Consultation</div>
                <div className="text-sm text-slate-400">AI-powered symptom assessment & diagnosis</div>
              </div>
              <div className="text-xl font-bold text-white">R {AI_CONSULTATION_FEE}</div>
            </div>

            {selectedTests.map(test => (
              <div key={test.id} className="flex justify-between py-3 border-b border-slate-700">
                <div>
                  <div className="font-semibold text-white">{test.name}</div>
                  {test.result && <div className="text-sm text-emerald-400 font-mono">{test.result}</div>}
                </div>
                <div className="text-xl font-bold text-white">R {test.price}</div>
              </div>
            ))}

            {state.usedVirtualDoctor && (
              <div className="flex justify-between py-3 border-b border-slate-700">
                <div>
                  <div className="font-semibold text-white">Virtual Doctor Consultation</div>
                  <div className="text-sm text-slate-400">
                    Duration: {Math.floor(state.consultationDuration / 60)}m {state.consultationDuration % 60}s
                  </div>
                </div>
                <div className="text-xl font-bold text-white">R {VIRTUAL_DOCTOR_FEE}</div>
              </div>
            )}

            <div className="flex justify-between py-3 text-slate-300">
              <span>Subtotal</span>
              <span className="font-mono text-lg">R {subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-3 text-slate-300">
              <span>VAT (15%)</span>
              <span className="font-mono text-lg">R {vat.toFixed(2)}</span>
            </div>

            <div className="flex justify-between py-4 border-t-2 border-emerald-500 text-2xl font-bold">
              <span className="text-white">Total</span>
              <span className="text-emerald-400">R {total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment method */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
          <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-3">
            <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            {state.language === 'en' ? 'Payment Method' : 'Betaling Metode'}
          </h3>

          {!isProcessing ? (
            <div className="space-y-6">
              <div className="bg-slate-900/50 rounded-xl p-6 border-2 border-emerald-500/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white">Card Payment</h4>
                    <p className="text-slate-400 text-sm">
                      {state.language === 'en' ? 'Tap or insert your card' : 'Tik of plaas jou kaart in'}
                    </p>
                  </div>
                  <div className="text-emerald-400">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="w-full px-8 py-8 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-2xl rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/50 transform hover:scale-[1.02]"
              >
                {state.language === 'en' ? 'Pay Now • R ' + total.toFixed(2) : 'Betaal Nou • R ' + total.toFixed(2)}
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-6">
              <div className="relative">
                <div className="w-32 h-32 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {state.language === 'en' ? 'Processing Payment...' : 'Betaling word Verwerk...'}
                </h3>
                <p className="text-slate-400">
                  {state.language === 'en' ? 'Please do not remove your card' : 'Moenie jou kaart verwyder nie'}
                </p>
              </div>
            </div>
          )}
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
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
