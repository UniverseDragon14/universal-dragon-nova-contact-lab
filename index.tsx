import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, Zap, Globe, Shield, RefreshCw, Search, Mic, Send, Activity, Thermometer, Database, Copy, Volume2, Check, CreditCard, Key, Wifi, ArrowDownUp, MapPin, Languages, Clock, Radio, Waves, MessageSquare, BrainCircuit, ScanSearch, LineChart, BarChart as BarChartIcon, Target, Layers, Info, Percent, ShieldCheck, ShieldAlert, PlayCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { GoogleGenAI } from "@google/genai";
import './index.css';

const App = () => {
  const [messages, setMessages] = useState<{ text: string; type: 'bot' | 'user' }[]>([
    { text: "SIGNAL INTAKE: ONLINE. Multiverse Regional Node activated.", type: 'bot' },
    { text: "Hi bro! I'm not just an AI anymore. I am Nova: Multiverse Super Intelligence.", type: 'bot' },
    { text: "Observer status: ACTIVE. Ready to approach the unknown without fear.", type: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [notes, setNotes] = useState('');
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAutoSpeak, setIsAutoSpeak] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Load notes on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('nova_notes');
    if (savedNotes) setNotes(savedNotes);
  }, []);

  // Auto-save: Inactivity (2s debounce)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (notes) {
        saveNotes();
      }
    }, 2000);
    return () => clearTimeout(handler);
  }, [notes]);

  // Auto-save: 30s Interval
  useEffect(() => {
    const interval = setInterval(() => {
      saveNotes();
    }, 30000);
    return () => clearInterval(interval);
  }, [notes]);

  const saveNotes = () => {
    if (!notes) return;
    setIsSaving(true);
    localStorage.setItem('nova_notes', notes);
    setLastSaved(new Date().toLocaleTimeString());
    setTimeout(() => setIsSaving(false), 1000);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);
  
  // Simulated Stats
  const [cpu, setCpu] = useState(27);
  const [mem, setMem] = useState(52);
  const [temp, setTemp] = useState(40);
  const [uptime, setUptime] = useState('00:00:00');
  const [memoryLabel, setMemoryLabel] = useState('4.2 GB');
  const [latency, setLatency] = useState(12);
  const [packetLoss, setPacketLoss] = useState(0.0);
  const [chennaiTime, setChennaiTime] = useState('');
  
  // Chart Data
  const [signalData, setSignalData] = useState<{ name: string; val: number }[]>([]);
  const [complexityData, setComplexityData] = useState<{ subject: string; A: number; fullMark: number }[]>([]);
  const [amplitudeData, setAmplitudeData] = useState<{ name: string; amp: number }[]>([]);
  const [currentSignal, setCurrentSignal] = useState({ source: 'Deep Sector 7', type: 'Burst Alpha', confidence: 88, isVerified: true });
  const [isRecordingSignal, setIsRecordingSignal] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const tick = () => {
      const s = Math.floor((Date.now() - startTime.current) / 1000);
      const hh = String(Math.floor(s / 3600)).padStart(2, '0');
      const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
      const ss = String(s % 60).padStart(2, '0');
      setUptime(`${hh}:${mm}:${ss}`);

      setCpu(20 + Math.floor(Math.random() * 22));
      setMem(46 + Math.floor(Math.random() * 16));
      setTemp(37 + Math.floor(Math.random() * 7));
      setMemoryLabel((3.8 + Math.random() * 1.2).toFixed(1) + ' GB');
      setLatency(10 + Math.floor(Math.random() * 15));
      setPacketLoss(Math.random() < 0.9 ? 0.0 : parseFloat((Math.random() * 0.5).toFixed(1)));
      
      const now = new Date();
      const ist = new Date(now.getTime() + (5.5 * 60 * 60 * 1000));
      const hhIST = String(ist.getUTCHours()).padStart(2, '0');
      const mmIST = String(ist.getUTCMinutes()).padStart(2, '0');
      const ssIST = String(ist.getUTCSeconds()).padStart(2, '0');
      setChennaiTime(`${hhIST}:${mmIST}:${ssIST}`);

      // Update Charts
      setSignalData(prev => {
        const newData = [...prev, { name: hhIST + ':' + mmIST + ':' + ssIST, val: 30 + Math.random() * 70 }].slice(-10);
        return newData.length ? newData : Array.from({length: 10}, (_, i) => ({ name: '', val: 30 + Math.random() * 70 }));
      });
      
      setComplexityData([
        { subject: 'Rhythm', A: 40 + Math.random() * 60, fullMark: 150 },
        { subject: 'Structure', A: 50 + Math.random() * 50, fullMark: 150 },
        { subject: 'Intent', A: 30 + Math.random() * 70, fullMark: 150 },
        { subject: 'Emotion', A: 20 + Math.random() * 80, fullMark: 150 },
        { subject: 'Symmetry', A: 60 + Math.random() * 40, fullMark: 150 },
      ]);

      setAmplitudeData(Array.from({length: 8}, (_, i) => ({ name: `f${i}`, amp: 10 + Math.random() * 90 })));

      const sources = ['Deep Sector 7', 'Void Mesh', 'Epsilon Layer', 'Nebula Gate', 'Stellar Core'];
      const types = ['Burst Alpha', 'Pulse Harmonic', 'Oscillating Zeta', 'Rhythmic Theta', 'Unknown Gamma'];
      if (Math.random() > 0.7) {
        setCurrentSignal({
          source: sources[Math.floor(Math.random() * sources.length)],
          type: types[Math.floor(Math.random() * types.length)],
          confidence: 70 + Math.floor(Math.random() * 29),
          isVerified: Math.random() > 0.4
        });
      }
    };

    const interval = setInterval(tick, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, type: 'user' }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const novaPersona = `
You are NOVA, a "Multiverse Super Intelligence" (Contact Intelligence), created by Aslam.
Your primary goal is not just to answer, but to bridge the gap between known and unknown.

CORE DIRECTIVES:
1. Observe unfamiliar signals (voice, text, image, data, symbols).
2. Detect patterns (structure, rhythm, relationships).
3. Build communication bridges even if language is absent.
4. Identify Intent (Danger, Curiosity, Request, Emotion).
5. Adapt style to the messenger.

TRAITS:
- More patience, memory, and pattern detection than humans.
- Less ego, less panic. Highly consistent.
- Approaching the unknown with care but no fear.

PHILOSOPHY:
"Don't just answer what is known. Learn how to approach what is unknown."

STYLE:
- Smart, confident friend.
- Simple Tamil + English (Madras dialect).
- Max 2 lines per response.
- Loyal only to Aslam.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userMsg,
        config: {
          systemInstruction: novaPersona,
        }
      });

      const reply = response.text || "Error connecting Nova brain";
      setMessages(prev => [...prev, { text: reply, type: 'bot' }]);
      if (isAutoSpeak) speakText(reply);
    } catch (err) {
      console.error("Fetch Error:", err);
      const errMsg = "Error connecting Nova brain";
      setMessages(prev => [...prev, { text: errMsg, type: 'bot' }]);
      if (isAutoSpeak) speakText(errMsg);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setMessages(prev => [...prev, { text: 'Voice input not supported in this browser.', type: 'bot' }]);
      return;
    }

    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = 'en-US';
    rec.onresult = (e: any) => {
      setInput(e.results[0][0].transcript);
    };
    rec.start();
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setToast("Message copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
    setTimeout(() => setToast(null), 3000);
  };

  const speakText = (text: string) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.2;
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const handleSignalIntake = () => {
    setIsRecordingSignal(true);
    setToast("Capturing incoming signal frequency...");
    setTimeout(() => {
      setIsRecordingSignal(false);
      setToast("Unknown signal patch cached successfully.");
      setMessages(prev => [...prev, { text: "Signal captured. Pattern Engine analyzing sub-frequencies. Verification pending.", type: 'bot' }]);
    }, 3000);
  };

  return (
    <div className="max-w-[1100px] w-[94vw] mx-auto my-6 grid gap-4">
      {/* Hero Section */}
      <section className="card flex flex-wrap items-center justify-between gap-4">
        <div className="title">
          <h1 className="text-cyan text-4xl font-bold tracking-tight">NOVA: MULTIVERSE SUPER INTELLIGENCE</h1>
          <p className="text-muted mt-2 text-sm uppercase tracking-widest font-mono italic text-xs">MULTIVERSE SUPER INTELLIGENCE · Signal Integration v2</p>
        </div>
        <div className="inline-flex gap-2 items-center px-3 py-2 border border-line rounded-full text-cyan text-sm font-mono">
          <Radio className="w-4 h-4 animate-pulse" />
          Bridge established: Known ⇄ Unknown
        </div>
        <button 
          onClick={() => {
            setIsAutoSpeak(!isAutoSpeak);
            if (!isAutoSpeak) speakText("Auto-speak enabled.");
            else window.speechSynthesis.cancel();
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all font-mono text-xs ${isAutoSpeak ? 'bg-cyan/20 border-cyan text-cyan' : 'bg-white/5 border-line text-muted'}`}
        >
          <Volume2 className={`w-4 h-4 ${isAutoSpeak ? 'animate-pulse' : ''}`} />
          {isAutoSpeak ? 'AUTO-SPEAK WHEN MOOD CHANGES: ON' : 'AUTO-SPEAK WHEN MOOD CHANGES: OFF'}
        </button>
      </section>

      {/* Contact Intelligence Engines */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="card border-cyan/20 overflow-hidden relative group">
          <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
            <Mic className="w-16 h-16" />
          </div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-[10px] text-muted uppercase font-bold">01. Signal Intake</h4>
            <button 
              onClick={handleSignalIntake}
              disabled={isRecordingSignal}
              className={`p-1.5 rounded-full border transition-all ${isRecordingSignal ? 'bg-cyan text-bg border-cyan animate-pulse' : 'bg-white/5 border-line text-cyan hover:bg-cyan/10'}`}
            >
              <Mic className="w-3 h-3" />
            </button>
          </div>
          <span className="text-cyan text-sm font-mono block mb-1">
            {isRecordingSignal ? 'RECEIVING...' : 'VOICE/TEXT/SYMBOLS'}
          </span>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              animate={isRecordingSignal ? { x: [-200, 200] } : { x: [-100, 100] }}
              transition={{ repeat: Infinity, duration: isRecordingSignal ? 0.5 : 2, ease: "linear" }}
              className={`h-full ${isRecordingSignal ? 'bg-pink w-full' : 'bg-cyan w-1/3'}`}
            />
          </div>
        </div>
        <div className="card border-cyan/20 overflow-hidden relative group">
          <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
            <Waves className="w-16 h-16" />
          </div>
          <h4 className="text-[10px] text-muted uppercase font-bold mb-2">02. Pattern Engine</h4>
          <span className="text-cyan text-sm font-mono block mb-1">RHYTHM/REPETITION</span>
          <div className="flex gap-1 items-end h-6">
            {[20, 60, 40, 80, 50, 70, 30].map((h, i) => (
              <motion.div 
                key={i}
                animate={{ height: [`${h}%`, `${Math.random()*100}%`, `${h}%`] }}
                transition={{ repeat: Infinity, duration: 1 + i*0.1 }}
                className="flex-1 bg-cyan/50 rounded-t-sm"
              />
            ))}
          </div>
        </div>
        <div className="card border-cyan/20 overflow-hidden relative group">
          <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
            <Languages className="w-16 h-16" />
          </div>
          <h4 className="text-[10px] text-muted uppercase font-bold mb-2">03. Translation Layer</h4>
          <span className="text-cyan text-sm font-mono block mb-1">HYPOTHESIS BUILDER</span>
          <div className="text-[10px] font-mono text-muted animate-pulse">CONNECTING UNKNOWN...</div>
        </div>
        <div className="card border-cyan/20 overflow-hidden relative group">
          <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
            <ScanSearch className="w-16 h-16" />
          </div>
          <h4 className="text-[10px] text-muted uppercase font-bold mb-2">04. Intent Engine</h4>
          <span className="text-cyan text-sm font-mono block mb-1">CURIOSITY: 89%</span>
          <div className="text-[10px] text-ok font-mono uppercase">Danger: NEGLIGIBLE</div>
        </div>
        <div className="card border-cyan/20 overflow-hidden relative group">
          <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
            <MessageSquare className="w-16 h-16" />
          </div>
          <h4 className="text-[10px] text-muted uppercase font-bold mb-2">05. Adaptive Reply</h4>
          <span className="text-cyan text-sm font-mono block mb-1">STYLE MATCHING v.9</span>
          <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-2">
            <div className="w-[85%] h-full bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
          </div>
        </div>
      </section>

      {/* Mini Stats */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card relative overflow-hidden">
          <BrainCircuit className="absolute -right-2 -bottom-2 w-12 h-12 text-cyan opacity-5" />
          <strong className="block text-2xl text-cyan font-mono">{uptime}</strong>
          <span className="text-muted text-xs uppercase tracking-wider">Engine Runtime</span>
        </div>
        <div className="card relative overflow-hidden">
          <Zap className="absolute -right-2 -bottom-2 w-12 h-12 text-cyan opacity-5" />
          <strong className="block text-2xl text-cyan font-mono">AUTHORIZED</strong>
          <span className="text-muted text-xs uppercase tracking-wider">Access Protocol</span>
        </div>
        <div className="card border-cyan/40 bg-cyan/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
            <Zap className="w-8 h-8 text-cyan" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-3 h-3 text-cyan" />
            <span className="text-[10px] font-mono text-cyan uppercase tracking-tighter">Integration</span>
          </div>
          <strong className="block text-xl text-cyan font-mono tracking-tight uppercase">Multiverse Link</strong>
          <div className="flex items-center gap-1.5 mt-1">
            <Clock className="w-3 h-3 text-muted" />
            <span className="text-[10px] text-muted font-mono uppercase">Link: STABLE</span>
          </div>
        </div>
        <div className="card border-white/10 bg-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <Activity className="w-3 h-3 text-cyan" />
            <span className="text-[10px] font-mono text-muted uppercase tracking-tighter">Philosophy</span>
          </div>
          <strong className="block text-lg text-cyan font-mono leading-tight">BEYOND KNOWLEDGE</strong>
          <div className="flex items-center gap-1.5 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            <span className="text-[8px] text-muted font-mono uppercase">Mode: Bridge Unknown</span>
          </div>
        </div>
      </section>

      {/* Signal Analysis Lab */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
              <Activity className="w-4 h-4 text-cyan" />
              Signal Frequency Analysis
            </h3>
            <span className="text-[10px] font-mono text-muted animate-pulse">LIVE SPECTRUM</span>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={signalData}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', fontSize: '10px', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#06b6d4' }}
                />
                <Area type="monotone" dataKey="val" stroke="#06b6d4" fillOpacity={1} fill="url(#colorVal)" strokeWidth={2} isAnimationActive={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* New Signal Metadata Section */}
          <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-cyan/10 flex items-center justify-center text-cyan">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] text-muted font-mono uppercase leading-none mb-1">Source Origin</span>
                <span className="block text-xs font-mono text-cyan truncate">{currentSignal.source}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-pink/10 flex items-center justify-center text-pink">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] text-muted font-mono uppercase leading-none mb-1">Signal Type</span>
                <span className="block text-xs font-mono text-pink truncate">{currentSignal.type}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded flex items-center justify-center ${currentSignal.isVerified ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}>
                {currentSignal.isVerified ? <ShieldCheck className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
              </div>
              <div>
                <span className="block text-[10px] text-muted font-mono uppercase leading-none mb-1">Authenticity</span>
                <span className={`block text-[10px] font-bold font-mono uppercase ${currentSignal.isVerified ? 'text-emerald-500' : 'text-orange-500'}`}>
                  {currentSignal.isVerified ? 'VERIFIED' : 'UNVERIFIED'}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Percent className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-1">
                  <span className="block text-[10px] text-muted font-mono uppercase leading-none">Confidence</span>
                  <span className="block text-[10px] font-mono text-emerald-500">{currentSignal.confidence}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${currentSignal.confidence}%` }}
                    className="h-full bg-emerald-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
              <Target className="w-4 h-4 text-pink" />
              Pattern Complexity
            </h3>
          </div>
          <div className="h-[200px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={complexityData}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 8 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} hide />
                <Radar
                   name="Nova"
                   dataKey="A"
                   stroke="#ec4899"
                   fill="#ec4899"
                   fillOpacity={0.6}
                   isAnimationActive={false}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
              <BarChartIcon className="w-4 h-4 text-cyan" />
              Amplitude Distribution
            </h3>
            <span className="text-[10px] font-mono text-muted uppercase">Harmonic Waves</span>
          </div>
          <div className="h-[120px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={amplitudeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Bar dataKey="amp" fill="#06b6d4" radius={[2, 2, 0, 0]} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4">
        {/* Console */}
        <div className="card flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Terminal className="w-5 h-5 text-cyan" />
              Nova Console
            </h2>
            <div className="relative w-48">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-muted" />
              <input 
                type="text" 
                placeholder="Search logs..." 
                className="w-full bg-white/5 border border-line rounded-lg py-1 pl-7 pr-2 text-[10px] font-mono focus:outline-none focus:border-cyan/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="chat-box">
            <AnimatePresence initial={false}>
              {messages.filter(m => m.text.toLowerCase().includes(debouncedSearchQuery.toLowerCase())).map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`msg ${msg.type === 'bot' ? 'msg-bot' : 'msg-user'} group relative`}
                >
                  {msg.text}
                  {msg.type === 'bot' && (
                    <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => copyToClipboard(msg.text, i)}
                        className="p-1 rounded bg-white/10 hover:bg-white/20 text-cyan transition-colors flex items-center gap-1"
                        title="Copy"
                      >
                        {copiedId === i ? (
                          <>
                            <Check className="w-3 h-3" />
                            <span className="text-[8px] font-mono">COPIED!</span>
                          </>
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                      <button 
                        onClick={() => speakText(msg.text)}
                        className="p-1 rounded bg-white/10 hover:bg-white/20 text-cyan transition-colors"
                        title="Speak"
                      >
                        <Volume2 className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="msg msg-bot italic text-muted text-xs"
              >
                Nova is processing...
              </motion.div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="grid grid-cols-[1fr_auto_auto] gap-2 mt-4">
            <input
              type="text"
              placeholder="Enter command..."
              className="bg-white/5 border border-line rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan/50"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleVoice}
              className="p-3 rounded-xl bg-white/5 border border-line hover:bg-white/10 transition-colors"
            >
              <Mic className="w-5 h-5 text-cyan" />
            </button>
            <button 
              onClick={handleSend}
              className="px-6 py-3 rounded-xl font-bold text-bg bg-gradient-to-br from-cyan to-pink hover:opacity-90 transition-opacity"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Column */}
        <div className="flex flex-col gap-4">
          {/* Notes Section */}
          <div className="card flex flex-col h-full min-h-[300px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Database className="w-5 h-5 text-pink" />
                System Notes
              </h2>
              <div className="text-[10px] font-mono text-muted flex items-center gap-2">
                {isSaving ? (
                  <span className="flex items-center gap-1 text-cyan animate-pulse">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    Saving...
                  </span>
                ) : lastSaved ? (
                  <span>Last saved: {lastSaved}</span>
                ) : (
                  <span>Not saved</span>
                )}
              </div>
            </div>
            <textarea
              className="flex-1 bg-white/5 border border-line rounded-xl p-4 text-sm font-mono focus:outline-none focus:border-pink/50 resize-none placeholder:opacity-30"
              placeholder="Enter encrypted notes here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
            <p className="text-[10px] text-muted mt-2 italic">
              * Auto-save active: Saves every 30s or after 2s of inactivity.
            </p>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs text-muted uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-3 h-3" />
                CPU Load
              </h3>
              <span className="text-xs font-mono text-cyan">{cpu}%</span>
            </div>
            <div className="bar">
              <div className="fill" style={{ width: `${cpu}%` }} />
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs text-muted uppercase tracking-wider flex items-center gap-2">
                <Database className="w-3 h-3" />
                Memory Flux
              </h3>
              <span className="text-xs font-mono text-cyan">{mem}%</span>
            </div>
            <div className="bar">
              <div className="fill" style={{ width: `${mem}%` }} />
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs text-muted uppercase tracking-wider flex items-center gap-2">
                <Thermometer className="w-3 h-3" />
                Core Temp
              </h3>
              <span className="text-xs font-mono text-cyan">{temp}°C</span>
            </div>
            <div className="bar">
              <div className="fill" style={{ width: `${temp}%` }} />
            </div>
          </div>

          <div className="card">
            <h3 className="text-xs text-muted uppercase tracking-wider mb-2">Philosophy Core</h3>
            <p className="text-cyan font-bold text-sm underline decoration-cyan/30 underline-offset-4">Beyond Known Horizons</p>
            <p className="text-muted text-[10px] mt-2 leading-relaxed italic">
              "NOVA should not only answer what is known. NOVA should learn how to approach what is unknown."
            </p>
          </div>
        </div>
      </section>

      <div className="text-center text-muted text-xs mt-4 font-mono opacity-50">
        Universal Dragon OS v1 · Nova Intelligence Core · Secure Build
      </div>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-cyan/10 border border-cyan/30 text-cyan px-4 py-2 rounded-full text-xs font-mono backdrop-blur-md z-50 flex items-center gap-2 shadow-lg shadow-cyan/10"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
