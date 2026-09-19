import React, { useState } from 'react';
import { Activity, ShieldCheck, Heart, User, Calendar, Database, Sparkles, RefreshCw, Download, FileCheck, X, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { RADAR_AXES } from '../data/mockData';
import { sound } from '../lib/audio';

export default function TelemetryPreview() {
  const [activeAxis, setActiveAxis] = useState(null);
  const [cstBoosted, setCstBoosted] = useState(false);
  const [reportModalOpen, setReportModalOpen] = useState(false);

  const toggleCstBoost = () => {
    sound.playClick();
    const next = !cstBoosted;
    setCstBoosted(next);
    if (next) {
      sound.playHarmony();
      try {
        confetti({
          particleCount: 30,
          spread: 45,
          origin: { y: 0.7 },
          colors: ['#2A6D5B', '#5BA590', '#10B981']
        });
      } catch (e) {}
    }
  };

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

                    {/* Current Score Polygon (Dynamically updates with CST boost) */}
                    <polygon
                      points={
                        cstBoosted
                          ? "140,36 240,94 198,220 82,220 44,98"
                          : "140,54 229,110 187,205 98,197 60,119"
                      }
                      fill={cstBoosted ? "rgba(16, 185, 129, 0.25)" : "rgba(12, 59, 44, 0.22)"}
                      stroke={cstBoosted ? "#059669" : "#0C382E"}
                      strokeWidth="2.5"
                      className="transition-all duration-700 ease-out"
                    />

                    {/* Axis Labels */}
                    <text x="140" y="18" textAnchor="middle" className="text-[10px] font-extrabold fill-charcoal-900">Memory ({cstBoosted ? '86%' : '78%'})</text>
                    <text x="254" y="108" textAnchor="start" className="text-[10px] font-extrabold fill-charcoal-900">Recognition ({cstBoosted ? '92%' : '86%'})</text>
                    <text x="214" y="248" textAnchor="middle" className="text-[10px] font-extrabold fill-charcoal-900">Reasoning ({cstBoosted ? '81%' : '74%'})</text>
                    <text x="66" y="248" textAnchor="middle" className="text-[10px] font-extrabold fill-charcoal-900">Attention ({cstBoosted ? '73%' : '65%'})</text>
                    <text x="26" y="108" textAnchor="end" className="text-[10px] font-extrabold fill-charcoal-900">Speed ({cstBoosted ? '68%' : '62%'})</text>
                  </svg>
                </div>

                <div className="w-full pt-4 border-t border-charcoal-100 flex flex-wrap items-center justify-between gap-3 text-xs text-charcoal-600">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <span className={`w-3 h-3 rounded-sm ${cstBoosted ? 'bg-emerald-600' : 'bg-tea-900'}`}></span>
                      {cstBoosted ? 'After 30-Day CST' : 'Current Active'}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-sm bg-charcoal-300"></span>
                      14-Day Baseline
                    </span>
                  </div>

                  <button
                    onClick={toggleCstBoost}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all active:scale-95 shadow-subtle ${
                      cstBoosted
                        ? 'bg-emerald-700 text-white'
                        : 'bg-white border border-tea-300 text-tea-900 hover:bg-tea-50'
                    }`}
                  >
                    {cstBoosted ? '✓ 30-Day CST Active (+8%)' : '⚡ Simulate 30-Day CST Impact'}
                  </button>
                </div>
              </div>

              {/* Clinical Telemetry Cards (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* 5 Spoke Axis Sliders / Progress Bars */}
                <div className="p-5 rounded-2xl bg-paper border border-charcoal-200/80 space-y-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-charcoal-900">
                      Granular Spoke Score Distribution
                    </span>
                    <button
                      onClick={() => { sound.playClick(); setReportModalOpen(true); }}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-tea-700 hover:text-tea-900 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export ASHA Summary</span>
                    </button>
                  </div>
                  {RADAR_AXES.map(axis => {
                    const currentScore = cstBoosted ? Math.min(100, axis.score + 7) : axis.score;
                    return (
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
                            <span className="font-bold text-tea-800">{currentScore}/100</span>
                            <span className="text-emerald-700 font-bold">+{currentScore - axis.prevScore}%</span>
                          </div>
                        </div>
                        <div className="w-full h-2 rounded-full bg-charcoal-200 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-tea-700 to-emerald-500 rounded-full transition-all duration-700"
                            style={{ width: `${currentScore}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
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

        {/* Modal: ASHA Clinical Export Preview */}
        {reportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/60 backdrop-blur-sm animate-in fade-in">
            <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-charcoal-200 space-y-5">
              <div className="flex items-center justify-between border-b border-charcoal-100 pb-4">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-tea-700" />
                  <div>
                    <h3 className="font-bold text-base text-charcoal-900">ASHA Sub-Centre Clinical Report</h3>
                    <div className="text-xs text-charcoal-500 font-mono">Tezpur District PHC • ICMR Format</div>
                  </div>
                </div>
                <button
                  onClick={() => setReportModalOpen(false)}
                  className="p-1 rounded-lg text-charcoal-400 hover:text-charcoal-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-charcoal-700">
                <div className="p-3 rounded-xl bg-paper border border-charcoal-100 grid grid-cols-2 gap-2">
                  <div><strong>Patient:</strong> Shrimati Kamala Devi (72y)</div>
                  <div><strong>ID:</strong> YS-NER-2026-084</div>
                  <div><strong>Clinical Stage:</strong> Early MCI (Score 73)</div>
                  <div><strong>Session Adherence:</strong> 94% (6 of 7 days)</div>
                </div>

                <div>
                  <h4 className="font-bold text-charcoal-900 mb-1">Physician & Medical Officer Summary:</h4>
                  <p className="text-charcoal-600 leading-relaxed bg-paper p-3 rounded-xl border border-charcoal-100">
                    Patient shows preserved autobiographical recognition for primary family members when stimulated with regional Assamese cues. Psychomotor latency normal (2.1s). No delirium flags detected. Recommended to continue 15-minute daily sessions.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-tea-50 border border-tea-200 text-tea-900 font-medium flex items-center justify-between">
                  <span>Authorized Signature: Community Health Officer</span>
                  <span className="font-mono text-tea-800 font-bold">✓ VERIFIED</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setReportModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-charcoal-200 text-charcoal-700 text-xs font-semibold hover:bg-charcoal-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    sound.playHarmony();
                    alert('Clinical Report (PDF) exported successfully for Tezpur Sub-Centre.');
                    setReportModalOpen(false);
                  }}
                  className="px-5 py-2 rounded-full bg-tea-900 text-white text-xs font-semibold hover:bg-tea-800 shadow-subtle"
                >
                  Print / Download PDF
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
