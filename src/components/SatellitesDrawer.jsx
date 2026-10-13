import React, { useState } from 'react';
import { Satellite, ChevronUp, ChevronDown, AlertTriangle, ShieldCheck, Orbit, Radio } from 'lucide-react';

export function SatellitesDrawer({ satellites, selectedSatellite, onSelectSatellite }) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'debris'

  if (!satellites || satellites.length === 0) return null;

  const filteredSatellites = satellites.filter(s => {
    if (filter === 'active') return s.type === 'active';
    if (filter === 'debris') return s.type === 'debris';
    return true;
  });

  const activeCount = satellites.filter(s => s.type === 'active').length;
  const debrisCount = satellites.filter(s => s.type === 'debris').length;

  return (
    <div className="absolute bottom-10 right-4 z-20 max-w-[360px] pointer-events-auto">
      <div className="glass-panel rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl">
        
        {/* Toggle Header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-3.5 py-2.5 bg-gradient-to-r from-cyan-950/40 via-slate-900/70 to-slate-950 flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-white transition-colors"
        >
          <div className="flex items-center gap-2">
            <Orbit className="w-4 h-4 text-[#00f5d4] animate-spin" style={{ animationDuration: '12s' }} />
            <span className="text-[#00f5d4] font-mono tracking-wider text-[11px] uppercase font-bold">
              ORBITAL TRACKER ({satellites.length})
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              {debrisCount} DEBRIS
            </span>
          </div>
          {isOpen ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronUp className="w-4 h-4 text-slate-400" />}
        </button>

        {/* Collapsible Body */}
        {isOpen && (
          <div className="p-2 space-y-2 bg-slate-950/85">
            {/* Filter Tabs */}
            <div className="grid grid-cols-3 gap-1 bg-slate-900/60 p-1 rounded-xl text-[10px] font-mono font-semibold">
              <button
                onClick={() => setFilter('all')}
                className={`py-1 rounded-lg transition-all ${
                  filter === 'all'
                    ? 'bg-[#00f5d4]/20 text-[#00f5d4] border border-[#00f5d4]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({satellites.length})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`py-1 rounded-lg transition-all ${
                  filter === 'active'
                    ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Active ({activeCount})
              </button>
              <button
                onClick={() => setFilter('debris')}
                className={`py-1 rounded-lg transition-all ${
                  filter === 'debris'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Debris ({debrisCount})
              </button>
            </div>

            {/* List */}
            <div className="max-h-64 overflow-y-auto space-y-1.5 divide-y divide-slate-800/40 pr-1">
              {filteredSatellites.map(sat => {
                const isSelected = selectedSatellite?.id === sat.id;
                const isDebris = sat.type === 'debris';

                return (
                  <button
                    key={sat.id}
                    onClick={() => onSelectSatellite(sat)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-start gap-2.5 ${
                      isSelected
                        ? isDebris
                          ? 'bg-rose-500/20 border border-rose-500/50 text-rose-200 shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                          : 'bg-[#00f5d4]/20 border border-[#00f5d4]/50 text-[#00f5d4] shadow-[0_0_12px_rgba(0,245,212,0.3)]'
                        : 'hover:bg-slate-800/60 text-slate-300'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isDebris ? (
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                      ) : (
                        <Satellite className="w-4 h-4 text-[#00f5d4]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold truncate text-[11px] block">
                          {sat.name}
                        </span>
                        <span className={`text-[9px] font-mono px-1 rounded uppercase shrink-0 ${
                          isDebris ? 'text-rose-400 bg-rose-500/10' : 'text-[#10b981] bg-emerald-500/10'
                        }`}>
                          {isDebris ? 'Debris' : 'Active'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-mono">
                        <span>Alt: {sat.altitudeKm} km</span>
                        <span>•</span>
                        <span>{sat.velocityKmH?.toLocaleString()} km/h</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
