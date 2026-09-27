import React, { useState, useRef, useEffect } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { WorldCountryIndexItem } from '../data/countriesRegistry';

interface SearchBarProps {
  countries: WorldCountryIndexItem[];
  onSelectCountry: (country: WorldCountryIndexItem) => void;
  selectedContinent: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  countries,
  onSelectCountry,
  selectedContinent,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Filter countries
  const filtered = countries.filter((c) => {
    if (selectedContinent !== 'ALL' && c.continent !== selectedContinent) {
      return false;
    }
    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    return (
      c.nameUz.toLowerCase().includes(q) ||
      c.nameEn.toLowerCase().includes(q) ||
      c.capitalUz.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q)
    );
  }).slice(0, 8);

  const handleSelect = (country: WorldCountryIndexItem) => {
    onSelectCountry(country);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Davlat, poytaxt yoki kod bo'yicha qidirish..."
          className="w-full pl-10 pr-9 py-2 bg-slate-900/80 backdrop-blur-md border border-slate-800 focus:border-emerald-500 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all shadow-lg"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 p-0.5 rounded text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl max-h-72 overflow-y-auto z-50 p-1.5 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((country) => (
              <button
                key={country.id}
                onClick={() => handleSelect(country)}
                className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-800 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl shrink-0 select-none">{country.flagEmoji}</span>
                  <div>
                    <div className="text-xs font-semibold text-white group-hover:text-emerald-400 transition-colors">
                      {country.nameUz}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {country.capitalUz} · {country.continent}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded bg-slate-950">
                  {country.id}
                </span>
              </button>
            ))
          ) : (
            <div className="p-3 text-center text-xs text-slate-500">
              Hech qanday davlat topilmadi
            </div>
          )}
        </div>
      )}
    </div>
  );
};
