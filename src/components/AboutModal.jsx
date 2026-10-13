import React from 'react';
import { X, Globe2, Radio, ExternalLink, ShieldCheck, Sparkles, Layers, Cpu, Heart } from 'lucide-react';

export function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div className="glass-panel w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden border border-cyan-500/40 shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-[#00f5d4]/10 border border-[#00f5d4]/30 text-[#00f5d4]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-extrabold text-white tracking-wide">
                  PLANETPULSE
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#00f5d4]/20 text-[#00f5d4] font-bold border border-[#00f5d4]/40">
                  HACKATHON EDITION
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Radio Garden-Inspired 3D Planetary Environmental & Health Explorer
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-300 leading-relaxed">
          
          {/* Inspiration Section */}
          <div>
            <h3 className="text-xs uppercase font-mono font-bold text-[#00f5d4] tracking-wider mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#00f5d4]" />
              The Concept & Inspiration
            </h3>
            <p className="text-slate-300">
              Just as <strong className="text-white">Radio Garden</strong> allows anyone to spin a globe and tune into live radio stations around the world, <strong className="text-[#00f5d4]">PlanetPulse</strong> allows you to tune into Earth's living environmental signals. Rotate the planet to explore live weather, dangerous air pollutants (AQI, PM2.5), and active natural hazards tracked by NASA satellites.
            </p>
          </div>

          {/* Verified Data Sources */}
          <div>
            <h3 className="text-xs uppercase font-mono font-bold text-[#10b981] tracking-wider mb-2.5 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10b981]" />
              Verified Public Data Sources (Zero API Keys Required)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              {/* Source 1 */}
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <span className="font-bold text-white block">Open-Meteo Weather</span>
                <p className="text-[11px] text-slate-400">
                  Global high-resolution numerical weather prediction models for temperature, humidity, wind, and precipitation.
                </p>
                <a
                  href="https://open-meteo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#00f5d4] hover:underline flex items-center gap-1 font-mono"
                >
                  <span>open-meteo.com</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Source 2 */}
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <span className="font-bold text-white block">Open-Meteo Air Quality</span>
                <p className="text-[11px] text-slate-400">
                  Atmospheric chemistry models tracking particulate matter (PM2.5, PM10) and US Air Quality Index (AQI).
                </p>
                <a
                  href="https://open-meteo.com/en/docs/air-quality-api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#10b981] hover:underline flex items-center gap-1 font-mono"
                >
                  <span>air-quality-api</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Source 3 */}
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <span className="font-bold text-white block">NASA EONET v3</span>
                <p className="text-[11px] text-slate-400">
                  NASA's Earth Observatory Natural Event Tracker curating active wildfires, severe storms, and volcanoes.
                </p>
                <a
                  href="https://eonet.gsfc.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <span>eonet.gsfc.nasa.gov</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Source 4 */}
              <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                <span className="font-bold text-white block">Orbital & Space Debris</span>
                <p className="text-[11px] text-slate-400">
                  Live ISS tracking via WhereTheISS.at plus NORAD orbital mechanics for Earth observatories and debris hazards.
                </p>
                <a
                  href="https://wheretheiss.at/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-cyan-300 hover:underline flex items-center gap-1 font-mono"
                >
                  <span>wheretheiss.at</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Capabilities */}
          <div>
            <h3 className="text-xs uppercase font-mono font-bold text-cyan-300 tracking-wider mb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-300" />
              How to Explore
            </h3>
            <ul className="space-y-1.5 text-slate-300 list-disc list-inside">
              <li><strong className="text-white">Rotate & Zoom:</strong> Drag with mouse or trackpad to orbit around the globe. Scroll to zoom in/out.</li>
              <li><strong className="text-white">Click Any Marker:</strong> Tap any pulsing beacon or NASA event to fly the camera directly there.</li>
              <li><strong className="text-white">Click Anywhere on Earth:</strong> Tap anywhere on oceans or land to sample real-time weather and air quality for that exact coordinate.</li>
              <li><strong className="text-white">Radio Garden Sound:</strong> Turn on audio to enjoy the Web Audio ambient frequency synth with tuning feedback.</li>
              <li><strong className="text-white">Switch Layers:</strong> Toggle between Weather, Air Quality, and Earth Events at any time.</li>
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider mb-2 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-slate-400" />
              Built With
            </h3>
            <div className="flex flex-wrap gap-2">
              {['React 18', 'Vite 5', 'Three.js', 'React-Globe.gl', 'Web Audio API', 'Open-Meteo', 'NASA EONET', 'Lucide Icons'].map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Designed for Hackathon Demonstrations & Environmental Literacy
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-[#00f5d4]/20 hover:bg-[#00f5d4]/30 text-[#00f5d4] font-semibold text-xs transition-colors border border-[#00f5d4]/40"
          >
            Start Exploring
          </button>
        </div>

      </div>
    </div>
  );
}
