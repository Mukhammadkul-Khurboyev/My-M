/**
 * Uzbek Audio Mutolaa Engine
 * Integrates Web Speech API with sentence tracking and an ambient background sound synthesizer
 */

export interface NarratorState {
  isPlaying: boolean;
  isPaused: boolean;
  currentSentenceIndex: number;
  totalSentences: number;
  progressPercent: number;
  elapsedSeconds: number;
  totalSeconds: number;
  playbackRate: number;
}

export class UzbekAudioNarrator {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private sentences: string[] = [];
  private currentSentenceIdx = 0;
  private isPlaying = false;
  private isPaused = false;
  private rate = 1.0;
  private volume = 1.0;
  private onStateChange?: (state: NarratorState) => void;
  private progressTimer: any = null;
  private elapsedSeconds = 0;
  private estimatedTotalSeconds = 0;

  // Web Audio API ambient background music
  private audioCtx: AudioContext | null = null;
  private ambientGain: GainNode | null = null;
  private ambientOscillators: OscillatorNode[] = [];
  private isAmbientPlaying = false;

  constructor(onStateChange?: (state: NarratorState) => void) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
    this.onStateChange = onStateChange;
  }

  public setText(text: string, title?: string, author?: string) {
    this.stop();

    // Prepare full narration script in Uzbek
    let fullScript = '';
    if (title && author) {
      fullScript += `${title}. Muallif: ${author}. `;
    }
    fullScript += text;

    // Split text into natural sentences
    const rawSentences = fullScript
      .replace(/([.?!…])\s+/g, '$1|')
      .split('|')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    this.sentences = rawSentences.length > 0 ? rawSentences : [fullScript];
    this.currentSentenceIdx = 0;
    this.elapsedSeconds = 0;

    // Estimate ~130 words per minute in Uzbek narration
    const wordCount = fullScript.split(/\s+/).length;
    this.estimatedTotalSeconds = Math.max(30, Math.round((wordCount / 130) * 60));

    this.notifyState();
  }

  public getSentences(): string[] {
    return this.sentences;
  }

  public getCurrentIndex(): number {
    return this.currentSentenceIdx;
  }

  public setRate(newRate: number) {
    this.rate = Math.max(0.5, Math.min(2.0, newRate));
    if (this.isPlaying && !this.isPaused) {
      // Re-trigger current sentence with new rate
      this.playSentence(this.currentSentenceIdx);
    } else {
      this.notifyState();
    }
  }

  public setVolume(newVolume: number) {
    this.volume = Math.max(0, Math.min(1.0, newVolume));
    if (this.currentUtterance) {
      this.currentUtterance.volume = this.volume;
    }
    if (this.ambientGain) {
      this.ambientGain.gain.setValueAtTime(this.volume * 0.15, this.audioCtx?.currentTime || 0);
    }
  }

  public play(fromSentenceIndex = 0) {
    if (!this.synth || this.sentences.length === 0) return;

    if (this.isPaused && this.currentSentenceIdx === fromSentenceIndex) {
      this.synth.resume();
      this.isPaused = false;
      this.isPlaying = true;
      this.startTimer();
      this.notifyState();
      return;
    }

    this.isPlaying = true;
    this.isPaused = false;
    this.currentSentenceIdx = Math.max(0, Math.min(this.sentences.length - 1, fromSentenceIndex));
    this.playSentence(this.currentSentenceIdx);
    this.startTimer();
  }

  public pause() {
    if (!this.synth) return;
    this.synth.pause();
    this.isPaused = true;
    this.stopTimer();
    this.notifyState();
  }

  public resume() {
    if (!this.synth) return;
    if (this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
      this.startTimer();
      this.notifyState();
    } else if (!this.isPlaying) {
      this.play(this.currentSentenceIdx);
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    this.currentSentenceIdx = 0;
    this.elapsedSeconds = 0;
    this.stopTimer();
    this.notifyState();
  }

  public seekSentence(index: number) {
    const validIdx = Math.max(0, Math.min(this.sentences.length - 1, index));
    this.currentSentenceIdx = validIdx;
    this.elapsedSeconds = Math.round((validIdx / Math.max(1, this.sentences.length)) * this.estimatedTotalSeconds);

    if (this.isPlaying) {
      this.playSentence(validIdx);
    } else {
      this.notifyState();
    }
  }

  private playSentence(index: number) {
    if (!this.synth || index >= this.sentences.length) {
      this.stop();
      return;
    }

    this.synth.cancel();

    const sentence = this.sentences[index];
    const utterance = new SpeechSynthesisUtterance(sentence);
    utterance.rate = this.rate;
    utterance.volume = this.volume;
    utterance.pitch = 1.0;

    // Choose voice: prefer Uzbek if installed, else fallback to best natural voice
    const voices = this.synth.getVoices();
    const uzVoice = voices.find(v => v.lang.startsWith('uz') || v.lang.includes('UZ'));
    const trVoice = voices.find(v => v.lang.startsWith('tr') || v.lang.includes('TR'));
    const ruVoice = voices.find(v => v.lang.startsWith('ru') || v.lang.includes('RU'));

    if (uzVoice) {
      utterance.voice = uzVoice;
      utterance.lang = 'uz-UZ';
    } else if (trVoice) {
      utterance.voice = trVoice;
      utterance.lang = 'tr-TR';
    } else if (ruVoice) {
      utterance.lang = 'ru-RU';
    }

    utterance.onend = () => {
      if (!this.isPlaying || this.isPaused) return;
      if (this.currentSentenceIdx < this.sentences.length - 1) {
        this.currentSentenceIdx++;
        this.playSentence(this.currentSentenceIdx);
      } else {
        this.stop();
      }
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      if (this.isPlaying && this.currentSentenceIdx < this.sentences.length - 1) {
        this.currentSentenceIdx++;
        this.playSentence(this.currentSentenceIdx);
      } else {
        this.stop();
      }
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
    this.notifyState();
  }

  private startTimer() {
    this.stopTimer();
    this.progressTimer = setInterval(() => {
      if (this.isPlaying && !this.isPaused) {
        this.elapsedSeconds += 1;
        if (this.elapsedSeconds > this.estimatedTotalSeconds) {
          this.estimatedTotalSeconds = this.elapsedSeconds + 15;
        }
        this.notifyState();
      }
    }, 1000);
  }

  private stopTimer() {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  private notifyState() {
    if (!this.onStateChange) return;
    const progress = this.sentences.length > 0 
      ? (this.currentSentenceIdx / this.sentences.length) * 100 
      : 0;

    this.onStateChange({
      isPlaying: this.isPlaying,
      isPaused: this.isPaused,
      currentSentenceIndex: this.currentSentenceIdx,
      totalSentences: this.sentences.length,
      progressPercent: progress,
      elapsedSeconds: this.elapsedSeconds,
      totalSeconds: Math.max(this.elapsedSeconds, this.estimatedTotalSeconds),
      playbackRate: this.rate,
    });
  }

  // Soothing Ambient Audio Accompaniment (Web Audio API)
  public toggleAmbientMusic(enable?: boolean): boolean {
    const shouldEnable = enable !== undefined ? enable : !this.isAmbientPlaying;
    if (shouldEnable) {
      this.startAmbientMusic();
    } else {
      this.stopAmbientMusic();
    }
    return this.isAmbientPlaying;
  }

  public isAmbientActive(): boolean {
    return this.isAmbientPlaying;
  }

  private startAmbientMusic() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      this.stopAmbientMusic();

      const gain = this.audioCtx.createGain();
      gain.gain.setValueAtTime(0.01, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08 * this.volume, this.audioCtx.currentTime + 3);
      gain.connect(this.audioCtx.destination);
      this.ambientGain = gain;

      // Gentle meditative chord notes (C, G, E, B in soft sinusoidal drones)
      const freqs = [130.81, 196.00, 261.63, 329.63];
      this.ambientOscillators = freqs.map((freq, i) => {
        const osc = this.audioCtx!.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx!.currentTime);

        // Subtle slow frequency modulation (chorus vibe)
        const lfo = this.audioCtx!.createOscillator();
        const lfoGain = this.audioCtx!.createGain();
        lfo.frequency.setValueAtTime(0.2 + i * 0.1, this.audioCtx!.currentTime);
        lfoGain.gain.setValueAtTime(0.8, this.audioCtx!.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(gain);
        osc.start();
        return osc;
      });

      this.isAmbientPlaying = true;
    } catch (err) {
      console.warn('Failed to start ambient audio:', err);
    }
  }

  private stopAmbientMusic() {
    if (this.ambientGain && this.audioCtx) {
      try {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 1);
        setTimeout(() => {
          this.ambientOscillators.forEach(osc => {
            try { osc.stop(); osc.disconnect(); } catch {}
          });
          this.ambientOscillators = [];
        }, 1100);
      } catch {
        this.ambientOscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch {}
        });
        this.ambientOscillators = [];
      }
    }
    this.isAmbientPlaying = false;
  }

  public destroy() {
    this.stop();
    this.stopAmbientMusic();
    if (this.audioCtx && this.audioCtx.state !== 'closed') {
      try { this.audioCtx.close(); } catch {}
    }
  }
}
