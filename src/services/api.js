// PlanetPulse Live Public API Service
// Open-Meteo Weather API, Open-Meteo Air Quality API, NASA EONET v3

const cache = new Map();
const CACHE_TTL_MS = 60 * 1000; // 1 minute cache

function getCache(key) {
  const item = cache.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return item.data;
}

function setCache(key, data) {
  cache.set(key, { timestamp: Date.now(), data });
}

/**
 * Fetch Current Weather from Open-Meteo
 */
export async function fetchWeather(lat, lng) {
  const roundedLat = Number(lat).toFixed(4);
  const roundedLng = Number(lng).toFixed(4);
  const cacheKey = `weather_${roundedLat}_${roundedLng}`;

  const cached = getCache(cacheKey);
  if (cached) return cached;

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${roundedLat}&longitude=${roundedLng}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&hourly=temperature_2m,precipitation_probability&forecast_days=1&timezone=auto`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Weather API returned HTTP status ${res.status}`);
    }

    const json = await res.json();
    const result = {
      current: json.current,
      units: json.current_units,
      hourly: json.hourly,
      elevation: json.elevation,
      timezone: json.timezone,
      source: 'Open-Meteo Weather API',
      attributionUrl: 'https://open-meteo.com/'
    };

    setCache(cacheKey, result);
    return result;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Weather request timed out. Please check your connection.');
    }
    throw err;
  }
}

/**
 * Fetch Air Quality from Open-Meteo
 */
export async function fetchAirQuality(lat, lng) {
  const roundedLat = Number(lat).toFixed(4);
  const roundedLng = Number(lng).toFixed(4);
  const cacheKey = `air_${roundedLat}_${roundedLng}`;

  const cached = getCache(cacheKey);
  if (cached) return cached;

  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${roundedLat}&longitude=${roundedLng}&current=pm10,pm2_5,us_aqi&timezone=auto`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Air Quality API returned HTTP status ${res.status}`);
    }

    const json = await res.json();
    const result = {
      current: json.current,
      units: json.current_units,
      timezone: json.timezone,
      source: 'Open-Meteo Air Quality API',
      attributionUrl: 'https://open-meteo.com/en/docs/air-quality-api'
    };

    setCache(cacheKey, result);
    return result;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('Air quality request timed out. Please check your connection.');
    }
    throw err;
  }
}

/**
 * Fetch Real-Time Earth Events from NASA EONET v3
 */
export async function fetchNASAEvents() {
  const cacheKey = 'nasa_eonet_events';
  const cached = getCache(cacheKey);
  if (cached) return cached;

  const url = 'https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=40';

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`NASA EONET API returned HTTP status ${res.status}`);
    }

    const json = await res.json();
    const rawEvents = json.events || [];

    // Parse and normalize events
    const parsedEvents = rawEvents.map(ev => {
      // Latest geometry
      const geometries = ev.geometry || [];
      const latestGeo = geometries[geometries.length - 1] || geometries[0] || null;

      let lat = null;
      let lng = null;

      if (latestGeo && Array.isArray(latestGeo.coordinates)) {
        // In GeoJSON: coordinates are [longitude, latitude]
        lng = latestGeo.coordinates[0];
        lat = latestGeo.coordinates[1];
      }

      const primaryCategory = ev.categories && ev.categories.length > 0 ? ev.categories[0] : { id: 'other', title: 'Environmental Event' };

      return {
        id: ev.id,
        title: ev.title,
        description: ev.description || null,
        category: primaryCategory.title,
        categoryId: primaryCategory.id,
        lat,
        lng,
        date: latestGeo ? latestGeo.date : null,
        magnitudeValue: latestGeo ? latestGeo.magnitudeValue : null,
        magnitudeUnit: latestGeo ? latestGeo.magnitudeUnit : null,
        sources: (ev.sources || []).map(s => ({
          id: s.id,
          url: s.url
        })),
        isNASA: true
      };
    }).filter(ev => ev.lat !== null && ev.lng !== null && !isNaN(ev.lat) && !isNaN(ev.lng));

    const result = {
      events: parsedEvents,
      count: parsedEvents.length,
      source: 'NASA Earth Observatory Natural Event Tracker (EONET v3)',
      attributionUrl: 'https://eonet.gsfc.nasa.gov/'
    };

    setCache(cacheKey, result);
    return result;
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('NASA EONET request timed out. Please check your connection.');
    }
    throw err;
  }
}

/**
 * Fetch Live Real-Time ISS Orbital Telemetry
 */
export async function fetchLiveISSPosition() {
  const url = 'https://api.wheretheiss.at/v1/satellites/25544';
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`ISS tracker returned ${res.status}`);
    const data = await res.json();
    return {
      lat: data.latitude,
      lng: data.longitude,
      altitudeKm: Math.round(data.altitude),
      velocityKmH: Math.round(data.velocity),
      visibility: data.visibility,
      footprintKm: Math.round(data.footprint),
      timestamp: data.timestamp,
      source: 'WhereTheISS.at Live Telemetry',
      attributionUrl: 'https://wheretheiss.at/'
    };
  } catch (err) {
    clearTimeout(timeoutId);
    return null; // Return null so Keplerian fallback kicks in seamlessly
  }
}
