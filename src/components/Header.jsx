import React, { useState, useEffect } from 'react';
import { 
  CloudSun, 
  Wind, 
  Flame, 
  Satellite,
  Sprout,
  Volume2, 
  VolumeX, 
  Search, 
  Info, 
  Radio, 
  Clock, 
  RotateCw,
  Compass
} from 'lucide-react';
import { CURATED_LOCATIONS } from '../data/curatedLocations';

export function Header({ 
  activeLayer, 
  onLayerChange, 
  isAudioOn, 
  onToggleAudio, 
  onSelectLocation,
  onSelectSatellite,
  satellites = [],
  onOpenAbout,
  nasaEventsCount,
  onResetView,
  autoRotate,
  onToggleAutoRotate
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live UTC Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toUTCString().slice(17, 22) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Filter curated locations and satellites
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const cityMatches = CURATED_LOCATIONS.filter(
      loc => loc.name.toLowerCase().includes(q) || 
             loc.country.toLowerCase().includes(q) ||
             loc.region.toLowerCase().includes(q)
    ).slice(0, 5);

    const satMatches = (satellites || []).filter(
      sat => sat.name.toLowerCase().includes(q) ||
             String(sat.noradId).includes(q) ||
             sat.operator.toLowerCase().includes(q)
    ).slice(0, 3).map(s => ({ ...s, isSatResult: true }));

    setSearchResults([...cityMatches, ...satMatches]);
  }, [searchQuery, satellites]);

  return (
    <header className="absolute top-0 left-0 right-0 z-30 p-3 md:p-4 flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-none">
      {/* Brand & Radio Garden live tuning pill */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <div className="glass-panel px-3.5 py-2 rounded-2xl flex items-center gap-3 border border-cyan-500/30">
          <div className="relative flex items-center justify-center">
            <Radio className="w-5 h-5 text-[#00f5d4] animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f5d4] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-wider bg-gradient-to-r from-[#00f5d4] via-[#34d399] to-[#06b6d4] bg-clip-text text-transparent">
                PLANETPULSE
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-[#10b981] font-semibold border border-emerald-500/30">
                LIVE
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#00f5d4]" />
              {currentTime}
            </span>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <div className="glass-pill rounded-xl px-3 py-1.5 flex items-center gap-2 border border-slate-700/60 focus-within:border-[#00f5d4]/60 transition-colors">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search station or satellite..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              className="bg-transparent border-none outline-none text-xs text-white placeholder-slate-400 w-32 md:w-44 font-medium"
            />
          </div>

          {/* Autocomplete dropdown */}
          {isSearchOpen && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 left-0 w-64 glass-panel rounded-xl overflow-hidden shadow-2xl z-50 border border-[#00f5d4]/30 py-1">
              {searchResults.map((item, idx) => (
                <button
                  key={item.id || idx}
                  onClick={() => {
                    if (item.isSatResult) {
                      onSelectSatellite(item);
                    } else {
                      onSelectLocation(item);
                    }
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-[#00f5d4]/10 transition-colors flex items-center justify-between border-b border-slate-800/40 last:border-b-0"
                >
                  <span className="font-semibold text-slate-200 truncate pr-2">{item.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">
                    {item.isSatResult ? (item.type === 'debris' ? 'Space Debris' : 'Satellite') : item.country}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Center Layer Selector Pills */}
      <div className="glass-panel p-1 rounded-2xl flex items-center gap-1 pointer-events-auto border border-cyan-500/20">
        <button
          onClick={() => onLayerChange('weather')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeLayer === 'weather'
              ? 'bg-[#00f5d4]/20 text-[#00f5d4] border border-[#00f5d4]/40 shadow-[0_0_12px_rgba(0,245,212,0.3)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          title="Open-Meteo Live Weather Layer"
        >
          <CloudSun className="w-3.5 h-3.5" />
          <span>Weather</span>
        </button>

        <button
          onClick={() => onLayerChange('airQuality')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeLayer === 'airQuality'
              ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          title="Open-Meteo Air Quality & AQI Layer"
        >
          <Wind className="w-3.5 h-3.5" />
          <span>Air Quality</span>
        </button>

        <button
          onClick={() => onLayerChange('agro')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            activeLayer === 'agro'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          title="Agricultural Soil Moisture & Food Inflation Risk Predictor"
        >
          <Sprout className="w-3.5 h-3.5 text-emerald-400" />
          <span>Agro</span>
        </button>

        <button
          onClick={() => onLayerChange('events')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all relative ${
            activeLayer === 'events'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          title="NASA EONET Natural Earth Events Layer"
        >
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Events</span>
          {nasaEventsCount > 0 && (
            <span className="text-[10px] bg-amber-500/30 text-amber-300 px-1.5 py-0.2 rounded-full font-mono font-bold">
              {nasaEventsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => onLayerChange('satellites')}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all relative ${
            activeLayer === 'satellites'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
          title="Orbiting Earth Observation Satellites & Space Debris"
        >
          <Satellite className="w-3.5 h-3.5 text-[#00f5d4]" />
          <span>Satellites</span>
          <span className="text-[10px] bg-cyan-500/30 text-cyan-300 px-1.5 py-0.2 rounded-full font-mono font-bold">
            {satellites.length}
          </span>
        </button>
      </div>

      {/* Right Controls: Auto-spin, Reset, Sound FX, Hackathon Info */}
      <div className="flex items-center gap-2 pointer-events-auto">
        {/* Auto-rotation toggle */}
        <button
          onClick={onToggleAutoRotate}
          className={`glass-pill p-2 rounded-xl text-xs flex items-center justify-center transition-all ${
            autoRotate 
              ? 'text-[#00f5d4] border-[#00f5d4]/40 bg-[#00f5d4]/10 shadow-[0_0_10px_rgba(0,245,212,0.2)]' 
              : 'text-slate-400'
          }`}
          title={autoRotate ? 'Pause Earth auto-rotation' : 'Enable Earth auto-rotation'}
        >
          <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
        </button>

        {/* Reset Camera View */}
        <button
          onClick={onResetView}
          className="glass-pill p-2 rounded-xl text-xs text-slate-400 hover:text-slate-200"
          title="Reset Camera View to Default"
        >
          <Compass className="w-4 h-4" />
        </button>

        {/* Atmospheric Sound / Radio Garden Synth */}
        <button
          onClick={onToggleAudio}
          className={`glass-pill px-2.5 py-1.5 rounded-xl text-xs flex items-center gap-2 transition-all ${
            isAudioOn 
              ? 'text-[#10b981] border-[#10b981]/40 bg-[#10b981]/15 shadow-[0_0_12px_rgba(16,185,129,0.3)]' 
              : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Radio Garden Atmospheric Audio Engine (Ambient Synth)"
        >
          {isAudioOn ? (
            <div className="flex items-center gap-1.5">
              <div className="flex items-end gap-[2px] h-3.5 px-0.5">
                <div className="eq-bar eq-bar-1" />
                <div className="eq-bar eq-bar-2" />
                <div className="eq-bar eq-bar-3" />
                <div className="eq-bar eq-bar-4" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#10b981] hidden sm:inline">Audio Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <VolumeX className="w-4 h-4" />
              <span className="text-[11px] font-mono hidden sm:inline">Audio Off</span>
            </div>
          )}
        </button>

        {/* Hackathon Info Modal Trigger */}
        <button
          onClick={onOpenAbout}
          className="glass-pill p-2 rounded-xl text-xs text-slate-400 hover:text-[#00f5d4] transition-colors"
          title="Project Documentation & Hackathon Info"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
