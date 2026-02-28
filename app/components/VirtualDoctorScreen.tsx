"use client";

import { useEffect, useState } from 'react';
import { useKiosk } from '../context/KioskContext';

export default function VirtualDoctorScreen() {
  const { state, startVirtualDoctor, updateConsultationDuration, nextStep } = useKiosk();
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    startVirtualDoctor();

    // Simulate connection
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (!isConnected) return;

    const interval = setInterval(() => {
      setDuration(prev => {
        const newDuration = prev + 1;
        updateConsultationDuration(newDuration);
        return newDuration;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndConsultation = () => {
    nextStep();
  };

  return (
    <div className="flex flex-col h-screen pt-20 pb-20 p-8">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            {state.language === 'en' ? 'Virtual Doctor Consultation' : 'Virtuele Dokter Konsultasie'}
          </h1>
          {isConnected && (
            <div className="flex items-center justify-center gap-2 text-emerald-400">
              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
              <span className="font-semibold">
                {state.language === 'en' ? 'Connected' : 'Verbind'} • {formatDuration(duration)}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 grid grid-cols-3 gap-6">
          {/* Video feed */}
          <div className="col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 overflow-hidden relative">
            {isConnecting ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                  <div className="w-32 h-32 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-16 h-16 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {state.language === 'en' ? 'Connecting to Doctor...' : 'Verbind met Dokter...'}
                  </h3>
                  <p className="text-slate-400">
                    {state.language === 'en' ? 'Please wait while we connect you' : 'Wag asseblief terwyl ons jou verbind'}
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Simulated video */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-slate-900 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50">
                      <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="bg-slate-900/80 backdrop-blur-sm rounded-xl px-6 py-3">
                      <h3 className="text-2xl font-bold text-white">Dr. Sarah Johnson</h3>
                      <p className="text-blue-400">General Practitioner</p>
                    </div>
                  </div>
                </div>

                {/* Controls overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 to-transparent p-6">
                  <div className="flex justify-center gap-4">
                    <button className="w-14 h-14 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-all">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button className="w-14 h-14 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-all">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                    </button>
                    <button
                      onClick={handleEndConsultation}
                      className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center transition-all shadow-lg hover:shadow-red-500/50"
                    >
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Patient summary sidebar */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-slate-700 p-6 overflow-y-auto">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
              </svg>
              {state.language === 'en' ? 'Patient Summary' : 'Pasiënt Opsomming'}
            </h2>

            <div className="space-y-4">
              {/* Vitals */}
              {Object.keys(state.vitals).length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-emerald-400 uppercase">
                    {state.language === 'en' ? 'Vitals' : 'Vitale Tekens'}
                  </h3>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-sm space-y-1">
                    {state.vitals.bloodPressure && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">BP:</span>
                        <span className="text-white font-mono">
                          {state.vitals.bloodPressure.systolic}/{state.vitals.bloodPressure.diastolic}
                        </span>
                      </div>
                    )}
                    {state.vitals.temperature && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Temp:</span>
                        <span className="text-white font-mono">{state.vitals.temperature}°C</span>
                      </div>
                    )}
                    {state.vitals.weight && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Weight:</span>
                        <span className="text-white font-mono">{state.vitals.weight}kg</span>
                      </div>
                    )}
                    {state.vitals.height && (
                      <div className="flex justify-between">
                        <span className="text-slate-400">Height:</span>
                        <span className="text-white font-mono">{state.vitals.height}cm</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Blood tests */}
              {state.bloodTests.some(t => t.selected) && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-emerald-400 uppercase">
                    {state.language === 'en' ? 'Blood Tests' : 'Bloedtoetse'}
                  </h3>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-sm space-y-2">
                    {state.bloodTests.filter(t => t.selected).map(test => (
                      <div key={test.id} className="border-b border-slate-700 last:border-0 pb-2 last:pb-0">
                        <div className="font-semibold text-white text-xs mb-1">{test.name}</div>
                        {test.result && (
                          <div className="text-emerald-400 font-mono text-xs">{test.result}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Diagnosis */}
              {state.diagnosis && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-emerald-400 uppercase">
                    {state.language === 'en' ? 'AI Assessment' : 'KI Assessering'}
                  </h3>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-sm">
                    <p className="text-white font-semibold mb-2">{state.diagnosis}</p>
                    <ul className="space-y-1 text-slate-300 text-xs">
                      {state.recommendations.slice(0, 3).map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-emerald-400">•</span>
                          <span className="flex-1">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Info banner */}
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4 text-center">
          <p className="text-blue-300">
            {state.language === 'en'
              ? 'The doctor has access to all your information. Feel free to ask questions or discuss your concerns.'
              : 'Die dokter het toegang tot al jou inligting. Voel vry om vrae te vra of jou bekommernisse te bespreek.'}
          </p>
        </div>
      </div>
    </div>
  );
}
