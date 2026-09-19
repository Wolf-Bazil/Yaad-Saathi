import React, { useState } from 'react';
import { Cpu, Bot, Zap, ArrowRight, ShieldCheck, Clock, FileText, Sliders, Volume2, AlertCircle } from 'lucide-react';
import { sound } from '../lib/audio';

export default function AiArchitectureSection() {
  const [selectedLanguage, setSelectedLanguage] = useState('hi'); // 'en' | 'hi' | 'as'
  const [simLatency, setSimLatency] = useState(2.1); // seconds
  const [isReadingLetter, setIsReadingLetter] = useState(false);

  const reports = {
    en: {
      title: "Weekly Clinical Progress Letter (English)",
      date: "Week ending Sep 18, 2026",
      langCode: "en-IN",
      text: "Shrimati Kamala Devi engaged in 6 reminiscence sessions this week. Working memory retention showed a 12% improvement when identifying family photos from Shillong. Tap latency remained stable at 2.1 seconds with zero acute psychomotor anomalies. Morning alertness peaked consistently between 10:00 AM and 11:15 AM."
    },
    hi: {
      title: "साप्ताहिक प्रगति पत्र (हिंदी)",
      date: "सप्ताह समाप्ति 18 सितंबर 2026",
      langCode: "hi-IN",
      text: "श्रीमती कमला देवी ने इस सप्ताह 6 स्मरण सत्र पूरे किए। शिलॉन्ग की पारिवारिक तस्वीरों को पहचानने में उनकी कार्यशील स्मृति में 12% सुधार देखा गया। प्रतिक्रिया समय 2.1 सेकंड पर स्थिर रहा और कोई तीव्र साइकोमोटर विसंगति नहीं पाई गई। सुबह 10:00 से 11:15 बजे के बीच मानसिक सतर्कता सबसे अधिक रही।"
    },
    as: {
      title: "সাপ্তাহিক প্ৰগতি পত্ৰ (অসমীয়া)",
      date: "সপ্তাহ সমাপ্তি ১৮ ছেপ্টেম্বৰ ২০২৬",
      langCode: "as-IN",
      text: "শ্ৰীমতী Kamala Devi য়ে এই সপ্তাহত ৬ টা স্মৃতিচাৰণ অধিৱেশনত অংশগ্ৰহণ কৰে। শ্বিলঙৰ পৰিয়ালৰ ফটো চিনাক্তকৰণত কাৰ্যক্ষম স্মৃতিশক্তি ১২% বৃদ্ধি পাইছে। প্ৰতিক্ৰিয়াৰ সময় ২.১ ছেকেণ্ডত সুস্থিৰ আছিল। পুৱা ১০:০০ বজাৰ পৰা ১১:১৫ বজাৰ ভিতৰত মানসিক সজাগতা সৰ্বাধিক আছিল।"
    }
  };

  const handleLangSwitch = (lang) => {
    sound.playClick();
    setSelectedLanguage(lang);
  };

  const handleReadAloud = () => {
    sound.playHarmony();
    setIsReadingLetter(true);
    sound.speakPrompt(reports[selectedLanguage].text, reports[selectedLanguage].langCode);
    setTimeout(() => setIsReadingLetter(false), 5000);
  };

  // Real-time explainable ML logic
  const isAcuteAnomaly = simLatency > 3.8;
  const isFatigued = simLatency > 2.5 && !isAcuteAnomaly;
  const adaptiveLevel = isAcuteAnomaly ? 'Level 1 (Safety Floor)' : isFatigued ? 'Level 2 (Calibrated Relief)' : 'Level 3 (Standard Cognitive Challenge)';

  return (
    <section id="ai-engine" className="py-20 sm:py-28 bg-white border-y border-charcoal-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-100 border border-charcoal-200 text-charcoal-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5 text-tea-700" />
            Machine Learning & Psychometrics
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-charcoal-950 tracking-tight leading-[1.15]">
            Two distinct AI tiers.{' '}
            <span className="font-serif italic font-normal text-tea-800">
              Explainable ML + Generative NLP.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed font-normal">
            We don't burn GPU watts on simple decisions. CPU-trained Scikit-Learn handles instant psychomotor telemetry, while DeepSeek Flash drafts empathetic regional family reports.
          </p>
        </div>

        {/* The Two-Tier AI Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* TIER 1: Explainable Predictive ML (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-4 rounded-xl bg-tea-50/70 border border-tea-200/80 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-tea-900">
                Tier 1 • Lightweight Predictive ML (Scikit-Learn on CPU)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-tea-900 text-white">
                Sub-5ms Inference
              </span>
            </div>

            {/* Live Interactive Scikit-Learn Inference Sandbox */}
            <div className="p-5 rounded-2xl bg-white border border-tea-300 shadow-elevation space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-tea-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                    Live ML Decision Simulator (Drag Latency)
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-charcoal-100 text-charcoal-800">
                  Simulated Tap Latency: {simLatency.toFixed(1)}s
                </span>
              </div>

              {/* Slider */}
              <div className="space-y-1">
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.1"
                  value={simLatency}
                  onChange={(e) => { sound.playClick(); setSimLatency(parseFloat(e.target.value)); }}
                  className="w-full accent-tea-700 cursor-pointer h-2 bg-charcoal-200 rounded-lg appearance-none"
                />
                <div className="flex items-center justify-between text-[10px] font-mono text-charcoal-500">
                  <span>1.0s (Alert Peak)</span>
                  <span>2.5s (Fatigue Threshold)</span>
                  <span>3.8s (Acute Anomaly Trigger)</span>
                  <span>5.0s</span>
                </div>
              </div>

              {/* Real-time ML Output Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-charcoal-100">
                <div className="p-3 rounded-xl bg-paper border border-charcoal-200 text-xs">
                  <div className="text-[10px] font-mono text-charcoal-500 uppercase font-semibold">RandomForest Difficulty</div>
                  <div className="text-sm font-bold text-charcoal-900 mt-0.5 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${isAcuteAnomaly ? 'bg-terracotta-500' : isFatigued ? 'bg-amberGold-500' : 'bg-emerald-500'}`} />
                    {adaptiveLevel}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-paper border border-charcoal-200 text-xs">
                  <div className="text-[10px] font-mono text-charcoal-500 uppercase font-semibold">IsolationForest Flag</div>
                  <div className="text-sm font-bold mt-0.5 flex items-center gap-1.5">
                    {isAcuteAnomaly ? (
                      <span className="text-terracotta-700 font-bold flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5 text-terracotta-600" />
                        FLAG −1 (Emergency ASHA Alert Dispatched!)
                      </span>
                    ) : (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        FLAG +1 (Normal Baseline Latency)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Model 1: Adaptive Fatigue */}
            <div className="p-6 rounded-2xl bg-paper border border-charcoal-200/80 hover:border-tea-500 transition-colors shadow-subtle">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-tea-700 uppercase">
                    Model 01 • RandomForestClassifier
                  </span>
                  <h3 className="text-lg font-bold text-charcoal-900 mt-1">
                    Cognitive Fatigue & Adaptive Difficulty
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amberGold-50 text-amberGold-800 border border-amberGold-200 text-[11px] font-semibold">
                  Prevents Agitation
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Monitors response latencies, mistake velocity, and session duration. Drops difficulty dynamically before a "catastrophic reaction" (dementia panic induced by perceived failure).
              </p>
              <div className="mt-3 text-[11px] font-mono text-charcoal-500 bg-white p-2 rounded-lg border border-charcoal-100">
                Features: [avg_latency_ms, mistake_rate, streak, hour_of_day, duration_sec]
              </div>
            </div>

            {/* Model 2: Psychomotor Decline & Anomaly Detector */}
            <div className="p-6 rounded-2xl bg-paper border border-charcoal-200/80 hover:border-tea-500 transition-colors shadow-subtle">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-terracotta-700 uppercase">
                    Model 02 • IsolationForest
                  </span>
                  <h3 className="text-lg font-bold text-charcoal-900 mt-1">
                    Acute Psychomotor Anomaly Detector
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-semibold">
                  Clinical Life-Saver
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Distinguishes gradual neurodegeneration from acute drops. When tap latency spikes 300% overnight, fires an emergency alert to ASHA workers to check for urinary tract infections (UTIs), dehydration, or delirium.
              </p>
              <div className="mt-3 text-[11px] font-mono text-charcoal-500 bg-white p-2 rounded-lg border border-charcoal-100">
                Output: Anomaly Flag [-1: Acute Emergency Alert, +1: Expected Latency]
              </div>
            </div>

            {/* Model 3: Circadian Sundowning Clusterer */}
            <div className="p-6 rounded-2xl bg-paper border border-charcoal-200/80 hover:border-tea-500 transition-colors shadow-subtle">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono font-bold text-tea-700 uppercase">
                    Model 03 • K-Means (k=3)
                  </span>
                  <h3 className="text-lg font-bold text-charcoal-900 mt-1">
                    Circadian "Sundowning" Behavioral Clusterer
                  </h3>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-tea-50 text-tea-800 border border-tea-200 text-[11px] font-semibold">
                  Circadian Optimizer
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Aggregates 24-hour error distribution curves to identify the individual patient's peak lucidity window (typically 10:00 – 11:30 AM), avoiding late afternoon sundowning confusion.
              </p>
            </div>

          </div>

          {/* TIER 2: Generative NLP (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-charcoal-900 text-white flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal-200">
                  Tier 2 • Generative AI (DeepSeek Flash)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/20 text-white">
                  Zero Negative Logic
                </span>
              </div>

              {/* Photo to Quiz Synthesis */}
              <div className="p-6 rounded-2xl bg-paper border border-charcoal-200/80 shadow-subtle">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-tea-700" />
                  <h4 className="text-base font-bold text-charcoal-900">Personal Reminiscence Synthesis</h4>
                </div>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  Caregivers upload an everyday snapshot and type rough notes: <em className="text-charcoal-800 font-serif">"Grandson Amit visiting Shillong with cricket bat."</em> DeepSeek synthesizes cognitive-safe multiple choice questions with affectionate clues and zero punitive framing.
                </p>
              </div>

              {/* Interactive Narrative Progress Report Generator */}
              <div className="p-6 rounded-2xl bg-white border border-charcoal-200 shadow-elevation">
                <div className="flex items-center justify-between pb-3 border-b border-charcoal-100 mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-tea-700" />
                    <span className="text-xs font-bold text-charcoal-900">Multilingual Clinical Letter</span>
                  </div>
                  
                  {/* Language Switcher */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleLangSwitch('en')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedLanguage === 'en' ? 'bg-tea-900 text-white' : 'bg-charcoal-100 text-charcoal-600'}`}
                    >
                      ENG
                    </button>
                    <button
                      onClick={() => handleLangSwitch('hi')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedLanguage === 'hi' ? 'bg-tea-900 text-white' : 'bg-charcoal-100 text-charcoal-600'}`}
                    >
                      हिंदी
                    </button>
                    <button
                      onClick={() => handleLangSwitch('as')}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${selectedLanguage === 'as' ? 'bg-tea-900 text-white' : 'bg-charcoal-100 text-charcoal-600'}`}
                    >
                      অসমীয়া
                    </button>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-tea-700 font-semibold mb-1">
                  {reports[selectedLanguage].title}
                </div>
                <div className="text-[10px] text-charcoal-400 mb-2">
                  {reports[selectedLanguage].date}
                </div>
                <p className="text-xs sm:text-[13px] text-charcoal-800 leading-relaxed bg-paper p-3.5 rounded-xl border border-charcoal-100 font-normal">
                  "{reports[selectedLanguage].text}"
                </p>

                <div className="mt-4 pt-3 border-t border-charcoal-100 flex items-center justify-between text-[10px] text-charcoal-500">
                  <button
                    onClick={handleReadAloud}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-tea-50 text-tea-900 border border-tea-200/80 hover:bg-tea-100 font-semibold transition-all active:scale-95"
                  >
                    <Volume2 className={`w-3.5 h-3.5 text-tea-700 ${isReadingLetter ? 'animate-bounce' : ''}`} />
                    <span>{isReadingLetter ? 'Reading Letter Aloud...' : 'Listen in Regional Audio'}</span>
                  </button>
                  <span className="font-semibold text-emerald-700">✓ Ready to Export to ASHA Record</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
