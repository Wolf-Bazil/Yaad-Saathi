import React, { useState } from 'react';
import { ArrowUpRight, Volume2, CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../lib/audio';

export default function HeroSection() {
  const [selectedCard, setSelectedCard] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completedMatches, setCompletedMatches] = useState([0]);

  const cards = [
    {
      id: 'rhino',
      name: 'Kaziranga Rhino',
      local: 'এশিঙীয়া গঁড়',
      symbol: '🦏',
      prompt: 'काजीरंगा का प्रसिद्ध एक सींग वाला गेंडा। क्या आपने इसे देखा है?',
      domain: 'Visuospatial Recall',
      detail: 'Local wildlife cues spark visual recognition without cognitive fatigue.',
    },
    {
      id: 'tea',
      name: 'Assam Tea Kettle',
      local: 'অসম চাহ কেটলি',
      symbol: '🫖',
      prompt: 'असम के बागानों की सुबह की ताज़ा चाय की केतली।',
      domain: 'Daily Habit Cue',
      detail: 'Associates morning routine memories with comforting sensory recall.',
    },
    {
      id: 'japi',
      name: 'Bihu Japi Hat',
      local: 'বিহু জাপি',
      symbol: '👒',
      prompt: 'पारंपरिक बिहु जापी, असम की लोक संस्कृति का सुंदर प्रतीक।',
      domain: 'Cultural Heritage',
      detail: 'Folk symbols stimulate long-term autobiographical memory networks.',
    },
  ];

  const handleSelectCard = (index) => {
    sound.playClick();
    setSelectedCard(index);
    if (!completedMatches.includes(index)) {
      const next = [...completedMatches, index];
      setCompletedMatches(next);
      if (next.length === cards.length) {
        sound.playHarmony();
        try {
          confetti({
            particleCount: 36,
            spread: 54,
            origin: { y: 0.65 },
            colors: ['#2A6D5B', '#388872', '#C2410C', '#B45309'],
          });
        } catch (e) {
          // ignore canvas limitations
        }
      }
    }
  };

  const handleSpeak = (text) => {
    setIsSpeaking(true);
    sound.playHarmony();
    sound.speakPrompt(text);
    setTimeout(() => setIsSpeaking(false), 3800);
  };

  const handleReset = () => {
    sound.playClick();
    setCompletedMatches([0]);
    setSelectedCard(0);
  };

  return (
    <section className="relative min-h-[calc(100dvh-5rem)] flex items-center py-12 lg:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Subtext, CTAs (Strict Stack Discipline) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* 1. Eyebrow (Allowed 1 of 3 for the page) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tea-50 border border-tea-200 text-tea-900 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-tea-600 animate-pulse"></span>
              <span>SIH 2026 Healthcare MedTech</span>
            </div>

            {/* 2. Headline (Max 2 lines at desktop) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-charcoal-900 leading-[1.12]">
              Cognitive care and memory therapy for{' '}
              <span className="font-serif italic font-normal text-tea-700">
                North East India
              </span>.
            </h1>

            {/* 3. Subtext (Max 20 words) */}
            <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed max-w-xl">
              An offline-first platform helping elderly dementia patients preserve memories through cultural games, with telemetry for rural caregivers.
            </p>

            {/* 4. CTAs (Max 2, non-duplicate intent, single line desktop) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="#patient-activity"
                onClick={() => sound.playClick()}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-tea-900 text-white text-sm font-semibold hover:bg-tea-800 transition-all active:scale-[0.98] shadow-sm"
              >
                <span>Try Patient Activity</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#telemetry"
                onClick={() => sound.playClick()}
                className="inline-flex items-center px-6 py-3.5 rounded-xl bg-white border border-charcoal-200 text-charcoal-800 text-sm font-semibold hover:bg-charcoal-50 transition-all active:scale-[0.98]"
              >
                Caregiver Overview
              </a>
            </div>

            {/* Quiet Core Guardrails */}
            <div className="flex flex-wrap gap-4 pt-3 text-xs font-medium text-charcoal-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-tea-700" />
                100% Offline Capable
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-tea-700" />
                Assamese & Regional Dialects
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-tea-700" />
                Clinically Validated CST
              </span>
            </div>

          </div>

          {/* Right Column: Double-Bezel Framing with Real Photo & Interactive Console */}
          <div id="patient-activity" className="lg:col-span-6">
            <div className="double-bezel-outer p-2 sm:p-3 rounded-3xl bg-tea-950/5 border border-tea-900/10 shadow-elevation">
              <div className="double-bezel-inner rounded-[calc(1.5rem-0.25rem)] bg-white border border-charcoal-200/80 p-4 sm:p-6 space-y-4">
                
                {/* Visual Anchor: Real Editorial Photographic Asset */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/9] border border-charcoal-200">
                  <img
                    src="/images/hero-elderly-care.jpg"
                    alt="Elderly grandmother in Assam engaging with cultural reminiscence tablet on tea garden veranda"
                    className="w-full h-full object-cover"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/70 via-transparent to-transparent flex items-end p-4">
                    <div className="text-white text-xs">
                      <span className="font-semibold block text-sm">Reminiscence in North East India</span>
                      <span className="text-white/80 text-[11px]">Culturally rooted tactile stimulation for rural elder wellness</span>
                    </div>
                  </div>
                </div>

                {/* Tactile Patient Activity Header */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <h2 className="text-sm sm:text-base font-bold text-charcoal-900">
                      Tap a familiar object to listen and recall
                    </h2>
                    <p className="text-xs text-charcoal-500">
                      High-contrast tactile cards with spoken voice assistance.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    title="Reset exercise cards"
                    className="flex items-center gap-1 text-xs text-charcoal-600 hover:text-charcoal-900 px-2.5 py-1.5 rounded-lg border border-charcoal-200 bg-paper transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                </div>

                {/* 3 Tactile Cards */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {cards.map((c, idx) => {
                    const isSelected = selectedCard === idx;
                    const isDone = completedMatches.includes(idx);
                    return (
                      <button
                        type="button"
                        key={c.id}
                        onClick={() => handleSelectCard(idx)}
                        className={`text-left p-3 sm:p-4 rounded-xl border transition-all active:scale-[0.98] ${
                          isSelected
                            ? 'bg-tea-50/90 border-tea-600 ring-2 ring-tea-600/20 shadow-subtle'
                            : 'bg-paper hover:bg-bone border-charcoal-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl sm:text-3xl">{c.symbol}</span>
                          {isDone && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-tea-700 shrink-0" />
                          )}
                        </div>
                        <div className="font-bold text-xs sm:text-sm text-charcoal-900 leading-snug">
                          {c.name}
                        </div>
                        <div className="text-[11px] text-tea-800 font-serif italic mt-0.5">
                          {c.local}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Card Spoken Guide & Voice Trigger */}
                <div className="bg-bone rounded-xl p-3.5 sm:p-4 border border-charcoal-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-tea-100 text-tea-800 flex items-center justify-center shrink-0">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-tea-800 uppercase tracking-wide">
                        Spoken Prompt ({cards[selectedCard].name})
                      </div>
                      <div className="text-xs font-medium text-charcoal-800 mt-0.5 line-clamp-1">
                        "{cards[selectedCard].prompt}"
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSpeak(cards[selectedCard].prompt)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] shrink-0 ${
                      isSpeaking
                        ? 'bg-tea-700 text-white'
                        : 'bg-tea-900 text-white hover:bg-tea-800'
                    }`}
                  >
                    {isSpeaking ? 'Speaking Prompt...' : 'Listen in Hindi'}
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
