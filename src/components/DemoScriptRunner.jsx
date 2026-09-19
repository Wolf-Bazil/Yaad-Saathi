import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Check, ChevronRight, ArrowRight, ShieldCheck, Sparkles, Trophy, Mic, Clock } from 'lucide-react';
import { DEMO_STEPS } from '../data/mockData';
import { sound } from '../lib/audio';

const PITCH_SCRIPTS = [
  "Respected Jury members, in Step 1, a family caregiver in Shillong uploads a photo of grandson Amit. DeepSeek Flash generates a dignity-preserving reminiscence quiz without clinical anxiety or buzzers.",
  "In Step 2, the grandmother's handset speaks regional audio: 'नमस्ते दादी! आज का खेल शुरू करें?'. Notice the 72px tap targets and AAA contrast built for 72-year-old eyes and unsteady hands.",
  "In Step 3, Dadi matches cultural motifs like the Bihu Japi and recognizes Amit. Tap latencies are indexed at sub-millisecond precision into browser IndexedDB without needing a single internet packet.",
  "Now, Step 4 is the critical Airplane Mode Kill-Test. Watch us turn off Wi-Fi mid-session. The entire therapy continues smoothly without dropping a frame, committing telemetry locally.",
  "In Step 5, when edge connectivity returns, all queued sessions auto-flush seamlessly to Supabase in less than 300 milliseconds.",
  "Finally, Step 6: the ASHA worker's tablet updates the 5-spoke cognitive radar. Our IsolationForest model verifies normal psychomotor latency, ruling out acute delirium or UTIs."
];

export default function DemoScriptRunner() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showPitchScript, setShowPitchScript] = useState(true);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes = 180s
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const active = DEMO_STEPS[currentStep];

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft]);

  const toggleTimer = () => {
    sound.playClick();
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    sound.playClick();
    setIsTimerRunning(false);
    setTimeLeft(180);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
        
        {/* Section Heading & Live 3-Min Stopwatch */}
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-3xl">
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

          {/* 3-Minute Live Presentation Countdown Timer */}
          <div className="p-4 rounded-2xl bg-white border border-charcoal-200/90 shadow-subtle flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-tea-700" />
              <div>
                <div className="text-[10px] font-mono text-charcoal-500 uppercase font-semibold">Jury 180s Pitch Timer</div>
                <div className={`font-mono text-2xl font-extrabold ${timeLeft < 30 ? 'text-terracotta-600 animate-pulse' : 'text-charcoal-900'}`}>
                  {formatTimer(timeLeft)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 border-l border-charcoal-200 pl-4">
              <button
                onClick={toggleTimer}
                className={`p-2 rounded-xl text-white font-bold text-xs flex items-center gap-1 shadow-subtle transition-all active:scale-95 ${
                  isTimerRunning ? 'bg-amberGold-600 hover:bg-amberGold-700' : 'bg-tea-900 hover:bg-tea-800'
                }`}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                <span>{isTimerRunning ? 'Pause' : 'Start'}</span>
              </button>
              <button
                onClick={resetTimer}
                title="Reset Timer"
                className="p-2 rounded-xl bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
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

                <div className="py-6 space-y-5">
                  
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

                  {/* Spoken Presenter Script Box for Jury Pitch */}
                  <div className="p-4 rounded-xl bg-amberGold-50/70 border border-amberGold-200/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amberGold-900 uppercase tracking-wider">
                        <Mic className="w-3.5 h-3.5 text-amberGold-700" />
                        <span>Presenter Speaking Script (~20s pitch)</span>
                      </div>
                      <span className="text-[10px] font-mono text-amberGold-700">Verbatim Practice</span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-amberGold-950 leading-relaxed italic bg-white/60 p-3 rounded-lg border border-amberGold-200/50">
                      "{PITCH_SCRIPTS[currentStep]}"
                    </p>
                  </div>

                  {/* Audio trigger hint if applicable */}
                  {active.step === 2 && (
                    <div className="p-3 rounded-xl bg-tea-50 border border-tea-200 text-xs text-tea-900 flex items-center justify-between">
                      <span>Spoken voice prompt trigger:</span>
                      <button
                        onClick={() => sound.speakPrompt('नमस्ते दादी! आज का खेल शुरू करें?')}
                        className="px-2.5 py-1 rounded-md bg-tea-900 text-white font-semibold hover:bg-tea-800"
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
