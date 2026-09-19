import React, { useState } from 'react';
import { WifiOff, UserX, Compass, MapPin, Check, ShieldAlert } from 'lucide-react';
import { sound } from '../lib/audio';

export default function RegionalReality() {
  const [activeState, setActiveState] = useState('Assam');

  const regionalData = {
    Assam: {
      terrain: 'Brahmaputra Floodplains and Tea Estates',
      outageRisk: 'High seasonal monsoon blackouts and riverbank land-slides',
      specialistAccess: 'Less than 1 geriatrician per 310,000 rural residents',
      dialects: ['Assamese (অসমীয়া)', 'Bodo (बर)', 'Bengali (বাংলা)', 'Hindi'],
      motifs: 'Kaziranga Rhino, Bihu Japi, Brass Tea Kettle, Gamusa weave',
      insight: 'Elderly tea garden communities respond strongly to daily tea routine and folk festival memories.',
    },
    Meghalaya: {
      terrain: 'Khasi and Garo Hills High Rainfall Plateau',
      outageRisk: 'Persistent cloud cover and satellite link dropouts',
      specialistAccess: 'Tertiary diagnostic centres concentrated solely in Shillong',
      dialects: ['Khasi (খাচি)', 'Garo (আচিক)', 'Pnar', 'English'],
      motifs: 'Shillong Pine, Living Root Bridges, Traditional Bamboo Baskets',
      insight: 'Matrilineal family structures make maternal grandparent photographs highly effective for recall.',
    },
    Arunachal: {
      terrain: 'High Himalayan Mountain Valleys and Forest Belts',
      outageRisk: 'Zero cellular coverage in remote border hamlets',
      specialistAccess: 'Over 12 hours travel to reach the nearest neurology clinic',
      dialects: ['Nyishi', 'Adi', 'Apatani', 'Hindi'],
      motifs: 'Great Hornbill feathers, Handloom weaves, River suspension bridges',
      insight: 'Oral storytelling traditions require audio voice prompts rather than dense written text.',
    },
    Mizoram: {
      terrain: 'Steep Ridge Valleys and Bamboo Hillside Villages',
      outageRisk: 'Intermittent power supply during rainfall seasons',
      specialistAccess: 'Community health workers manage over 90% of rural elder care',
      dialects: ['Mizo tawng', 'English'],
      motifs: 'Cheraw bamboo dance patterns, Hill village community cues',
      insight: 'Strong village council networks enable collective screening through trusted local workers.',
    },
  };

  const current = regionalData[activeState];

  return (
    <section id="reality" className="py-24 sm:py-32 bg-bone/60 border-t border-b border-charcoal-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            The ground reality in North East India
          </h2>
          <p className="text-base text-charcoal-600 leading-relaxed">
            Standard healthcare apps assume uninterrupted 5G, urban hospitals, and English literacy. In rural hill villages, none of those exist.
          </p>
        </div>

        {/* Asymmetrical Grid: 5 cols reality facts + 7 cols interactive lens */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 2 High-Impact Structural Realities (Stacked) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-charcoal-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-tea-50 border border-tea-200 text-tea-800 flex items-center justify-center mb-5">
                <UserX className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">
                Specialist Deficit
              </h3>
              <p className="text-sm text-charcoal-600 leading-relaxed mb-4">
                There is less than 1 geriatric neurologist per 250,000 rural residents in the region. Families and ASHA healthcare workers carry the full daily burden alone without specialist backup.
              </p>
              <div className="pt-3 border-t border-charcoal-100 text-xs font-semibold text-tea-800">
                Solution: Automated longitudinal tracking that alerts families to acute drops.
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-charcoal-200 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-tea-50 border border-tea-200 text-tea-800 flex items-center justify-center mb-5">
                <WifiOff className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-charcoal-900 mb-2">
                Monsoon Power & Network Outages
              </h3>
              <p className="text-sm text-charcoal-600 leading-relaxed mb-4">
                Heavy monsoons and rugged hill terrain cause frequent blackouts lasting days. Cloud-reliant mobile apps crash and lose therapy logs during network drops.
              </p>
              <div className="pt-3 border-t border-charcoal-100 text-xs font-semibold text-tea-800">
                Solution: 100% on-device IndexedDB caching and CPU-based ML inference.
              </div>
            </div>

          </div>

          {/* Right: State-by-State Interactive Infrastructure Explorer */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-charcoal-200 p-6 sm:p-8 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-charcoal-100">
              <div>
                <span className="text-xs font-bold text-tea-800 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-tea-700" />
                  Regional Telemetry Lens
                </span>
                <h3 className="text-base sm:text-lg font-bold text-charcoal-900 mt-0.5">
                  State-by-State Infrastructure Context
                </h3>
              </div>

              {/* State Pills */}
              <div className="flex flex-wrap gap-2">
                {Object.keys(regionalData).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setActiveState(st);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-[0.98] ${
                      activeState === st
                        ? 'bg-tea-900 text-white shadow-sm'
                        : 'bg-paper text-charcoal-700 hover:bg-bone border border-charcoal-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected State Realities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-4 rounded-xl bg-bone/70 border border-charcoal-200/80">
                <span className="text-xs text-charcoal-500 font-medium block mb-1">
                  Terrain and Geography
                </span>
                <p className="font-semibold text-charcoal-900 text-sm">
                  {current.terrain}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-bone/70 border border-charcoal-200/80">
                <span className="text-xs text-charcoal-500 font-medium block mb-1">
                  Outage Frequency Profile
                </span>
                <p className="font-semibold text-charcoal-900 text-sm">
                  {current.outageRisk}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-bone/70 border border-charcoal-200/80">
                <span className="text-xs text-charcoal-500 font-medium block mb-1">
                  Specialist Density Ratio
                </span>
                <p className="font-semibold text-charcoal-900 text-sm">
                  {current.specialistAccess}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-bone/70 border border-charcoal-200/80">
                <span className="text-xs text-charcoal-500 font-medium block mb-1">
                  Indigenous Reminiscence Motifs
                </span>
                <p className="font-semibold text-charcoal-900 text-sm">
                  {current.motifs}
                </p>
              </div>
            </div>

            {/* Dialects Supported */}
            <div className="p-4 rounded-xl bg-paper border border-charcoal-200">
              <span className="text-xs font-semibold text-charcoal-700 block mb-2">
                Supported Native Dialects in {activeState}
              </span>
              <div className="flex flex-wrap gap-2">
                {current.dialects.map((d) => (
                  <span
                    key={d}
                    className="px-2.5 py-1 rounded-lg bg-white text-tea-900 border border-tea-200 text-xs font-semibold"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>

            {/* Cultural Clinical Insight Note */}
            <div className="p-4 rounded-xl bg-tea-50/80 border border-tea-200/80 flex items-start gap-3">
              <Compass className="w-5 h-5 text-tea-800 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-tea-950">
                <span className="font-bold block mb-0.5">Clinical Cultural Insight:</span>
                {current.insight}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
