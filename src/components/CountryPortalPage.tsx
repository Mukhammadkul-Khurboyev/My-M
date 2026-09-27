import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Landmark, 
  Users, 
  Maximize2, 
  Coins, 
  Clock, 
  MapPin, 
  Sparkles, 
  Mountain, 
  Compass, 
  Share2, 
  Languages, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Award,
  Feather,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Film,
  Headphones
} from 'lucide-react';
import { CountryData } from '../types/country';
import { Book } from '../types/book';
import { getCountryBooks } from '../data/countryBooks';
import { getCountryNatureMedia } from '../data/countryVideos';
import { BookReaderModal } from './BookReaderModal';

interface CountryPortalPageProps {
  country: CountryData;
  onBackToGlobe: () => void;
  onSelectNeighbor: (neighborId: string) => void;
}

export const CountryPortalPage: React.FC<CountryPortalPageProps> = ({
  country,
  onBackToGlobe,
  onSelectNeighbor,
}) => {
  const [selectedBookForReading, setSelectedBookForReading] = useState<Book | null>(null);
  const [startWithAudio, setStartWithAudio] = useState<boolean>(false);
  const [activeGenreFilter, setActiveGenreFilter] = useState<string>('ALL');

  // Video playback controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { books, authors } = getCountryBooks(country.id, country.nameUz);
  const natureMedia = getCountryNatureMedia(country.id, country.continent);

  // Play/pause handler
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may require user interaction on some mobile browsers
        setIsPlaying(false);
      });
    }
  }, [country.id]);

  // Filter books by genre
  const filteredBooks = books.filter((b) => {
    if (activeGenreFilter === 'ALL') return true;
    return b.genreUz.toLowerCase().includes(activeGenreFilter.toLowerCase());
  });

  const genres = ['ALL', 'Roman', 'Qissa', 'Tarixiy', 'Doston', 'Klassik'];

  return (
    <div className="fixed inset-0 bg-[#030712] text-slate-100 z-50 flex flex-col overflow-y-auto font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Fixed Navigation Bar */}
      <header className="sticky top-0 z-40 h-16 px-4 sm:px-8 bg-slate-950/85 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between">
        <button
          onClick={onBackToGlobe}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>3D Globusga qaytish</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-2xl select-none">{country.flagEmoji}</span>
          <span className="font-bold text-sm sm:text-base tracking-tight text-white hidden sm:inline">
            {country.nameUz} Portali
          </span>
        </div>

        {/* Anchor shortcuts */}
        <nav className="hidden md:flex items-center gap-4 text-xs font-medium text-slate-400">
          <a href="#overview" className="hover:text-emerald-400 transition-colors">
            Umumiy ma'lumotlar
          </a>
          <a href="#library" className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Badiiy Kutubxona ({books.length})</span>
          </a>
          <a href="#authors" className="hover:text-emerald-400 transition-colors">
            Adiblar
          </a>
          <a href="#landmarks" className="hover:text-emerald-400 transition-colors">
            Meros
          </a>
        </nav>
      </header>

      {/* Hero Section with Authentic Country Nature Video Backdrop */}
      <section className="relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center p-6 sm:p-12 overflow-hidden border-b border-slate-800">
        {/* Background Nature Video Stream */}
        <video
          ref={videoRef}
          key={natureMedia.videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster={natureMedia.posterUrl}
          onLoadedData={() => setVideoLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.42] contrast-[1.1] scale-105 transition-opacity duration-1000"
        >
          <source src={natureMedia.videoUrl} type="video/webm" />
          {natureMedia.fallbackVideoUrl && (
            <source src={natureMedia.fallbackVideoUrl} type="video/webm" />
          )}
        </video>

        {/* Cinematic Gradient Overlays for Readability & High-End Aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/55 to-[#030712]/35 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#030712]/35 to-[#030712]/80 pointer-events-none" />

        {/* Nature Video Location Badge & Playback HUD */}
        <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 z-20 flex items-center gap-2 p-1.5 rounded-xl bg-slate-950/85 backdrop-blur-xl border border-slate-800/80 shadow-2xl text-xs text-slate-300">
          <div className="flex items-center gap-1.5 px-2.5">
            <Film className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">{natureMedia.landscapeTitle}</span>
            <span className="text-slate-500 hidden lg:inline">({natureMedia.landscapeLocation})</span>
          </div>

          <div className="flex items-center gap-1 border-l border-slate-800 pl-2">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title={isPlaying ? "Videoni to'xtatish" : "Videoni ijro etish"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title={isMuted ? "Ovozni yoqish" : "Ovozni o'chirish"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl w-full mx-auto text-center space-y-4 pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-emerald-400 text-xs font-semibold">
            <span>{country.continent}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{country.subregionUz}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="font-mono text-slate-300">ISO: {country.id}</span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-6xl sm:text-7xl filter drop-shadow-2xl mb-2 select-none">
              {country.flagEmoji}
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-['Syne',sans-serif] drop-shadow-lg">
              {country.nameUz}
            </h1>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mt-2 font-medium drop-shadow">
              {country.officialNameUz}
            </p>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mx-auto leading-relaxed text-balance pt-2 drop-shadow">
            {country.descriptionUz}
          </p>

          <div className="flex items-center justify-center gap-3 pt-4">
            <a
              href="#library"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>Badiiy Kitoblar Kutubxonasi</span>
            </a>
            <a
              href="#overview"
              className="px-5 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm transition-colors active:scale-95"
            >
              Davlat Ma'lumotlari
            </a>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 py-10 space-y-16">
        {/* SECTION 1: ASOSIY MA'LUMOTLAR GRID */}
        <section id="overview" className="space-y-6">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Landmark className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Asosiy Davlat Ko'rsatkichlari
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono">Rasmiy dosye</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Landmark className="w-4 h-4 text-sky-400" />
                <span>Poytaxti</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white">
                {country.capitalUz}
              </div>
              <div className="text-xs text-slate-500">{country.capitalEn}</div>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>Aholi soni</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-mono tabular-nums">
                {country.population ? country.population.toLocaleString('uz-UZ') : "Noma'lum"}
              </div>
              <div className="text-xs text-slate-500">kishi</div>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Maximize2 className="w-4 h-4 text-amber-400" />
                <span>Umumiy maydoni</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white font-mono tabular-nums">
                {country.areaKm2 ? country.areaKm2.toLocaleString('uz-UZ') : "Noma'lum"}
              </div>
              <div className="text-xs text-slate-500">kvadrat kilometr</div>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                <Coins className="w-4 h-4 text-violet-400" />
                <span>Pul birligi</span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white truncate">
                {country.currency.nameUz}
              </div>
              <div className="text-xs text-slate-500">{country.currency.code} ({country.currency.symbol})</div>
            </div>
          </div>

          {/* Secondary Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Siyosiy tuzilishi
              </span>
              <div className="text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Boshqaruv shakli:</span>
                  <span className="font-medium text-slate-200 text-right">{country.governmentUz}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Davlat tili:</span>
                  <span className="font-medium text-slate-200">{country.languagesUz.join(', ')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Aloqa:</span>
                  <span className="font-mono text-slate-200">{country.dialingCode} · {country.tld}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Iqtisodiy quvvati (YAIM)
              </span>
              <div className="text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Nominal YAIM:</span>
                  <span className="font-bold text-emerald-400 font-mono">{country.gdpNominal}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Aholi jon boshiga:</span>
                  <span className="font-medium text-slate-200 font-mono">{country.gdpPerCapita}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Vaqt mintaqasi:</span>
                  <span className="font-medium text-slate-200">{country.timezones.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 space-y-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Tabiat va Geografiya
              </span>
              <div className="text-xs space-y-2">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">Eng baland cho'qqi:</span>
                  <span className="font-medium text-slate-200 text-right">{country.highestPoint.nameUz} ({country.highestPoint.elevationMeters} m)</span>
                </div>
                <div className="py-1">
                  <span className="text-slate-400 block mb-0.5">Iqlimi:</span>
                  <span className="text-slate-300 leading-relaxed">{country.climateUz}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bordering Countries Links */}
          {country.borders.length > 0 && (
            <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 space-y-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Chegaradosh davlatlar ({country.borders.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {country.borders.map((neighborId) => (
                  <button
                    key={neighborId}
                    onClick={() => onSelectNeighbor(neighborId)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs font-medium text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-1"
                  >
                    <span>{neighborId}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* SECTION 2: BADIIY ADABIYOT KUTUBXONASI (THE USER'S PRIMARY REQUEST) */}
        <section id="library" className="space-y-6 pt-6 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Kitobxonlar uchun maxsus bo'lim</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1 font-['Syne',sans-serif]">
                {country.nameUz} Badiiy Kitoblar Kutubxonasi
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Ushbu davlat adiblari tomonidan yozilgan jahonga mashhur mumtoz va zamonaviy adabiy durdonalar
              </p>
            </div>

            {/* Genre Filter Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-slate-900 rounded-lg border border-slate-800 text-xs shrink-0">
              {genres.map((g) => (
                <button
                  key={g}
                  onClick={() => setActiveGenreFilter(g)}
                  className={`px-3 py-1 rounded-md transition-colors whitespace-nowrap font-medium ${
                    activeGenreFilter === g
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {g === 'ALL' ? 'Barchasi' : g}
                </button>
              ))}
            </div>
          </div>

          {/* Book Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                className="group flex flex-col bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Book Cover Area */}
                <div 
                  className="relative h-56 p-6 flex flex-col justify-between overflow-hidden text-white"
                  style={{ background: book.coverImage }}
                >
                  <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px]" />
                  <div className="absolute left-0 top-0 bottom-0 w-3 bg-white/10 border-r border-black/30" />

                  <div className="relative z-10 flex items-start justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/20">
                      {book.genreUz}
                    </span>
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-full">
                      ★ {book.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="relative z-10 space-y-1">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
                      {book.titleUz}
                    </h3>
                    <p className="text-xs text-amber-200/90 font-medium">
                      {book.authorUz} · {book.publicationYear}-yil
                    </p>
                  </div>
                </div>

                {/* Book Details Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="text-[11px] text-slate-500 font-mono">
                      Asl nomi: <span className="text-slate-300 italic">{book.titleOriginal}</span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {book.synopsisUz}
                    </p>

                    {book.famousQuoteUz && (
                      <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-amber-300/90 italic font-serif line-clamp-2">
                        "{book.famousQuoteUz}"
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {book.pagesCount} bet
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setSelectedBookForReading(book);
                          setStartWithAudio(true);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 font-bold text-xs border border-emerald-500/40 hover:border-emerald-500 transition-colors flex items-center gap-1 active:scale-95"
                        title="O'zbek tilida audio mutolaa qilish"
                      >
                        <Headphones className="w-3.5 h-3.5" />
                        <span>Audio tinglash</span>
                      </button>

                      <button
                        onClick={() => {
                          setSelectedBookForReading(book);
                          setStartWithAudio(false);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 font-bold text-xs border border-amber-500/40 hover:border-amber-500 transition-colors flex items-center gap-1 active:scale-95"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>O'qish</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: MASHHUR ADIBLAR VA IJODKORLAR */}
        {authors.length > 0 && (
          <section id="authors" className="space-y-6 pt-6 border-t border-slate-800">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <Feather className="w-5 h-5 text-sky-400" />
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Mashhur Adiblar va Mutafakkirlar
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {country.nameUz} adabiy merosini dunyoga tanitgan buyuk siymolar
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {authors.map((author, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-bold text-amber-400 shrink-0">
                    {author.nameUz.slice(0, 1)}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-base">
                        {author.nameUz}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-mono">
                        ({author.years})
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {author.bioUz}
                    </p>
                    {author.notableAwards && author.notableAwards.length > 0 && (
                      <div className="flex items-center gap-1.5 pt-1 text-[11px] text-emerald-400 font-medium">
                        <Award className="w-3.5 h-3.5" />
                        <span>{author.notableAwards.join(' · ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 4: DIQQATGA SAZOVOR JOYLAR */}
        {country.highlights && country.highlights.length > 0 && (
          <section id="landmarks" className="space-y-6 pt-6 border-t border-slate-800 pb-12">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-3">
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Tarixiy va Diqqatga Sazovor Joylar
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {country.highlights.map((h, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 space-y-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-400">
                      {h.type === 'unesco' ? 'YuNESKO Merosi' : h.type === 'nature' ? 'Tabiat mo\'jizasi' : 'Tarixiy obida'}
                    </span>
                    <h3 className="text-sm font-bold text-white">
                      {h.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {h.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Book Reader Modal */}
      <BookReaderModal
        book={selectedBookForReading}
        autoPlayAudio={startWithAudio}
        onClose={() => setSelectedBookForReading(null)}
      />
    </div>
  );
};
