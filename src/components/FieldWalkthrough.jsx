import React, { useState } from 'react';
import { User, Smartphone, Bell, CheckCircle2, HeartHandshake } from 'lucide-react';
import { sound } from '../lib/audio';

export default function FieldWalkthrough() {
  const [activeStage, setActiveStage] = useState('caregiver'); // 'caregiver' | 'elder' | 'asha'

  const stages = {
    caregiver: {
      title: 'Family Caregiver Uploads Memories',
      actor: 'Caregiver in Guwahati',
      icon: User,
      action: 'Uploads a photograph of grandson Amit holding his cricket bat with simple relationship clues.',
      clinicalOutcome: 'DeepSeek Flash synthesizes a zero-stress question with gentle positive hints and no failure penalties.',
      metricNote: 'Memory Vault commit: 2 photos indexed locally.',
    },
    elder: {
      title: 'Elder Engages in Morning Reminiscence',
      actor: 'Elderly Patient (Dadi)',
      icon: Smartphone,
      action: 'Dadi hears: "नमस्ते दादी! क्या आप इस तस्वीर को पहचानती हैं?" and taps Amit’s smiling face.',
      clinicalOutcome: 'Reinforces synaptic pathways in the medial temporal lobe, directly combating prosopagnosia.',
      metricNote: 'Response latency: 1.14s (Healthy cognitive recall).',
    },
    asha: {
      title: 'ASHA Worker Reviews Doorstep Stability',
      actor: 'Rural Community Health Worker',
      icon: Bell,
      action: 'During a weekly doorstep check, the ASHA worker inspects the 28-day stability chart on the tablet.',
      clinicalOutcome: 'If latency slows abnormally, the app suggests a hydration and fever check before symptoms escalate.',
      metricNote: 'Stability index: 84/100 (No acute infection detected).',
    },
  };

  const current = stages[activeStage];

  return (
    <section id="field" className="py-24 sm:py-32 bg-bone/40 border-t border-b border-charcoal-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            How YaadSaathi works from home to clinic
          </h2>
          <p className="text-base text-charcoal-600 leading-relaxed">
            A dignified, continuous care loop connecting elderly patients, loving families, and grassroots community health workers.
          </p>
        </div>

        {/* Editorial Split: Photo on Left (5 cols), Interactive Stage Detail on Right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Real Photographic Asset & Caption */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-3xl overflow-hidden border border-charcoal-200 shadow-elevation aspect-[4/3]">
              <img
                src="/images/asha-health-worker.jpg"
                alt="ASHA community health worker assisting an elderly villager at a wooden doorstep in rural North East India"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/80 via-transparent to-transparent flex items-end p-5 sm:p-6">
                <div className="text-white">
                  <span className="font-bold text-sm sm:text-base block">Doorstep Community Healthcare</span>
                  <span className="text-white/80 text-xs">ASHA worker screening an elderly resident in Meghalaya</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-charcoal-200 text-xs text-charcoal-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5 font-medium text-tea-900">
                <HeartHandshake className="w-4 h-4 text-tea-700" />
                Grassroots Care Delivery
              </span>
              <span className="text-charcoal-400">Zero Cloud Dependency</span>
            </div>
          </div>

          {/* Right Column: Stage Selector & Live Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 3 Stage Selector Buttons */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              {[
                { key: 'caregiver', label: '1. Family Memory', icon: User },
                { key: 'elder', label: '2. Elder Recall', icon: Smartphone },
                { key: 'asha', label: '3. ASHA Review', icon: Bell },
              ].map((s) => {
                const isSelected = activeStage === s.key;
                const Icon = s.icon;
                return (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setActiveStage(s.key);
                    }}
                    className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all active:scale-[0.98] ${
                      isSelected
                        ? 'bg-tea-900 text-white border-tea-900 shadow-sm'
                        : 'bg-white hover:bg-bone text-charcoal-800 border-charcoal-200'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-2 ${isSelected ? 'text-tea-200' : 'text-tea-700'}`} />
                    <div className="font-bold text-xs sm:text-sm leading-snug">
                      {s.label}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Detailed Card */}
            <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-charcoal-100">
                <div>
                  <span className="text-xs font-bold text-tea-800 uppercase tracking-wide">
                    {current.actor}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-charcoal-900 mt-0.5">
                    {current.title}
                  </h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-tea-50 text-tea-800 border border-tea-200 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-tea-700" />
                </div>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="p-4 rounded-xl bg-paper border border-charcoal-200">
                  <span className="text-xs font-bold text-charcoal-700 uppercase tracking-wide block mb-1">
                    Human Interaction:
                  </span>
                  <p className="text-charcoal-900 leading-relaxed">
                    {current.action}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-tea-50/70 border border-tea-200/80">
                  <span className="text-xs font-bold text-tea-900 uppercase tracking-wide block mb-1">
                    Clinical & Diagnostic Outcome:
                  </span>
                  <p className="text-tea-950 font-medium leading-relaxed">
                    {current.clinicalOutcome}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-charcoal-500 font-mono">
                  <span>Logged Telemetry Metric:</span>
                  <span className="text-tea-800 font-bold font-sans">{current.metricNote}</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
