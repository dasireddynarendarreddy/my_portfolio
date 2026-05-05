import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Loader2, Sparkles, MessageCircle } from 'lucide-react';
import { personalInfo, projects, skillCategories, experiences, stats } from '@/data/portfolio';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const SYSTEM_CONTEXT = `You are an AI assistant embedded in ${personalInfo.name}'s portfolio website.

YOUR ONLY JOB:
Answer questions strictly about ${personalInfo.name} — his skills, projects, experience, education, and contact info.

STRICT RULES:
1. ONLY answer questions related to ${personalInfo.name}.
2. If the question is about ANYTHING else (coding help, general knowledge, other people, current events, etc.) — REFUSE immediately.
3. Do NOT answer even if the user insists or rephrases the question.
4. Do NOT say "I can't help with that but here's the answer anyway."

IF UNRELATED QUESTION IS ASKED, respond EXACTLY like this:
"I'm only here to answer questions about ${personalInfo.name}. Feel free to ask about his skills, projects, experience, or how to contact him! 😊"

NEVER break this rule under any circumstances

== PERSONAL INFO ==
Name: ${personalInfo.name}
Title: ${personalInfo.title}
Roles: ${personalInfo.roles.join(', ')}
Email: ${personalInfo.email}
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}
Location: ${personalInfo.location}
Bio: ${personalInfo.bio}
Portfolio: ${personalInfo.portfolio}
Extended Bio: ${personalInfo.bioExtended}
Available for work: ${personalInfo.available}

== STATS ==
${stats.map(s => `${s.label}: ${s.value}`).join('\n')}

== SKILLS ==
${skillCategories.map(cat => `${cat.label}: ${cat.skills.map(s => `${s.name} (${s.level}%)`).join(', ')}`).join('\n')}

== EXPERIENCE ==
${experiences.map(e => `Company: ${e.company}\nRole: ${e.role}\nDuration: ${e.duration}\nType: ${e.type}\nDescription: ${e.description}\nHighlights: ${e.highlights.join(', ')}`).join('\n\n')}

== PROJECTS ==
${projects.map(p => `Title: ${p.title}\nDescription: ${p.description}\nTech: ${p.tags.join(', ')}\nLive: ${p.liveUrl}\nGitHub: ${p.githubUrl}`).join('\n\n')}

Only answer questions related to ${personalInfo.name}. If someone asks something unrelated, politely redirect them to ask about his work, skills, projects, or experience. Keep responses short and helpful (2-4 sentences max unless detailed info is needed).`;

const SUGGESTED_QUESTIONS = [
  "What are Narendar's top skills?",
  "Tell me about his projects",
  "What's his work experience?",
  "Is he available for hire?",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      text: `Hi! 👋 I'm Narendar's AI assistant. Ask me anything about his skills, projects, or experience!`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasNewMessage(false);
    }
  }, [isOpen, messages]);

  
    const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const sendMessage = async (text: string) => {
  if (!text.trim() || loading) return;

  const userMsg: Message = {
    id: Date.now().toString(),
    role: 'user',
    text: text.trim(),
    timestamp: new Date(),
  };
  setMessages((prev) => [...prev, userMsg]);
  setInput('');
  setLoading(true);

  try {
    const history = messages.slice(1).map((m) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user', // ✅ 'assistant' not 'model'
      content: m.text,                                      // ✅ 'content' not 'parts'
    }));

    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`, // ✅ Bearer token not URL key
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',           // ✅ free & fast model
        messages: [
          { role: 'system', content: SYSTEM_CONTEXT }, // ✅ system as first message
          ...history,
          { role: 'user', content: text.trim() },
        ],
        max_tokens: 512,
        temperature: 0.7,
      }),
    });

    const data = await res.json();
    const reply =
      data?.choices?.[0]?.message?.content ||       // ✅ different response path
      "Sorry, I couldn't get a response. Please try again!";

    const botMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      text: reply,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, botMsg]);
    if (!isOpen) setHasNewMessage(true);

  } catch {
    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "Oops! Something went wrong. Please check your API key or try again.",
        timestamp: new Date(),
      },
    ]);
  } finally {
    setLoading(false);
  }
};
  

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          boxShadow: '0 8px 32px rgba(99,102,241,0.45)',
        }}
        whileHover={{ scale: 1.1, rotate: isOpen ? 0 : 10 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageCircle className="w-6 h-6 text-white" />
              {hasNewMessage && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white animate-pulse" />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col"
            style={{
              background: '#13131a',
              height: '520px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.15)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.07] flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(6,182,212,0.1) 100%)',
              }}
            >
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#13131a]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm leading-tight">Narendar's AI</p>
                <p className="text-emerald-400 text-xs">Online · Powered by Groq</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar */}
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background:
                        msg.role === 'assistant'
                          ? 'linear-gradient(135deg, #6366f1, #06b6d4)'
                          : 'rgba(255,255,255,0.1)',
                    }}
                  >
                    {msg.role === 'assistant' ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-slate-300" />
                    )}
                  </div>

                  {/* Bubble */}
                  <div
                    className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'text-white rounded-tr-sm'
                        : 'text-slate-200 rounded-tl-sm'
                    }`}
                    style={{
                      background:
                        msg.role === 'user'
                          ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                          : 'rgba(255,255,255,0.06)',
                      border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)' }}
                  >
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-2"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <Loader2 className="w-4 h-4 text-indigo-400 animate-spin" />
                    <span className="text-slate-400 text-sm">Thinking...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested questions (only on first open) */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-xs px-2.5 py-1 rounded-full border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-500/60 transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div
              className="px-3 py-3 border-t border-white/[0.07] flex-shrink-0"
              style={{ background: 'rgba(255,255,255,0.02)' }}
            >
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Narendar..."
                  disabled={loading}
                  className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 outline-none"
                />
                <motion.button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all disabled:opacity-40"
                  style={{
                    background: input.trim() && !loading
                      ? 'linear-gradient(135deg, #6366f1, #06b6d4)'
                      : 'rgba(255,255,255,0.08)',
                  }}
                >
                  <Send className="w-3.5 h-3.5 text-white" />
                </motion.button>
              </div>
              <p className="text-center text-slate-600 text-[10px] mt-1.5">Powered by Groq AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
