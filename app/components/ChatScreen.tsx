"use client";

import { useState, useEffect, useRef } from 'react';
import { useKiosk } from '../context/KioskContext';
import { useTranslation, languageNames } from '../i18n/translations';

export default function ChatScreen() {
  const { state, addChatMessage, nextStep, updateActivity } = useKiosk();
  const t = useTranslation(state.language);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Build patient context for AI
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
- Ask follow-up questions about symptoms
- Do not diagnose or prescribe medication
- Recommend vitals check and blood tests when appropriate
`.trim();
  };

  useEffect(() => {
    // Initial greeting from AI doctor with patient context
    if (state.chatHistory.length === 0) {
      const greetingKey = state.language === 'en' ? 
        `Hello ${state.registration.fullName}! I'm Dr. AI, your virtual medical assistant. I've reviewed your medical history. What brings you in today? Please describe your symptoms or health concerns.` :
        `Hallo ${state.registration.fullName}! Ek is Dr. AI, jou virtuele mediese assistent. Ek het jou mediese geskiedenis hersien. Wat bring jou vandag in? Beskryf asseblief jou simptome of gesondheidsbekommernisse.`;
      
      addChatMessage({ role: 'assistant', content: greetingKey });
    }

    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      
      // Map language codes to speech recognition codes
      const langMap: Record<string, string> = {
        en: 'en-US', af: 'af-ZA', zu: 'zu-ZA', xh: 'xh-ZA', 
        st: 'st-ZA', tn: 'tn-ZA', nso: 'nso-ZA', ts: 'ts-ZA',
        ss: 'ss-ZA', ve: 've-ZA', nr: 'nr-ZA'
      };
      recognitionRef.current.lang = langMap[state.language] || 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.chatHistory]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    addChatMessage({ role: 'user', content: userMessage });
    setIsLoading(true);
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
      addChatMessage({ role: 'assistant', content: data.message });

      // Text-to-speech for AI response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(data.message);
        const langMap: Record<string, string> = {
          en: 'en-US', af: 'af-ZA', zu: 'zu-ZA', xh: 'xh-ZA',
        };
        utterance.lang = langMap[state.language] || 'en-US';
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Chat error:', error);
      addChatMessage({
        role: 'assistant',
        content: t.loading,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const handleContinue = () => {
    if (state.chatHistory.length > 2) {
      nextStep();
    }
  };

  return (
    <div className="flex flex-col h-screen pt-20 pb-20" onMouseMove={updateActivity} onTouchStart={updateActivity}>
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
        {state.chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-in`}
          >
            <div
              className={`flex gap-3 max-w-2xl ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                    : 'bg-gradient-to-br from-emerald-500 to-emerald-600'
                } shadow-lg`}
              >
                {msg.role === 'user' ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                  </svg>
                )}
              </div>

              {/* Message bubble */}
              <div
                className={`px-6 py-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                    : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30 text-white'
                } shadow-xl`}
              >
                <p className="text-base leading-relaxed">{msg.content}</p>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex gap-3 max-w-2xl">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
                </svg>
              </div>
              <div className="px-6 py-4 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-emerald-500/30">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-slate-700 bg-slate-900/80 backdrop-blur-sm px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t.typeMessage}
              className="flex-1 px-6 py-4 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg"
              disabled={isLoading}
            />
            <button
              onClick={handleVoiceInput}
              className={`px-6 py-4 rounded-xl font-semibold transition-all duration-300 ${
                isListening
                  ? 'bg-red-600 hover:bg-red-700 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
              }`}
              disabled={isLoading}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-emerald-500/50"
            >
              {t.send}
            </button>
          </div>
          {state.chatHistory.length > 2 && (
            <button
              onClick={handleContinue}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
            >
              {t.continue} →
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
