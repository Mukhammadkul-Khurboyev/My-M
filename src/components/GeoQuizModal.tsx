import React, { useState, useEffect } from 'react';
import { X, Award, HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { WorldCountryIndexItem, getFullCountryData } from '../data/countriesRegistry';
import { COUNTRIES_DATA } from '../data/countriesData';

interface GeoQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  allCountries: WorldCountryIndexItem[];
  onFlyToCountry: (country: WorldCountryIndexItem) => void;
}

interface Question {
  type: 'flag' | 'capital' | 'fact';
  prompt: string;
  clue: string;
  correctCountry: WorldCountryIndexItem;
  options: WorldCountryIndexItem[];
}

export const GeoQuizModal: React.FC<GeoQuizModalProps> = ({
  isOpen,
  onClose,
  allCountries,
  onFlyToCountry,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);

  // Generate question
  const generateQuestion = () => {
    if (allCountries.length < 4) return;

    // Pick from curated countries for highest quality
    const curatedKeys = Object.keys(COUNTRIES_DATA);
    const targetKey = curatedKeys[Math.floor(Math.random() * curatedKeys.length)];
    const fullCountry = COUNTRIES_DATA[targetKey];
    const targetItem = allCountries.find(c => c.id === targetKey) || {
      id: fullCountry.id,
      iso2: fullCountry.iso2,
      nameUz: fullCountry.nameUz,
      nameEn: fullCountry.nameEn,
      capitalUz: fullCountry.capitalUz,
      continent: fullCountry.continent,
      lat: fullCountry.lat,
      lng: fullCountry.lng,
      flagEmoji: fullCountry.flagEmoji,
    };

    // Pick 3 wrong options
    const others = allCountries.filter(c => c.id !== targetItem.id);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const options = [targetItem, ...shuffledOthers].sort(() => 0.5 - Math.random());

    const questionTypes: ('flag' | 'capital' | 'fact')[] = ['flag', 'capital', 'fact'];
    const chosenType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    let prompt = '';
    let clue = '';

    if (chosenType === 'flag') {
      prompt = "Ushbu bayroq qaysi davlatga tegishli?";
      clue = fullCountry.flagEmoji;
    } else if (chosenType === 'capital') {
      prompt = `Poytaxti "${fullCountry.capitalUz}" bo'lgan davlat qaysi?`;
      clue = `🏛️ ${fullCountry.capitalUz}`;
    } else {
      prompt = "Ushbu qiziqarli ma'lumot qaysi davlat haqida?";
      const fact = fullCountry.interestingFactsUz[0] || fullCountry.descriptionUz.slice(0, 120);
      clue = `💡 "${fact}"`;
    }

    setCurrentQuestion({
      type: chosenType,
      prompt,
      clue,
      correctCountry: targetItem,
      options,
    });
    setSelectedOptionId(null);
  };

  useEffect(() => {
    if (isOpen) {
      generateQuestion();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelectOption = (country: WorldCountryIndexItem) => {
    if (selectedOptionId !== null || !currentQuestion) return;

    setSelectedOptionId(country.id);
    setTotalAnswered(prev => prev + 1);

    if (country.id === currentQuestion.correctCountry.id) {
      setScore(prev => prev + 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white tracking-tight">
              Dunyo Geografiyasi Viktorinasi
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs bg-slate-800/80 px-2.5 py-1 rounded-md text-emerald-400 font-mono font-bold">
              Ball: {score} / {totalAnswered}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Area */}
        {currentQuestion && (
          <div className="p-6 space-y-6">
            <div className="text-center space-y-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                {currentQuestion.type === 'flag' ? 'Bayroq bo\'yicha toping' : currentQuestion.type === 'capital' ? 'Poytaxt bo\'yicha toping' : 'Fakt bo\'yicha toping'}
              </span>
              <h3 className="text-lg font-bold text-white">
                {currentQuestion.prompt}
              </h3>
              <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-center">
                <div className={`text-center font-medium ${currentQuestion.type === 'flag' ? 'text-6xl select-none' : 'text-sm text-slate-200 leading-relaxed'}`}>
                  {currentQuestion.clue}
                </div>
              </div>
            </div>

            {/* 4 Options Grid */}
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isCorrect = opt.id === currentQuestion.correctCountry.id;
                const showFeedback = selectedOptionId !== null;

                let btnStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200';
                if (showFeedback) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-300 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'bg-red-950/70 border-red-500 text-red-300';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-800/40 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    disabled={showFeedback}
                    onClick={() => handleSelectOption(opt)}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${btnStyle}`}
                  >
                    <span className="text-xl select-none">{opt.flagEmoji}</span>
                    <div className="truncate">
                      <div className="text-xs font-medium truncate">{opt.nameUz}</div>
                      <div className="text-[10px] text-slate-400 truncate">{opt.capitalUz}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Feedback & Actions */}
            {selectedOptionId && (
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => {
                    onFlyToCountry(currentQuestion.correctCountry);
                    onClose();
                  }}
                  className="text-xs text-sky-400 hover:text-sky-300 font-medium flex items-center gap-1"
                >
                  Globusda ko'rish →
                </button>

                <button
                  onClick={generateQuestion}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ml-auto"
                >
                  <span>Keyingi savol</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
