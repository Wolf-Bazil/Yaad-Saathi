/**
 * Web Audio API synthesizer for tactile, organic UI sound feedback.
 * Zero external audio assets required; synthesized in real time.
 */

class SoundSynthesizer {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setMuted(muted) {
    this.muted = muted;
  }

  /**
   * Crisp, soft tactile click (e.g. card selection or tab switch)
   */
  playClick() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(640, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch (e) {
      // Audio context might be restricted
    }
  }

  /**
   * Gentle harmonic chord for positive reinforcement
   */
  playHarmony() {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      // Warm pentatonic chord (F4, A4, C5)
      const freqs = [349.23, 440.00, 523.25];
      freqs.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.08, this.ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.05 + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.05);
        osc.stop(this.ctx.currentTime + idx * 0.05 + 0.45);
      });
    } catch (e) {
      // Audio context might be restricted
    }
  }

  /**
   * Spoken audio prompt via browser Web Speech API
   */
  speakPrompt(text, lang = 'hi-IN') {
    if (this.muted || typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.88; // Gentle, slower cadence for elderly clarity
      utterance.pitch = 1.05;
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      // Speech synthesis fallback
    }
  }
}

export const sound = new SoundSynthesizer();
