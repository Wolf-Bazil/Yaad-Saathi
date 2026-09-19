import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  DatabaseZap,
  Gauge,
  Siren,
  Sunrise,
  Sparkles,
  Languages,
  Accessibility,
} from 'lucide-react';

/**
 * Shared card chrome. Every card carries the same hairline, the same cursor-lit
 * border, and a recessed well at the bottom holding one purpose-built micro-demo.
 * The demos are CSS-only and stay paused until the section scrolls into view.
 */
function Card({ icon: Icon, eyebrow, title, body, footnote, className = '', children }) {
  const ref = useRef(null);
  const frame = useRef(0);

  const handleMove = useCallback((event) => {
    const { clientX, clientY } = event;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${clientX - rect.left}px`);
      el.style.setProperty('--my', `${clientY - rect.top}px`);
    });
  }, []);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  return (
    <article
      ref={ref}
      onMouseMove={handleMove}
      className={`cap-card rounded-[1.375rem] p-6 sm:p-7 ${className}`}
    >
      <div className="relative z-[1] flex h-full flex-col">
        <div className="flex items-center gap-3">
          <span className="cap-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-[0.625rem]">
            <Icon className="h-4 w-4 text-tea-300" strokeWidth={1.75} />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-tea-400/75">
            {eyebrow}
          </span>
        </div>

        <h3 className="mt-5 text-[17px] font-semibold leading-snug tracking-[-0.011em] text-white">
          {title}
        </h3>
        <p className="mt-2 max-w-[46ch] text-[13px] leading-relaxed text-charcoal-400">
          {body}
        </p>

        {children && <div className="mt-6 flex-1">{children}</div>}

        {footnote && (
          <div className="mt-5 border-t border-white/[0.07] pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-charcoal-500">
            {footnote}
          </div>
        )}
      </div>
    </article>
  );
}

function Well({ className = '', children }) {
  return (
    <div className={`cap-well rounded-2xl p-4 ${className}`}>{children}</div>
  );
}

/* ── 01 · Offline queue and flush ──────────────────────────────────────── */
function OfflineDemo() {
  return (
    <Well className="flex h-full flex-col justify-between gap-4">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em]">
        <span className="text-charcoal-500">IndexedDB buffer</span>
        <span className="relative block h-3 w-[120px] shrink-0">
          <span className="cap-anim absolute right-0 whitespace-nowrap text-terracotta-400" style={{ animation: 'cap-state-offline 6s ease-in-out infinite' }}>
            offline · queueing
          </span>
          <span className="cap-anim absolute right-0 whitespace-nowrap text-emerald-400" style={{ animation: 'cap-state-synced 6s ease-in-out infinite' }}>
            flushed · 280ms
          </span>
        </span>
      </div>

      <div className="relative space-y-2 overflow-hidden py-1">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="cap-anim h-full origin-left rounded-full bg-gradient-to-r from-tea-500 to-tea-300"
              style={{ animation: `cap-queue 6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.26}s infinite` }}
            />
          </div>
        ))}

        {/* Sync sweep that clears the queue once the link returns */}
        <div
          className="cap-anim pointer-events-none absolute inset-y-0 w-14 bg-gradient-to-r from-transparent via-emerald-300/35 to-transparent"
          style={{ animation: 'cap-flush 6s cubic-bezier(0.16, 1, 0.3, 1) infinite' }}
        />
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] text-charcoal-500">
        <span>device</span>
        <span className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/[0.06] to-white/10 mx-3" />
        <span>supabase</span>
      </div>
    </Well>
  );
}

/* ── 02 · Latency climbs, difficulty steps down ────────────────────────── */
function AdaptiveDemo() {
  const peaks = ['38%', '52%', '61%', '74%', '86%'];
  return (
    <Well className="flex h-full flex-col justify-between gap-4">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-charcoal-500">
        <span>tap latency</span>
        <span className="text-tea-300">difficulty · auto</span>
      </div>

      <div className="relative h-[72px]">
        <div className="flex h-full items-end gap-2">
          {peaks.map((peak, i) => (
            <div
              key={peak}
              className="cap-anim flex-1 rounded-t-[3px] bg-gradient-to-t from-tea-700/70 to-tea-400"
              style={{
                '--peak': peak,
                height: '22%',
                animation: `cap-latency 5.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Difficulty ceiling drops a notch before frustration compounds */}
        <div
          className="cap-anim absolute inset-x-0 top-[14px]"
          style={{ animation: 'cap-step-down 5.4s cubic-bezier(0.16, 1, 0.3, 1) infinite' }}
        >
          <div className="h-px w-full bg-amberGold-400/70" style={{ maskImage: 'linear-gradient(90deg,#000 70%,transparent)' }} />
          <span className="mt-1 block font-mono text-[9px] text-amberGold-300">ceiling</span>
        </div>
      </div>

      <div className="font-mono text-[10px] text-charcoal-500">
        RandomForestClassifier · 5 features · sub-5ms
      </div>
    </Well>
  );
}

