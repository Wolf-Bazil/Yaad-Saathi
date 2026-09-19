import React, { useState } from 'react';
import { Activity, ShieldCheck, AlertCircle, HeartHandshake, UserCheck, TrendingUp, AlertTriangle } from 'lucide-react';
import { sound } from '../lib/audio';

export default function CaregiverTelemetry() {
  const [telemetryView, setTelemetryView] = useState('current'); // 'current' | 'baseline' | 'anomaly'

  const metrics = [
    { key: 'memory', label: 'Visuospatial Recall', current: 78, baseline: 64, anomaly: 76, baselineDelta: '+14 pts' },
    { key: 'attention', label: 'Sequence Attention', current: 65, baseline: 58, anomaly: 63, baselineDelta: '+7 pts' },
    { key: 'recognition', label: 'Face Recognition', current: 86, baseline: 70, anomaly: 84, baselineDelta: '+16 pts' },
    { key: 'speed', label: 'Psychomotor Reaction', current: 72, baseline: 60, anomaly: 38, baselineDelta: '+12 pts', anomalyDrop: '-34 pts' },
    { key: 'adl', label: 'Daily Routine Reasoning', current: 74, baseline: 65, anomaly: 71, baselineDelta: '+9 pts' },
  ];

  return (
    <section id="telemetry" className="py-24 sm:py-32 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Longitudinal telemetry for caregivers & ASHA workers
          </h2>
          <p className="text-base text-charcoal-600 leading-relaxed">
            Dementia decline is gradual, but acute infections cause sudden drops. YaadSaathi tracks response patterns over weeks to give families clear clinical foresight.
          </p>
        </div>

        {/* Telemetry View Switcher Controls */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-bone border border-charcoal-200 shadow-subtle">
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTelemetryView('current');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] ${
                telemetryView === 'current'
                  ? 'bg-tea-900 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              Current Week Stability
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTelemetryView('baseline');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] ${
                telemetryView === 'baseline'
                  ? 'bg-tea-900 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              4-Week Baseline
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playClick();
                setTelemetryView('anomaly');
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] ${
                telemetryView === 'anomaly'
                  ? 'bg-terracotta-700 text-white shadow-sm'
                  : 'text-charcoal-600 hover:text-charcoal-900'
              }`}
            >
              Simulate Infection Alert
            </button>
          </div>
        </div>

        {/* Main Telemetry & Clinical Insight Panel */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 lg:p-10 shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left: 5-Axis Score Metrics (Without banned progress bar tracks) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-charcoal-100 text-xs font-bold uppercase tracking-wider text-charcoal-600">
                <span>Cognitive Metric Domain</span>
                <span>Evaluated Score</span>
              </div>

              {metrics.map((m) => {
                const score =
                  telemetryView === 'current'
                    ? m.current
                    : telemetryView === 'baseline'
                    ? m.baseline
                    : m.anomaly;

                const isAnomalyDrop = telemetryView === 'anomaly' && m.key === 'speed';

                return (
                  <div
                    key={m.key}
                    className={`p-4 rounded-xl border transition-all ${
                      isAnomalyDrop
                        ? 'bg-terracotta-50/80 border-terracotta-400 ring-2 ring-terracotta-400/20'
                        : 'bg-paper/80 border-charcoal-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-bold text-sm sm:text-base text-charcoal-900">
                          {m.label}
                        </div>
                        <div className="text-xs text-charcoal-500 mt-0.5">
                          {isAnomalyDrop
                            ? 'Critical slowdown detected: 46% sudden latency increase'
                            : telemetryView === 'baseline'
                            ? 'Measured at initial clinical intake'
                            : 'Consistent with 28-day moving average'}
                        </div>
                      </div>

                      <div className="text-right flex items-center gap-3">
                        {telemetryView === 'baseline' && (
                          <span className="text-xs font-semibold text-tea-700 bg-tea-50 px-2 py-0.5 rounded border border-tea-200">
                            {m.baselineDelta}
                          </span>
                        )}

                        {isAnomalyDrop && (
                          <span className="text-xs font-bold text-terracotta-700 bg-terracotta-100 px-2 py-0.5 rounded border border-terracotta-300">
                            {m.anomalyDrop}
                          </span>
                        )}

                        <span
                          className={`text-xl font-extrabold font-mono ${
                            isAnomalyDrop
                              ? 'text-terracotta-700'
                              : score >= 75
                              ? 'text-tea-800'
                              : 'text-charcoal-900'
                          }`}
                        >
                          {score}/100
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <div className="pt-3 text-xs text-charcoal-500 flex items-center justify-between">
                <span>Calculated over 28 consecutive patient interactions</span>
                <span className="font-semibold text-tea-800">Scikit-Learn IsolationForest Model</span>
              </div>
            </div>

            {/* Right: Clinical Interpretation and Guidance */}
            <div className="lg:col-span-5 bg-bone rounded-2xl p-6 sm:p-7 border border-charcoal-200 space-y-4">
              {telemetryView !== 'anomaly' ? (
                <>
                  <div className="w-12 h-12 rounded-xl bg-tea-100 text-tea-800 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal-900">
                    Stable Cognitive Baseline
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                    Over the past 4 weeks, facial recognition retention score increased by 16 points after daily family photo reminiscence with Grandson Amit.
                  </p>
                  <div className="p-4 bg-white rounded-xl border border-charcoal-200 text-xs text-charcoal-700 space-y-1">
                    <span className="font-bold text-charcoal-900 block">Caregiver Clinical Summary:</span>
                    <p>Patient demonstrates healthy psychomotor response latency (average 1.3 seconds). No signs of acute disorientation or cognitive distress.</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-xl bg-terracotta-100 text-terracotta-800 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-terracotta-900">
                    Acute Psychomotor Slowing Flagged
                  </h3>
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                    Touch response speed dropped precipitously within 48 hours. In elderly dementia patients, sudden psychomotor slowing is a hallmark of a silent urinary tract infection (UTI), dehydration, or delirium.
                  </p>
                  <div className="p-4 bg-white rounded-xl border border-terracotta-300 text-xs text-terracotta-950 space-y-1">
                    <span className="font-bold block">Automated Caregiver & ASHA Alert:</span>
                    <p>Check hydration levels, check for low-grade fever, and notify the local ASHA worker for an immediate doorstep urine dipstick test before symptoms require hospital admission.</p>
                  </div>
                </>
              )}
            </div>

          </div>
        </div>

        {/* Sub-Centre Health Worker Protocol (Asymmetric 2-Column Bento) */}
        <div className="bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-charcoal-100">
            <div>
              <span className="text-xs font-bold text-tea-800 uppercase tracking-wider">
                Primary Healthcare Sub-Centre Field Protocol
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-charcoal-900 mt-0.5">
                The 3-Minute ASHA Community Health Worker Visit
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tea-50 text-tea-800 border border-tea-200 text-xs font-semibold">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Doorstep Routine</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-5 rounded-xl bg-paper border border-charcoal-200">
              <span className="text-xs font-bold text-tea-700 uppercase tracking-wider block mb-1">
                Doorstep Greeting
              </span>
              <h4 className="font-bold text-charcoal-900 text-sm mb-2">
                Spoken Dialect Invitation
              </h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                The ASHA worker hands the low-cost tablet to the senior. Warm spoken greetings in Assamese or Khasi invite the patient into a 3-minute session without clinical test anxiety.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-paper border border-charcoal-200">
              <span className="text-xs font-bold text-tea-700 uppercase tracking-wider block mb-1">
                Passive Sensing
              </span>
              <h4 className="font-bold text-charcoal-900 text-sm mb-2">
                Tremor & Touch Coordinates
              </h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                As the elder pairs tea kettles or recalls relatives, the handset records hesitation times and micro-tremors without requiring specialized hospital equipment.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-paper border border-charcoal-200">
              <span className="text-xs font-bold text-tea-700 uppercase tracking-wider block mb-1">
                Doorstep Referral
              </span>
              <h4 className="font-bold text-charcoal-900 text-sm mb-2">
                Actionable Next Steps
              </h4>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                If the psychomotor score drops below threshold, the health worker receives immediate guidance on whether to recommend fluids, an infection dipstick, or a doctor referral.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
