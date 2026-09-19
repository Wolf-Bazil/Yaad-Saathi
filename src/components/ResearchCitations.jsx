import React from 'react';
import { BookOpen, CheckCheck, ExternalLink } from 'lucide-react';
import { RESEARCH_EVIDENCE } from '../data/mockData';

export default function ResearchCitations() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-charcoal-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-100 border border-charcoal-200 text-charcoal-800 text-xs font-semibold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5 text-tea-700" />
            Verified Clinical Literature & Citations
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-charcoal-950 tracking-tight">
            Backed by national geriatric datasets and peer-reviewed trials.
          </h2>
        </div>

        {/* 4 Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESEARCH_EVIDENCE.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-paper border border-charcoal-200/80 flex flex-col justify-between hover:border-tea-500 hover:shadow-subtle transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-tea-50 text-tea-800 border border-tea-200/60 uppercase">
                    Ref 0{idx + 1}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-mono font-semibold flex items-center gap-1">
                    <span>✓ Peer-Reviewed</span>
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-tea-900 tracking-tight">
                  {item.stat}
                </div>
                <div className="mt-2 text-sm font-bold text-charcoal-900">
                  {item.label}
                </div>
                <p className="mt-2 text-xs text-charcoal-600 leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-charcoal-100 text-[11px] font-mono text-charcoal-500 flex items-center justify-between">
                <span>Source: {item.source}</span>
                <ExternalLink className="w-3 h-3 text-charcoal-400" />
              </div>
            </div>
          ))}
        </div>

        {/* CST Clinical Footnote */}
        <div className="mt-8 p-4 rounded-2xl bg-tea-50/70 border border-tea-200/60 text-xs text-tea-950 flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-2">
            <CheckCheck className="w-4 h-4 text-tea-700 shrink-0" />
            <strong>Cognitive Stimulation Therapy (CST):</strong> Proven in multi-center randomized control trials (RCTs) to enhance quality of life and slow cognitive deterioration comparable to cholinesterase inhibitors.
          </span>
          <span className="font-mono text-tea-700 font-semibold">Cochrane Systematic Review 2023</span>
        </div>

      </div>
    </section>
  );
}
