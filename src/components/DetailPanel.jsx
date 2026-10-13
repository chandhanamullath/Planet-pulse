import React, { useState } from 'react';
import { 
  CloudSun, 
  Wind, 
  Flame, 
  Satellite,
  MapPin, 
  RefreshCw, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  Droplets, 
  Compass, 
  Activity, 
  ShieldCheck, 
  X,
  Shuffle,
  Sun,
  CloudRain,
  Snowflake,
  Zap,
  CloudFog,
  CloudLightning,
  Sparkles,
  Orbit,
  Radio,
  Gauge,
  Sprout,
  Wheat,
  Coffee,
  Apple,
  TrendingUp,
  Droplet
} from 'lucide-react';
import { getWeatherDetails, getAQICategory } from '../utils/weatherCodes';
import { getOverheadSatellites } from '../data/satellitesData';
import { WikiTerm } from './WikiTerm';

export function DetailPanel({
  selectedLocation,
  weatherData,
  airQualityData,
  agroData,
  selectedNASAEvent,
  selectedSatellite,
  satellites = [],
  isLoadingWeather,
  isLoadingAir,
  isLoadingAgro,
  weatherError,
  airError,
  agroError,
  onRefresh,
  onSelectRandom,
  onSelectSatellite,
  onClickWiki,
  activeLayer,
  onLayerChange,
  onClose
}) {
  const [useFahrenheit, setUseFahrenheit] = useState(false);
  const [copied, setCopied] = useState(false);

  // If nothing is selected at all
  if (!selectedLocation && !selectedNASAEvent && !selectedSatellite) {
    return (
      <div className="absolute bottom-10 left-6 right-6 md:right-auto md:w-96 glass-panel rounded-2xl p-5 border border-cyan-500/30 text-center pointer-events-auto">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#00f5d4]/10 border border-[#00f5d4]/30 flex items-center justify-center text-[#00f5d4] animate-pulse">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">TUNE INTO EARTH & SPACE</h3>
            <p className="text-xs text-slate-400 mt-1">
              Click anywhere on the globe, explore active weather and air quality, food inflation risk, or track satellites and space debris in orbit.
            </p>
          </div>
          <button
            onClick={onSelectRandom}
            className="glass-pill px-4 py-2 rounded-xl text-xs font-semibold text-[#00f5d4] flex items-center gap-2 hover:bg-[#00f5d4]/15 transition-all"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Spin to Random Station</span>
          </button>
        </div>
      </div>
    );
  }

  // Format temperature
  const formatTemp = (celsius) => {
    if (celsius === null || celsius === undefined) return '--';
    if (useFahrenheit) {
      return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    }
    return `${Math.round(celsius)}°C`;
  };

  const currentLat = selectedSatellite?.lat ?? selectedNASAEvent?.lat ?? selectedLocation?.lat;
  const currentLng = selectedSatellite?.lng ?? selectedNASAEvent?.lng ?? selectedLocation?.lng;

  const copyCoordinates = () => {
    if (currentLat !== undefined && currentLng !== undefined) {
      navigator.clipboard.writeText(`${currentLat.toFixed(4)}, ${currentLng.toFixed(4)}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Ground overhead satellites calculation
  const overheadSats = selectedLocation
    ? getOverheadSatellites(selectedLocation.lat, selectedLocation.lng, satellites)
    : [];

  const weatherCurrent = weatherData?.current;
  const weatherUnits = weatherData?.units;
  const weatherInfo = weatherCurrent ? getWeatherDetails(weatherCurrent.weather_code) : null;

  const aqiCurrent = airQualityData?.current;
  const aqiCategory = aqiCurrent ? getAQICategory(aqiCurrent.us_aqi) : null;

  // Header Title & Subtitle
  let title = 'Selected Coordinate';
  let subtitle = 'Earth Coordinate';
  let badgeLabel = 'TUNED STATION';
  let badgeColor = 'text-[#00f5d4]';

  if (selectedSatellite) {
    title = selectedSatellite.name;
    subtitle = `NORAD #${selectedSatellite.noradId} • ${selectedSatellite.orbitType}`;
    badgeLabel = selectedSatellite.type === 'debris' ? 'SPACE DEBRIS HAZARD' : 'ACTIVE ORBITAL SATELLITE';
    badgeColor = selectedSatellite.type === 'debris' ? 'text-rose-400' : 'text-[#00f5d4]';
  } else if (selectedNASAEvent) {
    title = selectedNASAEvent.title;
    subtitle = `NASA Hazard Alert • ${selectedNASAEvent.category}`;
    badgeLabel = 'NASA EONET EVENT';
    badgeColor = 'text-amber-400';
  } else if (selectedLocation) {
    title = selectedLocation.name;
    subtitle = selectedLocation.country || (selectedLocation.region ? `${selectedLocation.region} Region` : 'Ground Station');
  }

  const latFormatted = currentLat !== undefined ? Number(currentLat).toFixed(3) : '--';
  const lngFormatted = currentLng !== undefined ? Number(currentLng).toFixed(3) : '--';

  const renderWeatherIcon = (iconName) => {
    switch (iconName) {
      case 'Sun': return <Sun className="w-8 h-8 text-amber-400" />;
      case 'CloudRain': return <CloudRain className="w-8 h-8 text-[#00f5d4]" />;
      case 'Snowflake': return <Snowflake className="w-8 h-8 text-cyan-200" />;
      case 'CloudLightning':
      case 'Zap': return <CloudLightning className="w-8 h-8 text-yellow-400" />;
      case 'CloudFog': return <CloudFog className="w-8 h-8 text-slate-300" />;
      default: return <CloudSun className="w-8 h-8 text-[#00f5d4]" />;
    }
  };

  const renderCommodityIcon = (iconName) => {
    switch (iconName) {
      case 'Wheat': return <Wheat className="w-4 h-4 text-amber-300" />;
      case 'Coffee': return <Coffee className="w-4 h-4 text-orange-400" />;
      case 'Apple': return <Apple className="w-4 h-4 text-rose-400" />;
      case 'Droplet': return <Droplet className="w-4 h-4 text-yellow-300" />;
      default: return <Sprout className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <aside className="absolute bottom-10 left-4 right-4 md:right-auto md:bottom-10 md:left-6 md:w-[430px] max-h-[82vh] flex flex-col glass-panel rounded-2xl overflow-hidden border border-cyan-500/30 z-30 shadow-2xl pointer-events-auto transition-all duration-300">
      
      {/* Station Header */}
      <div className="p-4 bg-gradient-to-b from-slate-900/90 to-transparent border-b border-slate-800/60">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className={`flex h-2 w-2 rounded-full ${selectedSatellite?.type === 'debris' ? 'bg-rose-500' : 'bg-[#00f5d4]'} animate-ping`} />
              <span className={`text-[10px] font-mono tracking-wider uppercase font-bold ${badgeColor}`}>
                {badgeLabel}
              </span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1 leading-snug line-clamp-2">
              {title}
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              {subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
            title="Close station panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Coordinate badge + Copy */}
        <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-slate-950/60 px-2.5 py-1.5 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#00f5d4]" />
            <span>{latFormatted}° {currentLat >= 0 ? 'N' : 'S'}, {lngFormatted}° {currentLng >= 0 ? 'E' : 'W'}</span>
            {selectedSatellite && (
              <span className="text-[10px] text-cyan-300 font-bold ml-1">
                (Alt: {selectedSatellite.altitudeKm} km)
              </span>
            )}
          </div>
          <button
            onClick={copyCoordinates}
            className="flex items-center gap-1 text-[10px] text-[#00f5d4] hover:underline"
            title="Copy coordinates"
          >
            {copied ? <Check className="w-3 h-3 text-[#10b981]" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Mode Switcher Tabs Inside Panel */}
        <div className="mt-3 grid grid-cols-5 gap-1 bg-slate-950/40 p-1 rounded-xl border border-slate-800/60 text-xs font-semibold">
          <button
            onClick={() => onLayerChange('weather')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeLayer === 'weather'
                ? 'bg-[#00f5d4]/20 text-[#00f5d4] shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <CloudSun className="w-3 h-3" />
            <span className="text-[10px]">Weather</span>
          </button>

          <button
            onClick={() => onLayerChange('airQuality')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeLayer === 'airQuality'
                ? 'bg-[#10b981]/20 text-[#10b981] shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Wind className="w-3 h-3" />
            <span className="text-[10px]">Air</span>
          </button>

          <button
            onClick={() => onLayerChange('agro')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeLayer === 'agro'
                ? 'bg-emerald-500/20 text-emerald-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sprout className="w-3 h-3 text-emerald-400" />
            <span className="text-[10px]">Agro</span>
          </button>

          <button
            onClick={() => onLayerChange('events')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeLayer === 'events'
                ? 'bg-amber-500/20 text-amber-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-3 h-3 text-amber-400" />
            <span className="text-[10px]">Events</span>
          </button>

          <button
            onClick={() => onLayerChange('satellites')}
            className={`py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
              activeLayer === 'satellites'
                ? 'bg-cyan-500/20 text-cyan-300 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Satellite className="w-3 h-3 text-[#00f5d4]" />
            <span className="text-[10px]">Orbits</span>
          </button>
        </div>
      </div>

      {/* Main Panel Content Body */}
      <div className="p-4 overflow-y-auto space-y-4 flex-1">
        
        {/* ================= SATELLITE ORBITAL TELEMETRY ================= */}
        {selectedSatellite && (
          <div className="space-y-3.5">
            {/* Speed & Altitude Banner */}
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              selectedSatellite.type === 'debris' 
                ? 'bg-rose-950/30 border-rose-500/30' 
                : 'bg-cyan-950/30 border-cyan-500/30'
            }`}>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block">
                  ORBITAL VELOCITY
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl font-extrabold font-mono text-white">
                    {selectedSatellite.velocityKmH?.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-[#00f5d4]">km/h</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    Mach {(selectedSatellite.velocityKmH / 1234.8).toFixed(1)}
                  </span>
                </div>
              </div>
              <Orbit className="w-8 h-8 text-[#00f5d4] animate-spin" style={{ animationDuration: '16s' }} />
            </div>

            {/* Orbital Parameters Grid with Wikipedia Explanations */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">
                  Altitude
                </span>
                <span className="text-sm font-bold text-white font-mono">
                  {selectedSatellite.altitudeKm} km
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  <WikiTerm termKey="leo" onClickWiki={onClickWiki}>Low Earth Orbit</WikiTerm>
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Orbital Period</span>
                <span className="text-sm font-bold text-white font-mono">
                  {selectedSatellite.periodMin} mins
                </span>
                <span className="text-[10px] text-slate-500 block">~15.5 orbits/day</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Orbit Type</span>
                <span className="text-xs font-bold text-white block truncate">
                  {selectedSatellite.orbitType.includes('Sun-Sync') ? (
                    <WikiTerm termKey="sunsync" onClickWiki={onClickWiki}>Sun-Synchronous</WikiTerm>
                  ) : (
                    selectedSatellite.orbitType
                  )}
                </span>
                <span className="text-[10px] text-slate-500 block">Inclination: {selectedSatellite.inclination}°</span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <span className="text-[10px] text-slate-400 block uppercase font-mono">Catalog Number</span>
                <span className="text-xs font-bold text-white block">
                  <WikiTerm termKey="norad" onClickWiki={onClickWiki}>NORAD #{selectedSatellite.noradId}</WikiTerm>
                </span>
                <span className="text-[10px] text-slate-500 block">Mass: {selectedSatellite.massKg?.toLocaleString()} kg</span>
              </div>
            </div>

            {/* Mission or Hazard Details */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                {selectedSatellite.type === 'debris' ? (
                  <>⚠️ <WikiTerm termKey="spacedebris" onClickWiki={onClickWiki}>Space Debris Analysis</WikiTerm></>
                ) : (
                  '🛰️ Mission & Payload'
                )}
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                {selectedSatellite.description}
              </p>
            </div>

            {/* Space Debris Conjunction Meter */}
            <div className={`p-3 rounded-xl border flex items-start gap-2.5 ${
              selectedSatellite.type === 'debris' 
                ? 'bg-rose-500/10 border-rose-500/40 text-rose-200' 
                : 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
            }`}>
              {selectedSatellite.type === 'debris' ? (
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              ) : (
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="text-[10px] font-mono font-bold uppercase block">
                  {selectedSatellite.type === 'debris' ? (
                    <WikiTerm termKey="kessler" onClickWiki={onClickWiki}>Kessler Syndrome Collision Alert</WikiTerm>
                  ) : (
                    <WikiTerm termKey="conjunction" onClickWiki={onClickWiki}>Conjunction Safety Status</WikiTerm>
                  )}
                </span>
                <span className="text-xs font-medium">
                  {selectedSatellite.debrisRisk}
                </span>
              </div>
            </div>

            <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
              <span>NORAD Space-Track Catalog</span>
              <span className="text-[#00f5d4]">{selectedSatellite.operator}</span>
            </div>
          </div>
        )}

        {/* ================= AGRICULTURE & FOOD INFLATION LAYER ================= */}
        {!selectedSatellite && activeLayer === 'agro' && (
          <div>
            {isLoadingAgro ? (
              <div className="py-8 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
                <span className="text-xs font-mono text-slate-400">Analyzing soil moisture & food inflation impact...</span>
              </div>
            ) : agroError ? (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex flex-col gap-2">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Agricultural Telemetry Unavailable</span>
                </div>
                <p className="text-[11px] text-rose-200/80">{agroError}</p>
              </div>
            ) : agroData ? (
              <div className="space-y-3.5">
                {/* Inflation Pressure Banner */}
                <div 
                  className="p-3.5 rounded-2xl border flex items-center justify-between"
                  style={{
                    backgroundColor: agroData.moistureStatus?.bg || 'rgba(16, 185, 129, 0.1)',
                    borderColor: agroData.moistureStatus?.color || '#10b981'
                  }}
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block">
                      DAILY FOOD INFLATION RISK
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-extrabold font-mono" style={{ color: agroData.moistureStatus?.color }}>
                        {agroData.compositeInflationScore}/100
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: agroData.moistureStatus?.color, color: '#050811' }}>
                        {agroData.moistureStatus?.rating}
                      </span>
                    </div>
                  </div>
                  <TrendingUp className="w-7 h-7 opacity-85" style={{ color: agroData.moistureStatus?.color }} />
                </div>

                {/* Soil & Crop Water Vitals */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">
                      <WikiTerm termKey="soilmoisture" onClickWiki={onClickWiki}>Moisture</WikiTerm>
                    </span>
                    <span className="text-xs font-bold text-white font-mono mt-0.5 block">
                      {agroData.soilMoisture} m³/m³
                    </span>
                    <span className="text-[9px] text-[#10b981] font-mono block">Root Zone</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Soil Temp</span>
                    <span className="text-xs font-bold text-white font-mono mt-0.5 block">
                      {agroData.soilTemperatureC}°C
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono block">Surface 0cm</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">
                      <WikiTerm termKey="evapotranspiration" onClickWiki={onClickWiki}>ET Evapo</WikiTerm>
                    </span>
                    <span className="text-xs font-bold text-white font-mono mt-0.5 block">
                      {agroData.dailyEvapotranspirationMm} mm
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono block">FAO-56 Daily</span>
                  </div>
                </div>

                {/* Grocery Basket Daily Commodities Breakdown */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                    Daily Grocery Basket Outlook:
                  </span>
                  
                  {agroData.commodities.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/90 flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 mt-0.5 shrink-0">
                          {renderCommodityIcon(item.icon)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-white">{item.product}</span>
                            <span className="text-[10px] text-slate-400 font-mono">({item.staple})</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-0.5">
                            {item.cause}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-mono font-bold block" style={{ color: item.riskColor }}>
                          {item.projectedImpact}
                        </span>
                        <span className="text-[9px] text-slate-500 font-mono">Price Risk</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
                  <span>Open-Meteo Agro Models</span>
                  <a
                    href="https://open-meteo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>Soil Models</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ================= WEATHER LAYER ================= */}
        {!selectedSatellite && activeLayer === 'weather' && (
          <div>
            {isLoadingWeather ? (
              <div className="py-8 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-2 border-[#00f5d4]/30 border-t-[#00f5d4] rounded-full animate-spin" />
                <span className="text-xs font-mono text-slate-400">Scanning atmospheric telemetry...</span>
              </div>
            ) : weatherError ? (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex flex-col gap-2">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Telemetry Unavailable</span>
                </div>
                <p className="text-[11px] text-rose-200/80">{weatherError}</p>
                <button
                  onClick={onRefresh}
                  className="mt-1 self-start px-3 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-white text-[11px] font-semibold"
                >
                  Retry Connection
                </button>
              </div>
            ) : weatherCurrent ? (
              <div className="space-y-3.5">
                {/* Temperature + Condition Badge */}
                <div className="flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/40 to-slate-900/60 border border-cyan-500/20">
                  <div className="flex items-center gap-3">
                    <div className="animate-float">
                      {renderWeatherIcon(weatherInfo?.icon)}
                    </div>
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-white font-mono tracking-tight glow-cyan-text">
                          {formatTemp(weatherCurrent.temperature_2m)}
                        </span>
                        <button
                          onClick={() => setUseFahrenheit(!useFahrenheit)}
                          className="text-[11px] font-mono text-[#00f5d4] underline hover:text-white"
                          title="Switch °C / °F"
                        >
                          {useFahrenheit ? 'Switch to °C' : 'Switch to °F'}
                        </button>
                      </div>
                      <span className="text-xs font-semibold text-[#00f5d4] block">
                        {weatherInfo?.label || 'Current Condition'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic px-1">
                  "{weatherInfo?.desc}"
                </p>

                {/* Grid of Weather Metrics */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-cyan-500/10 text-[#00f5d4]">
                      <Droplets className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono">Humidity</span>
                      <span className="text-sm font-bold text-white font-mono">
                        {weatherCurrent.relative_humidity_2m ?? '--'} {weatherUnits?.relative_humidity_2m || '%'}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-[#10b981]">
                      <Wind className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono">Wind Speed</span>
                      <span className="text-sm font-bold text-white font-mono">
                        {weatherCurrent.wind_speed_10m ?? '--'} {weatherUnits?.wind_speed_10m || 'km/h'}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                      <CloudRain className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono">Precipitation</span>
                      <span className="text-sm font-bold text-white font-mono">
                        {weatherCurrent.precipitation ?? 0} {weatherUnits?.precipitation || 'mm'}
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-mono">Elevation</span>
                      <span className="text-sm font-bold text-white font-mono">
                        {weatherData?.elevation ?? '--'} m
                      </span>
                    </div>
                  </div>
                </div>

                {/* Overhead Satellites Section */}
                {overheadSats.length > 0 && (
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-[#00f5d4] font-bold flex items-center gap-1.5">
                        <Satellite className="w-3.5 h-3.5 text-[#00f5d4]" />
                        <span>Passing Overhead Now ({overheadSats.length})</span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      {overheadSats.slice(0, 2).map(sat => (
                        <div key={sat.id} className="flex items-center justify-between text-xs">
                          <span className="text-slate-200 font-medium truncate max-w-[200px]">{sat.name}</span>
                          <button
                            onClick={() => onSelectSatellite(sat)}
                            className="text-[10px] font-mono text-[#00f5d4] hover:underline"
                          >
                            Track ({sat.groundDistanceKm} km)
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Data Timestamp */}
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
                  <span>Timestamp: {weatherCurrent.time ? new Date(weatherCurrent.time).toLocaleString() : 'Live'}</span>
                  <a
                    href="https://open-meteo.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00f5d4] hover:underline flex items-center gap-1"
                  >
                    <span>Open-Meteo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ================= AIR QUALITY LAYER ================= */}
        {!selectedSatellite && activeLayer === 'airQuality' && (
          <div>
            {isLoadingAir ? (
              <div className="py-8 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border-2 border-[#10b981]/30 border-t-[#10b981] rounded-full animate-spin" />
                <span className="text-xs font-mono text-slate-400">Analyzing atmospheric pollutants...</span>
              </div>
            ) : airError ? (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex flex-col gap-2">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                  <span>Air Quality Telemetry Unavailable</span>
                </div>
                <p className="text-[11px] text-rose-200/80">{airError}</p>
                <button
                  onClick={onRefresh}
                  className="mt-1 self-start px-3 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-white text-[11px] font-semibold"
                >
                  Retry Connection
                </button>
              </div>
            ) : aqiCurrent ? (
              <div className="space-y-3.5">
                {/* Big AQI Score Banner */}
                <div 
                  className="p-4 rounded-2xl border flex items-center justify-between holo-glow"
                  style={{
                    backgroundColor: aqiCategory?.bg || 'rgba(16, 185, 129, 0.1)',
                    borderColor: aqiCategory?.color || '#10b981'
                  }}
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-300 block">
                      <WikiTerm termKey="aqi" onClickWiki={onClickWiki}>US AIR QUALITY INDEX</WikiTerm>
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-extrabold font-mono glow-green-text" style={{ color: aqiCategory?.color }}>
                        {aqiCurrent.us_aqi ?? '--'}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: aqiCategory?.color, color: '#050811' }}>
                        {aqiCategory?.label}
                      </span>
                    </div>
                  </div>
                  <ShieldCheck className="w-8 h-8 opacity-80" style={{ color: aqiCategory?.color }} />
                </div>

                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                    Health Guidance
                  </span>
                  <p className="text-xs text-slate-200">
                    {aqiCategory?.advice}
                  </p>
                </div>

                {/* Fine Particles Breakdown */}
                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-semibold">
                        <WikiTerm termKey="pm25" onClickWiki={onClickWiki}>Fine Particles (PM2.5)</WikiTerm>
                      </span>
                      <span className="font-mono font-bold text-white">
                        {aqiCurrent.pm2_5 ?? '--'} μg/m³
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, ((aqiCurrent.pm2_5 || 0) / 75) * 100)}%`,
                          backgroundColor: (aqiCurrent.pm2_5 || 0) > 35 ? '#f59e0b' : '#10b981'
                        }}
                      />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-300 font-semibold">Coarse Particles (PM10)</span>
                      <span className="font-mono font-bold text-white">
                        {aqiCurrent.pm10 ?? '--'} μg/m³
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${Math.min(100, ((aqiCurrent.pm10 || 0) / 150) * 100)}%`,
                          backgroundColor: (aqiCurrent.pm10 || 0) > 50 ? '#f59e0b' : '#00f5d4'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
                  <span>Timestamp: {aqiCurrent.time ? new Date(aqiCurrent.time).toLocaleString() : 'Live'}</span>
                  <a
                    href="https://open-meteo.com/en/docs/air-quality-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#10b981] hover:underline flex items-center gap-1"
                  >
                    <span>Open-Meteo AQI</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ) : null}
          </div>
        )}

        {/* ================= EARTH EVENTS LAYER (NASA EONET) ================= */}
        {!selectedSatellite && activeLayer === 'events' && (
          <div className="space-y-3.5">
            {selectedNASAEvent ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-400" />
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      {selectedNASAEvent.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mt-1.5">
                    {selectedNASAEvent.title}
                  </h4>
                  {selectedNASAEvent.date && (
                    <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                      Detected: {new Date(selectedNASAEvent.date).toLocaleString()}
                    </span>
                  )}
                </div>

                {selectedNASAEvent.magnitudeValue && (
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs text-slate-300 font-medium">Recorded Magnitude:</span>
                    <span className="text-xs font-mono font-bold text-amber-300">
                      {selectedNASAEvent.magnitudeValue} {selectedNASAEvent.magnitudeUnit || ''}
                    </span>
                  </div>
                )}

                <div>
                  <span className="text-[11px] font-mono uppercase text-slate-400 font-bold block mb-1.5">
                    Official Incident Sources:
                  </span>
                  {selectedNASAEvent.sources && selectedNASAEvent.sources.length > 0 ? (
                    <div className="space-y-1.5">
                      {selectedNASAEvent.sources.map((s, idx) => (
                        <a
                          key={idx}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/50 text-xs text-amber-300 flex items-center justify-between transition-colors"
                        >
                          <span className="font-semibold truncate max-w-[260px]">{s.id || 'Source Incident Page'}</span>
                          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-500 italic">No external URLs reported.</span>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center space-y-2">
                <Flame className="w-6 h-6 text-amber-400 mx-auto" />
                <h4 className="text-xs font-bold text-white">Select a NASA Event Marker</h4>
                <p className="text-[11px] text-slate-400">
                  Click on any orange or red flame marker on the globe to inspect real-time wildfires, storms, or volcanic alerts.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================= SATELLITES LAYER OVERVIEW ================= */}
        {!selectedSatellite && activeLayer === 'satellites' && (
          <div className="space-y-3.5">
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-center space-y-2">
              <Satellite className="w-8 h-8 text-[#00f5d4] mx-auto animate-pulse" />
              <h4 className="text-xs font-bold text-white">Global Orbital Constellation Active</h4>
              <p className="text-[11px] text-slate-400">
                Tracking {satellites.length} high-priority orbital bodies (active Earth science observatories and hazardous <WikiTerm termKey="spacedebris" onClickWiki={onClickWiki}>space debris</WikiTerm>). Click any orbital beacon in space to lock telemetry.
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                Quick Satellite Selection:
              </span>
              {satellites.slice(0, 4).map(sat => (
                <button
                  key={sat.id}
                  onClick={() => onSelectSatellite(sat)}
                  className="w-full p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-[#00f5d4]/40 flex items-center justify-between text-xs text-left transition-colors"
                >
                  <div>
                    <span className="font-bold text-white block">{sat.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{sat.orbitType}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#00f5d4]">{sat.altitudeKm} km</span>
                </button>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Footer Station Controls */}
      <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <button
          onClick={onRefresh}
          className="flex-1 py-1.5 px-3 rounded-xl glass-pill text-xs font-semibold text-slate-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#00f5d4]" />
          <span>Refresh Telemetry</span>
        </button>

        <button
          onClick={onSelectRandom}
          className="py-1.5 px-3 rounded-xl glass-pill text-xs font-semibold text-[#00f5d4] hover:bg-[#00f5d4]/10 flex items-center gap-1.5 transition-colors"
          title="Tune to another location"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>Random</span>
        </button>
      </div>

    </aside>
  );
}