/* ── 03 · One session falls through the anomaly threshold ──────────────── */
function AnomalyDemo() {
  const baseline = [6, 4, 7, 5, 6, 8, 5, 6, 4, 7];
  return (
    <Well className="flex h-full flex-col justify-between gap-3">
      <svg viewBox="0 0 180 72" className="w-full" role="presentation">
        <line x1="0" y1="52" x2="180" y2="52" stroke="rgba(194,65,12,0.55)" strokeWidth="1" strokeDasharray="3 4" />
        {baseline.map((offset, i) => (
          <circle
            key={i}
            className="cap-anim"
            cx={12 + i * 15}
            cy={24 + offset}
            r="3"
            fill="rgba(143,197,180,0.75)"
            style={{
              transformBox: 'fill-box',
              transformOrigin: 'center',
              animation: `cap-baseline-bob 3.2s ease-in-out ${i * 0.14}s infinite`,
            }}
          />
        ))}
        <circle
          className="cap-anim"
          cx="162"
          cy="29"
          r="3"
          fill="#FB923C"
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            animation: 'cap-outlier-drop 5.6s cubic-bezier(0.16, 1, 0.3, 1) infinite',
          }}
        />
      </svg>

      <div
        className="cap-anim flex items-center gap-2 rounded-lg border border-terracotta-500/25 bg-terracotta-500/10 px-2.5 py-1.5"
        style={{ animation: 'cap-alert-in 5.6s cubic-bezier(0.16, 1, 0.3, 1) infinite' }}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-terracotta-400" />
        <span className="font-mono text-[10px] text-terracotta-200">
          flag −1 · ASHA notified
        </span>
      </div>
    </Well>
  );
}

/* ── 04 · Lucidity window locks onto the morning cluster ───────────────── */
function CircadianDemo() {
  return (
    <Well className="flex h-full flex-col justify-between gap-3">
      <div className="relative">
        <svg viewBox="0 0 180 64" className="w-full" role="presentation">
          <defs>
            <linearGradient id="capErrFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(143,197,180,0.30)" />
              <stop offset="100%" stopColor="rgba(143,197,180,0)" />
            </linearGradient>
          </defs>
          {/* 24-hour error-rate curve: low at mid-morning, climbing into sundowning */}
          <path
            d="M0,26 C22,20 34,12 52,11 C72,10 84,20 104,30 C124,40 140,50 180,58 L180,64 L0,64 Z"
            fill="url(#capErrFill)"
          />
          <path
            d="M0,26 C22,20 34,12 52,11 C72,10 84,20 104,30 C124,40 140,50 180,58"
            fill="none"
            stroke="rgba(143,197,180,0.85)"
            strokeWidth="1.5"
          />
        </svg>

        <div
          className="cap-anim absolute inset-y-0 left-[16%] w-[26%] rounded-md border border-tea-300/40 bg-tea-400/10"
          style={{ animation: 'cap-window-lock 6.4s cubic-bezier(0.16, 1, 0.3, 1) infinite' }}
        />
      </div>

      <div className="flex items-center justify-between font-mono text-[10px] text-charcoal-500">
        <span>06:00</span>
        <span className="text-tea-300">10:00 – 11:30 peak</span>
        <span>20:00</span>
      </div>
    </Well>
  );
}

