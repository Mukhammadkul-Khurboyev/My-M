import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  X, 
  BookOpen, 
  Quote, 
  Sparkles, 
  Type, 
  Sun, 
  Moon,
  Headphones,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Music,
  CheckCircle2,
  ListMusic
} from 'lucide-react';
import { Book } from '../types/book';
import { UzbekAudioNarrator, NarratorState } from '../utils/audioNarrator';

interface BookReaderModalProps {
  book: Book | null;
  onClose: () => void;
  autoPlayAudio?: boolean;
}

export const BookReaderModal: React.FC<BookReaderModalProps> = ({ 
  book, 
  onClose,
  autoPlayAudio = false 
}) => {
  const [fontSize, setFontSize] = useState<number>(16);
  const [theme, setTheme] = useState<'dark' | 'sepia' | 'light'>('dark');
  const [isAudioSectionOpen, setIsAudioSectionOpen] = useState<boolean>(true);
  const [isAmbientActive, setIsAmbientActive] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const [narratorState, setNarratorState] = useState<NarratorState>({
    isPlaying: false,
    isPaused: false,
    currentSentenceIndex: 0,
    totalSentences: 0,
    progressPercent: 0,
    elapsedSeconds: 0,
    totalSeconds: 180,
    playbackRate: 1.0,
  });

  const narratorRef = useRef<UzbekAudioNarrator | null>(null);

  // Initialize narrator when book changes
  useEffect(() => {
    if (!book) return;

    const narrator = new UzbekAudioNarrator((state) => {
      setNarratorState(state);
    });
    narratorRef.current = narrator;
    narrator.setText(book.excerptUz, book.titleUz, book.authorUz);

    if (autoPlayAudio) {
      setTimeout(() => {
        narrator.play(0);
      }, 400);
    }

    return () => {
      narrator.destroy();
      narratorRef.current = null;
    };
  }, [book, autoPlayAudio]);

  // Split excerpt into sentences for interactive read-along text
  const sentences = useMemo(() => {
    if (!book?.excerptUz) return [];
    return book.excerptUz
      .replace(/([.?!…])\s+/g, '$1|')
      .split('|')
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }, [book?.excerptUz]);

  if (!book) return null;

  const handleTogglePlay = () => {
    if (!narratorRef.current) return;
    if (narratorState.isPlaying && !narratorState.isPaused) {
      narratorRef.current.pause();
    } else if (narratorState.isPaused) {
      narratorRef.current.resume();
    } else {
      narratorRef.current.play(narratorState.currentSentenceIndex);
    }
  };

  const handleSkip = (seconds: number) => {
    if (!narratorRef.current || narratorState.totalSentences === 0) return;
    // Step forward or backward in sentences
    const step = seconds > 0 ? 1 : -1;
    const nextIdx = Math.max(0, Math.min(narratorState.totalSentences - 1, narratorState.currentSentenceIndex + step));
    narratorRef.current.seekSentence(nextIdx);
  };

  const handleRateChange = (newRate: number) => {
    if (!narratorRef.current) return;
    narratorRef.current.setRate(newRate);
  };

  const handleToggleAmbient = () => {
    if (!narratorRef.current) return;
    const newState = narratorRef.current.toggleAmbientMusic();
    setIsAmbientActive(newState);
  };

  const handleVolumeToggle = () => {
    if (!narratorRef.current) return;
    if (isMuted) {
      narratorRef.current.setVolume(volume || 1.0);
      setIsMuted(false);
    } else {
      narratorRef.current.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleSentenceClick = (idx: number) => {
    if (!narratorRef.current) return;
    narratorRef.current.seekSentence(idx);
    if (!narratorState.isPlaying) {
      narratorRef.current.play(idx);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const themeClasses = {
    dark: 'bg-slate-950 text-slate-200 border-slate-800',
    sepia: 'bg-[#251e18] text-[#f4ecd8] border-[#42352b]',
    light: 'bg-[#faf8f5] text-slate-900 border-slate-300',
  };

  const quoteBgClasses = {
    dark: 'bg-slate-900/80 border-amber-500/40 text-amber-200/90',
    sepia: 'bg-[#1b1510] border-amber-600/40 text-[#f6d89b]',
    light: 'bg-amber-50/80 border-amber-400 text-amber-900',
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-5 animate-fadeIn">
      <div 
        className={`w-full max-w-3xl max-h-[94vh] rounded-2xl border shadow-2xl flex flex-col overflow-hidden transition-colors ${themeClasses[theme]}`}
      >
        {/* Top Control Bar */}
        <div className="p-3.5 sm:p-4 border-b border-inherit flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 truncate">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-amber-500" />
            </div>
            <div className="truncate">
              <h3 className="font-bold text-sm sm:text-base truncate leading-snug">
                {book.titleUz}
              </h3>
              <p className="text-xs opacity-75 truncate">{book.authorUz} ({book.publicationYear}-yil)</p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Audio Toggle Button */}
            <button
              onClick={() => setIsAudioSectionOpen(prev => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                isAudioSectionOpen 
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm' 
                  : 'border-inherit opacity-75 hover:opacity-100 hover:text-amber-400'
              }`}
              title="O'zbek tilida Audio Mutolaa paneli"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Audio Mutolaa</span>
            </button>

            {/* Theme Switcher */}
            <div className="flex items-center rounded-lg border border-inherit p-0.5 text-xs">
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded ${theme === 'dark' ? 'bg-slate-800 text-white' : 'opacity-60 hover:opacity-100'}`}
                title="Tungi rejim"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`px-2 py-1 rounded text-[11px] font-serif ${theme === 'sepia' ? 'bg-[#3d2f24] text-amber-200' : 'opacity-60 hover:opacity-100'}`}
                title="Sepia (Qog'oz) rejimi"
              >
                Sepia
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded ${theme === 'light' ? 'bg-slate-200 text-slate-900' : 'opacity-60 hover:opacity-100'}`}
                title="Kunduzgi rejim"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Font size */}
            <div className="hidden sm:flex items-center border border-inherit rounded-lg px-2 py-1 text-xs gap-1.5">
              <button
                onClick={() => setFontSize(prev => Math.max(14, prev - 2))}
                className="font-bold hover:text-amber-500 px-1"
                title="Kichikroq harf"
              >
                A-
              </button>
              <span className="font-mono text-[11px] opacity-75">{fontSize}</span>
              <button
                onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
                className="font-bold hover:text-amber-500 px-1"
                title="Kattaroq harf"
              >
                A+
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg border border-inherit hover:bg-black/10 transition-colors"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* INTEGRATED O'ZBEKCHA AUDIO MUTOLAA PLAYER BAR */}
        {isAudioSectionOpen && (
          <div className="bg-slate-900/95 border-b border-slate-800 p-3 sm:p-4 text-white font-sans shrink-0 animate-fadeIn">
            <div className="max-w-2xl mx-auto space-y-3">
              {/* Audio Header & Status */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${narratorState.isPlaying && !narratorState.isPaused ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span className="font-bold text-amber-400 flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5" />
                    O'zbek tilida Audio Mutolaa
                  </span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    · Suxandon ovozi (O'zbek tili)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Ambient Music Toggle */}
                  <button
                    onClick={handleToggleAmbient}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors border ${
                      isAmbientActive 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                        : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200'
                    }`}
                    title="Yumshoq fon musiqasini yoqish/o'chirish"
                  >
                    <Music className="w-3 h-3" />
                    <span>Fon ohangi</span>
                  </button>

                  {/* Volume Button */}
                  <button
                    onClick={handleVolumeToggle}
                    className="text-slate-400 hover:text-white p-1"
                    title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-500" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>
              </div>

              {/* Progress Slider Bar */}
              <div className="space-y-1">
                <div className="relative w-full h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
                  <div 
                    className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 to-emerald-400 transition-all duration-300 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, narratorState.progressPercent))}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>{formatTime(narratorState.elapsedSeconds)}</span>
                  <span className="text-slate-500">
                    Gap: {Math.min(narratorState.totalSentences, narratorState.currentSentenceIndex + 1)} / {narratorState.totalSentences}
                  </span>
                  <span>{formatTime(narratorState.totalSeconds)}</span>
                </div>
              </div>

              {/* Controls Toolbar: Rewind, Play/Pause, FastForward, Speed */}
              <div className="flex items-center justify-between pt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-400 mr-1">Tezlik:</span>
                  {[0.75, 1.0, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => handleRateChange(rate)}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold transition-colors ${
                        narratorState.playbackRate === rate
                          ? 'bg-amber-500 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleSkip(-1)}
                    className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Oldingi gapga qaytish"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleTogglePlay}
                    className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/25 transition-transform active:scale-95"
                    title={narratorState.isPlaying && !narratorState.isPaused ? "Pauza" : "Tinglashni boshlash"}
                  >
                    {narratorState.isPlaying && !narratorState.isPaused ? (
                      <Pause className="w-5 h-5 fill-current" />
                    ) : (
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    )}
                  </button>

                  <button
                    onClick={() => handleSkip(1)}
                    className="p-1.5 rounded-full hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                    title="Keyingi gapga o'tish"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[11px] text-emerald-400 font-medium hidden sm:block">
                  {narratorState.isPlaying && !narratorState.isPaused ? "Mutolaa qilinmoqda..." : "Tinglashga tayyor"}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Reading Content with Interactive Read-Along Highlighting */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Famous Quote Banner */}
          {book.famousQuoteUz && (
            <div className={`p-4 sm:p-5 rounded-xl border-l-4 shadow-sm flex items-start gap-3.5 ${quoteBgClasses[theme]}`}>
              <Quote className="w-6 h-6 shrink-0 mt-0.5 opacity-80" />
              <div>
                <p className="text-xs uppercase tracking-wider font-semibold opacity-75 mb-1 font-sans">
                  Mashhur iqtibos:
                </p>
                <blockquote className="italic font-serif text-sm sm:text-base leading-relaxed">
                  "{book.famousQuoteUz}"
                </blockquote>
              </div>
            </div>
          )}

          {/* Book Excerpt Text with Sentence Synchronized Highlighting */}
          <div className="space-y-4 font-serif leading-relaxed">
            <div className="flex items-center justify-between font-sans">
              <h4 className="text-xs uppercase tracking-widest opacity-60 font-semibold">
                Badiiy parchadan mutolaa:
              </h4>
              <span className="text-[11px] text-amber-500/80 font-medium">
                💡 Matndagi ixtiyoriy gap ustiga bosib, audio mutolaani o'sha yerdan boshlashingiz mumkin
              </span>
            </div>

            <div 
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.85 }}
              className="text-justify tracking-wide space-y-2 select-text"
            >
              {sentences.map((sentence, idx) => {
                const isActive = narratorState.isPlaying && narratorState.currentSentenceIndex === idx;
                return (
                  <span
                    key={idx}
                    onClick={() => handleSentenceClick(idx)}
                    className={`cursor-pointer transition-colors duration-200 rounded px-1 -mx-1 inline-block ${
                      isActive 
                        ? 'bg-amber-500/25 text-amber-300 font-medium ring-1 ring-amber-500/50 underline decoration-amber-400 decoration-2' 
                        : 'hover:bg-amber-500/10'
                    }`}
                    title="Shu gapdan audio mutolaa boshlash"
                  >
                    {sentence}{' '}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Literary Note */}
          <div className="p-4 rounded-xl border border-inherit opacity-85 text-xs space-y-1 bg-black/5 font-sans">
            <span className="font-bold text-amber-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Asarning jahon adabiyotidagi o'rni:
            </span>
            <p className="leading-relaxed">
              {book.literarySignificanceUz}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 border-t border-inherit flex items-center justify-between text-xs opacity-80 font-sans">
          <span>Hajmi: <strong>{book.pagesCount} bet</strong> · Janri: <strong>{book.genreUz}</strong></span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-400 font-bold border border-amber-500/30 flex items-center gap-1.5 transition-colors"
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>{narratorState.isPlaying && !narratorState.isPaused ? "Audio Pauza" : "Audio Tinglash"}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors"
            >
              Mutolaani yakunlash
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
