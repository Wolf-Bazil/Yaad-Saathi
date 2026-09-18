import React, { useState } from 'react';
import { Activity, ShieldCheck, Heart, User, Calendar, Database, Sparkles, RefreshCw } from 'lucide-react';
import { RADAR_AXES } from '../data/mockData';
import { sound } from '../lib/audio';

export default function TelemetryPreview() {
  const [activeAxis, setActiveAxis] = useState(null);

  return (
    <section id="telemetry" className="py-20 sm:py-28 bg-paper relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tea-100/80 border border-tea-300/60 text-tea-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <Activity className="w-3.5 h-3.5 text-tea-700" />
            Caregiver & Healthcare Worker Telemetry
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-charcoal-950 tracking-tight leading-[1.15]">
            Turning invisible cognitive decline{' '}
            <span className="font-serif italic font-normal text-tea-800">
              into actionable clinical numbers.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed font-normal">
            Equipping rural ASHA workers and overburdened daughters with objective telemetry. Track memory stability, psychomotor latency, and sudden medical anomalies across 30-day horizons.
          </p>
        </div>

        {/* Telemetry Architecture Dashboard Box */}
        <div className="double-bezel-outer">
          <div className="double-bezel-inner p-6 sm:p-10">
            
            {/* Top Bar with Patient Record */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-charcoal-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-tea-50 text-tea-800 border border-tea-200 flex items-center justify-center text-xl font-bold">
                  👵
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-charcoal-950">Shrimati Kamala Devi</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amberGold-100 text-amberGold-900 border border-amberGold-200">
                      Early MCI
                    </span>
                  </div>
                  <div className="text-xs text-charcoal-500">
                    Age 72 • Tezpur Sub-Centre • Monitored by Caregiver Ananya
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs font-medium text-charcoal-500">Cognitive Health Score</div>
                  <div className="text-2xl font-extrabold font-mono text-tea-800">73 / 100</div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
              </div>
            </div>

            {/* Radar & Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
              
              {/* Radar Chart Display (6 cols) */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-paper border border-charcoal-200/80 flex flex-col items-center justify-center">
                <div className="w-full flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-charcoal-900 uppercase tracking-wider">
                    5-Spoke Clinical Radar Telemetry
                  </span>
                  <span className="text-[11px] text-tea-700 font-semibold">
                    Hover axes below
                  </span>
                </div>

                {/* SVG Visual */}
                <div className="relative py-4">
                  <svg viewBox="0 0 280 280" className="w-64 h-64 sm:w-72 sm:h-72 overflow-visible">
                    {/* Concentric Grid Lines */}
                    {[0.2, 0.4, 0.6, 0.8, 1.0].map((step, idx) => (
                      <polygon
                        key={idx}
                        points="140,30 244,105 204,228 76,228 36,105"
                        transform={`scale(${step})`}
                        transform-origin="140 140"
                        fill="none"
                        stroke="#CBD5E1"
                        strokeWidth="1"
                        strokeDasharray={step === 1 ? 'none' : '2 2'}
                      />
                    ))}

                    {/* Radial Spoke Lines */}
                    <line x1="140" y1="140" x2="140" y2="30" stroke="#E2E8F0" strokeWidth="1" />
                    <line x1="140" y1="140" x2="244" y2="105" stroke="#E2E8F0" strokeWidth="1" />
                    <line x1="140" y1="140" x2="204" y2="228" stroke="#E2E8F0" strokeWidth="1" />
                    <line x1="140" y1="140" x2="76" y2="228" stroke="#E2E8F0" strokeWidth="1" />
                    <line x1="140" y1="140" x2="36" y2="105" stroke="#E2E8F0" strokeWidth="1" />

                    {/* Historical Baseline Polygon (Past 14 Days) */}
                    <polygon
                      points="140,65 215,115 183,200 97,200 65,115"
                      fill="rgba(148, 163, 184, 0.12)"
                      stroke="#94A3B8"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                    />

                    {/* Current Score Polygon */}
                    <polygon
                      points="140,54 229,110 187,205 98,197 60,119"
                      fill="rgba(12, 59, 44, 0.22)"
                      stroke="#0C382E"
                      strokeWidth="2.5"
                      className="transition-all duration-300"
                    />

                    {/* Axis Labels */}
                    <text x="140" y="18" textAnchor="middle" className="text-[10px] font-extrabold fill-charcoal-900">Memory (78%)</text>
                    <text x="254" y="108" textAnchor="start" className="text-[10px] font-extrabold fill-charcoal-900">Recognition (86%)</text>
                    <text x="214" y="248" textAnchor="middle" className="text-[10px] font-extrabold fill-charcoal-900">Reasoning (74%)</text>
                    <text x="66" y="248" textAnchor="middle" className="text-[10px] font-extrabold fill-charcoal-900">Attention (65%)</text>
                    <text x="26" y="108" textAnchor="end" className="text-[10px] font-extrabold fill-charcoal-900">Speed (62%)</text>
                  </svg>
                </div>

                <div className="w-full pt-4 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-600">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-tea-900"></span>
                    <span className="font-semibold">Current Level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-charcoal-300"></span>
                    <span>14-Day Baseline</span>
                  </div>
                </div>
              </div>

              {/* Clinical Telemetry Cards (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* 5 Spoke Axis Sliders / Progress Bars */}
                <div className="p-5 rounded-2xl bg-paper border border-charcoal-200/80 space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-2">
                    Granular Spoke Score Distribution
                  </div>
                  {RADAR_AXES.map(axis => (
                    <div 
                      key={axis.key}
                      onMouseEnter={() => { sound.playClick(); setActiveAxis(axis.key); }}
                      onMouseLeave={() => setActiveAxis(null)}
                      className={`p-2 rounded-xl transition-colors ${activeAxis === axis.key ? 'bg-white shadow-subtle' : ''}`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-bold text-charcoal-800">{axis.label}</span>
                        <div className="flex items-center gap-2 font-mono text-[11px]">
                          <span className="text-charcoal-400">{axis.prevScore} ➔</span>
                          <span className="font-bold text-tea-800">{axis.score}/100</span>
                          <span className="text-emerald-700 font-bold">+{axis.score - axis.prevScore}%</span>
                        </div>
                      </div>
                      <div className="w-full h-2 rounded-full bg-charcoal-200 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-tea-700 to-tea-500 rounded-full transition-all duration-500"
                          style={{ width: `${axis.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Anomaly Medical Guard Notification */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Medical Anomaly Flag: Inactive (Normal Baseline)</span>
                    <p className="mt-0.5 text-emerald-800 leading-relaxed">
                      Tap latency standard deviation is 184ms (below the 600ms acute trigger threshold). No physiological emergency alert dispatched to ASHA worker.
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
