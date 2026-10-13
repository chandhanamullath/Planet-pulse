import React, { useRef, useEffect, useState, useMemo } from 'react';
import Globe from 'react-globe.gl';
import { CURATED_LOCATIONS } from '../data/curatedLocations';
import { generateSatelliteOrbitPath } from '../data/satellitesData';

export function GlobeView({
  activeLayer,
  selectedLocation,
  selectedNASAEvent,
  selectedSatellite,
  nasaEvents,
  satellites,
  onSelectLocation,
  onSelectNASAEvent,
  onSelectSatellite,
  onGlobeClickCoordinates,
  autoRotate,
  showReticle = true
}) {
  const globeRef = useRef();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Track window size
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Configure Auto-rotation & Controls
  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    if (controls) {
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 0.6;
      controls.enableDamping = true;
      controls.dampingFactor = 0.1;
    }
  }, [autoRotate]);

  // Camera Fly-To when selectedLocation, selectedNASAEvent, or selectedSatellite changes
  useEffect(() => {
    if (!globeRef.current) return;
    const target = selectedSatellite || selectedNASAEvent || selectedLocation;
    if (target && target.lat !== undefined && target.lng !== undefined) {
      const targetAltitude = selectedSatellite ? 2.2 : 1.8;
      globeRef.current.pointOfView(
        {
          lat: target.lat,
          lng: target.lng,
          altitude: targetAltitude
        },
        1300
      );
    }
  }, [selectedLocation, selectedNASAEvent, selectedSatellite]);

  // Points dataset based on active layer and satellites
  const pointsData = useMemo(() => {
    const items = [];

    // 1. Earth ground stations (when not exclusively viewing satellites, or dimmed)
    if (activeLayer === 'weather' || activeLayer === 'airQuality') {
      const list = [...CURATED_LOCATIONS];
      if (selectedLocation && !selectedLocation.id) {
        list.push(selectedLocation);
      }
      const primaryColor = activeLayer === 'airQuality' ? '#10b981' : '#00f5d4';

      list.forEach(loc => {
        const isSelected = selectedLocation && selectedLocation.lat === loc.lat && selectedLocation.lng === loc.lng;
        items.push({
          ...loc,
          color: isSelected ? '#ffffff' : primaryColor,
          radius: isSelected ? 0.65 : 0.4,
          altitude: 0.02,
          isGround: true
        });
      });
    }

    // 2. NASA Events (when events layer is active or event is selected)
    if (activeLayer === 'events') {
      (nasaEvents || []).forEach(ev => {
        const isSelected = selectedNASAEvent?.id === ev.id;
        items.push({
          ...ev,
          color: isSelected ? '#ffffff' : '#f59e0b',
          radius: isSelected ? 0.75 : 0.55,
          altitude: 0.02,
          isNASA: true
        });
      });
    }

    // 3. Orbiting Satellites and Space Debris (visible in 'satellites' layer, or when one is selected, or as ambient orbital fleet)
    if (satellites && satellites.length > 0) {
      const showAllOrbits = activeLayer === 'satellites';
      satellites.forEach(sat => {
        const isSelected = selectedSatellite?.id === sat.id;
        // In satellites mode, show all; in other modes, show active satellites or selected
        if (showAllOrbits || isSelected || sat.type === 'active') {
          items.push({
            ...sat,
            isSatellite: true,
            color: isSelected 
              ? '#ffffff' 
              : (sat.type === 'debris' ? '#f43f5e' : (sat.color || '#00f5d4')),
            radius: isSelected ? 0.8 : (sat.type === 'debris' ? 0.45 : 0.6),
            altitude: sat.altitudeRatio || 0.18
          });
        }
      });
    }

    return items;
  }, [activeLayer, CURATED_LOCATIONS, selectedLocation, nasaEvents, selectedNASAEvent, satellites, selectedSatellite]);

  // 3D Orbital Trajectory Paths
  const pathsData = useMemo(() => {
    if (!satellites || satellites.length === 0) return [];

    if (activeLayer === 'satellites') {
      // Render orbital paths for all satellites and debris
      return satellites.map(sat => generateSatelliteOrbitPath(sat));
    }

    // In other layers, render only selected satellite's orbit
    if (selectedSatellite) {
      return [generateSatelliteOrbitPath(selectedSatellite)];
    }

    return [];
  }, [activeLayer, satellites, selectedSatellite]);

  // Rings dataset for Radio Garden pulsing effect on selected spot
  const ringsData = useMemo(() => {
    const target = selectedSatellite || selectedNASAEvent || selectedLocation;
    if (!target || target.lat === undefined || target.lng === undefined) return [];

    return [
      {
        lat: target.lat,
        lng: target.lng,
        altitude: target.altitudeRatio || 0.02,
        isNASA: Boolean(selectedNASAEvent),
        isSatellite: Boolean(selectedSatellite),
        isDebris: selectedSatellite?.type === 'debris'
      }
    ];
  }, [selectedLocation, selectedNASAEvent, selectedSatellite]);

  // Handle clicking a marker point
  const handlePointClick = (point) => {
    if (point.isSatellite) {
      onSelectSatellite(point);
    } else if (point.isNASA) {
      onSelectNASAEvent(point);
    } else {
      onSelectLocation(point);
    }
  };

  // Handle clicking anywhere on the globe surface
  const handleGlobeClick = ({ lat, lng }) => {
    onGlobeClickCoordinates({ lat, lng });
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#050811] space-stars">
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="/textures/earth-night.jpg"
        bumpImageUrl="/textures/earth-topology.png"
        backgroundColor="#050811"
        showAtmosphere={true}
        atmosphereColor="#00f5d4"
        atmosphereAltitude={0.22}
        // Points (Ground stations, NASA events, and Orbiting Satellites)
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointRadius="radius"
        pointAltitude="altitude"
        pointsMerge={false}
        pointLabel={d => {
          if (d.isSatellite) {
            const isDebris = d.type === 'debris';
            return `
              <div style="
                background: rgba(10, 17, 40, 0.95);
                color: #ffffff;
                border: 1px solid ${isDebris ? '#f43f5e' : '#00f5d4'};
                padding: 8px 14px;
                border-radius: 10px;
                font-size: 11px;
                font-family: sans-serif;
                box-shadow: 0 4px 20px rgba(0,0,0,0.8);
              ">
                <div style="color: ${isDebris ? '#f43f5e' : '#00f5d4'}; font-size: 9px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">
                  ${isDebris ? '⚠️ TRACKED SPACE DEBRIS' : '🛰️ ACTIVE ORBITAL SATELLITE'}
                </div>
                <strong style="display: block; font-size: 12px; margin-top: 2px;">${d.name}</strong>
                <div style="color: #94a3b8; font-size: 10px; margin-top: 3px; font-family: monospace;">
                  Alt: ${d.altitudeKm} km • Speed: ${d.velocityKmH?.toLocaleString()} km/h
                </div>
              </div>
            `;
          }

          return `
            <div style="
              background: rgba(10, 17, 40, 0.95);
              color: #ffffff;
              border: 1px solid ${d.isNASA ? '#f59e0b' : '#00f5d4'};
              padding: 6px 12px;
              border-radius: 8px;
              font-size: 11px;
              font-family: sans-serif;
              box-shadow: 0 4px 16px rgba(0,0,0,0.6);
            ">
              <strong>${d.title || d.name}</strong>
              <div style="color: #94a3b8; font-size: 10px; margin-top: 2px;">
                ${d.category || d.country || `${d.lat.toFixed(2)}°, ${d.lng.toFixed(2)}°`}
              </div>
            </div>
          `;
        }}
        onPointClick={handlePointClick}
        // 3D Orbital Trajectory Paths
        pathsData={pathsData}
        pathPoints="coords"
        pathPointLat={p => p[0]}
        pathPointLng={p => p[1]}
        pathPointAlt={p => p[2]}
        pathColor={d => d.color}
        pathStroke={1.6}
        pathDashLength={0.06}
        pathDashGap={0.03}
        pathDashAnimateTime={12000}
        // Rings for Radio Garden pulse
        ringsData={ringsData}
        ringLat="lat"
        ringLng="lng"
        ringAltitude="altitude"
        ringColor={d => t => {
          if (d.isDebris) return `rgba(244, 63, 94, ${1 - t})`;
          if (d.isSatellite) return `rgba(0, 245, 212, ${1 - t})`;
          if (d.isNASA) return `rgba(245, 158, 11, ${1 - t})`;
          return `rgba(0, 245, 212, ${1 - t})`;
        }}
        ringMaxRadius={5}
        ringPropagationSpeed={2.2}
        ringRepeatPeriod={1100}
        // Custom free-click on globe
        onGlobeClick={handleGlobeClick}
      />

      {/* Radio Garden Center Crosshair Reticle */}
      {showReticle && <div className="radio-reticle" />}
    </div>
  );
}
