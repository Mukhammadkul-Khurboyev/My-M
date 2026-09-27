import React, { useState } from 'react';
import { X, Search, Globe, ChevronRight } from 'lucide-react';
import { WorldCountryIndexItem } from '../data/countriesRegistry';

interface CountryListDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  countries: WorldCountryIndexItem[];
  onSelectCountry: (country: WorldCountryIndexItem) => void;
}

export const CountryListDrawer: React.FC<CountryListDrawerProps> = ({
  isOpen,
  onClose,
  countries,
  onSelectCountry,
}) => {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('ALL');

  if (!isOpen) return null;

  const continents = ['ALL', 'Osiyo', 'Yevropa', 'Afrika', 'Shimoliy Amerika', 'Janubiy Amerika', 'Okeaniya'];

  const filtered = countries.filter((c) => {
    if (selectedContinent !== 'ALL' && c.continent !== selectedContinent) {
      return false;
    }
    if (!filterQuery.trim()) return true;
    const q = filterQuery.toLowerCase().trim();
    return (
      c.nameUz.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.capitalUz.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  }).sort((a, b) => a.nameUz.localeCompare(b.nameUz));

  return (
    <div className="fixed inset-y-0 left-0 w-full sm:w-96 bg-slate-950/95 backdrop-blur-xl border-r border-slate-800 shadow-2xl z-50 flex flex-col animate-slideInLeft">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-emerald-400" />
          <h2 className="text-sm font-bold text-white tracking-tight">
            Davlatlar Katalogi ({filtered.length})
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Filter controls */}
      <div className="p-3 border-b border-slate-800 space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            placeholder="Davlat yoki poytaxt nomini yozing..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Continent pill tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 text-[11px] no-scrollbar">
          {continents.map((cont) => (
            <button
              key={cont}
              onClick={() => setSelectedContinent(cont)}
              className={`px-2.5 py-1 rounded-md whitespace-nowrap transition-colors ${
                selectedContinent === cont
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                  : 'text-slate-400 hover:text-white bg-slate-900/60'
              }`}
            >
              {cont === 'ALL' ? 'Barchasi' : cont}
            </button>
          ))}
        </div>
      </div>

      {/* Country items list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {filtered.map((country) => (
          <button
            key={country.id}
            onClick={() => {
              onSelectCountry(country);
              onClose();
            }}
            className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-900 text-left transition-colors group border border-transparent hover:border-slate-800"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl select-none">{country.flagEmoji}</span>
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                  {country.nameUz}
                </div>
                <div className="text-[11px] text-slate-400">
                  {country.capitalUz} · {country.continent}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded bg-slate-950">
                {country.id}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
