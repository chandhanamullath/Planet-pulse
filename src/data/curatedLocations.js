// Curated global environmental monitoring stations inspired by Radio Garden's global network
export const CURATED_LOCATIONS = [
  // Europe
  { id: 'london', name: 'London', country: 'United Kingdom', lat: 51.5074, lng: -0.1278, region: 'Europe', bio: 'Temperate Maritime' },
  { id: 'paris', name: 'Paris', country: 'France', lat: 48.8566, lng: 2.3522, region: 'Europe', bio: 'Western European Basin' },
  { id: 'berlin', name: 'Berlin', country: 'Germany', lat: 52.5200, lng: 13.4050, region: 'Europe', bio: 'Central European Lowlands' },
  { id: 'rome', name: 'Rome', country: 'Italy', lat: 41.9028, lng: 12.4964, region: 'Europe', bio: 'Mediterranean Basin' },
  { id: 'madrid', name: 'Madrid', country: 'Spain', lat: 40.4168, lng: -3.7038, region: 'Europe', bio: 'Iberian Plateau' },
  { id: 'reykjavik', name: 'Reykjavik', country: 'Iceland', lat: 64.1466, lng: -21.9426, region: 'Europe', bio: 'Sub-Arctic Geothermal' },
  { id: 'svalbard', name: 'Longyearbyen (Svalbard)', country: 'Norway', lat: 78.2232, lng: 15.6267, region: 'Europe', bio: 'High Arctic Tundra' },
  { id: 'athens', name: 'Athens', country: 'Greece', lat: 37.9838, lng: 23.7275, region: 'Europe', bio: 'Aegean Coastal' },

  // North America
  { id: 'new-york', name: 'New York City', country: 'United States', lat: 40.7128, lng: -74.0060, region: 'North America', bio: 'Atlantic Coastal Urban' },
  { id: 'san-francisco', name: 'San Francisco', country: 'United States', lat: 37.7749, lng: -122.4194, region: 'North America', bio: 'Pacific Coastal Marine' },
  { id: 'los-angeles', name: 'Los Angeles', country: 'United States', lat: 34.0522, lng: -118.2437, region: 'North America', bio: 'Mediterranean Semi-Arid' },
  { id: 'chicago', name: 'Chicago', country: 'United States', lat: 41.8781, lng: -87.6298, region: 'North America', bio: 'Great Lakes Basin' },
  { id: 'toronto', name: 'Toronto', country: 'Canada', lat: 43.6532, lng: -79.3832, region: 'North America', bio: 'Lake Ontario Basin' },
  { id: 'vancouver', name: 'Vancouver', country: 'Canada', lat: 49.2827, lng: -123.1207, region: 'North America', bio: 'Pacific Northwest Temperate' },
  { id: 'mexico-city', name: 'Mexico City', country: 'Mexico', lat: 19.4326, lng: -99.1332, region: 'North America', bio: 'High-Altitude Valley' },
  { id: 'honolulu', name: 'Honolulu', country: 'United States', lat: 21.3069, lng: -157.8583, region: 'North America', bio: 'Tropical Pacific Archipelago' },
  { id: 'nuuk', name: 'Nuuk', country: 'Greenland', lat: 64.1814, lng: -51.6941, region: 'North America', bio: 'Arctic Fjord Coast' },

  // South America
  { id: 'sao-paulo', name: 'São Paulo', country: 'Brazil', lat: -23.5505, lng: -46.6333, region: 'South America', bio: 'Subtropical Highland' },
  { id: 'buenos-aires', name: 'Buenos Aires', country: 'Argentina', lat: -34.6037, lng: -58.3816, region: 'South America', bio: 'Pampas Estuary' },
  { id: 'manaus', name: 'Manaus (Amazon)', country: 'Brazil', lat: -3.1190, lng: -60.0217, region: 'South America', bio: 'Amazonian Equatorial Rainforest' },
  { id: 'santiago', name: 'Santiago', country: 'Chile', lat: -33.4489, lng: -70.6693, region: 'South America', bio: 'Andean Mediterranean Basin' },
  { id: 'bogota', name: 'Bogotá', country: 'Colombia', lat: 4.7110, lng: -74.0721, region: 'South America', bio: 'Andean Montane Savanna' },
  { id: 'galapagos', name: 'Puerto Ayora (Galápagos)', country: 'Ecuador', lat: -0.7436, lng: -90.3138, region: 'South America', bio: 'Volcanic Equatorial Marine' },

  // Asia
  { id: 'tokyo', name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503, region: 'Asia', bio: 'Pacific Island Megacity' },
  { id: 'seoul', name: 'Seoul', country: 'South Korea', lat: 37.5665, lng: 126.9780, region: 'Asia', bio: 'Korean Continental Basin' },
  { id: 'beijing', name: 'Beijing', country: 'China', lat: 39.9042, lng: 116.4074, region: 'Asia', bio: 'North China Plain' },
  { id: 'shanghai', name: 'Shanghai', country: 'China', lat: 31.2304, lng: 121.4737, region: 'Asia', bio: 'Yangtze Delta' },
  { id: 'new-delhi', name: 'New Delhi', country: 'India', lat: 28.6139, lng: 77.2090, region: 'Asia', bio: 'Indo-Gangetic Plain' },
  { id: 'mumbai', name: 'Mumbai', country: 'India', lat: 19.0760, lng: 72.8777, region: 'Asia', bio: 'Arabian Sea Coastal' },
  { id: 'bangkok', name: 'Bangkok', country: 'Thailand', lat: 13.7563, lng: 100.5018, region: 'Asia', bio: 'Chao Phraya Delta' },
  { id: 'singapore', name: 'Singapore', country: 'Singapore', lat: 1.3521, lng: 103.8198, region: 'Asia', bio: 'Equatorial Island Biosphere' },
  { id: 'jakarta', name: 'Jakarta', country: 'Indonesia', lat: -6.2088, lng: 106.8456, region: 'Asia', bio: 'Java Sea Delta' },
  { id: 'dubai', name: 'Dubai', country: 'United Arab Emirates', lat: 25.2048, lng: 55.2708, region: 'Asia', bio: 'Arabian Gulf Arid Coastal' },
  { id: 'lhasa', name: 'Lhasa', country: 'China', lat: 29.6525, lng: 91.1721, region: 'Asia', bio: 'Tibetan Plateau Alpine' },

  // Africa
  { id: 'cairo', name: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357, region: 'Africa', bio: 'Nile Delta Arid' },
  { id: 'nairobi', name: 'Nairobi', country: 'Kenya', lat: -1.2921, lng: 36.8219, region: 'Africa', bio: 'Great Rift Valley Plateau' },
  { id: 'cape-town', name: 'Cape Town', country: 'South Africa', lat: -33.9249, lng: 18.4241, region: 'Africa', bio: 'Cape Floral Mediterranean' },
  { id: 'lagos', name: 'Lagos', country: 'Nigeria', lat: 6.5244, lng: 3.3792, region: 'Africa', bio: 'Gulf of Guinea Mangrove Coast' },
  { id: 'addis-ababa', name: 'Addis Ababa', country: 'Ethiopia', lat: 9.0320, lng: 38.7469, region: 'Africa', bio: 'Ethiopian Highlands Afromontane' },
  { id: 'marrakech', name: 'Marrakech', country: 'Morocco', lat: 31.6295, lng: -7.9811, region: 'Africa', bio: 'Atlas Foothills Semi-Arid' },

  // Oceania
  { id: 'sydney', name: 'Sydney', country: 'Australia', lat: -33.8688, lng: 151.2093, region: 'Oceania', bio: 'Tasman Sea Coastal' },
  { id: 'cairns', name: 'Cairns (Reef)', country: 'Australia', lat: -16.9203, lng: 145.7710, region: 'Oceania', bio: 'Great Barrier Reef Marine' },
  { id: 'auckland', name: 'Auckland', country: 'New Zealand', lat: -36.8485, lng: 174.7633, region: 'Oceania', bio: 'North Island Volcanic Field' },
  { id: 'suva', name: 'Suva', country: 'Fiji', lat: -18.1416, lng: 178.4419, region: 'Oceania', bio: 'South Pacific Coral Archipelago' },

  // Polar Extremes
  { id: 'mcmurdo', name: 'McMurdo Station', country: 'Antarctica', lat: -77.8419, lng: 166.6863, region: 'Antarctica', bio: 'Ross Ice Shelf Polar Desert' }
];

export const DEFAULT_LOCATION = CURATED_LOCATIONS.find(loc => loc.id === 'tokyo') || CURATED_LOCATIONS[0];
