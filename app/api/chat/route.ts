import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { messages, language } = await req.json();

    // Use OpenAI or Claude API
    const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
    
    if (!apiKey) {
      // Fallback to mock response for POC
      const lastMessage = messages[messages.length - 1]?.content || '';
      const mockResponse = generateMockResponse(lastMessage, language);
      
      return NextResponse.json({ message: mockResponse });
    }

    // Use OpenAI API if available
    if (process.env.OPENAI_API_KEY) {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: language === 'en'
                ? 'You are Dr. AI, a compassionate and professional medical AI assistant in a kiosk setting. Ask relevant follow-up questions about symptoms, duration, severity, and medical history. Be empathetic and clear. Keep responses concise and conversational.'
                : 'Jy is Dr. AI, \'n medelydende en professionele mediese KI-assistent in \'n kiosk omgewing. Vra relevante opvolg vrae oor simptome, duur, erns, en mediese geskiedenis. Wees empaties en duidelik. Hou antwoorde kortliks en gespreksgewys.',
            },
            ...messages,
          ],
          temperature: 0.7,
          max_tokens: 300,
        }),
      });

      const data = await response.json();
      return NextResponse.json({ message: data.choices[0].message.content });
    }

    // Use Claude API if available
    if (process.env.ANTHROPIC_API_KEY) {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022',
          max_tokens: 300,
          system: language === 'en'
            ? 'You are Dr. AI, a compassionate and professional medical AI assistant in a kiosk setting. Ask relevant follow-up questions about symptoms, duration, severity, and medical history. Be empathetic and clear. Keep responses concise and conversational.'
            : 'Jy is Dr. AI, \'n medelydende en professionele mediese KI-assistent in \'n kiosk omgewing. Vra relevante opvolg vrae oor simptome, duur, erns, en mediese geskiedenis. Wees empaties en duidelik. Hou antwoorde kortliks en gespreksgewys.',
          messages: messages.map((msg: any) => ({
            role: msg.role === 'assistant' ? 'assistant' : 'user',
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();
      return NextResponse.json({ message: data.content[0].text });
    }

    // Fallback
    const lastMessage = messages[messages.length - 1]?.content || '';
    const mockResponse = generateMockResponse(lastMessage, language);
    return NextResponse.json({ message: mockResponse });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

function generateMockResponse(userMessage: string, language: string): string {
  const lowerMessage = userMessage.toLowerCase();

  // Symptom-based responses
  if (lowerMessage.includes('headache') || lowerMessage.includes('head') || lowerMessage.includes('hoofpyn')) {
    return language === 'en'
      ? "I understand you're experiencing headaches. Can you tell me more? How long have you had this headache? Is it constant or does it come and go? On a scale of 1-10, how severe is the pain?"
      : "Ek verstaan jy ervaar hoofpyn. Kan jy my meer vertel? Hoe lank het jy al hierdie hoofpyn? Is dit konstant of kom dit en gaan dit? Op 'n skaal van 1-10, hoe erg is die pyn?";
  }

  if (lowerMessage.includes('fever') || lowerMessage.includes('temperature') || lowerMessage.includes('koors')) {
    return language === 'en'
      ? "A fever can indicate an infection. Have you taken your temperature? Do you have any other symptoms like chills, body aches, or a cough? When did the fever start?"
      : "'n Koors kan 'n infeksie aandui. Het jy jou temperatuur geneem? Het jy enige ander simptome soos koue rillings, liggaamspyne, of 'n hoes? Wanneer het die koors begin?";
  }

  if (lowerMessage.includes('cough') || lowerMessage.includes('throat') || lowerMessage.includes('hoes') || lowerMessage.includes('keel')) {
    return language === 'en'
      ? "Coughs and sore throats are common symptoms. Is your cough dry or are you bringing up phlegm? Do you have a sore throat? Any difficulty breathing?"
      : "Hoes en seer kele is algemene simptome. Is jou hoes droog of hoes jy slym op? Het jy 'n seer keel? Enige moeite met asemhaling?";
  }

  if (lowerMessage.includes('pain') || lowerMessage.includes('ache') || lowerMessage.includes('pyn')) {
    return language === 'en'
      ? "I'm sorry you're in pain. Can you describe where the pain is located and what type of pain it is? Sharp, dull, throbbing? How long have you had it?"
      : "Ek is jammer jy is in pyn. Kan jy beskryf waar die pyn is en watter tipe pyn dit is? Skerp, dof, kloppend? Hoe lank het jy dit al?";
  }

  // Follow-up responses
  if (lowerMessage.includes('days') || lowerMessage.includes('week') || lowerMessage.includes('dae')) {
    return language === 'en'
      ? "Thank you for that information. Are you currently taking any medications? Do you have any known allergies or chronic conditions I should be aware of?"
      : "Dankie vir daardie inligting. Neem jy tans enige medikasie? Het jy enige bekende allergieë of chroniese toestande waarvan ek moet weet?";
  }

  // Default response
  return language === 'en'
    ? "I see. Can you tell me more about your symptoms? When did they start, and have they gotten better or worse over time?"
    : "Ek sien. Kan jy my meer vertel van jou simptome? Wanneer het dit begin, en het dit beter of slegter geword met tyd?";
}
