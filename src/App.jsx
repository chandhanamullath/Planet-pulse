import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { GlobeView } from './components/GlobeView';
import { DetailPanel } from './components/DetailPanel';
import { NASAEventsList } from './components/NASAEventsList';
import { SatellitesDrawer } from './components/SatellitesDrawer';
import { LiveTelemetryTicker } from './components/LiveTelemetryTicker';
import { AboutModal } from './components/AboutModal';
import { CURATED_LOCATIONS, DEFAULT_LOCATION } from './data/curatedLocations';
import { SATELLITE_CATALOG, calculateSatellitePosition } from './data/satellitesData';
import { fetchWeather, fetchAirQuality, fetchNASAEvents, fetchLiveISSPosition } from './services/api';
import { fetchAgroInflationData } from './services/agroApi';
import { WikiPopover } from './components/WikiPopover';
import { soundEngine } from './services/audio';

export default function App() {
  const [activeLayer, setActiveLayer] = useState('weather');
  const [selectedLocation, setSelectedLocation] = useState(DEFAULT_LOCATION);
  const [selectedNASAEvent, setSelectedNASAEvent] = useState(null);
  const [selectedSatellite, setSelectedSatellite] = useState(null);
  const [activeWikiTerm, setActiveWikiTerm] = useState(null);

  // Satellites & Space Debris State
  const [satellites, setSatellites] = useState(() => 
    SATELLITE_CATALOG.map(sat => calculateSatellitePosition(sat))
  );

  // Data states
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [agroData, setAgroData] = useState(null);
  const [nasaEvents, setNasaEvents] = useState([]);

  // Loading states
  const [isLoadingWeather, setIsLoadingWeather] = useState(false);
  const [isLoadingAir, setIsLoadingAir] = useState(false);
  const [isLoadingAgro, setIsLoadingAgro] = useState(false);
  const [isLoadingNASA, setIsLoadingNASA] = useState(false);

  // Error states
  const [weatherError, setWeatherError] = useState(null);
  const [airError, setAirError] = useState(null);
  const [agroError, setAgroError] = useState(null);
  const [nasaError, setNasaError] = useState(null);

  // UI controls
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // Real-time orbital propagation tick (every 2.5 seconds)
  useEffect(() => {
    const updateOrbits = () => {
      const now = Date.now();
      setSatellites(prev =>
        prev.map(sat => {
          // If ISS has live API coordinates, retain them with slight interpolation
          if (sat.id === 'iss' && sat.isLiveApi) {
            return sat;
          }
          return calculateSatellitePosition(sat, now);
        })
      );
    };

    const interval = setInterval(updateOrbits, 2500);
    return () => clearInterval(interval);
  }, []);

  // Fetch real-time live ISS position from wheretheiss.at
  useEffect(() => {
    let isMounted = true;
    const updateLiveISS = async () => {
      const liveData = await fetchLiveISSPosition();
      if (!isMounted || !liveData) return;

      setSatellites(prev =>
        prev.map(sat => {
          if (sat.id === 'iss') {
            const earthRadius = 6371;
            return {
              ...sat,
              lat: liveData.lat,
              lng: liveData.lng,
              altitudeKm: liveData.altitudeKm,
              velocityKmH: liveData.velocityKmH,
              altitudeRatio: 0.12 + (liveData.altitudeKm / earthRadius) * 1.5,
              isLiveApi: true
            };
          }
          return sat;
        })
      );
    };

    updateLiveISS();
    const issInterval = setInterval(updateLiveISS, 8000);
    return () => {
      isMounted = false;
      clearInterval(issInterval);
    };
  }, []);

  // Load NASA Events on Mount
  useEffect(() => {
    let isMounted = true;
    setIsLoadingNASA(true);
    fetchNASAEvents()
      .then(res => {
        if (isMounted) {
          setNasaEvents(res.events || []);
          setIsLoadingNASA(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setNasaError(err.message);
          setIsLoadingNASA(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  // Fetch telemetry for current coordinate (lat, lng)
  const loadTelemetry = useCallback(async (lat, lng) => {
    if (lat === undefined || lng === undefined) return;

    // Reset errors
    setWeatherError(null);
    setAirError(null);

    // Weather
    setIsLoadingWeather(true);
    fetchWeather(lat, lng)
      .then(data => {
        setWeatherData(data);
        setIsLoadingWeather(false);
      })
      .catch(err => {
        setWeatherError(err.message);
        setIsLoadingWeather(false);
      });

    // Air Quality
    setIsLoadingAir(true);
    fetchAirQuality(lat, lng)
      .then(data => {
        setAirQualityData(data);
        setIsLoadingAir(false);
      })
      .catch(err => {
        setAirError(err.message);
        setIsLoadingAir(false);
      });

    // Agricultural Soil & Food Inflation Telemetry
    setIsLoadingAgro(true);
    setAgroError(null);
    fetchAgroInflationData(lat, lng)
      .then(data => {
        setAgroData(data);
        setIsLoadingAgro(false);
      })
      .catch(err => {
        setAgroError(err.message);
        setIsLoadingAgro(false);
      });
  }, []);

  // Trigger telemetry when selected spot changes
  useEffect(() => {
    const target = selectedNASAEvent || selectedLocation;
    if (target && target.lat !== undefined && target.lng !== undefined) {
      loadTelemetry(target.lat, target.lng);
      soundEngine.playTuningSwoosh();
      setIsPanelOpen(true);
    }
  }, [selectedLocation, selectedNASAEvent, loadTelemetry]);

  // Handlers
  const handleSelectLocation = (loc) => {
    setSelectedSatellite(null);
    setSelectedNASAEvent(null);
    setSelectedLocation(loc);
  };

  const handleSelectNASAEvent = (event) => {
    setSelectedSatellite(null);
    setSelectedLocation(null);
    setSelectedNASAEvent(event);
    setActiveLayer('events');
  };

  const handleSelectSatellite = (sat) => {
    setSelectedLocation(null);
    setSelectedNASAEvent(null);
    setSelectedSatellite(sat);
    setActiveLayer('satellites');
    soundEngine.playTuningSwoosh();
    setIsPanelOpen(true);
  };

  const handleGlobeClick = ({ lat, lng }) => {
    setSelectedSatellite(null);
    setSelectedNASAEvent(null);
    setSelectedLocation({
      id: null,
      name: `Earth Station (${lat >= 0 ? '+' : ''}${lat.toFixed(2)}°, ${lng >= 0 ? '+' : ''}${lng.toFixed(2)}°)`,
      country: 'Global Coordinate',
      region: 'Custom Location',
      lat,
      lng
    });
  };

  const handleSelectRandom = () => {
    if (activeLayer === 'satellites' && satellites.length > 0) {
      const randomIdx = Math.floor(Math.random() * satellites.length);
      handleSelectSatellite(satellites[randomIdx]);
    } else if (activeLayer === 'events' && nasaEvents.length > 0) {
      const randomIdx = Math.floor(Math.random() * nasaEvents.length);
      handleSelectNASAEvent(nasaEvents[randomIdx]);
    } else {
      const randomIdx = Math.floor(Math.random() * CURATED_LOCATIONS.length);
      handleSelectLocation(CURATED_LOCATIONS[randomIdx]);
    }
  };

  const handleToggleAudio = () => {
    const newState = soundEngine.toggleSound();
    setIsAudioOn(newState);
  };

  const handleResetView = () => {
    setSelectedSatellite(null);
    setSelectedNASAEvent(null);
    setSelectedLocation(DEFAULT_LOCATION);
  };

  const handleRefresh = () => {
    const target = selectedSatellite || selectedNASAEvent || selectedLocation;
    if (target) {
      loadTelemetry(target.lat, target.lng);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050811]">
      
      {/* Top Header / Navigation HUD */}
      <Header
        activeLayer={activeLayer}
        onLayerChange={setActiveLayer}
        isAudioOn={isAudioOn}
        onToggleAudio={handleToggleAudio}
        onSelectLocation={handleSelectLocation}
        onSelectSatellite={handleSelectSatellite}
        satellites={satellites}
        onOpenAbout={() => setIsAboutOpen(true)}
        nasaEventsCount={nasaEvents.length}
        onResetView={handleResetView}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
      />

      {/* 3D Globe Explorer Canvas */}
      <GlobeView
        activeLayer={activeLayer}
        selectedLocation={selectedLocation}
        selectedNASAEvent={selectedNASAEvent}
        selectedSatellite={selectedSatellite}
        nasaEvents={nasaEvents}
        satellites={satellites}
        onSelectLocation={handleSelectLocation}
        onSelectNASAEvent={handleSelectNASAEvent}
        onSelectSatellite={handleSelectSatellite}
        onGlobeClickCoordinates={handleGlobeClick}
        autoRotate={autoRotate}
      />

      {/* Detail Tuning Panel */}
      {isPanelOpen && (
        <DetailPanel
          selectedLocation={selectedLocation}
          selectedNASAEvent={selectedNASAEvent}
          selectedSatellite={selectedSatellite}
          satellites={satellites}
          weatherData={weatherData}
          airQualityData={airQualityData}
          agroData={agroData}
          isLoadingWeather={isLoadingWeather}
          isLoadingAir={isLoadingAir}
          isLoadingAgro={isLoadingAgro}
          weatherError={weatherError}
          airError={airError}
          agroError={agroError}
          onRefresh={handleRefresh}
          onSelectRandom={handleSelectRandom}
          onSelectSatellite={handleSelectSatellite}
          onClickWiki={setActiveWikiTerm}
          activeLayer={activeLayer}
          onLayerChange={setActiveLayer}
          onClose={() => setIsPanelOpen(false)}
        />
      )}

      {/* Floating Active NASA Hazards Quick Drawer */}
      {activeLayer === 'events' && (
        <NASAEventsList
          events={nasaEvents}
          selectedEvent={selectedNASAEvent}
          onSelectEvent={handleSelectNASAEvent}
        />
      )}

      {/* Floating Satellites & Space Debris Quick Drawer */}
      {activeLayer === 'satellites' && (
        <SatellitesDrawer
          satellites={satellites}
          selectedSatellite={selectedSatellite}
          onSelectSatellite={handleSelectSatellite}
        />
      )}

      {/* Hackathon About Modal */}
      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      {/* Wikipedia Space & Science Popover Explanation */}
      {activeWikiTerm && (
        <WikiPopover
          termKey={activeWikiTerm}
          onClose={() => setActiveWikiTerm(null)}
        />
      )}

      {/* Live Continuous Telemetry Marquee Ticker */}
      <LiveTelemetryTicker
        satellites={satellites}
        nasaEvents={nasaEvents}
        onSelectLocation={handleSelectLocation}
        onSelectSatellite={handleSelectSatellite}
        onSelectNASAEvent={handleSelectNASAEvent}
      />

    </div>
  );
}
