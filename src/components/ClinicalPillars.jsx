import React, { useState } from 'react';
import { Sparkles, Brain, CheckCircle2, ArrowRight } from 'lucide-react';
import { CLINICAL_GAMES } from '../data/mockData';
import { sound } from '../lib/audio';

export default function ClinicalPillars() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeGame = CLINICAL_GAMES[selectedIdx];

  const handleSelect = (idx) => {
    sound.playClick();
    setSelectedIdx(idx);
  };

  return (
    <section id="pillars" className="py-20 sm:py-28 bg-paper relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tea-100/80 border border-tea-300/60 text-tea-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <Brain className="w-3.5 h-3.5 text-tea-700" />
            Clinical Stimulation Therapy (CST)
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-charcoal-950 tracking-tight leading-[1.15]">
            4 clinically validated pillars.{' '}
            <span className="font-serif italic font-normal text-tea-800">
              Not random mini-games.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed font-normal">
            Every interaction maps to a specific neurocognitive domain proven in clinical randomized trials to decelerate synaptic degeneration and preserve elderly dignity.
          </p>
        </div>

        {/* Interactive Pillar Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Pillar Selector Rail (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {CLINICAL_GAMES.map((game, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <div
                  key={game.id}
                  onClick={() => handleSelect(idx)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border text-left ${
                    isSelected
                      ? 'bg-white border-tea-600 shadow-elevation scale-[1.01]'
                      : 'bg-paper/60 hover:bg-white border-charcoal-200/70 hover:border-charcoal-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-tea-700 tracking-wider">
                      PILLAR {game.num}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      isSelected ? 'bg-tea-50 text-tea-800 border border-tea-200' : 'bg-charcoal-100 text-charcoal-600'
                    }`}>
                      {game.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-charcoal-900 flex items-center justify-between">
                    {game.title}
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? 'translate-x-1 text-tea-700' : 'text-charcoal-300'}`} />
                  </h3>
                  
                  <div className="text-xs text-charcoal-500 mt-1 font-serif italic">
                    {game.hindiTitle}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep-Dive Spec Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="double-bezel-outer">
              <div className="double-bezel-inner p-6 sm:p-9">
                
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-charcoal-100">
                  <div>
                    <span className="text-xs font-mono font-bold text-tea-700 uppercase">
                      Clinical Domain Breakdown
                    </span>
                    <h4 className="text-2xl font-extrabold text-charcoal-950 mt-1">
                      {activeGame.domain}
                    </h4>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-tea-50 border border-tea-200 text-tea-900 text-xs font-semibold">
                    Target: {activeGame.tag}
                  </div>
                </div>

                <div className="py-6 space-y-6">
                  
                  {/* Mechanism Box */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2">
                      Neurobiological Mechanism & Purpose
                    </div>
                    <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed bg-paper p-4 rounded-xl border border-charcoal-100">
                      {activeGame.clinicalMechanism}
                    </p>
                  </div>

                  {/* Cultural Context Box */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2">
                      North Eastern Regional Grounding
                    </div>
                    <div className="p-4 rounded-xl bg-tea-50/70 border border-tea-200/60 text-sm text-tea-950 font-medium">
                      {activeGame.context}
                    </div>
                  </div>

                  {/* Clinical Benefits Checklist */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-3">
                      Validated Clinical Outcomes
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-charcoal-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Prevents Catastrophic Agitation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Preserves Facial Neural Engrams</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Errorless Learning with Zero Buzzers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Continuous Latency Feedback Loop</span>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Pillar Micro-Experience Sandbox */}
                  <div className="pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-tea-800 mb-2.5 flex items-center justify-between">
                      <span>Live Clinical Simulation Sandbox</span>
                      <span className="font-mono text-[10px] text-charcoal-500 font-normal">Interactive Trial</span>
                    </div>

                    {selectedIdx === 0 && (
                      /* Pillar 1: Visuospatial Mini Match */
                      <div className="p-4 rounded-xl bg-tea-50/80 border border-tea-200/80 space-y-3">
                        <div className="text-xs text-tea-950 font-medium">
                          <strong>Visuospatial Parahippocampal Stimulus:</strong> Tap two matching regional icons to complete trial.
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {['🫖', '👒', '🫖', '👒'].map((icon, i) => (
                            <button
                              key={i}
                              onClick={() => { sound.playClick(); sound.playHarmony(); }}
                              className="h-14 rounded-xl bg-white border border-tea-200 hover:border-tea-500 text-2xl flex items-center justify-center shadow-subtle hover:scale-105 active:scale-95 transition-all"
                            >
                              {icon}
                            </button>
                          ))}
                        </div>
                        <div className="text-[11px] text-tea-800 font-mono text-center">
                          ✓ Reaction latency calculated: ~1.85s · Normal range
                        </div>
                      </div>
                    )}

                    {selectedIdx === 1 && (
                      /* Pillar 2: Reminiscence Framing Comparison */
                      <div className="p-4 rounded-xl bg-amberGold-50/80 border border-amberGold-200/80 space-y-2.5">
                        <div className="text-xs font-bold text-amberGold-950">
                          Autobiographical Facial Engram Preserver (Zero-Buzzer Design):
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-lg bg-white/70 border border-charcoal-200 text-charcoal-500 line-through">
                            ❌ Standard Test: "Who is this? (Fails trigger anxiety & refusal)"
                          </div>
                          <div className="p-2.5 rounded-lg bg-white border border-emerald-300 text-emerald-950 font-medium shadow-subtle">
                            ✅ YaadSaathi: "Here is Amit with his cricket bat in Shillong! Remember his smile?"
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedIdx === 2 && (
                      /* Pillar 3: Executive Sequence Pattern */
                      <div className="p-4 rounded-xl bg-paper border border-charcoal-200 space-y-3">
                        <div className="text-xs text-charcoal-800 font-medium flex items-center justify-between">
                          <span>Executive Function Sequence Chain:</span>
                          <span className="font-mono text-[10px] text-tea-700">DLPFC Stimulus</span>
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          <span className="p-2.5 rounded-xl bg-white border border-charcoal-200 text-xl shadow-subtle">🫖</span>
                          <span className="text-charcoal-400 font-mono font-bold">➔</span>
                          <span className="p-2.5 rounded-xl bg-white border border-charcoal-200 text-xl shadow-subtle">👒</span>
                          <span className="text-charcoal-400 font-mono font-bold">➔</span>
                          <span className="p-2.5 rounded-xl bg-white border border-charcoal-200 text-xl shadow-subtle">🦏</span>
                        </div>
                        <div className="text-center">
                          <button
                            onClick={() => { sound.playHarmony(); sound.speakPrompt('चाय की केतली, फिर बिहू जापी, फिर एक सींग वाला गेंडा।'); }}
                            className="px-3 py-1.5 rounded-lg bg-tea-900 hover:bg-tea-800 text-white text-xs font-semibold shadow-subtle transition-all active:scale-95"
                          >
                            Listen to Audio Sequence
                          </button>
                        </div>
                      </div>
                    )}

                    {selectedIdx === 3 && (
                      /* Pillar 4: ADL Routine Association */
                      <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200/80 space-y-2.5">
                        <div className="text-xs text-emerald-950 font-medium">
                          <strong>Activities of Daily Living (ADL) Preservation:</strong> Associating circadian routines with vital health prompts.
                        </div>
                        <div className="space-y-1.5 text-xs text-charcoal-800">
                          <div className="p-2 rounded-lg bg-white border border-emerald-200 flex items-center justify-between">
                            <span>🌅 08:00 AM — Morning Fresh Tea (চাহ)</span>
                            <span className="font-mono text-[10px] text-emerald-700 font-bold">Habit Reinforced</span>
                          </div>
                          <div className="p-2 rounded-lg bg-white border border-emerald-200 flex items-center justify-between">
                            <span>💊 08:30 AM — Blood Pressure Medicine</span>
                            <span className="font-mono text-[10px] text-emerald-700 font-bold">Caregiver Verified</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                </div>

                {/* Bottom Card Footer */}
                <div className="pt-6 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-500">
                  <span>Part of YaadSaathi CST Suite v1.0</span>
                  <span className="font-mono text-tea-700 font-bold">ICMR / ARDSI Aligned</span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
