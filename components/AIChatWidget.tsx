
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Sparkles, HelpCircle } from 'lucide-react';
import { FAQS, COMPANY_CONFIG } from '../constants';

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, isTyping, isOpen]);

  const findFAQAnswer = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    const match = FAQS.find(faq => 
      faq.keywords.some(keyword => lowercaseInput.includes(keyword)) ||
      lowercaseInput.includes(faq.question.toLowerCase())
    );
    return match ? match.answer : null;
  };

  const processResponse = (userText: string) => {
    setIsTyping(true);
    
    setTimeout(() => {
      const faqAnswer = findFAQAnswer(userText);
      let aiResponse = "";

      if (faqAnswer) {
        aiResponse = faqAnswer;
      } else {
        aiResponse = `I'm not exactly sure about that, but I'd love to help! For specific inquiries, please call our 24/7 line at ${COMPANY_CONFIG.phone} or ask about our $10,500 heat pump rebates.`;
      }

      setChat(prev => [...prev, { role: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 800);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;

    const userMsg = message;
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setMessage('');
    processResponse(userMsg);
  };

  const handleQuickQuestion = (question: string) => {
    setChat(prev => [...prev, { role: 'user', text: question }]);
    processResponse(question);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform animate-float"
        >
          <MessageCircle className="w-8 h-8" />
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">1</div>
        </button>
      ) : (
        <div className="w-[380px] max-w-[calc(100vw-32px)] h-[550px] bg-white rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-slate-100 animate-in slide-in-from-bottom duration-300">
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm">OHC Assistant</h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">AI Enabled 2026</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-4"
          >
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none shadow-md shadow-blue-100' : 'bg-white text-slate-700 rounded-tl-none border border-slate-100 shadow-sm'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm flex gap-1">
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            )}

            {chat.length === 1 && !isTyping && (
              <div className="flex flex-col gap-2 pt-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-1 flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" />
                  Suggested Questions
                </p>
                {FAQS.map((faq, i) => (
                  <button 
                    key={i}
                    onClick={() => handleQuickQuestion(faq.question)}
                    className="text-left p-3 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 hover:border-blue-400 hover:bg-blue-50 transition-all shadow-sm"
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input 
                type="text" 
                placeholder="Ask about repairs or rebates..."
                className="flex-grow bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button 
                type="submit"
                disabled={!message.trim()}
                className="w-12 h-12 bg-blue-600 text-white rounded-xl flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:bg-slate-400"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-slate-400 font-medium">
              <Sparkles className="w-3 h-3" />
              Powered by OHC AI Knowledge Base
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatWidget;
