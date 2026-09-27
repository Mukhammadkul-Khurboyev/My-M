import React from 'react';
import { Compass, ListFilter, HelpCircle, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeContinent: string;
  onSelectContinent: (continent: string) => void;
  onRandomExplore: () => void;
  onOpenCountryList: () => void;
  onOpenQuiz: () => void;
}

const CONTINENTS = [
  { id: 'ALL', labelUz: 'Barchasi' },
  { id: 'Osiyo', labelUz: 'Osiyo' },
  { id: 'Yevropa', labelUz: 'Yevropa' },
  { id: 'Afrika', labelUz: 'Afrika' },
  { id: 'Shimoliy Amerika', labelUz: 'Shimoliy Amerika' },
  { id: 'Janubiy Amerika', labelUz: 'Janubiy Amerika' },
  { id: 'Okeaniya', labelUz: 'Okeaniya' },
];

export const Header: React.FC<HeaderProps> = ({
  activeContinent,
  onSelectContinent,
  onRandomExplore,
  onOpenCountryList,
  onOpenQuiz,
}) => {
  return (
    <header className="h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md z-30 shrink-0">
      {/* Zone 1: Brand title, single line text */}
      <div className="flex items-center gap-2">
        <span className="font-['Syne',sans-serif] text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
          <span className="text-xl">🌍</span>
          <span>Interaktiv Globus 3D</span>
        </span>
      </div>

      {/* Zone 2: Navigation / Continent Filter Tabs */}
      <nav className="hidden lg:flex items-center gap-1 p-1 bg-slate-900/80 border border-slate-800 rounded-lg">
        {CONTINENTS.map((item) => {
          const isActive = activeContinent === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectContinent(item.id)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {item.labelUz}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onRandomExplore}
          className="px-3 py-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/50 hover:bg-emerald-900/60 border border-emerald-800/50 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap active:scale-95"
          title="Yer yuzidagi ixtiyoriy davlatga parvoz qilish"
        >
          <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
          <span className="hidden sm:inline">Tasodifiy davlat</span>
          <span className="sm:hidden">Kashf et</span>
        </button>

        <button
          onClick={onOpenCountryList}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          title="Barcha davlatlar katalogi"
        >
          <ListFilter className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden md:inline">Davlatlar</span>
        </button>

        <button
          onClick={onOpenQuiz}
          className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          title="Geografik viktorina"
        >
          <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden md:inline">Viktorina</span>
        </button>
      </div>
    </header>
  );
};
