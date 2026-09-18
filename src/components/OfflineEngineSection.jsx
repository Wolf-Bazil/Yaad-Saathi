import React, { useState } from 'react';
import { Wifi, WifiOff, HardDrive, RefreshCw, CheckCircle2, ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { sound } from '../lib/audio';

export default function OfflineEngineSection() {
  const [isAirplaneMode, setIsAirplaneMode] = useState(false);
  const [queuedSessions, setQueuedSessions] = useState(0);
  const [syncStatus, setSyncStatus] = useState('All data synchronized with Supabase');

  const toggleAirplaneMode = () => {
    sound.playClick();
    const nextState = !isAirplaneMode;
    setIsAirplaneMode(nextState);

    if (nextState) {
      setSyncStatus('Offline: Session telemetry queueing in IndexedDB');
    } else {
      setSyncStatus('Online: Synchronizing queued sessions to Supabase...');
      setTimeout(() => {
        setQueuedSessions(0);
        setSyncStatus('✓ 100% Synced (All sessions flushed to cloud)');
        sound.playHarmony();
      }, 1200);
    }
  };

  const simulatePlaySession = () => {
    sound.playClick();
    if (isAirplaneMode) {
      setQueuedSessions(prev => prev + 1);
      setSyncStatus(`Offline Queue: ${queuedSessions + 1} sessions stored in IndexedDB`);
    } else {
      sound.playHarmony();
      setSyncStatus('Session logged directly to Supabase cloud');
    }
  };

  return (
    <section id="offline" className="py-20 sm:py-28 bg-white border-y border-charcoal-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold uppercase tracking-wider mb-4">
            <WifiOff className="w-3.5 h-3.5 text-emerald-700" />
            Zero-Packet Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-charcoal-950 tracking-tight leading-[1.15]">
            Engineered for mountain blackouts.{' '}
            <span className="font-serif italic font-normal text-tea-800">
              The Airplane Mode Kill-Test.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed font-normal">
            Turn off Wi-Fi, pull the SIM card, or walk deep into an unmapped valley in Arunachal Pradesh. The entire CST engine continues running on-device without dropping a frame.
          </p>
        </div>

        {/* Offline Simulator Sandbox (Double-Bezel) */}
        <div className="double-bezel-outer mb-12">
          <div className="double-bezel-inner p-6 sm:p-10">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Interactive Airplane Mode Controller (5 cols) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-paper border border-charcoal-200/80 space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-charcoal-500 uppercase">
                    Interactive Offline Sandbox
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 ${
                    isAirplaneMode ? 'bg-terracotta-100 text-terracotta-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {isAirplaneMode ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
                    {isAirplaneMode ? 'OFFLINE (Airplane Mode)' : 'ONLINE'}
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-charcoal-900">
                    Test Simulated Disconnection
                  </h4>
                  <p className="mt-1 text-xs text-charcoal-600 leading-relaxed">
                    Toggle airplane mode below to see how sessions are preserved locally in browser IndexedDB with zero server dependency.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={toggleAirplaneMode}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 ${
                      isAirplaneMode
                        ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-subtle'
                        : 'bg-charcoal-900 hover:bg-charcoal-800 text-white shadow-subtle'
                    }`}
                  >
                    {isAirplaneMode ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                    {isAirplaneMode ? 'Disable Airplane Mode (Reconnect & Sync)' : 'Simulate Turning On Airplane Mode'}
                  </button>

                  <button
                    onClick={simulatePlaySession}
                    className="w-full py-2.5 px-4 rounded-xl border border-charcoal-300 hover:bg-white text-charcoal-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Simulate Completing a Cognitive Game</span>
                  </button>
                </div>

                {/* Live Status readout */}
                <div className="p-3 rounded-xl bg-white border border-charcoal-200 text-xs font-mono flex items-center justify-between">
                  <span className="text-charcoal-500">IndexedDB Local Buffer:</span>
                  <span className="font-bold text-tea-800">{queuedSessions} sessions queued</span>
                </div>
              </div>

              {/* Architecture Data Flow Diagram (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Flow Step 1 */}
                <div className="p-4 rounded-2xl bg-paper border border-charcoal-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-tea-100 text-tea-900 flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-tea-700 uppercase">
                      Client-Side Storage
                    </div>
                    <h5 className="text-sm font-bold text-charcoal-900">
                      Browser IndexedDB Database
                    </h5>
                    <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">
                      Every tap timestamp, reaction duration, and accuracy metric is indexed into an encrypted client-side relational store. Zero HTTP requests are required to play.
                    </p>
                  </div>
                </div>

                {/* Flow Step 2 */}
                <div className="p-4 rounded-2xl bg-paper border border-charcoal-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amberGold-100 text-amberGold-900 flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-amberGold-800 uppercase">
                      Offline Cache & Audio
                    </div>
                    <h5 className="text-sm font-bold text-charcoal-900">
                      Service Worker Cache & Web Audio API
                    </h5>
                    <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">
                      All regional cultural artwork and Web Audio synthesizer scripts are cached in service workers, ensuring 60fps animations without a single live internet packet.
                    </p>
                  </div>
                </div>

                {/* Flow Step 3 */}
                <div className="p-4 rounded-2xl bg-paper border border-charcoal-200/80 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-emerald-700 uppercase">
                      Auto-Reconnection Protocol
                    </div>
                    <h5 className="text-sm font-bold text-charcoal-900">
                      Background Sync to Supabase PostgreSQL
                    </h5>
                    <p className="text-xs text-charcoal-600 mt-1 leading-relaxed">
                      The moment a rural health worker's handset detects an intermittent cellular edge signal, the background queue flushes seamlessly to Supabase in less than 300ms.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Sync Banner */}
            <div className="mt-6 pt-5 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-600 font-mono">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-tea-700 animate-spin" />
                {syncStatus}
              </span>
              <span className="text-emerald-700 font-bold">Resilience Rating: Tier 4 Mission-Critical</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
