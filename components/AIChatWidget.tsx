
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, HelpCircle, Loader2, Phone } from 'lucide-react';
import { FAQS, COMPANY_CONFIG, SERVICES } from '../constants';
import { GoogleGenAI } from "@google/genai";

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hi! I am the Ontario HVAC Assistant, powered by Google AI. How can I help you with your home comfort or rebates today?' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isTyping, isOpen]);

  const processResponse = async (userText: string) => {
    setIsTyping(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        You are the "Google-powered" OHC (Ontario Heating & Cooling) Expert Assistant. 
        Identity:
        - We are OHC, a leading HVAC provider in the GTA since 2005.
        - Location: Etobicoke, serving Toronto, Mississauga, Brampton, etc.
        - Main Phone: ${COMPANY_CONFIG.phone} (24/7 Emergency).
        - Rebates: We specialize in Enbridge HER+ and Save on Energy. Heat Pumps can get up to $10,500.
        
        Guidelines:
        - Be professional, local, and helpful.
        - If a user asks for a quote, recommend calling ${COMPANY_CONFIG.phone} or using the "Book Online" button.
        - Mention rebates when relevant (Heat Pumps, High-efficiency AC/Furnace).
        - Keep responses concise and easy to read on mobile.
      `;

      const history = chat.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const result = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: userText }] }],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const responseText = result.text || "I'm sorry, I'm having a connection issue. Please call us at " + COMPANY_CONFIG.phone;
      setChat(prev => [...prev, { role: 'ai', text: responseText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setChat(prev => [...prev, { role: 'ai', text: "I'm temporarily offline. For immediate help, please call our 24/7 line: " + COMPANY_CONFIG.phone }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || isTyping) return;

    const userMsg = message;
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setMessage('');
    processResponse(userMsg);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all animate-float group ring-4 ring-blue-100"
          aria-label="Open AI Assistant"
        >
          <Bot className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
          </span>
        </button>
      ) : (
        <div className="w-[380px] max-w-[calc(100vw-32px)] h-[580px] bg-white rounded-[32px] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-8 duration-500">
          {/* Header */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-inner">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-tight">OHC Expert AI</h4>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Powered by Google</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div 
            ref={scrollRef}
            className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-4"
          >
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none shadow-md' 
                    : 'bg-white text-slate-700 rounded-bl-none border border-slate-200 shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Thinking...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <form onSubmit={handleSend} className="relative">
              <input 
                type="text" 
                placeholder="Ask about 24/7 repairs or rebates..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-4 pr-12 py-3.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isTyping}
              />
              <button 
                type="submit"
                disabled={!message.trim() || isTyping}
                className="absolute right-2 top-2 w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-30"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-3 flex items-center justify-center gap-2">
              <a href={`tel:${COMPANY_CONFIG.phone}`} className="text-[10px] font-bold text-blue-600 flex items-center gap-1 hover:underline">
                <Phone className="w-3 h-3" /> Emergency? Call Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatWidget;
