// Wikipedia Terminology Service with Bundled Fallbacks

export const WIKI_TERMS = {
  leo: {
    term: 'Low Earth Orbit (LEO)',
    slug: 'Low_Earth_orbit',
    summary: 'An Earth-centered orbit with an altitude of 2,000 km (1,200 mi) or less. Most artificial satellites and the International Space Station orbit here at speeds around 27,500 km/h.'
  },
  kessler: {
    term: 'Kessler Syndrome',
    slug: 'Kessler_syndrome',
    summary: 'A theoretical scenario where the density of space debris in Low Earth Orbit is high enough that collisions trigger a cascading chain reaction, rendering orbits unusable for generations.'
  },
  sunsync: {
    term: 'Sun-Synchronous Orbit',
    slug: 'Sun-synchronous_orbit',
    summary: 'A special polar orbit where a satellite passes over any given point on Earth at the exact same local solar time each day, providing consistent lighting for climate and weather imagery.'
  },
  spacedebris: {
    term: 'Space Debris',
    slug: 'Space_debris',
    summary: 'Defunct human-made objects in space—such as old satellites, spent rocket stages, and fragments from collisions—traveling at hypervelocity speeds exceeding 25,000 km/h.'
  },
  norad: {
    term: 'NORAD Catalog Number',
    slug: 'Satellite_Catalog_Number',
    summary: 'A sequential five-digit number assigned by the United States Space Command to track and identify all artificial objects in Earth orbit.'
  },
  conjunction: {
    term: 'Conjunction Assessment',
    slug: 'Space_situational_awareness',
    summary: 'The calculation of close orbital approaches between two space objects to determine collision risk and trigger evasive maneuvers if a collision path is detected.'
  },
  evapotranspiration: {
    term: 'Evapotranspiration (ET)',
    slug: 'Evapotranspiration',
    summary: 'The combined sum of water evaporation from the land surface and transpiration from plant leaves into the atmosphere. A critical indicator of crop water stress and drought.'
  },
  pm25: {
    term: 'PM2.5 (Fine Particulate Matter)',
    slug: 'Particulates',
    summary: 'Tiny airborne particles with a diameter of 2.5 micrometers or smaller (about 3% the diameter of human hair). They can penetrate deep into the lungs and bloodstream.'
  },
  aqi: {
    term: 'Air Quality Index (AQI)',
    slug: 'Air_quality_index',
    summary: 'A standardized color-coded scale used by government agencies (like the US EPA) to communicate how polluted the air currently is and associated health risks.'
  },
  soilmoisture: {
    term: 'Volumetric Soil Moisture',
    slug: 'Water_content',
    summary: 'The ratio of water volume to total soil volume (m³/m³). Optimal agricultural crop root growth occurs between 0.25 and 0.40 m³/m³; values below 0.15 indicate severe drought.'
  }
};

const wikiCache = new Map();

export async function fetchWikiExplanation(termKey) {
  const meta = WIKI_TERMS[termKey];
  if (!meta) return null;

  if (wikiCache.has(meta.slug)) {
    return wikiCache.get(meta.slug);
  }

  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${meta.slug}`, {
      headers: { 'Api-User-Agent': 'PlanetPulseHackathon/1.0 (educational app)' }
    });

    if (!res.ok) {
      const fallback = {
        title: meta.term,
        extract: meta.summary,
        url: `https://en.wikipedia.org/wiki/${meta.slug}`,
        thumbnail: null
      };
      wikiCache.set(meta.slug, fallback);
      return fallback;
    }

    const data = await res.json();
    const result = {
      title: data.title || meta.term,
      extract: data.extract || meta.summary,
      url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${meta.slug}`,
      thumbnail: data.thumbnail?.source || null
    };

    wikiCache.set(meta.slug, result);
    return result;
  } catch {
    const fallback = {
      title: meta.term,
      extract: meta.summary,
      url: `https://en.wikipedia.org/wiki/${meta.slug}`,
      thumbnail: null
    };
    wikiCache.set(meta.slug, fallback);
    return fallback;
  }
}
