/**
 * Royal Wedding Audio Manager - Bollywood Wedding Song Edition
 * Plays "Din Shagna Da" (Bollywood Wedding Acoustic Instrumental)
 * with graceful volume fade, animated sound equalizer, and procedural flute backup.
 */

class RoyalAudioManager {
  constructor() {
    this.isPlaying = false;
    this.isMuted = false;
    this.audioElement = null;
    this.synthContext = null;
    this.synthInterval = null;

    // Primary: Original "Din Shagna Da" (Phillauri 320 Kbps)
    this.audioSources = [
      'assets/audio/din-shagna-da.mp3',
      'assets/audio/din-shagna-da.wav',
      'assets/audio/wedding-bgm.wav'
    ];

    this.toggleButton = document.getElementById('audio-toggle-btn');
    this.init();
  }

  init() {
    this.audioElement = new Audio();
    this.audioElement.loop = true;
    this.audioElement.volume = 0.75;
    this.audioElement.preload = 'auto';

    this.tryLoadSource(0);

    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }
  }

  tryLoadSource(index) {
    if (index >= this.audioSources.length) {
      console.log('Using procedural Web Audio Bollywood synthesizer.');
      return;
    }

    this.audioElement.src = this.audioSources[index];
    this.audioElement.onerror = () => {
      this.tryLoadSource(index + 1);
    };
  }

  startOnEnvelopeOpen() {
    if (this.isPlaying) return;
    this.play();
  }

  play() {
    if (this.isPlaying) return;

    if (this.audioElement && this.audioElement.src) {
      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.updateUI(true);
          })
          .catch((err) => {
            console.warn('Audio play request:', err);
            this.startProceduralFlute();
          });
      }
    } else {
      this.startProceduralFlute();
    }
  }

  pause() {
    this.isPlaying = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopProceduralFlute();
    this.updateUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  updateUI(playing) {
    if (!this.toggleButton) return;
    if (playing) {
      this.toggleButton.classList.add('is-playing');
      this.toggleButton.setAttribute('aria-label', 'Pause wedding song');
      document.body.classList.add('music-active');
    } else {
      this.toggleButton.classList.remove('is-playing');
      this.toggleButton.setAttribute('aria-label', 'Play wedding song');
      document.body.classList.remove('music-active');
    }
  }

  // Sweet Romantic Bollywood Flute Synthesizer (Offline Fallback)
  startProceduralFlute() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!this.synthContext) {
        this.synthContext = new AudioCtx();
      }
      if (this.synthContext.state === 'suspended') {
        this.synthContext.resume();
      }

      this.isPlaying = true;
      this.updateUI(true);

      const master = this.synthContext.createGain();
      master.gain.setValueAtTime(0.01, this.synthContext.currentTime);
      master.gain.exponentialRampToValueAtTime(0.35, this.synthContext.currentTime + 2);
      master.connect(this.synthContext.destination);

      // Notes of "Din Shagna Da" (G, A, C, B, A, G)
      const scale = [392.00, 440.00, 523.25, 493.88, 440.00, 392.00, 587.33, 523.25];
      let step = 0;

      this.synthInterval = setInterval(() => {
        if (!this.isPlaying || !this.synthContext) return;
        const freq = scale[step % scale.length];
        step++;

        const osc = this.synthContext.createOscillator();
        const g = this.synthContext.createGain();
        const filter = this.synthContext.createBiquadFilter();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.synthContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq + 1.5, this.synthContext.currentTime + 0.8);

        filter.type = 'lowpass';
        filter.frequency.value = 950;

        const now = this.synthContext.currentTime;
        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(0.15, now + 0.3);
        g.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

        osc.connect(filter);
        filter.connect(g);
        g.connect(master);

        osc.start(now);
        osc.stop(now + 1.9);
      }, 1200);

    } catch (e) {
      console.warn('Procedural synth error:', e);
    }
  }

  stopProceduralFlute() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.synthContext && this.synthContext.state !== 'closed') {
      this.synthContext.suspend();
    }
  }
}

window.RoyalAudioManager = RoyalAudioManager;
