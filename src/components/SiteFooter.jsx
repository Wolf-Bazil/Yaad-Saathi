import React from 'react';
import { Heart, PhoneCall, ShieldCheck, MapPin } from 'lucide-react';
import { NER_STATES } from '../data/mockData';

export default function SiteFooter() {
  return (
    <footer className="bg-charcoal-950 text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-tea-800 text-tea-50 flex items-center justify-center font-bold text-lg">
                🧠
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-xl text-white flex items-center gap-1.5">
                  YaadSaathi
                  <span className="font-serif italic font-normal text-tea-300 text-sm">यादसाथी</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-tea-400">
                  NER Cognitive Platform
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-charcoal-400 leading-relaxed max-w-sm">
              AI-powered, offline-first cognitive gaming & memory assistance platform preserving dignity, family memories, and clinical stability for elderly dementia patients across North East India.
            </p>

            <div className="pt-2 text-[11px] font-mono text-tea-300">
              Smart India Hackathon (SIH 2026) • Healthcare & MedTech
            </div>
          </div>

          {/* Regional Coverage (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-300">
              North Eastern Regional Footprint
            </h4>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {NER_STATES.map(state => (
                <span key={state} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] text-charcoal-300">
                  {state}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-charcoal-500 pt-2">
              Designed for Sub-Centres, Primary Health Centres (PHCs), and informal family homes.
            </p>
          </div>

          {/* Emergency & Eldercare Helplines (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal-300 flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-tea-400" />
              National Support Helplines
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-charcoal-400 text-[10px] uppercase font-mono">Elderline (Senior Citizens)</div>
                <div className="font-bold text-white text-sm">Toll-Free: 14567</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <div className="text-charcoal-400 text-[10px] uppercase font-mono">KIRAN (Mental Health)</div>
                <div className="font-bold text-white text-sm">Toll-Free: 1800-599-0019</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Specs & Copyright */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs text-charcoal-500 font-mono">
          <div className="flex items-center gap-2">
            <span>© 2026 YaadSaathi. Built for Smart India Hackathon.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>100% Offline-First IndexedDB</span>
            <span>•</span>
            <span>WCAG AAA Compliant</span>
            <span>•</span>
            <span>MIT License</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
