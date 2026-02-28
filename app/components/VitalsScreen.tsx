"use client";

import { useState } from 'react';
import { useKiosk } from '../context/KioskContext';

type VitalStatus = 'normal' | 'borderline' | 'concerning';

interface VitalReading {
  value: string;
  status: VitalStatus;
  range: string;
}

export default function VitalsScreen() {
  const { state, updateVitals, nextStep } = useKiosk();
  const [currentVital, setCurrentVital] = useState<'bp' | 'temp' | 'weight' | 'height'>('bp');
  const [isCapturing, setIsCapturing] = useState(false);
  const [readings, setReadings] = useState<{
    bp?: VitalReading;
    temp?: VitalReading;
    weight?: VitalReading;
    height?: VitalReading;
  }>({});

  const simulateReading = (vital: 'bp' | 'temp' | 'weight' | 'height') => {
    setIsCapturing(true);

    setTimeout(() => {
      let reading: VitalReading;
      
      switch (vital) {
        case 'bp':
          const systolic = 110 + Math.floor(Math.random() * 30);
          const diastolic = 70 + Math.floor(Math.random() * 20);
          const bpStatus: VitalStatus = systolic > 140 || diastolic > 90 ? 'concerning' : systolic > 130 || diastolic > 85 ? 'borderline' : 'normal';
          reading = {
            value: `${systolic}/${diastolic} mmHg`,
            status: bpStatus,
            range: 'Normal: <120/80',
          };
          updateVitals({ bloodPressure: { systolic, diastolic } });
          break;

        case 'temp':
          const temp = 36.2 + Math.random() * 1.5;
          const tempStatus: VitalStatus = temp > 38 ? 'concerning' : temp > 37.5 ? 'borderline' : 'normal';
          reading = {
            value: `${temp.toFixed(1)}°C`,
            status: tempStatus,
            range: 'Normal: 36.5-37.5°C',
          };
          updateVitals({ temperature: parseFloat(temp.toFixed(1)) });
          break;

        case 'weight':
          const weight = 60 + Math.floor(Math.random() * 40);
          reading = {
            value: `${weight} kg`,
            status: 'normal',
            range: 'Recorded',
          };
          updateVitals({ weight });
          break;

        case 'height':
          const height = 155 + Math.floor(Math.random() * 30);
          reading = {
            value: `${height} cm`,
            status: 'normal',
            range: 'Recorded',
          };
          updateVitals({ height });
          break;
      }

      setReadings(prev => ({ ...prev, [vital]: reading }));
      setIsCapturing(false);
    }, 2500);
  };

  const vitals = [
    {
      id: 'bp' as const,
      name: state.language === 'en' ? 'Blood Pressure' : 'Bloeddruk',
      instruction: state.language === 'en' 
        ? 'Please place your arm in the blood pressure cuff and press Start'
        : 'Plaas asseblief jou arm in die bloeddrukmof en druk Begin',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      id: 'temp' as const,
      name: state.language === 'en' ? 'Temperature' : 'Temperatuur',
      instruction: state.language === 'en'
        ? 'Please place the thermometer under your tongue'
        : 'Plaas asseblief die termometer onder jou tong',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      id: 'weight' as const,
      name: state.language === 'en' ? 'Weight' : 'Gewig',
      instruction: state.language === 'en'
        ? 'Please step onto the scale'
        : 'Tree asseblief op die skaal',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      ),
    },
    {
      id: 'height' as const,
      name: state.language === 'en' ? 'Height' : 'Hoogte',
      instruction: state.language === 'en'
        ? 'Stand against the height measure'
        : 'Staan teen die hoogte-maat',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
  ];

  const currentVitalData = vitals.find(v => v.id === currentVital)!;
  const allVitalsComplete = Object.keys(readings).length === 4;

  const getStatusColor = (status: VitalStatus) => {
    switch (status) {
      case 'normal': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50';
      case 'borderline': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50';
      case 'concerning': return 'text-red-400 bg-red-500/20 border-red-500/50';
    }
  };

  return (
    <div className="flex flex-col h-screen pt-20 pb-20 p-8">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">
            {state.language === 'en' ? 'Vital Signs Check' : 'Vitale Tekens Kontrole'}
          </h1>
          <p className="text-slate-400">
            {state.language === 'en' 
              ? 'Please complete all vital measurements'
              : 'Voltooi asseblief alle vitale metings'}
          </p>
        </div>

        {/* Progress indicators */}
        <div className="grid grid-cols-4 gap-4">
          {vitals.map(vital => (
            <button
              key={vital.id}
              onClick={() => setCurrentVital(vital.id)}
              className={`p-4 rounded-xl border-2 transition-all ${
                readings[vital.id]
                  ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                  : currentVital === vital.id
                  ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                  : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600'
              }`}
            >
              <div className="text-sm font-semibold text-center">{vital.name}</div>
              {readings[vital.id] && (
                <div className="mt-2 text-center">
                  <svg className="w-6 h-6 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Current vital measurement */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-emerald-500/30 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-500/50">
              {currentVitalData.icon}
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-2">{currentVitalData.name}</h2>
              <p className="text-slate-400 text-lg">{currentVitalData.instruction}</p>
            </div>

            {!readings[currentVital] ? (
              <button
                onClick={() => simulateReading(currentVital)}
                disabled={isCapturing}
                className="px-12 py-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white text-xl rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105"
              >
                {isCapturing 
                  ? (state.language === 'en' ? 'Measuring...' : 'Meet...')
                  : (state.language === 'en' ? 'Start Measurement' : 'Begin Meting')}
              </button>
            ) : (
              <div className={`inline-block px-8 py-6 rounded-xl border-2 ${getStatusColor(readings[currentVital]!.status)} animate-scale-in`}>
                <div className="text-4xl font-bold mb-2">{readings[currentVital]!.value}</div>
                <div className="text-sm opacity-80">{readings[currentVital]!.range}</div>
              </div>
            )}

            {isCapturing && (
              <div className="flex justify-center items-center space-x-3">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            )}
          </div>
        </div>

        {/* Summary of all readings */}
        {allVitalsComplete && (
          <div className="space-y-4 animate-fade-in">
            <h3 className="text-xl font-semibold text-center text-emerald-400">
              {state.language === 'en' ? 'All Vitals Recorded' : 'Alle Vitale Tekens Aangeteken'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vitals.map(vital => readings[vital.id] && (
                <div key={vital.id} className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <div className="text-sm text-slate-400 mb-1">{vital.name}</div>
                  <div className="text-lg font-bold">{readings[vital.id]!.value}</div>
                </div>
              ))}
            </div>
            <button
              onClick={nextStep}
              className="w-full px-8 py-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-xl rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >
              {state.language === 'en' ? 'Continue to Blood Tests →' : 'Gaan voort na Bloedtoetse →'}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
