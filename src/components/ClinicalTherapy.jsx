import React, { useState } from 'react';
import { Brain, Users, Sparkles, Clock, CheckCircle2, RotateCcw, Volume2 } from 'lucide-react';
import { sound } from '../lib/audio';
import confetti from 'canvas-confetti';

export default function ClinicalTherapy() {
  const [activeExercise, setActiveExercise] = useState('match');

  // Exercise 1 State (Match)
  const [matchPairs, setMatchPairs] = useState([
    { id: 1, icon: '🦏', name: 'Kaziranga Rhino', matched: true },
    { id: 2, icon: '🫖', name: 'Assam Tea Kettle', matched: false },
    { id: 3, icon: '🫖', name: 'Assam Tea Kettle', matched: false },
    { id: 4, icon: '👒', name: 'Bihu Japi Hat', matched: false },
  ]);

  // Exercise 2 State (Face Recall)
  const [selectedRelationship, setSelectedRelationship] = useState(null);

  // Exercise 3 State (Sequence)
  const [userSequence, setUserSequence] = useState([]);

  // Exercise 4 State (Daily Routine)
  const [routineChoice, setRoutineChoice] = useState(null);

  const exercises = [
    {
      id: 'match',
      code: 'CST-01',
      title: 'Cultural Memory Match',
      localTitle: 'সাংস্কৃতিক স্মৃতি মিলান',
      domain: 'Visuospatial & Working Memory',
      target: 'Exercises spatial retention using familiar North Eastern objects.',
      clinicalMechanism: 'Stimulates the parahippocampal gyrus. Using local heritage artifacts rather than foreign icons eliminates agitation and confusion.',
    },
    {
      id: 'face',
      code: 'CST-02',
      title: 'Personal Family Face Recall',
      localTitle: 'পৰিয়াল স্মৃতি চিনাক্তকৰণ',
      domain: 'Autobiographical Memory',
      target: 'Directly combats prosopagnosia (facial blindness in dementia).',
      clinicalMechanism: 'Caregivers upload genuine family photographs. Rebuilding associative pathways between facial features and emotional bonds preserves patient dignity.',
    },
    {
      id: 'sequence',
      code: 'CST-03',
      title: 'Sequence Pattern Attention',
      localTitle: 'ক্ৰম স্মৃতি অনুশীলন',
      domain: 'Executive Function & Attention',
      target: 'Maintains short-term sequential tracking and focus.',
      clinicalMechanism: 'Trains the dorsolateral prefrontal cortex. Progressively calibrated flash durations prevent cognitive overload while exercising working memory.',
    },
    {
      id: 'routine',
      code: 'CST-04',
      title: 'Daily Routine Association',
      localTitle: 'দৈনন্দিন নিয়ম সংলগ্নতা',
      domain: 'Semantic Memory & ADL',
      target: 'Protects Activities of Daily Living (ADL) independence.',
      clinicalMechanism: 'Associates clock times and morning rituals with hygiene and medication prompts, reducing day-to-day dependence on family members.',
    },
  ];

  const current = exercises.find((e) => e.id === activeExercise);

  // Exercise 1 Handler
  const handleMatchTap = (id) => {
    sound.playClick();
    setMatchPairs((prev) => {
      const next = prev.map((p) => (p.id === id ? { ...p, matched: true } : p));
      const allMatched = next.every((p) => p.matched);
      if (allMatched) {
        sound.playHarmony();
        try {
          confetti({
            particleCount: 32,
            spread: 50,
            origin: { y: 0.6 },
            colors: ['#2A6D5B', '#388872'],
          });
        } catch (e) {}
      }
      return next;
    });
  };

  // Exercise 2 Handler
  const handleRelationshipChoice = (choice) => {
    sound.playClick();
    setSelectedRelationship(choice);
    if (choice === 'Grandson Amit') {
      sound.playHarmony();
      sound.speakPrompt('शाबाश दादी! यह आपके पोते अमित की तस्वीर है।');
    }
  };

  // Exercise 3 Handler
  const handleSequenceTap = (item) => {
    sound.playClick();
    const nextSeq = [...userSequence, item];
    setUserSequence(nextSeq);
    if (nextSeq.length === 3) {
      sound.playHarmony();
      try {
        confetti({
          particleCount: 32,
          spread: 50,
          origin: { y: 0.6 },
          colors: ['#2A6D5B', '#B45309'],
        });
      } catch (e) {}
    }
  };

  // Exercise 4 Handler
  const handleRoutineChoice = (choice) => {
    sound.playClick();
    setRoutineChoice(choice);
    if (choice === 'morning_tea') {
      sound.playHarmony();
      sound.speakPrompt('बहुत बढ़िया! सुबह 8 बजे चाय और दवा का समय है।');
    }
  };

  return (
    <section id="therapy" className="py-24 sm:py-32 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Four clinically validated cognitive exercises
          </h2>
          <p className="text-base text-charcoal-600 leading-relaxed">
            Instead of generic Western brain teasers, YaadSaathi focuses on four evidence-based stimulation exercises tailored to rural elderly patients.
          </p>
        </div>

        {/* 4 Exercise Selector Cards (2x2 Grid on Mobile, 4-Col on Desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10">
          {exercises.map((ex) => {
            const isSelected = activeExercise === ex.id;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => {
                  sound.playClick();
                  setActiveExercise(ex.id);
                }}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all active:scale-[0.98] ${
                  isSelected
                    ? 'bg-white border-tea-600 ring-2 ring-tea-600/20 shadow-elevation'
                    : 'bg-white hover:bg-bone border-charcoal-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-tea-700">
                    {ex.code}
                  </span>
                  <span className="text-[10.5px] uppercase font-semibold text-charcoal-400">
                    {ex.domain.split('&')[0]}
                  </span>
                </div>
                <div className="font-bold text-sm sm:text-base text-charcoal-900 mb-1 leading-snug">
                  {ex.title}
                </div>
                <div className="text-xs font-serif italic text-tea-800">
                  {ex.localTitle}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Exercise Detail and Interactive Playground */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 lg:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left: Clinical Context (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tea-50 text-tea-900 border border-tea-200 text-xs font-semibold">
                <Brain className="w-3.5 h-3.5 text-tea-700" />
                <span>{current.domain}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-charcoal-900 leading-snug">
                {current.title}
              </h3>

              <div className="p-4 rounded-xl bg-tea-50/70 border border-tea-100 text-xs sm:text-sm font-medium text-tea-950">
                <span className="font-bold block mb-1">Target Outcome:</span>
                {current.target}
              </div>

              <div className="text-xs sm:text-sm text-charcoal-600 leading-relaxed pt-1">
                <span className="font-semibold text-charcoal-900 block mb-1">Neurological Mechanism:</span>
                {current.clinicalMechanism}
              </div>
            </div>

            {/* Right: Live Working Exercise Mini-Simulator (7 cols) */}
            <div className="lg:col-span-7 bg-bone/80 rounded-2xl p-5 sm:p-7 border border-charcoal-200">
              
              {/* Exercise 1: Cultural Memory Match */}
              {activeExercise === 'match' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                      Live Test: Tap matching Assam Tea Kettles
                    </span>
                    <button
                      type="button"
                      onClick={() => setMatchPairs(matchPairs.map((p) => ({ ...p, matched: false })))}
                      className="text-xs text-charcoal-500 hover:text-charcoal-800 flex items-center gap-1 px-2 py-1 rounded border border-charcoal-200 bg-white"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {matchPairs.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleMatchTap(item.id)}
                        className={`p-5 rounded-xl border text-center transition-all active:scale-[0.98] ${
                          item.matched
                            ? 'bg-tea-100/90 border-tea-600 text-tea-900 shadow-sm'
                            : 'bg-white hover:bg-tea-50 border-charcoal-200'
                        }`}
                      >
                        <div className="text-3xl sm:text-4xl mb-2">{item.icon}</div>
                        <div className="text-xs font-bold text-charcoal-900">{item.name}</div>
                        <div className="text-[10px] text-charcoal-500 mt-1">
                          {item.matched ? 'Matched' : 'Tap to pair'}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-charcoal-500 text-center">
                    Stimulates occipitotemporal visual pathways using comforting tea garden imagery.
                  </div>
                </div>
              )}

              {/* Exercise 2: Personal Family Face Recall */}
              {activeExercise === 'face' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                      Live Test: Caregiver Photo Recognition
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedRelationship(null)}
                      className="text-xs text-charcoal-500 hover:text-charcoal-800 flex items-center gap-1 px-2 py-1 rounded border border-charcoal-200 bg-white"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Photo Vault Simulation */}
                  <div className="bg-white p-4 rounded-xl border border-charcoal-200 flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 rounded-xl bg-tea-50 border border-tea-200 flex items-center justify-center text-4xl shrink-0">
                      👦
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-tea-800 uppercase tracking-wide">
                        Caregiver Memory Vault
                      </div>
                      <div className="font-bold text-charcoal-900 text-sm mt-0.5">
                        Shillong home, December 2024
                      </div>
                      <div className="text-xs text-charcoal-500 mt-1">
                        Prompt: "Dadi, who is this family member holding the cricket bat?"
                      </div>
                    </div>
                  </div>

                  {/* Choice Buttons */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    {['Grandson Amit', 'Doctor Baruah', 'Neighbor Rohan'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleRelationshipChoice(opt)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all active:scale-[0.98] ${
                          selectedRelationship === opt
                            ? opt === 'Grandson Amit'
                              ? 'bg-tea-900 text-white border-tea-900'
                              : 'bg-terracotta-100 text-terracotta-900 border-terracotta-400'
                            : 'bg-white hover:bg-charcoal-50 border-charcoal-200 text-charcoal-800'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>

                  {selectedRelationship === 'Grandson Amit' && (
                    <div className="p-3 rounded-xl bg-tea-100 text-tea-900 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-tea-700" />
                      Positive Recall: Synaptic connection reinforced. Reaction latency logged: 1.1s.
                    </div>
                  )}
                </div>
              )}

              {/* Exercise 3: Sequence Pattern Attention */}
              {activeExercise === 'sequence' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                      Live Test: Flash Sequence Tracking
                    </span>
                    <button
                      type="button"
                      onClick={() => setUserSequence([])}
                      className="text-xs text-charcoal-500 hover:text-charcoal-800 flex items-center gap-1 px-2 py-1 rounded border border-charcoal-200 bg-white"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Sequence Order Prompt */}
                  <div className="bg-white p-4 rounded-xl border border-charcoal-200 text-center mb-4">
                    <div className="text-xs text-charcoal-500 mb-1">Target sequence to repeat:</div>
                    <div className="text-2xl font-bold tracking-widest text-charcoal-900">
                      🫖 ➔ 🦏 ➔ 👒
                    </div>
                    <div className="text-[11px] text-tea-800 font-medium mt-1">
                      Assam Tea Kettle ➔ Kaziranga Rhino ➔ Bihu Japi
                    </div>
                  </div>

                  {/* User Tap Options */}
                  <div className="grid grid-cols-3 gap-2.5 mb-4">
                    {[
                      { sym: '🫖', name: 'Tea Kettle' },
                      { sym: '🦏', name: 'Rhino' },
                      { sym: '👒', name: 'Japi' },
                    ].map((item) => (
                      <button
                        key={item.sym}
                        type="button"
                        onClick={() => handleSequenceTap(item.sym)}
                        className="p-3 bg-white hover:bg-tea-50 rounded-xl border border-charcoal-200 text-center transition-all active:scale-[0.98]"
                      >
                        <span className="text-2xl block mb-1">{item.sym}</span>
                        <span className="text-xs font-bold text-charcoal-800">{item.name}</span>
                      </button>
                    ))}
                  </div>

                  <div className="text-xs text-charcoal-600 bg-white p-3 rounded-xl border border-charcoal-200">
                    Your entered order:{' '}
                    {userSequence.length === 0 ? (
                      <span className="text-charcoal-400 italic">Tap objects in order above</span>
                    ) : (
                      <span className="font-bold text-charcoal-900">{userSequence.join(' ➔ ')}</span>
                    )}
                  </div>
                </div>
              )}

              {/* Exercise 4: Daily Routine Association */}
              {activeExercise === 'routine' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-700">
                      Live Test: Daily Living Routine (ADL)
                    </span>
                    <button
                      type="button"
                      onClick={() => setRoutineChoice(null)}
                      className="text-xs text-charcoal-500 hover:text-charcoal-800 flex items-center gap-1 px-2 py-1 rounded border border-charcoal-200 bg-white"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-charcoal-200 mb-4">
                    <div className="flex items-center gap-2 text-xs font-semibold text-tea-800 mb-1">
                      <Clock className="w-4 h-4" />
                      Scenario: 8:00 AM Morning In Jorhat
                    </div>
                    <div className="text-sm font-bold text-charcoal-900">
                      "Dadi, the sun is up and breakfast is ready. What do we take first?"
                    </div>
                  </div>

                  <div className="space-y-2.5 mb-4">
                    {[
                      { id: 'morning_tea', label: 'Morning Warm Tea & Daily Blood Pressure Pill' },
                      { id: 'night_lamp', label: 'Turn on the Night Bed Lamp' },
                      { id: 'sleep', label: 'Close the Bedroom Curtains and Sleep' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleRoutineChoice(opt.id)}
                        className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all active:scale-[0.98] ${
                          routineChoice === opt.id
                            ? opt.id === 'morning_tea'
                              ? 'bg-tea-900 text-white border-tea-900 font-bold'
                              : 'bg-terracotta-100 text-terracotta-900 border-terracotta-300'
                            : 'bg-white hover:bg-charcoal-50 border-charcoal-200 text-charcoal-800'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {routineChoice === 'morning_tea' && (
                    <div className="p-3 rounded-xl bg-tea-100 text-tea-900 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-tea-700" />
                      Correct Routine: Preserves daily living self-sufficiency.
                    </div>
                  )}
                </div>
              )}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
