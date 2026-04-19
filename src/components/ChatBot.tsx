import { useState, useRef, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2, CheckCheck, ChevronRight, Sparkles, Mail } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

interface LeadForm {
  name: string;
  phone: string;
  email: string;
  message: string;
}

const WHATSAPP_NUMBER = '27823169297';

const getTime = () => new Date().toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const QUICK_REPLIES = [
  { label: '🏗️ Our Services', text: 'What services does Mckeywa offer?' },
  { label: '📋 Get a Quote', text: 'How can I get a project quote?' },
  { label: '📍 Location', text: 'Where are you located?' },
  { label: '📞 Contact Us', text: 'How can I contact Mckeywa?' },
];

const ChatBot = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [tab, setTab] = useState<'chat' | 'lead'>('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! Welcome to Mckeywa Projects. I am here to assist you with any questions about our services, projects, or how to get in touch with our team.',
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quickRepliesVisible, setQuickRepliesVisible] = useState(true);
  const [lead, setLead] = useState<LeadForm>({ name: '', phone: '', email: '', message: '' });
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && tab === 'chat') {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
    }
  }, [messages, isOpen, tab]);

  useEffect(() => {
    if (isOpen && tab === 'chat') {
      setTimeout(() => inputRef.current?.focus(), 400);
    }
  }, [isOpen, tab]);

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || isLoading) return;
    setQuickRepliesVisible(false);
    const userMessage: Message = { role: 'user', content, time: getTime() };
    const updated = [...messages, userMessage];
    setMessages(updated);
    setInput('');
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated.map(({ role, content: c }) => ({ role, content: c })) }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.success ? data.reply : (data.message || 'Sorry, something went wrong.'), time: getTime() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'I am having trouble connecting. Please contact us at (012) 322 6786 or via WhatsApp.', time: getTime() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const handleWhatsApp = () => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email || 'not-provided@mckeywa.co.za',
          phone: lead.phone,
          projectType: 'General Enquiry',
          message: lead.message,
        }),
      });
      const data = await res.json();
      if (data.success) { setLeadStatus('sent'); setLead({ name: '', phone: '', email: '', message: '' }); }
      else setLeadStatus('error');
    } catch { setLeadStatus('error'); }
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontFamily: "'Josefin Sans', sans-serif" }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            style={{
              width: '450px',
              marginBottom: '16px',
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 24px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)',
              background: 'white',
            }}
            className="dark:bg-[#0f0f1a]"
          >
            {/* ── HEADER ── */}
            <div style={{ background: 'linear-gradient(135deg, #e8821a 0%, #c96a0c 50%, #a85508 100%)', position: 'relative', padding: '20px 18px 28px', overflow: 'hidden' }}>
              {/* Decorative circles */}
              <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
              <div style={{ position: 'absolute', bottom: '-20px', left: '60px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />

              <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                {/* Left: avatar + info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(8px)',
                      border: '2px solid rgba(255,255,255,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    }}>
                      <span style={{ color: 'white', fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px' }}>M</span>
                    </div>
                    {/* Online dot */}
                    <span style={{
                      position: 'absolute', bottom: '1px', right: '1px',
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: '#4ade80', border: '2px solid white',
                    }} />
                  </div>
                  <div>
                    <div style={{ color: 'white', fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>Mckeywa Support</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
                      <Sparkles style={{ width: '10px', height: '10px', color: 'rgba(255,255,255,0.7)' }} />
                      <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: '11px' }}>Typically replies instantly</span>
                    </div>
                  </div>
                </div>

                {/* Right: actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={handleWhatsApp}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: '#25D366', color: 'white',
                      border: 'none', borderRadius: '20px',
                      padding: '7px 12px', fontSize: '12px', fontWeight: 700,
                      cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,211,102,0.4)',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#20bc5a')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
                  >
                    <WhatsAppIcon size={13} />
                    WhatsApp
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    style={{
                      width: '30px', height: '30px', borderRadius: '50%',
                      background: 'rgba(255,255,255,0.15)', border: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', cursor: 'pointer', transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                  >
                    <X style={{ width: '14px', height: '14px' }} />
                  </button>
                </div>
              </div>

              {/* Wave bottom */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
                <svg viewBox="0 0 450 20" style={{ display: 'block', width: '100%' }}>
                  <path d="M0,20 C112,0 338,0 450,20 L450,20 L0,20 Z" fill="white" className="dark:fill-[#0f0f1a]" />
                </svg>
              </div>
            </div>

            {/* ── TABS ── */}
            <div style={{ display: 'flex', borderBottom: '1px solid #f0f0f0', background: 'white' }} className="dark:bg-[#0f0f1a] dark:border-gray-800">
              {(['chat', 'lead'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => { setTab(t); setLeadStatus('idle'); }}
                  style={{
                    flex: 1, padding: '11px 0', fontSize: '12px', fontWeight: 700,
                    letterSpacing: '0.3px', border: 'none', background: 'transparent',
                    cursor: 'pointer', position: 'relative', transition: 'color 0.2s',
                    color: tab === t ? '#d27015' : '#9ca3af',
                    fontFamily: 'inherit',
                  }}
                >
                  {t === 'chat' ? '💬  Chat' : '✉️  Leave a Message'}
                  {tab === t && (
                    <motion.div
                      layoutId="underline"
                      style={{
                        position: 'absolute', bottom: 0, left: '15%', right: '15%',
                        height: '2.5px', borderRadius: '2px',
                        background: 'linear-gradient(90deg, #d27015, #e88a30)',
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* ── CHAT TAB ── */}
            {tab === 'chat' && (
              <>
                {/* Messages area */}
                <div
                  style={{ height: '300px', overflowY: 'auto', padding: '16px 16px 8px', display: 'flex', flexDirection: 'column', gap: '12px' }}
                  className="bg-[#fafafa] dark:bg-[#0a0a12]"
                >
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                      style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
                    >
                      {/* Bot avatar */}
                      {msg.role === 'assistant' && (
                        <div style={{
                          width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                          background: 'linear-gradient(135deg, #e8821a, #a85508)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 2px 8px rgba(210,112,21,0.3)',
                          marginBottom: '2px',
                        }}>
                          <span style={{ color: 'white', fontSize: '11px', fontWeight: 800 }}>M</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '74%', gap: '3px' }}>
                        <div style={{
                          padding: '10px 14px',
                          borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                          fontSize: '13.5px', lineHeight: '1.55',
                          background: msg.role === 'user'
                            ? 'linear-gradient(135deg, #e8821a 0%, #b8621a 100%)'
                            : 'white',
                          color: msg.role === 'user' ? 'white' : '#1f2937',
                          boxShadow: msg.role === 'user'
                            ? '0 4px 14px rgba(210,112,21,0.35)'
                            : '0 2px 10px rgba(0,0,0,0.07)',
                          border: msg.role === 'assistant' ? '1px solid #f3f4f6' : 'none',
                        }}
                          className={msg.role === 'assistant' ? 'dark:bg-[#1a1a2e] dark:text-gray-100 dark:border-gray-700' : ''}
                        >
                          {msg.content}
                        </div>

                        {/* Time + read receipt */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontSize: '10px', color: '#9ca3af' }}>{msg.time}</span>
                          {msg.role === 'user' && <CheckCheck style={{ width: '12px', height: '12px', color: '#d27015' }} />}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}
                    >
                      <div style={{
                        width: '30px', height: '30px', borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #e8821a, #a85508)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(210,112,21,0.3)',
                      }}>
                        <span style={{ color: 'white', fontSize: '11px', fontWeight: 800 }}>M</span>
                      </div>
                      <div style={{
                        padding: '12px 16px', borderRadius: '18px 18px 18px 4px',
                        background: 'white', border: '1px solid #f3f4f6',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                        display: 'flex', gap: '5px', alignItems: 'center',
                      }} className="dark:bg-[#1a1a2e] dark:border-gray-700">
                        {[0, 0.18, 0.36].map((delay, n) => (
                          <motion.div
                            key={n}
                            style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#d27015' }}
                            animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay, ease: 'easeInOut' }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Quick reply chips */}
                  {quickRepliesVisible && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      style={{ display: 'flex', flexWrap: 'wrap', gap: '7px', paddingTop: '4px' }}
                    >
                      {QUICK_REPLIES.map((q) => (
                        <button
                          key={q.text}
                          onClick={() => sendMessage(q.text)}
                          style={{
                            fontSize: '12px', padding: '7px 13px', borderRadius: '20px',
                            border: '1.5px solid rgba(210,112,21,0.35)',
                            background: 'white', color: '#c26810',
                            cursor: 'pointer', fontWeight: 600, transition: 'all 0.2s',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                            fontFamily: 'inherit',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.background = '#d27015';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.borderColor = '#d27015';
                            e.currentTarget.style.boxShadow = '0 3px 10px rgba(210,112,21,0.3)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = 'white';
                            e.currentTarget.style.color = '#c26810';
                            e.currentTarget.style.borderColor = 'rgba(210,112,21,0.35)';
                            e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)';
                          }}
                          className="dark:bg-[#1a1a2e] dark:text-[#e88a30]"
                        >
                          {q.label}
                        </button>
                      ))}
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* WhatsApp bar */}
                <button
                  onClick={handleWhatsApp}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 16px', border: 'none', cursor: 'pointer',
                    background: 'linear-gradient(90deg, #f0fdf4, #dcfce7)',
                    borderTop: '1px solid #bbf7d0', borderBottom: '1px solid #bbf7d0',
                    transition: 'background 0.2s', width: '100%',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #dcfce7, #bbf7d0)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #f0fdf4, #dcfce7)')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#16a34a', display: 'flex' }}><WhatsAppIcon size={15} /></span>
                    <span style={{ fontSize: '12px', color: '#15803d', fontWeight: 600 }}>Continue this conversation on WhatsApp</span>
                  </div>
                  <ChevronRight style={{ width: '14px', height: '14px', color: '#16a34a' }} />
                </button>

                {/* Input */}
                <div style={{ padding: '12px 14px', background: 'white', borderTop: '1px solid #f3f4f6' }} className="dark:bg-[#0f0f1a] dark:border-gray-800">
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    background: '#f4f4f8', borderRadius: '50px',
                    padding: '6px 6px 6px 16px',
                    border: '1.5px solid transparent',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                    className="dark:bg-[#1a1a2e]"
                    onFocus={() => {}}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message…"
                      disabled={isLoading}
                      style={{
                        flex: 1, background: 'transparent', border: 'none', outline: 'none',
                        fontSize: '13.5px', color: '#1f2937',
                        fontFamily: 'inherit',
                      }}
                      className="dark:text-gray-100 placeholder:text-gray-400"
                    />
                    <motion.button
                      onClick={() => sendMessage()}
                      disabled={isLoading || !input.trim()}
                      whileTap={{ scale: 0.88 }}
                      whileHover={{ scale: 1.05 }}
                      style={{
                        width: '38px', height: '38px', borderRadius: '50%',
                        background: input.trim() ? 'linear-gradient(135deg, #e8821a, #b8621a)' : '#e5e7eb',
                        border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'background 0.25s',
                        boxShadow: input.trim() ? '0 3px 10px rgba(210,112,21,0.4)' : 'none',
                      }}
                    >
                      {isLoading
                        ? <Loader2 style={{ width: '15px', height: '15px', color: 'white', animation: 'spin 1s linear infinite' }} />
                        : <Send style={{ width: '15px', height: '15px', color: input.trim() ? 'white' : '#9ca3af', marginLeft: '1px' }} />
                      }
                    </motion.button>
                  </div>
                  <p style={{ textAlign: 'center', fontSize: '10px', color: '#c4c4c4', marginTop: '7px' }}>
                    Powered by Mckeywa Projects
                  </p>
                </div>
              </>
            )}

            {/* ── LEAD TAB ── */}
            {tab === 'lead' && (
              <div style={{ background: '#fafafa', overflowY: 'auto', maxHeight: '450px' }} className="dark:bg-[#0a0a12]">
                {leadStatus === 'sent' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center', gap: '16px' }}>
                    <motion.div
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                      style={{
                        width: '64px', height: '64px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #dcfce7, #bbf7d0)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 20px rgba(74,222,128,0.3)',
                      }}
                    >
                      <CheckCheck style={{ width: '28px', height: '28px', color: '#16a34a' }} />
                    </motion.div>
                    <div>
                      <p style={{ fontWeight: 800, fontSize: '16px', color: '#111827', marginBottom: '6px' }} className="dark:text-gray-100">Message Sent!</p>
                      <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.5 }} className="dark:text-gray-400">
                        Thank you for reaching out. Our team will contact you within 2 hours.
                      </p>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                      <button
                        onClick={() => setLeadStatus('idle')}
                        style={{
                          padding: '9px 20px', borderRadius: '10px', border: '1.5px solid #e5e7eb',
                          background: 'white', color: '#374151', fontSize: '13px', fontWeight: 600,
                          cursor: 'pointer', fontFamily: 'inherit',
                        }}
                      >
                        Send Another
                      </button>
                      <button
                        onClick={handleWhatsApp}
                        style={{
                          padding: '9px 20px', borderRadius: '10px', border: 'none',
                          background: '#25D366', color: 'white', fontSize: '13px', fontWeight: 600,
                          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                          fontFamily: 'inherit',
                        }}
                      >
                        <WhatsAppIcon size={14} /> WhatsApp
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} style={{ padding: '18px 18px 20px', display: 'flex', flexDirection: 'column', gap: '13px' }}>
                    <div style={{
                      padding: '12px 14px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, rgba(210,112,21,0.06), rgba(210,112,21,0.02))',
                      border: '1px solid rgba(210,112,21,0.15)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '3px' }}>
                        <Mail style={{ width: '13px', height: '13px', color: '#d27015' }} />
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#d27015' }}>Leave a Message</span>
                      </div>
                      <p style={{ fontSize: '12px', color: '#6b7280', lineHeight: 1.5, margin: 0 }} className="dark:text-gray-400">
                        Fill in your details and a member of our team will contact you shortly.
                      </p>
                    </div>

                    {/* Name + Phone side by side */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {[
                        { label: 'Full Name', key: 'name', type: 'text', placeholder: 'John Dlamini', required: true },
                        { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '082 000 0000', required: true },
                      ].map(({ label, key, type, placeholder, required }) => (
                        <div key={key}>
                          <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6b7280', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.4px' }} className="dark:text-gray-400">
                            {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
                          </label>
                          <input
                            type={type} placeholder={placeholder}
                            value={lead[key as keyof LeadForm]}
                            onChange={(e) => setLead((p) => ({ ...p, [key]: e.target.value }))}
                            required={required}
                            style={{
                              width: '100%', padding: '9px 12px', borderRadius: '10px',
                              border: '1.5px solid #e5e7eb', background: 'white',
                              fontSize: '13px', color: '#1f2937', outline: 'none',
                              transition: 'border-color 0.2s, box-shadow 0.2s',
                              boxSizing: 'border-box', fontFamily: 'inherit',
                            }}
                            className="dark:bg-[#1a1a2e] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
                            onFocus={e => { e.currentTarget.style.borderColor = '#d27015'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(210,112,21,0.12)'; }}
                            onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Email */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6b7280', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.4px' }} className="dark:text-gray-400">
                        Email Address
                      </label>
                      <input
                        type="email" placeholder="john@example.com"
                        value={lead.email}
                        onChange={(e) => setLead((p) => ({ ...p, email: e.target.value }))}
                        style={{
                          width: '100%', padding: '9px 12px', borderRadius: '10px',
                          border: '1.5px solid #e5e7eb', background: 'white',
                          fontSize: '13px', color: '#1f2937', outline: 'none',
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                          boxSizing: 'border-box', fontFamily: 'inherit',
                        }}
                        className="dark:bg-[#1a1a2e] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
                        onFocus={e => { e.currentTarget.style.borderColor = '#d27015'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(210,112,21,0.12)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6b7280', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.4px' }} className="dark:text-gray-400">
                        Message <span style={{ color: '#ef4444' }}>*</span>
                      </label>
                      <textarea
                        placeholder="Describe your project or enquiry…"
                        value={lead.message}
                        onChange={(e) => setLead((p) => ({ ...p, message: e.target.value }))}
                        required rows={3}
                        style={{
                          width: '100%', padding: '9px 12px', borderRadius: '10px',
                          border: '1.5px solid #e5e7eb', background: 'white',
                          fontSize: '13px', color: '#1f2937', outline: 'none',
                          resize: 'none', lineHeight: 1.5,
                          transition: 'border-color 0.2s, box-shadow 0.2s',
                          boxSizing: 'border-box', fontFamily: 'inherit',
                        }}
                        className="dark:bg-[#1a1a2e] dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
                        onFocus={e => { e.currentTarget.style.borderColor = '#d27015'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(210,112,21,0.12)'; }}
                        onBlur={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.boxShadow = 'none'; }}
                      />
                    </div>

                    {leadStatus === 'error' && (
                      <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#fef2f2', border: '1px solid #fecaca', fontSize: '12px', color: '#dc2626' }}>
                        Something went wrong. Please try WhatsApp instead.
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        type="submit"
                        disabled={leadStatus === 'sending'}
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          padding: '11px', borderRadius: '12px', border: 'none',
                          background: 'linear-gradient(135deg, #e8821a, #b8621a)',
                          color: 'white', fontSize: '13px', fontWeight: 700,
                          cursor: leadStatus === 'sending' ? 'not-allowed' : 'pointer',
                          opacity: leadStatus === 'sending' ? 0.7 : 1,
                          boxShadow: '0 4px 14px rgba(210,112,21,0.35)',
                          transition: 'all 0.2s', fontFamily: 'inherit',
                        }}
                      >
                        {leadStatus === 'sending' ? <Loader2 style={{ width: '15px', height: '15px', animation: 'spin 1s linear infinite' }} /> : <Send style={{ width: '15px', height: '15px' }} />}
                        {leadStatus === 'sending' ? 'Sending…' : 'Send Message'}
                      </button>
                      <button
                        type="button" onClick={handleWhatsApp}
                        style={{
                          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          padding: '11px', borderRadius: '12px', border: 'none',
                          background: '#25D366', color: 'white', fontSize: '13px', fontWeight: 700,
                          cursor: 'pointer', boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
                          transition: 'all 0.2s', fontFamily: 'inherit',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#20bc5a')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
                      >
                        <WhatsAppIcon size={15} /> WhatsApp
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FAB ── */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* "Chat with us" label pill */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              style={{
                background: 'white', borderRadius: '20px', padding: '8px 14px',
                fontSize: '13px', fontWeight: 700, color: '#1f2937',
                boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                whiteSpace: 'nowrap', cursor: 'pointer',
                border: '1px solid #f3f4f6',
              }}
              className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              onClick={() => setIsOpen(true)}
            >
              💬 Chat with us
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <motion.div
            style={{
              position: 'absolute', right: 0, bottom: 0,
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'rgba(210,112,21,0.25)',
            }}
            animate={{ scale: [1, 1.6, 1.6], opacity: [0.7, 0, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
          />
        )}

        <motion.button
          onClick={() => setIsOpen((p) => !p)}
          style={{
            width: '56px', height: '56px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #e8821a 0%, #a85508 100%)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', flexShrink: 0,
            boxShadow: '0 6px 24px rgba(210,112,21,0.50)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.91 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          aria-label="Toggle chat"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.16 }}>
                <X style={{ width: '22px', height: '22px' }} />
              </motion.div>
            ) : (
              <motion.div key="msg" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.16 }}>
                <MessageCircle style={{ width: '22px', height: '22px' }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Online dot */}
          {!isOpen && (
            <span style={{
              position: 'absolute', top: '-2px', right: '-2px',
              width: '14px', height: '14px', borderRadius: '50%',
              background: '#4ade80', border: '2.5px solid white',
            }} />
          )}
        </motion.button>
      </div>
    </div>
  );
});

ChatBot.displayName = 'ChatBot';
export default ChatBot;
