// Web Audio API Synthesizer for web-shooting, clicks, pops, envelope effects, AND romantic background music melody

class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
    this.isMusicPlaying = false;
    this.musicTimer = null;
    this.currentChord = 0;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Web shooting sound effect (whiz / swoosh)
  playWebShoot() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch (e) {}
  }

  // Click pop sound
  playPop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }

  // Envelope rustle / open sound
  playEnvelopeOpen() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(200, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(450, this.ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.25);
    } catch (e) {}
  }

  // ROMANTIC BACKGROUND MUSIC SYNTHESIZER
  // Generates a sweet, gentle romantic lo-fi chord progression (Cmaj7 -> Am7 -> Dm7 -> G7)
  startRomanticMusic(onTickCallback) {
    this.init();
    if (!this.ctx) return;
    this.isMusicPlaying = true;

    // Chords (frequencies in Hz)
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [293.66, 349.23, 440.00, 523.25], // Dm7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];

    const playChordStep = () => {
      if (!this.isMusicPlaying || !this.ctx) return;

      const currentNotes = chords[this.currentChord % chords.length];
      const now = this.ctx.currentTime;

      // Play soft arpeggiated piano/synth notes for the current chord
      currentNotes.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.25);

        gain.gain.setValueAtTime(0.001, now + i * 0.25);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.25 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.25 + 1.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.25);
        osc.stop(now + i * 0.25 + 2.0);
      });

      if (onTickCallback) onTickCallback(this.currentChord);
      this.currentChord++;
      this.musicTimer = setTimeout(playChordStep, 2400);
    };

    playChordStep();
  }

  stopRomanticMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const sfx = new SoundEffects();
