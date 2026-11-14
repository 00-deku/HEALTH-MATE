import React, { useState } from 'react';
import { Sparkles, Send, ShieldCheck, HelpCircle, ArrowRight, X, Maximize2, Minimize2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuestion?: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'ai',
    text: "Hello! I'm HEALTH MATE, your AI health companion. You can ask me any health questions, clarify test results, check medication timing, or ask about symptoms in plain language.\n\nHow can I help you feel more at ease today?",
    timestamp: 'Just now',
    suggestedQuestions: [
      'What does low Vitamin D mean?',
      'Can I take Omega-3 with lunch?',
      'How to prepare for a fasting blood test?',
      'Is my hemoglobin 13.8 normal?'
    ]
  }
];

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  initialQuestion
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // If opened with an initial question from dashboard
  React.useEffect(() => {
    if (isOpen && initialQuestion) {
      handleSend(initialQuestion);
    }
  }, [isOpen, initialQuestion]);

  if (!isOpen) return null;

  const getKnowledgeResponse = (query: string): { reply: string; severity?: 'normal' | 'caution' | 'emergency'; suggestions?: string[] } => {
    const q = query.toLowerCase();

    if (q.includes('emergency') || q.includes('chest pain') || q.includes('can\'t breathe') || q.includes('shortness of breath') || q.includes('fainting')) {
      return {
        reply: "🚨 **URGENT**: If you or someone around you is experiencing severe chest pain, extreme shortness of breath, acute confusion, or signs of stroke, please call emergency medical services immediately (e.g. 911 / 112). Do not wait.",
        severity: 'emergency',
        suggestions: ['Call emergency medical services', 'Notify emergency contact']
      };
    }

    if (q.includes('vitamin d') || q.includes('vit d')) {
      return {
        reply: "Your recent lab test on 10 Nov showed Vitamin D at **24 ng/mL** (reference range is 30–100 ng/mL).\n\n**What this means:** It's mildly deficient, which is extremely common—especially with indoor work or winter months. It's not dangerous today, but chronically low levels can lead to fatigue, bone aches, or lower immune resistance.\n\n**Action:** Your active medication shows a daily 2,000 IU supplement. Taking this with food containing healthy fats (like breakfast or avocado) optimizes absorption.",
        suggestions: ['Can I take Vitamin D on an empty stomach?', 'What foods have natural Vitamin D?', 'When should I re-test?']
      };
    }

    if (q.includes('fasting') || q.includes('blood test') || q.includes('prepare')) {
      return {
        reply: "To prepare for a fasting blood test (like your fasting glucose or lipid panel):\n\n1. **Fasting window:** Do not eat or drink anything (except plain water) for 8 to 12 hours before the draw.\n2. **Drink plenty of water:** Hydration plumps up your veins, making the blood draw smoother and painless.\n3. **Avoid alcohol and intense exercise:** Both can temporarily distort liver enzymes and glucose.\n4. **Routine medications:** Continue taking heart or blood pressure meds unless your physician explicitly advised to hold them.",
        suggestions: ['Can I drink black coffee while fasting?', 'What if I accidentally took a sip of juice?']
      };
    }

    if (q.includes('hemoglobin') || q.includes('hgb')) {
      return {
        reply: "Your hemoglobin level in your latest test is **13.8 g/dL** (Reference: 12.0 – 17.5 g/dL).\n\nThis is **In range** and indicates that your red blood cells have a strong supply of oxygen-carrying proteins. You do not show signs of anemia.",
        suggestions: ['What causes hemoglobin to drop?', 'Does diet affect hemoglobin?']
      };
    }

    if (q.includes('rash') || q.includes('skin')) {
      return {
        reply: "A mild rash can be triggered by new soaps, fabrics, dry air, mild contact dermatitis, or heat.\n\n**Self-care:** Keep it clean, avoid scratching, and you may apply mild fragrance-free moisturizer or cool compresses.\n\n⚠️ **When to see a doctor:** If the rash spreads quickly, develops pus/blisters, is accompanied by a fever, or involves facial swelling or throat tightness, seek immediate medical attention.",
        severity: 'caution',
        suggestions: ['Is hydrocortisone cream safe for rash?', 'Schedule doctor appointment']
      };
    }

    if (q.includes('omega') || q.includes('fish oil') || q.includes('eat this with my medicine') || q.includes('with food')) {
      return {
        reply: "Yes, Omega-3 Fish Oil (1,000 mg) is best taken **with a meal** (like lunch or dinner) that includes dietary fat. Taking it with food prevents the common 'fishy burps' and enhances bioavailability. There are no adverse interactions between your Multivitamin/D3 and Omega-3.",
        suggestions: ['Does Omega-3 thin the blood?', 'Can I take it before bed?']
      };
    }

    if (q.includes('headache') || q.includes('migraine')) {
      return {
        reply: "Occasional tension headaches are often related to screen fatigue, dehydration, poor sleep, or stress.\n\n**Quick remedies:** Drink a tall glass of cool water, rest in a dim quiet room, and take a 10-minute screen break. If persistent, OTC paracetamol/ibuprofen can provide relief if safe for your stomach.",
        suggestions: ['When is a headache dangerous?', 'Can neck strain cause headaches?']
      };
    }

    return {
      reply: `Thank you for asking about "${query}". In general health management, staying consistent with daily habits—adequate hydration, regular sleep cycles, and timely intake of prescribed supplements—plays a vital role.\n\nCould you clarify if you are experiencing specific symptoms right now, or if this is about one of your test results or medicines?`,
      suggestions: ['Check my test results', 'Review my medications', 'Ask another question']
    };
  };

  const handleSend = (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const resp = getKnowledgeResponse(messageText);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: resp.reply,
        timestamp: 'Just now',
        severity: resp.severity,
        suggestedQuestions: resp.suggestions
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/35 backdrop-blur-xs flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6 animate-in fade-in duration-150">
      {/* Pop-out Chat Window Styled in Calming Sage Theme */}
      <div 
        className={`bg-[#f4f7f4] border border-[#d2dfd4] shadow-2xl flex flex-col transition-all duration-200 overflow-hidden w-full ${
          isExpanded 
            ? 'h-[90vh] sm:max-w-2xl rounded-t-3xl sm:rounded-3xl sm:mr-4' 
            : 'h-[85vh] sm:h-[620px] sm:max-w-md rounded-t-3xl sm:rounded-3xl'
        }`}
      >
        {/* Header Bar matching Card Design */}
        <div className="bg-[#e9f0ea] border-b border-[#d4e1d6] px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img 
              src="/assets/healthmate-logo-tight.png" 
              alt="HEALTH MATE Logo" 
              className="w-7 h-7 object-contain mix-blend-multiply shrink-0"
            />
            <div>
              <h3 className="text-sm font-bold text-[#1b2b1f] leading-none">HEALTH MATE</h3>
              <p className="text-[11px] text-[#5c6f60] mt-1 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Medical knowledge online • Simple answers
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="hidden sm:flex text-gray-500 hover:text-gray-800 p-1.5 rounded-lg hover:bg-white/60 transition cursor-pointer"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-800 p-1.5 rounded-lg hover:bg-white/60 transition cursor-pointer"
              title="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Message Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#f4f7f4]">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl p-3.5 text-xs md:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#2c4a34] text-white rounded-br-xs shadow-xs'
                    : msg.severity === 'emergency'
                    ? 'bg-rose-50 border border-rose-200 text-rose-950 rounded-bl-xs'
                    : msg.severity === 'caution'
                    ? 'bg-amber-50 border border-amber-200 text-amber-950 rounded-bl-xs'
                    : 'bg-white border border-[#dce6dd] text-[#243329] rounded-bl-xs shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1 opacity-70 text-[10px] font-semibold">
                  {msg.sender === 'ai' ? (
                    <>
                      <img 
                        src="/assets/healthmate-logo-tight.png" 
                        alt="HEALTH MATE" 
                        className="w-3.5 h-3.5 object-contain mix-blend-multiply"
                      />
                      <span>HEALTH MATE</span>
                    </>
                  ) : (
                    <span>You</span>
                  )}
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>
                <div className="whitespace-pre-line font-normal">
                  {msg.text}
                </div>
              </div>

              {/* Follow-up suggestions */}
              {msg.suggestedQuestions && msg.suggestedQuestions.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[88%]">
                  {msg.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(q)}
                      className="text-[11px] bg-white hover:bg-[#eaf1eb] text-[#2c4a34] px-2.5 py-1 rounded-full border border-[#d6e3d8] transition flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      <span>{q}</span>
                      <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-xs text-[#5d6f61] p-2.5 bg-white border border-[#dce6dd] rounded-xl w-fit shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 animate-spin text-[#2c4a34]" />
              <span>HEALTH MATE is reviewing medical guidelines...</span>
            </div>
          )}
        </div>

        {/* Quick Question Chips */}
        <div className="px-4 py-2 bg-[#edf3ee] border-t border-[#d8e4da] flex items-center gap-1.5 overflow-x-auto text-[11px]">
          <span className="text-[#5d6f61] shrink-0 font-medium flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Quick:
          </span>
          <button
            onClick={() => handleSend("What does vitamin D do?")}
            className="shrink-0 bg-white hover:bg-[#e4ede5] text-[#2c4a34] px-2.5 py-0.5 rounded-full border border-[#d6e3d8] transition cursor-pointer"
          >
            Vitamin D purpose
          </button>
          <button
            onClick={() => handleSend("How do I prepare for a blood test?")}
            className="shrink-0 bg-white hover:bg-[#e4ede5] text-[#2c4a34] px-2.5 py-0.5 rounded-full border border-[#d6e3d8] transition cursor-pointer"
          >
            Blood test prep
          </button>
          <button
            onClick={() => handleSend("Can I take my medicine with milk or coffee?")}
            className="shrink-0 bg-white hover:bg-[#e4ede5] text-[#2c4a34] px-2.5 py-0.5 rounded-full border border-[#d6e3d8] transition cursor-pointer"
          >
            Medicine with coffee?
          </button>
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-[#e9f0ea] border-t border-[#d4e1d6]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about reports, symptoms, or doses..."
              className="flex-1 bg-white border border-[#cbdbcd] rounded-xl px-3.5 py-2.5 text-xs md:text-sm text-[#243329] focus:outline-none focus:ring-2 focus:ring-[#2c4a34]/30 focus:border-[#2c4a34]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-[#2c4a34] hover:bg-[#203626] disabled:opacity-40 text-white p-2.5 rounded-xl transition flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
              title="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Educational Disclaimer */}
          <div className="mt-2 text-center text-[10px] text-[#637667] flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#355b3d]" />
            <span>Health guidance for understanding • Consult your physician</span>
          </div>
        </div>
      </div>
    </div>
  );
};
