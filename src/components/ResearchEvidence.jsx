import React from 'react';
import { BookOpen, FileText, CheckCircle2, Award } from 'lucide-react';

export default function ResearchEvidence() {
  return (
    <section id="evidence" className="py-24 sm:py-32 bg-paper">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal-900 tracking-tight mb-4">
            Clinical research and scientific evidence
          </h2>
          <p className="text-base text-charcoal-600 leading-relaxed">
            YaadSaathi is engineered upon peer-reviewed medical protocols rather than generic brain training teasers.
          </p>
        </div>

        {/* Asymmetric 7:5 Clinical Citations Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left: 2 Primary Clinical Interventions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Citation 1: Spector CST */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-charcoal-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tea-50 text-tea-900 border border-tea-200 text-xs font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-tea-700" />
                  <span>Cognitive Stimulation Therapy (CST)</span>
                </span>
                <span className="text-xs font-mono text-charcoal-500">
                  British Journal of Psychiatry
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-charcoal-900 leading-snug">
                Efficacy of an evidence-based cognitive stimulation therapy programme for people with dementia
              </h3>

              <div className="text-xs text-charcoal-500">
                Spector, A., Thorgrimsen, L., Woods, B., Royan, L., Davies, S., et al. (2003). 183(3), 248-254.
              </div>

              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed bg-bone/70 p-4 rounded-xl border border-charcoal-200/80">
                "Standardized cognitive stimulation therapy groups produced statistically significant improvements in cognition (ADAS-Cog) and quality of life (QoL-AD), matching the efficacy of standard cholinesterase inhibitor medications."
              </p>

              <div className="pt-2 text-xs font-mono text-tea-800 flex items-center justify-between">
                <span>DOI: 10.1192/bjp.183.3.248</span>
                <span className="font-sans font-semibold text-tea-900">Validated Protocol</span>
              </div>
            </div>

            {/* Citation 2: Cochrane Reminiscence Review */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-charcoal-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tea-50 text-tea-900 border border-tea-200 text-xs font-semibold">
                  <BookOpen className="w-3.5 h-3.5 text-tea-700" />
                  <span>Reminiscence Therapy</span>
                </span>
                <span className="text-xs font-mono text-charcoal-500">
                  Cochrane Systematic Review
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-charcoal-900 leading-snug">
                Reminiscence therapy for people with dementia and mild cognitive impairment
              </h3>

              <div className="text-xs text-charcoal-500">
                Woods, B., O'Philbin, L., Farrell, M. L., Shenkin, S. D., & Spector, A. (2018). Issue 3.
              </div>

              <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed bg-bone/70 p-4 rounded-xl border border-charcoal-200/80">
                "Autobiographical photographs and personal family memorabilia provide moderate-to-high certainty evidence of improvements in communication, emotional well-being, and individual face recognition retention."
              </p>

              <div className="pt-2 text-xs font-mono text-tea-800 flex items-center justify-between">
                <span>DOI: 10.1002/14651858.CD001120.pub3</span>
                <span className="font-sans font-semibold text-tea-900">Systematic Gold Standard</span>
              </div>
            </div>

          </div>

          {/* Right: Epidemiology & Regional Disparity Report (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 border border-charcoal-200 shadow-sm space-y-5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tea-50 text-tea-900 border border-tea-200 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-tea-700" />
              <span>Public Health Need</span>
            </div>

            <h3 className="text-xl font-bold text-charcoal-900 leading-snug">
              Dementia India Report & Rural Care Deficit
            </h3>

            <div className="text-xs text-charcoal-500">
              Alzheimer's and Related Disorders Society of India (ARDSI) and ICMR LASI Survey
            </div>

            <div className="space-y-3 pt-2 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-paper border border-charcoal-200 space-y-1">
                <span className="font-bold text-charcoal-900 block">8.8 Million Individuals</span>
                <p className="text-charcoal-600 text-xs leading-relaxed">
                  Projected dementia prevalence in India, expected to cross 14 million by 2036.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-paper border border-charcoal-200 space-y-1">
                <span className="font-bold text-charcoal-900 block">85% Treatment Gap in Rural Areas</span>
                <p className="text-charcoal-600 text-xs leading-relaxed">
                  Over 85% of rural families in North East India never receive a single formal neurology evaluation due to geographic isolation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-tea-50/80 border border-tea-200 text-xs text-tea-950 space-y-1">
                <span className="font-bold block">Technological Imperative:</span>
                <p className="leading-relaxed">
                  Decentralized, offline cognitive stimulation delivered through tablets in local dialects is the only realistic way to bridge this gap at scale.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-charcoal-100 flex items-center justify-between text-xs text-charcoal-500 font-mono">
              <span>ICMR / MoHFW India</span>
              <FileText className="w-4 h-4 text-charcoal-400" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
