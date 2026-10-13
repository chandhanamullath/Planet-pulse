import React from 'react';
import { Radio, Satellite, Flame, Wind, Sparkles } from 'lucide-react';

export function LiveTelemetryTicker({ 
  satellites = [], 
  onSelectLocation, 
  onSelectSatellite, 
  onSelectNASAEvent,
  nasaEvents = [] 
}) {
  const tickerItems = [
    {
      id: 'tick-iss',
      type: 'sat',
      icon: <Satellite className="w-3 h-3 text-[#00f5d4]" />,
      text: 'ISS: 27,570 km/h • High-resolution Earth observation active',
      tag: 'LEO Orbit',
      tagColor: 'text-[#00f5d4] bg-[#00f5d4]/10',
      action: () => {
        const iss = satellites.find(s => s.id === 'iss');
        if (iss) onSelectSatellite(iss);
      }
    },
    {
      id: 'tick-tokyo',
      type: 'city',
      icon: <Radio className="w-3 h-3 text-[#10b981]" />,
      text: 'Tokyo Station: Pacific Island Biosphere Telemetry Online',
      tag: 'Live Station',
      tagColor: 'text-[#10b981] bg-emerald-500/10',
      action: () => onSelectLocation({ id: 'tokyo', name: 'Tokyo', country: 'Japan', lat: 35.6762, lng: 139.6503 })
    },
    {
      id: 'tick-envisat',
      type: 'debris',
      icon: <span className="text-[11px]">⚠️</span>,
      text: 'Envisat Derelict: 8,200 kg mega-satellite tumbling at 768 km altitude',
      tag: 'Space Debris',
      tagColor: 'text-rose-400 bg-rose-500/10',
      action: () => {
        const env = satellites.find(s => s.id === 'envisat');
        if (env) onSelectSatellite(env);
      }
    },
    {
      id: 'tick-reykjavik',
      type: 'city',
      icon: <Wind className="w-3 h-3 text-cyan-300" />,
      text: 'Reykjavik, Iceland: Pristine Sub-Arctic Air Quality (AQI 12)',
      tag: 'Pristine Air',
      tagColor: 'text-cyan-300 bg-cyan-500/10',
      action: () => onSelectLocation({ id: 'reykjavik', name: 'Reykjavik', country: 'Iceland', lat: 64.1466, lng: -21.9426 })
    },
    {
      id: 'tick-sentinel',
      type: 'sat',
      icon: <Satellite className="w-3 h-3 text-[#34d399]" />,
      text: 'Sentinel-2A: Multispectral Copernicus radar sweep over land biomes',
      tag: 'ESA Copernicus',
      tagColor: 'text-emerald-300 bg-emerald-500/10',
      action: () => {
        const s2 = satellites.find(s => s.id === 'sentinel-2a');
        if (s2) onSelectSatellite(s2);
      }
    },
    {
      id: 'tick-nasa',
      type: 'nasa',
      icon: <Flame className="w-3 h-3 text-amber-400" />,
      text: `NASA EONET: ${nasaEvents.length || 'Active'} worldwide satellite hazard alerts open`,
      tag: 'NASA Satellite',
      tagColor: 'text-amber-300 bg-amber-500/10',
      action: () => {
        if (nasaEvents.length > 0) onSelectNASAEvent(nasaEvents[0]);
      }
    },
    {
      id: 'tick-amazon',
      type: 'city',
      icon: <Sparkles className="w-3 h-3 text-[#00f5d4]" />,
      text: 'Manaus (Amazon Rainforest): Equatorial humidity & carbon flux basin',
      tag: 'Amazon Basin',
      tagColor: 'text-[#00f5d4] bg-[#00f5d4]/10',
      action: () => onSelectLocation({ id: 'manaus', name: 'Manaus (Amazon)', country: 'Brazil', lat: -3.1190, lng: -60.0217 })
    }
  ];

  // Duplicate for seamless infinite loop
  const displayItems = [...tickerItems, ...tickerItems];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 h-7 bg-slate-950/90 border-t border-cyan-500/20 backdrop-blur-md overflow-hidden flex items-center pointer-events-auto">
      {/* Live Badge indicator */}
      <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-900 border-r border-slate-800 text-[10px] font-mono shrink-0 z-10 text-[#00f5d4] font-bold">
        <span className="flex h-1.5 w-1.5 rounded-full bg-[#00f5d4] animate-ping" />
        <span>LIVE TELEMETRY</span>
      </div>

      {/* Marquee Content */}
      <div className="overflow-hidden flex-1 relative h-full flex items-center">
        <div className="animate-marquee items-center gap-6">
          {displayItems.map((item, idx) => (
            <button
              key={`${item.id}-${idx}`}
              onClick={item.action}
              className="flex items-center gap-2 hover:bg-slate-800/60 px-2 py-0.5 rounded-md text-[11px] text-slate-300 hover:text-white transition-colors shrink-0"
              title="Click to track in 3D"
            >
              {item.icon}
              <span className="font-medium font-sans">{item.text}</span>
              <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${item.tagColor}`}>
                {item.tag}
              </span>
              <span className="text-slate-700 text-xs">•</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
