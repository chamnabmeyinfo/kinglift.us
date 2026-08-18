import React, { useState, useRef, useEffect } from 'react';
import { askKingLiftAssistant } from '../../services/geminiService';
import { 
  Bot, 
  X, 
  Send, 
  Key, 
  User
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
      text: `Hello! I'm your **KingLift Technical Sales Engineer**. I can recommend exact lifting machinery based on your load specs, explain lithium battery charging, or clarify OSHA ANSI B56 compliance. How can I help with your facility equipment today?`,
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

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
          text: 'I encountered a temporary connection issue. Please feel free to call our factory engineers directly at **1-800-555-KING**.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    "What's the difference between KL-EP45Li and KL-EP60HD?",
    "I need to lift 3,000 lb pallets to 10ft racks. Which model?",
    "Can the KL-SC19Li scissor lift fit through standard doors?",
    "How does the 48V Lithium opportunity charging work?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col h-[650px] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 border border-amber-400/20">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-white font-display uppercase tracking-wide">
                  KingLift AI Equipment Advisor
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Google Gemini Powered
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Direct machinery specifications, OSHA compliance & model matching.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowApiKeyInput(!showApiKeyInput)}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-amber-400"
              title="Configure Gemini API Key"
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

        {/* Optional Gemini API Key Drawer */}
        {showApiKeyInput && (
          <div className="p-3 bg-slate-950 border-b border-slate-800 text-xs space-y-1.5">
            <div className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>Custom Gemini API Key (Optional)</span>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="Enter AI Studio API Key (or leave blank to use domain advisor)"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1 bg-slate-900 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs"
              />
              <button
                onClick={() => setShowApiKeyInput(false)}
                className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Messages Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-line'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 items-center text-slate-400 text-xs">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-amber-400 font-mono">
                Consulting KingLift engineering database...
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Sample Prompt Chips */}
        <div className="px-6 py-2 bg-slate-950/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          {sampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-300 text-[10px] whitespace-nowrap transition-colors flex-shrink-0"
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
          className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about specs, lifting capacity, battery runtimes..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-slate-900 text-slate-200 text-xs px-4 py-2.5 rounded-lg border border-slate-700 focus:border-amber-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-all disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
