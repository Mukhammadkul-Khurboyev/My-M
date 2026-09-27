import React from 'react';
import { 
  Plus, 
  Minus, 
  RotateCw, 
  Cloud, 
  Layers, 
  Compass, 
  Sun, 
  Moon,
  Tag,
  Eye
} from 'lucide-react';

interface GlobeControlsProps {
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  showClouds: boolean;
  onToggleClouds: () => void;
  showBorders: boolean;
  onToggleBorders: () => void;
  highContrastBorders: boolean;
  onToggleHighContrastBorders: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  dayNightMode: 'cinematic' | 'daylight';
  onToggleDayNightMode: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
}

export const GlobeControls: React.FC<GlobeControlsProps> = ({
  autoRotate,
  onToggleAutoRotate,
  showClouds,
  onToggleClouds,
  showBorders,
  onToggleBorders,
  highContrastBorders,
  onToggleHighContrastBorders,
  showLabels,
  onToggleLabels,
  dayNightMode,
  onToggleDayNightMode,
  onZoomIn,
  onZoomOut,
  onResetView,
}) => {
  return (
    <div className="flex flex-col gap-1.5 p-1.5 bg-slate-950/85 backdrop-blur-xl border border-slate-800 rounded-xl shadow-2xl z-20">
      {/* Zoom in / out */}
      <button
        onClick={onZoomIn}
        className="p-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors flex items-center justify-center active:scale-95"
        title="Yaqinlashtirish (+)"
      >
        <Plus className="w-4 h-4" />
      </button>

      <button
        onClick={onZoomOut}
        className="p-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors flex items-center justify-center active:scale-95"
        title="Uzoqlashtirish (-)"
      >
        <Minus className="w-4 h-4" />
      </button>

      <div className="w-full h-px bg-slate-800/80 my-0.5" />

      {/* Country Names & Badges on Globe Toggle */}
      <button
        onClick={onToggleLabels}
        className={`p-2 rounded-lg text-xs transition-colors flex items-center justify-center active:scale-95 ${
          showLabels
            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
        }`}
        title={showLabels ? "Globusda davlat nomlarini yashirish" : "Globusda davlat nomlari va bayroqlarini ko'rsatish"}
      >
        <Tag className="w-4 h-4" />
      </button>

      {/* High-Contrast Borders Toggle */}
      <button
        onClick={onToggleHighContrastBorders}
        className={`p-2 rounded-lg text-xs transition-colors flex items-center justify-center active:scale-95 ${
          highContrastBorders
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
        }`}
        title={highContrastBorders ? "Oddiy chegaralar ko'rinishi" : "Yorqinroq chegaralar ko'rinishi"}
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* Auto-rotate */}
      <button
        onClick={onToggleAutoRotate}
        className={`p-2 rounded-lg text-xs transition-colors flex items-center justify-center active:scale-95 ${
          autoRotate
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
        }`}
        title={autoRotate ? "Yer aylanishini to'xtatish" : "Yer aylanishini yoqish"}
      >
        <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin-slow' : ''}`} />
      </button>

      {/* Day / Night Cinematic Sun Toggle */}
      <button
        onClick={onToggleDayNightMode}
        className={`p-2 rounded-lg text-xs transition-colors flex items-center justify-center active:scale-95 ${
          dayNightMode === 'cinematic'
            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            : 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
        }`}
        title={
          dayNightMode === 'cinematic'
            ? "Kinematik Quyosh va Tungi Shahar Chiroqlari (Faol)"
            : "To'liq Yoritilgan Kunduzgi Rejim"
        }
      >
        {dayNightMode === 'cinematic' ? (
          <Moon className="w-4 h-4 text-amber-400" />
        ) : (
          <Sun className="w-4 h-4 text-sky-400" />
        )}
      </button>

      {/* Clouds Toggle */}
      <button
        onClick={onToggleClouds}
        className={`p-2 rounded-lg text-xs transition-colors flex items-center justify-center active:scale-95 ${
          showClouds
            ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
        }`}
        title={showClouds ? "Bulutlar qatlamini yashirish" : "Bulutlar qatlamini ko'rsatish"}
      >
        <Cloud className="w-4 h-4" />
      </button>

      {/* Borders Toggle */}
      <button
        onClick={onToggleBorders}
        className={`p-2 rounded-lg text-xs transition-colors flex items-center justify-center active:scale-95 ${
          showBorders
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
            : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
        }`}
        title={showBorders ? "Davlat chegaralarini yashirish" : "Davlat chegaralarini ko'rsatish"}
      >
        <Layers className="w-4 h-4" />
      </button>

      <div className="w-full h-px bg-slate-800/80 my-0.5" />

      {/* Reset view */}
      <button
        onClick={onResetView}
        className="p-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors flex items-center justify-center active:scale-95"
        title="Globusni dastlabki holatga qaytarish"
      >
        <Compass className="w-4 h-4" />
      </button>
    </div>
  );
};
