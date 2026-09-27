import React, { useState, useEffect, useCallback } from 'react';
import { Globe3D } from './components/Globe3D';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { GlobeControls } from './components/GlobeControls';
import { CountryDetailModal } from './components/CountryDetailModal';
import { CountryListDrawer } from './components/CountryListDrawer';
import { CountryCompareModal } from './components/CountryCompareModal';
import { GeoQuizModal } from './components/GeoQuizModal';
import { CountryPortalPage } from './components/CountryPortalPage';
import { 
  loadGeoJsonAndCountries, 
  WorldCountryIndexItem, 
  getRandomCountry,
  getFullCountryData
} from './data/countriesRegistry';
import { CountryData } from './types/country';
import spaceGalaxyBg from './assets/images/space_galaxy_backdrop_1790482289684.jpg';

export default function App() {
  const [countries, setCountries] = useState<WorldCountryIndexItem[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<WorldCountryIndexItem | null>(null);
  const [activeContinent, setActiveContinent] = useState('ALL');
  
  // Dedicated Country Website Portal State
  const [portalCountry, setPortalCountry] = useState<CountryData | null>(null);

  // Globe controls and appearance state
  const [autoRotate, setAutoRotate] = useState(true);
  const [showClouds, setShowClouds] = useState(true);
  const [showBorders, setShowBorders] = useState(true);
  const [highContrastBorders, setHighContrastBorders] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [dayNightMode, setDayNightMode] = useState<'cinematic' | 'daylight'>('cinematic');
  const [zoomAction, setZoomAction] = useState<'in' | 'out' | null>(null);
  const [resetViewTrigger, setResetViewTrigger] = useState<number>(0);

  // Modals state
  const [isCountryListOpen, setIsCountryListOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [compareSourceCountry, setCompareSourceCountry] = useState<CountryData | null>(null);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  // Load countries catalog on mount
  useEffect(() => {
    loadGeoJsonAndCountries().then(({ countries: loaded }) => {
      setCountries(loaded);
      // Default to Uzbekistan to highlight home country!
      const uzb = loaded.find(c => c.id === 'UZB');
      if (uzb) {
        setSelectedCountry(uzb);
      }
    });
  }, []);

  // Handle select country
  const handleSelectCountry = useCallback((country: WorldCountryIndexItem) => {
    setSelectedCountry(country);
    // Pause auto-rotation when user selects a specific country
    setAutoRotate(false);
  }, []);

  // Open full country website portal
  const handleOpenPortal = useCallback((countryOrData: WorldCountryIndexItem | CountryData) => {
    if ('currency' in countryOrData) {
      setPortalCountry(countryOrData);
    } else {
      const full = getFullCountryData(countryOrData.id, countryOrData.nameEn);
      setPortalCountry(full);
    }
  }, []);

  // Handle select country by ID (e.g. from neighboring country chips)
  const handleSelectCountryById = useCallback((id: string) => {
    const found = countries.find(c => c.id === id);
    if (found) {
      handleSelectCountry(found);
    } else {
      const full = getFullCountryData(id);
      handleSelectCountry({
        id: full.id,
        iso2: full.iso2,
        nameUz: full.nameUz,
        nameEn: full.nameEn,
        capitalUz: full.capitalUz,
        continent: full.continent,
        lat: full.lat,
        lng: full.lng,
        flagEmoji: full.flagEmoji,
      });
    }
  }, [countries, handleSelectCountry]);

  // Handle random explore
  const handleRandomExplore = useCallback(() => {
    const random = getRandomCountry();
    if (random) {
      handleSelectCountry(random);
    }
  }, [handleSelectCountry]);

  // Open compare modal with current country
  const handleOpenCompare = (country: CountryData) => {
    setCompareSourceCountry(country);
    setIsCompareModalOpen(true);
  };

  // Reset view to origin
  const handleResetView = () => {
    const uzb = countries.find(c => c.id === 'UZB');
    if (uzb) {
      handleSelectCountry(uzb);
    }
    setResetViewTrigger(prev => prev + 1);
    setAutoRotate(true);
  };

  return (
    <div className="flex flex-col w-screen h-screen overflow-hidden bg-[#030712] font-['Plus_Jakarta_Sans',sans-serif] text-slate-100 select-none">
      {/* Top Bar adhering to Top Bar Contract */}
      <Header
        activeContinent={activeContinent}
        onSelectContinent={(cont) => {
          setActiveContinent(cont);
          if (cont !== 'ALL') {
            const match = countries.find(c => c.continent === cont);
            if (match) handleSelectCountry(match);
          }
        }}
        onRandomExplore={handleRandomExplore}
        onOpenCountryList={() => setIsCountryListOpen(true)}
        onOpenQuiz={() => setIsQuizModalOpen(true)}
      />

      {/* Main 3D Viewport Area */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        {/* Floating Top Search Bar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 w-11/12 max-w-md pointer-events-auto">
          <SearchBar
            countries={countries}
            onSelectCountry={handleSelectCountry}
            selectedContinent={activeContinent}
          />
        </div>

        {/* 3D WebGL Globe Canvas with NASA Blue Marble, 3D Normal Relief, Dynamic Caustics & 3D Waving Flags */}
        <Globe3D
          selectedCountry={selectedCountry}
          onSelectCountry={handleSelectCountry}
          onOpenCountryPortal={handleOpenPortal}
          autoRotate={autoRotate}
          showClouds={showClouds}
          showBorders={showBorders}
          highContrastBorders={highContrastBorders}
          showLabels={showLabels}
          dayNightMode={dayNightMode}
          activeContinent={activeContinent}
          starBackgroundUrl={spaceGalaxyBg}
          zoomAction={zoomAction}
          onZoomActionHandled={() => setZoomAction(null)}
          resetViewTrigger={resetViewTrigger}
        />

        {/* Floating HUD Controls on bottom-left */}
        <div className="absolute bottom-5 left-5 z-20">
          <GlobeControls
            autoRotate={autoRotate}
            onToggleAutoRotate={() => setAutoRotate(prev => !prev)}
            showClouds={showClouds}
            onToggleClouds={() => setShowClouds(prev => !prev)}
            showBorders={showBorders}
            onToggleBorders={() => setShowBorders(prev => !prev)}
            highContrastBorders={highContrastBorders}
            onToggleHighContrastBorders={() => setHighContrastBorders(prev => !prev)}
            showLabels={showLabels}
            onToggleLabels={() => setShowLabels(prev => !prev)}
            dayNightMode={dayNightMode}
            onToggleDayNightMode={() => setDayNightMode(prev => prev === 'cinematic' ? 'daylight' : 'cinematic')}
            onZoomIn={() => setZoomAction('in')}
            onZoomOut={() => setZoomAction('out')}
            onResetView={handleResetView}
          />
        </div>

        {/* Floating Minimal Instruction bottom-center */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/75 backdrop-blur-md border border-slate-800/80 text-xs text-slate-300 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Istalgan davlat ustiga bosing — to'liq ma'lumot va video portali ochiladi</span>
        </div>

        {/* Selected Country Detailed Dossier Modal / Drawer */}
        {selectedCountry && !portalCountry && (
          <CountryDetailModal
            countryItem={selectedCountry}
            onClose={() => setSelectedCountry(null)}
            onSelectCountryById={handleSelectCountryById}
            onCompareCountry={handleOpenCompare}
            onOpenPortal={handleOpenPortal}
          />
        )}
      </main>

      {/* Dedicated Country Website Portal & Badiiy Kutubxona with Country Nature Background Video */}
      {portalCountry && (
        <CountryPortalPage
          country={portalCountry}
          onBackToGlobe={() => setPortalCountry(null)}
          onSelectNeighbor={(neighborId) => {
            const full = getFullCountryData(neighborId);
            setPortalCountry(full);
            handleSelectCountryById(neighborId);
          }}
        />
      )}

      {/* Slide-out Country List Drawer */}
      <CountryListDrawer
        isOpen={isCountryListOpen}
        onClose={() => setIsCountryListOpen(false)}
        countries={countries}
        onSelectCountry={handleSelectCountry}
      />

      {/* Country Compare Modal */}
      <CountryCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        initialCountry={compareSourceCountry}
        allCountries={countries}
        onFlyToCountry={handleSelectCountry}
      />

      {/* Geography Quiz Modal */}
      <GeoQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        allCountries={countries}
        onFlyToCountry={handleSelectCountry}
      />
    </div>
  );
}
