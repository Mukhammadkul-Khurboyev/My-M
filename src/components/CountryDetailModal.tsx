import React, { useState, useEffect } from 'react';
import { 
  X, 
  Globe2, 
  Users, 
  Maximize2, 
  Coins, 
  Languages, 
  Landmark, 
  Clock, 
  Phone, 
  Compass, 
  Mountain, 
  Sparkles, 
  UtensilsCrossed, 
  ExternalLink,
  Layers,
  ChevronRight,
  TrendingUp,
  MapPin,
  BookOpen
} from 'lucide-react';
import { CountryData } from '../types/country';
import { getFullCountryData, WorldCountryIndexItem } from '../data/countriesRegistry';

interface CountryDetailModalProps {
  countryItem: WorldCountryIndexItem | null;
  onClose: () => void;
  onSelectCountryById: (id: string) => void;
  onCompareCountry?: (country: CountryData) => void;
  onOpenPortal?: (country: CountryData) => void;
}

export const CountryDetailModal: React.FC<CountryDetailModalProps> = ({
  countryItem,
  onClose,
  onSelectCountryById,
  onCompareCountry,
  onOpenPortal,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'geography' | 'highlights' | 'facts'>('overview');
  const [currentTime, setCurrentTime] = useState<string>('');

  if (!countryItem) return null;

  const country: CountryData = getFullCountryData(countryItem.id, countryItem.nameEn);

  // Live ticking local clock calculation based on country's UTC offset
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const targetTime = new Date(utc + (3600000 * country.utcOffsetHours));
      
      const hours = targetTime.getHours().toString().padStart(2, '0');
      const minutes = targetTime.getMinutes().toString().padStart(2, '0');
      const seconds = targetTime.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [country.utcOffsetHours]);

  return (
    <div 
      className="fixed inset-y-0 right-0 w-full sm:w-[480px] md:w-[540px] bg-slate-950/95 backdrop-blur-xl border-l border-slate-800 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out"
      role="dialog"
      aria-modal="true"
      aria-label={`${country.nameUz} ma'lumotlari`}
    >
      {/* Header Banner */}
      <div className="relative p-6 border-b border-slate-800/80 bg-gradient-to-b from-slate-900/90 to-transparent">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400"
          aria-label="Yopish"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-start gap-4 pr-10">
          <div className="text-4xl sm:text-5xl filter drop-shadow-md select-none shrink-0">
            {country.flagEmoji}
          </div>
          <div>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span>{country.continent}</span>
              <span aria-hidden="true">·</span>
              <span>{country.subregionUz}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
              {country.nameUz}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
              {country.officialNameUz} ({country.nameEn})
            </p>
          </div>
        </div>

        {/* Action button bar */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-800/60">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Mahalliy vaqt:</span>
            <span className="font-mono tabular-nums text-white font-semibold">{currentTime}</span>
            <span className="text-[10px] text-slate-500">({country.timezones[0] || 'UTC'})</span>
          </div>

          {onCompareCountry && (
            <button
              onClick={() => onCompareCountry(country)}
              className="ml-auto text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-3 py-1 rounded-md border border-slate-700/60 transition-colors flex items-center gap-1.5"
            >
              <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
              <span>Solishtirish</span>
            </button>
          )}
        </div>

        {/* Primary CTA: Dedicated Country Website & Library */}
        {onOpenPortal && (
          <button
            onClick={() => onOpenPortal(country)}
            className="w-full mt-3 py-2 px-3 bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-sky-500/20 hover:from-amber-500/30 hover:to-sky-500/30 border border-amber-500/40 rounded-xl text-xs font-bold text-amber-300 hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Davlat Vebsayti va Badiiy Kutubxonaga O'tish →</span>
          </button>
        )}

        {/* Tab navigation */}
        <div className="flex items-center gap-1 mt-4 p-1 bg-slate-900/90 rounded-lg border border-slate-800 text-xs font-medium">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-colors ${
              activeTab === 'overview'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Umumiy
          </button>
          <button
            onClick={() => setActiveTab('geography')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-colors ${
              activeTab === 'geography'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Geografiya
          </button>
          <button
            onClick={() => setActiveTab('highlights')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-colors ${
              activeTab === 'highlights'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Meros & Joylar
          </button>
          <button
            onClick={() => setActiveTab('facts')}
            className={`flex-1 py-1.5 px-2 rounded-md transition-colors ${
              activeTab === 'facts'
                ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Qiziqarli Faktlar
          </button>
        </div>
      </div>

      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-slate-300">
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Landmark className="w-3.5 h-3.5 text-sky-400" />
                  <span>Poytaxti</span>
                </div>
                <div className="font-semibold text-white text-base">
                  {country.capitalUz}
                </div>
                <div className="text-[11px] text-slate-500">{country.capitalEn}</div>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Aholisi</span>
                </div>
                <div className="font-semibold text-white text-base font-mono tabular-nums">
                  {country.population ? country.population.toLocaleString('uz-UZ') : "Noma'lum"}
                </div>
                <div className="text-[11px] text-slate-500">kishi</div>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Umumiy maydoni</span>
                </div>
                <div className="font-semibold text-white text-base font-mono tabular-nums">
                  {country.areaKm2 ? country.areaKm2.toLocaleString('uz-UZ') : "Noma'lum"}
                </div>
                <div className="text-[11px] text-slate-500">km²</div>
              </div>

              <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800/80">
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                  <Coins className="w-3.5 h-3.5 text-violet-400" />
                  <span>Pul birligi</span>
                </div>
                <div className="font-semibold text-white text-base truncate">
                  {country.currency.nameUz}
                </div>
                <div className="text-[11px] text-slate-500">
                  {country.currency.code} ({country.currency.symbol})
                </div>
              </div>
            </div>

            {/* Encyclopedic Description */}
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Mamlakat haqida
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm bg-slate-900/40 p-4 rounded-xl border border-slate-800/60">
                {country.descriptionUz}
              </p>
            </div>

            {/* Political & State Details */}
            <div className="space-y-3 p-4 bg-slate-900/40 rounded-xl border border-slate-800/60">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
                Davlat tuzilishi va aloqa
              </h3>
              
              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Languages className="w-3.5 h-3.5 text-sky-400" /> Davlat tili:
                </span>
                <span className="font-medium text-slate-200">
                  {country.languagesUz.join(', ')}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-emerald-400" /> Boshqaruv shakli:
                </span>
                <span className="font-medium text-slate-200">
                  {country.governmentUz}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Yalpi Ichki Mahsulot (YAIM):
                </span>
                <span className="font-medium text-slate-200 font-mono tabular-nums">
                  {country.gdpNominal} (Jon boshiga: {country.gdpPerCapita})
                </span>
              </div>

              <div className="flex items-center justify-between text-xs py-1.5">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-violet-400" /> Xalqaro kodi & Domen:
                </span>
                <span className="font-mono text-slate-200">
                  {country.dialingCode} · {country.tld}
                </span>
              </div>
            </div>

            {/* National Dish & Symbol */}
            {(country.nationalDishUz || country.nationalSymbolUz) && (
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 mb-1">
                    <UtensilsCrossed className="w-3.5 h-3.5" />
                    <span>Milliy taomi</span>
                  </div>
                  <div className="text-xs text-slate-200 font-medium line-clamp-2">
                    {country.nationalDishUz || "An'anaviy taomlar"}
                  </div>
                </div>

                <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800/60">
                  <div className="flex items-center gap-1.5 text-xs text-sky-400 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Milliy ramzi</span>
                  </div>
                  <div className="text-xs text-slate-200 font-medium line-clamp-2">
                    {country.nationalSymbolUz || "Davlat gerbi va bayrog'i"}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: GEOGRAPHY */}
        {activeTab === 'geography' && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 space-y-4">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Geografik ko'rsatkichlar
              </h3>

              <div className="flex items-start gap-3 py-2 border-b border-slate-800/60">
                <Mountain className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Eng baland nuqtasi</div>
                  <div className="font-medium text-white text-sm">
                    {country.highestPoint.nameUz}
                  </div>
                  <div className="text-xs text-emerald-400 font-mono tabular-nums">
                    {country.highestPoint.elevationMeters.toLocaleString('uz-UZ')} metr
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2 border-b border-slate-800/60">
                <Compass className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Geografik koordinatalari</div>
                  <div className="font-mono text-slate-200 text-xs">
                    Kenglik: {country.lat.toFixed(4)}° · Uzunlik: {country.lng.toFixed(4)}°
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 py-2">
                <Layers className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-400">Iqlim sharoiti</div>
                  <div className="text-slate-300 text-xs leading-relaxed mt-0.5">
                    {country.climateUz}
                  </div>
                </div>
              </div>
            </div>

            {/* Bordering Countries */}
            <div className="space-y-3">
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Chegaradosh davlatlar ({country.borders.length})
              </h3>
              {country.borders.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {country.borders.map((neighborId) => (
                    <button
                      key={neighborId}
                      onClick={() => onSelectCountryById(neighborId)}
                      className="flex items-center justify-between p-2.5 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 rounded-lg text-left transition-all group"
                    >
                      <span className="text-xs font-medium text-slate-200 group-hover:text-emerald-400 transition-colors">
                        {neighborId}
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic p-3 bg-slate-900/30 rounded-lg border border-slate-800/40">
                  Ushbu davlat orol mamlakati hisoblanadi yoki to'g'ridan-to'g'ri quruqlik chegarasiga ega emas.
                </p>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: HIGHLIGHTS & LANDMARKS */}
        {activeTab === 'highlights' && (
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              Tarixiy va Tabiiy Diqqatga Sazovor Joylar
            </h3>

            {country.highlights && country.highlights.length > 0 ? (
              <div className="space-y-3">
                {country.highlights.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded text-emerald-300 bg-emerald-950/60 border border-emerald-800/40">
                        {h.type === 'unesco' ? "YuNESKO Merosi" : h.type === 'nature' ? 'Tabiat' : 'Tarix'}
                      </span>
                      <h4 className="text-sm font-bold text-white tracking-tight">
                        {h.name}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {h.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Ushbu hudud bo'yicha tarixiy meros ro'yxati shakllantirilmoqda.
              </p>
            )}
          </div>
        )}

        {/* TAB 4: INTERESTING FACTS */}
        {activeTab === 'facts' && (
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Hayratlanarli va Qiziqarli Faktlar
            </h3>

            {country.interestingFactsUz && country.interestingFactsUz.length > 0 ? (
              <div className="space-y-3">
                {country.interestingFactsUz.map((fact, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-slate-900/60 rounded-xl border border-slate-800/80"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {fact}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">
                Faktlar to'plami tayyorlanmoqda.
              </p>
            )}
          </div>
        )}
      </div>

      {/* Footer info bar */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
          ISO-3 kodi: <strong className="text-white font-mono">{country.id}</strong>
        </span>
        <button
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
        >
          Yopish
        </button>
      </div>
    </div>
  );
};
