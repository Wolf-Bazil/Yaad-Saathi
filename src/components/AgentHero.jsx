import React, { useState } from 'react';
import { ArrowUpRight, Sparkles, Activity, ShieldCheck, WifiOff, Volume2, Heart, RotateCcw } from 'lucide-react';
import { sound } from '../lib/audio';
import { REGIONAL_MOTIFS, RADAR_AXES } from '../data/mockData';

export default function AgentHero() {
  const [activeTab, setActiveTab] = useState('elderly'); // 'elderly' | 'caregiver'
  const [flippedCards, setFlippedCards] = useState([0]); // indexes flipped
  const [voicePlaying, setVoicePlaying] = useState(false);

  const toggleCard = (index) => {
    sound.playClick();
    setFlippedCards(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const playVoice = () => {
    setVoicePlaying(true);
    sound.playHarmony();
    sound.speakPrompt('नमस्ते दादी! क्या आप इस तस्वीर को पहचानती हैं? यह काजीरंगा का एक सींग वाला गेंडा है।');
    setTimeout(() => setVoicePlaying(false), 4000);
  };

  return (
    <section className="relative pt-8 pb-20 sm:pt-14 sm:pb-32 overflow-hidden">
      {/* Subtle warm ambient glow behind hero */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-tea-100/40 via-amberGold-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Eyebrow & Display Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tea-50/80 border border-tea-200/70 text-tea-900 text-xs font-semibold tracking-wide uppercase mb-6 shadow-subtle">
            <Sparkles className="w-3.5 h-3.5 text-tea-700" />
            <span>SIH 2026 Problem Statement 176 • Healthcare & MedTech</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-charcoal-950 leading-[1.08] mb-6">
            The cognitive companion{' '}
            <span className="font-serif italic font-normal text-tea-800 tracking-normal">
              North East India's
            </span>{' '}
            elderly never had.
          </h1>

          <p className="text-base sm:text-xl text-charcoal-600 leading-relaxed font-normal max-w-2xl mx-auto">
            Offline-first reminiscence therapy and cognitive stimulation engineered for terrain blackouts, 200+ indigenous dialects, and zero geriatric neurology infrastructure in rural Assam, Meghalaya, and beyond.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#demo"
              className="group inline-flex items-center pl-6 pr-2 py-3 rounded-full bg-tea-900 text-white text-sm font-semibold hover:bg-tea-800 transition-all duration-300 shadow-elevation active:scale-98"
            >
              <span>Watch 3-Min SIH Hackathon Demo</span>
              <span className="ml-3 w-8 h-8 rounded-full bg-white/15 flex items-center justify-center btn-nested-icon">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </span>
            </a>

            <a
              href="#pillars"
              className="inline-flex items-center px-6 py-3 rounded-full bg-white border border-charcoal-200 text-charcoal-800 text-sm font-semibold hover:bg-charcoal-50 transition-all shadow-subtle active:scale-98"
            >
              Clinical Validation
            </a>
          </div>

          {/* Key Stat Badges Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-charcoal-500 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              100% Offline-First IndexedDB
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-tea-600"></span>
              WCAG AAA Ultra-High Contrast
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-terracotta-500"></span>
              Hindi, Assamese & Regional Voice
            </div>
          </div>

        </div>

        {/* Double-Bezel Hardware Showcase Stage */}
        <div className="max-w-5xl mx-auto">
          <div className="double-bezel-outer">
            <div className="double-bezel-inner p-4 sm:p-7">
              
              {/* Stage Top Bar & Mode Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-charcoal-100">
                
                {/* Mode Switcher Tabs */}
                <div className="flex items-center p-1 rounded-xl bg-charcoal-100/70 border border-black/[0.04]">
                  <button
                    onClick={() => { sound.playClick(); setActiveTab('elderly'); }}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      activeTab === 'elderly'
                        ? 'bg-white text-tea-900 shadow-subtle'
                        : 'text-charcoal-600 hover:text-charcoal-900'
                    }`}
                  >
                    👵 Elderly Mode (Dadi/Dada View)
                  </button>
                  <button
                    onClick={() => { sound.playClick(); setActiveTab('caregiver'); }}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                      activeTab === 'caregiver'
                        ? 'bg-white text-tea-900 shadow-subtle'
                        : 'text-charcoal-600 hover:text-charcoal-900'
                    }`}
                  >
                    📊 Caregiver Telemetry Dashboard
                  </button>
                </div>

                {/* System Telemetry Status Indicators */}
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                    IndexedDB Sync: 0ms
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-charcoal-50 text-charcoal-700 border border-charcoal-200/60">
                    <WifiOff className="w-3 h-3 text-charcoal-500" />
                    Offline Resilient
                  </span>
                </div>

              </div>

              {/* Stage Content Area */}
              <div className="pt-6">
                
                {activeTab === 'elderly' ? (
                  /* ELDERLY VIEW PREVIEW */
                  <div className="space-y-6">
                    
                    {/* Spoken Audio Banner */}
                    <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-amberGold-50/80 border border-amberGold-200/70">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={playVoice}
                          disabled={voicePlaying}
                          className="w-10 h-10 rounded-full bg-amberGold-600 hover:bg-amberGold-700 text-white flex items-center justify-center transition-transform active:scale-95 shadow-subtle shrink-0"
                        >
                          <Volume2 className={`w-5 h-5 ${voicePlaying ? 'animate-bounce' : ''}`} />
                        </button>
                        <div>
                          <div className="text-xs uppercase font-bold tracking-wider text-amberGold-900">
                            Spoken Audio Guidance • बोलकर मार्गदर्शन
                          </div>
                          <div className="text-sm font-medium text-charcoal-800">
                            "नमस्ते दादी! क्या आप इस तस्वीर को पहचानती हैं?"
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-charcoal-500 italic">
                        Tap any card to flip & stimulate recall
                      </div>
                    </div>

                    {/* Regional Tactile Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {REGIONAL_MOTIFS.slice(0, 3).map((item, idx) => {
                        const isFlipped = flippedCards.includes(idx);
                        return (
                          <div
                            key={item.id}
                            onClick={() => toggleCard(idx)}
                            className="cursor-pointer group p-5 rounded-2xl bg-paper hover:bg-white border border-charcoal-200/80 hover:border-tea-500 transition-all duration-300 shadow-subtle hover:shadow-elevation active:scale-[0.98]"
                          >
                            <div className="flex items-start justify-between">
                              <span className="text-4xl filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110">
                                {item.icon}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-tea-50 text-tea-800 border border-tea-200/60 uppercase">
                                Pair #{idx + 1}
                              </span>
                            </div>

                            <div className="mt-4">
                              <h4 className="text-base font-bold text-charcoal-900 flex items-center justify-between">
                                {item.name}
                                <span className="font-serif italic font-normal text-tea-700 text-xs">{item.localName}</span>
                              </h4>
                              <p className="mt-1 text-xs text-charcoal-500">
                                {item.region}
                              </p>
                              <div className="mt-3 pt-3 border-t border-charcoal-100 flex items-center justify-between text-[11px] font-semibold text-tea-700">
                                <span>{isFlipped ? '✓ Recalled' : 'Tap to match'}</span>
                                <span className="text-xs">➔</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tactile Response Feedback */}
                    <div className="p-3.5 rounded-xl bg-tea-50 border border-tea-200/60 flex items-center justify-between text-xs text-tea-900">
                      <div className="flex items-center gap-2 font-semibold">
                        <Heart className="w-4 h-4 text-terracotta-600 fill-terracotta-600" />
                        <span>Adaptive Fatigue Model Active:</span>
                        <span className="font-normal text-tea-800">Response time 2.1s • Latency stable</span>
                      </div>
                      <span className="font-mono font-bold text-tea-700">Challenge Level: Calm / Gentle</span>
                    </div>

                  </div>
                ) : (
                  /* CAREGIVER DASHBOARD PREVIEW */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Radar Chart SVG Widget */}
                    <div className="lg:col-span-6 p-5 rounded-2xl bg-paper border border-charcoal-200/80">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-sm font-bold text-charcoal-900">5-Spoke Cognitive Stability Radar</h4>
                          <p className="text-xs text-charcoal-500">Patient: Shrimati Kamala Devi (Age 72, MCI)</p>
                        </div>
                        <span className="px-2 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-[11px] font-bold">
                          Index: 73/100
                        </span>
                      </div>

                      {/* Interactive SVG Radar Graphic */}
                      <div className="relative flex items-center justify-center py-4">
                        <svg viewBox="0 0 240 240" className="w-52 h-52 overflow-visible">
                          {/* Background Concentric Webs */}
                          {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                            <polygon
                              key={i}
                              points="120,30 205,92 173,190 67,190 35,92"
                              transform={`scale(${scale})`}
                              transform-origin="120 120"
                              fill="none"
                              stroke="#E2E8F0"
                              strokeWidth="1"
                            />
                          ))}

                          {/* Historical 14-Day Polygon (Dashed) */}
                          <polygon
                            points="120,55 185,105 160,175 80,175 55,105"
                            fill="rgba(148, 163, 184, 0.15)"
                            stroke="#94A3B8"
                            strokeWidth="1.5"
                            strokeDasharray="4 3"
                          />

                          {/* Current Active Scoring Polygon */}
                          <polygon
                            points="120,42 195,95 168,180 72,180 45,95"
                            fill="rgba(12, 59, 44, 0.25)"
                            stroke="#0C382E"
                            strokeWidth="2.5"
                          />

                          {/* Axis Labels */}
                          <text x="120" y="16" textAnchor="middle" className="text-[9px] font-bold fill-charcoal-700">Memory (78)</text>
                          <text x="215" y="94" textAnchor="start" className="text-[9px] font-bold fill-charcoal-700">Recognition (86)</text>
                          <text x="180" y="206" textAnchor="middle" className="text-[9px] font-bold fill-charcoal-700">Reasoning (74)</text>
                          <text x="60" y="206" textAnchor="middle" className="text-[9px] font-bold fill-charcoal-700">Attention (65)</text>
                          <text x="25" y="94" textAnchor="end" className="text-[9px] font-bold fill-charcoal-700">Speed (62)</text>
                        </svg>
                      </div>

                      <div className="flex items-center justify-center gap-5 text-xs text-charcoal-500 pt-2 border-t border-charcoal-100">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="w-2.5 h-2.5 rounded-sm bg-tea-900"></span>
                          Current Session
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="w-2.5 h-2.5 rounded-sm bg-charcoal-300"></span>
                          14-Day Baseline
                        </span>
                      </div>
                    </div>

                    {/* Clinical Anomaly & Alert Engine */}
                    <div className="lg:col-span-6 space-y-4">
                      
                      {/* Anomaly Health Guard Card */}
                      <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-subtle">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="text-xs font-bold text-charcoal-900">IsolationForest Psychomotor Check</h5>
                              <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">NORMAL (+1)</span>
                            </div>
                            <p className="mt-1 text-xs text-charcoal-600">
                              Rolling 14-day tap latency is consistent (±140ms). No acute delirium or UTI-induced disorientation detected.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Memory Vault Snippet */}
                      <div className="p-4 rounded-2xl bg-paper border border-charcoal-200/80">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-charcoal-900">Personal Memory Vault</span>
                          <span className="text-[11px] font-semibold text-tea-700">3 Photos Active</span>
                        </div>
                        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white border border-charcoal-100">
                          <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center text-lg shrink-0">
                            🧒
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-bold text-charcoal-900 truncate">Amit (Grandson)</div>
                            <div className="text-[11px] text-charcoal-500 truncate">Shillong • Plays Cricket</div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-tea-50 text-tea-800 font-semibold">
                            Quiz Synced
                          </span>
                        </div>
                      </div>

                      {/* Sundowning Circadian Indicator */}
                      <div className="p-4 rounded-2xl bg-tea-50/70 border border-tea-200/60">
                        <div className="text-xs font-bold text-tea-900 flex items-center justify-between">
                          <span>Optimal Cognitive Window (K-Means)</span>
                          <span className="font-mono text-tea-700 font-bold">10:00 AM – 11:30 AM</span>
                        </div>
                        <p className="mt-1 text-xs text-tea-800/80">
                          Error rates drop 44% during morning hours. Next session scheduled automatically before sundowning fatigue.
                        </p>
                      </div>

                    </div>

                  </div>
                )}

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
