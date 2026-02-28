"use client";

import { useState, useEffect, useRef } from 'react';
import { useKiosk } from '../context/KioskContext';
import { useTranslation, languageNames } from '../i18n/translations';

type VoiceState = 'idle' | 'listening' | 'processing' | 'speaking';

export default function VoiceAgentScreen() {
  const { state, addChatMessage, nextStep, updateActivity } = useKiosk();
  const t = useTranslation(state.language);
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [conversationCount, setConversationCount] = useState(0);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState('');
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const hasGreetedRef = useRef(false);

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
- After 3-5 exchanges, summarize and suggest moving to vitals check
`.trim();
  };

  // Initialize speech recognition
  useEffect(() => {
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
        setTranscript(transcript);
        handleUserSpeech(transcript);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setVoiceState('idle');
      };

      recognitionRef.current.onend = () => {
        if (voiceState === 'listening') {
          setVoiceState('idle');
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [state.language]);

  // Initial AI greeting
  useEffect(() => {
    if (!hasGreetedRef.current && state.chatHistory.length === 0) {
      hasGreetedRef.current = true;
      const greeting = state.language === 'en'
        ? `Hello, I'm Dr. AI. I've reviewed your medical history. Tell me, what brings you in today?`
        : `Hallo, ek is Dr. AI. Ek het jou mediese geskiedenis hersien. Vertel my, wat bring jou vandag in?`;
      
      addChatMessage({ role: 'assistant', content: greeting });
      speakText(greeting);
    }
  }, []);

  // Text-to-speech function
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    setVoiceState('speaking');
    setAiResponse(text);

    const utterance = new SpeechSynthesisUtterance(text);
    const langMap: Record<string, string> = {
      en: 'en-US', af: 'af-ZA', zu: 'zu-ZA', xh: 'xh-ZA',
      st: 'st-ZA', tn: 'tn-ZA', nso: 'nso-ZA', ts: 'ts-ZA',
      ss: 'ss-ZA', ve: 've-ZA', nr: 'nr-ZA'
    };
    utterance.lang = langMap[state.language] || 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setVoiceState('idle');
      setAiResponse('');
    };

    utterance.onerror = () => {
      setVoiceState('idle');
      setAiResponse('');
    };

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Handle user speech input
  const handleUserSpeech = async (userMessage: string) => {
    addChatMessage({ role: 'user', content: userMessage });
    setVoiceState('processing');
    setTranscript('');
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
      const aiMessage = data.message;
      
      addChatMessage({ role: 'assistant', content: aiMessage });
      setConversationCount(prev => prev + 1);

      // Check if we should auto-advance
      if (conversationCount >= 4) {
        const summaryMessage = state.language === 'en'
          ? "I have enough information. Let's check your vitals now."
          : "Ek het genoeg inligting. Kom ons kyk na jou lewenstekens nou.";
        
        addChatMessage({ role: 'assistant', content: summaryMessage });
        speakText(summaryMessage);
        
        // Auto-advance after speaking
        setTimeout(() => {
          nextStep();
        }, 5000);
      } else {
        speakText(aiMessage);
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = state.language === 'en'
        ? "I'm sorry, I didn't catch that. Could you please repeat?"
        : "Jammer, ek het dit nie gehoor nie. Kan jy asseblief herhaal?";
      
      addChatMessage({ role: 'assistant', content: errorMessage });
      speakText(errorMessage);
    }
  };

  // Handle microphone button press
  const handleMicPress = () => {
    updateActivity();

    if (voiceState === 'listening') {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setVoiceState('idle');
    } else if (voiceState === 'speaking') {
      // Stop speaking
      window.speechSynthesis.cancel();
      setVoiceState('idle');
      setAiResponse('');
    } else if (voiceState === 'idle') {
      // Start listening
      if (recognitionRef.current) {
        setVoiceState('listening');
        setTranscript('');
        try {
          recognitionRef.current.start();
        } catch (error) {
          console.error('Recognition start error:', error);
          setVoiceState('idle');
        }
      }
    }
  };

  // Handle text input submit
  const handleTextSubmit = () => {
    if (!textInput.trim()) return;
    
    const message = textInput.trim();
    setTextInput('');
    handleUserSpeech(message);
  };

  // Get status text
  const getStatusText = () => {
    switch (voiceState) {
      case 'listening':
        return state.language === 'en' ? 'Listening...' : 'Luister...';
      case 'processing':
        return state.language === 'en' ? 'Processing...' : 'Verwerk...';
      case 'speaking':
        return state.language === 'en' ? 'Dr. AI is speaking...' : 'Dr. AI praat...';
      default:
        return state.language === 'en' ? 'Tap to speak' : 'Tik om te praat';
    }
  };

  // Get current display text
  const getDisplayText = () => {
    if (voiceState === 'listening' && transcript) {
      return transcript;
    }
    if (voiceState === 'speaking' && aiResponse) {
      return aiResponse;
    }
    if (voiceState === 'processing') {
      return state.language === 'en' ? 'Thinking...' : 'Dink...';
    }
    return '';
  };

  return (
    <div 
      className="flex flex-col items-center justify-between h-screen pt-16 sm:pt-20 pb-6 sm:pb-8 px-4 sm:px-6"
      onMouseMove={updateActivity}
      onTouchStart={updateActivity}
    >
      {/* AI Doctor Avatar */}
      <div className="text-center mt-4 sm:mt-8">
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/50 mb-3 sm:mb-4">
          <svg className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z" />
          </svg>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-400">Dr. AI</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {state.language === 'en' ? 'Virtual Medical Assistant' : 'Virtuele Mediese Assistent'}
        </p>
      </div>

      {/* Voice Orb */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          {/* Main orb */}
          <div
            className={`
              w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72
              rounded-full flex items-center justify-center
              transition-all duration-300
              ${voiceState === 'idle' ? 'bg-blue-500/20 voice-orb-idle' : ''}
              ${voiceState === 'listening' ? 'bg-red-500/30 voice-orb-listening' : ''}
              ${voiceState === 'speaking' ? 'bg-green-500/30 voice-orb-speaking' : ''}
              ${voiceState === 'processing' ? 'bg-yellow-500/30 voice-orb-processing' : ''}
            `}
          >
            {/* Inner orb */}
            <div
              className={`
                w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56
                rounded-full flex items-center justify-center
                ${voiceState === 'idle' ? 'bg-blue-500/40' : ''}
                ${voiceState === 'listening' ? 'bg-red-500/50' : ''}
                ${voiceState === 'speaking' ? 'bg-green-500/50' : ''}
                ${voiceState === 'processing' ? 'bg-yellow-500/50' : ''}
              `}
            >
              {/* Icon */}
              {voiceState === 'idle' && (
                <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              )}
              {voiceState === 'listening' && (
                <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-red-300 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              )}
              {voiceState === 'speaking' && (
                <svg className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
                </svg>
              )}
              {voiceState === 'processing' && (
                <div className="flex gap-2">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Status and Transcript */}
      <div className="w-full max-w-2xl text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <p className="text-base sm:text-lg md:text-xl font-semibold text-emerald-400">
          {getStatusText()}
        </p>
        <div className="min-h-[60px] sm:min-h-[80px] px-4 sm:px-6 py-3 sm:py-4 bg-slate-800/50 rounded-xl border border-slate-700">
          <p className="text-sm sm:text-base md:text-lg text-slate-300 leading-relaxed">
            {getDisplayText() || (state.language === 'en' ? 'Tap the microphone to begin...' : 'Tik die mikrofoon om te begin...')}
          </p>
        </div>
      </div>

      {/* Microphone Button */}
      <div className="space-y-4 sm:space-y-6 w-full max-w-md">
        <button
          onClick={handleMicPress}
          disabled={voiceState === 'processing'}
          className={`
            w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto rounded-full
            flex items-center justify-center
            transition-all duration-300 transform
            shadow-2xl
            ${voiceState === 'listening' 
              ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 scale-110 shadow-red-500/50' 
              : voiceState === 'speaking'
              ? 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-green-500/50'
              : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:scale-105 shadow-blue-500/50'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          <svg className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Text Input Toggle */}
        <div className="text-center">
          <button
            onClick={() => setShowTextInput(!showTextInput)}
            className="text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors underline"
          >
            {state.language === 'en' ? 'Prefer to type?' : 'Verkies om te tik?'}
          </button>
        </div>

        {/* Text Input (hidden by default) */}
        {showTextInput && (
          <div className="flex gap-2 sm:gap-3 px-4 sm:px-0">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
              placeholder={state.language === 'en' ? 'Type your message...' : 'Tik jou boodskap...'}
              className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-slate-800 border border-slate-700 rounded-lg sm:rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm sm:text-base"
              disabled={voiceState !== 'idle'}
            />
            <button
              onClick={handleTextSubmit}
              disabled={voiceState !== 'idle' || !textInput.trim()}
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {t.send}
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes idle-pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }

        @keyframes speaking-pulse {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(0.95); }
          75% { transform: scale(1.08); }
        }

        @keyframes listening-pulse {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 0 0 rgba(239,68,68,0.4); 
          }
          50% { 
            transform: scale(1.05); 
            box-shadow: 0 0 0 20px rgba(239,68,68,0); 
          }
        }

        @keyframes processing-pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.6;
          }
          50% { 
            transform: scale(1.03); 
            opacity: 1;
          }
        }

        .voice-orb-idle {
          animation: idle-pulse 3s ease-in-out infinite;
        }

        .voice-orb-speaking {
          animation: speaking-pulse 0.8s ease-in-out infinite;
        }

        .voice-orb-listening {
          animation: listening-pulse 1.5s ease-out infinite;
        }

        .voice-orb-processing {
          animation: processing-pulse 1.2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
