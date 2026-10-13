// Orbital Catalog: Earth Observation Satellites & Tracked Space Debris

export const SATELLITE_CATALOG = [
  // Active Environmental & Science Satellites
  {
    id: 'iss',
    noradId: 25544,
    name: 'International Space Station (ISS)',
    type: 'active',
    operator: 'NASA / ESA / JAXA / CSA',
    orbitType: 'LEO (Low Earth Orbit)',
    inclination: 51.64,
    altitudeKm: 420,
    velocityKmH: 27570,
    periodMin: 92.9,
    launchYear: 1998,
    massKg: 450000,
    description: 'Carries high-resolution Earth climate instruments: ECOSTRESS (plant water stress), GEDI (forest canopy structure), and DESIS (hyperspectral imaging).',
    debrisRisk: 'Low (Active collision avoidance maneuvers enabled)',
    color: '#00f5d4'
  },
  {
    id: 'terra',
    noradId: 25994,
    name: 'Terra (EOS AM-1)',
    type: 'active',
    operator: 'NASA Goddard',
    orbitType: 'Sun-Synchronous Polar',
    inclination: 98.2,
    altitudeKm: 705,
    velocityKmH: 27000,
    periodMin: 98.8,
    launchYear: 1999,
    massKg: 5190,
    description: 'Flagship NASA Earth Observing System. Measures global wildfires, atmospheric carbon monoxide, aerosols, and cloud radiative forcing via MODIS and ASTER instruments.',
    debrisRisk: 'Nominal',
    color: '#10b981'
  },
  {
    id: 'aqua',
    noradId: 27424,
    name: 'Aqua (EOS PM-1)',
    type: 'active',
    operator: 'NASA Goddard',
    orbitType: 'Sun-Synchronous Polar',
    inclination: 98.2,
    altitudeKm: 705,
    velocityKmH: 27000,
    periodMin: 98.8,
    launchYear: 2002,
    massKg: 3117,
    description: 'Tracks Earth water cycle, global humidity, ocean temperatures, and sea ice coverage using AIRS, AMSU, and CERES instruments.',
    debrisRisk: 'Nominal',
    color: '#06b6d4'
  },
  {
    id: 'sentinel-2a',
    noradId: 40697,
    name: 'Sentinel-2A',
    type: 'active',
    operator: 'ESA (Copernicus Programme)',
    orbitType: 'Sun-Synchronous Polar',
    inclination: 98.62,
    altitudeKm: 786,
    velocityKmH: 26850,
    periodMin: 100.6,
    launchYear: 2015,
    massKg: 1140,
    description: 'European high-resolution multispectral Earth observation satellite providing rapid response telemetry for floods, volcanic eruptions, and forest changes.',
    debrisRisk: 'Nominal',
    color: '#34d399'
  },
  {
    id: 'landsat-9',
    noradId: 49260,
    name: 'Landsat 9',
    type: 'active',
    operator: 'NASA / USGS',
    orbitType: 'Sun-Synchronous Polar',
    inclination: 98.2,
    altitudeKm: 705,
    velocityKmH: 27000,
    periodMin: 98.8,
    launchYear: 2021,
    massKg: 2713,
    description: 'Monitors global land use, surface water reserves, agricultural crop health, and glacial retreat with thermal infrared and multi-spectral sensors.',
    debrisRisk: 'Nominal',
    color: '#38bdf8'
  },
  {
    id: 'noaa-20',
    noradId: 43013,
    name: 'NOAA-20 (JPSS-1)',
    type: 'active',
    operator: 'NOAA / NASA',
    orbitType: 'Sun-Synchronous Polar',
    inclination: 98.7,
    altitudeKm: 824,
    velocityKmH: 26700,
    periodMin: 101.4,
    launchYear: 2017,
    massKg: 2540,
    description: 'Primary operational meteorological satellite feeding global numerical weather prediction models and atmospheric ozone soundings.',
    debrisRisk: 'Nominal',
    color: '#2dd4bf'
  },
  {
    id: 'hubble',
    noradId: 20580,
    name: 'Hubble Space Telescope',
    type: 'active',
    operator: 'NASA / STScI',
    orbitType: 'LEO Low Inclination',
    inclination: 28.47,
    altitudeKm: 535,
    velocityKmH: 27300,
    periodMin: 95.4,
    launchYear: 1990,
    massKg: 11110,
    description: 'Astronomical observatory operating above Earth atmospheric distortion, regularly surveying Earth upper atmosphere aurora and solar radiation.',
    debrisRisk: 'Elevated (No onboard propulsion for evasion maneuvers)',
    color: '#a78bfa'
  },

  // Tracked Space Debris & Derelict Objects
  {
    id: 'envisat',
    noradId: 27386,
    name: 'Envisat (Dead Derelict Mega-Satellite)',
    type: 'debris',
    operator: 'Inactive (ESA)',
    orbitType: 'Sun-Synchronous Polar',
    inclination: 98.54,
    altitudeKm: 768,
    velocityKmH: 26900,
    periodMin: 100.2,
    launchYear: 2002,
    massKg: 8211,
    description: 'Largest civilian space debris object in LEO (8.2 tons). Inactive since 2012. Classified by space agencies as a top collision hazard that could trigger the Kessler syndrome.',
    debrisRisk: 'CRITICAL (Dead uncontrolled derelict in high-traffic orbital shell)',
    color: '#f43f5e'
  },
  {
    id: 'cosmos-1408',
    noradId: 49450,
    name: 'Cosmos-1408 Tracked Fragment #49450',
    type: 'debris',
    operator: 'Space Debris (Disintegrated)',
    orbitType: 'LEO High Inclination',
    inclination: 82.5,
    altitudeKm: 485,
    velocityKmH: 27450,
    periodMin: 94.2,
    launchYear: 1982,
    massKg: 12,
    description: 'High-velocity fragmentation debris created during an anti-satellite missile test. Frequently forces the ISS and commercial spacecraft to perform conjunction avoidance burns.',
    debrisRisk: 'HIGH CONJUNCTION HAZARD (Hypervelocity fragment, speed >7.6 km/s)',
    color: '#f59e0b'
  },
  {
    id: 'fengyun-1c',
    noradId: 29712,
    name: 'Fengyun-1C Debris Cluster Lead',
    type: 'debris',
    operator: 'Space Debris (Disintegrated)',
    orbitType: 'Sun-Synchronous Polar',
    inclination: 98.6,
    altitudeKm: 852,
    velocityKmH: 26600,
    periodMin: 102.1,
    launchYear: 1999,
    massKg: 8,
    description: 'Persistent orbital debris fragment from the largest satellite breakup in recorded history (over 3,400 tracked fragments in polar orbit).',
    debrisRisk: 'HIGH (Long-lived orbit: estimated lifetime >35 years)',
    color: '#fb7185'
  },
  {
    id: 'sl16-rocket',
    noradId: 22676,
    name: 'SL-16 Zenit-2 Spent Rocket Stage',
    type: 'debris',
    operator: 'Derelict Booster',
    orbitType: 'LEO Polar',
    inclination: 71.0,
    altitudeKm: 840,
    velocityKmH: 26650,
    periodMin: 101.8,
    launchYear: 1993,
    massKg: 9000,
    description: '9,000 kg abandoned rocket upper stage tumbling through Low Earth Orbit. Carries unvented propellant tanks susceptible to thermal expansion rupture.',
    debrisRisk: 'CRITICAL (Derelict rocket body with high collision cross-section)',
    color: '#e11d48'
  }
];

