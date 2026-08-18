import React, { useState, useRef, useEffect } from 'react';
import { askKingLiftAssistant } from '../../services/geminiService';
import { 
  Bot, 
  X, 
  Send, 
  Key, 
  Zap
} from 'lucide-react';

interface AIConsultantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AIConsultant: React.FC<AIConsultantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: `Hello! I am your **KingLift AI Equipment Engineering Consultant** (powered by Google Gemini).
I can recommend exact lifting machinery based on your load weight, mast reach, battery shift cycles, or OSHA compliance.

What facility application or machinery model can I assist you with today?`,
      timestamp: 'Ready'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('kinglift_gemini_client_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSaveApiKey = (keyVal: string) => {
    setApiKey(keyVal);
    localStorage.setItem('kinglift_gemini_client_key', keyVal);
    setShowApiKeyInput(false);
  };

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInput('');
    setIsLoading(true);

    try {
      const response = await askKingLiftAssistant(textToSend, apiKey);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: 'I encountered a temporary connection issue. You can also contact our US engineering desk directly at **1-800-555-KING (5464)**.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    "What's the difference between KL-EP45Li and KL-EP60HD?",
    "I need to lift 3,500 lb pallets to 12ft racks. Which model?",
    "Can the KL-SC19Li scissor lift fit through standard doors?",
    "How does 48V Lithium opportunity charging compare to Lead-Acid?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col h-[700px] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-lg shadow-md">
              👑
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white font-display uppercase tracking-wide">
                  KingLift AI Equipment Consultant
                </h3>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold">
                  Gemini Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Technical calculations, mast heights, and OSHA compliance advisor.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
              title="Custom Gemini API Key"
            >
              <Key className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* API Key Drawer */}
        {showApiKeyInput && (
          <div className="p-3 bg-slate-950 border-b border-slate-800 text-xs flex gap-2 flex-shrink-0">
            <input
              type="password"
              placeholder="Paste Google AI Studio Gemini API Key..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1 bg-slate-900 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs"
            />
            <button
              onClick={() => handleSaveApiKey(apiKey)}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
            >
              Save Key
            </button>
          </div>
        )}

        {/* Messages Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black flex-shrink-0 mt-0.5 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-4 rounded-2xl max-w-[85%] space-y-2 leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none shadow-md'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-xl'
                }`}
              >
                <div className="whitespace-pre-line">
                  {msg.text}
                </div>
                <div className="text-[10px] text-right opacity-60">
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-amber-400 font-mono flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 animate-pulse" />
                <span>KingLift AI calculating equipment metrics...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Strip */}
        <div className="px-6 py-2 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2 overflow-x-auto flex-shrink-0">
          <span className="text-[10px] uppercase font-bold text-slate-500 flex-shrink-0">Suggested:</span>
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-amber-300 text-[11px] whitespace-nowrap transition-colors flex-shrink-0"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3 flex-shrink-0"
        >
          <input
            type="text"
            placeholder="Ask anything about capacities, dimensions, or models..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-900 text-slate-100 text-xs px-4 py-3 rounded-xl border border-slate-700 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
          />

          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-40"
          >
            <span>Ask</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
