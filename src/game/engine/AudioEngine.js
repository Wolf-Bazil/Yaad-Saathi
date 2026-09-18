export default class AudioEngine {
  constructor() {
    this.context = null;
    this.masterGain = null;
    this.isInitialized = false;
    
    // Ambience state
    this.ambienceOscillators = [];
    this.ambienceDripInterval = null;
    
    // Heartbeat state
    this.heartbeatInterval = null;
    this.heartbeatGain = null;
  }

  init() {
    if (this.isInitialized) return;
    
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    
    this.context = new AudioContextClass();
    this.masterGain = this.context.createGain();
    this.masterGain.gain.value = 1.0;
    this.masterGain.connect(this.context.destination);
    
    this.isInitialized = true;
    
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  setMasterVolume(v) {
    if (this.masterGain && this.context) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, v)), this.context.currentTime);
    }
  }

  _createNoiseBuffer(durationSeconds) {
    if (!this.context) return null;
    const bufferSize = this.context.sampleRate * durationSeconds;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  playFootstep() {
    if (!this.isInitialized || !this.context) return;
    
    const duration = 0.06; // 60ms
    const noiseBuffer = this._createNoiseBuffer(duration);
    if (!noiseBuffer) return;
    
    const noiseSource = this.context.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.15, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
    
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    noiseSource.start();
  }

  playGunshot() {
    if (!this.isInitialized || !this.context) return;
    
    const duration = 0.102; // attack 2ms + decay 100ms
    const noiseBuffer = this._createNoiseBuffer(duration);
    if (!noiseBuffer) return;
    
    const noiseSource = this.context.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 2000;
    
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.01, this.context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.6, this.context.currentTime + 0.002);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.102);
    
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    noiseSource.start();
  }

  playEmptyClick() {
    if (!this.isInitialized || !this.context) return;
    
    const duration = 0.015; // 15ms
    
    const osc = this.context.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 2000;
    
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.context.currentTime + duration);
  }

  playScream() {
    if (!this.isInitialized || !this.context) return;
    
    const duration = 0.8;
    
    const osc = this.context.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.value = 80;
    
    // LFO for FM
    const lfo = this.context.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 3;
    
    const lfoGain = this.context.createGain();
    lfoGain.gain.value = 20; // depth of modulation
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.01, this.context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.4, this.context.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start();
    lfo.start();
    osc.stop(this.context.currentTime + duration);
    lfo.stop(this.context.currentTime + duration);
  }

  playDoorCreak() {
    if (!this.isInitialized || !this.context) return;
    
    const duration = 0.5;
    const noiseBuffer = this._createNoiseBuffer(duration);
    if (!noiseBuffer) return;
    
    const noiseSource = this.context.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    
    const filter = this.context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, this.context.currentTime);
    filter.frequency.linearRampToValueAtTime(1200, this.context.currentTime + duration);
    
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.1, this.context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.01, this.context.currentTime + duration);
    
    noiseSource.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    noiseSource.start();
  }

  playDrip() {
    if (!this.isInitialized || !this.context) return;
    
    const duration = 0.03;
    const osc = this.context.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 800 + Math.random() * 1200; // random 800-2000Hz
    
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.05, this.context.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.context.currentTime + duration);
  }

  startAmbience() {
    if (!this.isInitialized || !this.context) return;
    
    this.stopAmbience();
    
    const freqs = [120, 240];
    freqs.forEach(freq => {
      const osc = this.context.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const gainNode = this.context.createGain();
      gainNode.gain.value = 0.03;
      
      osc.connect(gainNode);
      gainNode.connect(this.masterGain);
      
      osc.start();
      this.ambienceOscillators.push({ osc, gainNode });
    });
    
    const scheduleNextDrip = () => {
      const delay = 4000 + Math.random() * 8000;
      this.ambienceDripInterval = setTimeout(() => {
        this.playDrip();
        scheduleNextDrip();
      }, delay);
    };
    
    scheduleNextDrip();
  }

  stopAmbience() {
    if (this.ambienceOscillators.length > 0) {
      this.ambienceOscillators.forEach(o => {
        o.osc.stop();
        o.osc.disconnect();
        o.gainNode.disconnect();
      });
      this.ambienceOscillators = [];
    }
    
    if (this.ambienceDripInterval) {
      clearTimeout(this.ambienceDripInterval);
      this.ambienceDripInterval = null;
    }
  }

  startHeartbeat(intensity) {
    if (!this.isInitialized || !this.context) return;
    
    this.stopHeartbeat();
    
    this.heartbeatGain = this.context.createGain();
    this.heartbeatGain.gain.value = Math.max(0, Math.min(1, intensity));
    this.heartbeatGain.connect(this.masterGain);
    
    const playPulse = () => {
      if (!this.heartbeatGain) return;
      
      const duration = 0.1;
      const osc = this.context.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 55;
      
      const gainNode = this.context.createGain();
      gainNode.gain.setValueAtTime(0.01, this.context.currentTime);
      gainNode.gain.linearRampToValueAtTime(1.0, this.context.currentTime + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + duration);
      
      osc.connect(gainNode);
      gainNode.connect(this.heartbeatGain);
      
      osc.start();
      osc.stop(this.context.currentTime + duration);
    };
    
    const scheduleHeartbeatCycle = () => {
      playPulse();
      setTimeout(playPulse, 120);
    };
    
    scheduleHeartbeatCycle();
    this.heartbeatInterval = setInterval(scheduleHeartbeatCycle, 800);
  }

  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    if (this.heartbeatGain) {
      this.heartbeatGain.disconnect();
      this.heartbeatGain = null;
    }
  }

  playFlickerPop() {
    if (!this.isInitialized || !this.context) return;
    
    const duration = 0.005; // 5ms
    const noiseBuffer = this._createNoiseBuffer(duration);
    if (!noiseBuffer) return;
    
    const noiseSource = this.context.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    
    const gainNode = this.context.createGain();
    gainNode.gain.setValueAtTime(0.02, this.context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime + duration);
    
    noiseSource.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    noiseSource.start();
  }

  dispose() {
    this.stopAmbience();
    this.stopHeartbeat();
    if (this.context) {
      this.context.close();
      this.context = null;
    }
    this.isInitialized = false;
  }
}
