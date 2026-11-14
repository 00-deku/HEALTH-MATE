import { MedicalReport, ChatMessage } from '../types';

/**
 * HealthMate AI Client Configuration for self-hosted / fine-tuned models
 * Defaults to local vLLM or Ollama instance (OpenAI-compatible format)
 */
const AI_CONFIG = {
  // e.g., 'http://localhost:11434/v1' for Ollama, or 'http://localhost:8000/v1' for vLLM / RunPod
  baseUrl: import.meta.env.VITE_AI_BASE_URL || 'http://localhost:11434/v1',
  model: import.meta.env.VITE_AI_MODEL || 'qwen3:8b',
  apiKey: import.meta.env.VITE_AI_API_KEY || 'ollama',
  timeoutMs: 30000
};

/**
 * System prompt designed specifically for your fine-tuned Qwen 8B model
 */
const SYSTEM_PROMPT_REPORT = `You are HEALTH MATE, a compassionate healthcare AI assistant.
Analyze the provided medical report / lab text. Output ONLY valid JSON with this exact schema:
{
  "plainEnglishVerdict": "1-2 sentence reassuring summary for non-medical readers",
  "keyFindings": ["plain language bullet point 1", "bullet point 2"],
  "actionPoints": ["actionable advice or nutrition tip 1", "tip 2"],
  "questionsForDoctor": ["targeted question 1 for their physician", "question 2"],
  "testItems": [
    {
      "name": "Marker name (e.g. Vitamin D, Hemoglobin)",
      "result": 24,
      "unit": "ng/mL",
      "reference": "30-100 ng/mL",
      "status": "In range" | "Below range" | "Above range",
      "explanation": "Brief layman explanation of what this test marker measures"
    }
  ]
}
Do not prescribe medications or diagnose diseases.`;

/**
 * Calls your fine-tuned Qwen 8B model to interpret medical reports
 */
export async function summarizeReportWithQwen(rawReportText: string): Promise<Partial<MedicalReport> | null> {
  try {
    const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT_REPORT },
          { role: 'user', content: `Please simplify and interpret this medical report:\n\n${rawReportText}` }
        ],
        temperature: 0.2, // Low temperature for high clinical precision
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      console.warn(`[Qwen AI] Fallback triggered. Status: ${response.status}`);
      return null;
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    return JSON.parse(content);
  } catch (err) {
    console.warn('[Qwen AI Service] Could not connect to local Qwen endpoint, using local fallback:', err);
    return null;
  }
}

/**
 * Calls your fine-tuned Qwen 8B model for real-time patient chat
 */
export async function chatWithQwen(userQuestion: string, conversationHistory: ChatMessage[] = []): Promise<string | null> {
  try {
    const formattedHistory = conversationHistory.slice(-6).map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: m.text
    }));

    const response = await fetch(`${AI_CONFIG.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AI_CONFIG.apiKey}`
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        messages: [
          { 
            role: 'system', 
            content: "You are HEALTH MATE, an empathetic, clear medical assistant. Explain medical terms simply without jargon. Always include a reminder to consult a primary physician for clinical decisions. If severe emergency symptoms (acute chest pain, sudden stroke symptoms, severe breathing distress) are described, urge calling emergency services immediately." 
          },
          ...formattedHistory,
          { role: 'user', content: userQuestion }
        ],
        temperature: 0.4
      })
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.warn('[Qwen Chat] Could not connect to Qwen endpoint:', err);
    return null;
  }
}
