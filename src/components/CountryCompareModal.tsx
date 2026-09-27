import React, { useState } from 'react';
import { X, ArrowRightLeft, Users, Maximize2, TrendingUp, Landmark, Coins, Mountain } from 'lucide-react';
import { CountryData } from '../types/country';
import { WorldCountryIndexItem, getFullCountryData } from '../data/countriesRegistry';

interface CountryCompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCountry: CountryData | null;
  allCountries: WorldCountryIndexItem[];
  onFlyToCountry: (country: WorldCountryIndexItem) => void;
}

export const CountryCompareModal: React.FC<CountryCompareModalProps> = ({
  isOpen,
  onClose,
  initialCountry,
  allCountries,
  onFlyToCountry,
}) => {
  const [countryAId, setCountryAId] = useState<string>(initialCountry?.id || 'UZB');
  const [countryBId, setCountryBId] = useState<string>('USA');

  if (!isOpen) return null;

  const countryA = getFullCountryData(countryAId);
  const countryB = getFullCountryData(countryBId);

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowRightLeft className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Davlatlarni O'zaro Taqqoslash
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Country Selectors */}
        <div className="grid grid-cols-2 gap-4 p-5 bg-slate-950/50 border-b border-slate-800">
          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">1-Davlat:</label>
            <select
              value={countryAId}
              onChange={(e) => setCountryAId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {allCountries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flagEmoji} {c.nameUz} ({c.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-slate-400 mb-1.5 font-medium">2-Davlat:</label>
            <select
              value={countryBId}
              onChange={(e) => setCountryBId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-emerald-500"
            >
              {allCountries.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.flagEmoji} {c.nameUz} ({c.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Top Country Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-center">
              <span className="text-4xl">{countryA.flagEmoji}</span>
              <h3 className="text-lg font-bold text-white mt-2">{countryA.nameUz}</h3>
              <p className="text-xs text-emerald-400">{countryA.capitalUz}</p>
            </div>

            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-center">
              <span className="text-4xl">{countryB.flagEmoji}</span>
              <h3 className="text-lg font-bold text-white mt-2">{countryB.nameUz}</h3>
              <p className="text-xs text-sky-400">{countryB.capitalUz}</p>
            </div>
          </div>

          {/* Rows */}
          <div className="space-y-2 text-xs">
            {/* Population */}
            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <div className="text-center text-slate-400 font-medium mb-1 flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-emerald-400" /> Aholi soni
              </div>
              <div className="grid grid-cols-2 gap-4 text-center font-mono tabular-nums text-sm font-semibold text-white">
                <div>{countryA.population?.toLocaleString('uz-UZ')} kishi</div>
                <div>{countryB.population?.toLocaleString('uz-UZ')} kishi</div>
              </div>
            </div>

            {/* Area */}
            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <div className="text-center text-slate-400 font-medium mb-1 flex items-center justify-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-amber-400" /> Umumiy maydoni
              </div>
              <div className="grid grid-cols-2 gap-4 text-center font-mono tabular-nums text-sm font-semibold text-white">
                <div>{countryA.areaKm2?.toLocaleString('uz-UZ')} km²</div>
                <div>{countryB.areaKm2?.toLocaleString('uz-UZ')} km²</div>
              </div>
            </div>

            {/* GDP */}
            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <div className="text-center text-slate-400 font-medium mb-1 flex items-center justify-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-sky-400" /> Yalpi Ichki Mahsulot (YAIM)
              </div>
              <div className="grid grid-cols-2 gap-4 text-center font-semibold text-white">
                <div>{countryA.gdpNominal}</div>
                <div>{countryB.gdpNominal}</div>
              </div>
            </div>

            {/* Currency */}
            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <div className="text-center text-slate-400 font-medium mb-1 flex items-center justify-center gap-1">
                <Coins className="w-3.5 h-3.5 text-violet-400" /> Pul birligi
              </div>
              <div className="grid grid-cols-2 gap-4 text-center text-white">
                <div>{countryA.currency.nameUz} ({countryA.currency.symbol})</div>
                <div>{countryB.currency.nameUz} ({countryB.currency.symbol})</div>
              </div>
            </div>

            {/* Highest point */}
            <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-800/60">
              <div className="text-center text-slate-400 font-medium mb-1 flex items-center justify-center gap-1">
                <Mountain className="w-3.5 h-3.5 text-emerald-400" /> Eng baland cho'qqisi
              </div>
              <div className="grid grid-cols-2 gap-4 text-center text-white">
                <div>{countryA.highestPoint.nameUz} ({countryA.highestPoint.elevationMeters} m)</div>
                <div>{countryB.highestPoint.nameUz} ({countryB.highestPoint.elevationMeters} m)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <button
            onClick={() => {
              const found = allCountries.find(c => c.id === countryA.id);
              if (found) {
                onFlyToCountry(found);
                onClose();
              }
            }}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium"
          >
            ← {countryA.nameUz} ga uchish
          </button>
          <button
            onClick={() => {
              const found = allCountries.find(c => c.id === countryB.id);
              if (found) {
                onFlyToCountry(found);
                onClose();
              }
            }}
            className="text-xs text-sky-400 hover:text-sky-300 font-medium"
          >
            {countryB.nameUz} ga uchish →
          </button>
        </div>
      </div>
    </div>
  );
};