/* ── 05 · A caregiver note becomes a cognitive-safe quiz ───────────────── */
function SynthesisDemo() {
  const options = ['Amit', 'Cricket bat', 'Shillong'];
  return (
    <Well className="flex h-full flex-col justify-between gap-4">
      <div className="flex items-baseline gap-1 overflow-hidden">
        <span className="font-mono text-[10px] text-charcoal-500 shrink-0">note&gt;</span>
        <span
          className="cap-anim whitespace-nowrap overflow-hidden text-[11px] text-charcoal-200"
          style={{ animation: 'cap-type 6.8s steps(38, end) infinite' }}
        >
          Grandson Amit, Shillong, cricket bat
        </span>
        <span
          className="cap-anim inline-block h-3 w-px bg-tea-300"
          style={{ animation: 'cap-caret 1s steps(1, end) infinite' }}
        />
      </div>

      <div className="space-y-1.5">
        {options.map((option, i) => (
          <div
            key={option}
            className="cap-anim flex items-center justify-between rounded-lg border border-white/[0.07] bg-white/[0.03] px-2.5 py-1.5"
            style={{ animation: `cap-option-in 6.8s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.18}s infinite` }}
          >
            <span className="text-[11px] text-charcoal-200">{option}</span>
            <span className="font-mono text-[9px] text-tea-400">safe</span>
          </div>
        ))}
      </div>
    </Well>
  );
}

/* ── 06 · One letter, three scripts ────────────────────────────────────── */
function MultilingualDemo() {
  const letters = [
    { code: 'ENG', line: 'Retention improved 12% this week.' },
    { code: 'हिंदी', line: 'इस सप्ताह स्मृति में 12% सुधार हुआ।' },
    { code: 'অসমীয়া', line: 'এই সপ্তাহত স্মৃতিশক্তি ১২% বৃদ্ধি পাইছে।' },
  ];

  return (
    <Well className="flex h-full flex-col justify-between gap-4">
      <div className="relative h-11">
        {letters.map((letter, i) => (
          <p
            key={letter.code}
            className="cap-anim absolute inset-0 text-[13px] leading-relaxed text-charcoal-100"
            style={{ animation: `cap-script 9s cubic-bezier(0.16, 1, 0.3, 1) ${i * 3}s infinite` }}
          >
            {letter.line}
          </p>
        ))}
      </div>

      <div className="relative grid grid-cols-3 overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02]">
        <div
          className="cap-anim absolute inset-y-0 left-0 w-1/3 bg-tea-500/20 ring-1 ring-inset ring-tea-300/25"
          style={{ animation: 'cap-lang-slide 9s cubic-bezier(0.16, 1, 0.3, 1) infinite' }}
        />
        {letters.map((letter) => (
          <span
            key={letter.code}
            className="relative z-[1] py-1.5 text-center font-mono text-[10px] text-charcoal-300"
          >
            {letter.code}
          </span>
        ))}
      </div>
    </Well>
  );
}

/* ── 07 · Contrast, tap targets, spoken prompts ────────────────────────── */
function AccessibilityDemo() {
  return (
    <Well className="flex h-full items-center justify-between gap-5">
      <div className="min-w-0 flex-1 space-y-3">
        <div>
          <div className="flex items-center justify-between font-mono text-[10px] text-charcoal-500">
            <span>contrast</span>
            <span className="text-emerald-300">7.8 : 1 · AAA</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
            <div
              className="cap-anim h-full rounded-full bg-gradient-to-r from-tea-500 to-emerald-300"
              style={{ width: 0, animation: 'cap-meter 5.2s cubic-bezier(0.16, 1, 0.3, 1) infinite' }}
            />
          </div>
        </div>

        <div className="flex items-end gap-[3px]" aria-hidden="true">
          {[0.9, 0.5, 1, 0.65, 0.85, 0.4, 0.75].map((scale, i) => (
            <span
              key={i}
              className="cap-anim w-[3px] origin-bottom rounded-full bg-tea-400/70"
              style={{
                height: `${10 + scale * 12}px`,
                animation: `cap-wave 1.4s ease-in-out ${i * 0.09}s infinite`,
              }}
            />
          ))}
          <span className="ml-2 font-mono text-[10px] text-charcoal-500">spoken prompt</span>
        </div>
      </div>

      {/* 72px minimum tap target, drawn to scale */}
      <div className="relative grid h-[72px] w-[72px] shrink-0 place-items-center">
        <span
          className="cap-anim absolute inset-0 rounded-2xl border border-tea-300/40"
          style={{ animation: 'cap-tap-ring 2.4s cubic-bezier(0.16, 1, 0.3, 1) infinite' }}
        />
        <span className="grid h-full w-full place-items-center rounded-2xl border border-white/[0.09] bg-white/[0.04] font-mono text-[10px] text-charcoal-400">
          72px
        </span>
      </div>
    </Well>
  );
}

