// Atmospheric Sound Engine inspired by Radio Garden's tuning experience
// Uses Web Audio API without requiring external audio files

class RadioGardenAudio {
  constructor() {
    this.ctx = null;
    this.isEnabled = false;
    this.ambientOsc1 = null;
    this.ambientOsc2 = null;
    this.noiseNode = null;
    this.masterGain = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  toggleSound() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isEnabled = !this.isEnabled;

    if (this.isEnabled) {
      this.startAmbientDrone();
      this.playTuningSwoosh();
    } else {
      this.stopAmbientDrone();
    }

    return this.isEnabled;
  }

  playTuningSwoosh() {
    if (!this.ctx || !this.isEnabled) return;

    try {
      const now = this.ctx.currentTime;
      // High-tech frequency sweep (Radio Garden tuning chirp)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(560, now + 0.28);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.32);
    } catch {
      // Audio autoplay policy catch
    }
  }

  startAmbientDrone() {
    if (!this.ctx || !this.isEnabled || this.ambientOsc1) return;

    try {
      const now = this.ctx.currentTime;
      
      // Dual detuned sub-bass sine waves for cosmic space hum
      this.ambientOsc1 = this.ctx.createOscillator();
      this.ambientOsc2 = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();

      this.ambientOsc1.type = 'sine';
      this.ambientOsc1.frequency.setValueAtTime(65.4, now); // Low C

      this.ambientOsc2.type = 'triangle';
      this.ambientOsc2.frequency.setValueAtTime(65.8, now); // Detuned for organic chorus

      droneGain.gain.setValueAtTime(0.04, now);

      this.ambientOsc1.connect(droneGain);
      this.ambientOsc2.connect(droneGain);
      droneGain.connect(this.masterGain);

      this.ambientOsc1.start();
      this.ambientOsc2.start();
    } catch {
      // Ignore
    }
  }

  stopAmbientDrone() {
    if (this.ambientOsc1) {
      try {
        this.ambientOsc1.stop();
        this.ambientOsc1.disconnect();
      } catch {}
      this.ambientOsc1 = null;
    }
    if (this.ambientOsc2) {
      try {
        this.ambientOsc2.stop();
        this.ambientOsc2.disconnect();
      } catch {}
      this.ambientOsc2 = null;
    }
  }
}

export const soundEngine = new RadioGardenAudio();
