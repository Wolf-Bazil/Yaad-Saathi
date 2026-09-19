import React, { useState } from 'react';
import { AlertTriangle, WifiOff, Languages, Stethoscope, ArrowUpRight, Compass, ShieldAlert, MapPin, Sparkles } from 'lucide-react';
import { NER_STATES } from '../data/mockData';
import { sound } from '../lib/audio';

const STATE_REALITIES = {
  'Assam': 'Majuli & Karbi Anglong: ~180km mountain travel to GMCH for clinical evaluation. Over 40% tea garden workers lack English/Hindi literacy.',
  'Meghalaya': 'East Khasi & Jaintia Hills: Monsoon landslides cause 18+ days of fiber line cuts annually. Rain-resilient offline mode critical.',
  'Arunachal Pradesh': 'Tawang & Dibang Valley: Zero resident geriatric neurologists across 16 border districts; 100% offline CST dependency.',
  'Mizoram': 'Aizawl & Lunglei: Mizo dialect spoken by 87% elders; clinical tests in English induce high false-positive cognitive impairment rates.',
  'Nagaland': 'Mon & Tuensang: Steep topography isolates hill villages from Kohima Medical College. ASHA workers are sole frontline caregivers.',
  'Manipur': 'Churachandpur & Ukhrul: Primary healthcare sub-centres rely on battery-backed handsets with intermittent 2G edge signals.',
  'Tripura': 'Dhalai & North Tripura: Kokborok language integration essential for autobiographical memory stimuli among indigenous elders.',
  'Sikkim': 'North Sikkim (Mangan): Severe winter snow cuts road access; local IndexedDB therapy queues synchronize only during thaw.'
};

