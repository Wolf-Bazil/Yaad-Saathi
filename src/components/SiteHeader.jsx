import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Gamepad2 } from 'lucide-react';
import { sound } from '../lib/audio';
import RetroSnakeArcade from './RetroSnakeArcade';

const NAV_LINKS = [
  { href: '#reality',   label: 'Reality' },
  { href: '#therapy',   label: 'Therapy' },
  { href: '#offline',   label: 'Offline' },
  { href: '#telemetry', label: 'Caregiver' },
  { href: '#field',     label: 'Field' },
  { href: '#evidence',  label: 'Research' },
];

export default function SiteHeader({ isMuted, toggleMute }) {
  const [open, setOpen] = useState(false);
  const [isArcadeOpen, setIsArcadeOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleVoice = () => {
    sound.playHarmony();
    sound.speakPrompt('नमस्ते! यादसाथी में आपका स्वागत है। पूर्वोत्तर भारत के बुजुर्गों के लिए समर्पित मंच।');
  };

  return (
    <>
      {/* Non-sticky — scrolls away with the page, just like the homepage reference */}
      <header className="relative z-50 border-b border-black/[0.06] bg-white/80 backdrop-blur-sm">
        <div className="relative mx-auto flex h-12 max-w-7xl items-center justify-between px-3 sm:h-16 sm:px-6">

          {/* ── Logo / Brand ──────────────────────────────────────── */}
          <a
            href="#"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2.5 shrink-0 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-[#0C2A24] text-white flex items-center justify-center text-sm shadow-sm">
              🧠
            </div>
            <div className="flex flex-col leading-none">
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-[0.95rem] tracking-tight text-neutral-900">
                  YaadSaathi
                </span>
                <span className="font-serif italic text-[#2A6D5B] text-[0.8rem] hidden sm:inline">
                  यादसाथी
                </span>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium hidden sm:block mt-px">
                Cognitive Care · North East India
              </span>
            </div>
          </a>

          {/* ── Nav — absolutely centered (same technique as homepage) ── */}
          <nav
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 lg:flex xl:gap-7"
            aria-label="Page sections"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => sound.playClick()}
                className="text-[13px] font-medium text-neutral-600 transition-colors hover:text-black"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* ── Right Controls ────────────────────────────────────── */}
          <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">

            {/* Voice prompt — desktop only */}
            <button
              type="button"
              onClick={handleVoice}
              title="Play spoken regional voice prompt"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F0F7F4] hover:bg-[#DDEFE9] text-[#0C2A24] text-xs font-semibold border border-[#BCDED3] transition-all active:scale-[0.97]"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#2A6D5B]" />
              <span>Voice</span>
            </button>

            {/* Mute toggle */}
            <button
              type="button"
              onClick={toggleMute}
              title={isMuted ? 'Unmute audio' : 'Mute audio'}
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-black active:scale-[0.97]"
            >
              {isMuted
                ? <VolumeX className="w-4 h-4 text-red-500" />
                : <VolumeX className="w-4 h-4 opacity-0 absolute" aria-hidden />
              }
              {!isMuted && <Volume2 className="w-4 h-4" />}
            </button>

            {/* Arcade button */}
            <button
              type="button"
              onClick={() => { sound.playClick(); setIsArcadeOpen(true); }}
              title="Open retro Snake arcade"
              className="hidden sm:flex h-8 w-8 items-center justify-center rounded-lg border border-black/[0.08] bg-white text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-black active:scale-[0.97]"
            >
              <Gamepad2 className="w-4 h-4" />
            </button>

            {/* Primary CTA pill — matches homepage StarButton style */}
            <a
              href="#patient-activity"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#0C2A24] px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-colors hover:bg-[#163E35] active:scale-[0.97]"
            >
              <span className="sm:hidden">Start</span>
              <span className="hidden sm:inline">Start Activity</span>
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-700 transition-colors hover:bg-black/5 hover:text-black lg:hidden"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'}
                />
              </svg>
            </button>
          </div>

        </div>

        {/* ── Mobile dropdown ──────────────────────────────────────── */}
        {open && (
          <div className="border-t border-black/[0.06] bg-white/95 backdrop-blur-xl shadow-lg lg:hidden">
            <nav className="mx-auto max-w-7xl px-4 py-2">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => { sound.playClick(); setOpen(false); }}
                  className="block border-b border-black/[0.04] py-3 text-sm font-medium text-neutral-700 last:border-b-0 hover:text-black"
                >
                  {l.label}
                </a>
              ))}
              <div className="flex gap-2 py-3 border-t border-black/[0.04] mt-1">
                <button
                  type="button"
                  onClick={() => { handleVoice(); setOpen(false); }}
                  className="flex-1 py-2.5 rounded-lg bg-[#F0F7F4] text-[#0C2A24] text-xs font-semibold border border-[#BCDED3] text-center"
                >
                  Voice Prompt
                </button>
                <a
                  href="#patient-activity"
                  onClick={() => { sound.playClick(); setOpen(false); }}
                  className="flex-1 py-2.5 rounded-lg bg-[#0C2A24] text-white text-xs font-semibold text-center"
                >
                  Start Activity
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>

      <RetroSnakeArcade isOpen={isArcadeOpen} onClose={() => setIsArcadeOpen(false)} />
    </>
  );
}