export default function CapabilityGrid() {
  const sectionRef = useRef(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setLive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setLive(entry.isIntersecting),
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="platform"
      ref={sectionRef}
      className="cap-surface relative overflow-hidden py-20 sm:py-28"
    >
      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mb-12 max-w-3xl sm:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold uppercase tracking-wider text-tea-200">
            <span className="h-1.5 w-1.5 rounded-full bg-tea-400" />
            Platform Capabilities
          </div>
          <h2 className="text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl">
            Seven systems doing the work{' '}
            <span className="font-serif font-normal italic text-tea-300">
              no rural clinic has staff for.
            </span>
          </h2>
          <p className="mt-4 text-base font-normal leading-relaxed text-charcoal-400 sm:text-lg">
            Each one runs on the handset in a patient&apos;s hands — through landslide
            blackouts, across three scripts, without a neurologist in the district.
          </p>
        </div>

        {/* Asymmetric bento: 3+3 / 2+2+2 / 3+3 */}
        <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6 ${live ? 'cap-live' : ''}`}>
          <Card
            className="md:col-span-1 lg:col-span-3"
            icon={DatabaseZap}
            eyebrow="01 · Persistence"
            title="Sessions survive the blackout, not just the reload"
            body="Every tap timestamp and accuracy metric commits to browser IndexedDB before it ever reaches a network. Play for weeks with the SIM pulled; the queue flushes to Supabase the moment an edge signal returns."
            footnote="Zero packets required to play"
          >
            <OfflineDemo />
          </Card>

          <Card
            className="md:col-span-1 lg:col-span-3"
            icon={Gauge}
            eyebrow="02 · Adaptive ML"
            title="Difficulty falls before frustration does"
            body="Response latency, mistake velocity and session duration feed a CPU-trained classifier that lowers the ceiling ahead of a catastrophic reaction — the panic spiral a perceived failure triggers in dementia."
            footnote="Scikit-Learn · sub-5ms inference"
          >
            <AdaptiveDemo />
          </Card>

          <Card
            className="md:col-span-1 lg:col-span-2"
            icon={Siren}
            eyebrow="03 · Anomaly Guard"
            title="Tells a bad day from a medical emergency"
            body="Gradual decline looks nothing like a 300% overnight latency spike. IsolationForest separates them and alerts the ASHA worker to check for UTI, dehydration or delirium."
          >
            <AnomalyDemo />
          </Card>

          <Card
            className="md:col-span-1 lg:col-span-2"
            icon={Sunrise}
            eyebrow="04 · Circadian"
            title="Schedules around the lucid hours"
            body="K-Means clusters 24-hour error distributions per patient, finds the individual peak-lucidity window, and books sessions before sundowning confusion sets in."
          >
            <CircadianDemo />
          </Card>

          <Card
            className="md:col-span-2 lg:col-span-2"
            icon={Sparkles}
            eyebrow="05 · Reminiscence"
            title="Family photos become the therapy"
            body="A caregiver types a rough note. The model returns multiple-choice recall prompts built from affectionate clues, with no punitive framing and no buzzer anywhere in the flow."
          >
            <SynthesisDemo />
          </Card>

          <Card
            className="md:col-span-1 lg:col-span-3"
            icon={Languages}
            eyebrow="06 · Multilingual"
            title="Clinical letters in the language the family reads"
            body="The same weekly progress letter renders in English, Hindi and Assamese — written for a sub-centre health worker and a daughter in the same breath, not for a specialist who was never there."
            footnote="Formatted for ASHA sub-centres"
          >
            <MultilingualDemo />
          </Card>

          <Card
            className="md:col-span-1 lg:col-span-3"
            icon={Accessibility}
            eyebrow="07 · Accessibility"
            title="Built for 72-year-old eyes and unsteady hands"
            body="AAA contrast throughout, 72px minimum tap targets, and spoken guidance in regional audio so nothing depends on reading small type or landing a precise touch."
            footnote="WCAG AAA · voice-first"
          >
            <AccessibilityDemo />
          </Card>
        </div>
      </div>
    </section>
  );
}
