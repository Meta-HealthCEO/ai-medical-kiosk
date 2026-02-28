"use client";

import { useState, useEffect, useRef } from 'react';
import { useKiosk } from '../context/KioskContext';
import { useTranslation, languageNames } from '../i18n/translations';

export default function VoiceChatScreen() {
  const { state, addChatMessage, nextStep, updateActivity } = useKiosk();
  const t = useTranslation(state.language);
  
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentAIMessage, setCurrentAIMessage] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number>(0);

  // Language code mapping for speech
  const getLangCode = (lang: string) => {
    const map: Record<string, string> = {
      en: 'en-US', af: 'af-ZA', zu: 'zu-ZA', xh: 'xh-ZA',
      st: 'st-ZA', tn: 'tn-ZA', nso: 'nso-ZA', ts: 'ts-ZA',
      ss: 'ss-ZA', ve: 've-ZA', nr: 'nr-ZA'
    };
    return map[lang] || 'en-US';
  };

  // Build patient context
  const buildPatientContext = () => {
    const reg = state.registration;
    const med = state.medicalHistory;
    
    const conditions = Object.entries(med.conditions)
      .filter(([key, val]) => val === true)
      .map(([key]) => key)
      .join(', ');
    
    const familyHistory = Object.entries(med.familyHistory)
      .filter(([key, val]) => val === true)
      .map(([key]) => key)
      .join(', ');

    return `
PATIENT INFORMATION:
- Name: ${reg.fullName || 'Not provided'}
- Age: ${reg.dateOfBirth ? new Date().getFullYear() - new Date(reg.dateOfBirth).getFullYear() : 'Not provided'}
- Gender: ${reg.gender || 'Not provided'}
- Language: ${languageNames[state.language]}

MEDICAL HISTORY:
- Existing Conditions: ${conditions || med.conditions.other || 'None reported'}
- Current Medications: ${med.medicationsAllergies.noMedications ? 'None' : med.medicationsAllergies.currentMedications || 'Not provided'}
- Drug Allergies: ${med.medicationsAllergies.noDrugAllergies ? 'None' : med.medicationsAllergies.drugAllergies || 'Not provided'}
- Food Allergies: ${med.medicationsAllergies.noFoodAllergies ? 'None' : med.medicationsAllergies.foodAllergies || 'Not provided'}
- Surgical History: ${med.surgicalHistory.noSurgeries ? 'None' : med.surgicalHistory.surgeries || 'Not provided'}
- Family History: ${familyHistory || 'None reported'}
- Smoking: ${med.lifestyle.smoking || 'Not provided'}
- Alcohol: ${med.lifestyle.alcohol || 'Not provided'}
- Exercise: ${med.lifestyle.exercise || 'Not provided'}

INSTRUCTIONS:
- Respond in ${languageNames[state.language]} language
- Use the patient's medical history to ask informed questions
- Be empathetic and professional
- Ask ONE question at a time, keep responses SHORT (1-2 sentences)
- Use conversational tone suitable for voice
- Do not diagnose or prescribe medication
- Ask follow-up questions about symptoms
`.trim();
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = getLangCode(state.language);

      recognitionRef.current.onresult = (event: any) => {
        const userTranscript = event.results[0][0].transcript;
        setTranscript(userTranscript);
        setIsListening(false);
        
        // Process the user's speech
        handleUserSpeech(userTranscript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    // Initial AI greeting
    if (state.chatHistory.length === 0) {
      const greeting = `Hello ${state.registration.fullName}. I'm Dr. AI. I've reviewed your medical history. What brings you in today?`;
      setTimeout(() => speakAIResponse(greeting), 1000);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (synthRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.chatHistory]);

  // Handle user speech input
  const handleUserSpeech = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    addChatMessage({ role: 'user', content: userMessage });
    setIsProcessing(true);
    updateActivity();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...state.chatHistory, { role: 'user', content: userMessage }],
          language: state.language,
          patientContext: buildPatientContext(),
        }),
      });

      const data = await response.json();
      const aiResponse = data.message;
      
      addChatMessage({ role: 'assistant', content: aiResponse });
      speakAIResponse(aiResponse);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = 'I apologize, but I encountered an error. Could you please repeat that?';
      addChatMessage({ role: 'assistant', content: errorMsg });
      speakAIResponse(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };

  // Speak AI response with TTS
  const speakAIResponse = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    synthRef.current = new SpeechSynthesisUtterance(text);
    synthRef.current.lang = getLangCode(state.language);
    synthRef.current.rate = 0.95;
    synthRef.current.pitch = 1.0;

    synthRef.current.onstart = () => {
      setIsSpeaking(true);
      setCurrentAIMessage(text);
    };

    synthRef.current.onend = () => {
      setIsSpeaking(false);
      setCurrentAIMessage('');
    };

    synthRef.current.onerror = () => {
      setIsSpeaking(false);
      setCurrentAIMessage('');
    };

    window.speechSynthesis.speak(synthRef.current);
  };

  // Start/stop listening
  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      // Stop AI speaking if it's talking
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      
      setTranscript('');
      setIsListening(true);
      recognitionRef.current.start();
      updateActivity();
    }
  };

  // Continue to next step
  const handleContinue = () => {
    if (state.chatHistory.length > 2) {
      window.speechSynthesis.cancel();
      nextStep();
    }
  };

  return (
    <div 
      className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden"
      onMouseMove={updateActivity}
      onTouchStart={updateActivity}
    >
      {/* Header */}
      <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 p-4 md:p-6">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl">
            <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold">Dr. AI</h1>
            <p className="text-sm md:text-base text-slate-400">{t.chatTitle}</p>
          </div>
        </div>
      </div>

      {/* Main Voice Interface */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden">
        {/* AI Avatar with Waveform */}
        <div className="mb-8 md:mb-12">
          <div className={`relative ${isSpeaking ? 'animate-pulse-slow' : ''}`}>
            {/* Outer ring - pulsing when speaking */}
            {isSpeaking && (
              <div className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping-slow" style={{ transform: 'scale(1.2)' }} />
            )}
            
            {/* Avatar */}
            <div className={`relative w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-2xl transition-all duration-300 ${
              isSpeaking ? 'shadow-emerald-500/50 scale-110' : 'shadow-emerald-500/30'
            }`}>
              <svg className="w-16 h-16 md:w-24 md:h-24 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="text-center mb-8 md:mb-12 min-h-[60px]">
          {isListening && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <p className="text-lg md:text-xl font-semibold text-red-400">Listening...</p>
              </div>
              {transcript && (
                <p className="text-sm md:text-base text-slate-300 italic">"{transcript}"</p>
              )}
            </div>
          )}
          
          {isSpeaking && (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <div className="flex gap-1">
                  <div className="w-1 h-4 bg-emerald-400 rounded-full animate-wave" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-4 bg-emerald-400 rounded-full animate-wave" style={{ animationDelay: '100ms' }} />
                  <div className="w-1 h-4 bg-emerald-400 rounded-full animate-wave" style={{ animationDelay: '200ms' }} />
                </div>
                <p className="text-lg md:text-xl font-semibold text-emerald-400">Dr. AI is speaking...</p>
              </div>
              {currentAIMessage && (
                <p className="text-sm md:text-base text-slate-300 max-w-2xl px-4">"{currentAIMessage}"</p>
              )}
            </div>
          )}
          
          {isProcessing && (
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
              <p className="text-lg md:text-xl font-semibold text-blue-400">Dr. is thinking...</p>
            </div>
          )}
          
          {!isListening && !isSpeaking && !isProcessing && (
            <p className="text-lg md:text-xl font-semibold text-slate-400">Tap the microphone to speak</p>
          )}
        </div>

        {/* Large Microphone Button */}
        <button
          onClick={toggleListening}
          disabled={isSpeaking || isProcessing}
          className={`group relative w-24 h-24 md:w-32 md:h-32 rounded-full transition-all duration-300 transform hover:scale-110 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
            isListening
              ? 'bg-gradient-to-br from-red-500 to-red-600 shadow-2xl shadow-red-500/50 animate-pulse'
              : 'bg-gradient-to-br from-blue-500 to-blue-600 shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70'
          }`}
        >
          {/* Pulse ring when listening */}
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full bg-red-400/50 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-red-400/30 animate-ping" style={{ animationDelay: '0.3s' }} />
            </>
          )}
          
          <div className="relative z-10 flex items-center justify-center h-full">
            {isListening ? (
              <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>

        {/* Helper text */}
        <p className="mt-6 text-xs md:text-sm text-slate-500 text-center px-4">
          {isListening ? 'Speak now, I\'m listening...' : 'Press and speak when ready'}
        </p>
      </div>

      {/* Conversation Transcript (Scrollable) */}
      <div className="bg-slate-900/60 backdrop-blur-sm border-t border-slate-700 p-4 md:p-6 max-h-48 md:max-h-64 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-3">
          {state.chatHistory.slice(-5).map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2 items-start ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`px-3 py-2 md:px-4 md:py-2 rounded-2xl max-w-[80%] text-xs md:text-sm ${
                msg.role === 'user'
                  ? 'bg-blue-600/80 text-white'
                  : 'bg-slate-700/80 text-slate-200'
              }`}>
                <p className="font-semibold mb-1">{msg.role === 'user' ? 'You' : 'Dr. AI'}</p>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Continue Button */}
      {state.chatHistory.length > 3 && !isSpeaking && !isListening && (
        <div className="p-4 md:p-6 bg-slate-900/80 backdrop-blur-sm border-t border-slate-700">
          <button
            onClick={handleContinue}
            className="w-full max-w-md mx-auto block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-4 md:py-5 px-6 md:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-emerald-500/30 text-sm md:text-base"
          >
            {t.continue} to Vitals Check →
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(2);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        .animate-wave {
          animation: wave 0.8s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </div>
  );
}
