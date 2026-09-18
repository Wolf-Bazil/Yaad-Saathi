import React, { useState } from 'react';
import { Play, Check, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Trophy } from 'lucide-react';
import { DEMO_STEPS } from '../data/mockData';
import { sound } from '../lib/audio';

export default function DemoScriptRunner() {
  const [currentStep, setCurrentStep] = useState(0);
  const active = DEMO_STEPS[currentStep];

  const handleNext = () => {
    sound.playClick();
    if (currentStep < DEMO_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      if (currentStep + 1 === 1) {
        sound.speakPrompt('नमस्ते दादी! आज का खेल शुरू करें?');
      } else if (currentStep + 1 === 4) {
        sound.playHarmony();
      }
    } else {
      setCurrentStep(0);
    }
  };

  const handleSelectStep = (idx) => {
    sound.playClick();
    setCurrentStep(idx);
    if (idx === 1) {
      sound.speakPrompt('नमस्ते दादी! आज का खेल शुरू करें?');
    }
  };

  return (
    <section id="demo" className="py-20 sm:py-28 bg-paper relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amberGold-100 border border-amberGold-300 text-amberGold-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <Trophy className="w-3.5 h-3.5 text-amberGold-700" />
            Hackathon Presentation Protocol
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-charcoal-950 tracking-tight leading-[1.15]">
            The winning 3-minute{' '}
            <span className="font-serif italic font-normal text-tea-800">
              SIH jury live demo.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed font-normal">
            Step-by-step walkthrough script engineered specifically for the Smart India Hackathon jury panel. Proving cloud-to-offline continuity in under 180 seconds.
          </p>
        </div>

        {/* Stepper Timeline & Detail Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Stepper Timeline List (5 cols) */}
          <div className="lg:col-span-5 space-y-2.5">
            {DEMO_STEPS.map((item, idx) => {
              const isCurrent = currentStep === idx;
              const isCompleted = currentStep > idx;

              return (
                <div
                  key={item.step}
                  onClick={() => handleSelectStep(idx)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-200 border flex items-center gap-4 ${
                    isCurrent
                      ? 'bg-white border-tea-600 shadow-elevation scale-[1.01]'
                      : isCompleted
                      ? 'bg-white/60 hover:bg-white border-emerald-200 text-charcoal-800'
                      : 'bg-paper/60 hover:bg-white border-charcoal-200/70 text-charcoal-500'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    isCurrent
                      ? 'bg-tea-900 text-white'
                      : isCompleted
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-charcoal-100 text-charcoal-600'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : item.step}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-tea-700 uppercase">
                        {item.actor}
                      </span>
                      <span className="text-[10px] text-charcoal-400 font-mono">
                        Step 0{item.step}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-charcoal-900 truncate mt-0.5">
                      {item.title}
                    </h4>
                  </div>

                  <ChevronRight className={`w-4 h-4 transition-transform ${isCurrent ? 'translate-x-0.5 text-tea-700' : 'text-charcoal-300'}`} />
                </div>
              );
            })}
          </div>

          {/* Detailed Demo Presentation Card (7 cols) */}
          <div className="lg:col-span-7">
            <div className="double-bezel-outer">
              <div className="double-bezel-inner p-6 sm:p-9">
                
                <div className="flex items-center justify-between pb-6 border-b border-charcoal-100">
                  <div>
                    <span className="text-xs font-mono font-bold text-tea-700 uppercase">
                      Jury Demonstration • Step {active.step} of {DEMO_STEPS.length}
                    </span>
                    <h3 className="text-2xl font-extrabold text-charcoal-950 mt-1">
                      {active.title}
                    </h3>
                  </div>
                  
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-tea-50 text-tea-900 border border-tea-200">
                    {active.actor}
                  </span>
                </div>

                <div className="py-6 space-y-6">
                  
                  {/* Action on Stage */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2">
                      Live Action on Device
                    </div>
                    <div className="p-4 rounded-xl bg-paper border border-charcoal-100 text-sm sm:text-base text-charcoal-800 leading-relaxed font-medium">
                      {active.action}
                    </div>
                  </div>

                  {/* Observable Jury Result */}
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-charcoal-500 mb-2">
                      Observable Jury Verification
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 text-sm text-emerald-950 leading-relaxed font-medium flex items-start gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{active.result}</span>
                    </div>
                  </div>

                  {/* Audio trigger hint if applicable */}
                  {active.step === 2 && (
                    <div className="p-3 rounded-xl bg-amberGold-50 border border-amberGold-200 text-xs text-amberGold-900 flex items-center justify-between">
                      <span>Spoken voice prompt trigger enabled:</span>
                      <button
                        onClick={() => sound.speakPrompt('नमस्ते दादी! आज का खेल शुरू करें?')}
                        className="px-2.5 py-1 rounded-md bg-amberGold-600 text-white font-semibold hover:bg-amberGold-700"
                      >
                        Play Greeting Again
                      </button>
                    </div>
                  )}

                </div>

                {/* Card Navigation Controls */}
                <div className="pt-6 border-t border-charcoal-100 flex items-center justify-between">
                  <span className="text-xs text-charcoal-500 font-mono">
                    Time budget: ~30s per step
                  </span>

                  <button
                    onClick={handleNext}
                    className="group flex items-center pl-4 pr-2 py-2 rounded-full bg-tea-900 text-white text-xs font-semibold hover:bg-tea-800 transition-all duration-300 shadow-subtle active:scale-98"
                  >
                    <span>{currentStep < DEMO_STEPS.length - 1 ? 'Next Step' : 'Restart Walkthrough'}</span>
                    <span className="ml-2 w-6 h-6 rounded-full bg-white/15 flex items-center justify-center btn-nested-icon">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
