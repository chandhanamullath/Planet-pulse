# 🌍 PlanetPulse — Interactive 3D Environmental & Health Explorer

> **Inspired by Radio Garden:** Spin the globe, tune into Earth's living pulses, and explore real-time weather, air quality, and natural hazard events across the planet.

## 🛰️ Core Features

- **Interactive 3D Earth Globe:**
  - Orbit, drag, and zoom around a high-resolution dark-mode Earth globe powered by WebGL/Three.js.
  - Centered Radio Garden target reticle and pulsing radar beacons.
  - Smooth camera fly-to animations when clicking any city or event.
  - Click anywhere on the globe (oceans or land) to sample telemetry for that exact latitude and longitude.

- **🌦️ Weather Layer (Open-Meteo API):**
  - Live temperature with quick **°C / °F** toggle switch.
  - WMO weather condition code interpretation (e.g. Clear Sky, Rain Deluge, Thunderstorm).
  - Relative humidity (%), precipitation (mm), wind speed (km/h), and elevation (m).
  - Live observation timestamp.

- **💨 Air Quality Layer (Open-Meteo Air Quality API):**
  - EPA standard **US AQI score** with color-coded severity badges (Good, Moderate, Unhealthy for Sensitive Groups, Unhealthy, Very Unhealthy, Hazardous).
  - Particulate matter breakdown: **PM2.5** and **PM10** with progress gauges and WHO health safety thresholds.
  - Actionable health guidance for sensitive groups and the general public.

- **🔥 Earth Events Layer (NASA EONET v3):**
  - Live natural hazards tracked by NASA satellites: active **wildfires**, **severe storms**, **active volcanoes**, and **iceberg/sea ice** events.
  - Quick drawer at the bottom right listing active worldwide incidents.
  - Direct links to official incident sources (IRWIN, NOAA, USGS, InciWeb).

- **🛰️ Orbiting Satellites & Space Debris Layer:**
  - Real-time 3D tracking of active Earth science observatories floating above the globe (**ISS, Terra, Aqua, Sentinel-2A, Landsat 9, NOAA-20, Hubble**).
  - Live real-time ISS telemetry (altitude, velocity, sub-solar coordinates) streamed from **WhereTheISS.at**.
  - Tracked **hypervelocity space debris** & derelict rocket bodies (**Envisat 8.2-ton derelict, Cosmos-1408 fragment, Fengyun-1C polar cloud, SL-16 rocket stage**).
  - Glowing 3D animated **orbital paths** curving around the planet in Three.js space.
  - **Overhead Pass Tracker**: When any city on Earth is selected, computes which satellites or debris are currently passing within line-of-sight range (~2,400 km).

- **📻 Radio Garden Atmospheric Sound Engine:**
  - Synthesized ambient cosmic hum and radio frequency sweep chirps using the browser's native **Web Audio API**.
  - No external MP3 files or audio loading required.
  - Toggle on/off with one click via the top bar sound control.

- **🔍 Search & Discovery:**
  - Search any city, country, or satellite/debris by name or NORAD ID with instant autocomplete.
  - "Random Station" button to spin the globe dial to an unexpected spot on Earth or in orbit.

---

## 📡 Public APIs Used & Verification Status

All APIs in this project are **100% public, free, and require NO API keys**:

| API | Provider | Verified Endpoint | Key Required? | Status |
| :--- | :--- | :--- | :---: | :---: |
| **Weather** | Open-Meteo | `https://api.open-meteo.com/v1/forecast` | ❌ None | ✅ Verified Live |
| **Air Quality** | Open-Meteo | `https://air-quality-api.open-meteo.com/v1/air-quality` | ❌ None | ✅ Verified Live |
| **Earth Events** | NASA EONET | `https://eonet.gsfc.nasa.gov/api/v3/events` | ❌ None | ✅ Verified Live |
| **Live ISS Orbit** | WhereTheISS.at | `https://api.wheretheiss.at/v1/satellites/25544` | ❌ None | ✅ Verified Live |

### API Limitations & Notes
1. **Open-Meteo Rate Limits:** Free tier allows up to 10,000 daily API calls. The app includes an in-memory client cache (`60s TTL`) to avoid unnecessary repeat queries when switching between stations.
2. **NASA EONET:** Event counts depend on active global satellite observations. Coordinates represent the latest recorded geometry of the incident.
3. **Offline / Network Resilience:** If an API endpoint times out or is unreachable, the detail panel displays a dedicated error card with an instant **"Retry Connection"** button rather than crashing.

---

## 📁 Project Architecture

```
planetpulse/
├── .npmrc                   # Mirror configuration preventing ECONNRESET
├── package.json             # React 18, Vite 5, Three.js, React-Globe.gl, Lucide
├── vite.config.js           # Vite dev server configuration (port 3000)
├── tailwind.config.js       # Cyberpunk dark theme with cyan & green accents
├── postcss.config.js        # PostCSS configuration
├── index.html               # Fonts & HTML entry point
├── public/
│   ├── favicon.svg          # Custom glowing radar SVG favicon
│   └── textures/            # Locally bundled high-res Earth textures
│       ├── earth-night.jpg
│       ├── earth-blue-marble.jpg
│       └── earth-topology.png
└── src/
    ├── main.jsx             # React DOM root render
    ├── App.jsx              # Main state orchestration
    ├── index.css            # Tailwind + Glassmorphism & Radar animations
    ├── data/
    │   └── curatedLocations.js  # 45+ global listening posts across all continents
    ├── services/
    │   ├── api.js           # Open-Meteo & NASA EONET services with caching
    │   └── audio.js         # Web Audio API Radio Garden ambient synthesizer
    ├── components/
    │   ├── Header.jsx       # Top navigation HUD, live clock, search & layer pills
    │   ├── GlobeView.jsx    # 3D interactive Globe with pulsing rings & camera fly-to
    │   ├── DetailPanel.jsx  # Telemetry station card for Weather, AQI & NASA Events
    │   ├── NASAEventsList.jsx # Active NASA natural hazards drawer
    │   └── AboutModal.jsx   # Hackathon presentation & attribution dialog
    └── utils/
        └── weatherCodes.js  # WMO weather codes and US EPA AQI categorization
```

---

## 🏆 Hackathon Presentation Tips

1. **Start with the Audio:** Click the **"Sound Off"** pill in the top right to turn on the atmospheric Radio Garden synth. It creates immediate immersion.
2. **Demo the Radio Garden Dial:** Click **"Spin to Random Station"** or click on any glowing dot. Notice the smooth camera fly-to animation and the pulsing radar ring.
3. **Demo the Air Quality Layer:** Switch to **Air Quality**. Show cities with good AQI (e.g. Reykjavik or Longyearbyen) vs industrial basins (e.g. New Delhi) to show live EPA rating badges.
4. **Demo the NASA Live Hazards:** Switch to **Earth Events**. Open the **Active NASA Hazards** drawer, click an active wildfire or storm, and show the official incident source links (IRWIN/NOAA).
5. **Showcase Free Coordinates:** Click anywhere on the open Pacific Ocean or Sahara Desert to show that PlanetPulse can sample atmospheric data at any coordinate on Earth.
