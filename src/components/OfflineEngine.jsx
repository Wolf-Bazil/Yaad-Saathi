import React, { useState } from 'react';
import { Wifi, WifiOff, Database, Cpu, RefreshCw, CheckCircle2 } from 'lucide-react';
import { sound } from '../lib/audio';

export default function OfflineEngine() {
  const [isOfflineSimulated, setIsOfflineSimulated] = useState(false);
  const [simulatedLogs, setSimulatedLogs] = useState([
    { id: 1, time: '10:14:02', event: 'Session initialized', target: 'IndexedDB: local_session', status: 'Cached' },
    { id: 2, time: '10:14:18', event: 'Cultural match: Tea Kettle', target: 'IndexedDB: telemetry_queue', status: 'Saved locally' },
    { id: 3, time: '10:14:35', event: 'ML Fatigue check: Score 0.18', target: 'Client WebWorker', status: 'Evaluated on-device' },
  ]);

  const toggleNetwork = () => {
    sound.playClick();
    const nextState = !isOfflineSimulated;
    setIsOfflineSimulated(nextState);

    if (nextState) {
      // Simulating network blackout
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        event: 'Network disconnected: Switched to pure IndexedDB',
        target: 'IndexedDB: local_store',
        status: 'Local Only',
      };
      setSimulatedLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    } else {
      // Simulating reconnect
      sound.playHarmony();
      const newLog = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        event: 'Signal restored: Flushed 4 queued records to Supabase',
        target: 'POST /api/v1/sync',
        status: 'Synced (280ms)',
      };
      setSimulatedLogs((prev) => [newLog, ...prev.slice(0, 4)]);
    }
  };

  return (
    <section id="offline" className="py-24 sm:py-32 bg-bone/50 border-t border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Engineered to run with zero cellular signal
          </h2>
          <p className="text-base text-charcoal-600 leading-relaxed">
            Hilly terrain and monsoons frequently disconnect rural clinics. YaadSaathi caches all games, models, and audio on-device.
          </p>
        </div>

        {/* Asymmetrical 5:7 Engineering Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: 3 Architectural Capabilities (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-white rounded-2xl p-6 border border-charcoal-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-tea-50 border border-tea-200 text-tea-800 flex items-center justify-center shrink-0">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-charcoal-900">
                  Local IndexedDB Storage
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                Every touch interaction, latency timestamp, and photo quiz result is committed securely to browser storage. Nothing is lost during an unexpected power blackout.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-charcoal-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-tea-50 border border-tea-200 text-tea-800 flex items-center justify-center shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-charcoal-900">
                  On-Device ML Inference
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                The Random Forest cognitive fatigue classifier runs on the handset CPU in a background worker, adapting game difficulty in real time without calling an API.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-charcoal-200 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-tea-50 border border-tea-200 text-tea-800 flex items-center justify-center shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-charcoal-900">
                  Automatic Idempotent Sync
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                When the patient or health worker reconnects to Wi-Fi, the system automatically flushes cached sessions to Supabase with zero duplicate records.
              </p>
            </div>

          </div>

          {/* Right Column: Live Interactive Blackout & Sync Simulator (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-charcoal-100">
              <div>
                <span className="text-xs font-semibold text-tea-800 uppercase tracking-wide block">
                  Interactive Technical Simulation
                </span>
                <h3 className="text-base sm:text-lg font-bold text-charcoal-900 mt-0.5">
                  Simulate a rural hill network blackout
                </h3>
              </div>

              {/* Blackout Toggle Button */}
              <button
                type="button"
                onClick={toggleNetwork}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all active:scale-[0.98] ${
                  isOfflineSimulated
                    ? 'bg-terracotta-700 text-white shadow-sm'
                    : 'bg-tea-900 text-white hover:bg-tea-800 shadow-sm'
                }`}
              >
                {isOfflineSimulated ? (
                  <>
                    <WifiOff className="w-4 h-4" />
                    <span>Restore Signal (Auto-Sync)</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-4 h-4" />
                    <span>Cut Network (Test Offline)</span>
                  </>
                )}
              </button>
            </div>

            {/* Current State Status Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-xl bg-paper border border-charcoal-200">
                <span className="text-xs text-charcoal-500 font-medium block mb-1">
                  Network Connectivity
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isOfflineSimulated ? 'bg-terracotta-500' : 'bg-emerald-500'
                    }`}
                  ></span>
                  <span className="font-bold text-xs sm:text-sm text-charcoal-900">
                    {isOfflineSimulated ? 'Offline: No Signal' : 'Online: Connected'}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-paper border border-charcoal-200">
                <span className="text-xs text-charcoal-500 font-medium block mb-1">
                  Storage Cache State
                </span>
                <div className="font-bold text-xs sm:text-sm text-charcoal-900 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-tea-700" />
                  IndexedDB Active
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-paper border border-charcoal-200">
                <span className="text-xs text-charcoal-500 font-medium block mb-1">
                  Edge ML Inference
                </span>
                <div className="font-bold text-xs sm:text-sm text-charcoal-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  0ms Network Latency
                </div>
              </div>
            </div>

            {/* Real-time Session Log Output */}
            <div className="bg-bone/80 rounded-xl p-4 border border-charcoal-200">
              <div className="text-xs font-semibold text-charcoal-700 mb-3 flex items-center justify-between">
                <span>Local Storage & Sync Event Stream</span>
                <span className="text-[11px] text-charcoal-500 font-normal">Real-time log buffer</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                {simulatedLogs.map((log) => (
                  <div
                    key={log.id}
                    className="bg-white p-2.5 rounded-lg border border-charcoal-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-charcoal-400">[{log.time}]</span>
                      <span className="font-semibold text-charcoal-800">{log.event}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[11px]">
                      <span className="text-charcoal-500">{log.target}</span>
                      <span
                        className={`px-2 py-0.5 rounded font-sans font-semibold ${
                          log.status.includes('Synced')
                            ? 'bg-emerald-100 text-emerald-800'
                            : log.status.includes('Local')
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-tea-100 text-tea-800'
                        }`}
                      >
                        {log.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
