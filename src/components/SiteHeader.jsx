import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, Menu, X, ArrowUpRight, ShieldCheck, HeartPulse } from 'lucide-react';
import { sound } from '../lib/audio';

export default function SiteHeader({ isMuted, toggleMute }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAudioGreet = () => {
    sound.playHarmony();
    sound.speakPrompt('नमस्ते! यादसाथी में आपका स्वागत है। पूर्वोत्तर भारत के बुजुर्गों के लिए समर्पित मंच।');
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-paper/85 backdrop-blur-xl border-b border-black/[0.06] shadow-subtle' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Badges */}
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-tea-900 text-tea-50 flex items-center justify-center font-bold text-lg shadow-elevation transition-transform duration-300 group-hover:scale-105">
                🧠
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold tracking-tight text-xl text-charcoal-900 flex items-center gap-1.5">
                  YaadSaathi
                  <span className="font-serif italic font-normal text-tea-700 text-sm">यादसाथी</span>
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-tea-700">
                  NER Cognitive Platform
                </span>
              </div>
            </a>

            <div className="hidden md:flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full bg-tea-50 border border-tea-200/60 text-tea-800 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-tea-600 animate-pulse"></span>
              SIH 2026 • MedTech
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium text-charcoal-600">
            <a href="#problem" className="hover:text-tea-800 transition-colors">The NER Reality</a>
            <a href="#pillars" className="hover:text-tea-800 transition-colors">4 Clinical Games</a>
            <a href="#ai-engine" className="hover:text-tea-800 transition-colors">Dual AI Core</a>
            <a href="#telemetry" className="hover:text-tea-800 transition-colors">Caregiver Telemetry</a>
            <a href="#offline" className="hover:text-tea-800 transition-colors">Offline Engine</a>
            <a href="#demo" className="hover:text-tea-800 transition-colors">3-Min Hackathon Demo</a>
          </nav>

          {/* Header Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Audio Voice Test Button */}
            <button
              onClick={handleAudioGreet}
              title="Test spoken audio prompt"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-charcoal-100 hover:bg-charcoal-200 text-charcoal-700 text-xs font-medium transition-all active:scale-95"
            >
              <Volume2 className="w-3.5 h-3.5 text-tea-700" />
              <span>Voice Prompt</span>
            </button>

            {/* Sound Mute Toggle */}
            <button
              onClick={toggleMute}
              title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
              className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-charcoal-600 hover:bg-charcoal-100 transition-colors"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-terracotta-600" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            {/* Primary Action with Button-in-Button Trailing Icon */}
            <a
              href="#demo"
              className="group flex items-center pl-4 pr-1.5 py-1.5 rounded-full bg-tea-900 text-white text-xs font-semibold hover:bg-tea-800 transition-all duration-300 shadow-elevation active:scale-98"
            >
              <span>Explore Demo</span>
              <span className="ml-2 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center btn-nested-icon">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </span>
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-charcoal-700 hover:bg-charcoal-100 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-paper/95 backdrop-blur-2xl border-b border-black/[0.08] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-3 text-sm font-medium text-charcoal-700">
            <a 
              href="#problem" 
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-black/5"
            >
              The NER Reality
            </a>
            <a 
              href="#pillars" 
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-black/5"
            >
              4 Clinical Games
            </a>
            <a 
              href="#ai-engine" 
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-black/5"
            >
              Dual AI Core
            </a>
            <a 
              href="#telemetry" 
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-black/5"
            >
              Caregiver Telemetry
            </a>
            <a 
              href="#offline" 
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-black/5"
            >
              Offline Engine
            </a>
            <a 
              href="#demo" 
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-black/5"
            >
              3-Min Hackathon Demo
            </a>
          </nav>
          <div className="pt-3 border-t border-black/5 flex items-center justify-between">
            <button
              onClick={handleAudioGreet}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-charcoal-100 text-xs font-medium text-charcoal-700"
            >
              <Volume2 className="w-3.5 h-3.5 text-tea-700" />
              Test Voice Prompt
            </button>
            <a
              href="#demo"
              onClick={() => setMobileOpen(false)}
              className="px-4 py-2 rounded-full bg-tea-900 text-white text-xs font-semibold"
            >
              Live Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
