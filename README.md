# AI Medical Kiosk

A self-service AI-powered medical consultation kiosk designed for iPad deployment in medical facilities.

## 🏥 Overview

This proof-of-concept application simulates a complete medical consultation experience:
- **AI Doctor Chat** - Voice and text interaction with an AI medical assistant
- **Vitals Collection** - Simulated collection of blood pressure, temperature, weight, and height
- **Point-of-Care Blood Tests** - Selection and simulated execution of common blood tests
- **AI Diagnosis** - Differential diagnosis based on symptoms, vitals, and test results
- **Virtual Doctor Consultation** - Optional video consultation with a real physician
- **Payment Processing** - Complete itemized invoice and payment flow

## 🚀 Features

- **Bilingual Support** - English and Afrikaans
- **Voice Interaction** - Speech-to-text input and text-to-speech output using Web Speech API
- **iPad Optimized** - Designed for landscape mode (1024x768+) with touch-friendly interface
- **Professional Medical UI** - Dark theme with green accents, smooth animations
- **Complete Patient Flow** - 7-step guided consultation process
- **Real-time Progress** - Visual progress indicator throughout the journey

## 🛠️ Tech Stack

- **Next.js 14+** - App Router
- **React 19** - Client-side state management with Context API
- **TypeScript** - Type-safe development
- **Tailwind CSS 4** - Utility-first styling
- **Web Speech API** - Voice input/output
- **OpenAI / Claude API** - AI doctor responses (optional, falls back to mock responses)

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Meta-HealthCEO/ai-medical-kiosk.git
cd ai-medical-kiosk

# Install dependencies
npm install

# Set up environment variables (optional)
cp .env.example .env.local
# Add your OpenAI or Anthropic API key to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Environment Variables

The app works without API keys using mock responses. For full AI functionality, add:

```env
# Choose one:
OPENAI_API_KEY=your_openai_api_key_here
# OR
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

## 🎯 User Flow

1. **Welcome** - Select language (English/Afrikaans)
2. **Chat** - Describe symptoms to AI doctor
3. **Vitals** - Collect blood pressure, temperature, weight, height
4. **Tests** - Select and run blood tests (glucose, cholesterol, etc.)
5. **Diagnosis** - Review AI analysis and recommendations
6. **Doctor** - Optional virtual doctor consultation
7. **Payment** - Complete payment and print receipt

## 📱 Device Requirements

- **Recommended**: iPad (10.2" or larger) in landscape mode
- **Minimum Resolution**: 1024x768
- **Browser**: Modern browser with Web Speech API support (Chrome, Safari, Edge)

## 🎨 Design Principles

- **Medical Professional** - Clean, trustworthy UI that inspires confidence
- **Accessibility** - Large touch targets, high contrast, clear typography
- **Progressive Disclosure** - Show only what's needed at each step
- **Feedback & Guidance** - Clear instructions and visual feedback throughout

## 🏗️ Project Structure

```
ai-medical-kiosk/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # AI chat endpoint
│   ├── components/
│   │   ├── WelcomeScreen.tsx     # Language selection
│   │   ├── ChatScreen.tsx        # AI doctor chat
│   │   ├── VitalsScreen.tsx      # Vitals collection
│   │   ├── BloodTestsScreen.tsx  # Blood test selection
│   │   ├── DiagnosisScreen.tsx   # AI diagnosis results
│   │   ├── VirtualDoctorScreen.tsx # Video consultation
│   │   ├── PaymentScreen.tsx     # Invoice & payment
│   │   └── ProgressBar.tsx       # Progress indicator
│   ├── context/
│   │   └── KioskContext.tsx      # Global state management
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main app component
├── public/                       # Static assets
├── .env.example                  # Environment variables template
└── README.md
```

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Meta-HealthCEO/ai-medical-kiosk)

Or manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## ⚠️ Important Notes

**This is a PROOF OF CONCEPT for demonstration purposes:**
- Device integrations (blood pressure cuff, thermometer, etc.) are **simulated**
- Blood test results are **randomly generated**
- Payment processing is **simulated** (no actual charges)
- AI diagnosis is for **demonstration only** - not medical advice
- Virtual doctor consultation is a **mockup** (no real video call)

**NOT FOR MEDICAL USE** - This application is not certified for medical diagnosis or treatment.

## 📄 License

Copyright © 2024 Ripple Labs. All rights reserved.

## 🤝 About Ripple Labs

This project was built by [Ripple Labs](https://ripplelabs.co.za), a Cape Town-based agency specializing in custom web & mobile applications with AI automation for SMEs.

**Contact**: [hello@ripplelabs.co.za](mailto:hello@ripplelabs.co.za)

---

Built with ❤️ in Cape Town, South Africa 🇿🇦