export default function DisparityBento() {
  const [selectedState, setSelectedState] = useState('Assam');

  const handleStateClick = (state) => {
    sound.playClick();
    setSelectedState(state);
  };
  return (
    <section id="problem" className="py-20 sm:py-28 bg-white border-y border-charcoal-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-terracotta-50 border border-terracotta-200 text-terracotta-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5 text-terracotta-600" />
            The Ground Reality in North East India
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-charcoal-950 tracking-tight leading-[1.15]">
            Why standard cognitive apps{' '}
            <span className="font-serif italic font-normal text-terracotta-700">
              fail completely
            </span>{' '}
            in the North Eastern Region.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-charcoal-600 leading-relaxed font-normal">
            Urban Western cognitive apps assume high-speed 5G, English literacy, and city landmarks. In rural Assam, Meghalaya, and Arunachal, that assumption leaves elders isolated.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Specialist Deficit (Large Card 8 cols) */}
          <div className="md:col-span-7 lg:col-span-8 p-7 sm:p-9 rounded-[2rem] bg-paper border border-charcoal-200/80 relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-charcoal-900 text-white">
                  Critical Care Gap
                </span>
                <span className="text-xs font-mono font-bold text-terracotta-700">
                  ICMR / Lancet 2024
                </span>
              </div>

              <div className="mt-8">
                <div className="text-5xl sm:text-7xl font-extrabold text-charcoal-950 tracking-tight font-mono">
                  &lt;1 : 250,000
                </div>
                <div className="mt-2 text-base sm:text-lg font-bold text-charcoal-800">
                  Geriatric Neurologists per Rural Population in NER
                </div>
                <p className="mt-3 text-sm text-charcoal-600 leading-relaxed max-w-xl">
                  Rural primary health centres (PHCs) and Sub-Centres across hill districts have virtually zero specialist neurologist coverage. Families must travel 14+ hours across winding mountain roads to reach Guwahati or Dibrugarh for a single cognitive evaluation.
                </p>
              </div>
            </div>

            {/* Interactive State Pills & Ground Reality Box */}
            <div className="relative z-10 mt-8 pt-6 border-t border-charcoal-200/60">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-tea-700" />
                  Target Footprint (Select to inspect ground reality):
                </span>
                <span className="text-[11px] font-mono text-tea-700 font-bold">
                  {selectedState} Focused
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {NER_STATES.map(state => {
                  const isActive = selectedState === state;
                  return (
                    <button
                      key={state}
                      onClick={() => handleStateClick(state)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-subtle active:scale-95 ${
                        isActive
                          ? 'bg-tea-900 text-white shadow-elevation scale-105'
                          : 'bg-white border border-charcoal-200 text-charcoal-700 hover:bg-charcoal-50 hover:border-charcoal-300'
                      }`}
                    >
                      {state}
                    </button>
                  );
                })}
              </div>

              {/* Dynamic State Intelligence Callout */}
              <div className="mt-4 p-3.5 rounded-xl bg-white/90 border border-charcoal-200/90 text-xs text-charcoal-800 leading-relaxed shadow-subtle flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-terracotta-500 shrink-0 mt-1.5 animate-pulse" />
                <div>
                  <strong className="text-charcoal-950 font-bold">{selectedState} Health Infrastructure Gap: </strong>
                  <span>{STATE_REALITIES[selectedState]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Terrain & Telecom Blackouts (4 cols) */}
          <div className="md:col-span-5 lg:col-span-4 p-7 sm:p-8 rounded-[2rem] bg-tea-900 text-white flex flex-col justify-between shadow-elevation">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-emerald-400 mb-6">
                <WifiOff className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white">
                Zero-Packet Resilience
              </h3>
              <p className="mt-3 text-sm text-tea-100 leading-relaxed">
                Monsoon landslides, power outages, and zero-signal valleys render cloud-dependent software useless. YaadSaathi stores therapy state in browser IndexedDB — fully operational for weeks with zero internet.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="text-3xl font-extrabold font-mono text-emerald-400">100%</div>
              <div className="text-xs text-tea-200 font-medium">Offline Gameplay & Telemetry Persistence</div>
            </div>
          </div>

          {/* Card 3: 200+ Indigenous Dialects (4 cols) */}
          <div className="md:col-span-5 lg:col-span-4 p-7 sm:p-8 rounded-[2rem] bg-paper border border-charcoal-200/80 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amberGold-100 text-amberGold-800 flex items-center justify-center mb-6">
                <Languages className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-charcoal-900">
                200+ Indigenous Dialects
              </h3>
              <p className="mt-3 text-sm text-charcoal-600 leading-relaxed">
                Matching skyscrapers or subway tokens causes agitation and disorientation. YaadSaathi grounds stimuli in beloved Assamese, Khasi, Mizo, and Bodo motifs like the Bihu Japi and tea gardens.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-charcoal-100 flex items-center gap-2 text-xs font-semibold text-tea-800">
              <span>Bilingual Hindi + Assamese Audio Guidance</span>
            </div>
          </div>

          {/* Card 4: Unpaid Caregiver Burnout & ASHA Support (8 cols) */}
          <div className="md:col-span-7 lg:col-span-8 p-7 sm:p-9 rounded-[2rem] bg-paper border border-charcoal-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-terracotta-100 text-terracotta-800 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold text-charcoal-500">
                  ARDSI National Report
                </span>
              </div>

              <div className="mt-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-charcoal-900 tracking-tight">
                  85% of Dementia Care in India is Unpaid Family Burden
                </h3>
                <p className="mt-3 text-sm text-charcoal-600 leading-relaxed max-w-xl">
                  Family members face emotional exhaustion without objective tracking metrics. YaadSaathi equips both informal family caregivers and grassroots ASHA / ANM community health workers with longitudinal cognitive radar telemetry and acute anomaly alerts.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-charcoal-100 flex flex-wrap items-center justify-between gap-4 text-xs font-medium text-charcoal-600">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Objective 5-Spoke Clinical Telemetry
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-terracotta-500"></span>
                Early Detection of Acute Delirium / UTIs
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
