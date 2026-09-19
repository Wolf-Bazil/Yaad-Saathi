import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { sound } from '../lib/audio';

export default function SiteFooter() {
  const dialects = [
    'অসমীয়া (Assamese)',
    'বাংলা (Bengali)',
    'हिंदी (Hindi)',
    'Khasi (খাচি)',
    'Garo (আচিক)',
    'Bodo (बर)',
    'Mizo tawng',
  ];

  return (
    <footer className="bg-bone/80 border-t border-charcoal-200/80 py-16 sm:py-20 text-charcoal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-tea-900 text-tea-50 flex items-center justify-center font-bold text-sm shadow-sm">
                🧠
              </div>
              <span className="font-extrabold text-lg text-charcoal-900">
                YaadSaathi <span className="font-serif italic font-normal text-tea-700 text-sm">यादसाथी</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed max-w-md">
              An offline-first cognitive stimulation therapy and family reminiscence platform engineered for elderly dementia patients, caregivers, and ASHA workers across North East India.
            </p>
            <div className="text-xs text-charcoal-500 pt-1">
              Smart India Hackathon (SIH 2026) · Healthcare & MedTech Solution
            </div>
          </div>

          {/* Clinical Navigation (3 cols) */}
          <div className="md:col-span-3">
            <div className="text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-3">
              Platform Architecture
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#reality"
                  onClick={() => sound.playClick()}
                  className="hover:text-tea-800 transition-colors"
                >
                  Regional Reality in NER
                </a>
              </li>
              <li>
                <a
                  href="#therapy"
                  onClick={() => sound.playClick()}
                  className="hover:text-tea-800 transition-colors"
                >
                  4 Clinical CST Pillars
                </a>
              </li>
              <li>
                <a
                  href="#offline"
                  onClick={() => sound.playClick()}
                  className="hover:text-tea-800 transition-colors"
                >
                  Offline IndexedDB Engine
                </a>
              </li>
              <li>
                <a
                  href="#telemetry"
                  onClick={() => sound.playClick()}
                  className="hover:text-tea-800 transition-colors"
                >
                  Caregiver & ASHA Telemetry
                </a>
              </li>
              <li>
                <a
                  href="#field"
                  onClick={() => sound.playClick()}
                  className="hover:text-tea-800 transition-colors"
                >
                  Doorstep Care Journey
                </a>
              </li>
              <li>
                <a
                  href="#evidence"
                  onClick={() => sound.playClick()}
                  className="hover:text-tea-800 transition-colors"
                >
                  Peer-Reviewed Citations
                </a>
              </li>
            </ul>
          </div>

          {/* Regional Languages (4 cols) */}
          <div className="md:col-span-4">
            <div className="text-xs font-bold uppercase tracking-wider text-charcoal-900 mb-3">
              Regional Dialects Supported
            </div>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {dialects.map((lang) => (
                <span
                  key={lang}
                  className="px-2.5 py-1 rounded-lg bg-white border border-charcoal-200 text-charcoal-800 font-medium"
                >
                  {lang}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-charcoal-500 mt-3 leading-relaxed">
              Synthesized locally via Web Speech API with zero network latency.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-charcoal-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <div>
            Designed with dignity and clinical respect for the elders of North East India.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-tea-800 font-medium">
              <ShieldCheck className="w-4 h-4 text-tea-700" />
              WCAG 2.1 AA Compliant
            </span>
            <span>·</span>
            <span>MIT Open Source</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
