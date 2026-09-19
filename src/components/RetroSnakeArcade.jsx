import React, { useEffect, useState, useRef } from 'react';
import { X, RotateCcw, Volume2, Gamepad2, Sparkles, Brain, Maximize2, Minimize2, Info, ChevronDown } from 'lucide-react';
import { sound } from '../lib/audio';

export default function RetroSnakeArcade({ isOpen, onClose }) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [gameKey, setGameKey] = useState(1);
  const [viewMode, setViewMode] = useState('console'); // 'console' | 'compact'
  const [showInfo, setShowInfo] = useState(false);
  const containerRef = useRef(null);

  // Load the standalone Retro Snake engine from public/games/snake.js
  useEffect(() => {
    if (!isOpen) return;

    if (window.SNK && typeof window.SNK.init === 'function') {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = '/games/snake.js';
    script.async = true;
    script.onload = () => {
      if (window.SNK && typeof window.SNK.init === 'function') {
        setScriptLoaded(true);
      } else {
        setLoadError(true);
      }
    };
    script.onerror = () => {
      setLoadError(true);
    };

    document.body.appendChild(script);

    return () => {
      // Keep script in document cache for fast reopening
    };
  }, [isOpen]);

  // Mount the snake game instance when script is ready and modal is open
  useEffect(() => {
    if (!isOpen || !scriptLoaded || loadError) return;

    const timer = setTimeout(() => {
      const mountId = `retro-snake-mount-${gameKey}`;
      const mountEl = document.getElementById(mountId);
      if (mountEl && window.SNK) {
        mountEl.innerHTML = '';
        try {
          window.SNK.init({
            selector: mountId,
            type: 'retro',
            theme: 'default',
            lang: 'en'
          });
        } catch (err) {
          console.error('Failed to initialize Retro Snake:', err);
        }
      }
    }, 60);

    return () => clearTimeout(timer);
  }, [isOpen, scriptLoaded, gameKey, loadError]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleRestart = () => {
    sound.playClick();
    setGameKey(k => k + 1);
  };

  const handleClose = () => {
    sound.playClick();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-charcoal-950/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0" onClick={handleClose} />

      {/* Main Console Box */}
      <div 
        ref={containerRef}
        className={`relative z-10 w-full ${
          viewMode === 'console' ? 'max-w-xl' : 'max-w-2xl'
        } retro-console-chassis rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/10 text-white flex flex-col max-h-[95vh] overflow-y-auto`}
        onClick={e => e.stopPropagation()}
      >
        {/* Console Top Hardware Bar */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="retro-led-power" title="System Powered On" />
            <div className="flex flex-col">
              <span className="font-mono font-black text-xs sm:text-sm tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
                <Gamepad2 className="w-4 h-4 text-emerald-400" />
                Retro Snake • 90s Arcade
              </span>
              <span className="text-[10px] font-mono text-zinc-400 tracking-tight">
                DOT-MATRIX 2-BIT • NOKIA / GAME BOY CLASSIC
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Info / Clinical Therapy Note */}
            <button
              onClick={() => {
                sound.playClick();
                setShowInfo(!showInfo);
              }}
              title="Cognitive Stimulation & Therapy Info"
              className={`p-1.5 rounded-lg border transition-all ${
                showInfo 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Brain className="w-4 h-4" />
            </button>

            {/* Restart Button */}
            <button
              onClick={handleRestart}
              title="Restart Game (F5/Reset)"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close Button */}
            <button
              onClick={handleClose}
              title="Close Arcade (ESC)"
              className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 hover:text-red-200 transition-all active:scale-95"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Clinical Info Drawer (Expandable) */}
        {showInfo && (
          <div className="mb-3 p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center gap-2 font-semibold text-emerald-300 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Clinical Cognitive Stimulation (CST) Impact</span>
            </div>
            <p className="text-emerald-100/90 text-[11px]">
              Retro Snake exercises <strong>spatial working memory</strong>, <strong>hand-eye motor coordination</strong>, and <strong>prefrontal planning</strong> in elderly seniors. The high-contrast green monochrome display mimics vintage tactile hardware, triggering comforting 1990s reminiscence without visual overwhelm.
            </p>
          </div>
        )}

        {/* Handheld Game Screen Outer Bezel */}
        <div className="retro-screen-bezel p-3 sm:p-5 flex flex-col items-center justify-center min-h-[380px] sm:min-h-[420px]">
          
          {/* Loading / Error States */}
          {!scriptLoaded && !loadError && (
            <div className="flex flex-col items-center justify-center gap-3 py-16 text-[#2b331a] font-mono">
              <div className="w-8 h-8 border-4 border-[#2b331a] border-t-transparent rounded-full animate-spin" />
              <span className="text-sm font-bold tracking-widest uppercase animate-pulse">
                INSERTING 90s CARTRIDGE...
              </span>
              <span className="text-[11px] opacity-75">Loading Retro Snake Engine</span>
            </div>
          )}

          {loadError && (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-[#2b331a] font-mono text-center">
              <span className="text-base font-bold">ERROR LOADING CARTRIDGE</span>
              <p className="text-xs max-w-xs">Could not initialize the retro game bundle.</p>
              <button
                onClick={handleRestart}
                className="mt-2 px-3 py-1.5 bg-[#2b331a] text-[#9bba5a] rounded font-bold text-xs"
              >
                RETRY
              </button>
            </div>
          )}

          {/* Standalone Retro Snake Game Mount Point */}
          <div 
            key={gameKey}
            id={`retro-snake-mount-${gameKey}`} 
            className="retro-arcade-shell w-full flex justify-center items-center"
          />

        </div>

        {/* Handheld Bottom Controls & Tactile Hardware Bevel */}
        <div className="mt-3 pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-400 font-mono text-[11px]">
          {/* Hardware Logo / Brand */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] uppercase font-bold text-zinc-300">
              YAADSAATHI RETRO
            </span>
            <span className="hidden sm:inline text-zinc-500">•</span>
            <span className="text-[10px] text-zinc-400 hidden sm:inline">
              Classic Stepped Engine (Speed 12)
            </span>
          </div>

          {/* Quick Input Help */}
          <div className="flex items-center gap-2 text-[10px]">
            <span className="text-zinc-500">CONTROLS:</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono">↑</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono">↓</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono">←</kbd>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono">→</kbd>
            <span className="text-zinc-500">OR</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-white font-mono">WASD</kbd>
          </div>
        </div>
      </div>
    </div>
  );
}