// Calculate orbital position based on timestamp and Keplerian elements
export function calculateSatellitePosition(sat, timestampMs = Date.now()) {
  const earthRadius = 6371;
  // Scaled 3D globe altitude
  const altRatio = 0.12 + (sat.altitudeKm / earthRadius) * 1.5;

  // Angular speed in radians per millisecond
  const periodMs = sat.periodMin * 60 * 1000;
  const angularSpeed = (2 * Math.PI) / periodMs;

  // Mean anomaly with offset per satellite id
  const idHash = sat.noradId % 360;
  const u = (angularSpeed * timestampMs + (idHash * Math.PI) / 180) % (2 * Math.PI);

  const incRad = (sat.inclination * Math.PI) / 180;

  // Latitude from inclination and orbital phase
  const lat = Math.asin(Math.sin(incRad) * Math.sin(u)) * (180 / Math.PI);

  // Longitude with Earth rotation compensation (Earth rotates ~360 deg in 24h = 86400000ms)
  const earthRotationDeg = ((timestampMs % 86400000) / 86400000) * 360;
  let lng = (Math.atan2(Math.cos(incRad) * Math.sin(u), Math.cos(u)) * (180 / Math.PI) + idHash - earthRotationDeg) % 360;
  if (lng > 180) lng -= 360;
  if (lng < -180) lng += 360;

  return {
    ...sat,
    lat,
    lng,
    altitudeRatio: altRatio
  };
}

// Generate 3D orbital ellipse path points for Three.js / Globe.gl
export function generateSatelliteOrbitPath(sat, timestampMs = Date.now()) {
  const points = [];
  const earthRadius = 6371;
  const altRatio = 0.12 + (sat.altitudeKm / earthRadius) * 1.5;
  const incRad = (sat.inclination * Math.PI) / 180;
  const idHash = sat.noradId % 360;
  const earthRotationDeg = ((timestampMs % 86400000) / 86400000) * 360;

  for (let step = 0; step <= 360; step += 5) {
    const u = (step * Math.PI) / 180;
    const lat = Math.asin(Math.sin(incRad) * Math.sin(u)) * (180 / Math.PI);
    let lng = (Math.atan2(Math.cos(incRad) * Math.sin(u), Math.cos(u)) * (180 / Math.PI) + idHash - earthRotationDeg) % 360;
    if (lng > 180) lng -= 360;
    if (lng < -180) lng += 360;
    points.push([lat, lng, altRatio]);
  }

  return {
    id: `orbit_${sat.id}`,
    name: sat.name,
    color: sat.type === 'debris' ? 'rgba(244, 63, 94, 0.45)' : 'rgba(0, 245, 212, 0.45)',
    coords: points
  };
}

// Haversine distance helper (km)
export function getGroundDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find satellites currently overhead a given ground coordinate (footprint range ~2200 km)
export function getOverheadSatellites(lat, lng, currentSatellites) {
  if (lat === undefined || lng === undefined) return [];
  const maxFootprintKm = 2400; // Horizon visibility footprint for LEO

  return currentSatellites
    .map(sat => {
      const distanceKm = getGroundDistanceKm(lat, lng, sat.lat, sat.lng);
      return {
        ...sat,
        groundDistanceKm: Math.round(distanceKm)
      };
    })
    .filter(sat => sat.groundDistanceKm <= maxFootprintKm)
    .sort((a, b) => a.groundDistanceKm - b.groundDistanceKm);
}
