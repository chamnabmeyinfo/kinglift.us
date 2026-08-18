import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Bot, 
  Send, 
  Key, 
  Cpu, 
  CheckCircle2, 
  Terminal, 
  Wrench, 
  Zap 
} from 'lucide-react';

interface AgentStep {
  thought?: string;
  toolCall?: {
    name: string;
    args: any;
    result?: any;
  };
  output?: string;
}

interface AgentMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  provider?: string;
  model?: string;
  steps?: AgentStep[];
  executedActions?: string[];
  timestamp: string;
}

export const AIAgentConsole: React.FC<{ onDataChanged?: () => void }> = ({ onDataChanged }) => {
  const { token, user } = useAuth();
  
  const [messages, setMessages] = useState<AgentMessage[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: `Hello ${user?.name || 'Administrator'}! I am your **KingLift Autonomous Backend AI Agent**. 
I have direct administrative access to manage your machinery catalog, advance customer quote pipelines, triage support inquiries, and reconfigure site settings.

What administrative task would you like me to perform today?`,
      timestamp: 'Ready'
    }
  ]);
  
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState<'gemini' | 'openai' | 'local'>('gemini');
  const [model, setModel] = useState('gemini-2.5-flash');
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('kinglift_agent_custom_key') || '');
  const [showConfig, setShowConfig] = useState(false);
  const [toolsList, setToolsList] = useState<any[]>([]);
  const [showToolsDrawer, setShowToolsDrawer] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    // Fetch available tools
    if (token) {
      fetch('/api/agent/tools', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(r => r.ok ? r.json() : null)
        .then(d => {
          if (d?.tools) setToolsList(d.tools);
        })
        .catch(console.error);
    }
  }, [token]);

  const handleSaveApiKey = (keyVal: string) => {
    setApiKey(keyVal);
    localStorage.setItem('kinglift_agent_custom_key', keyVal);
    setShowConfig(false);
  };

  const handleExecuteTask = async (customPrompt?: string) => {
    const promptToRun = customPrompt || input;
    if (!promptToRun.trim() || loading || !token) return;

    const userMsg: AgentMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: promptToRun,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customPrompt) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/agent/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          prompt: promptToRun,
          provider,
          model,
          apiKey: apiKey || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Agent execution failed');

      const agentMsg: AgentMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: data.finalAnswer,
        provider: data.provider,
        model: data.model,
        steps: data.steps,
        executedActions: data.executedActions,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, agentMsg]);

      // If actions were executed, trigger data refresh on dashboard!
      if (data.executedActions && data.executedActions.length > 0 && onDataChanged) {
        onDataChanged();
      }
    } catch (err: any) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          text: `⚠️ Execution notice: ${err.message || 'Failed to complete autonomous task.'}`,
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickActionPrompts = [
    { label: '🏭 Add 5,000 lb Titan Stacker', prompt: 'Add a new heavy straddle stacker model KL-ST50 with 5,000 lbs capacity and 140 inch lift height for $6,400 MSRP' },
    { label: '📊 Executive Pipeline Audit', prompt: 'Generate executive analytics report and pipeline summary' },
    { label: '📦 Mark KL-SC19Li Out of Stock', prompt: 'Mark model KL-SC19Li as out of stock' },
    { label: '🟢 Approve RFQ-DEMO-001', prompt: 'Advance RFQ-DEMO-001 stage to approved with PO issued' },
    { label: '📢 Update Site Top Banner', prompt: 'Update top announcement banner to: DIRECT FACTORY DISPATCH: 48-Hour Nationwide US Freight from Chicago & Dallas Hubs' }
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      
      {/* Header & Provider Configuration Bar */}
      <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-white font-display uppercase tracking-wide">
                KingLift AI Autonomous Operations Agent
              </h3>
              <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                ACTIVE
              </span>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center gap-2">
              <span>Provider: <strong className="text-amber-400">{provider === 'gemini' ? 'Google Gemini Pro/Flash' : provider.toUpperCase()}</strong></span>
              <span>•</span>
              <span>Tools Loaded: <strong className="text-slate-200">{toolsList.length || 10} Administrative Tools</strong></span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setShowToolsDrawer(!showToolsDrawer)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors"
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span>Inspect Tools ({toolsList.length || 10})</span>
          </button>

          <button
            onClick={() => setShowConfig(!showConfig)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>API Settings</span>
          </button>
        </div>
      </div>

      {/* Model & API Key Configuration Drawer */}
      {showConfig && (
        <div className="p-4 bg-slate-950 border-b border-slate-800 text-xs space-y-3">
          <div className="font-bold text-white uppercase text-[11px] flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-amber-400" />
            <span>AI Provider & Gemini Subscription Setup</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Provider</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value as any)}
                className="w-full bg-slate-900 text-slate-200 p-2 rounded-lg border border-slate-700"
              >
                <option value="gemini">Google Gemini (GenAI SDK)</option>
                <option value="openai">OpenAI / Compatible Endpoint</option>
                <option value="local">Autonomous ReAct Tool Engine</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Model Selection</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-900 text-slate-200 p-2 rounded-lg border border-slate-700"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Ultra-Fast Execution)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Reasoning)</option>
                <option value="gpt-4o">GPT-4o / Compatible</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] text-slate-400 uppercase font-semibold block mb-1">Custom API Key</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Paste Gemini/OpenAI API Key..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="flex-1 bg-slate-900 text-slate-200 p-2 rounded-lg border border-slate-700 text-xs"
                />
                <button
                  onClick={() => handleSaveApiKey(apiKey)}
                  className="px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Available Tools Inspector Drawer */}
      {showToolsDrawer && (
        <div className="p-4 bg-slate-950 border-b border-slate-800 text-xs space-y-3 max-h-56 overflow-y-auto">
          <div className="font-bold text-white uppercase text-[11px] flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Wrench className="w-4 h-4 text-amber-400" />
              <span>Registered Administrative Backend Tools</span>
            </span>
            <button onClick={() => setShowToolsDrawer(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {(toolsList.length > 0 ? toolsList : [
              { name: 'create_product', description: 'Add a new machinery model to live catalog' },
              { name: 'update_product', description: 'Modify pricing, stock status, and specifications' },
              { name: 'delete_product', description: 'Remove obsolete model from database' },
              { name: 'list_rfqs', description: 'Retrieve incoming quotes and pipeline leads' },
              { name: 'update_rfq_status', description: 'Advance RFQ status and append sales notes' },
              { name: 'get_analytics_summary', description: 'Compile real-time executive business intelligence' },
              { name: 'update_site_settings', description: 'Reconfigure banner text and company contacts' }
            ]).map((t, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2">
                <span className="font-mono font-bold text-amber-400 text-[11px]">{t.name}</span>
                <span className="text-[10px] text-slate-400 flex-1">{t.description}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Messages Stream */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'agent' && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black flex-shrink-0 mt-0.5 shadow-md">
                👑
              </div>
            )}

            <div
              className={`p-4 rounded-2xl max-w-[88%] space-y-3 ${
                msg.sender === 'user'
                  ? 'bg-amber-500 text-slate-950 font-semibold rounded-tr-none shadow-md'
                  : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-xl'
              }`}
            >
              {/* Message Text */}
              <div className="whitespace-pre-line leading-relaxed">
                {msg.text}
              </div>

              {/* Execution Steps & Tool Calls */}
              {msg.steps && msg.steps.length > 0 && (
                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                    <Terminal className="w-3 h-3" />
                    <span>Autonomous Actions Executed ({msg.steps.length})</span>
                  </div>

                  {msg.steps.map((step, sIdx) => (
                    <div key={sIdx} className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] font-mono space-y-1.5">
                      {step.thought && (
                        <div className="text-slate-400">
                          <span className="text-slate-500">Thought:</span> {step.thought}
                        </div>
                      )}
                      {step.toolCall && (
                        <div className="flex items-center gap-2 text-amber-300">
                          <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/30 text-[10px] font-bold">
                            TOOL: {step.toolCall.name}
                          </span>
                          <span className="text-slate-400 truncate max-w-xs">{JSON.stringify(step.toolCall.args)}</span>
                        </div>
                      )}
                      {step.output && (
                        <div className="text-emerald-400 flex items-center gap-1 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                          <span>{step.output}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Meta timestamp & provider */}
              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                <span>{msg.provider ? `${msg.provider} • ${msg.model}` : ''}</span>
                <span>{msg.timestamp}</span>
              </div>

            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 items-center text-slate-400 text-xs">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-amber-400 font-mono flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 animate-pulse text-amber-400" />
              <span>AI Agent orchestrating tool invocation and updating live database...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Action Prompt Chips */}
      <div className="px-6 py-2.5 bg-slate-950/70 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] uppercase font-bold text-slate-500 flex-shrink-0">Quick Operations:</span>
        {quickActionPrompts.map((action, idx) => (
          <button
            key={idx}
            onClick={() => handleExecuteTask(action.prompt)}
            className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-amber-300 text-[11px] font-medium whitespace-nowrap transition-colors flex-shrink-0 flex items-center gap-1.5"
          >
            <span>{action.label}</span>
          </button>
        ))}
      </div>

      {/* Input Command Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleExecuteTask();
        }}
        className="p-4 bg-slate-950 border-t border-slate-800 flex items-center gap-3"
      >
        <div className="relative flex-1">
          <Terminal className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Instruct AI Agent (e.g. 'Add 5,000 lb electric stacker KL-ST50 for $6,400' or 'Approve RFQ-DEMO-001')..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-slate-900 text-slate-100 text-xs pl-10 pr-4 py-3 rounded-xl border border-slate-700 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 font-mono"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-40"
        >
          <span>Execute</span>
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

    </div>
  );
};
