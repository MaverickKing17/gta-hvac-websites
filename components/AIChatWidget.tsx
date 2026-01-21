
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, HelpCircle, Loader2 } from 'lucide-react';
import { FAQS, COMPANY_CONFIG, SERVICES } from '../constants';
import { GoogleGenAI } from "@google/genai";

interface AIChatWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AIChatWidget: React.FC<AIChatWidgetProps> = ({ isOpen, setIsOpen }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chat, setChat] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'Hi! I am the OHC Assistant. How can I help you with your heating, cooling, or rebates today?' }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isTyping, isOpen]);

  const processResponse = async (userText: string) => {
    setIsTyping(true);
    const startTime = Date.now();

    try {
      // Initialize AI right before call to ensure fresh key/instance
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Prepare system context for grounding
      const systemInstruction = `
        You are the OHC (Ontario Heating & Cooling) Assistant. 
        Company Info: 
        - Based in Etobicoke, serving the entire Greater Toronto Area (GTA).
        - Reliable since 2005.
        - 24/7 Emergency Repairs: Call ${COMPANY_CONFIG.phone}.
        - Primary focus: High-efficiency Heat Pumps (up to $10,500 in rebates).
        - Services: ${SERVICES.map(s => s.title).join(', ')}.
        - Tone: Professional, helpful, locally-aware (GTA context), and concise.
        - If someone asks for a quote or booking, guide them to use the "Book Online" button or provide the phone number.
      `;

      // Build context from last few messages
      const history = chat.slice(-4).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...history, { role: 'user', parts: [{ text: userText }] }],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I'm having a bit of trouble connecting. Please feel free to call us directly at " + COMPANY_CONFIG.phone;

      // Ensure typing indicator shows for at least 1500ms for a "natural" feel
      const elapsedTime = Date.now() - startTime;
      const minDelay = 1500;
      if (elapsedTime < minDelay) {
        await new Promise(resolve => setTimeout(resolve, minDelay - elapsedTime));
      }

      setChat(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Chat error:", error);
      // Fallback to static logic if API fails
      const fallback = FAQS.find(f => f.keywords.some(k => userText.toLowerCase().includes(k)))?.answer 
        || "I'd love to help with that. Could you please call our 24/7 line at " + COMPANY_CONFIG.phone + " so one of our experts can assist you?";
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setChat(prev => [...prev, { role: 'ai', text: fallback }]);
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

  const handleQuickQuestion = (question: string) => {
    if (isTyping) return;
    setChat(prev => [...prev, { role: 'user', text: question }]);
    processResponse(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-float group"
        >
          <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">1</div>
        </button>
      ) : (
        <div className="w-[400px] max-w-[calc(100vw-32px)] h-[600px] bg-white rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom-8 duration-500 cubic-bezier(0.4, 0, 0.2, 1)">
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                  <Bot className="w-7 h-7" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <h4 className="font-black text-base tracking-tight">OHC Expert AI</h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest">Online & Ready</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all active:scale-90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div 
            ref={scrollRef}
            className="flex-grow p-6 overflow-y-auto bg-slate-50 space-y-6"
            style={{ scrollBehavior: 'smooth' }}
          >
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`max-w-[85%] p-4 rounded-[24px] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {/* Animated Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white p-4 rounded-[24px] rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1.5">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-blue-600/30 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-blue-600/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-2">Typing...</span>
                </div>
              </div>
            )}

            {chat.length === 1 && !isTyping && (
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-200/50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 flex items-center gap-2">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                  Quick Links
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {FAQS.slice(0, 3).map((faq, i) => (
                    <button 
                      key={i}
                      onClick={() => handleQuickQuestion(faq.question)}
                      className="text-left p-4 rounded-[20px] bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 transition-all shadow-sm active:scale-[0.98]"
                    >
                      {faq.question}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 bg-white border-t border-slate-100">
            <form onSubmit={handleSend} className="relative">
              <input 
                type="text" 
                placeholder="Ask about repairs or $10,500 rebates..."
                className="w-full bg-slate-100 border-none rounded-[20px] pl-6 pr-16 py-4 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-400"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isTyping}
              />
              <button 
                type="submit"
                disabled={!message.trim() || isTyping}
                className="absolute right-2 top-2 w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-all disabled:opacity-0 disabled:scale-90 shadow-lg shadow-blue-200"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Powered by Gemini 3 Flash
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatWidget;
